// Gemini API 키 테스트 스크립트
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = 'AIzaSyDNm2pXzqCzWtvsB3A3vhqnStwMTmSFuGo'
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
