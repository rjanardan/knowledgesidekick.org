(() => {
  'use strict';

  // ============================================================
  // knowledgesidekick.org — shared nav builder
  // Not-for-profit: research, standards, adoption, community.
  // Same nav system as .com, different groups and tone.
  // ============================================================

  const NAV = {
    logoHref: '/',
    logoSvg: 'logo.svg',
    logoText: { name: 'Knowledge Sidekick', tag: 'Knowledge for Agentic AI' },
    groups: [
      {
        label: 'Agents',
        open: true,
        items: [
          { label: 'A2A', href: '/a2a/' },
          { label: 'Agents', href: '/agents/' },
          { label: 'MCP', href: '/mcp/' }
        ]
      },
      {
        label: 'Knowledge',
        open: true,
        items: [
          { label: 'Why Knowledge?', href: '/why-knowledge.html' },
          { label: 'Research', href: '/research.html' },
          { label: 'Standards', href: '/standards.html' },
          { label: 'Adoption', href: '/adoption.html' }
        ]
      },
      {
        label: 'Learn',
        open: true,
        items: [
          { label: 'Blogs', href: '/blogs.html' },
          { label: 'Community', href: '/community.html' },
          { label: 'Internship', href: '/internship.html' },
          { label: 'Training', href: '/training.html' },
          { label: 'Free resources', href: '/free-resources.html' }
        ]
      },
      {
        label: 'About',
        open: false,
        items: [
          { label: 'Who we are', href: '/about.html' },
          { label: 'Contact', href: '/contact.html' }
        ]
      }
    ]
  };

  const p = document.createElement('p');
  const escAttr = s => {
    if (typeof s !== 'string') return '';
    return s.replace(/[&>"']/g, ch => ({ '&': '&amp;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  };

  function navToggleHTML(group) {
    const id = 'nav-toggle-' + group.label.replace(/\s+/g, '-');
    const expanded = group.open ? 'true' : 'false';
    return `<button class="nav-toggle" id="${escAttr(id)}" aria-expanded="${expanded}" aria-haspopup="true"><span>${escAttr(group.label)}</span><span class="arrow" aria-hidden="true">▾</span></button>`;
  }

  function dropdownHTML(group) {
    const id = 'nav-dropdown-' + group.label.replace(/\s+/g, '-');
    let rows = '';
    group.items.forEach((it, i) => {
      if (i > 0 && i % 4 === 0) rows += '<div class="sep" role="presentation"></div>';
      const target = it.target || '';
      const ext = it.local === false ? ' class="nav-ext"' : '';
      const tAttr = target ? ` target="${escAttr(target)}" rel="noopener"` : '';
      rows += `<a href="${escAttr(it.href)}"${tAttr}${ext}>${escAttr(it.label)}</a>`;
    });
    return `<div class="nav-dropdown" id="${escAttr(id)}" role="menu" aria-labelledby="${escAttr('nav-toggle-' + group.label.replace(/\s+/g, '-'))}">${rows}</div>`;
  }

  function buildNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    let html = '';
    NAV.groups.forEach(g => {
      html += `<div class="nav-group">${navToggleHTML(g)}${dropdownHTML(g)}</div>`;
    });
    nav.innerHTML = html;

    const menuBtn = document.getElementById('menu-toggle');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const open = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!open));
        nav.classList.toggle('open', !open);
      });
    }
    document.querySelectorAll('.nav-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.nav-group');
        if (!group) return;
        const open = group.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  function highlightCurrent() {
    const pathname = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
    const map = new Map();
    NAV.groups.forEach(g => g.items.forEach(it => { if (it.local) map.set(it.href.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/', it.label); }));
    map.set('/', 'Home');
    document.querySelectorAll('.nav-dropdown a').forEach(a => {
      const href = (a.getAttribute('href') || '').replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
      a.classList.toggle('current', href === pathname);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { buildNav(); highlightCurrent(); });
  } else {
    buildNav();
    highlightCurrent();
  }
})();
