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

- [ ] 도메인: 전 페이지의 `https://www.bohumguide.example` → 실제 도메인으로 교체 (canonical, og, sitemap, robots)
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

## 고지

본 사이트의 콘텐츠는 보험에 대한 일반적인 정보 제공·교육 목적이며, 특정 상품의 가입 권유나 중개가 아닙니다.
실제 보장 내용과 가입 조건은 각 보험사 약관과 전문가 상담을 통해 반드시 확인해야 합니다.
