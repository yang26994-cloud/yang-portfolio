'use client'

import { useState, useEffect } from 'react'

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        // "HTTP 메소드 정리"와 "Neon PostgreSQL 사용 후기" 제외
        const filteredBlogs = data.filter(
          (blog) => 
            blog.title !== 'HTTP 메소드 정리' && 
            blog.title !== 'Neon PostgreSQL 사용 후기'
        )
        setBlogs(filteredBlogs)
        setLoading(false)
      })
      .catch((error) => {
        console.error('블로그 로딩 실패:', error)
        setLoading(false)
      })
  }, [])

  return (
    <section id="blogs" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📝 블로그
          </h2>
          <p className="text-gray-400 text-lg">
            블로그에 공부한 내용을 정리하고 있어요
          </p>
        </div>

        {/* 로딩 상태 */}
        {loading && (
          <div className="text-center text-white text-xl">로딩 중...</div>
        )}

        {/* 블로그 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 더보기 카드 - 맨 앞에 배치 */}
          {!loading && (
            <a
              href="https://blog.naver.com/saloak"
              target="_blank"
              rel="noreferrer"
              className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-500/40 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center"
            >
              {/* 아이콘 */}
              <div className="text-5xl mb-4">📚</div>
              
              {/* 제목 */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                더보기
              </h3>
              
              {/* 설명 */}
              <p className="text-gray-400 text-sm text-center mb-4">
                블로그에서 더 많은 글을 확인해보세요
              </p>

              {/* 화살표 */}
              <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                <span className="font-semibold">방문하기</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </a>
          )}

          {/* 기존 블로그 글들 */}
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              {/* 제목 */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {blog.title}
              </h3>

              {/* 내용 미리보기 */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {blog.content}
              </p>

              {/* 하단 정보 */}
              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
                <span className="flex items-center gap-1">
                  📅 {new Date(blog.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 블로그가 없을 때 */}
        {!loading && blogs.length === 0 && (
          <div className="flex justify-center">
            <a
              href="https://blog.naver.com/saloak"
              target="_blank"
              rel="noreferrer"
              className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-12 border-2 border-purple-500/40 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 w-full max-w-md"
            >
              <div className="text-center">
                <div className="text-6xl mb-6">📚</div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  더보기
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  네이버 블로그에서 더 많은 글을 확인해보세요
                </p>
                <div className="flex justify-center items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span className="text-lg font-semibold">블로그 방문하기</span>
                  <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
