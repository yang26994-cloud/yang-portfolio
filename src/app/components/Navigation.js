'use client'

import { useState, useEffect } from 'react'

// 네비게이션 바 컴포넌트 - 상단 고정 메뉴
export default function Navigation() {
  // 현재 활성화된 섹션 추적
  const [activeSection, setActiveSection] = useState('home')
  // 스크롤 여부에 따라 배경 스타일 변경
  const [scrolled, setScrolled] = useState(false)

  // 스크롤 이벤트 리스너 - 현재 섹션 추적 및 배경 변경
  useEffect(() => {
    const handleScroll = () => {
      // 50px 이상 스크롤되면 배경 활성화
      setScrolled(window.scrollY > 50)
      
      // 모든 섹션 ID 목록
      const sections = ['home', 'about', 'skills', 'timeline', 'projects', 'certifications', 'contact']
      // 현재 화면에 보이는 섹션 찾기
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // 섹션이 화면 상단 150px 이내에 있으면 활성화
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    // 스크롤 이벤트 등록
    window.addEventListener('scroll', handleScroll)
    // 컴포넌트 언마운트 시 이벤트 제거
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 네비게이션 메뉴 아이템 목록
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ]

  // 섹션으로 부드럽게 스크롤하는 함수
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    // 상단 고정 네비게이션 바 - 스크롤 시 배경 활성화
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-lg border-b border-cyan-500/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 버튼 - 클릭 시 홈으로 이동 */}
          <button
            onClick={() => scrollToSection('home')}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            {/* 여기서 아이콘과 텍스트를 변경하세요 */}
            🔐 YANG.p.t.f.l 
          </button>
          
          {/* 데스크톱 메뉴 - md(768px) 이상에서만 표시 */}
          <div className="hidden md:flex items-center space-x-8">
            {/* 블로그 링크 버튼 - 네이버 블로그로 이동 */}
            <a
              href="https://blog.naver.com/saloak" 
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center gap-1"
            >
              📝 Blog
            </a>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                // 활성화된 섹션은 cyan 색상, 나머지는 gray
                className={`text-sm font-medium transition-all duration-300 relative ${
                  activeSection === item.id
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {item.label}
                {/* 활성화된 메뉴 아래 밑줄 표시 */}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
