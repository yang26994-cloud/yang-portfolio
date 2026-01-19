'use client'

import { useEffect, useState } from 'react'

// Hero 섹션 컴포넌트 - 메인 페이지 상단 영역
export default function Hero() {
  // 타이핑 애니메이션에서 현재 표시될 텍스트
  const [displayText, setDisplayText] = useState('')
  // 표시할 직업 목록
  const roles = ['Security Engineer', 'Penetration Tester', 'Security Researcher']
  // 현재 표시 중인 직업 인덱스
  const [currentRole, setCurrentRole] = useState(0)

  // 타이핑 애니메이션 효과 - 글자가 하나씩 나타났다 사라지는 효과
  useEffect(() => {
    const role = roles[currentRole] // 현재 직업 텍스트
    let charIndex = 0 // 현재 글자 위치
    let isDeleting = false // 삭제 모드 여부
    let timeout

    // 타이핑 함수
    const type = () => {
      if (isDeleting) {
        // 글자 삭제 중
        setDisplayText(role.substring(0, charIndex))
        charIndex--
        if (charIndex === 0) {
          // 다 지웠으면 다음 직업으로 이동
          isDeleting = false
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
        timeout = setTimeout(type, 50) // 삭제는 빠르게
      } else {
        // 글자 입력 중
        setDisplayText(role.substring(0, charIndex))
        charIndex++
        if (charIndex > role.length) {
          // 다 입력했으면 2초 대기 후 삭제 시작
          timeout = setTimeout(() => {
            isDeleting = true
            type()
          }, 2000)
        } else {
          timeout = setTimeout(type, 100) // 입력은 천천히
        }
      }
    }

    type()
    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timeout)
  }, [currentRole])

  return (
    // 메인 Hero 섹션 - 전체 화면 높이로 중앙 정렬
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* 배경 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-black to-black" />
      
      {/* 메인 콘텐츠 영역 */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* 상단 배지 - 페이드인 애니메이션 */}
        <div className="mb-6 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">
            <span className="text-cyan-400 text-sm font-medium">🔒 Cybersecurity Professional</span>
          </div>
        </div>

        {/* 메인 타이틀 - 슬라이드업 애니메이션 */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Security Portfolio
          </span>
        </h1>

        {/* 타이핑 애니메이션 영역 - 높이 고정으로 레이아웃 안정화 */}
        <div className="h-16 md:h-20 mb-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-cyan-400">
            {displayText}
            {/* 깜빡이는 커서 */}
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        {/* 설명 텍스트 */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          보안 전문가를 목표로 꾸준히 학습하고 성장하는 중입니다
        </p>

        {/* CTA 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* 블로그 보기 버튼 - 메인 액션 */}
          <a
            href="https://blog.naver.com/saloak"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
          >
            📝 블로그 보기
          </a>
          {/* 자격증 보기 버튼 - 보조 액션 */}
          <button
            onClick={() => {
              document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 border-2 border-cyan-500 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-colors duration-300"
          >
            자격증 보기
          </button>
          {/* 연락하기 버튼 - 보조 액션 */}
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-4 border-2 border-purple-500 rounded-lg font-semibold text-purple-400 hover:bg-purple-500/10 transition-colors duration-300"
          >
            연락하기
          </button>
        </div>
      </div>

      {/* 배경 그리드 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>
    </section>
  )
}
