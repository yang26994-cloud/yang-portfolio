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

console.log('📄 프롬프트 파일:', promptPath)
console.log('📏 길이:', prompt.length, '글자')
console.log('')
console.log('Vercel에 아래 내용을 SYSTEM_PROMPT 환경변수로 붙여넣으세요:')
console.log('')
console.log('--- SYSTEM_PROMPT 시작 ---')
console.log(prompt)
console.log('--- SYSTEM_PROMPT 끝 ---')
