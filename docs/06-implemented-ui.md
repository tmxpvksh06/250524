# Implemented UI

## Reference Direction

`Screenshot` 폴더의 참고 이미지를 기준으로 다음 패턴을 반영했습니다.

- 모바일 중심 풀스크린 일러스트
- 캐릭터 중심 히어로
- 콘텐츠 카드형 사주 목록
- 하단 CTA 중심 흐름
- 어두운 배경과 금색/붉은색 강조색

## Brand

- 서비스명: `야르렁당`
- 영문명: `Wolmyeongdang`
- 태그라인: `달빛 아래 사주를 읽는 곳`

## Main Menu Focus

메인 서비스 목록은 다음 2개만 유지합니다.

- 정통 사주
- 타로

네비게이션의 오늘의 운세 성격 메뉴는 `정통사주`로 정리합니다.

## Character Names

- 서아린: 정통 사주
- 리안: 타로

## Pages

현재 구현된 프론트 페이지:

- `/`: 메인, 사주 목록, 상담 흐름, 로그인/회원가입
- `/consultation`: 상담 신청 입력 화면
- `/dashboard`: 로그인 후 대시보드
- `/upload`: 상담 이미지 업로드
- `/auth/callback`: Supabase OAuth callback

## Local Test Mode

Supabase 환경변수가 없을 때도 UI 확인이 가능하도록 로컬 테스트 모드를 적용했습니다.

- 인증 버튼은 안내 메시지를 표시합니다.
- 이미지 업로드는 선택 파일명을 표시하고 실제 업로드는 하지 않습니다.
- 대시보드와 업로드 화면은 로컬 테스트 회원으로 접근 가능합니다.

Supabase 환경변수를 설정하면 실제 인증 및 스토리지 기능으로 전환됩니다.
