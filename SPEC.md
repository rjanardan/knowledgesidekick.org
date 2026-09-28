# SPEC — Knowledge Sidekick site standard

Canonical style guide for knowledgesidekick.org (and its .com twin).
Read this file before creating or editing any page, and use the QA checklist
(§15) to test that a page follows it.

## 1. Purpose and use

This is the single source of truth for how the site looks, is structured, and is
written. Every new page and every edit must conform. The QA checklist at the end
is the test every page runs.

## 2. Site variants

Two published sites share one system: knowledgesidekick.org (canonical, fuller)
and knowledgesidekick.com (a subset of pages). They differ only in accent family
and a cosmetic background tint. All rules here apply to both.

| Token | .org (canonical) | .com |
|---|---|---|
| --accent, --ks-color | #1e6f5c green | #2563eb blue |
| --accent-ink / --accent-soft | #145247 / #e6f2ef | #1a4fbd / #eaf1fb |
| --bg | #faf9f6 | #fbfaf7 |
| header chip | .org | .com |
| everything else | identical | identical |

The run of colours above is the only difference between the two style.css
files. When authoring for .com, reuse the .org page and swap these tokens and
the chip.

A third variant exists for staging: the v1 site under /v1/. It is not a style
fork of the system; it is the same system plus an enhancement layer, described
in §13 and §14.

## 3. Stack and build

- Static HTML. No framework. Served on GitHub Pages; the stylesheet is
  referenced as an absolute path (/style.css), so local preview must run over
  HTTP (python -m http.server), not file://.
- Shared chrome: _chrome_head.html (head, meta, header, opens <main>) and
  _chrome_foot.html (footer, nav.js script). Some article pages inline an
  equivalent header instead of including it; keep it byte-identical apart from
  the JSON-LD block.
- Site-wide styles live in root style.css only. CSS-level changes propagate to
  every page; do not hand-edit inline styles on pages.
- Navigation is built by nav.js from a single object at the top of the file.
  Add a new page there (one line) and keep items under their section labels.

## 4. Page anatomy (the canonical skeleton)

See standards/microsoft-graph/index.html as the reference answer sheet. Order:

1. doctype, html lang="en", head with charset + viewport
2. <title>Title — Knowledge Sidekick</title>
3. meta description (one or two plain sentences, no marketing)
4. link rel=canonical (absolute .org or .com URL)
5. og: / twitter: meta (title, description, article vs website, url, image logo.svg)
6. JSON-LD: WebPage (or FAQPage with mainEntity for the FAQ) in type application/ld+json
7. <body class="page-...">, skip link, site-header with .chip
8. optional .tagband > .wk headline (interior pages)
9. <main id="main"> > section.hero > .wrap > .kicker, h1, p.lede, p.meta
10. div.page > div.wrap > content sections
11. sections in order: What it is, What it gives, Where it is documented, then
    page-specific sections, optional What connects here figure, FAQ, Sources
12. closing wrap/page, then .wrap > p.src-line (provenance), </main>, footer
13. FAQ toggle <script> at end of body

## 5. Chromatic system

Colours come from CSS custom properties on :root only. Never hardcode hex in a
page. The green accent (org) / blue accent (com) is the only variant.

## 6. Typography and spacing (compact model — do not regress)

Base: body 15px, line-height 1.6; headings line-height 1.25, weight 650.

| Element | Size | Margin |
|---|---|---|
| h1 | clamp(22px, 3vw, 30px) | 0 0 14px |
| h2 | clamp(18px, 2.4vw, 23px) | 18px 0 12px |
| h3 | 17px | 14px 0 8px |
| p | 15px | 0 0 14px |
| pre | — | 0 0 16px |
| li | — | 0 0 6px |

Container rules: .wrap max-width 1140px, padding 0 24px. .page padding 14px 0
24px. section scroll-margin-top 84px. .hero padding 50px 0 16px, its .wrap grid
gap 16px, h1 max-width 30ch, .meta font-size 13.5px with flex gap 18px. .faq h2
20px. The FAQ block is compact: .faq-section margin-top 18px, its h2 margin-bottom
10px, .faq .q padding 12px 18px, and .faq .a padding 4px 18px 6px with line-height
1.55. Answer paragraphs inside .faq .a have margin 0 so there is no extra blank
space after the text. .foot-note max-width 100ch 12.5px/1.55. .src-line 12.5px.
.sources 12.5px, its h2 13px uppercase with letterspacing.

The vertical rhythm rule: heading spacing is explicit and uniform (h2 top 18px,
h3 top 14px), NOT the browser default and NOT ad-hoc per-section values. Do not
add per-component top margins that break the 18/14 rhythm. The .faq-section
border sits at margin-top 18px; .sources at 32px (its deliberate labelled block).

## 7. Voice and editorial rules

- First-person, direct, plain. No marketing voice and no AI-slop phrasing.
- The site is for education and reference, not marketing. No hype, no
  sensational pull messages, no attention-grabbing false claims.
- Claims should be research-backed and data-backed where possible, with primary
  sources cited.
- Headings never end with a period.
- No em dashes, en dashes, or tildes anywhere (use commas, colons, or spaced
  hyphens where a range reads naturally).
- Restrained prose; state the finding plainly. Never use filler like
  "not merely rank it".
- Terminology is normative: "concept scheme" (a SKOS/vocabulary sense, an
  organised set of concepts), never "concept schema" unless a data shape for
  validation is meant. "infrastructure management software", not "manageability".
- Keep the provenance line as "Page updated <date>." one sentence, no trailing
  decoration; the date matches the <time> element and JSON-LD dateModified.

## 8. Components

Documented set: hero (.kicker, h1, .lede, .meta breadcrumb); content section
(id-ed h2 body); .faq-section > .faq > .q/.a accordion (role=button,
aria-expanded, toggle script at page end); .sources (ol of cited links, one line
each); figures (.ks-figure > .fig-scroll > svg.kg with <title>+<desc> and a
figcaption); .callout; .challenge; .scene; .pattern; .bio-card; .blog-card;
.limits list. Use these classes; do not invent new ones without adding them to
style.css and this file.

## 9. Page types and routes

Landing: index.html (hero: title, lede, meta "Contact · knowledgesidekick.com").
Hubs: standards/, research/, learn/, phd, a2a/, agents/, mcp/, map/, knowledge/.
A standards topic is a folder standards/<topic>/index.html (e.g. microsoft-graph,
skos). Add routes to nav.js, map/index.html, and any related hub.

## 10. Metadata and a11y

- Every page: canonical, description, og/twitter, JSON-LD, robots follow.
- Skip link to #main; FAQ rows are keyboard-activable (Enter/Space); the toggle
  updates aria-expanded. Keep colour contrast within the token palette. Figures
  carry <title> and <desc> for assistive tech.

## 11. Figures

Graphs are inline SVG (class kg) with a <title>, <desc>, letter-role legend
(T/I/O/B) and a figcaption. Reuse the existing auto-count sentence pattern; do
not paste decorative or unrelated imagery.

## 12. Change workflow

1. Changes are proposed in the chat and diffs shown first.
2. Files are written to the local working tree only after the user says
   "update local".
3. After a batch, a LOCAL commit is suggested; no push happens on its own.
4. Remind the user to PUSH after 3 to 5 accumulated changes. Nothing reaches the
   live site until the user pushes.

For v1 work the pipeline has three areas and nothing skips a stage:

1. Dev. Experiments live in ~/.hermes/cache/scratch/ks-dev/, served at
   http://localhost:8091 with the repo mirrored by symlinks so internal links
   resolve. The repo is not touched.
2. Staging. Dev files are copied to v1/ in the repo and verified over
   http://localhost:8080. The user reviews the staged site, then a local commit
   is made.
3. Production. A push to GitHub Pages publishes
   https://knowledgesidekick.org/v1/.

Commits and pushes happen only on explicit user instruction.

## 13. The v1 staging site

knowledgesidekick.org/v1/ is a staged copy of the landing page carrying the
enhancements of §14. It is self-contained: v1/index.html plus its own copies of
style.css, nav.js, logo.svg, and favicon.svg. The copies diverge from the root
files only through the appended v1 enhancement layer; editing v1 never touches
root site files.

Rules:
- Asset links inside v1 are relative (style.css, nav.js, favicon.svg), so the
  folder works whatever path it is served from.
- canonical and og:url point at https://knowledgesidekick.org/v1/; the title
  ends with "v1 preview" and the header chip reads ".org · v1".
- Content links point at the live root pages. v1 is a new front door, not a
  fork of the site.
- §6, §7, §10, and §11 apply unchanged. The enhancement layer may restyle and
  reorder presentation; it may not enlarge the type scale, add claims, or use
  colours outside the :root tokens.

## 14. v1 enhancement inventory

As of the site-wide promotion, the enhancement layer in style.css (root and v1
copies are identical) and the behaviour in /site.js ship on every .org page,
not only the landing page. The landing page additionally carries the
pathfinder, the site-graph hover card, the pull stats, and the next-read chain;
interior pages get the reveal, wayfinding, hero treatment, nav rework, and
pills. Wayfinding builds itself from each page's own sections and headings
(pages with fewer than four labelled sections get no rail or chip bar, which
is the original design). Everything stays progressive: with JS disabled every
page reads as a complete document. All motion is switched off under
prefers-reduced-motion. No tracking, no storage, no framework.

| Item | Adds | Behaviour notes |
|---|---|---|
| Pathfinder section | "Start here" under the hero: three tabs, planning / building / live and failing, each a three-step reading path to existing pages | ARIA tablist with arrow-key support; no JS: panels stack in full |
| Graph interaction | Hover, keyboard focus, or tap on a hub node dims unrelated links and fills a preview card below the figure | Touch: first tap selects, second tap or the card opens the page; card text copies the target page's own opening sentence |
| Pull stats section | Four benchmark cards (grounding, reliability, spend recovery, memory scoring), each linked to its arXiv source | Numbers repeat citations already on the page; the section states plainly that these are benchmarks |
| In-page wayfinding | After the Start-here section passes: a left rail at viewports 1520px and above, a sticky chip bar under the header below that | Built from the section ids present in the DOM; chips are plain anchors; the strip re-centres only when the active section changes, never mid-pan or right after a tap |
| Next-read chain | Closing section with three exits and one-line reasons, mirroring the pathfinder paths | Static links |
| Hero treatment | At 900px and above a two-column hero (kicker and heading left, lede and contact pills right, top aligned) over a faint dot grid | §6 sizes and spacing unchanged; below 900px the hero is the original stack |
| Hubs list for small screens | Below 700px the pannable graph figure is hidden and the same ten hubs appear as a numbered list ranked by links received inside the figure | The list stays in the DOM at every width, so agent readers always get it |

In dev, not yet staged: trail figures inside the pathfinder tabs, the fourth
reader path ("You are publishing", the AEO path: llms.txt, agent interface,
free resources), and the tab-to-accordion swap below 700px (accordion mode is
the site's §8 disclosure pattern with §11 role-colour badges).

Breakpoints introduced by this layer: 700px (hubs list versus figure), 900px
(two-column hero), 1520px (rail versus chip bar). All are viewport widths;
none alter the root site.

## 15. QA / conformance checklist

Run this before calling a page done:

- [ ] Starts with the skeleton in §4; body class, skip link, chip present.
- [ ] style.css is the only stylesheet; no inline styles or new hardcoded hex.
- [ ] Heading margins obey the §6 rhythm (h2 18px, h3 14px top); nothing floats.
- [ ] No closing-period headings; no em/en dashes or tildes in text.
- [ ] Voice is first-person, plain, no AI-slop or marketing filler.
- [ ] "concept scheme" spelled correctly and used in its normative sense.
- [ ] canonical/description/og/JSON-LD present and matching the page.
- [ ] FAQ rows accessible and toggle script present if a FAQ exists.
- [ ] Provenance line "Page updated <date>." matches <time> and dateModified.
- [ ] Sources are real, cited, reachable links; the figure has title/desc/caption.
- [ ] Renders with a hard refresh (Ctrl+Shift+R); spacing compact at 1140px and
      on a narrow window. No layout regressions in landscape or on a phone.

v1 pages additionally:
- [ ] Enhancement classes exist only in v1/style.css; root style.css and
      nav.js untouched.
- [ ] Page reads correctly with JavaScript disabled.
- [ ] Every new interaction has a touch path and honours reduced motion.