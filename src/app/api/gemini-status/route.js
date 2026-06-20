import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function readEnv(name) {
  return process.env[name]?.trim() || ''
}

export async function GET() {
  const apiKey = readEnv('GEMINI_API_KEY')

  if (!apiKey) {
    return NextResponse.json({
      ok: false,
      issue: 'missing_key',
      message: 'GEMINI_API_KEY 환경변수가 없습니다.',
    })
  }

  try {
    const ai = new GoogleGenAI({ apiKey })
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'ping',
      config: {
        maxOutputTokens: 16,
        timeout: 15000,
      },
    })

    return NextResponse.json({
      ok: true,
      model: 'gemini-2.0-flash',
      sample: response.text?.slice(0, 30) || '',
      keyPrefix: apiKey.slice(0, 8),
    })
  } catch (err) {
    const message = err?.message || 'unknown error'
    let issue = 'unknown'

    if (message.includes('expired') || message.includes('API_KEY_INVALID')) {
      issue = 'expired_or_invalid_key'
    } else if (message.includes('403') || message.includes('PERMISSION_DENIED') || message.includes('suspended')) {
      issue = 'permission_denied'
    }

    return NextResponse.json({
      ok: false,
      issue,
      message: message.slice(0, 200),
      keyPrefix: apiKey.slice(0, 8),
      fix: 'Google AI Studio에서 새 API 키를 만들고 Vercel GEMINI_API_KEY를 교체한 뒤 Redeploy 하세요.',
    })
  }
}
