/* ==========================================================================
   Hannah Cole for OK 86 — script.js (Mobile-first, no popups)
   - Accessible hamburger menu (overlay + focus trap + scroll lock)
   - Consistent nav behavior across pages
   - Active link highlighting (fallback if aria-current not set)
   - Signup + Contact + Volunteer forms send to the campaign intake endpoint
   - No alerts / no modal popups
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Campaign intake endpoint ----------
  const FORM_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbxgAcbkJ6ZXSZcYJN2NSvw8dXPzfHlNR5p3oFkwbQMfywlTH9q7TaznqMhdgA9HIYE/exec";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const isMobile = () => window.matchMedia("(max-width: 760px)").matches;

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
        const isDonate = href.toLowerCase().includes("donate.html") || href.toLowerCase().includes("actblue.com/donate") || a.classList.contains("btn--primary");
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

  function validateSubmission(form) {
    const trap = form.querySelector('[name="website"]');
    if (trap && trap.value.trim()) {
      return "Submission blocked.";
    }

    const started = Number(form.dataset.startedAt || 0);
    if (started && Date.now() - started < 2500) {
      return "Please take a moment to review your information before submitting.";
    }

    const phone = form.querySelector('input[type="tel"][required]');
    if (phone) {
      const digits = phone.value.replace(/\D/g, "");
      if (digits.length < 10) return "Please enter a valid phone number.";
    }

    return "";
  }

  function markFormStarted(form) {
    if (!form.dataset.startedAt) form.dataset.startedAt = String(Date.now());
  }

  async function postForm(payload) {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || "Submission failed");
    return json;
  }

  // ---------- Signup form ----------
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

      const validationMessage = validateSubmission(form);
      if (validationMessage) {
        setStatus(form, validationMessage, false, { hero: true });
        return;
      }

      const fd = new FormData(form);
      const payload = {
        type: "signup",
        page: location.pathname,
        topic: "Campaign updates",
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
        await postForm(payload);
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

  // ---------- Contact form ----------
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

      const validationMessage = validateSubmission(form);
      if (validationMessage) {
        setStatus(form, validationMessage, false);
        return;
      }

      const fd = new FormData(form);
      const payload = {
        type: "contact",
        page: location.pathname,
        topic: (fd.get("topic") || "").trim(),
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
        await postForm(payload);
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

  // ---------- Volunteer form ----------
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

      const validationMessage = validateSubmission(form);
      if (validationMessage) {
        setStatus(form, validationMessage, false);
        return;
      }

      const fd = new FormData(form);
      const payload = {
        type: "volunteer",
        page: location.pathname,
        topic: (fd.get("topic") || "Volunteer").trim(),
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
        await postForm(payload);
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

    $$("#signup-form, #contact-form, #volunteer-form").forEach((form) => {
      form.dataset.startedAt = String(Date.now());
      form.addEventListener("focusin", () => markFormStarted(form), { once: true });
      form.addEventListener("input", () => markFormStarted(form), { once: true });
    });

    wireSignupForm();
    wireContactForm();
    wireVolunteerForm();
  });
})();
