(function () {
  "use strict";

  /* --- Язык --------------------------------------------------------------- */

  var lang = "ru";
  try {
    var saved = localStorage.getItem("lang");
    if (saved === "ru" || saved === "en") lang = saved;
    else if ((navigator.language || "").toLowerCase().indexOf("en") === 0) lang = "en";
  } catch (e) { /* приватный режим — работаем на языке по умолчанию */ }

  /* Пути: страницы лежат в корне и в папке projects/, поэтому каждая страница
     объявляет свой уровень через <html data-root="."> или data-root="..". */
  var root = document.documentElement.getAttribute("data-root") || ".";
  /* root = "." для страниц в корне сайта и ".." для pages/projects/ —
     пути получаются относительными, чтобы сайт работал и с file:// */
  function asset(p) { return (root === "." ? "./" : root + "/") + p; }
  function page(p)  { return (root === "." ? "./" : root + "/") + p; }

  function tr(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.ru || obj.en || "";
  }

  function t(key) {
    var dict = UI[lang] || UI.ru;
    var s = dict[key] != null ? dict[key] : (UI.ru[key] || key);
    return s.replace("{name}", PROFILE.name);
  }

  function pluralRu(n, forms) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return forms[0];
    if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return forms[1];
    return forms[2];
  }

  /* --- Тема: светлая / тёмная -------------------------------------------------
     Начальное значение выставляет маленький скрипт в <head> каждой страницы
     (до первой отрисовки). Здесь — только переключение и запоминание. */

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyThemeMeta() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content",
        getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() || "#faf9f7");
    }
  }

  function updateThemeUI() {
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var label = currentTheme() === "dark" ? t("theme_to_light") : t("theme_to_dark");
      btn.setAttribute("aria-label", label);
      btn.title = label;
    }
    applyThemeMeta();
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
    updateThemeUI();
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    renderAll();
  }

  /* --- Перевод статичных надписей в HTML ----------------------------------- */

  function applyI18n() {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    /* data-tr="путь.в.profile" — подстановка текста из PROFILE */
    document.querySelectorAll("[data-tr]").forEach(function (el) {
      var val = PROFILE;
      var parts = el.getAttribute("data-tr").split(".");
      for (var i = 0; i < parts.length; i++) {
        if (val == null) break;
        val = val[parts[i]];
      }
      if (val != null) el.textContent = tr(val);
    });

    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
  }

  function updateTitle(subtitle) {
    var base = PROFILE.name + " — " + tr(PROFILE.role);
    document.title = subtitle ? subtitle + " — " + base : base;
  }

  /* --- Общие блоки ----------------------------------------------------------- */

  /* --- Копирование в буфер обмена --------------------------------------------- */

  var COPY_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
  var CHECK_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

  function copyText(text, btn) {
    function done() {
      btn.classList.add("copied");
      btn.innerHTML = CHECK_ICON;
      btn.setAttribute("aria-label", t("copied"));
      btn.title = t("copied");
      setTimeout(function () {
        btn.classList.remove("copied");
        btn.innerHTML = COPY_ICON;
        btn.setAttribute("aria-label", t("copy"));
        btn.title = t("copy");
      }, 1600);
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { if (document.execCommand("copy")) done(); } catch (e) {}
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  /* --- Картинки кейса на весь экран --------------------------------------------- */

  var LIGHTBOX = null;

  function ensureLightbox() {
    if (LIGHTBOX) return LIGHTBOX;
    LIGHTBOX = document.createElement("div");
    LIGHTBOX.className = "lightbox";
    LIGHTBOX.setAttribute("role", "dialog");
    LIGHTBOX.setAttribute("aria-label", tr(PROFILE.name));
    LIGHTBOX.innerHTML = '<img alt="">';
    LIGHTBOX.addEventListener("click", function () { LIGHTBOX.classList.remove("open"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && LIGHTBOX) LIGHTBOX.classList.remove("open");
    });
    document.body.appendChild(LIGHTBOX);
    return LIGHTBOX;
  }

  function bindLightbox(gallery) {
    if (!gallery) return;
    gallery.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("click", function () {
        var box = ensureLightbox();
        box.querySelector("img").src = img.src;
        box.querySelector("img").alt = img.alt;
        box.classList.add("open");
      });
    });
  }

  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(function (w) {
      return w.charAt(0).toUpperCase();
    }).join("");
  }

  function renderChrome() {
    document.querySelectorAll(".logo-mark").forEach(function (el) {
      /* В логотипе картинка (готовая монограмма) — не заменяем её инициалами */
      if (el.querySelector("img")) return;
      el.textContent = initials(PROFILE.name);
    });
    document.querySelectorAll("#footer-year").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
    updateThemeUI();
    var toTopBtn = document.querySelector(".to-top");
    if (toTopBtn) {
      toTopBtn.setAttribute("aria-label", t("to_top"));
      toTopBtn.title = t("to_top");
    }
  }

  /* --- Карточка проекта -------------------------------------------------------- */

  function cardHTML(p) {
    var tags = (p.tags || []).filter(function (id) { return TAGS[id]; })
      .map(function (id) { return '<span class="tag">' + tr(TAGS[id]) + "</span>"; })
      .join("");

    return '' +
      '<a class="card reveal" href="' + page("projects/project.html?p=" + encodeURIComponent(p.slug)) + '">' +
        '<div class="card-cover"><img src="' + asset(p.cover) + '" alt="' + tr(p.title) + '" loading="lazy"></div>' +
        '<div class="card-body">' +
          '<div class="card-year">' + p.year + "</div>" +
          '<h3 class="card-title">' + tr(p.title) + "</h3>" +
          '<p class="card-summary">' + tr(p.summary) + "</p>" +
          '<div class="card-tags">' + tags + "</div>" +
          '<span class="card-view">' + t("card_view") + ' <span aria-hidden="true">→</span></span>' +
        "</div>" +
      "</a>";
  }

  function applyReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 60 + "ms";
      io.observe(el);
    });
  }

  /* --- Главная ------------------------------------------------------------------- */

  function renderHome() {
    var featuredGrid = document.getElementById("featured-grid");
    if (featuredGrid) {
      var featured = PROJECTS.filter(function (p) { return p.featured; });
      if (!featured.length) featured = PROJECTS.slice(0, 3);
      featuredGrid.innerHTML = featured.slice(0, 3).map(cardHTML).join("");
    }

    var servicesGrid = document.getElementById("services-grid");
    if (servicesGrid) {
      servicesGrid.innerHTML = (PROFILE.services || []).map(function (s) {
        return '<div class="service reveal">' +
          '<div class="service-icon" aria-hidden="true">' + (s.icon || "") + "</div>" +
          "<h3>" + tr(s.title) + "</h3>" +
          "<p>" + tr(s.desc) + "</p>" +
          "</div>";
      }).join("");
    }

    var aboutText = document.getElementById("home-about-text");
    if (aboutText) {
      aboutText.innerHTML = (tr(PROFILE.bio_long) ? PROFILE.bio_long[lang] || PROFILE.bio_long.ru : [])
        .slice(0, 2).map(function (par) { return "<p>" + par + "</p>"; }).join("");
    }

    updateTitle();
  }

  /* --- Страница «Проекты» ------------------------------------------------------------ */

  var currentFilter = null;

  function usedTags() {
    return Object.keys(TAGS).filter(function (id) {
      return PROJECTS.some(function (p) { return (p.tags || []).indexOf(id) !== -1; });
    });
  }

  function renderProjects() {
    var grid = document.getElementById("projects-grid");
    if (!grid) return;

    var chips = document.getElementById("filter-chips");
    if (chips) {
      var html = '<button type="button" class="chip' + (currentFilter === null ? " active" : "") + '" data-filter="">' +
        t("filter_all") + "</button>";
      html += usedTags().map(function (id) {
        return '<button type="button" class="chip' + (currentFilter === id ? " active" : "") + '" data-filter="' + id + '">' +
          tr(TAGS[id]) + "</button>";
      }).join("");
      chips.innerHTML = html;

      chips.querySelectorAll(".chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          var f = chip.getAttribute("data-filter");
          currentFilter = f === "" ? null : f;
          renderProjects();
        });
      });
    }

    var list = currentFilter
      ? PROJECTS.filter(function (p) { return (p.tags || []).indexOf(currentFilter) !== -1; })
      : PROJECTS;
    grid.innerHTML = list.map(cardHTML).join("");
    applyReveal();

    var count = document.getElementById("projects-count");
    if (count) {
      var years = PROJECTS.map(function (p) { return p.year; });
      var span = years.length ? " · " + Math.min.apply(null, years) + "–" + Math.max.apply(null, years) : "";
      if (lang === "ru") {
        var w = (UI.ru.projects_word || "").split(",");
        count.textContent = list.length + " " + pluralRu(list.length, w) + span;
      } else {
        count.textContent = list.length + " " + (UI.en.projects_word || "projects").split(",")[1] + span;
      }
    }

    updateTitle(t("projects_title"));
  }

  /* --- Страница кейса -------------------------------------------------------------------- */

  function renderDetail() {
    var article = document.getElementById("detail-article");
    if (!article) return;

    var slug = new URLSearchParams(location.search).get("p") || "";
    var p = null;
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === slug) { p = PROJECTS[i]; break; }
    }

    var notfound = document.getElementById("detail-notfound");
    if (!p) {
      article.hidden = true;
      if (notfound) notfound.hidden = false;
      updateTitle(t("detail_notfound_title"));
      return;
    }
    article.hidden = false;
    if (notfound) notfound.hidden = true;

    var tags = (p.tags || []).filter(function (id) { return TAGS[id]; });
    var meta = [p.year].concat(tags.map(function (id) { return tr(TAGS[id]); })).join(" · ");
    document.getElementById("detail-title").textContent = tr(p.title);
    document.getElementById("detail-meta").textContent = meta;

    var cover = document.getElementById("detail-cover");
    cover.src = asset(p.cover);
    cover.alt = tr(p.title);

    document.getElementById("detail-desc").innerHTML =
      (p.description[lang] || p.description.ru || []).map(function (par) {
        return "<p>" + par + "</p>";
      }).join("");

    var year = document.getElementById("detail-year");
    if (year) year.textContent = String(p.year);

    var stack = document.getElementById("detail-stack");
    if (stack) stack.textContent = (p.stack || []).join(", ") || "—";

    var tagBox = document.getElementById("detail-tags");
    if (tagBox) tagBox.innerHTML = tags.map(function (id) {
      return '<span class="tag">' + tr(TAGS[id]) + "</span>";
    }).join("") || "—";

    var links = document.getElementById("detail-links");
    if (links) {
      var btns = "";
      if (p.url) btns += '<a class="btn btn-primary" href="' + p.url + '" target="_blank" rel="noopener">' + t("detail_open") + "</a>";
      if (p.repo) btns += '<a class="btn btn-ghost" href="' + p.repo + '" target="_blank" rel="noopener">' + t("detail_code") + "</a>";
      links.innerHTML = btns;
      links.hidden = !btns;
    }

    var gallery = document.getElementById("detail-gallery");
    if (gallery) {
      gallery.innerHTML = (p.images || []).map(function (src) {
        return '<img src="' + asset(src) + '" alt="' + tr(p.title) + '" loading="lazy">';
      }).join("");
      bindLightbox(gallery);
    }

    var idx = PROJECTS.indexOf(p);
    var next = PROJECTS[(idx + 1) % PROJECTS.length];
    var nextBox = document.getElementById("detail-next");
    if (nextBox) {
      nextBox.innerHTML = '<a href="' + page("projects/project.html?p=" + encodeURIComponent(next.slug)) + '">' +
        '<span><span class="label">' + t("detail_next") + '</span><span class="name" style="display:block">' + tr(next.title) + "</span></span>" +
        '<span class="arrow" aria-hidden="true">→</span></a>';
    }

    updateTitle(tr(p.title));
  }

  /* --- Страница «Обо мне» ------------------------------------------------------------------ */

  function renderAbout() {
    var bio = document.getElementById("about-bio");
    if (bio) {
      bio.innerHTML = (PROFILE.bio_long[lang] || PROFILE.bio_long.ru || []).map(function (par) {
        return "<p>" + par + "</p>";
      }).join("");
    }

    var photoBox = document.getElementById("photo-box");
    if (photoBox) {
      if (PROFILE.photo) {
        photoBox.innerHTML = '<img src="' + asset(PROFILE.photo) + '" alt="' + PROFILE.name + '">';
      } else {
        photoBox.hidden = true;
      }
    }

    var skills = document.getElementById("skills-list");
    if (skills) {
      skills.innerHTML = (PROFILE.skills || []).map(function (s) {
        return '<span class="skill reveal">' + s + "</span>";
      }).join("");
    }

    var exp = document.getElementById("exp-list");
    if (exp) {
      exp.innerHTML = (PROFILE.experience || []).map(function (e) {
        return '<div class="timeline-item reveal">' +
          '<div class="timeline-period">' + tr(e.period) + "</div>" +
          "<h3>" + e.company + "</h3>" +
          '<div class="timeline-role">' + tr(e.role) + "</div>" +
          "<p>" + tr(e.desc) + "</p>" +
          "</div>";
      }).join("");
    }

    var resume = document.getElementById("resume-link");
    if (resume) {
      if (PROFILE.resume_url) {
        resume.hidden = false;
        resume.href = asset(PROFILE.resume_url);
      } else {
        resume.hidden = true;
      }
    }

    updateTitle(t("about_title"));
  }

  /* --- Страница «Контакты» --------------------------------------------------------------------- */

  function renderContacts() {
    var list = document.getElementById("contact-list");
    if (list) {
      list.innerHTML = (CONTACTS || []).map(function (c) {
        return '<div class="contact-row reveal">' +
          '<a class="contact-card" href="' + c.link + '" target="_blank" rel="noopener">' +
            '<span class="contact-icon" aria-hidden="true">' + c.icon + "</span>" +
            "<span><span class='contact-label' style='display:block'>" + tr(c.label) + "</span>" +
            "<span class='contact-value' style='display:block'>" + c.value + "</span></span>" +
          "</a>" +
          '<button type="button" class="copy-btn" data-copy="' + c.value + '" aria-label="' + t("copy") + '" title="' + t("copy") + '">' + COPY_ICON + "</button>" +
          "</div>";
      }).join("");
      list.querySelectorAll(".copy-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          copyText(btn.getAttribute("data-copy"), btn);
        });
      });
    }
    updateTitle(t("contact_title"));
  }

  /* --- Сборка ----------------------------------------------------------------------------------- */

  function renderPage() {
    var name = document.body.getAttribute("data-page");
    if (name === "home") renderHome();
    else if (name === "projects") renderProjects();
    else if (name === "project") renderDetail();
    else if (name === "about") renderAbout();
    else if (name === "contact") renderContacts();
  }

  function renderAll() {
    applyI18n();
    renderChrome();
    renderPage();
    applyReveal();
  }

  /* --- Тема: страховка, если скрипт в <head> не отработал ---------------------- */

  if (!document.documentElement.getAttribute("data-theme")) {
    setTheme(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  /* --- Кнопка «наверх» ----------------------------------------------------------- */

  var toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  toTop.addEventListener("click", function () {
    var smooth = !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  });
  document.body.appendChild(toTop);
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("visible", window.scrollY > 600);
  }, { passive: true });

  /* --- Живой фон: дрейфующие пятна + лёгкий параллакс за курсором ---------------- */

  var bgDecor = document.createElement("div");
  bgDecor.className = "bg-decor";
  bgDecor.setAttribute("aria-hidden", "true");
  ["bg-blob-1", "bg-blob-2", "bg-blob-3"].forEach(function (cls) {
    var b = document.createElement("span");
    b.className = "bg-blob " + cls;
    bgDecor.appendChild(b);
  });
  document.body.appendChild(bgDecor);

  /* Параллакс — только при точном указателе (мышь) и без «уменьшить анимацию» */
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && matchMedia("(pointer: fine)").matches;
  if (!reduceMotion && finePointer) {
    var targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = null;

    function parallaxStep() {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      bgDecor.style.transform = "translate(" + (curX * -26).toFixed(1) + "px, " + (curY * -18).toFixed(1) + "px) scale(1.06)";
      if (Math.abs(targetX - curX) > 0.002 || Math.abs(targetY - curY) > 0.002) {
        rafId = requestAnimationFrame(parallaxStep);
      } else {
        rafId = null;
      }
    }

    window.addEventListener("pointermove", function (e) {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (rafId === null) rafId = requestAnimationFrame(parallaxStep);
    }, { passive: true });
  }

  renderAll();

  /* --- Переключатель темы ----------------------------------------------------------- */

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* --- Переключатель языка ------------------------------------------------------------------------ */

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* --- Мобильное меню -------------------------------------------------------------------------------- */

  var navToggle = document.getElementById("nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
