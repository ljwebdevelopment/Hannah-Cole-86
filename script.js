/* ==========================================================================
   Hannah Cole for OK 86 — script.js (Mobile-first, no popups)
   - Accessible hamburger menu (overlay + focus trap + scroll lock)
   - Consistent nav behavior across pages
   - Active link highlighting (fallback if aria-current not set)
   - Signup + Contact + Volunteer forms send to Google Sheets (Apps Script Web App)
   - No alerts / no modal popups
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Google Sheets endpoint ----------
  const SIGNUP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbxgAcbkJ6ZXSZcYJN2NSvw8dXPzfHlNR5p3oFkwbQMfywlTH9q7TaznqMhdgA9HIYE/exec";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const isMobile = () => window.matchMedia("(max-width: 760px)").matches;

  function injectBaseStylesOnce() {
    if (document.getElementById("cole-js-styles")) return;

    const style = document.createElement("style");
    style.id = "cole-js-styles";
    style.textContent = `
      body.nav-open { overflow: hidden; }

      .nav-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.55);
        z-index: 1200;
        display: none;
      }
      .nav-overlay[data-open="true"] { display: block; }

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

      @media (prefers-reduced-motion: reduce){
        .nav-drawer { transition: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function setActiveNavLink() {
    const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$("nav a[href]").forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase().trim();
      if (!href || href.startsWith("#") || href.startsWith("http")) return;
      const normalized = href.split("?")[0].split("#")[0];

      const nav = a.closest("nav");
      const alreadyHasCurrent = nav && nav.querySelector('[aria-current="page"]');
      if (alreadyHasCurrent) return;

      if (normalized === currentPath) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

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

  function setupMobileNav() {
    injectBaseStylesOnce();

    const toggleBtn = $(".nav-toggle");
    const desktopNav = $("#site-nav");
    if (!toggleBtn || !desktopNav) return;

    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("type", "button");

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
      drawer.tabIndex = -1;

      const links = $$("a", desktopNav).map((a) => a.cloneNode(true));

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

      links.forEach((a) => {
        const href = (a.getAttribute("href") || "").trim();
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

      closeBtn.addEventListener("click", () => closeDrawer());
      overlay.addEventListener("click", () => closeDrawer());
      drawer.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        closeDrawer();
      });
    }

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

      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    toggleBtn.addEventListener("click", () => {
      const open = drawer.getAttribute("data-open") === "true";
      open ? closeDrawer() : openDrawer();
    });

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

  // ---------- Shared status helper ----------
  function ensureStatusNode(form, options) {
    let node = form.querySelector(".form-status");
    if (!node) {
      node = document.createElement("div");
      node.className = "form-status";
      node.setAttribute("role", "status");
      node.setAttribute("aria-live", "polite");
      form.appendChild(node);
    }
    if (options && options.hero === true) {
      node.style.background = "rgba(255,255,255,0.10)";
      node.style.color = "rgba(255,255,255,0.92)";
      node.style.borderColor = "rgba(255,255,255,0.22)";
    }
    return node;
  }

  function setStatus(form, message, ok, options) {
    const node = ensureStatusNode(form, options);
    node.textContent = message;
    node.classList.remove("form-status--ok", "form-status--err");
    node.classList.add(ok ? "form-status--ok" : "form-status--err");
  }

  async function postToSheets(payload) {
    const res = await fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || "Submission failed");
    return json;
  }

  // ---------- Signup form → Google Sheets ----------
  function wireSignupForm() {
    const form = document.getElementById("signup-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(form, "Please complete all required fields.", false, { hero: true });
        return;
      }

      const fd = new FormData(form);
      const payload = {
        type: "signup",
        page: location.pathname,
        firstName: (fd.get("firstName") || "").trim(),
        lastName: (fd.get("lastName") || "").trim(),
        email: (fd.get("email") || "").trim(),
        phone: (fd.get("phone") || "").trim(),
        zip: (fd.get("zip") || "").trim()
      };

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : "";

      try {
        if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
        await postToSheets(payload);
        form.reset();
        setStatus(form, "Thanks! You’re signed up.", true, { hero: true });
      } catch (err) {
        console.error(err);
        setStatus(form, "Sorry—something went wrong. Please try again.", false, { hero: true });
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      }
    });
  }

  // ---------- Contact form → Google Sheets ----------
  function wireContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(form, "Please complete the required fields and try again.", false);
        return;
      }

      const fd = new FormData(form);
      const payload = {
        type: "contact",
        page: location.pathname,
        name: (fd.get("name") || "").trim(),
        email: (fd.get("email") || "").trim(),
        phone: (fd.get("phone") || "").trim(),
        zip: (fd.get("zip") || "").trim(),
        message: (fd.get("message") || "").trim()
      };

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : "";

      try {
        if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
        await postToSheets(payload);
        form.reset();
        setStatus(form, "Message sent. Thank you.", true);
      } catch (err) {
        console.error(err);
        setStatus(form, "Sorry—something went wrong. Please try again.", false);
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      }
    });
  }

  // ---------- Volunteer form → Google Sheets ----------
  function wireVolunteerForm() {
    const form = document.getElementById("volunteer-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setStatus(form, "Please complete the required fields and try again.", false);
        return;
      }

      const fd = new FormData(form);
      const payload = {
        type: "volunteer",
        page: location.pathname,
        name: (fd.get("name") || "").trim(),
        phone: (fd.get("phone") || "").trim(),
        email: (fd.get("email") || "").trim(),
        zip: (fd.get("zip") || "").trim(),
        how: (fd.get("how") || "").trim()
      };

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn ? btn.textContent : "";

      try {
        if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
        await postToSheets(payload);
        form.reset();
        setStatus(form, "Thank you for stepping up. A team member will follow up soon.", true);
      } catch (err) {
        console.error(err);
        setStatus(form, "Sorry—something went wrong. Please try again.", false);
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      }
    });
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", () => {
    setActiveNavLink();
    bindSmoothAnchors();
    setupMobileNav();

    wireSignupForm();
    wireContactForm();
    wireVolunteerForm();
  });
})();
