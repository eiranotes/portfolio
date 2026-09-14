# PROJECT_STATUS

Live: https://app.adeliedraw.com/portfolio/

Deployment commit fc05660; GitHub Actions run 34828649151 succeeded. HTTPS 200; CSS, JS, hero, V1 and V2 SHA256 match local public files. In-app browser verified latest content and memo accordion opening. Search indexing remains disabled for review.


## 2026-09-14 · 연락처와 상세 약력

현재 문의 메일은 사용자 지정 adeliedraw@gmail.com으로 확정. 트위터/X @Adeliedraw 링크 추가. 행사 9건의 정확한 날짜·장소·확보된 부스와 활동 7건을 최근/펼침 구조로 반영. 젤리크루 2022 판매 및 2023 콜라보 마켓 공지 추가 조사. 키스컷 상단은 docs/KISSCUT_HERO_IDEAS.md에 3안 제시, 구현은 아직 하지 않음. 이미지 공개 파일은 기존 배포와 동일하게 유지. 일부 프로파일 처리의 재빌드 차이를 피하도록 --html-only 옵션 추가. 검증: 정적 검사, JS 문법, 390/1440 가로 넘침0, 약력 펼침/문의 링크. X 원문은 직접 확인하지 못했고 공개 마켓 공지 인덱스로 대조. 상세 근거는 sources/biography-research-2026-09-14.md.


## 키스컷 첫 화면 1안

1안 구현: 첫 화면에 V1/V2 각 3개씩 총 6종 도안 이미지. 데스크톱 6열, 태블릿/모바일 수동 가로 스크롤과 확대 보기. 두 실물 컬렉션은 바로 다음 섹션으로 이동, 원화 섹션으로 이어짐. 기존 색상관리 이미지 재사용. 링크 공유 이미지도 V2 실물로 변경. 검증: 320/390/768/1440 가로 넘침 0, 모바일 수동 가로 넘김, 마지막 이미지 확대, Escape 닫기/포커스 복귀, 고유 앵커/컬렉션 중복 없음, 정적 검사 및 JS 문법 통과.


## 2026-09-14 · 키스컷 조각 창

첫 화면을 키스컷 조각 130개(V1 6종 83개, V2 5종 47개)로 만든 두 장의 창으로 교체. 조각 파생본 public/assets/kisscut/ 130개(2.5 MiB) 추가, 미참조 hero 파일 2개 제거, 기존 참조 이미지는 파일명 픽셀 지문이 같아 그대로 유지. check_site.py는 하위 폴더 자산과 조각 개수까지 검사. 배포 검증은 아래 이어서 기록.

배포 완료: https://app.adeliedraw.com/portfolio/ · 커밋 eeb3d88 · Actions 34838053016 성공. 공개 HTML/CSS/JS SHA256 로컬 일치, 조각 이미지 표본 6개와 OG 이미지 원격/로컬 일치. Chrome으로 공개 페이지 1440/390 렌더링: 조각 130개 참조, 실패 요청 0, 콘솔 오류 0, 가로 넘침 0. 캡처 site/qa/deployed-glass-desktop.png / -mobile.png.


## 2026-09-14 · 대표작 소개 구조와 색 보정

사용자 피드백 3건 반영. (1) 헤더 바로 아래에 대표작으로서 스테인드글라스 키스컷을 설명하는 인트로(무엇인지, PET·오로라 박·폭 40/30mm·길이 5m — 브랜드 제품 안내 이미지 문구 기준, V1 6종/V2 5종)와 대표 조각 6개 클러스터. (2) 조각 색상: 원본 PSD가 CMYK(V1은 Japan Color 2001 Coated 내장, V2는 프로파일 미내장)라 파이프라인의 단순 -colorspace sRGB 변환이 과채도였음. ImageMagick으로 CMYK 원시 채널만 평탄화하고 Pillow ImageCms로 ICC→sRGB relative colorimetric 변환. V2는 V1과 같은 Japan Color 2001 Coated를 가정하고 sources/kisscut-stickers.json에 테이프별 inputProfile로 기록. Pillow 단독 PSD 읽기는 AD-KC-0018에서 채널이 깨져 사용하지 않음. (3) 130개 전체 나열 대신 테이프마다 3조각씩 큐레이션(V1 18, V2 15, 인트로 6 = 공개 파생본 33개 0.97 MiB), "낮의 창/밤의 창" 리드와 테이프별 제목·묘사 캡션으로 작품 소개 구조. 범례 스포트라이트/상태 문구 JS는 제거.

검증: 320~1440 가로 넘침 0·잘림 0, 콘솔 0, 키보드 확대/닫기/포커스 복귀, 참조 자산 119개 존재, 중복 ID/깨진 앵커 0, node --check. 캡처 site/qa/signature-*.png. 캡션은 묘사형이며 공식 작품 설명이 아님.
