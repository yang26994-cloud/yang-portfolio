# Prompts

프롬프트 파일은 **GitHub에 올리지 않습니다.**

## 로컬에서 수정

1. `system-prompt.txt` (또는 `prompts/system-prompt.txt`) 수정
2. `npm run dev`로 로컬 테스트

## Vercel 배포

1. `system-prompt.txt` 내용 전체 복사
2. Vercel → Settings → Environment Variables
3. Name: `SYSTEM_PROMPT` / Value: 붙여넣기
4. Production, Preview, Development 모두 체크 → Save → Redeploy

프롬프트를 수정할 때마다 Vercel `SYSTEM_PROMPT`도 같이 업데이트하세요.

## 도움말

```bash
npm run sync-prompt
```

로컬 프롬프트 파일 위치와 Vercel 설정 방법을 안내합니다.
