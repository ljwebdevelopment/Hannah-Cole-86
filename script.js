/* ==========================================================================
   Hannah Cole for OK 86 — script.js (Mobile-first, no popups)
   - Accessible hamburger menu (overlay + focus trap + scroll lock)
   - Consistent nav behavior across pages
   - Active link highlighting (fallback if aria-current not set)
   - Simple form helpers (no backend): volunteer + contact
   - No alerts / no modal popups
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const isMobile = () => window.matchMedia("(max-width: 760px)").matches;

  function safeJsonParse(str, fallback) {
    try { return JSON.parse(str); } catch { return fallback; }
  }

  function injectBaseStylesOnce() {
    if (document.getElementById("cole-js-styles")) return;

    const style = document.createElement("style");
    style.id = "cole-js-styles";
    style.textContent = `
      /* ===== JS-injected styles: mobile nav + status UI ===== */

      /* Lock scroll when nav open */
      body.nav-open { overflow: hidden; }

      /* IMPORTANT:
         Your CSS sets the mobile header to z-index ~999.
         Overlay/drawer must be ABOVE it so taps work correctly. */

      /* Mobile overlay */
      .nav-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.55);
        z-index: 1200;
        display: none;
      }
      .nav-overlay[data-open="true"] { display: block; }

      /* Mobile drawer */
      .nav-drawer {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: min(86vw, 360px);
        background: var(--navy, #0b1420);
        color: #fff;
        z-index: 1300;
        transform: translateX(102%);
        transition: transform 220ms ease;
        padding: 18px 16px 22px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        box-shadow: -18px 0 44px rgba(0,0,0,0.22);
        overscroll-behavior: contain;
        outline: none;
      }
      .nav-drawer[data-open="true"] { transform: translateX(0); }

      .nav-drawer__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
      }
      .nav-drawer__close {
        height: 44px;
        padding: 0 14px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.18);
        background: rgba(255,255,255,0.10);
        color: #fff;
        text-transform: uppercase;
        letter-spacing: .14em;
        font-weight: 800;
        cursor: pointer;
      }

      .nav-drawer a {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        height: 44px;
        padding: 0 14px;
        border-radius: 10px;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.14);
        text-transform: uppercase;
        letter-spacing: .14em;
        font-size: .80rem;
        font-weight: 800;
      }
      .nav-drawer a[aria-current="page"]{
        background: rgba(230,180,88,0.95);
        color: #2a1b10;
        border-color: rgba(0,0,0,0);
      }

      .nav-drawer .nav-drawer__cta a {
        justify-content: center;
        height: 50px;
        background: rgba(89,116,140,0.95);
        color: #061523;
        border-color: rgba(255,255,255,0.0);
      }

      /* In-page form status message */
      .form-status {
        margin-top: 12px;
        padding: 12px;
        border-radius: 12px;
        border: 2px solid rgba(15,23,32,0.18);
        background: rgba(238,242,246,0.75);
        font-weight: 700;
        color: rgba(15,23,32,0.80);
      }
      .form-status--ok { border-color: rgba(77,106,71,0.95); }
      .form-status--err { border-color: rgba(166,55,45,0.95); }

      /* Respect reduced motion */
      @media (prefers-reduced-motion: reduce){
        .nav-drawer { transition: none; }
      }
    `;
    document.head.appendChild(style);
  }

  // ---------- Active nav highlighting ----------
  // Fallback only: if you already set aria-current in HTML, it will keep it.
  function setActiveNavLink() {
    const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$("nav a[href]").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase().trim();
      if (!href || href.startsWith("#") || href.startsWith("http")) return;
      const normalized = href.split("?")[0].split("#")[0];

      // Only set aria-current if none is set anywhere in this nav (avoid fighting your HTML)
      const nav = a.closest("nav");
      const alreadyHasCurrent = nav && nav.querySelector('[aria-current="page"]');
      if (alreadyHasCurrent) return;

      if (normalized === currentPath) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  // ---------- Smooth scroll for in-page anchors ----------
  function bindSmoothAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.getElementById(id.slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id);
      });
    });
  }

  // ---------- Accessible mobile nav (hamburger) ----------
  function setupMobileNav() {
    injectBaseStylesOnce();

    const toggleBtn = $(".nav-toggle");
    const desktopNav = $("#site-nav"); // your existing nav

    if (!toggleBtn || !desktopNav) return;

    // Ensure toggle has correct ARIA
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("type", "button");

    // Build overlay + drawer once
    let overlay = $(".nav-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      overlay.setAttribute("aria-hidden", "true");
      document.body.appendChild(overlay);
    }

    let drawer = $(".nav-drawer");
    if (!drawer) {
      drawer = document.createElement("nav");
      drawer.className = "nav-drawer";
      drawer.setAttribute("aria-label", "Mobile");
      drawer.setAttribute("data-open", "false");

      // FIX: ensure drawer can receive focus reliably for focus-trap
      drawer.tabIndex = -1;

      // Clone links from desktop nav (keeps single source of truth)
      const links = $$("a", desktopNav).map((a) => a.cloneNode(true));

      // Drawer top row: title + close
      const top = document.createElement("div");
      top.className = "nav-drawer__top";

      const title = document.createElement("div");
      title.style.fontWeight = "900";
      title.style.letterSpacing = ".10em";
      title.style.textTransform = "uppercase";
      title.textContent = "Menu";

      const closeBtn = document.createElement("button");
      closeBtn.className = "nav-drawer__close";
      closeBtn.type = "button";
      closeBtn.textContent = "Close";

      top.appendChild(title);
      top.appendChild(closeBtn);

      drawer.appendChild(top);

      // Add links; keep Donate as CTA if it exists
      links.forEach((a) => {
        a.removeAttribute("data-pending");

        const href = (a.getAttribute("href") || "").trim();

        // Detect donate button by href
        const isDonate = href.toLowerCase().includes("donate.html");
        if (isDonate) {
          const ctaWrap = document.createElement("div");
          ctaWrap.className = "nav-drawer__cta";
          ctaWrap.style.marginTop = "8px";
          ctaWrap.appendChild(a);
          drawer.appendChild(ctaWrap);
        } else {
          drawer.appendChild(a);
        }
      });

      document.body.appendChild(drawer);

      // Close handlers
      closeBtn.addEventListener("click", () => closeDrawer());
      overlay.addEventListener("click", () => closeDrawer());

      // Close when clicking a link
      drawer.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        closeDrawer();
      });
    }

    // Focus trap
    let lastFocused = null;

    function getFocusable(root) {
      const sel = [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])'
      ].join(",");
      return $$(sel, root).filter((el) => el.offsetParent !== null);
    }

    function onKeyDown(e) {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }

      // Trap tab inside drawer
      if (e.key !== "Tab") return;
      const focusables = getFocusable(drawer);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function openDrawer() {
      if (!isMobile()) return;

      lastFocused = document.activeElement;

      overlay.setAttribute("data-open", "true");
      drawer.setAttribute("data-open", "true");
      toggleBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");

      // Move focus into drawer
      const focusables = getFocusable(drawer);
      (focusables[0] || drawer).focus();

      document.addEventListener("keydown", onKeyDown);
    }

    function closeDrawer() {
      overlay.setAttribute("data-open", "false");
      drawer.setAttribute("data-open", "false");
      toggleBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");

      document.removeEventListener("keydown", onKeyDown);

      // Restore focus
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    // Toggle button
    toggleBtn.addEventListener("click", () => {
      const open = drawer.getAttribute("data-open") === "true";
      open ? closeDrawer() : openDrawer();
    });

    // When resizing to desktop, ensure drawer is closed
    window.addEventListener("resize", () => {
      if (!isMobile()) {
        overlay.setAttribute("data-open", "false");
        drawer.setAttribute("data-open", "false");
        toggleBtn.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
        document.removeEventListener("keydown", onKeyDown);
      }
    });
  }

  // ---------- Simple form handling (no backend) ----------
  // Stores submissions locally for testing, and shows in-page status.
  const STORAGE_KEY = "coleforok86_submissions_v2";

  function loadSubmissions() {
    return safeJsonParse(localStorage.getItem(STORAGE_KEY), []);
  }

  function saveSubmission(entry) {
    const all = loadSubmissions();
    all.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function setFormStatus(form, message, kind) {
    if (!form) return;
    let node = form.querySelector(".form-status");
    if (!node) {
      node = document.createElement("div");
      node.className = "form-status";
      node.setAttribute("role", "status");
      node.setAttribute("aria-live", "polite");
      form.appendChild(node);
    }
    node.textContent = message;
    node.classList.remove("form-status--ok", "form-status--err");
    node.classList.add(kind === "ok" ? "form-status--ok" : "form-status--err");
  }

  function handleForm(form, typeLabel) {
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setFormStatus(form, "Please review the highlighted fields and try again.", "err");
        return;
      }

      const fd = new FormData(form);
      const payload = {};
      fd.forEach((value, key) => {
        payload[key] = typeof value === "string" ? value.trim() : value;
      });

      saveSubmission({
        type: typeLabel,
        createdAt: new Date().toISOString(),
        page: (location.pathname.split("/").pop() || "index.html"),
        payload
      });

      form.reset();

      if (typeLabel === "volunteer") {
        setFormStatus(form, "Thank you for stepping up. A team member will follow up soon.", "ok");
      } else if (typeLabel === "contact") {
        setFormStatus(form, "Message received. We will respond as soon as possible.", "ok");
      } else {
        setFormStatus(form, "Received.", "ok");
      }
    });
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", () => {
    setActiveNavLink();
    bindSmoothAnchors();
    setupMobileNav();

    // Forms
    handleForm($("#volunteer-form"), "volunteer");
    handleForm($("#contact-form"), "contact");
  });

})();
