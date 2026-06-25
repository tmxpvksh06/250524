# Supabase Setup

## 1. Project

Supabase에서 새 프로젝트를 생성합니다.

프론트 환경변수:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=saju-images
```

백엔드 환경변수:

```env
SUPABASE_URL=https://kpxagngxxbauusmvmnho.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

서비스 역할 키와 OpenAI API 키는 Git 또는 Vercel의 `NEXT_PUBLIC_*` 변수에
저장하지 않습니다. 운영 AI API는 Supabase Edge Function Secret을 사용합니다.

## 2. Auth

Authentication > Providers에서 Email provider를 활성화합니다.

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

## 3. Kakao Login

Kakao Developers에서 애플리케이션을 생성합니다.

필요한 값:

- REST API key: Supabase Kakao provider의 client id
- Kakao Login Client Secret: Supabase Kakao provider의 client secret

Supabase Authentication > Sign In / Providers > Kakao에서 Kakao provider를 켜고 위 값을 입력합니다.

Kakao Developers의 Redirect URI에는 Supabase callback URL을 등록합니다.

```text
https://<project-ref>.supabase.co/auth/v1/callback
```

로컬 Supabase CLI를 사용할 경우:

```text
http://localhost:54321/auth/v1/callback
```

## 4. Storage

Storage에서 `saju-images` bucket을 생성합니다.

초기 개발은 private bucket을 권장합니다. 사용자별 경로는 다음 구조를 사용합니다.

```text
<user-id>/<image-id>.<extension>
```

RLS 정책은 `docs/supabase/storage-policies.sql`을 참고합니다.

## 5. 타로 결과 및 결제 권한

Supabase SQL Editor에서 다음 파일을 실행합니다.

```text
docs/supabase/tarot-readings.sql
```

결제 성공 웹훅은 `user_entitlements`에 `product = 'tarot'`, `status = 'active'` 레코드를 생성하거나 갱신해야 합니다.
백엔드는 Supabase access token으로 로그인 사용자를 확인한 뒤 활성 권한이 있을 때만 AI 결과를 `tarot_readings`에 저장합니다.

오늘의 운세 저장 권한은 `product = 'daily-fortune'`, `status = 'active'`로 관리하며 결과는
`daily_fortune_readings`에 저장됩니다.

프론트 환경변수:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

한국천문연구원 음양력 API를 함께 사용할 경우 공공데이터포털 활용신청 후 백엔드 환경변수를 추가합니다.

```env
DATA_GO_KR_SERVICE_KEY=공공데이터포털_일반인증키
```

키가 없거나 공공 API 호출이 실패해도 OpenAI 오늘의 운세 생성은 계속 동작합니다.
