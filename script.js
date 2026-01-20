/* ==========================================================================
   Hannah Cole for OK 86 — script.js
   - Classic campaign site interactions (no popups)
   - Mobile nav toggle
   - Active nav link highlighting
   - Simple form helpers (no backend): volunteer + contact + comments placeholders
   - “Pending / under development” buttons safety
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function safeJsonParse(str, fallback) {
    try { return JSON.parse(str); } catch { return fallback; }
  }

  function setAriaExpanded(btn, expanded) {
    if (!btn) return;
    btn.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  // ---------- Mobile nav (requires markup in HTML) ----------
  // Expected (recommended) HTML hooks:
  //  - button.nav-toggle (aria-controls="site-nav")
  //  - nav#site-nav.nav
  // This JS gracefully does nothing if not present.
  const navToggle = $(".nav-toggle");
  const siteNav = $("#site-nav");

  function openNav() {
    if (!siteNav) return;
    siteNav.style.display = "flex";
    siteNav.style.flexDirection = "column";
    siteNav.style.alignItems = "flex-start";
    siteNav.style.gap = "6px";
    siteNav.style.padding = "10px 0 0";
    setAriaExpanded(navToggle, true);
    document.body.dataset.navOpen = "true";
  }

  function closeNav() {
    if (!siteNav) return;
    siteNav.style.display = "";
    setAriaExpanded(navToggle, false);
    delete document.body.dataset.navOpen;
  }

  function toggleNav() {
    const open = document.body.dataset.navOpen === "true";
    open ? closeNav() : openNav();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", toggleNav);

    // Close nav when resizing up to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeNav();
    });

    // Close nav after clicking a link (mobile)
    siteNav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      if (window.innerWidth <= 760) closeNav();
    });

    // Close nav on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.dataset.navOpen === "true") {
        closeNav();
        navToggle.focus();
      }
    });
  }

  // ---------- Active nav highlighting ----------
  // Works for multipage sites by matching current filename.
  // Expected: <nav> links point to pages like "issues.html".
  const currentPath = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  $$("nav a[href]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase().trim();
    if (!href || href.startsWith("#") || href.startsWith("http")) return;

    const normalizedHref = href.split("?")[0].split("#")[0];
    if (normalizedHref === currentPath) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });

  // ---------- Smooth scroll for in-page anchors ----------
  // Keeps classic feel; no fancy scrolling libraries.
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

  // ---------- “Pending / Under development” intercept ----------
  // Add data-pending="true" to links/buttons you want to show as not ready.
  // Example: <a class="btn" href="donate.html" data-pending="true">Donate</a>
  function showPendingNotice(msg) {
    // Avoid popups; use a page-embedded notice if present, else a gentle alert.
    const box = $("#pending-notice");
    if (box) {
      box.textContent = msg;
      box.hidden = false;
      box.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    // Fallback: basic alert (not a modal/popup tab—just browser alert).
    // If you prefer none, remove this line; it will then silently do nothing.
    alert(msg);
  }

  $$("[data-pending='true']").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showPendingNotice("This section is still under development. Please check back soon.");
    });
  });

  // ---------- Simple form handling (no backend) ----------
  // Forms we may have:
  //  - Volunteer form: #volunteer-form
  //  - Contact form: #contact-form
  //  - Comment form: #comment-form (currently under development)
  //
  // Behavior:
  //  - Validate required fields (HTML5 validation)
  //  - Store submissions in localStorage for QA/testing
  //  - Show a “Thanks” message in-page (no popups)
  //
  const STORAGE_KEY = "coleforok86_submissions_v1";

  function loadSubmissions() {
    return safeJsonParse(localStorage.getItem(STORAGE_KEY), []);
  }

  function saveSubmission(entry) {
    const all = loadSubmissions();
    all.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function setFormStatus(form, message, kind) {
    // kind: "ok" | "err"
    if (!form) return;
    let node = form.querySelector(".form-status");
    if (!node) {
      node = document.createElement("div");
      node.className = "form-status";
      node.style.marginTop = "12px";
      node.style.padding = "12px";
      node.style.border = "2px solid #141414";
      node.style.background = "rgba(255,255,255,0.75)";
      node.style.fontSize = "0.98rem";
      form.appendChild(node);
    }
    node.textContent = message;
    node.style.borderColor = kind === "ok" ? "#4D6A47" : "#A6372D";
  }

  function handleForm(form, typeLabel) {
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Let browser run built-in validation
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
        page: currentPath,
        payload
      });

      // Reset (keeps classic feel; no confetti)
      form.reset();

      // Success message (in-page)
      if (typeLabel === "comment") {
        setFormStatus(
          form,
          "Thank you. Comment submission is currently under development, but your message was saved locally for testing.",
          "ok"
        );
      } else if (typeLabel === "volunteer") {
        setFormStatus(
          form,
          "Thank you for stepping up. We will follow up soon. If this is urgent, please use the Contact page.",
          "ok"
        );
      } else {
        setFormStatus(
          form,
          "Message received. We will respond as soon as possible.",
          "ok"
        );
      }
    });
  }

  handleForm($("#volunteer-form"), "volunteer");
  handleForm($("#contact-form"), "contact");
  handleForm($("#comment-form"), "comment");

  // ---------- Optional: render recent local comments (dev only) ----------
  // If you add a container with id="comment-list", this will render saved comments.
  // This is *not* a real public comment section; it is a placeholder for development.
  const commentList = $("#comment-list");
  if (commentList) {
    const all = loadSubmissions();
    const comments = all.filter((x) => x && x.type === "comment").slice(0, 8);

    if (comments.length === 0) {
      commentList.innerHTML = "<div class='muted'>No comments saved yet.</div>";
    } else {
      const html = comments
        .map((c) => {
          const p = c.payload || {};
          const name = (p.name || "Anonymous").replace(/</g, "&lt;");
          const msg = (p.message || "").replace(/</g, "&lt;");
          const when = c.createdAt ? new Date(c.createdAt).toLocaleString() : "";
          return `
            <div class="list__item">
              <div class="list__meta">
                <span><strong>${name}</strong></span>
                <span>${when}</span>
              </div>
              <div>${msg || "<span class='muted'>(No message)</span>"}</div>
            </div>
          `;
        })
        .join("");

      commentList.innerHTML = `<div class="list">${html}</div>`;
    }
  }

})();
