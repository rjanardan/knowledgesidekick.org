/* Knowledge Sidekick site-wide enhancement behaviour.
   Progressive: without this file every page remains the original document.
   Section reveal, on-page wayfinding (left rail at 1520px+, sticky chip bar
   below; built from each page's own sections and headings), the landing
   page's pathfinder tabs, and the landing page's site-graph hover card.
   No storage, no tracking; prefers-reduced-motion honoured in site.css. */

(() => {
  'use strict';
  const els = document.querySelectorAll('#main section');
  if (!('IntersectionObserver' in window)) return;
  els.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
})();

(() => {
  'use strict';
  // v1 Option D: on-page wayfinding. Wide screens get a left rail; below 1520px
  // the same list becomes a sticky chip bar under the header. Built by JS from
  // the sections present in the DOM; without JS there is no TOC and no loss.
  // Generic: any page with four or more labelled sections gets wayfinding.
  // Labels come from each section's own first heading, shortened, never invented.
  const short = (txt, n) => {
    txt = txt.replace(/\s+/g, ' ').trim();
    if (txt.length <= n) return txt;
    const cut = txt.slice(0, n + 1);
    const sp = cut.lastIndexOf(' ');
    return (sp > n * 0.6 ? cut.slice(0, sp) : cut).replace(/[,;:.\u2014-]+$/, '') + '\u2026';
  };
  const seen = Object.create(null);
  const items = Array.prototype.slice.call(document.querySelectorAll('#main section[id]'))
    .filter(s => !s.classList.contains('hero'))
    .map(s => {
      const h = s.querySelector('h2, h3');
      if (!h) return null;
      const label = short(h.textContent, 26);
      if (seen[s.id] || label.length < 2) return null;
      seen[s.id] = 1;
      return {id: s.id, label, el: s};
    })
    .filter(Boolean);
  if (items.length < 4) return;

  const mk = (cls, where) => {
    const nav = document.createElement('nav');
    nav.className = cls;
    nav.setAttribute('aria-label','On this page');
    nav.innerHTML = '<ul>' + items.map(i =>
      '<li><a href="#' + i.id + '">' + i.label + '</a></li>').join('') + '</ul>';
    where(nav);
    return Array.from(nav.querySelectorAll('a'));
  };
  // rail: fixed, appended last (position is out of flow anyway).
  // bar: sticky, so it must sit in flow before <main>, after the header.
  const main = document.getElementById('main');
  const links = [
    ...mk('ks-toc-rail', n => document.body.appendChild(n)),
    ...mk('ks-toc-bar', n => main.parentNode.insertBefore(n, main))
  ];

  const header = document.querySelector('.site-header');
  const setH = () => document.documentElement.style.setProperty('--ks-h', (header.offsetHeight || 64) + 'px');
  setH(); addEventListener('resize', setH);

  let ticking = false;
  let lastActive = null, suppressUntil = 0, lastPan = 0;
  const centerChip = (bar, on) => {
    // ul.scrollTo only ever moves the strip itself. scrollIntoView was the bug:
    // on WebKit it can also scroll the page, which hijacked anchor jumps.
    const ul = bar.querySelector('ul');
    const target = ul.scrollLeft + (on.getBoundingClientRect().left - ul.getBoundingClientRect().left)
                   - (ul.clientWidth - on.offsetWidth) / 2;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    ul.scrollTo({left: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth'});
  };
  const spy = () => {
    ticking = false;
    const bar = document.querySelector('.ks-toc-bar');
    const y = (header ? header.offsetHeight : 64) + (bar ? bar.offsetHeight + 8 : 0) + 4;
    let active = items[0].id;
    for (const i of items) {
      if (i.el.getBoundingClientRect().top <= y) active = i.id;
    }
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + active;
      a.classList.toggle('ks-on', on);
      if (on) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current');
    });
    const intro = document.getElementById('start-here') || document.querySelector('#main .hero');
    const past = intro ? intro.getBoundingClientRect().top < (window.innerHeight * 0.6) : true;
    document.body.classList.toggle('ks-wayfind', past);
    if (bar) {
      // Re-centre the strip ONLY when the active section changes, never on
      // every scroll tick, never after a tap (suppressUntil), and never while
      // the reader is mid-pan (lastPan). The strip answers section changes, not
      // every pixel of scroll: that re-centre-every-tick was the gravity.
      if (active !== lastActive) {
        lastActive = active;
        const now = Date.now();
        if (!matchMedia('(min-width:1520px)').matches && now > suppressUntil && now > lastPan + 900) {
          const on = bar.querySelector('a.ks-on');
          if (on) centerChip(bar, on);
        }
      }
      updateFades(bar);
    }
  };
  const updateFades = (bar) => {
    const ul = bar.querySelector('ul');
    bar.classList.toggle('ks-fade-l', ul.scrollLeft > 4);
    bar.classList.toggle('ks-fade-r', ul.scrollLeft < ul.scrollWidth - ul.clientWidth - 4);
    // keep the anchor-jump offset honest: header + current bar height
    document.documentElement.style.setProperty('--ks-barh', bar.offsetHeight + 'px');
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, {passive:true});
  const barUl = document.querySelector('.ks-toc-bar ul');
  if (barUl) barUl.addEventListener('scroll', () => {
    lastPan = Date.now();
    const b = document.querySelector('.ks-toc-bar');
    if (b) updateFades(b);   // fades only; no re-centring, no spy
  }, {passive:true});
  // a chip tap means the reader chose: let the page jump stand, and do not
  // re-centre the strip through the jump's scroll animation
  links.filter(a => a.closest('.ks-toc-bar')).forEach(a => {
    a.addEventListener('pointerdown', () => { suppressUntil = Date.now() + 1500; });
  });
  spy();
})();

(() => {
  'use strict';
  // v1 pathfinder tabs: click or arrow keys, ARIA-selected state, no storage.
  const tabs = Array.from(document.querySelectorAll('.pf-tab'));
  if (!tabs.length) return;
  const panels = id => document.getElementById('pf-panel-' + id.split('-').pop());
  const select = (tab, focus) => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const p = panels(t.id);
      if (p) p.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      // accordion mode (< 700px): tapping the open row closes it, like the FAQ.
      if (t.getAttribute('aria-selected') === 'true' &&
          window.matchMedia('(max-width:699px)').matches) {
        t.setAttribute('aria-selected', 'false');
        const pn = panels(t.id);
        if (pn) pn.hidden = true;
        return;
      }
      select(t);
    });
    t.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const d = e.key === 'ArrowRight' ? 1 : -1;
        select(tabs[(i + d + tabs.length) % tabs.length], true);
      }
    });
  });
})();

(() => {
  'use strict';
  // v1 Option B: site-graph hover/focus interaction.
  // Highlights the touched edges, dims the rest, shows a one-line preview.
  // Nodes stay real links; without JS the figure is exactly as before.
  const META = {"n0": ["Standards", "/standards.html", "Open standards and conventions for knowledge representation, lifecycle, grounding, the agent interface, and the discoverability layer that lets agent engines find and use knowledge reliably."], "n1": ["Research", "/research.html", "Short, self-contained position pieces on why knowledge is a cross-cutting layer in agentic systems, why it tends to fail first, and what it means to engineer for it."], "n2": ["A2A", "/a2a/", "How agents negotiate, share, and verify knowledge with other agents, and the knowledge layer an agent needs before it can talk to another agent without lying, leaking, or guessing."], "n3": ["Adoption", "/adoption.html", "How teams actually put knowledge-first practice into place: maturity evaluation, lifecycle adoption, knowledge audits and benchmarks, advisory, and training."], "n4": ["Agents", "/agents/", "What an agentic system needs from knowledge to act dependably: the forms knowledge takes, the lifecycle that keeps it current, the grounding that makes action auditable."], "n5": ["MCP", "/mcp/", "How knowledge is exposed to agents through MCP: knowledge servers, tool-backed knowledge, and making the knowledge layer discoverable and dependable rather than just visible."], "n6": ["Why Knowledge", "/why-knowledge.html", "An agent is only as dependable as the knowledge it can rely on. This page explains why knowledge fails first and what it means to design for it rather than bolt it on."], "n7": ["Context Engineering", "/context-engineering.html", "A context window is not a brain. It is a delivery mechanism for the right knowledge at the right moment, treated as something you design for."], "n8": ["Ontologies", "/knowledge/ontologies/", "A formal specification of the concepts and relations in a domain, written so a machine can reason over them. It buys inference and consistency, and costs the discipline of formal modelling."], "n9": ["Taxonomies", "/knowledge/taxonomies/", "A controlled vocabulary arranged into a hierarchy, and the cheapest structure that makes an agent\u2019s knowledge navigable. Keeping labels, identifiers and aliases stable is the hard part."]};
  const fig = document.querySelector('figure[data-fig="home-hubs"]');
  if (!fig) return;
  const svg = fig.querySelector('svg.kg');
  const edges = Array.from(svg.querySelectorAll('line[data-from]'));
  const nodes = Array.from(svg.querySelectorAll('a.n'));
  const card = fig.querySelector('.kg-preview');
  const cardTitle = card.querySelector('.kgp-title');
  const cardLede = card.querySelector('.kgp-lede');

  const neighboursOf = id => {
    const set = new Set([id]);
    edges.forEach(l => {
      if (l.dataset.from === id) set.add(l.dataset.to);
      if (l.dataset.to === id) set.add(l.dataset.from);
    });
    return set;
  };

  const focusNode = id => {
    const keep = neighboursOf(id);
    svg.classList.add('kg-active');
    nodes.forEach(a => a.classList.toggle('kg-dim', !keep.has(a.dataset.id)));
    nodes.forEach(a => a.classList.toggle('kg-hl', a.dataset.id === id));
    edges.forEach(l => {
      const on = l.dataset.from === id || l.dataset.to === id;
      l.classList.toggle('kg-hl', on);
      l.classList.toggle('kg-dim', !on);
    });
    const m = META[id];
    if (m) {
      cardTitle.textContent = m[0];
      cardTitle.href = m[1];
      cardLede.textContent = m[2];
      card.hidden = false;
    }
  };
  const clear = () => {
    svg.classList.remove('kg-active');
    nodes.forEach(a => a.classList.remove('kg-dim','kg-hl'));
    edges.forEach(l => l.classList.remove('kg-dim','kg-hl'));
    card.hidden = true;
  };

  nodes.forEach(a => {
    a.addEventListener('mouseenter', () => focusNode(a.dataset.id));
    a.addEventListener('focus', () => focusNode(a.dataset.id));
    a.addEventListener('mouseleave', clear);
    a.addEventListener('blur', clear);
    // touch devices have no hover: first tap selects and shows the card,
    // tapping the selected node again (or the card) follows the link.
    a.addEventListener('click', e => {
      if (!matchMedia('(hover: none)').matches) return;
      if (a.classList.contains('kg-hl')) { clear(); return; } // second tap: navigate
      e.preventDefault();
      focusNode(a.dataset.id);
    });
  });
})();
