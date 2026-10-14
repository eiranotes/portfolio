# CHANGELOG

Deploy color-corrected portfolio with 4 independent product disclosures, V1/V2 collections and productized postcard artwork.


## 2026-09-14 · 연락처와 상세 약력

- 협업 문의에 adeliedraw@gmail.com 및 트위터/X 링크 추가.
- 약력의 행사 날짜·장소·부스 정보 상세화, 이전 행사·브랜드 활동 펼침 추가.
- 젤리크루 판매 이력 및 2023 콜라보 마켓 공지 등 활동 7건 반영.


## 키스컷 첫 화면 1안

- 키스컷 6종을 첫 화면에 배치하고 모바일 가로 넘김·확대 제공.
- V1/V2 실물 컬렉션을 바로 아래로 이동.
- 공유 미리보기 이미지를 키스컷 실물로 변경.


## 2026-09-14 · 키스컷 조각 창

- 첫 화면을 스테인드글라스 키스컷 조각 130개로 만든 두 장의 창(첫 번째 버전 V1 · 두 번째 버전 V2)으로 교체.
- 테이프 이름을 호버/선택하면 해당 조각만 강조, 조각 확대 보기와 조각 이름 표시 추가.
- https://app.adeliedraw.com/portfolio/ 에 배포(eeb3d88).


## 2026-09-14 · 대표작 소개 구조와 색 보정

- 헤더 아래에 스테인드글라스 키스컷 대표작 설명과 사양, 대표 조각 6개 추가.
- 조각 색상을 원본 CMYK 프로파일 기준으로 다시 변환해 과채도 수정.
- 낮의 창(V1 6종)·밤의 창(V2 5종)을 테이프별 3조각과 제목·설명으로 소개하는 구조로 변경. 전체 130조각 나열 제거.
- https://app.adeliedraw.com/portfolio/ 에 배포(f4ce278).


## 2026-09-14 · 브랜드 우선 구조와 금박·은박 선

- 최상단에 아델리드로우 브랜드 소개(문장·About·원화)를 두고 대표작 소개를 그 아래로 이동, 메뉴에 "대표작" 추가.
- 키스컷 조각의 선을 검정 대신 실제 제품처럼 금박(과일·트로피컬·보태니컬·V2)과 은박(바다·연꽃·제비와 아이리스)으로 표현.
- https://app.adeliedraw.com/portfolio/ 에 배포(9d2ed77).

## 2026-10-07 · Shared Adelie web design

- Shared brand bar (Info current; Shop follows locale: shop./jp./en.), shared footer with penguin cameo, woodfree paper background, `--ad-*` tokens with legacy aliases.
- LINE Seed has only 400/700: every 500 request became 400. Eyebrows are 12px bold indigo; heading tracking follows the shared display token; content width follows the shared content width and gutter.
- Signature section "빛이 스며드는 창": a day/night switch (KO/JA/EN labels) turns the section into the V2 night pane with backlit pieces, and a light band runs across the foil lines under the pointer (or once as the section comes into view on touch screens). Reduced motion keeps the switch but drops the light band.

## 2026-10-14 · Official store links

- Sales channels and the buyer section list the official stores first (KO page: shop. / en. / jp.; JA page: jp. first; EN page: en. first) with the Adelie Draw icon; JSON-LD `sameAs` includes the three stores.
- Kiss-cut collection (V1/V2) and each of the four product categories link to the matching filter on the locale's store (memo → paper, stickers → sticker, kiss-cut → kisscut, postcards & small goods → all).
- Gallery links no longer repeat their name three times for screen readers: the hidden `sr-only` span is gone and the link label says what it does ("… 크게 보기" / "拡大表示" / "Enlarge"), like the kiss-cut pieces.
