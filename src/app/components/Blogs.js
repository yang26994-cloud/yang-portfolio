'use client'

import { useState, useEffect } from 'react'

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
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
            개발 공부하면서 배운 내용을 정리해요
          </p>
        </div>

        {/* 로딩 상태 */}
        {loading && (
          <div className="text-center text-white text-xl">로딩 중...</div>
        )}

        {/* 블로그 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center text-gray-400">
            <p className="text-lg">아직 블로그 글이 없어요 😅</p>
          </div>
        )}
      </div>
    </section>
  )
}
