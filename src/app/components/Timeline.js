'use client'

// Timeline 섹션 컴포넌트 - 학습 여정 타임라인
export default function Timeline() {
  // 학습 타임라인 데이터
  const timeline = [
    {
      date: '2025.12.16',
      title: 'HTML/CSS 기초 다지기',
      description: '웹 개발의 첫 걸음, HTML과 CSS로 웹 페이지 구조와 디자인 학습',
      icon: '🌐',
      color: 'from-orange-400 to-red-500'
    },
    {
      date: '2025.12.27',
      title: 'JavaScript 핵심 학습',
      description: '동적 웹을 위한 JavaScript 문법과 DOM 조작 마스터',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      date: '2025.01.02',
      title: 'React 개발 입문',
      description: 'React 컴포넌트와 Hooks로 SPA 개발 시작',
      icon: '⚛️',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      date: '2025.01.06',
      title: 'Next.js 프로젝트 시작',
      description: 'Next.js 프레임워크로 포트폴리오 사이트 구축',
      icon: '▲',
      color: 'from-purple-400 to-pink-500'
    }
  ]

  return (
    // Timeline 섹션
    <section id="timeline" className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>
          {/* 타이틀 아래 구분선 */}
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            꾸준한 학습으로 성장하는 개발자
          </p>
        </div>

        {/* 타임라인 컨테이너 */}
        <div className="relative">
          {/* 타임라인 세로 라인 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2" />

          {/* 타임라인 아이템들 */}
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              // 각 타임라인 아이템 - 짝수는 왼쪽, 홀수는 오른쪽(데스크톱)
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* 타임라인 점과 아이콘 */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl border-4 border-black shadow-lg`}>
                    {item.icon}
                  </div>
                </div>

                {/* 타임라인 카드 */}
                <div
                  className={`w-full md:w-5/12 ml-24 md:ml-0 ${
                    idx % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  {/* 카드 내용 */}
                  <div className="group bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/60 transition-all duration-300 hover:scale-105">
                    {/* 날짜 배지 */}
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-xs font-semibold mb-3`}>
                      {item.date}
                    </div>
                    
                    {/* 제목 */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* 설명 */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 현재 진행 중 표시 */}
          <div className="relative mt-12 flex flex-col md:flex-row items-start">
            {/* 현재 위치 점 - 펄스 애니메이션 */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl border-4 border-black shadow-lg">
                  🚀
                </div>
              </div>
            </div>

            {/* 현재 상태 카드 */}
            <div className="w-full md:w-5/12 ml-24 md:ml-auto md:pl-12">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-2 border-cyan-500/50 rounded-lg p-6">
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-semibold mb-3 animate-pulse">
                  NOW
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">
                  계속 성장 중
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  AWS, Kubernetes 자격증 준비하며 더 넓은 세상으로 나아가는 중입니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
