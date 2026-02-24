// AI 서비스 유틸리티 - 나중에 실제 AI API로 교체할 수 있는 구조

// 사용자 프로필 정보 (나중에 데이터베이스나 API에서 가져올 수 있음)
export const userProfile = {
  name: '양윤서', // 사용자 이름
  role: '보안 전문가', // 사용자 역할/직업
  skills: [ // 사용자 기술 스택 배열
    'HTML', // HTML 언어
    'CSS', // CSS 언어
    'JavaScript', // JavaScript 언어
    'React', // React 프레임워크
    'Next.js' // Next.js 프레임워크
  ],
  certifications: [ // 자격증 정보 배열
    '정보처리산업기사 (취득 예정)',
    'AWS Solutions Architect Associate (취득 예정)',
    'AWS Solutions Architect Professional (취득 예정)',
    'Certified Kubernetes Administrator (취득 예정)'
  ],
  blog: 'https://blog.naver.com/saloak', // 네이버 블로그 주소
  experience: [], // 경력 정보 배열 - 나중에 추가
  projects: [], // 프로젝트 정보 배열 - 나중에 추가
  bio: '보안 전문가를 목표로 꾸준히 학습하고 있습니다. 네이버 블로그에 공부한 내용을 정리하며 지식을 쌓아가고 있으며, AWS, Kubernetes 등의 자격증 취득을 준비하고 있습니다.', // 자기소개 텍스트
  contact: { // 연락처 정보 객체
    email: 'security@example.com', // 이메일 주소
    github: 'https://github.com', // GitHub 링크
    linkedin: 'https://linkedin.com' // LinkedIn 링크
  }
}

/**
 * 키워드 기반 응답 생성 함수
 * 나중에 실제 AI API로 교체할 때 이 함수만 수정하면 됨
 * 
 * @param {string} userMessage - 사용자 메시지
 * @returns {Promise<string>} - AI 응답 텍스트
 */
export const generateAIResponse = async (userMessage) => {
  // TODO: 나중에 실제 AI API 호출로 교체
  // 예시:
  // const response = await fetch('/api/ai-chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     message: userMessage,
  //     context: userProfile
  //   })
  // })
  // return await response.json()

  // 사용자 메시지를 소문자로 변환 - 대소문자 구분 없이 키워드 검색
  const lowerMessage = userMessage.toLowerCase()
  let response = '' // 응답 텍스트를 저장할 변수 초기화

  // 인사말 처리 - "안녕", "hello", "hi" 키워드 포함 여부 확인
  if (lowerMessage.includes('안녕') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    // 인사말 응답 생성 - 이름과 역할 포함
    response = `안녕하세요! 저는 ${userProfile.name}입니다. ${userProfile.role}를 목표로 공부하고 있습니다. 무엇이 궁금하신가요?`
  }
  // 자기소개 요청 - "자기소개", "소개", "누구", "나에 대해" 키워드 포함 여부 확인
  else if (lowerMessage.includes('자기소개') || lowerMessage.includes('소개') || lowerMessage.includes('누구') || lowerMessage.includes('나에 대해')) {
    // 자기소개 응답 생성 - bio와 주요 기술 스택 포함
    response = `${userProfile.bio}\n\n현재 학습 중인 주요 기술: ${userProfile.skills.slice(0, 3).join(', ')} 등\n\n블로그: ${userProfile.blog}` // skills 배열의 처음 3개만 표시
  }
  // 블로그 요청 - "블로그" 키워드 포함 여부 확인
  else if (lowerMessage.includes('블로그') || lowerMessage.includes('blog') || lowerMessage.includes('공부')) {
    response = `네이버 블로그에서 공부한 내용을 정리하고 있습니다!\n\n📝 블로그 주소: ${userProfile.blog}\n\n보안, 클라우드, 네트워크 등 다양한 주제로 꾸준히 포스팅하고 있습니다.`
  }
  // 자격증 요청 - "자격증" 키워드 포함 여부 확인
  else if (lowerMessage.includes('자격증') || lowerMessage.includes('certification') || lowerMessage.includes('cert')) {
    response = `현재 취득 예정인 자격증:\n\n${userProfile.certifications.map((cert, idx) => `${idx + 1}. ${cert}`).join('\n')}`
  }
  // 기술 스택 요청 - "기술", "스킬", "skill", "할 수 있는" 키워드 포함 여부 확인
  else if (lowerMessage.includes('기술') || lowerMessage.includes('스킬') || lowerMessage.includes('skill') || lowerMessage.includes('할 수 있는')) {
    // 기술 스택 응답 생성 - 모든 기술을 번호와 함께 나열
    response = `현재 학습 중인 주요 기술들:\n\n${userProfile.skills.map((skill, idx) => `${idx + 1}. ${skill} (학습중)`).join('\n')}` // map으로 각 기술에 번호 추가
  }
  // 경력 요청 - "경력", "경험", "experience", "회사" 키워드 포함 여부 확인
  else if (lowerMessage.includes('경력') || lowerMessage.includes('경험') || lowerMessage.includes('experience') || lowerMessage.includes('회사')) {
    // 경력 응답 생성
    response = `아직 보안 분야 경력은 없지만, 블로그를 통해 꾸준히 학습하며 준비하고 있습니다.\n\n📝 블로그: ${userProfile.blog}`
  }
  // 프로젝트 요청 - "프로젝트", "project", "작업" 키워드 포함 여부 확인
  else if (lowerMessage.includes('프로젝트') || lowerMessage.includes('project') || lowerMessage.includes('작업')) {
    // 프로젝트 응답 생성
    response = `아직 진행한 프로젝트는 없지만, 자격증 취득과 학습을 통해 프로젝트를 준비하고 있습니다.\n\n준비 중인 자격증:\n${userProfile.certifications.map((cert, idx) => `${idx + 1}. ${cert}`).join('\n')}`
  }
  // 연락처 요청 - "연락", "contact", "이메일", "email" 키워드 포함 여부 확인
  else if (lowerMessage.includes('연락') || lowerMessage.includes('contact') || lowerMessage.includes('이메일') || lowerMessage.includes('email')) {
    // 연락처 응답 생성 - 이메일, GitHub, LinkedIn, 블로그 링크 포함
    response = `연락을 원하시면:\n📝 블로그: ${userProfile.blog}\n📧 이메일: ${userProfile.contact.email}\n📦 GitHub: ${userProfile.contact.github}\n💼 LinkedIn: ${userProfile.contact.linkedin}\n\n또는 Contact 섹션의 폼을 작성해주세요!`
  }
  // 기본 응답 - 위의 키워드가 모두 없을 때
  else {
    // 기본 응답 생성 - 사용 가능한 키워드 안내
    response = `죄송합니다. "${userMessage}"에 대한 답변을 준비 중입니다.\n\n다음 키워드로 물어보시면 답변드릴 수 있습니다:\n• 자기소개 / 나에 대해\n• 블로그\n• 기술 / 스킬\n• 자격증\n• 경력 / 경험\n• 프로젝트\n• 연락처`
  }

  // AI 응답 시뮬레이션 (실제 API 호출 시간) - 800ms 대기
  await new Promise(resolve => setTimeout(resolve, 800)) // Promise를 사용한 비동기 대기

  return response // 생성된 응답 반환
}

// Next.js API Route 경로
// 이 경로는 Next.js 서버에서 Flask 서버(5000번 포트)로 프록시합니다
const SEND_MESSAGE_PATH = '/api/sendMessage'

/**
 * fetch 함수를 사용하여 채팅 API를 호출합니다.
 * 
 * fetch란?
 * - 브라우저에 내장된 네이티브 JavaScript 함수
 * - HTTP 요청을 보내고 응답을 받는 기능 제공
 * - Promise 기반으로 비동기 처리
 * - 별도 라이브러리 설치 불필요 (axios와 달리)
 * 
 * 작동 방식:
 * 1. 브라우저 → Next.js API Route(/api/sendMessage)로 요청
 * 2. Next.js API Route → Flask 서버(localhost:5000 또는 api.~~~.com)로 프록시
 * 3. Flask 서버 → OpenAI API 호출
 * 4. 응답이 역순으로 전달되어 채팅에 표시
 * 
 * @param {string} userMessage - 사용자 메시지
 * @param {object} context - 사용자 프로필 컨텍스트 (선택사항)
 * @returns {Promise<string>} - AI 응답 텍스트
 */
export const callAIAPI = async (userMessage, context = userProfile) => {
  const url = `${SEND_MESSAGE_PATH}?message=${encodeURIComponent(userMessage)}`
  
  // 개발자도구 Network 탭에서 요청 확인용 (과제)
  // 브라우저에서 실행될 때만 window 객체가 존재하므로 체크
  const fullUrl = typeof window !== 'undefined' ? window.location.origin + url : url
  if (typeof window !== 'undefined') {
    console.log('[API 요청]', fullUrl)
  }

  // fetch 함수 사용: GET 요청으로 API 호출
  // fetch는 Promise를 반환하므로 await로 응답 대기
  const res = await fetch(url)
  const text = await res.text()

  // 응답이 성공적이면 (status 200-299)
  if (res.ok) {
    return text
  }

  // 502 (Bad Gateway): Next.js가 Flask 서버에 연결할 수 없음
  // 500 (Internal Server Error): Flask 서버 내부 오류
  if (res.status === 502 || res.status === 500) {
    return text || '채팅 서버에 연결할 수 없습니다. Flask 서버가 실행 중인지 확인하세요.'
  }

  return text || `오류 (${res.status}). 잠시 후 다시 시도해주세요.`
}
