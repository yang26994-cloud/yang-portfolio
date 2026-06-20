import fs from 'fs'
import path from 'path'

const promptPaths = [
  path.join(process.cwd(), 'system-prompt.txt'),
  path.join(process.cwd(), 'prompts', 'system-prompt.txt'),
]

const promptPath = promptPaths.find((filePath) => fs.existsSync(filePath))

if (!promptPath) {
  console.error('❌ system-prompt.txt 파일을 찾을 수 없습니다.')
  console.error('   next-study/system-prompt.txt 를 만들어 주세요.')
  process.exit(1)
}

const prompt = fs.readFileSync(promptPath, 'utf-8')
const envLocalPath = path.join(process.cwd(), '.env.local')
const envValue = prompt.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
const envContent = `# sync-prompt.js가 자동 생성 — GitHub에 올라가지 않음\nSYSTEM_PROMPT="${envValue}"\n`

fs.writeFileSync(envLocalPath, envContent, 'utf-8')

console.log('✅ .env.local 에 SYSTEM_PROMPT 저장 완료')
console.log('📄 프롬프트 파일:', promptPath)
console.log('📏 길이:', prompt.length, '글자')
console.log('')
console.log('로컬: npm run dev 로 테스트하세요.')
console.log('')
console.log('⚠️  .env 는 Vercel에 올라가지 않습니다.')
console.log('사이트(배포)용으로는 Vercel 대시보드에도 따로 넣어야 합니다:')
console.log('Settings → Environment Variables → SYSTEM_PROMPT')
console.log('')
console.log('아래 내용을 Vercel SYSTEM_PROMPT 에 붙여넣으세요:')
console.log('')
console.log('--- SYSTEM_PROMPT 시작 ---')
console.log(prompt)
console.log('--- SYSTEM_PROMPT 끝 ---')
