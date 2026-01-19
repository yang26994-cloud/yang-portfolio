// 모든 컴포넌트 import - 각 섹션을 구성하는 컴포넌트들을 가져옴
import AuroraBackground from './components/AuroraBackground' // 배경 애니메이션 컴포넌트 - 오로라 효과 배경
import Navigation from './components/Navigation' // 상단 네비게이션 바 컴포넌트 - 메뉴와 스크롤 기능
import Hero from './components/Hero' // 메인 Hero 섹션 컴포넌트 - 첫 화면 타이핑 애니메이션
import About from './components/About' // 자기소개 섹션 컴포넌트 - 프로필과 통계 정보
import Skills from './components/Skills' // 기술 스택 섹션 컴포넌트 - 보유 기술 목록
import Timeline from './components/Timeline' // 타임라인 섹션 컴포넌트 - 학습 여정
import Projects from './components/Projects' // 프로젝트 섹션 컴포넌트 - 프로젝트 카드 그리드
import Certifications from './components/Certifications' // 자격증 섹션 컴포넌트 - 취득 예정 자격증 목록
import Contact from './components/Contact' // 연락처 섹션 컴포넌트 - 연락 폼과 SNS 링크
import ChatWidget from './components/ChatWidget' // 채팅 위젯 컴포넌트 - AI 채팅 기능

// 메인 홈 페이지 컴포넌트 - Next.js의 기본 페이지 컴포넌트
export default function Home() {
  // JSX 반환 - 페이지의 전체 구조
  return (
    // 메인 컨테이너 - 상대 위치, 최소 높이 전체 화면, 넘치는 내용 숨김, 검은색 배경
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* 애니메이션 배경 - 고정 위치, 오로라 효과 */}
      <AuroraBackground />
      
      {/* 상단 네비게이션 - 고정 위치, 스크롤 시 배경 표시 */}
      <Navigation />
      
      {/* 메인 Hero 섹션 - 첫 화면, 타이핑 애니메이션과 CTA 버튼 */}
      <Hero />
      
      {/* About 섹션 - 자기소개, 통계 카드, 전문 분야 */}
      <About />
      
      {/* Skills 섹션 - 기술 스택, 진행률 바 */}
      <Skills />
      
      {/* Timeline 섹션 - 학습 여정 타임라인 */}
      <Timeline />
      
      {/* Projects 섹션 - 프로젝트 목록, 카드 그리드 레이아웃 */}
      <Projects />
      
      {/* Certifications 섹션 - 자격증 목록 */}
      <Certifications />
      
      {/* Contact 섹션 - 연락 폼, SNS 링크 */}
      <Contact />
      
      {/* 채팅 위젯 - 오른쪽 하단 고정, AI 채팅 기능 */}
      <ChatWidget />
    </main>
  )
}