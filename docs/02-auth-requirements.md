# Auth Requirements

## Required Login Methods

1. 일반 회원가입
2. 일반 로그인
3. 카카오톡 소셜 로그인

## Supabase Auth

Supabase Auth를 인증의 기준으로 사용합니다.

일반 회원가입은 이메일/비밀번호 방식으로 구성합니다.

카카오 로그인은 Supabase OAuth provider `kakao`를 사용합니다.

## Redirect

로컬 테스트 redirect:

```text
http://localhost:3000/auth/callback
```

Vercel 배포 redirect:

```text
https://your-vercel-domain.vercel.app/auth/callback
```

## Pending Details

사용자 설명을 받은 뒤 다음 내용을 확정합니다.

- 회원 유형
- 온보딩 단계
- 로그인 후 첫 화면
- 관리자 계정 필요 여부
- 사주 상담 신청과 회원 정보 연결 방식
