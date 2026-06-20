// Next.js API Route: Gemini API + MongoDB 채팅 로그

import { GoogleGenAI } from '@google/genai'
import { MongoClient } from 'mongodb'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function readEnv(name) {
  return process.env[name]?.trim() || ''
}

function loadSystemPrompt() {
  const envPrompt = readEnv('SYSTEM_PROMPT')
  if (envPrompt) {
    return { prompt: envPrompt, source: 'SYSTEM_PROMPT' }
  }

  const b64 = readEnv('SYSTEM_PROMPT_B64')
  if (b64) {
    return {
      prompt: Buffer.from(b64, 'base64').toString('utf-8'),
      source: 'SYSTEM_PROMPT_B64',
    }
  }

  const promptPaths = [
    path.join(process.cwd(), 'system-prompt.txt'),
    path.join(process.cwd(), 'prompts', 'system-prompt.txt'),
  ]

  for (const promptPath of promptPaths) {
    if (fs.existsSync(promptPath)) {
      return {
        prompt: fs.readFileSync(promptPath, 'utf-8'),
        source: path.basename(promptPath),
      }
    }
  }

  return {
    prompt: '당신은 친절한 AI 어시스턴트입니다.',
    source: 'default',
  }
}

function buildGeminiContents(message, systemPrompt) {
  return [
    {
      role: 'user',
      parts: [{ text: `[시스템 지시]\n${systemPrompt}` }],
    },
    {
      role: 'model',
      parts: [{ text: '알겠습니다. 지시사항대로 양윤서로서 답변하겠습니다.' }],
    },
    {
      role: 'user',
      parts: [{ text: message }],
    },
  ]
}

function getUserFacingErrorMessage(err) {
  const message = err?.message || ''
  if (
    message.includes('403') ||
    message.includes('PERMISSION_DENIED') ||
    message.includes('suspended') ||
    message.includes('API key expired') ||
    message.includes('API_KEY_INVALID')
  ) {
    return 'AI 서비스 설정에 문제가 있습니다. 잠시 후 다시 시도해주세요.'
  }
  if (message.includes('503') || message.includes('Service Unavailable')) {
    return 'AI 서비스가 일시적으로 바쁩니다. 잠시 후 다시 시도해주세요.'
  }
  return '메시지 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
}

let mongoClient = null

async function connectToMongoDB() {
  if (mongoClient) {
    return mongoClient
  }

  const mongoUri = readEnv('MONGODB_URI')
  if (!mongoUri) {
    throw new Error('MONGODB_URI 환경변수가 설정되지 않았습니다.')
  }

  mongoClient = new MongoClient(mongoUri)
  await mongoClient.connect()
  return mongoClient
}

async function callGeminiWithRetry(message, systemPrompt, maxRetries = 2) {
  const apiKey = readEnv('GEMINI_API_KEY')
  const ai = new GoogleGenAI({ apiKey })
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']
  const contents = buildGeminiContents(message, systemPrompt)

  let lastError = null

  for (const model of models) {
    console.log(`🔄 모델 시도: ${model}`)

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.8,
            maxOutputTokens: 2000,
            topP: 0.8,
            topK: 40,
            timeout: 60000,
          },
        })

        console.log(`✅ ${model} 성공!`)
        return { text: response.text, model }
      } catch (err) {
        lastError = err
        const is503 = err.status === 503 || err.message.includes('503') || err.message.includes('Service Unavailable')

        if (is503 && attempt < maxRetries) {
          const waitTime = 500 * attempt
          console.log(`⚠️ ${model} 503 (${attempt}/${maxRetries}), ${waitTime}ms 후 재시도`)
          await new Promise((resolve) => setTimeout(resolve, waitTime))
          continue
        }

        console.log(`❌ ${model} 실패:`, err.message)
        break
      }
    }
  }

  throw lastError || new Error('모든 Gemini 모델이 현재 사용 불가능합니다.')
}

async function saveChatLog(userMessage, aiResponse, success = true, error = null, modelUsed = null, promptSource = null) {
  try {
    const client = await connectToMongoDB()
    const db = client.db('chatbot')
    const collection = db.collection('chat_logs')

    await collection.insertOne({
      timestamp: new Date(),
      userMessage,
      aiResponse,
      success,
      error,
      modelUsed,
      promptSource,
    })
  } catch (err) {
    console.error('❌ MongoDB 저장 오류:', err.message)
  }
}

export async function GET(request) {
  const url = request.nextUrl ?? new URL(request.url || '', 'http://localhost')
  const message = url.searchParams.get('message') || ''

  if (!message.trim()) {
    return new Response(
      'message가 비어 있습니다. 예: /api/sendMessage?message=안녕하세요',
      { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }

  if (!readEnv('GEMINI_API_KEY')) {
    return new Response(
      '서버 설정 오류: Gemini API 키가 설정되지 않았습니다.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }

  const { prompt: systemPrompt, source: promptSource } = loadSystemPrompt()

  try {
    console.log('[Gemini API 요청]', message.substring(0, 50))
    console.log('[System Prompt] 출처:', promptSource, '/ 길이:', systemPrompt.length)

    const { text: responseText, model: modelUsed } = await callGeminiWithRetry(message, systemPrompt)

    await saveChatLog(message, responseText, true, null, modelUsed, promptSource)

    return new Response(responseText, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    console.error('Gemini API 오류:', err.message)
    await saveChatLog(message, null, false, err.message, null, promptSource)

    return new Response(getUserFacingErrorMessage(err), {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
