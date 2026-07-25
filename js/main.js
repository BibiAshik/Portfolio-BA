/* ═══════════════════════════════════════════
   main.js — Entry point.
   Renders all dynamic content from data.js,
   wires up navbar, and initializes effects.
   ═══════════════════════════════════════════ */

import {
  personalInfo, heroBadges, skills, projects,
  education, achievements, socialLinks, navLinks, tagIcons,
} from './data.js';

import {
  initParticles, initCursorGlow, initScrollProgress,
  initScrollReveal, initStaggerReveal, initDecryptText,
  initBlurReveal, initSplitText, initRoleCycler,
} from './effects.js';

import { initGithubWidget } from './githubWidget.js';

/* ════════════════════════════════════════════
   RENDER FUNCTIONS
   ════════════════════════════════════════════ */

/* ── Navbar ── */
function renderNavbar() {
  const container = document.getElementById('nav-links');
  if (!container) return;

  navLinks.forEach((link) => {
    const btn = document.createElement('button');
    btn.className = 'nav-link';
    btn.dataset.section = link.href.substring(1);

    const textSpan = document.createElement('span');
    textSpan.textContent = link.name;
    textSpan.dataset.decrypt = '';
    btn.appendChild(textSpan);

    const underline = document.createElement('span');
    underline.className = 'nav-link-underline';
    btn.appendChild(underline);

    btn.addEventListener('click', () => {
      const el = document.querySelector(link.href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });

    container.appendChild(btn);
  });
}

/* ── Navbar scroll effects ── */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('nav-logo');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Glassmorphism
    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    const sections = navLinks.map((l) => l.href.substring(1));
    let current = '';

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          current = sectionId;
          break;
        }
      }
    }

    if (scrollY < 100) current = '';

    document.querySelectorAll('.nav-link').forEach((link) => {
      if (link.dataset.section === current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });

  // Logo click — scroll to top
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ── Hero Social Icons ── */
function renderSocialIcons(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  socialLinks.forEach((social) => {
    const a = document.createElement('a');
    a.href = social.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = social.name;
    a.className = containerId.includes('mobile') ? 'hero-mobile-social-icon' : 'social-icon';
    a.innerHTML = social.svg;
    container.appendChild(a);
  });
}

/* ── Hero Badges ── */
function renderHeroBadges() {
  const container = document.getElementById('hero-badges');
  if (!container) return;

  heroBadges.forEach((badge) => {
    const span = document.createElement('span');
    span.className = 'hero-badge-item';
    span.textContent = badge;
    container.appendChild(span);
  });
}

/* ── Skills Grid ── */
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  const mobile = document.getElementById('skills-mobile');
  if (!grid && !mobile) return;

  skills.forEach((skill, i) => {
    // Desktop card
    if (grid) {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.dataset.staggerChild = '';
      card.style.transitionDelay = `${i * 0.05}s`;

      let iconHtml;
      if (skill.icon) {
        iconHtml = `<i class="${skill.icon}"></i>`;
      } else if (skill.svgIcon) {
        iconHtml = `<span class="skill-icon-svg">${skill.svgIcon}</span>`;
      }

      card.innerHTML = `
        ${iconHtml}
        <span class="skill-name">${skill.name}</span>
      `;
      grid.appendChild(card);
    }

    // Mobile pill
    if (mobile) {
      const pill = document.createElement('span');
      pill.className = 'skill-pill';
      pill.dataset.staggerChild = '';
      pill.style.transitionDelay = `${i * 0.02}s`;

      let iconHtml = '';
      if (skill.icon) {
        iconHtml = `<i class="${skill.icon} colored"></i>`;
      } else if (skill.svgIcon) {
        iconHtml = `<span class="skill-icon-svg" style="display:inline-flex;align-items:center;width:14px;height:14px;">${skill.svgIcon}</span>`;
      }

      pill.innerHTML = `${iconHtml}<span>${skill.name}</span>`;
      mobile.appendChild(pill);
    }
  });
}

/* ── Projects Grid ── */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  projects.forEach((project, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.staggerChild = '';
    card.style.transitionDelay = `${i * 0.08}s`;

    const tagsHtml = project.tags.map((tag) => {
      const iconValue = tagIcons[tag];
      let iconEl = '';
      if (iconValue) {
        if (iconValue.startsWith('<svg')) {
          iconEl = `<span class="skill-icon-svg" style="display:inline-flex;align-items:center;width:14px;height:14px;">${iconValue}</span>`;
        } else {
          iconEl = `<i class="${iconValue}"></i>`;
        }
      }
      return `<span class="project-tag">${iconEl}${tag}</span>`;
    }).join('');

    const liveHtml = project.live ? `
      <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link live" onclick="event.stopPropagation()">
        Live Demo
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h10v10M7 17 17 7"/></svg>
      </a>
    ` : '';

    card.innerHTML = `
      <div class="project-card-inner" data-project-index="${i}">
        <div class="project-gradient-bar"></div>

        <div class="project-browser">
          <div class="browser-bar">
            <div class="browser-dots">
              <span class="browser-dot red"></span>
              <span class="browser-dot yellow"></span>
              <span class="browser-dot green"></span>
            </div>
            <div class="browser-url">${project.live ? project.live.replace('https://', '') : 'localhost:8080'}</div>
          </div>
          <div class="project-screenshot-wrapper">
            <img src="${project.screenshot}" alt="${project.title} Interface" loading="lazy">
          </div>
        </div>

        <div class="project-content">
          <div class="project-header">
            <span class="project-number">${String(i + 1).padStart(2, '0')}</span>
            <span class="project-label">
              <span class="project-label-dot"></span>
              Case Study
            </span>
          </div>

          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>

          <div class="project-tags">${tagsHtml}</div>

          <div class="project-links">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link" onclick="event.stopPropagation()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
            </a>
            ${liveHtml}
          </div>
        </div>
      </div>
    `;

    // Click to open modal
    card.querySelector('.project-card-inner').addEventListener('click', () => {
      openProjectModal(project);
    });

    grid.appendChild(card);
  });
}

/* ── Project Modal ── */
function openProjectModal(project) {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  const tagsHtml = project.tags.map((tag) => {
      const iconValue = tagIcons[tag];
      let iconEl = '';
      if (iconValue) {
        if (iconValue.startsWith('<svg')) {
          iconEl = `<span class="skill-icon-svg" style="display:inline-flex;align-items:center;width:14px;height:14px;">${iconValue}</span>`;
        } else {
          iconEl = `<i class="${iconValue}"></i>`;
        }
      }
      return `<span class="project-tag">${iconEl}${tag}</span>`;
  }).join('');

  const screenshotHtml = project.screenshot ? `
    <div style="display:flex;flex-direction:column;gap:0.75rem;">
      <h4 style="font-size:0.7rem;font-family:var(--mono);font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted);">
        INTERFACE PREVIEW
      </h4>
      <div style="display:flex;flex-direction:column;border-radius:12px;overflow:hidden;border:1px solid var(--border);box-shadow:0 10px 30px -10px rgba(0,0,0,0.3);">
        <div class="browser-bar">
          <div class="browser-dots">
            <span class="browser-dot red"></span>
            <span class="browser-dot yellow"></span>
            <span class="browser-dot green"></span>
          </div>
          <div class="browser-url" style="max-width:200px;">${project.live ? project.live.replace('https://', '') : 'localhost:8080'}</div>
        </div>
        <div class="project-screenshot-wrapper">
          <img src="${project.screenshot}" alt="${project.title} Interface" loading="lazy">
        </div>
      </div>
    </div>
  ` : '';

  const liveBtn = project.live ? `
    <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="modal-action-btn modal-action-primary">
      Launch Live App
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 7h10v10M7 17 17 7"/></svg>
    </a>
  ` : '';

  const challengeHtml = project.challenge ? `
    <div class="modal-problem">
      <div class="modal-section-label">
        <div class="icon-circle">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h4>THE CHALLENGE / PROBLEM</h4>
      </div>
      <p class="modal-section-text">${project.challenge}</p>
    </div>
  ` : '';

  const solutionHtml = project.solution ? `
    <div class="modal-solution">
      <div class="modal-section-label">
        <div class="icon-circle">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h4>PROPOSED SOLUTION</h4>
      </div>
      <p class="modal-section-text">${project.solution}</p>
    </div>
  ` : '';

  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-body').innerHTML = `
    <div class="modal-grid">
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        <div class="project-tags">${tagsHtml}</div>
        <p style="font-size:1rem;line-height:1.6;color:var(--text-h);opacity:0.85;">${project.description}</p>
        ${challengeHtml}
        ${solutionHtml}
      </div>

      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        ${screenshotHtml}
        <div class="modal-actions">
          <h5>Project Action</h5>
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="modal-action-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            Explore Repository
          </a>
          ${liveBtn}
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const overlay = document.getElementById('project-modal');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModal() {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  // Close on backdrop click
  overlay.querySelector('.modal-backdrop').addEventListener('click', closeProjectModal);
  // Close button
  overlay.querySelector('.modal-close').addEventListener('click', closeProjectModal);
  // Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

/* ── Education Timeline ── */
function renderEducation() {
  const container = document.getElementById('education-timeline');
  if (!container) return;

  education.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.dataset.staggerChild = '';
    el.style.transitionDelay = `${i * 0.1}s`;

    let focusHtml = '';
    if (item.focus) {
      focusHtml = `<p class="timeline-focus"><strong>Focus: </strong>${item.focus}</p>`;
    }

    let cgpaHtml = '';
    if (item.cgpa) {
      cgpaHtml = `
        <span style="font-size:0.75rem;padding:0.125rem 0.5rem;border-radius:4px;font-weight:500;color:var(--text-h);background:var(--bg);border:1px solid var(--border);">
          ${item.cgpa}
        </span>
      `;
    }

    el.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <h3 class="timeline-degree">${item.degree}</h3>
          <span class="timeline-year">${item.year}</span>
        </div>
        <div class="timeline-college">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m2 7 10-5 10 5-10 5z"/><path d="M22 7v7"/><path d="M12 22v-7M2 7v7l10 5"/></svg>
          ${item.college}
          ${cgpaHtml}
        </div>
        ${focusHtml}
      </div>
    `;

    container.appendChild(el);
  });
}

/* ── Achievements ── */
function renderAchievements() {
  const container = document.getElementById('achievements-list');
  if (!container) return;

  achievements.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    card.dataset.staggerChild = '';
    card.style.transitionDelay = `${i * 0.1}s`;

    card.innerHTML = `
      <div class="achievement-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      </div>
      <div class="achievement-content">
        <h3 class="achievement-title">${item.title}</h3>
        <p class="achievement-desc">${item.description}</p>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="achievement-link">
          ${item.linkText}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h10v10M7 17 17 7"/></svg>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ── Contact Social ── */
function renderContactSocial() {
  const container = document.getElementById('contact-social-icons');
  if (!container) return;

  socialLinks.forEach((social) => {
    const a = document.createElement('a');
    a.href = social.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = social.name;
    a.className = 'social-icon';
    a.innerHTML = social.svg;
    container.appendChild(a);
  });
}

/* ── Footer Year ── */
function renderFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── About Section (GitHub data) ── */
async function renderAbout() {
  const CACHE_TTL = 60 * 60 * 1000;

  async function fetchWithCache(key, url) {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) return data;
      }
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const profileData = await fetchWithCache('gh_profile', 'https://api.github.com/users/BibiAshik');
  const repoData = await fetchWithCache('gh_repos', 'https://api.github.com/users/BibiAshik/repos?sort=updated&per_page=100');

  // Render profile header
  const headerEl = document.getElementById('about-header');
  if (headerEl && profileData) {
    headerEl.innerHTML = `
      <img src="${profileData.avatar_url}" alt="GitHub Avatar" class="about-avatar">
      <div class="about-info">
        <a href="${profileData.html_url}" target="_blank" rel="noopener noreferrer" class="about-name">${profileData.name || profileData.login}</a>
        <p class="about-username">@${profileData.login}</p>
      </div>
      <div class="about-stats">
        <div>
          <span class="about-stat-number">${profileData.public_repos}</span>
          <span class="about-stat-label">Repositories</span>
        </div>
        <div>
          <span class="about-stat-number">${profileData.followers}</span>
          <span class="about-stat-label">Followers</span>
        </div>
      </div>
    `;
  }

  // Render repos with pagination
  if (Array.isArray(repoData) && repoData.length > 0) {
    const reposPerPage = 4;
    let currentPage = 1;
    const totalPages = Math.ceil(repoData.length / reposPerPage);

    function renderRepoPage() {
      const gridEl = document.getElementById('repos-grid');
      const paginationEl = document.getElementById('repos-pagination');
      if (!gridEl) return;

      const start = (currentPage - 1) * reposPerPage;
      const pageRepos = repoData.slice(start, start + reposPerPage);

      const langColors = {
        JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#563d7c',
        Python: '#3572A5', Java: '#b07219', TypeScript: '#3178c6',
      };

      gridEl.innerHTML = pageRepos.map((repo) => {
        const langDot = repo.language ? `<span class="repo-lang-dot" style="background:${langColors[repo.language] || 'var(--text-h)'}"></span>${repo.language}` : '';
        const stars = repo.stargazers_count > 0 ? `
          <span style="display:flex;align-items:center;gap:4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${repo.stargazers_count}
          </span>
        ` : '';

        return `
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card">
            <div class="repo-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              <span class="repo-name">${repo.name}</span>
              <span class="repo-visibility">${repo.visibility}</span>
            </div>
            ${repo.description ? `<p class="repo-desc">${repo.description}</p>` : ''}
            <div class="repo-meta">
              ${langDot ? `<span style="display:flex;align-items:center;gap:4px;">${langDot}</span>` : ''}
              ${stars}
            </div>
          </a>
        `;
      }).join('');

      if (paginationEl && totalPages > 1) {
        paginationEl.innerHTML = `
          <button id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>← Previous</button>
          <span class="page-info">Page ${currentPage} of ${totalPages}</span>
          <button id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>
        `;

        document.getElementById('prev-page')?.addEventListener('click', () => {
          if (currentPage > 1) { currentPage--; renderRepoPage(); }
        });
        document.getElementById('next-page')?.addEventListener('click', () => {
          if (currentPage < totalPages) { currentPage++; renderRepoPage(); }
        });
      }
    }

    renderRepoPage();
  }
}

/* ════════════════════════════════════════════
   INITIALIZATION
   ════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Render dynamic content
  renderNavbar();
  renderSocialIcons('hero-social');
  renderSocialIcons('hero-mobile-social');
  renderHeroBadges();
  renderSkills();
  renderProjects();
  renderEducation();
  renderAchievements();
  renderContactSocial();
  renderFooterYear();

  // 2. Initialize modal
  initModal();

  // 3. Wire up navbar scroll effects
  initNavbarScroll();

  // 4. Initialize visual effects
  initParticles();
  initCursorGlow();
  initScrollProgress();

  // Small delay to let DOM paint before applying observers
  requestAnimationFrame(() => {
    initScrollReveal();
    initStaggerReveal();
    initDecryptText();
    initBlurReveal();
    initSplitText();
  });

  // 5. GitHub widget
  initGithubWidget();

  // 6. About section (async)
  renderAbout();

  // 7. Fix mailto links for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  if (isMobile) {
    const mailBtns = document.querySelectorAll('a[href^="https://mail.google.com/mail/"]');
    mailBtns.forEach(btn => {
      btn.href = "mailto:bibiashik2005@gmail.com?subject=Hello%20Bibi%20Ashik!";
      btn.removeAttribute('target');
    });
  }
});
