import fs from 'fs'
import path from 'path'

const promptPaths = [
  path.join(process.cwd(), 'system-prompt.txt'),
  path.join(process.cwd(), 'prompts', 'system-prompt.txt'),
]

const promptPath = promptPaths.find((filePath) => fs.existsSync(filePath))

if (!promptPath) {
  console.error('❌ system-prompt.txt 파일을 찾을 수 없습니다.')
  process.exit(1)
}

const prompt = fs.readFileSync(promptPath, 'utf-8')
const envLocalPath = path.join(process.cwd(), '.env.local')
const envValue = prompt.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
const b64 = Buffer.from(prompt, 'utf-8').toString('base64')

fs.writeFileSync(
  envLocalPath,
  `# sync-prompt.js 자동 생성 — GitHub에 올라가지 않음\nSYSTEM_PROMPT="${envValue}"\n`,
  'utf-8'
)

console.log('✅ .env.local 에 SYSTEM_PROMPT 저장 완료')
console.log('📄 프롬프트 파일:', promptPath)
console.log('📏 길이:', prompt.length, '글자')
console.log('')
console.log('=== Vercel 설정 (둘 중 하나) ===')
console.log('')
console.log('[방법 1] Name: SYSTEM_PROMPT')
console.log('Value: system-prompt.txt 내용 전체 붙여넣기')
console.log('')
console.log('[방법 2 - 권장] Name: SYSTEM_PROMPT_B64')
console.log('Value: 아래 한 줄만 붙여넣기 (줄바꿈/따옴표 문제 없음)')
console.log('')
console.log(b64)
console.log('')
console.log('설정 후 Redeploy → https://www.yangportfo.com/api/prompt-status 확인')
