# Prompts

프롬프트는 GitHub에 올리지 않습니다.

## 로컬

```bash
npm run sync-prompt
npm run dev
```

## Vercel (사이트)

`npm run sync-prompt` 실행 후 나오는 **Base64 한 줄**을 사용하는 것을 권장합니다.

1. Vercel → Settings → Environment Variables
2. Name: `SYSTEM_PROMPT_B64`
3. Value: sync-prompt 출력의 Base64 한 줄
4. Save → Redeploy

또는 Name: `SYSTEM_PROMPT` 에 `system-prompt.txt` 전체 붙여넣기 (줄바꿈 깨질 수 있음)

## 배포 확인

Redeploy 후 브라우저에서:

`https://www.yangportfo.com/api/prompt-status`

- `promptSource`: `SYSTEM_PROMPT` 또는 `SYSTEM_PROMPT_B64` 여야 함
- `promptLength`: 약 2400 이상
- `default` 면 프롬프트 미적용 상태
