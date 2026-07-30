# 보험길잡이 (Bohum Guide)

구글 애드센스 승인과 네이버·구글 검색 노출에 최적화한 **한국어 보험 정보 제공 정적 사이트**입니다.
순수 HTML5 + CSS3 + Vanilla JavaScript로 만들어졌으며, 빌드 도구나 npm 설치 없이 파일을 브라우저로 바로 열면 동작합니다.

## 특징

- 프레임워크·빌드 없음 — `index.html`을 브라우저로 바로 열면 실행
- 반응형(모바일/태블릿/PC), 모바일 햄버거 + 아코디언 메뉴, 데스크톱 드랍다운
- 시맨틱 마크업, 키보드 접근성, 충분한 색 대비
- 전 페이지 SEO 세팅(title, description, keywords, Open Graph, canonical, `lang="ko"`)
- `robots.txt` / `sitemap.xml` / `ads.txt` 포함
- 애드센스 정책 대비: 필수 정책 페이지(개인정보처리방침·면책조항·소개·문의)와 실제 본문이 채워진 정보 글

## 폴더 구조

```
/
├── index.html            홈
├── about.html            소개
├── contact.html          문의하기
├── privacy.html          개인정보처리방침
├── disclaimer.html       면책조항/금융정보 고지
├── sitemap.xml
├── robots.txt
├── ads.txt
├── css/style.css
├── js/main.js
├── guide/                보험 기초 가이드 (terms, checklist, premium)
├── types/                보험 종류별 정보 (health, cancer, car, driver)
├── situation/            상황별 정보 (young, family)
└── claim/                보험금 청구 (process, rejected)
```

## 로컬에서 확인하는 법

- 파일 탐색기에서 `index.html`을 더블클릭해 브라우저로 엽니다. 상단 메뉴 드랍다운, 모바일 햄버거, 페이지 이동이 동작하는지 확인하세요.
- 또는 간단한 로컬 서버로 확인(권장):
  ```bash
  python3 -m http.server 8000
  # 브라우저에서 http://localhost:8000 접속
  ```

## 게시 전 반드시 교체할 자리 (placeholder)

- [ ] 도메인: 전 페이지의 `https://bohumguide.netlify.app` → 실제 도메인으로 교체 (canonical, og, sitemap, robots)
- [ ] `robots.txt`, `sitemap.xml`의 도메인/날짜
- [ ] `ads.txt`: 애드센스 승인 후 `google.com, pub-XXXXXXXX, DIRECT, f08c47fec0942fa0` 형식으로 작성
- [ ] 각 페이지 `<head>`의 네이버/구글 소유확인 메타태그 주석 자리
- [ ] 애드센스 승인 후: `index.html` 등의 애드센스 스크립트 주석 활성화 + 각 `AD SLOT` 위치에 광고 단위 코드 삽입
- [ ] 이메일 주소 `contact@bohumguide.example` → 실제 주소
- [ ] 문의 폼: 필요 시 Formspree 등 연결 (`js/main.js`의 TODO 참고)
- [ ] **각 정보 글 상단의 "편집자 참고" 안내대로 제도·수치의 사실관계를 검수·수정** 후 안내 문구 삭제

## 배포(초보자용 3단계)

1. **Netlify에 올리기** — [app.netlify.com/drop](https://app.netlify.com/drop)에 이 폴더를 통째로 드래그앤드롭하면 즉시 임시 주소로 게시됩니다. (또는 이 저장소를 Netlify/Vercel/GitHub Pages에 연결)
2. **도메인 연결** — Netlify의 Domain settings에서 구입한 도메인을 연결하고, 위 placeholder의 도메인 값을 실제 도메인으로 교체 후 다시 배포합니다.
3. **검색·광고 등록** — ① 네이버 서치어드바이저와 ② 구글 서치콘솔에 사이트를 등록(소유확인 메타태그 삽입)하고 `sitemap.xml`을 제출한 뒤, ③ 구글 애드센스에 사이트를 신청합니다. 승인 후 `ads.txt`와 광고 코드를 채웁니다.

## 검색엔진 색인을 가장 빠르게 반영하는 법

이미 갖춰진 것 (코드 레벨):

- `sitemap.xml` — 전체 페이지 79개 URL 포함, 이번에 내용을 수정한 페이지들은 `lastmod`를 최신 날짜로 갱신해 재크롤링을 유도합니다.
- `robots.txt` — 모든 크롤러 허용 + 네이버(Yeti)·구글봇(Googlebot) 명시적 허용 + `sitemap.xml` 위치 안내.
- `rss.xml` — 블로그 글 61개 전체, `lastBuildDate` 최신화. 네이버 서치어드바이저에 RSS를 등록해 두면 새 글이 훨씬 빠르게 수집됩니다.
- **IndexNow 연동** — 네이버 서치어드바이저·빙 등이 지원하는 [IndexNow](https://www.indexnow.org/) 프로토콜을 붙여 뒀습니다. 정규 크롤링을 기다리지 않고 URL 변경을 즉시 통보할 수 있습니다.
  - 소유확인 키 파일: `9c9a1e7283e235597d59f37b661c8b26.txt` (배포 시 사이트 루트에 그대로 있어야 함)
  - 제출 스크립트: `scripts/indexnow-submit.sh` — 배포가 끝난 뒤 실행하면 `sitemap.xml`의 모든 URL을 IndexNow로 즉시 제출합니다.
    ```bash
    ./scripts/indexnow-submit.sh
    ```
  - GitHub Actions(`.github/workflows/indexnow.yml`) — `main` 브랜치에 `sitemap.xml` 변경이 반영될 때마다 위 스크립트를 자동 실행합니다. (Netlify 배포와 별개로, GitHub 저장소의 `main`에 머지되는 시점 기준으로 동작합니다.)
  - ⚠️ 구글은 IndexNow를 지원하지 않습니다. 구글은 아래 서치콘솔 절차가 필요합니다.

사용자가 직접 해야 하는 것 (계정 로그인이 필요해 코드로 대신할 수 없음):

1. **네이버 서치어드바이저** (https://searchadvisor.naver.com) — 사이트 소유확인은 이미 완료되어 있습니다(`naver-site-verification` 메타태그 값 존재). 아직 안 하셨다면 ① `사이트맵 제출`에 `https://bohumguide.netlify.app/sitemap.xml` 등록, ② `RSS 제출`에 `https://bohumguide.netlify.app/rss.xml` 등록, ③ `웹마스터 도구 > 요청 > 웹페이지 수집`으로 주요 페이지 개별 수집 요청을 하면 보통 몇 시간~하루 안에 반영됩니다.
2. **구글 서치콘솔** (https://search.google.com/search-console) — 아직 소유확인이 안 되어 있습니다(`index.html` 등 `<head>`의 `<!-- 구글 서치콘솔 소유확인 메타태그 자리 -->` 주석이 실제 태그로 아직 교체되지 않음). 사이트 등록 후 발급되는 `google-site-verification` 메타태그를 그 자리에 넣고 배포한 뒤, `URL 검사` 도구로 `색인 생성 요청`을 누르면 가장 빠르게 반영됩니다. 이후 `Sitemaps` 메뉴에 `sitemap.xml`을 제출해 두면 이후 글은 자동으로 주기적 수집됩니다.

## 고지

본 사이트의 콘텐츠는 보험에 대한 일반적인 정보 제공·교육 목적이며, 특정 상품의 가입 권유나 중개가 아닙니다.
실제 보장 내용과 가입 조건은 각 보험사 약관과 전문가 상담을 통해 반드시 확인해야 합니다.
