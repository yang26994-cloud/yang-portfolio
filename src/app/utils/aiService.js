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

/**
 * 실제 AI API 연결 함수 (나중에 사용)
 * OpenAI, Claude, 또는 다른 AI 서비스와 연결
 * 
 * @param {string} userMessage - 사용자 메시지
 * @param {object} context - 사용자 프로필 컨텍스트
 * @returns {Promise<string>} - AI 응답
 */
export const callAIAPI = async (userMessage, context = userProfile) => {
  // TODO: 실제 AI API 호출 구현
  // 예시 (OpenAI):
  /*
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `당신은 ${context.name}의 포트폴리오 AI 어시스턴트입니다. 다음 정보를 바탕으로 질문에 답변하세요: ${JSON.stringify(context)}`
        },
        {
          role: 'user',
          content: userMessage
        }
      ]
    })
  })
  
  const data = await response.json()
  return data.choices[0].message.content
  */
  
  // 현재는 키워드 기반 응답 사용 - 나중에 실제 AI API로 교체
  return await generateAIResponse(userMessage) // generateAIResponse 함수 호출하여 응답 생성
}
