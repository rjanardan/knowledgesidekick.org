# agents.md — machine index for agent frameworks and crawlers
# knowledgesidekick.org — open, not-for-profit.
# Companion to llms.txt. Preferred entry for agent-side indexing.

site:
  name: Knowledge Sidekick
  url: https://knowledgesidekick.org/
  description: >
    Open, not-for-profit site about knowledge as a first-class layer in agentic AI,
    LLMs, and personal assistants. Research, open standards, and adoption practice.
  canonical: https://knowledgesidekick.org/
  language: en
  charset: utf-8

identity:
  author:
    name: Janardan Revuru
    url: https://knowledgesidekick.org/about.html
    sameAs:
      - https://janalogy.com
      - https://www.linkedin.com/in/rjanardan
      - https://meetup.com/darling-meetup
  email: mailto:janardan.revuru@gmail.com
  businessSide:
    name: Knowledge Sidekick (business)
    url: https://knowledgesidekick.com

sections:
  home: https://knowledgesidekick.org/
  whyKnowledge: https://knowledgesidekick.org/why-knowledge.html
  research: https://knowledgesidekick.org/research.html
  standards: https://knowledgesidekick.org/standards.html
  adoption: https://knowledgesidekick.org/adoption.html
  blogs: https://knowledgesidekick.org/blogs.html
  community: https://knowledgesidekick.org/community.html
  internship: https://knowledgesidekick.org/internship.html
  training: https://knowledgesidekick.org/training.html
  freeResources: https://knowledgesidekick.org/free-resources.html
  about: https://knowledgesidekick.org/about.html
  contact: https://knowledgesidekick.org/contact.html

agentPages:
  a2a: https://knowledgesidekick.org/a2a/
  agents: https://knowledgesidekick.org/agents/
  mcp: https://knowledgesidekick.org/mcp/
  llmsTxt: https://knowledgesidekick.org/llms.txt
  agentsMd: https://knowledgesidekick.org/agents.md

research:
  flagship: https://knowledgesidekick.org/why-knowledge.html
  enterprise: https://knowledgesidekick.org/enterprise.html
  personalAssistant: https://knowledgesidekick.org/personal-assistant.html
  contextEngineering: https://knowledgesidekick.org/context-engineering.html
  tokenSavings: https://knowledgesidekick.org/token-savings.html

blogs:
  - date: 2026-09-22
    title: Why knowledge fails first in agentic systems
    url: https://knowledgesidekick.org/blogs/2026-09-22-why-knowledge-fails-first.html
    topic: why-knowledge
    tags: [knowledge, agentic-ai, grounding, deprecation]
  - date: 2026-09-18
    title: Context is not a bucket — it is a delivery problem
    url: https://knowledgesidekick.org/blogs/2026-09-18-context-is-not-a-bucket.html
    topic: context-engineering
    tags: [context, delivery, token-cost, agentic-ai]
  - date: 2026-09-14
    title: Grounding is the flip side of token savings
    url: https://knowledgesidekick.org/blogs/2026-09-14-grounding-is-the-flip-side-of-savings.html
    topic: token-savings
    tags: [grounding, token-savings, trust, cost]
  - date: 2026-09-10
    title: What enterprise agents actually need from knowledge
    url: https://knowledgesidekick.org/blogs/2026-09-10-what-enterprise-agents-actually-need.html
    topic: enterprise
    tags: [enterprise, knowledge, currentness, ownership, grounding]

topics:
  knowledge: >
    Knowledge as a first-class layer in agentic systems: what is true, what is current,
    what is owned, what is permitted, what to do when the system does not know.
  representation: >
    How knowledge is shaped so agents can use it: entities, facts, procedures, policies,
    relationships; consistent enough to trust.
  lifecycle: >
    Creation, representation, extraction, updates, deprecation. The disciplines that keep
    knowledge current and governable.
  grounding: >
    Tying an agent's claims and actions to retrievable, current, permitted knowledge.
  context: >
    Context windows as a knowledge-delivery problem. Delivery surface, not storage surface.
  tokenSavings: >
    Where token cost really comes from in agentic systems: moving the wrong knowledge,
    re-reading it, re-deriving its shape.
  enterprise: >
    Knowledge at organizational scale: scatter, staleness, ownership. The hard part is
    assembly and governance, not ignorance.
  personalAssistant: >
    Knowledge at human scale: privacy, control, DPDP (India), GDPR (EU). Memory is useful;
    memory without control is a liability.
  a2a: >
    Agent-to-agent communication: how agents negotiate, share, and verify knowledge with
    other agents; standards and conventions.
  agents: >
    Knowledge layer for agentic systems: forms, lifecycle, grounding, and the disciplines
    an agent needs to act dependably.
  mcp: >
    Knowledge as a Model Context Protocol resource: knowledge servers, tool-backed knowledge,
    and the role of MCP in exposing knowledge to agents.

conventions:
  representation:
    status: draft
    url: https://knowledgesidekick.org/standards.html
  lifecycle:
    status: draft
    url: https://knowledgesidekick.org/standards.html
  grounding:
    status: draft
    url: https://knowledgesidekick.org/standards.html
  agentInterface:
    status: draft
    url: https://knowledgesidekick.org/standards.html
  discoverability:
    status: draft
    url: https://knowledgesidekick.org/free-resources.html

formats:
  llmsTxt: https://knowledgesidekick.org/llms.txt
  agentsMd: https://knowledgesidekick.org/agents.md
  sitemap: https://knowledgesidekick.org/sitemap.xml
  robots: https://knowledgesidekick.org/robots.txt

updatePolicy:
  blogs: chronological, newest first; added as the field moves
  research: short, self-contained position pieces; updated as the argument sharpens
  standards: working drafts, refined through adoption
  site: intentionally small and flat; grown only when a page earns its place
