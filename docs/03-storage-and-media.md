# Storage And Media

## Supabase Storage

이미지 저장소는 Supabase Storage bucket을 사용합니다.

기본 bucket 이름:

```text
saju-images
```

사용자별 이미지 경로:

```text
<user-id>/<image-id>.<extension>
```

## Local Media Folder

로컬 테스트와 UI 제작용 미디어는 프로젝트 루트의 `media` 폴더에서 관리합니다.

```text
media/
  references/
  generated/
  ui/
```

## Folder Rules

`media/references`:

- 사용자가 제공하는 참고 이미지
- `Screenshot` 폴더의 이미지를 분석한 뒤 필요한 경우 복사 또는 참조

`media/generated`:

- Codex 내부 이미지 생성 스킬로 만든 이미지
- 사주, 운세, 상담, 동양적 무드, 서비스 배너 등 AI 생성 이미지

`media/ui`:

- 실제 프론트엔드에서 사용하는 정리된 이미지
- 배너, 아이콘 대체 이미지, 섹션 이미지, 카드 이미지

## Pending Details

사용자 설명을 받은 뒤 다음 내용을 확정합니다.

- Screenshot 폴더 위치: 프로젝트 루트의 `Screenshot`
- 참고할 이미지 우선순위
- 필요한 생성 이미지 개수
- 생성 이미지 스타일
- 실제 앱에 포함할 이미지 목록
