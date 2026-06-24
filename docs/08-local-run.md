# Local Run

## Frontend

```bash
cd frontend
npm install
npm run dev
```

로컬 주소:

```text
http://localhost:3000
```

## Backend

```bash
cd backend
npm install
npm run dev
```

로컬 주소:

```text
http://localhost:4000
```

Health check:

```text
http://localhost:4000/health
```

## Current Verification

- Frontend `npm run build`: 통과
- Backend `/health`: 정상 응답

## Supabase Switch

최종 Supabase 연결 시 다음 파일을 설정합니다.

```text
frontend/.env.local
backend/.env
```

템플릿:

```text
frontend/.env.local.example
backend/.env.example
```
