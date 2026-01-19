'use client' // 클라이언트 컴포넌트 선언 - 브라우저에서 실행되는 컴포넌트임을 명시

import { useState, useEffect } from 'react' // React의 useState와 useEffect 훅 import - 상태 관리와 생명주기 관리
import Link from 'next/link' // Next.js의 Link 컴포넌트 import - 클라이언트 사이드 네비게이션

// 버블 메뉴 컴포넌트 - 클릭 시 버블들이 펼쳐지는 원형 메뉴
export default function BubbleMenu() {
  // 메뉴 열림/닫힘 상태 관리 - false: 닫힘, true: 열림
  const [open, setOpen] = useState(false) // useState로 초기값 false 설정
  // 모바일 화면 여부 상태 관리 - 화면 너비가 640px 미만인지 확인
  const [isMobile, setIsMobile] = useState(false) // useState로 초기값 false 설정
  // 태블릿 화면 여부 상태 관리 - 화면 너비가 768px 미만인지 확인
  const [isTablet, setIsTablet] = useState(false) // useState로 초기값 false 설정

  // 화면 크기 감지 useEffect - 컴포넌트 마운트 시 및 화면 크기 변경 시 실행
  useEffect(() => {
    // 화면 크기 확인 함수 - 현재 화면 너비에 따라 모바일/태블릿 여부 설정
    const checkSize = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint - 640px 미만이면 모바일로 판단
      setIsTablet(window.innerWidth < 768) // md breakpoint - 768px 미만이면 태블릿으로 판단
    }
    
    checkSize() // 컴포넌트 마운트 시 즉시 실행하여 초기 화면 크기 확인
    window.addEventListener('resize', checkSize) // 화면 크기 변경 이벤트 리스너 등록
    return () => window.removeEventListener('resize', checkSize) // 컴포넌트 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
  }, []) // 빈 의존성 배열 - 컴포넌트 마운트 시 한 번만 실행

  // 메뉴 아이템 배열 - 각 버블에 표시될 메뉴 항목들
  const items = [
    { href: '/', label: 'Home' }, // 홈 메뉴 - 내부 링크
    { href: '/project', label: 'Projects' }, // 프로젝트 메뉴 - 내부 링크
    { href: '/', label: 'GitHub', external: true }, // GitHub 메뉴 - 외부 링크 (새 탭에서 열림)
  ]

  // 버블 위치 계산 함수 - 화면 크기에 따라 버블들의 위치를 반환
  // 위쪽에 놓을 거라서 "아래로 퍼지게" 배치
  // (top-right에서 아래/왼쪽으로 펼쳐지면 화면 밖으로 안 나감)
  // 반응형: 작은 화면에서는 더 작은 간격 사용하되, 원 크기를 고려해 겹치지 않도록 조정
  const getPositions = () => {
    // 모바일 화면일 때 - 작은 화면에 맞춘 위치 설정
    if (isMobile) {
      // 작은 화면: 원 크기 h-24 (96px)이므로 최소 100px 간격 필요
      return [
        { x: -50, y: 0 },       // 첫 번째 버블: 왼쪽으로 50px, 아래로 0px (홈)
        { x: -50, y: 100 },     // 두 번째 버블: 왼쪽으로 50px, 아래로 100px (깃헙 - 첫 번째 원 아래)
        { x: -50, y: 200 },     // 세 번째 버블: 왼쪽으로 50px, 아래로 200px (프로젝트 - 두 번째 원 아래)
      ]
    } 
    // 태블릿 화면일 때 - 중간 화면에 맞춘 위치 설정
    else if (isTablet) {
      // 태블릿: 원 크기 h-32 (128px)이므로 최소 130px 간격 필요
      return [
        { x: -70, y: 0 },       // 첫 번째 버블: 왼쪽으로 70px, 아래로 0px (홈)
        { x: -70, y: 140 },     // 두 번째 버블: 왼쪽으로 70px, 아래로 140px (깃헙)
        { x: -70, y: 280 },     // 세 번째 버블: 왼쪽으로 70px, 아래로 280px (프로젝트)
      ]
    } 
    // 데스크톱 화면일 때 - 큰 화면에 맞춘 위치 설정
    else {
      // 큰 화면: 원 크기 h-40 (160px)이므로 최소 170px 간격 필요
      return [
        { x: -100, y: -10 },     // 첫 번째 버블: 왼쪽으로 100px, 위로 10px (홈)
        { x: -100, y: 160 },     // 두 번째 버블: 왼쪽으로 100px, 아래로 160px (깃헙)
        { x: -100, y: 330 },     // 세 번째 버블: 왼쪽으로 100px, 아래로 330px (프로젝트)
      ]
    }
  }

  // 계산된 위치 배열 저장 - getPositions 함수 호출 결과
  const positions = getPositions()

  // 컴포넌트 렌더링 - JSX 반환
  return (
    // 상대 위치 컨테이너 - 버블들이 이 컨테이너 기준으로 위치 설정
    <div className="relative">
      {/* 메인 버튼 - 클릭 시 메뉴 열기/닫기 */}
      <button
        type="button" // 버튼 타입 지정
        onClick={() => setOpen((v) => !v)} // 클릭 시 open 상태 토글 (true ↔ false)
        className="relative z-50 grid h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur text-white shadow-sm hover:bg-white/15 transition" // 스타일링: 반응형 크기, 원형, 반투명 배경, 호버 효과
        aria-label="Open menu" // 접근성을 위한 라벨
      >
        {/* 버튼 내부 아이콘 - 열림 상태에 따라 다른 아이콘 표시 */}
        <span className="text-sm sm:text-base md:text-lg leading-none">{open ? '×' : '≡'}</span> {/* 열림: X, 닫힘: 햄버거 메뉴 */}
      </button>

      {/* 버블 아이템들 - items 배열을 순회하며 각 버블 생성 */}
      {items.map((it, i) => {
        // 현재 아이템의 위치 정보 가져오기 - 없으면 기본값 사용
        const p = positions[i] || { x: -60 * (i + 1), y: 0 } // 기본값: 왼쪽으로 60px씩 증가
        // 공통 CSS 클래스 - 모든 버블에 적용되는 스타일
        const common =
          'absolute grid place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur text-white/90 shadow-sm cursor-pointer hover:bg-white/20 ' + // 절대 위치, 그리드 중앙 정렬, 원형, 반투명 배경, 호버 효과
          'transition-all duration-300 ease-out' // 모든 속성에 300ms 전환 효과

        // 버튼 크기 계산 (기본값 사용) - 화면 크기에 따라 메인 버튼 높이 설정
        const buttonHeight = isMobile ? 32 : isTablet ? 40 : 48 // 모바일: 32px, 태블릿: 40px, 데스크톱: 48px

        // 인라인 스타일 객체 - 열림/닫힘 상태에 따라 다른 스타일 적용
        const style = {
          // 열림 상태일 때의 스타일
          ...(open
            ? {
                transform: `translate(${p.x}px, ${buttonHeight + p.y}px) scale(1)`, // 위치 이동 및 크기 100%
                opacity: 1, // 완전히 보임
                pointerEvents: 'auto', // 클릭 가능
                visibility: 'visible', // 보임
              }
            : {
                // 닫힘 상태일 때의 스타일
                transform: `translate(0px, ${buttonHeight}px) scale(0.3)`, // 원래 위치, 크기 30%
                opacity: 0, // 투명
                pointerEvents: 'none', // 클릭 불가
                visibility: 'hidden', // 숨김
              }),
          right: 0, // 오른쪽 정렬
          top: 0, // 위쪽 정렬
          zIndex: 40 - i, // z-index 설정 (첫 번째 버블이 가장 위)
        }

        // 반응형 크기 클래스 - 화면 크기에 따라 버블 크기 변경
        const size = 'h-24 w-24 text-sm sm:h-32 sm:w-32 sm:text-base md:h-40 md:w-40' // 모바일: 96px, 태블릿: 128px, 데스크톱: 160px

        // 버블 내부 텍스트 - 선택 불가능하도록 설정
        const inner = (
          <span className="select-none">{it.label}</span> // 텍스트 선택 방지
        )

        // 외부 링크인 경우 - 새 탭에서 열림
        if (it.external) {
          return (
            // 외부 링크 앵커 태그
            <a
              key={it.label} // React key prop - 리스트 렌더링 최적화
              href={it.href} // 링크 URL
              target="_blank" // 새 탭에서 열기
              rel="noreferrer" // 보안을 위한 rel 속성
              className={`${common} ${size}`} // 공통 클래스와 크기 클래스 결합
              style={style} // 인라인 스타일 적용
              aria-label={it.label} // 접근성을 위한 라벨
            >
              {inner} {/* 버블 내부 텍스트 */}
            </a>
          )
        }

        // 내부 링크인 경우 - Next.js Link 컴포넌트 사용
        return (
          <Link
            key={it.label} // React key prop - 리스트 렌더링 최적화
            href={it.href} // 링크 URL
            className={`${common} ${size}`} // 공통 클래스와 크기 클래스 결합
            style={style} // 인라인 스타일 적용
            aria-label={it.label} // 접근성을 위한 라벨
            onClick={() => setOpen(false)} // 클릭 시 메뉴 닫기
          >
            {inner} {/* 버블 내부 텍스트 */}
          </Link>
        )
      })}
    </div>
  )
}