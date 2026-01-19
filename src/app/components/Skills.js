'use client'

// Skills 섹션 컴포넌트 - 사용 가능 언어 표시
export default function Skills() {
  // 사용 가능 언어 목록 - 이름과 아이콘, 색상
  const languages = [
    { 
      name: 'HTML', 
      icon: '🌐',
      color: 'from-orange-400 to-red-500'
    },
    { 
      name: 'CSS', 
      icon: '🎨',
      color: 'from-blue-400 to-cyan-500'
    },
    { 
      name: 'JavaScript', 
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500'
    },
    { 
      name: 'React', 
      icon: '⚛️',
      color: 'from-cyan-400 to-blue-500'
    },
    { 
      name: 'Next.js', 
      icon: '▲',
      color: 'from-gray-400 to-gray-600'
    },
  ]

  return (
    // Skills 섹션
    <section id="skills" className="relative py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">사용 가능한 언어</p>
        </div>

        {/* 언어 아이콘 그리드 - 5열 레이아웃 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {languages.map((lang, idx) => (
            // 각 언어 카드 - 호버 시 확대 효과
            <div
              key={idx}
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8 hover:border-cyan-500/60 transition-all duration-300 hover:scale-110"
            >
              {/* 호버 시 그라데이션 배경 효과 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${lang.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`} />
              
              <div className="relative flex flex-col items-center justify-center">
                {/* 언어 아이콘 */}
                <div className="text-5xl mb-3">{lang.icon}</div>
                
                {/* 언어 이름 */}
                <h3 className="text-white font-semibold text-center group-hover:text-cyan-400 transition-colors">
                  {lang.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
