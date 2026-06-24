# Project Architecture

## Frontend

Next.js App Router로 구성합니다. Vercel 배포를 기준으로 `frontend` 폴더가 배포 루트입니다.

주요 기능:

- 이메일/비밀번호 회원가입
- 이메일/비밀번호 로그인
- Kakao OAuth 로그인
- 로그인 사용자 대시보드
- Supabase Storage 이미지 업로드

## Backend

`backend`는 테스트 서버입니다. 초기에는 Supabase Auth 토큰 검증과 서버 API 실험 용도로만 둡니다.

실서비스 API가 필요해지면 다음 기능을 이 서버에 추가합니다.

- 상담 주문 생성
- 결제 웹훅 수신
- 관리자 작업
- Supabase secret key가 필요한 서버 작업

## Supabase

Supabase는 다음 역할을 담당합니다.

- Auth: 일반 회원가입, 카카오 로그인
- Database: 회원 프로필, 상담 요청, 결제/주문 상태
- Storage: 상담 이미지 저장
- RLS: 사용자별 데이터 접근 제어
