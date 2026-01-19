'use client'

// Projects 섹션 컴포넌트 - 보안 프로젝트 목록 표시
export default function Projects() {
  // 프로젝트 데이터 - 나중에 여기에 실제 프로젝트를 추가하세요
  const projects = [
    // 예시 형식:
    // {
    //   title: '프로젝트 제목',
    //   description: '프로젝트 설명',
    //   technologies: ['기술1', '기술2', '기술3'],
    //   results: '프로젝트 결과',
    //   color: 'from-cyan-500 to-blue-500',
    // },
  ]

  return (
    // Projects 섹션 - 그라데이션 배경
    <section id="projects" className="relative py-24 px-6 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Security Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            다양한 보안 프로젝트를 통해 쌓은 경험과 성과를 소개합니다
          </p>
        </div>

        {/* 프로젝트 카드 그리드 - 2열 레이아웃 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 프로젝트가 있을 때만 표시 */}
          {projects.length > 0 ? (
            projects.map((project, idx) => (
              // 각 프로젝트 카드 - 호버 시 테두리 강조
              <div
                key={idx}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/60 transition-all duration-300"
              >
                {/* 호버 시 그라데이션 배경 효과 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative p-6">
                  {/* 프로젝트 번호 배지 */}
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white text-xs font-semibold mb-4`}>
                    Project {idx + 1}
                  </div>
                  
                  {/* 프로젝트 제목 - 호버 시 색상 변경 */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* 프로젝트 설명 */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* 사용 기술 태그들 */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-2 py-1 bg-gray-800/50 border border-cyan-500/20 rounded text-xs text-cyan-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 프로젝트 결과 */}
                  <div className="pt-4 border-t border-cyan-500/20">
                    <div className="text-sm text-green-400 font-semibold">
                      ✓ {project.results}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 프로젝트가 없을 때 - 추가 예정 안내
            <div className="col-span-2 text-center py-16">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">프로젝트 추가 예정</h3>
              <p className="text-gray-400">
                곧 다양한 보안 프로젝트를 추가할 예정입니다
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
