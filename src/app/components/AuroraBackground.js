// 이 하위 컴포넌트들을 브라우저에서 실행하겠다
'use client' // 클라이언트 컴포넌트 선언 - 브라우저에서 실행되는 컴포넌트임을 명시

// 오로라 배경 컴포넌트 - 화면 전체를 덮는 애니메이션 배경 효과
export default function AuroraBackground() {
  // JSX 반환 - 오로라 효과를 위한 div 요소
  return (
    // 오로라 배경 div - 절대 위치, 전체 화면, 최하위 레이어, 클릭 이벤트 무시
    <div className="aurora absolute inset-0 z-0 pointer-events-none" />
    // aurora: globals.css에 정의된 오로라 애니메이션 클래스
    // absolute: 절대 위치 지정
    // inset-0: top, right, bottom, left 모두 0 (전체 화면 덮기)
    // z-0: z-index 0 (가장 뒤 레이어)
    // pointer-events-none: 마우스 이벤트 무시 (클릭 불가)
  )
}