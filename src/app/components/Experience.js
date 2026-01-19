'use client'

// Experience 섹션 컴포넌트 - 경력 타임라인
export default function Experience() {
  // 경력 데이터 - 나중에 여기에 실제 경력을 추가하세요
  const experiences = [
    // 예시 형식:
    // {
    //   title: '직책',
    //   company: '회사명',
    //   period: '기간',
    //   description: [
    //     '업무 내용 1',
    //     '업무 내용 2',
    //     '업무 내용 3'
    //   ]
    // }
  ]

  return (
    // Experience 섹션
    <section id="experience" className="relative py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
        </div>

        {/* 타임라인 컨테이너 */}
        <div className="relative">
          {/* 타임라인 세로 라인 - 모바일은 왼쪽, 데스크톱은 중앙 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2" />

          {/* 경력 목록 */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              // 각 경력 아이템 - 짝수는 오른쪽, 홀수는 왼쪽(데스크톱)
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* 타임라인 점 */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-black transform md:-translate-x-1/2 z-10" />

                {/* 경력 카드 - 타임라인 옆에 배치 */}
                <div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    idx % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  {/* 경력 상세 카드 */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/60 transition-all duration-300">
                    {/* 직책, 회사, 기간 */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-1">{exp.title}</h3>
                        <p className="text-white font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-400 mt-2 md:mt-0">{exp.period}</span>
                    </div>

                    {/* 업무 내용 목록 */}
                    <ul className="space-y-2">
                      {exp.description.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-gray-300 text-sm flex items-start">
                          <span className="text-cyan-400 mr-2">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
