'use client'

// Projects 섹션 컴포넌트 - 보안 프로젝트 목록 표시
export default function Projects() {
  // 프로젝트 데이터
  const projects = [
    {
      title: 'AI 포트폴리오 사이트 제작',
      description: 'Next.js와 Gemini API를 활용한 인터랙티브 포트폴리오 웹사이트',
      technologies: ['Next.js', 'React', 'Gemini API', 'Tailwind CSS', 'MongoDB'],
      icon: '💻',
      color: 'from-cyan-500 to-blue-500',
      blogLink: 'https://blog.naver.com/saloak/224216046591'
    },
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
          {projects.map((project, idx) => (
            // 각 프로젝트 카드 - 테두리로 박스 형태
            <div
              key={idx}
              className="group relative bg-gray-900/50 backdrop-blur-sm border-2 border-cyan-500/40 rounded-xl overflow-hidden hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              {/* 호버 시 그라데이션 배경 효과 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative p-8">
                {/* 프로젝트 아이콘 */}
                <div className="flex items-center justify-center mb-6">
                  <div className="text-7xl">{project.icon}</div>
                </div>
                
                {/* 프로젝트 제목 - 호버 시 색상 변경 */}
                <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                
                {/* 프로젝트 설명 */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed text-center">
                  {project.description}
                </p>

                {/* 사용 기술 태그들 */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 bg-gray-800/50 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 제작과정 링크 */}
                <div className="pt-6 border-t border-cyan-500/30">
                  <a
                    href={project.blogLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
                  >
                    <span>📝 제작과정</span>
                    <span className="text-xs">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
