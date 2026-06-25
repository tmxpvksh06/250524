# Supabase Edge Functions

기존 Express API는 `supabase/functions/api/index.ts`의 단일 Edge Function으로 이전했습니다.

## 기능 매핑

- `tarot-reading`: AI 타로 결과
- `fortune-cookie`: 포춘쿠키
- `fortune-sign`: 띠별·별자리 운세
- `fortune-daily`: 기간별 운세
- `saju-reading`: 사주 원국 계산 및 AI 해석

## Vercel 환경변수

Vercel에서 GitHub 저장소를 Import한 뒤 프로젝트의 Root Directory를
`frontend`로 지정합니다. Framework Preset은 `Next.js`를 사용하고 나머지
빌드 설정은 자동 감지값을 유지합니다.

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=saju-images
```

위 네 변수는 Production, Preview, Development 환경에 등록합니다. 배포 도메인이
확정되면 `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 변경하고 다시 배포합니다.

Supabase Authentication의 URL Configuration에도 다음 값을 등록합니다.

```text
Site URL: https://your-domain.vercel.app
Redirect URL: https://your-domain.vercel.app/auth/callback
```

## Supabase Secrets

```powershell
npx supabase login
npx supabase link --project-ref PROJECT_REF
npx supabase secrets set OPENAI_API_KEY="YOUR_KEY"
npx supabase secrets set OPENAI_MODEL="gpt-5.4-mini"
npx supabase functions deploy api
```

`OPENAI_API_KEY`는 Vercel 또는 브라우저에 넣지 않습니다. Supabase가 기본 제공하는
`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`도 별도 등록하지 않습니다.
