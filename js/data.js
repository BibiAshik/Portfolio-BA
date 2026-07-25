/* ═══════════════════════════════════════════
   data.js — Single source of truth for all
   editable content. Edit HERE, not in HTML.
   ═══════════════════════════════════════════ */

export const personalInfo = {
  name: "Bibi Ashik",
  initials: "BA",
  tagline: "Building secure, scalable backend systems from Chennai.",
  bio: "Aspiring Full-Stack Java Developer based in Chennai, pursuing B.E. ECE at Sri Sairam Institute of Technology. Specializes in Java, Spring Boot, Spring Security, REST APIs — building secure, scalable, production-ready backend systems.",
  roles: ["Java Developer", "Software Engineer"],
  location: "Chennai, India",
  email: "bibiashik2005@gmail.com",
  /* ── Resume: swap the path below when you add the real file ── */
  resumeLink: "resume.pdf",
};

export const heroBadges = [
  "Java", "Spring Boot", "Spring Security", "MySQL", "Docker"
];

export const skills = [
  { name: "Java",            icon: "devicon-java-plain colored" },
  { name: "C++",             icon: "devicon-cplusplus-plain colored" },
  { name: "SQL",             icon: "devicon-azuresqldatabase-plain colored" },
  { name: "HTML5",           icon: "devicon-html5-plain colored" },
  { name: "CSS3",            icon: "devicon-css3-plain colored" },
  { name: "JavaScript",      icon: "devicon-javascript-plain colored" },
  { name: "Spring Boot",     icon: "devicon-spring-plain colored" },
  { name: "Spring Security", icon: null, svgIcon: '<svg viewBox="0 0 24 24" fill="none" stroke="#6db33f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><rect x="9" y="11" width="6" height="5" rx="1" ry="1"/><path d="M10 11V9a2 2 0 0 1 4 0v2"/></svg>' },
  { name: "Hibernate",       icon: "devicon-hibernate-plain colored" },
  { name: "OAuth2",          icon: null, svgIcon: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f0f0f0"/><stop offset="50%" stop-color="#b0b0b0"/><stop offset="100%" stop-color="#505050"/></linearGradient><linearGradient id="inner" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#333"/><stop offset="100%" stop-color="#111"/></linearGradient><pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="none" stroke="#555" stroke-width="0.5"/></pattern></defs><circle cx="50" cy="50" r="48" fill="url(#silver)"/><path id="top-curve" d="M 20 50 a 30 30 0 0 1 60 0" fill="transparent"/><text font-family="sans-serif" font-weight="900" font-size="14" fill="#222" letter-spacing="4"><textPath href="#top-curve" startOffset="50%" text-anchor="middle">OAUTH</textPath></text><circle cx="50" cy="50" r="32" fill="url(#inner)" stroke="#888" stroke-width="2"/><circle cx="50" cy="50" r="31" fill="url(#grid)"/><text x="50" y="66" font-family="sans-serif" font-weight="900" font-size="44" fill="#FFF" text-anchor="middle">2</text></svg>' },
  { name: "MySQL",           icon: "devicon-mysql-plain colored" },
  { name: "Redis",           icon: "devicon-redis-plain colored" },
  { name: "Git",             icon: "devicon-git-plain colored" },
  { name: "GitHub",          icon: "devicon-github-original" },
  { name: "Postman",         icon: "devicon-postman-plain colored" },
  { name: "Docker",          icon: "devicon-docker-plain colored" },
];

export const projects = [
  {
    title: "Trust Ledger",
    description: "Enterprise-grade Gold Loan Management System featuring automated interest calculation and digital payments.",
    challenge: "Traditional gold loan shops rely on manual physical ledgers, leading to human calculation errors, zero customer transparency, and tedious tracking of overdue accounts.",
    solution: "Engineered a stateless Spring Boot backend with Redis caching, JWT role-based access, and Razorpay integration to securely digitize and automate the entire loan lifecycle.",
    tags: ["Java", "Spring Boot", "Spring Security", "Redis", "MySQL"],
    github: "https://github.com/BibiAshik/Trust-Ledger",
    live: null,
    screenshot: "images/projects/trust-ledger.png",
  },
  {
    title: "CampusBite",
    description: "An automated canteen platform handling walk-in billing and mobile pre-orders with real-time payment matching.",
    challenge: "College canteens face massive queues, delayed cash transactions, and chaotic manual order tracking during peak hours. Furthermore, high-demand food items frequently oversell when multiple students attempt to buy the last available stock at the exact same millisecond.",
    solution: "A Spring Boot application that digitizes the canteen experience. It features Google OAuth2 for instant student access and implements database-level Optimistic Locking to entirely prevent high-traffic race conditions, ensuring perfect inventory accuracy.",
    tags: ["Java", "Spring Boot", "MySQL", "Vanilla JS", "OAuth2"],
    github: "https://github.com/BibiAshik/Campus-Bite",
    live: null,
    screenshot: "images/projects/campus-bite.png",
  },
  {
    title: "Serve Flow",
    description: "A dual-portal canteen platform that eliminates queues by instantly matching live UPI payments to walk-in bills and printing tokens in real-time.",
    challenge: "College canteens face massive delays during peak hours. Cashiers struggle to manually verify UPI payments on personal devices and issue tokens by hand, leading to payment ambiguities and long wait times.",
    solution: "A highly concurrent Spring Boot architecture using multithreading and Razorpay Webhooks to match incoming payments to pending bills instantly. Server-Sent Events (SSE) push live updates to the cashier's dashboard, completely automating payment verification and token generation.",
    tags: ["Java", "Spring Boot", "Razorpay Webhooks", "Multithreading", "SSE", "Vanilla JS"],
    github: "https://github.com/BibiAshik/Serve-Flow",
    live: null,
    screenshot: "images/projects/serve-flow.png",
  },
  {
    title: "Trust Ledger — Gold Loan SaaS",
    description: "A multi-tenant SaaS platform that digitizes local gold loan businesses, featuring a shop management dashboard and a customer self-service payment portal.",
    challenge: "Local gold loan shops rely on messy handwritten ledgers. Tracking daily interest is error-prone, manual payment collection is inefficient, and customers lack visibility into their due balances, leading to frequent disputes and lost trust.",
    solution: "A secure digital platform that completely replaces handwritten ledgers. It automates overdue reminders and integrates Razorpay Route to route online interest payments directly into individual shop owners' bank accounts, while giving customers a transparent portal to track and pay their dues.",
    tags: ["Java", "Spring Boot", "MySQL", "Razorpay Route"],
    github: "https://github.com/BibiAshik/TrustLedger-SaaS",
    live: null,
    screenshot: "images/projects/trustledger-saas.png",
  },
];

export const education = [
  {
    degree: "B.E. Electronics & Communication Engineering",
    college: "Sri Sairam Institute of Technology, Chennai",
    year: "2022 — 2026",
  },
];

export const achievements = [
  {
    title: "IEEE Publication — Intelligent Water Safety Signal Transmitting System",
    description: "Published my college final-year project paper titled \"Intelligent Water Safety Signal Transmitting System\" in IEEE Xplore.",
    link: "https://ieeexplore.ieee.org/document/11307606",
    linkText: "View on IEEE Xplore →",
  },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/BibiAshik",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/bibiashik05",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>',
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Bibi_Ashik_B_A",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/></svg>',
  },
  {
    name: "SkillRack",
    url: "https://www.skillrack.com/faces/resume.xhtml?id=402349&key=b1f4ba1baa6dd32a5d09c298c1286549c5c24a7d",
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  },
];

export const navLinks = [
  { name: "About",        href: "#about" },
  { name: "Skills",       href: "#skills" },
  { name: "Projects",     href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Education",    href: "#education" },
  { name: "Contact",      href: "#contact" },
];

/* Tag → Devicon mapping for project cards */
export const tagIcons = {
  "Java":            "devicon-java-plain colored",
  "Spring Boot":     "devicon-spring-plain colored",
  "Spring Security": "devicon-spring-plain colored",
  "JWT":             null,
  "MySQL":           "devicon-mysql-plain colored",
  "Google OAuth2":   null,
  "OAuth2":          null,
  "Redis":           "devicon-redis-plain colored",
  "Vanilla JS":        "devicon-javascript-plain colored",
  "Razorpay":          null,
  "Razorpay Webhooks": null,
  "Razorpay Route":    null,
  "Multithreading":    null,
  "SSE":               null,
};
