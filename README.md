# 야르렁당

# 250524

사주 플랫폼 초기 개발 구조입니다.

## Stack

- Frontend: Next.js, Vercel
- Backend: Node.js test server
- Database/Auth/Storage: Supabase
- Auth: Email/password, Kakao OAuth
- Image storage: Supabase Storage bucket

## Folders

- `frontend`: Next.js app
- `backend`: Node.js test API server
- `docs`: Supabase setup and project notes

## Next Steps

1. Supabase project를 생성합니다.
2. `docs/supabase/setup.md` 순서대로 Auth, Kakao, Storage bucket을 설정합니다.
3. `frontend/.env.local.example`을 복사해서 `frontend/.env.local`을 만듭니다.
4. `backend/.env.example`을 복사해서 `backend/.env`를 만듭니다.

## Vercel Deployment

GitHub 저장소를 Vercel에 Import하고 다음과 같이 설정합니다.

- Root Directory: `frontend`
- Framework Preset: `Next.js`
- Node.js: `22.x` (`frontend/package.json`에서 고정)
- Build/Install/Output 설정: Vercel 자동 감지값 사용

필수 환경변수와 Supabase Auth URL 설정은
[`docs/09-supabase-edge-functions.md`](docs/09-supabase-edge-functions.md)를 참고합니다.
