// Next.js API Route: OpenAI Assistants API를 직접 호출
// Flask 서버 없이 Next.js에서 직접 OpenAI와 통신

import OpenAI from 'openai'

// 환경변수에서 OpenAI 설정 가져오기
const apiKey = process.env.OPENAI_API_KEY
const assistantId = process.env.ASSISTANT_ID

// OpenAI 클라이언트 초기화
const client = new OpenAI({ apiKey })

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
  if (!apiKey || !assistantId) {
    console.error('환경변수 누락: OPENAI_API_KEY 또는 ASSISTANT_ID')
    return new Response(
      '서버 설정 오류: OpenAI 키가 설정되지 않았습니다.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }

  try {
    console.log('[OpenAI API 요청] 메시지:', message.substring(0, 50) + '...')

    // 1. 스레드 생성
    const thread = await client.beta.threads.create()
    
    // 2. 사용자 메시지 추가
    await client.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    })

    // 3. 어시스턴트 실행 및 완료 대기
    const run = await client.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
    })

    // 4. 실행 상태 확인
    if (run.status !== 'completed') {
      console.error('OpenAI 실행 실패:', run.status)
      return new Response(
        `응답 생성 중 오류가 발생했습니다. (상태: ${run.status})`,
        { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      )
    }

    // 5. 어시스턴트 응답 가져오기
    const messages = await client.beta.threads.messages.list(thread.id, {
      order: 'desc',
      limit: 1,
    })

    if (!messages.data || messages.data.length === 0 || messages.data[0].role !== 'assistant') {
      return new Response(
        '어시스턴트 응답을 가져올 수 없습니다.',
        { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      )
    }

    const responseText = messages.data[0].content[0].text.value

    console.log('[OpenAI API 응답] 성공:', responseText.substring(0, 50) + '...')

    return new Response(responseText, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch (err) {
    console.error('OpenAI API 오류:', err.message)
    return new Response(
      `OpenAI API 오류: ${err.message}`,
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    )
  }
}
