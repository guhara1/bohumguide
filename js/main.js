/* =========================================================
   보험길잡이 — 공통 스크립트
   - 모바일 햄버거 메뉴 토글
   - 모바일 아코디언 서브메뉴
   - 데스크톱 드랍다운 키보드 접근성
   - 현재 연도 자동 표기
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.getElementById("main-nav");
    var toggle = document.querySelector(".nav-toggle");

    /* ---- 모바일: 햄버거로 전체 메뉴 열기/닫기 ---- */
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("open", !expanded);
        // 메뉴를 닫을 때 열려있던 서브메뉴도 정리
        if (expanded) {
          closeAllSubmenus();
        }
      });
    }

    /* ---- 드랍다운(서브메뉴 있는 상위 항목) ---- */
    var parents = document.querySelectorAll(".main-nav .has-sub");

    function isMobile() {
      return window.matchMedia("(max-width: 900px)").matches;
    }

    function closeAllSubmenus(except) {
      parents.forEach(function (li) {
        if (li === except) return;
        li.classList.remove("open");
        var btn = li.querySelector(".menu-toggle");
        var sub = li.querySelector(".submenu");
        if (btn) btn.setAttribute("aria-expanded", "false");
        if (sub) sub.classList.remove("open");
      });
    }

    parents.forEach(function (li) {
      var btn = li.querySelector(".menu-toggle");
      var sub = li.querySelector(".submenu");
      if (!btn || !sub) return;

      /* 클릭/Enter/Space: 서브메뉴 토글 (모바일=아코디언, 데스크톱=드랍다운 고정 열기) */
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var open = li.classList.contains("open");
        closeAllSubmenus(li);
        li.classList.toggle("open", !open);
        sub.classList.toggle("open", !open);
        btn.setAttribute("aria-expanded", String(!open));
      });

      /* 키보드: 아래 화살표로 서브메뉴 첫 항목 진입 */
      btn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          li.classList.add("open");
          sub.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
          var first = sub.querySelector("a");
          if (first) first.focus();
        } else if (e.key === "Escape") {
          li.classList.remove("open");
          sub.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
          btn.focus();
        }
      });

      /* 서브메뉴 내부 키보드 이동 */
      sub.addEventListener("keydown", function (e) {
        var links = Array.prototype.slice.call(sub.querySelectorAll("a"));
        var idx = links.indexOf(document.activeElement);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (idx < links.length - 1) links[idx + 1].focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (idx > 0) links[idx - 1].focus();
          else btn.focus();
        } else if (e.key === "Escape") {
          li.classList.remove("open");
          sub.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
          btn.focus();
        }
      });
    });

    /* ---- 바깥 클릭 시 데스크톱 드랍다운 닫기 ---- */
    document.addEventListener("click", function (e) {
      if (isMobile()) return;
      if (!e.target.closest(".main-nav")) {
        closeAllSubmenus();
      }
    });

    /* ---- 창 크기 변경 시 상태 초기화 ---- */
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!isMobile()) {
          if (nav) nav.classList.remove("open");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
          closeAllSubmenus();
        }
      }, 150);
    });

    /* ---- 푸터 연도 자동 표기 ---- */
    var yearEl = document.getElementById("footer-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    /* ---- 문의 폼: 정적 사이트용 mailto 처리 (플레이스홀더) ---- */
    var contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = encodeURIComponent(contactForm.name.value || "");
        var email = encodeURIComponent(contactForm.email.value || "");
        var msg = encodeURIComponent(contactForm.message.value || "");
        // TODO: 추후 Formspree 등 실제 전송 서비스 연결
        var body = "이름: " + decodeURIComponent(name) + "%0D%0A이메일: " +
          decodeURIComponent(email) + "%0D%0A%0D%0A" + decodeURIComponent(msg);
        window.location.href = "mailto:contact@bohumguide.example?subject=" +
          encodeURIComponent("[보험길잡이 문의] " + decodeURIComponent(name)) + "&body=" + body;
      });
    }
  });
})();
