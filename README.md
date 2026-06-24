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
