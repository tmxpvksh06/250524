# Stack

## Frontend

- Framework: Next.js
- Deployment: Vercel
- Auth client: Supabase
- Storage client: Supabase Storage

## Backend

- Runtime: Node.js
- Purpose: Local/test server first
- Production role: 필요한 경우 관리자 작업, 결제 웹훅, secret key 기반 서버 API 처리

## Supabase

- Auth: 일반 이메일/비밀번호 회원가입 및 로그인
- Social Auth: Kakao login
- Storage: Supabase bucket
- Image bucket: `saju-images`

## Local Test

- 프론트는 `frontend`에서 실행
- 백엔드 테스트 서버는 `backend`에서 실행
- 로컬 이미지 및 생성 이미지 관리는 `media`에서 수행
