// Next.js API Route: Flask 서버(5000번 포트)로 요청을 프록시
// .env 파일의 CHAT_API_URL을 사용하여 로컬(localhost:5000) 또는 프로덕션(api.~~~.com)으로 요청

// 환경변수에서 Flask 서버 URL 가져오기
// 로컬 개발: http://localhost:5000
// 프로덕션: https://api.~~~.com
const CHAT_API_URL = process.env.CHAT_API_URL || 'http://localhost:5000'

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

  try {
    // Flask 서버로 요청 프록시
    // CHAT_API_URL 환경변수에 따라 localhost:5000 또는 api.~~~.com으로 요청
    const flaskUrl = `${CHAT_API_URL}/sendMessage?message=${encodeURIComponent(message)}`
    
    console.log('[프록시 요청]', flaskUrl) // 서버 콘솔에 로그 출력

    const response = await fetch(flaskUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Flask 서버 응답을 그대로 반환
    const text = await response.text()

    if (!response.ok) {
      return new Response(
        text || `Flask 서버 오류 (${response.status})`,
        { status: response.status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      )
    }

    return new Response(text, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    console.error('Flask 서버 연결 오류:', err.message)
    return new Response(
      `채팅 서버에 연결할 수 없습니다: ${err.message}\n\nCHAT_API_URL 환경변수를 확인하세요. (현재: ${CHAT_API_URL})`,
      { status: 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }
}
