# DECISIONS

Use existing account Pages custom domain inheritance; no DNS or root site edits. Publish only curated runtime assets. Retain noindex for review.


## 2026-09-14 · 연락처와 상세 약력

키스컷 상단은 이번 요청의 아이디어 범위로 유지. 약력은 행사 CSV와 추가 활동 JSON을 기준으로 생성하며 최근 6건을 노출하고 이전 행사·상세 활동은 native details로 제공. 이메일은 사용자 직접 지정 우선. SNS 아카이브의 콜라보는 공지 사실로 표현, 성과/출시 완료 주장 없음. 젤리크루는 과거 판매 이력. 검색 결과의 관련 없는 작가 RT나 사업자 등록연도는 사용하지 않음. 이미지 변경 없는 콘텐츠 수정은 build.py --html-only로 기존 색상관리 파생본 재사용.


## 키스컷 첫 화면 1안

사용자가 1안 선택. 제품 안내 이미지 원본 4:5 전체 비율을 사용하며 색상/크롭 수정 없음. 데스크톱 6종, 모바일 두 장과 다음 이미지 일부를 보여 수동 넘김 유도. 자동 재생 없이 CSS scroll-snap 사용, 각 도안은 기존 dialog로 확대, V1/V2 캡션은 대응 실물 컬렉션 앵커. 실물 컬렉션은 한 번만 노출하고 원화/제품/약력/연락처로 이어짐.
