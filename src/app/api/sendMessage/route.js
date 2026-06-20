// Next.js API Route: 최신 Gemini API 사용 (@google/genai)
// 프롬프트를 파일에서 관리
// MongoDB에 채팅 로그 저장

import { GoogleGenAI } from '@google/genai'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'

// 환경변수에서 설정 가져오기
const apiKey = process.env.GEMINI_API_KEY
const mongoUri = process.env.MONGODB_URI

// 시스템 프롬프트: 환경변수 우선, 없으면 배포용 prompts 파일에서 읽기
function loadSystemPrompt() {
  if (process.env.SYSTEM_PROMPT) {
    return process.env.SYSTEM_PROMPT
  }

  const promptPaths = [
    path.join(process.cwd(), 'prompts', 'system-prompt.txt'),
    path.join(process.cwd(), 'system-prompt.txt'),
  ]

  for (const promptPath of promptPaths) {
    if (fs.existsSync(promptPath)) {
      return fs.readFileSync(promptPath, 'utf-8')
    }
  }

  return '당신은 친절한 AI 어시스턴트입니다.'
}

const systemPrompt = loadSystemPrompt()

// Gemini 클라이언트 초기화 (최신 SDK)
const ai = new GoogleGenAI({ apiKey })

function getUserFacingErrorMessage(err) {
  const message = err?.message || ''
  if (message.includes('403') || message.includes('PERMISSION_DENIED') || message.includes('suspended')) {
    return 'AI 서비스 설정에 문제가 있습니다. 잠시 후 다시 시도해주세요.'
  }
  if (message.includes('503') || message.includes('Service Unavailable')) {
    return 'AI 서비스가 일시적으로 바쁩니다. 잠시 후 다시 시도해주세요.'
  }
  return '메시지 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
}

// MongoDB 클라이언트 (재사용을 위한 전역 변수)
let mongoClient = null

// MongoDB 연결 함수
async function connectToMongoDB() {
  if (mongoClient) {
    return mongoClient
  }
  
  if (!mongoUri) {
    throw new Error('MONGODB_URI 환경변수가 설정되지 않았습니다.')
  }
  
  mongoClient = new MongoClient(mongoUri)
  await mongoClient.connect()
  console.log('✅ MongoDB 연결 성공')
  return mongoClient
}

// Gemini API 호출 함수 (재시도 + Fallback 로직)
async function callGeminiWithRetry(message, maxRetries = 2) {
  const models = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
  ]

  let lastError = null

  for (const model of models) {
    console.log(`🔄 모델 시도: ${model}`)

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: message,
          config: {
            systemInstruction: systemPrompt,
            temperature: 1.0,
            maxOutputTokens: 2000,
            topP: 0.8,
            topK: 40,
            timeout: 60000,
          },
        })

        console.log(`✅ ${model} 성공!`)
        return { text: response.text, model: model }

      } catch (err) {
        lastError = err
        const is503 = err.status === 503 || err.message.includes('503') || err.message.includes('Service Unavailable')

        if (is503 && attempt < maxRetries) {
          const waitTime = 500 * attempt
          console.log(`⚠️ ${model} 503 에러 (${attempt}/${maxRetries}), ${waitTime}ms 후 재시도...`)
          await new Promise(resolve => setTimeout(resolve, waitTime))
          continue
        }

        console.log(`❌ ${model} 실패:`, err.message)
        break
      }
    }
  }

  throw lastError || new Error('모든 Gemini 모델이 현재 사용 불가능합니다. 잠시 후 다시 시도해주세요.')
}

// 채팅 로그 저장 함수
async function saveChatLog(userMessage, aiResponse, success = true, error = null, modelUsed = null) {
  console.log('🔵 saveChatLog 함수 시작')
  console.log('🔵 MONGODB_URI 존재 여부:', !!process.env.MONGODB_URI)
  
  try {
    console.log('🔵 MongoDB 연결 시도...')
    const client = await connectToMongoDB()
    console.log('🔵 MongoDB 연결 성공!')
    
    const db = client.db('chatbot') // 데이터베이스 이름
    const collection = db.collection('chat_logs') // 컬렉션 이름
    
    const logEntry = {
      timestamp: new Date(), // 현재 시간
      userMessage: userMessage, // 사용자 메시지
      aiResponse: aiResponse, // AI 응답
      success: success, // 성공 여부
      error: error, // 에러 메시지 (있다면)
      modelUsed: modelUsed, // 사용된 모델
    }
    
    console.log('🔵 문서 저장 시도...')
    const result = await collection.insertOne(logEntry)
    console.log('💾 채팅 로그 저장 완료! ID:', result.insertedId)
  } catch (err) {
    console.error('❌ MongoDB 저장 오류:', err.message)
    console.error('❌ 전체 에러:', err)
    // MongoDB 저장 실패해도 채팅은 계속 동작하도록 에러를 던지지 않음
  }
}

export async function GET(request) {
  // 요청 URL에서 message 파라미터 추출
  const url = request.nextUrl ?? new URL(request.url || '', 'http://localhost')
  const message = url.searchParams.get('message') || ''

  // 메시지가 비어있는지 확인
  if (!message.trim()) {
    return new Response(
      'message가 비어 있습니다. 예: /api/sendMessage?message=안녕하세요',
      { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }

  // 환경변수 검증
  if (!apiKey) {
    console.error('환경변수 누락: GEMINI_API_KEY')
    return new Response(
      '서버 설정 오류: Gemini API 키가 설정되지 않았습니다.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }

  try {
    console.log('[Gemini API 요청] 메시지:', message.substring(0, 50) + '...')
    console.log('[System Prompt] 길이:', systemPrompt.length, '글자')

    const { text: responseText, model: modelUsed } = await callGeminiWithRetry(message)

    console.log('[Gemini API 응답] 성공:', responseText.substring(0, 50) + '...')

    // MongoDB에 채팅 로그 저장 (성공)
    await saveChatLog(message, responseText, true, null, modelUsed)

    return new Response(responseText, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    console.error('Gemini API 오류:', err.message)
    console.error('전체 에러:', err)
    
    // MongoDB에 채팅 로그 저장 (실패)
    await saveChatLog(message, null, false, err.message, null)
    
    return new Response(
      getUserFacingErrorMessage(err),
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }
}
