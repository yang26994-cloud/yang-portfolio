# Prompts 폴더

AI 어시스턴트 시스템 프롬프트를 관리합니다.

## 사용 방법

1. `prompts/system-prompt.txt` 수정
2. GitHub에 push → Vercel 자동 배포

Vercel 환경변수 `SYSTEM_PROMPT`가 설정되어 있으면 파일보다 환경변수가 우선합니다.

## 파일 설명

- `system-prompt.txt`: 배포에 포함되는 시스템 프롬프트 (GitHub에 올라감)
- 루트 `system-prompt.txt`: 로컬 전용 백업 (`.gitignore` 처리)

프롬프트 수정 후 배포하려면 `prompts/system-prompt.txt`를 수정하세요.
