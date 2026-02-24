'use client' // 클라이언트 컴포넌트 선언 - 브라우저에서 실행되는 컴포넌트임을 명시

import { useState } from 'react' // React의 useState 훅 import - 상태 관리를 위해 사용
// AI 서비스 import (나중에 실제 AI API로 교체 가능)
import { callAIAPI } from '../utils/aiService' // AI 응답 생성 함수 import

// 채팅 위젯 컴포넌트 - 오른쪽 하단에 고정되는 채팅창
export default function ChatWidget() {
  // 채팅창 열림/닫힘 상태 관리 - false: 닫힘, true: 열림
  const [isOpen, setIsOpen] = useState(false) // useState로 초기값 false 설정
  // 입력된 메시지 상태 관리 - 사용자가 입력하는 텍스트를 저장
  const [message, setMessage] = useState('') // useState로 빈 문자열 초기값 설정
  // 채팅 메시지 목록 상태 관리 - 모든 채팅 메시지를 배열로 저장
  const [messages, setMessages] = useState([
    // 초기 메시지 설정 - 봇이 보낸 첫 인사말
    { id: 1, text: '안녕하세요! 저에 대해 궁금한 것이 있으시면 물어보세요!', sender: 'bot', time: new Date() }
  ])
  // AI 응답 로딩 상태 - AI가 응답을 생성하는 중인지 여부
  const [isLoading, setIsLoading] = useState(false) // useState로 초기값 false 설정

  // 메시지 전송 핸들러 - 폼 제출 시 실행되는 비동기 함수
  const handleSend = async (e) => {
    e.preventDefault() // 폼의 기본 제출 동작(페이지 새로고침) 방지
    // 메시지가 비어있거나 공백만 있거나, 로딩 중이면 함수 종료
    if (!message.trim() || isLoading) return

    // 사용자 입력 메시지에서 앞뒤 공백 제거
    const userMessage = message.trim()
    if (typeof window !== 'undefined') console.log('[채팅 전송]', userMessage)

    // 사용자 메시지 객체 생성 - 메시지 목록에 추가할 객체
    const newMessage = {
      id: messages.length + 1, // 고유 ID 생성 (현재 메시지 개수 + 1)
      text: userMessage, // 사용자가 입력한 메시지 텍스트
      sender: 'user', // 발신자 구분 (user: 사용자, bot: 봇)
      time: new Date() // 현재 시간 저장
    }
    // 메시지 목록에 새 메시지 추가 - 이전 메시지들에 새 메시지 추가
    setMessages(prev => [...prev, newMessage])
    setMessage('') // 입력 필드 초기화

    // AI 응답 생성 및 추가
    setIsLoading(true) // 로딩 상태를 true로 변경 - AI 응답 대기 중 표시
    try {
      // AI API 호출 (나중에 실제 AI API로 교체) - 사용자 메시지를 전달하여 AI 응답 받기
      const aiResponse = await callAIAPI(userMessage)
      
      // 봇 응답 객체 생성 - AI가 생성한 응답을 메시지 형식으로 변환
      const botResponse = {
        id: messages.length + 2, // 고유 ID 생성 (사용자 메시지 ID + 1)
        text: aiResponse, // AI가 생성한 응답 텍스트
        sender: 'bot', // 발신자 구분 (봇)
        time: new Date() // 현재 시간 저장
      }
      // 메시지 목록에 봇 응답 추가
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      // 에러 처리 - AI API 호출 실패 시 실행
      console.error('AI 응답 생성 오류:', error) // 콘솔에 에러 로그 출력
      // 에러 메시지 객체 생성 - 사용자에게 에러 안내
      const errorResponse = {
        id: messages.length + 2, // 고유 ID 생성
        text: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', // 에러 안내 메시지
        sender: 'bot', // 발신자 구분 (봇)
        time: new Date() // 현재 시간 저장
      }
      // 메시지 목록에 에러 메시지 추가
      setMessages(prev => [...prev, errorResponse])
    } finally {
      // try-catch 블록 실행 후 항상 실행 - 로딩 상태를 false로 변경
      setIsLoading(false) // 로딩 완료 표시
    }
  }

  // 시간 포맷 함수 - Date 객체를 한국어 시간 형식으로 변환
  const formatTime = (date) => {
    // 한국어 로케일로 시간을 '시:분' 형식으로 변환 (예: "오후 3:45")
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }

  // 컴포넌트 렌더링 - JSX 반환
  return (
    // 채팅 위젯 컨테이너 - 화면 오른쪽 하단에 고정 위치
    <div className="fixed bottom-6 right-6 z-50">
      {/* 채팅창이 열렸을 때 보이는 메인 창 - isOpen이 true일 때만 렌더링 */}
      {isOpen && (
        // 채팅창 메인 컨테이너 - 너비 384px, 높이 500px, 세로 방향 flex 레이아웃
        <div className="mb-4 w-96 h-[500px] bg-gray-900 border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* 채팅창 헤더 - 그라데이션 배경, 가로 방향 flex 레이아웃 */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 flex items-center justify-between">
            {/* 왼쪽: 상태 표시 영역 - 가로 방향 flex, 아이템 간격 */}
            <div className="flex items-center space-x-3">
              {/* 온라인 상태 표시 점 - 초록색, 깜빡이는 애니메이션 */}
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              {/* 제목과 상태 텍스트 영역 */}
              <div>
                {/* 채팅창 제목 */}
                <h3 className="text-white font-semibold">보안 상담</h3>
                {/* 온라인 상태 텍스트 - 반투명 흰색 */}
                <p className="text-white/80 text-xs">온라인</p>
              </div>
            </div>
            {/* 닫기 버튼 - 클릭 시 채팅창 닫기 */}
            <button
              onClick={() => setIsOpen(false)} // 클릭 시 isOpen을 false로 변경
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors" // 호버 시 배경색 변경
            >
              {/* X 아이콘 SVG */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {/* X 모양 경로 */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 채팅 메시지 영역 - 남은 공간 모두 사용, 세로 스크롤 가능, 반투명 배경 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800/50">
            {/* 메시지 목록 렌더링 - 각 메시지를 순회하며 표시 */}
            {messages.map((msg) => (
              // 각 메시지 컨테이너 - 사용자는 오른쪽, 봇은 왼쪽 정렬
              <div
                key={msg.id} // React key prop - 리스트 렌더링 최적화
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} // 발신자에 따라 정렬 변경
              >
                {/* 메시지 버블 - 발신자에 따라 색상 다르게 표시 */}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' // 사용자: 그라데이션 배경, 흰색 텍스트
                      : 'bg-gray-700 text-gray-200' // 봇: 회색 배경, 밝은 회색 텍스트
                  }`}
                >
                  {/* 메시지 텍스트 - 줄바꿈 처리 (줄바꿈 문자 유지) */}
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  {/* 메시지 시간 표시 - 발신자에 따라 텍스트 색상 다르게 */}
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-gray-400' // 사용자: 반투명 흰색, 봇: 회색
                  }`}>
                    {formatTime(msg.time)} {/* 시간 포맷팅 함수 호출 */}
                  </p>
                </div>
              </div>
            ))}
            
            {/* AI 응답 로딩 표시 - 로딩 중일 때만 표시 */}
            {isLoading && (
              // 로딩 애니메이션 컨테이너 - 왼쪽 정렬
              <div className="flex justify-start">
                {/* 로딩 메시지 버블 */}
                <div className="bg-gray-700 text-gray-200 rounded-lg px-4 py-2">
                  {/* 점 3개 애니메이션 - 순차적으로 튀는 효과 */}
                  <div className="flex space-x-1">
                    {/* 첫 번째 점 - 0ms 지연 */}
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    {/* 두 번째 점 - 150ms 지연 */}
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    {/* 세 번째 점 - 300ms 지연 */}
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 메시지 입력 영역 - 폼 컨테이너, 상단 테두리 */}
          <form onSubmit={handleSend} className="p-4 bg-gray-900 border-t border-cyan-500/20">
            {/* 입력 필드와 버튼을 가로로 배치 */}
            <div className="flex space-x-2">
              {/* 메시지 입력 필드 */}
              <input
                type="text" // 텍스트 입력 타입
                value={message} // 입력값을 message 상태와 연결
                onChange={(e) => setMessage(e.target.value)} // 입력 시 message 상태 업데이트
                placeholder={isLoading ? "AI가 응답 중..." : "저에 대해 물어보세요..."} // 로딩 중일 때와 아닐 때 다른 플레이스홀더
                disabled={isLoading} // 로딩 중일 때 입력 비활성화
                className="flex-1 px-4 py-2 bg-gray-800 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" // 스타일링: 남은 공간 모두 사용, 포커스 시 테두리 색상 변경
              />
              {/* 전송 버튼 */}
              <button
                type="submit" // 폼 제출 버튼
                disabled={isLoading} // 로딩 중일 때 버튼 비활성화
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" // 그라데이션 배경, 호버 시 그림자 효과
              >
                {/* 로딩 중일 때: 회전하는 로딩 아이콘, 아닐 때: 전송 아이콘 */}
                {isLoading ? (
                  // 로딩 스피너 - 흰색 테두리, 상단만 투명, 회전 애니메이션
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  // 전송 아이콘 SVG - 종이비행기 모양
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* 전송 아이콘 경로 */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 채팅 열기 버튼 - 항상 표시되는 원형 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)} // 클릭 시 isOpen 상태 토글 (true ↔ false)
        className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110" // 원형 버튼, 그라데이션 배경, 호버 시 확대 효과
      >
        {/* isOpen 상태에 따라 다른 아이콘 표시 */}
        {isOpen ? (
          // 열렸을 때: X 아이콘 (닫기)
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* X 모양 경로 */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // 닫혔을 때: 채팅 아이콘 (열기)
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* 채팅 말풍선 모양 경로 */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* 알림 배지 (새 메시지가 있을 때) - 채팅창이 닫혀있을 때만 표시 */}
      {!isOpen && (
        // 빨간색 원형 배지 - 버튼 오른쪽 상단에 위치
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          {/* 알림 숫자 표시 */}
          <span className="text-white text-xs font-bold">1</span>
        </div>
      )}
    </div>
  )
}
