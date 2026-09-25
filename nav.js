(() => {
  'use strict';

  // ============================================================
  // knowledgesidekick.org — shared nav builder
  // Six top-level items: Knowledge, Research, Standards, Adoption,
  // Learn (dropdowns) and Contact (plain link).
  // Long groups carry .grp-label subheadings; an entry with only a
  // `sub` key renders as a heading, not a link.
  // ============================================================

  const NAV = {
    logoHref: '/',
    logoSvg: 'logo.svg',
    logoText: { name: 'Knowledge Sidekick', tag: 'Knowledge Engineering for the AI-Native Organisation' },
    groups: [
      {
        label: 'Knowledge',
        open: false,
        items: [
          { label: 'Why knowledge?', href: '/why-knowledge.html' },
          { label: 'DIKW', href: '/knowledge/dikw/' },
          { label: 'Context engineering', href: '/context-engineering.html' },
          { label: 'Knowledge bundles', href: '/knowledge/knowledge-bundles/' },
          { label: 'Knowledge formats', href: '/knowledge/knowledge-formats/' },
          { label: 'Taxonomies', href: '/knowledge/taxonomies/' },
          { label: 'Ontologies', href: '/knowledge/ontologies/' },
          { label: 'Knowledge graphs', href: '/knowledge/knowledge-graphs/' }
        ]
      },
      {
        label: 'Research',
        open: false,
        items: [
          { label: 'Research at a glance', href: '/research.html' },
          { sub: 'Agent systems' },
          { label: 'AI agents', href: '/agents/' },
          { label: 'A2A communication', href: '/a2a/' },
          { label: 'MCP', href: '/mcp/' },
          { sub: 'Knowledge at work' },
          { label: 'Enterprise knowledge', href: '/enterprise.html' },
          { label: 'Memory', href: '/research/memory/' },
          { label: 'Personal assistants', href: '/personal-assistant.html' },
          { label: 'Context engineering', href: '/context-engineering.html' },
          { sub: 'Frontier' },
          { label: 'Agentic AI', href: '/research/agentic-ai/' },
          { label: 'Semantic communication', href: '/research/semcom/' },
          { label: 'World models', href: '/research/world-models/' }
        ]
      },
      {
        label: 'Standards',
        open: false,
        items: [
          { label: 'Standards at a glance', href: '/standards.html' },
          { sub: 'Discovery' },
          { label: 'llms.txt', href: '/standards/llms-txt/' },
          { sub: 'Knowledge organization' },
          { label: 'W3C SKOS', href: '/standards/skos/' },
          { label: 'ISO 25964', href: '/standards/iso-25964/' },
          { sub: 'Data model' },
          { label: 'RDF', href: '/standards/rdf/' },
          { label: 'RDFS', href: '/standards/rdfs/' },
          { label: 'OWL', href: '/standards/owl/' },
          { sub: 'Serialisation' },
          { label: 'Turtle', href: '/standards/turtle/' },
          { label: 'JSON-LD', href: '/standards/json-ld/' },
          { label: 'HDT', href: '/standards/hdt/' },
          { sub: 'Query' },
          { label: 'SPARQL', href: '/standards/sparql/' },
          { label: 'GraphQL-LD', href: '/standards/graphql-ld/' },
          { sub: 'Provenance and persistence' },
          { label: 'PROV-O', href: '/standards/prov-o/' },
          { label: 'Mementos (RFC 7089)', href: '/standards/mementos/' },
          { sub: 'Commercial and proprietary' },
          { label: 'Parquet', href: '/standards/parquet/' },
          { label: 'Delta Lake', href: '/standards/delta-lake/' },
          { label: 'Iceberg', href: '/standards/iceberg/' },
          { label: 'Snowflake', href: '/standards/snowflake/' },
          { label: 'Databricks', href: '/standards/databricks/' },
          { label: 'Palantir', href: '/standards/palantir/' },
          { label: 'ServiceNow', href: '/standards/servicenow/' },
          { label: 'Salesforce', href: '/standards/salesforce/' },
          { label: 'Microsoft Graph', href: '/standards/microsoft-graph/' },
          { label: 'Neo4j', href: '/standards/neo4j/' }
        ]
      },
      {
        label: 'Adoption',
        open: false,
        items: [
          { label: 'Adoption at a glance', href: '/adoption.html' },
          { sub: 'Start here' },
          { label: 'llms.txt', href: '/standards/llms-txt/' },
          { label: 'A2A communication', href: '/a2a/' },
          { sub: 'Evidence' },
          { label: 'Companies ahead in the game', href: '/adoption/companies-ahead/' }
        ]
      },
      {
        label: 'Learn',
        open: false,
        items: [
          { label: 'Blogs', href: '/blogs.html' },
          { label: 'Glossary', href: '/learn/glossary/' },
          { label: 'Token savings', href: '/token-savings.html' },
          { label: 'Internship', href: '/internship.html' },
          { label: 'Training', href: '/training.html' },
          { label: 'Courses', href: '/learn/courses/' },
          { label: 'Free resources', href: '/free-resources.html' },
          { label: 'About', href: '/about.html' }
        ]
      },
      { label: 'Contact', href: '/contact.html', plain: true, local: true }
    ]
  };

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
    group.items.forEach(it => {
      // a heading, not a link
      if (it.sub) {
        rows += `<div class="grp-label" role="presentation">${escAttr(it.sub)}</div>`;
        return;
      }
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
      if (g.plain) {
        html += `<a class="nav-link" href="${escAttr(g.href)}">${escAttr(g.label)}</a>`;
        return;
      }
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
    document.querySelectorAll('.nav-dropdown a, .nav-link').forEach(a => {
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
