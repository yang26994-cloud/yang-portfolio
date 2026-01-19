'use client' // 클라이언트 컴포넌트 선언

// 자격증 섹션 컴포넌트 - 취득 예정 자격증 목록 표시
export default function Certifications() {
  // 자격증 목록 - 취득 예정인 자격증들
  const certifications = [
    {
      name: '정보처리산업기사', // 자격증 이름
      issuer: '한국산업인력공단', // 발급 기관
      status: '취득 예정', // 취득 상태
      icon: '📋', // 아이콘
      color: 'from-cyan-400 to-blue-500' // 그라데이션 색상
    },
    {
      name: 'AWS Solutions Architect Associate', // 자격증 이름
      issuer: 'Amazon Web Services', // 발급 기관
      status: '취득 예정', // 취득 상태
      icon: '☁️', // 아이콘
      color: 'from-orange-400 to-red-500' // 그라데이션 색상
    },
    {
      name: 'AWS Solutions Architect Professional', // 자격증 이름
      issuer: 'Amazon Web Services', // 발급 기관
      status: '취득 예정', // 취득 상태
      icon: '☁️', // 아이콘
      color: 'from-orange-500 to-red-600' // 그라데이션 색상
    },
    {
      name: 'Certified Kubernetes Administrator', // 자격증 이름
      issuer: 'Cloud Native Computing Foundation', // 발급 기관
      status: '취득 예정', // 취득 상태
      icon: '⚙️', // 아이콘
      color: 'from-blue-400 to-purple-500' // 그라데이션 색상
    }
  ]

  return (
    // 자격증 섹션 - 그라데이션 배경
    <section id="certifications" className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          {/* 타이틀 아래 구분선 */}
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            취득 예정 자격증 목록
          </p>
        </div>

        {/* 자격증 카드 그리드 - 2열 레이아웃 */}
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => (
            // 각 자격증 카드
            <div
              key={idx} // React key prop
              className="group relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/60 transition-all duration-300"
            >
              {/* 호버 시 그라데이션 배경 효과 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative p-6">
                {/* 자격증 아이콘과 상태 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{cert.icon}</div>
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${cert.color} text-white text-xs font-semibold`}>
                    {cert.status}
                  </span>
                </div>
                
                {/* 자격증 이름 */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </h3>
                
                {/* 발급 기관 */}
                <p className="text-gray-400 text-sm">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
