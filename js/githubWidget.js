/* ═══════════════════════════════════════════
   githubWidget.js — Fetch latest commit,
   localStorage cache, render floating toast
   ═══════════════════════════════════════════ */

const CACHE_KEY = 'gh_events';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const GITHUB_USER = 'BibiAshik';
const API_URL = `https://api.github.com/users/${GITHUB_USER}/events/public`;

function processEvents(events) {
  const pushEvent = events?.find(e => e.type === 'PushEvent');
  if (!pushEvent?.payload?.commits?.length) return null;

  const commit = pushEvent.payload.commits[0];
  const repoName = pushEvent.repo.name.split('/')[1] || pushEvent.repo.name;

  return {
    message: commit.message,
    repo: repoName,
    url: `https://github.com/${pushEvent.repo.name}`,
  };
}

function renderWidget(data) {
  const container = document.getElementById('github-widget');
  if (!container || !data) return;

  container.innerHTML = `
    <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="github-widget-inner">
      <div class="github-widget-avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
      <div class="github-widget-text">
        <span class="github-widget-label">Latest Commit &bull; ${data.repo}</span>
        <span class="github-widget-message">${data.message}</span>
      </div>
      <div class="github-widget-arrow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-h)" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </a>
  `;

  // Animate in after 2 seconds
  setTimeout(() => {
    container.classList.add('visible');
  }, 2000);
}

export async function initGithubWidget() {
  try {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data: events, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) {
        const commitData = processEvents(events);
        renderWidget(commitData);
        return;
      }
    }

    // Fetch fresh events
    const response = await fetch(API_URL);
    if (!response.ok) return;

    const events = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data: events, ts: Date.now() }));

    const commitData = processEvents(events);
    renderWidget(commitData);
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
  }
}
