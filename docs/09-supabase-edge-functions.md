# Supabase Edge Functions

기존 Express API는 `supabase/functions/api/index.ts`의 단일 Edge Function으로 이전했습니다.

## 기능 매핑

- `tarot-reading`: AI 타로 결과
- `fortune-cookie`: 포춘쿠키
- `fortune-sign`: 띠별·별자리 운세
- `fortune-daily`: 기간별 운세
- `saju-reading`: 사주 원국 계산 및 AI 해석

## Vercel 환경변수

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=saju-images
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
