'use client'

import { useState } from 'react'

// Contact 섹션 컴포넌트 - 연락 폼 및 SNS 링크
export default function Contact() {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault()
    // 실제로는 여기서 API 호출 등을 수행
    alert('메시지가 전송되었습니다!')
    // 폼 초기화
    setFormData({ name: '', email: '', message: '' })
  }

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    // Contact 섹션 - 그라데이션 배경
    <section id="contact" className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-4xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Contact
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">
            궁금한 점이나 협업 제안이 있으시다면 연락주세요
          </p>
        </div>

        {/* 연락 폼 카드 */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 입력 필드 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* 이메일 입력 필드 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* 메시지 입력 필드 - 여러 줄 텍스트 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                메시지
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            {/* 전송 버튼 - 그라데이션 배경 */}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              메시지 전송
            </button>
          </form>

          {/* SNS 링크 섹션 */}
          <div className="mt-8 pt-8 border-t border-cyan-500/20">
            <div className="flex justify-center space-x-6 flex-wrap gap-2">
              <a href="https://blog.naver.com/saloak" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                📝 Blog
              </a>
              <a href="mailto:security@example.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                📧 Email
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                📦 GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
