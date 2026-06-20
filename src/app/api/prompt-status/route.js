import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function readEnv(name) {
  return process.env[name]?.trim() || ''
}

function loadSystemPromptMeta() {
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

export async function GET() {
  const { prompt, source } = loadSystemPromptMeta()

  return NextResponse.json({
    promptSource: source,
    promptLength: prompt.length,
    promptPreview: prompt.slice(0, 80),
    hasGeminiKey: Boolean(readEnv('GEMINI_API_KEY')),
    nodeEnv: process.env.NODE_ENV || 'unknown',
    vercel: Boolean(process.env.VERCEL),
  })
}
