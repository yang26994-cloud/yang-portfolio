// 이 하위 컴포넌트들을 브라우저에서 실행하겠다
'use client'

// About 섹션 컴포넌트 - 자기소개 및 통계
export default function About() {
  // 주요 통계 데이터
  const stats = [
    { label: '프로젝트', value: '준비중', color: 'from-cyan-400 to-blue-500' },
    { label: '블로그 포스트', value: '연재중', color: 'from-purple-400 to-pink-500' },
    { label: '자격증', value: '1개 취득', color: 'from-green-400 to-emerald-500' },
    { label: '목표', value: '보안전문가', color: 'from-orange-400 to-red-500' },
  ]

  return (
    // About 섹션 - 그라데이션 배경
    <section id="about" className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          {/* 타이틀 아래 구분선 */}
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
        </div>

        {/* 2열 그리드 레이아웃 - 데스크톱에서 2칸, 모바일에서 1칸 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 자기소개 카드 */}
          <div className="space-y-6">
            <div className="relative">
              {/* 카드 뒤 글로우 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-xl opacity-20" />
              {/* 메인 카드 - 반투명 배경과 블러 효과 */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-8">
                <p className="text-gray-300 leading-relaxed mb-4">
                  서버, 네트워크, 웹 서비스 구조와 보안 기초를 공부하며 실습 내용을 기록하고 있습니다.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  네이버 블로그에는 수업에서 배운 개념, 발표와 보고서 작성 과정, 프로젝트를 진행하며 겪은 오류와 해결 과정을 정리하고 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 오른쪽: 통계 */}
          <div className="space-y-6">
            {/* 통계 카드 4개 - 2x2 그리드 */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  // 호버 시 테두리 강조 및 확대 효과
                  className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 text-center hover:border-cyan-500/60 transition-all duration-300 hover:scale-105"
                >
                  {/* 숫자 - 그라데이션 텍스트 */}
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  {/* 라벨 */}
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
