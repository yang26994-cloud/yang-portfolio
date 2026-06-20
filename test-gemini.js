// Gemini API 키 테스트 스크립트 (로컬 전용)
// 사용: node --env-file=.env test-gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  console.error('❌ GEMINI_API_KEY 환경변수가 없습니다.')
  console.error('   node --env-file=.env test-gemini.js 로 실행하세요.')
  process.exit(1)
}

const genAI = new GoogleGenerativeAI(apiKey)

async function testGemini() {
  try {
    console.log('🔵 Gemini API 테스트 시작...')

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    })

    const result = await model.generateContent('안녕하세요')
    const response = await result.response
    const text = response.text()

    console.log('✅ 성공! 응답:', text)
  } catch (error) {
    console.error('❌ 실패:', error.message)
  }
}

testGemini()
