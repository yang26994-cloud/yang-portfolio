// Next.js API Route: OpenAI Chat Completions API 사용
// 프롬프트를 환경변수로 관리
// MongoDB에 채팅 로그 저장

import OpenAI from 'openai'
import { MongoClient } from 'mongodb'

// 환경변수에서 설정 가져오기
const apiKey = process.env.OPENAI_API_KEY
const mongoUri = process.env.MONGODB_URI
// 시스템 프롬프트
const systemPrompt = process.env.SYSTEM_PROMPT || '당신은 친절한 AI 어시스턴트입니다.'

// OpenAI 클라이언트 초기화
const client = new OpenAI({ apiKey })

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

// 채팅 로그 저장 함수
async function saveChatLog(userMessage, aiResponse, success = true, error = null) {
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
    console.error('환경변수 누락: OPENAI_API_KEY')
    return new Response(
      '서버 설정 오류: OpenAI API 키가 설정되지 않았습니다.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }

  try {
    console.log('[OpenAI API 요청] 메시지:', message.substring(0, 50) + '...')
    console.log('[System Prompt] 프롬프트 사용 중')

    // Chat Completions API 호출
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', // GPT-4 계열 (프롬프트 준수율 높음)
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.3, // 창의성 낮춤 = 프롬프트 엄격히 준수
      max_tokens: 300,
    })

    const responseText = response.choices[0].message.content

    console.log('[OpenAI API 응답] 성공:', responseText.substring(0, 50) + '...')

    // MongoDB에 채팅 로그 저장 (성공)
    await saveChatLog(message, responseText, true, null)

    return new Response(responseText, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    console.error('OpenAI API 오류:', err.message)
    
    // MongoDB에 채팅 로그 저장 (실패)
    await saveChatLog(message, null, false, err.message)
    
    return new Response(
      `OpenAI API 오류: ${err.message}`,
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }
}
