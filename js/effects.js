/* ═══════════════════════════════════════════
   effects.js — Particles, cursor glow,
   scroll progress, decrypt/blur/split text,
   scroll-reveal, hero role cycler
   ═══════════════════════════════════════════ */

/* ── Particle Background (Canvas) ── */
export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animId;
  let particles = [];
  const mouse = { x: null, y: null, radius: 150 };

  function resize() {
    const parent = canvas.parentElement;
    canvas.width = parent ? parent.clientWidth : window.innerWidth;
    canvas.height = parent ? parent.clientHeight : window.innerHeight;
    initP();
  }

  function initP() {
    particles = [];
    const count = canvas.width < 768 ? 30 : 70;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: Math.random() * 2 + 1,
      });
    }
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(192, 132, 252, 0.5)';
    ctx.fill();
  }

  function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * force * 1.5;
        p.y += Math.sin(angle) * force * 1.5;
      }
    }
    drawParticle(p);
  }

  function drawLines() {
    const maxDist = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < maxDist) {
          const opacity = ((maxDist - dist) / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(192, 132, 252, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    if (mouse.x !== null && mouse.y !== null) {
      for (let i = 0; i < particles.length; i++) {
        const dist = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);
        if (dist < mouse.radius) {
          const opacity = ((mouse.radius - dist) / mouse.radius) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(192, 132, 252, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(updateParticle);
    drawLines();
    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  resize();
  animate();
}

/* ── Cursor Glow ── */
export function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  // Hide on touch devices
  if ('ontouchstart' in window) {
    glow.style.display = 'none';
    return;
  }

  window.addEventListener('mousemove', (e) => {
    glow.style.left = (e.clientX - 150) + 'px';
    glow.style.top = (e.clientY - 150) + 'px';
  });
}

/* ── Scroll Progress Bar ── */
export function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ── Scroll Reveal (IntersectionObserver) ── */
export function initScrollReveal() {
  const elements = document.querySelectorAll('.scroll-reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px' });

  elements.forEach((el) => observer.observe(el));
}

/* ── Staggered Reveal for grids ── */
export function initStaggerReveal() {
  const containers = document.querySelectorAll('[data-stagger]');
  containers.forEach((container) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const children = container.querySelectorAll('[data-stagger-child]');
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('revealed');
            }, i * 60);
          });
          observer.unobserve(container);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  });
}

/* ── Decrypt Text Effect ── */
export function initDecryptText() {
  const elements = document.querySelectorAll('[data-decrypt]');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*';

  elements.forEach((el) => {
    const originalText = el.textContent;

    const scramble = () => {
      let iteration = 0;
      const maxIterations = 10;
      const speed = 40;

      const interval = setInterval(() => {
        el.textContent = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (iteration > index) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        iteration += 1 / 3;
        if (iteration >= maxIterations) {
          clearInterval(interval);
          el.textContent = originalText;
        }
      }, speed);
    };

    el.addEventListener('mouseenter', scramble);
  });
}

/* ── Blur Text Reveal ── */
export function initBlurReveal() {
  const elements = document.querySelectorAll('[data-blur-text]');

  elements.forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    const words = text.split(' ');

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'blur-word';
      span.textContent = word;
      el.appendChild(span);
      if (i < words.length - 1) {
        el.appendChild(document.createTextNode('\u00A0'));
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const wordSpans = el.querySelectorAll('.blur-word');
          wordSpans.forEach((ws, i) => {
            setTimeout(() => ws.classList.add('revealed'), i * 80);
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px' });

    observer.observe(el);
  });
}

/* ── Split Text Reveal ── */
export function initSplitText() {
  const elements = document.querySelectorAll('[data-split-text]');

  elements.forEach((el) => {
    const text = el.textContent;
    el.textContent = '';
    el.style.overflow = 'hidden';

    const wrapper = document.createElement('span');
    wrapper.className = 'split-text-wrapper';

    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'split-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      wrapper.appendChild(span);
    });

    el.appendChild(wrapper);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const charSpans = el.querySelectorAll('.split-char');
          charSpans.forEach((cs, i) => {
            setTimeout(() => cs.classList.add('revealed'), i * 30);
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '-50px' });

    observer.observe(el);
  });
}

/* ── Hero Role Cycler ── */
export function initRoleCycler(roles) {
  const wrapper = document.getElementById('hero-role-wrapper');
  if (!wrapper || !roles || !roles.length) return;

  let index = 0;
  // Create first role
  const roleEl = document.createElement('p');
  roleEl.className = 'hero-role';
  roleEl.textContent = roles[0];
  roleEl.style.transform = 'translateY(0)';
  roleEl.style.opacity = '1';
  wrapper.appendChild(roleEl);

  setInterval(() => {
    // Slide out current
    roleEl.style.transform = 'translateY(-100%)';
    roleEl.style.opacity = '0';

    setTimeout(() => {
      index = (index + 1) % roles.length;
      roleEl.textContent = roles[index];
      roleEl.style.transition = 'none';
      roleEl.style.transform = 'translateY(100%)';
      roleEl.style.opacity = '0';

      // Force reflow
      void roleEl.offsetHeight;

      roleEl.style.transition = 'all 0.4s ease-out';
      roleEl.style.transform = 'translateY(0)';
      roleEl.style.opacity = '1';
    }, 400);
  }, 2000);
}
