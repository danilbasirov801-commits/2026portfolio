/* --- Рубрики проектов -------------------------------------------------------
   Используются как фильтры на странице «Проекты».
   Добавите новую рубрику здесь — она автоматически появится в фильтрах. */
const TAGS = {
  "landing":   { ru: "Лендинг",           en: "Landing page" },
  "corporate": { ru: "Корпоративный сайт", en: "Corporate site" },
  "ecommerce": { ru: "Интернет-магазин",   en: "E-commerce" },
  "webapp":    { ru: "Веб-приложение",     en: "Web app" },
  "promo":     { ru: "Промо-сайт",         en: "Promo site" }
};


/* --- Профиль: всё, что о вас ----------------------------------------------- */
const PROFILE = {
  name: "Данил",
  role:        { ru: "Веб-разработчик", en: "Web Developer" },
  location:    { ru: "Работаю по всему миру", en: "Working worldwide" },
  available:   { ru: "Открыт для заказов", en: "Available for new projects" },

  /* Крупный заголовок на главной */
  tagline: {
    ru: "Делаю сайты и веб-приложения, которые быстро грузятся и приятно выглядят",
    en: "I build fast, good-looking websites and web apps"
  },

  /* Короткий абзац под заголовком на главной */
  bio_short: {
    ru: "Веб-разработчик. Два года делаю сайты для бизнеса: от лендингов до интернет-магазинов и личных кабинетов.",
    en: "Web developer. For two years I have been building websites for businesses: from landing pages to online stores and customer portals."
  },

  /* Длинный текст на странице «Обо мне» — список абзацев */
  bio_long: {
    ru: [
      "Привет! Я — Данил, веб-разработчик. Два года делаю сайты: начинал с вёрстки лендингов, сейчас собираю интернет-магазины, сайты-визитки и небольшие веб-приложения.",
      "Работаю на чистом HTML, CSS и JavaScript — без тяжёлых фреймворков, поэтому мои сайты быстро грузятся и легко поддерживаются. Люблю аккуратную типографику и внимателен к деталям.",
      "Среди моих работ — лендинг сервиса аналитики «Пульс», магазин кофе «Зерно», сайт астролога и игровые мини-сервисы. Если у вас есть задача — напишите, обсудим."
    ],
    en: [
      "Hi! I am Danil, a web developer. For two years I have been building websites: I started with landing page markup and now assemble online stores, calling-card sites and small web apps.",
      "I work with plain HTML, CSS and JavaScript — no heavy frameworks, so my sites load fast and are easy to maintain. I care about neat typography and details.",
      "My work includes the Pulse analytics landing, the Zerno coffee store, an astrologer's website and small game-related apps. If you have a task in mind — drop me a line."
    ]
  },

  /* Фото на странице «Обо мне». Положите свой снимок в assets/img/photo.jpg
     и замените путь здесь. Пустая строка "" — блок фото скроется. */
  photo: "assets/img/logo.jpg",

  /* Ссылка на резюме/CV (необязательно). Пустая строка — кнопки не будет. */
  resume_url: "",

  /* Услуги на главной (3 карточки) */
  services: [
    {
      icon: "🖥️",
      title: { ru: "Сайты и лендинги", en: "Websites & landing pages" },
      desc: {
        ru: "Продающие страницы и корпоративные сайты: аккуратный дизайн, адаптив под все экраны, высокая скорость загрузки.",
        en: "Sales pages and corporate websites: neat design, responsive on every screen, fast load times."
      }
    },
    {
      icon: "⚙️",
      title: { ru: "Веб-приложения", en: "Web apps" },
      desc: {
        ru: "Каталоги, дашборды, калькуляторы и интерактивные страницы на чистом JavaScript — от прототипа до боевого запуска.",
        en: "Catalogues, dashboards, calculators and interactive pages in plain JavaScript — from prototype to launch."
      }
    },
    {
      icon: "🚀",
      title: { ru: "Поддержка и доработка", en: "Support & improvements" },
      desc: {
        ru: "Беру существующие проекты на сопровождение: правки, оптимизация скорости, новые разделы и фичи.",
        en: "I take over existing projects: fixes, speed optimisation, new sections and features."
      }
    }
  ],

  /* Навыки — просто список через запятую. Одинаковы на обоих языках. */
  skills: [
    "JavaScript", "TypeScript", "HTML", "CSS", "Git", "Figma"
  ],

  /* Опыт работы — от свежего к старому */
  experience: [
    {
      period:  { ru: "2026 — настоящее время", en: "2026 — present" },
      company: "Фриланс",
      role:    { ru: "Веб-разработчик", en: "Web developer" },
      desc: {
        ru: "Сайты на заказ и собственные проекты: лендинг сервиса аналитики «Пульс», интернет-магазин кофе «Зерно», сайт астролога с каталогом услуг.",
        en: "Client work and own projects: the Pulse analytics landing, the Zerno coffee store and an astrologer's site with a service catalogue."
      }
    },
    {
      period:  { ru: "2023", en: "2023" },
      company: "Собственные проекты",
      role:    { ru: "Первые шаги в профессии", en: "First steps" },
      desc: {
        ru: "Осваивал вёрстку и JavaScript на живых задачах: трекер игрового бэклога, рулетка «Кого сегодня качать?» и «Игровая полка» — всё опубликовано на GitHub Pages.",
        en: "Learned markup and JavaScript on real projects: a game backlog tracker, the \"Who Should I Play Today?\" roulette and a game shelf — all published on GitHub Pages."
      }
    }
  ]
};


/* --- Контакты ---------------------------------------------------------------
   Появляются на странице «Контакты» и в подвале сайта.
   id нужен только для порядка; icon — любой эмодзи. */
const CONTACTS = [
  {
    icon: "✉️",
    label: { ru: "Почта", en: "Email" },
    value: "oshgdy68@gmail.com",
    link:  "mailto:oshgdy68@gmail.com"
  },
  {
    icon: "💬",
    label: { ru: "Telegram", en: "Telegram" },
    value: "@hasssumi",
    link:  "https://t.me/hasssumi"
  },
  {
    icon: "🐙",
    label: { ru: "GitHub", en: "GitHub" },
    value: "github.com/danilbasirov801-commits",
    link:  "https://github.com/danilbasirov801-commits"
  }
];


/* --- Проекты ----------------------------------------------------------------
   Порядок в списке = порядок на сайте. Первый объект показывается первым.

   Поля проекта:
     slug       — латиницей и дефисы, без пробелов. Из него строится адрес
                  страницы кейса: projects/project.html?p=slug
     featured   — true, чтобы показать в блоке «Избранные проекты» на главной
                  (показываются первые три с featured: true)
     title      — название, { ru, en }
     year       — год, число
     tags       — рубрики из TAGS выше, список: ["landing", "webapp"]
     stack      — технологии, список строк (не переводится)
     cover      — обложка, путь от корня сайта
     images     — дополнительные картинки для галереи кейса (может быть [])
     summary    — одна фраза для карточки, { ru, en }
     description— текст кейса, список абзацев: { ru: ["...", "..."], en: [...] }
     url        — ссылка на живой сайт ("" если нет)
     repo       — ссылка на код ("" если нет)                                     */
const PROJECTS = [
  {
    slug: "pulse-analytics",
    featured: true,
    title: { ru: "«Пульс» — лендинг аналитики маркетплейсов", en: "Pulse — marketplace analytics landing page" },
    year: 2026,
    tags: ["landing"],
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "assets/img/projects/pulse-analytics.png",
    images: [],
    summary: {
      ru: "Продающий лендинг SaaS-сервиса: анимированный дашборд на CSS/SVG, тарифы с пересчётом цен, слайдер отзывов и FAQ-аккордеон.",
      en: "A sales landing for a SaaS analytics product: animated CSS/SVG dashboard, pricing with live recalculation, review slider and FAQ accordion."
    },
    description: {
      ru: [
        "Задача: сделать лендинг для сервиса аналитики продаж на маркетплейсах, который объясняет продукт, показывает выгоды и приводит посетителя к заявке на демо.",
        "Что сделано: вся страница — на чистом HTML, CSS и JavaScript. Hero с формой и «живым» дашбордом, нарисованным на CSS/SVG, блок возможностей, шаги подключения, анимированные счётчики цифр, тарифы с переключателем «месяц/год» и пересчётом цен, слайдер отзывов, FAQ-аккордеон и формы с валидацией и тостами-уведомлениями.",
        "Детали: адаптивная вёрстка с бургер-меню, плавные reveal-анимации при прокрутке и тёмная тема в фирменных цветах сервиса."
      ],
      en: [
        "The brief: build a landing page for a marketplace sales analytics service that explains the product, shows the benefits and converts visitors into demo requests.",
        "What I did: the whole page is plain HTML, CSS and JavaScript — a hero with a form and a \"live\" dashboard drawn in CSS/SVG, a features grid, onboarding steps, animated number counters, pricing with a month/year toggle that recalculates prices, a review slider, a FAQ accordion and forms with validation and toast notifications.",
        "Details: a responsive layout with a burger menu, smooth reveal-on-scroll animations and a dark theme in the product's brand colours."
      ]
    },
    url: "https://danilbasirov801-commits.github.io/landingdemo/",
    repo: "https://github.com/danilbasirov801-commits/landingdemo"
  },

  {
    slug: "zerno-coffee",
    featured: true,
    title: { ru: "«Зерно» — интернет-магазин кофе", en: "Zerno — specialty coffee store" },
    year: 2026,
    tags: ["ecommerce"],
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "assets/img/projects/zerno-coffee.png",
    images: [],
    summary: {
      ru: "Магазин свежеобжаренного кофе: каталог с фильтрами и сортировкой, корзина с промокодом и оформлением заказа — на ванильном JS.",
      en: "A fresh-roast coffee store: catalogue with filters and sorting, a cart with promo codes and checkout — in vanilla JS."
    },
    description: {
      ru: [
        "Задача: интернет-магазин обжарщика кофе на чистом JavaScript, без фреймворков и бэкенда — витрина, корзина и оформление заказа на одной странице.",
        "Что сделано: каталог товаров рендерится из JS-массива, есть фильтры по типу помола и обжарке и сортировка по цене; корзина-«шторка» меняет количество, применяет промокод и добавляет стоимость доставки; заказ оформляется через форму с валидацией (демо-режим, без отправки на сервер).",
        "Детали: слайдер отзывов, блок доставки и оплаты, бургер-меню, тосты-уведомления и адаптив от мобильного до десктопа."
      ],
      en: [
        "The brief: a coffee roaster's online store in pure JavaScript — no frameworks and no backend: storefront, cart and checkout on one page.",
        "What I did: the product catalogue is rendered from a JS array with filters by grind type and roast level plus price sorting; a slide-in cart updates quantities, applies a promo code and adds delivery cost; orders go through a validated checkout form (demo mode, nothing is sent to a server).",
        "Details: a review slider, a delivery and payments section, a burger menu, toast notifications and a responsive layout from mobile to desktop."
      ]
    },
    url: "https://danilbasirov801-commits.github.io/democofee/",
    repo: "https://github.com/danilbasirov801-commits/democofee"
  },

  {
    slug: "astrolog-site",
    featured: true,
    title: { ru: "Сайт астролога Анастасии Богомоловой", en: "Astrologer Anastasia Bogomolova's website" },
    year: 2026,
    tags: ["landing"],
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "assets/img/projects/astrolog-site.png",
    images: [],
    summary: {
      ru: "Сайт-визитка специалиста: каталог из 14 услуг с ценами в модальных окнах и приём заказов через мессенджеры.",
      en: "A personal service site: a catalogue of 14 services with prices in modal windows and orders taken via messengers."
    },
    description: {
      ru: [
        "Задача: специалист по астрологии принимает заказы в соцсетях — нужен был одностраничный сайт, куда можно привести человека и где он сам разберётся с услугами, ценами и способами связи.",
        "Что сделано: каталог из 14 услуг — клик открывает модальное окно с описанием, стоимостью и сроком; отдельный блок отвечает на вопрос «что нужно для заказа»; кнопки Telegram, WhatsApp и других мессенджеров ведут прямо в диалог, в подвале — реквизиты самозанятого.",
        "Детали: адаптивная вёрстка, мягкая палитра, крупная типографика Playfair Display и аккуратные модальные окна с закрытием по Escape и клику по фону."
      ],
      en: [
        "The brief: the astrologer takes orders in social media and needed a one-page site to send people to — where they can browse services, prices and contact options on their own.",
        "What I did: a catalogue of 14 services — clicking one opens a modal with the description, price and turnaround time; a separate block answers \"what is needed to order\"; Telegram, WhatsApp and other messenger buttons lead straight to the chat, with the sole proprietor's details in the footer.",
        "Details: a responsive layout, a soft palette, large Playfair Display typography and neat modals that close on Escape or a backdrop click."
      ]
    },
    url: "https://danilbasirov801-commits.github.io/ostrolog/",
    repo: "https://github.com/danilbasirov801-commits/ostrolog"
  },

  {
    slug: "my-game-shelf",
    featured: false,
    title: { ru: "«Моя игровая полка»", en: "My Game Shelf" },
    year: 2026,
    tags: ["webapp"],
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "assets/img/projects/my-game-shelf.png",
    images: [],
    summary: {
      ru: "Интерактивная галерея любимых игр: карточки с жанрами и рейтингами, описания открываются в модальном окне.",
      en: "An interactive gallery of favourite games: cards with genres and ratings, descriptions open in a modal."
    },
    description: {
      ru: [
        "Идея: небольшая страница о шести любимых играх — с карточками, как в магазине, но в собственном тёмном стиле.",
        "Как устроено: данные каждой игры (название, жанр, рейтинг, описание, иконка) лежат в data-атрибутах карточки; кнопка «Подробнее» открывает модальное окно, которое закрывается крестиком, кликом по фону или Escape.",
        "Детали: сетка карточек адаптивная — три колонки на десктопе и одна на телефоне."
      ],
      en: [
        "The idea: a small page about six favourite games — store-like cards in a custom dark style.",
        "How it works: each game's data (title, genre, rating, description, icon) lives in the card's data attributes; the \"Details\" button opens a modal that closes via the cross, a backdrop click or Escape.",
        "Details: the card grid is responsive — three columns on desktop, one on mobile."
      ]
    },
    url: "https://danilbasirov801-commits.github.io/My-game-shelf/",
    repo: "https://github.com/danilbasirov801-commits/My-game-shelf"
  },

  {
    slug: "kto-kachat-segodnya",
    featured: false,
    title: { ru: "«Кого сегодня качать?» — рулетка игр", en: "Who Should I Play Today? — game roulette" },
    year: 2026,
    tags: ["webapp"],
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "assets/img/projects/kto-kachat-segodnya.png",
    images: [],
    summary: {
      ru: "Ретро-рулетка в духе аркадного автомата: жмёшь «Крутить» — названия мелькают, и судьба выбирает игру из библиотеки.",
      en: "A retro arcade-style roulette: hit Spin, titles flash by and fate picks your next game."
    },
    description: {
      ru: [
        "Идея: у геймера большая библиотека и вечная проблема «во что поиграть». Этот мини-сервис решает её случайным выбором из списка.",
        "Как устроено: список игр лежит в массиве — его легко пополнять; по кнопке «Крутить» названия быстро меняются каждые 50 мс, затем рулетка останавливается на случайной игре; во время прокрутки кнопка блокируется, чтобы не сломать анимацию.",
        "Детали: неоновый ретро-стиль на пиксельном шрифте Press Start 2P."
      ],
      en: [
        "The idea: every gamer with a big library knows the \"what do I play tonight\" problem. This mini-app solves it with a random pick from your list.",
        "How it works: the game list is a plain array that is easy to extend; hitting Spin cycles random titles every 50 ms, then the roulette settles on a final pick; the button is locked while spinning so the animation cannot be broken.",
        "Details: a neon retro look with the Press Start 2P pixel font."
      ]
    },
    url: "https://danilbasirov801-commits.github.io/Who-should-I-rock-today-/",
    repo: "https://github.com/danilbasirov801-commits/Who-should-I-rock-today-"
  },

  {
    slug: "backlog-tracker",
    featured: false,
    title: { ru: "Backlog-Tracker — список игр «пройти»", en: "Backlog Tracker — a \"to-play\" list" },
    year: 2026,
    tags: ["webapp"],
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "assets/img/projects/backlog-tracker.png",
    images: [],
    summary: {
      ru: "Трекер игрового бэклога: добавить игру, отметить пройденной, почистить список — всё сохраняется в localStorage.",
      en: "A gaming backlog tracker: add a game, mark it as finished, clean up the list — everything persists in localStorage."
    },
    description: {
      ru: [
        "Задача: простое приложение без бэкенда, где игрок ведёт список игр «на прохождение» и не теряет его после перезагрузки страницы.",
        "Как устроено: игры добавляются через поле — Enter или кнопкой; клик по пункту переключает статус «в процессе / пройдено»; отдельная кнопка удаляет все пройденные; список хранится в localStorage, при первом запуске подставляется пример.",
        "Детали: тот же неоново-пиксельный стиль, что и у рулетки, — проекты задуманы как пара."
      ],
      en: [
        "The brief: a simple no-backend app where a player keeps a to-play list and never loses it after a page reload.",
        "How it works: games are added via the input with Enter or the plus button; clicking an entry toggles \"in progress / finished\"; a button clears all finished games; the list is stored in localStorage and a sample list is shown on first launch.",
        "Details: it shares the neon pixel style with the roulette app — the two were made as a pair."
      ]
    },
    url: "https://danilbasirov801-commits.github.io/Backlog-Tracker/",
    repo: "https://github.com/danilbasirov801-commits/Backlog-Tracker"
  }
];


/* --- Переводы интерфейса -----------------------------------------------------
   Подписи кнопок и заголовков разделов. Меняйте, если хочется других формулировок. */
const UI = {
  ru: {
    nav_home: "Главная",
    nav_projects: "Проекты",
    nav_about: "Обо мне",
    nav_contact: "Контакты",

    hero_cta_projects: "Смотреть проекты",
    hero_cta_contact: "Связаться",

    home_services_kicker: "Чем я занимаюсь",
    home_services_title: "Что я делаю",
    home_featured_kicker: "Портфолио",
    home_featured_title: "Избранные проекты",
    home_featured_all: "Все проекты",
    home_about_kicker: "Обо мне",
    home_about_title: "Привет, я {name}",
    home_about_more: "Подробнее обо мне",

    cta_title: "Есть задача? Обсудим её",
    cta_text: "Расскажите пару абзацев о проекте — отвечу в течение дня и предложу решение с оценкой сроков и стоимости.",
    cta_button: "Написать мне",

    projects_title: "Проекты",
    projects_word: "проект,проекта,проектов",
    filter_all: "Все",
    card_view: "Смотреть кейс",

    detail_back: "← Все проекты",
    detail_about: "О проекте",
    detail_year: "Год",
    detail_stack: "Стек",
    detail_tags: "Рубрики",
    detail_open: "Открыть сайт",
    detail_code: "Исходный код",
    detail_next: "Следующий проект",
    detail_notfound_title: "Проект не найден",
    detail_notfound_text: "Возможно, ссылка устарела. Посмотрите другие проекты — их список на отдельной странице.",
    detail_notfound_link: "К списку проектов",

    about_title: "Обо мне",
    about_skills_kicker: "Инструменты",
    about_skills_title: "Стек и технологии",
    about_exp_kicker: "Путь",
    about_exp_title: "Опыт работы",
    about_resume: "Скачать резюме",

    contact_title: "Давайте обсудим ваш проект",
    contact_subtitle: "Выберите удобный способ связи — пишите в любое время, отвечаю обычно в течение дня.",
    contact_note: "Перед стартом всегда делаю бесплатную оценку: обсуждаем задачу, я предлагаю решение, сроки и стоимость.",

    footer_note: "Сделано на чистом HTML, CSS и JavaScript — без фреймворков",
    footer_rights: "Все права защищены",

    theme_to_dark: "Включить тёмную тему",
    theme_to_light: "Включить светлую тему",
    to_top: "Наверх",
    copy: "Скопировать",
    copied: "Скопировано"
  },

  en: {
    nav_home: "Home",
    nav_projects: "Projects",
    nav_about: "About",
    nav_contact: "Contact",

    hero_cta_projects: "View projects",
    hero_cta_contact: "Get in touch",

    home_services_kicker: "What I do",
    home_services_title: "Services",
    home_featured_kicker: "Portfolio",
    home_featured_title: "Featured projects",
    home_featured_all: "All projects",
    home_about_kicker: "About me",
    home_about_title: "Hi, I am {name}",
    home_about_more: "More about me",

    cta_title: "Got a project in mind? Let's talk",
    cta_text: "Send me a couple of paragraphs about your task — I will reply within a day with an approach, timeline and estimate.",
    cta_button: "Write to me",

    projects_title: "Projects",
    projects_word: "project,projects",
    filter_all: "All",
    card_view: "View case",

    detail_back: "← All projects",
    detail_about: "About the project",
    detail_year: "Year",
    detail_stack: "Stack",
    detail_tags: "Category",
    detail_open: "Visit site",
    detail_code: "Source code",
    detail_next: "Next project",
    detail_notfound_title: "Project not found",
    detail_notfound_text: "The link may be outdated. Take a look at the other projects — the full list is on a separate page.",
    detail_notfound_link: "Back to all projects",

    about_title: "About me",
    about_skills_kicker: "Toolbox",
    about_skills_title: "Stack & technologies",
    about_exp_kicker: "Path",
    about_exp_title: "Experience",
    about_resume: "Download CV",

    contact_title: "Let's discuss your project",
    contact_subtitle: "Pick whichever channel suits you — write any time, I usually reply within a day.",
    contact_note: "Every project starts with a free estimate: we discuss the task, I propose an approach, timeline and price.",

    footer_note: "Built with plain HTML, CSS and JavaScript — no frameworks",
    footer_rights: "All rights reserved",

    theme_to_dark: "Switch to dark theme",
    theme_to_light: "Switch to light theme",
    to_top: "Back to top",
    copy: "Copy",
    copied: "Copied"
  }
};


/* ============================================================================
   ШАБЛОН НОВОГО ПРОЕКТА
   ----------------------------------------------------------------------------
   1. Скопируйте блок ниже, раскомментируйте (уберите /* в начале и * / в конце)
      и вставьте копию ВНУТРЬ списка PROJECTS выше — перед закрывающей ].
   2. Заполните поля. Не забудьте положить обложку в assets/img/projects/.
   3. Сохраните файл и обновите страницу — новый проект появится сам.
   ----------------------------------------------------------------------------
   Пример готового проекта — первый в списке PROJECTS выше.
   ==========================================================================

  {
    slug: "moy-novyj-sajt",
    featured: false,
    title: { ru: "Название проекта", en: "Project name" },
    year: 2026,
    tags: ["landing"],
    stack: ["HTML", "CSS", "JavaScript"],
    cover: "assets/img/projects/moy-novyj-sajt.svg",
    images: [],
    summary: {
      ru: "Одна фраза о проекте — она показывается в карточке.",
      en: "One sentence about the project — shown on the card."
    },
    description: {
      ru: [
        "Задача: что было нужно заказчику.",
        "Что сделал: как вы решили задачу.",
        "Результат: цифры и факты, если есть."
      ],
      en: [
        "The brief: what the client needed.",
        "What I did: how you solved it.",
        "Result: numbers and facts, if any."
      ]
    },
    url: "https://ssylka-na-sajt.ru",
    repo: ""
  }

========================================================================== */
