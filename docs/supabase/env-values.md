# Supabase Environment Values

프론트 로그인/회원가입을 실제로 동작시키려면 `frontend/.env.local`에 Supabase 값을 넣어야 합니다.

## Frontend

파일:

```text
frontend/.env.local
```

필수 값:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-or-anon-key
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=saju-images
```

## Where To Find Values

Supabase Dashboard에서 확인합니다.

- `NEXT_PUBLIC_SUPABASE_URL`: Project Settings > API > Project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Project Settings > API > Project API keys의 publishable key 또는 anon public key

## Auth URLs

Authentication > URL Configuration에서 다음 값을 등록합니다.

Site URL:

```text
http://localhost:3001
```

Redirect URLs:

```text
http://localhost:3000/auth/callback
http://localhost:3001/auth/callback
https://your-vercel-domain.vercel.app/auth/callback
```

## Email Auth

Authentication > Providers에서 Email provider를 켭니다.

초기 테스트를 빠르게 하려면 Email confirmation을 끄고 테스트할 수 있습니다.

## Kakao Auth

Authentication > Providers > Kakao를 켜고 Kakao Developers의 REST API key와 client secret을 넣습니다.

Kakao Developers Redirect URI:

```text
https://<project-ref>.supabase.co/auth/v1/callback
```
