---
name: riselive-site-maintenance
description: Maintain and extend the RiseLive/Rise static website in this repository. Use when Codex works on this site’s HTML/CSS/JS pages, rl-* design system, SEO metadata, microCMS Works/News rendering, Googleフォーム contact form, static hosting links, or repository-specific validation and release checks.
---

# RiseLive Site Maintenance

## Core Workflow

1. Inspect the relevant page(s), `css/style.css`, and any affected script before editing.
2. Preserve the renewed `rl-*` design system from Top/About unless the user explicitly asks for legacy styling.
3. Keep external integrations working: microCMS for Works/News, Googleフォーム for Contact, Google Analytics, `CNAME`, and `sitemap.xml`.
4. Edit only the requested scope. Top and About are design baselines; avoid touching them during lower-page work unless necessary.
5. Run the validation commands in this skill before reporting completion.

For repository details, read only the reference needed:

- `references/site-map.md`: confirmed stack, files, page roles, integrations, and unknowns.
- `references/implementation-rules.md`: design, SEO, accessibility, performance, assets, and prohibited changes.
- `references/task-recipes.md`: common workflows such as page addition, text edits, design edits, metadata updates, and build-error handling.

## Repository Snapshot

This is a static Japanese business website for Rise/RiseLive. It is built with plain HTML, CSS, and JavaScript. There is no confirmed package manager, bundler, framework, or automated deploy command in the repository.

Primary pages:

- `index.html`: renewed top page and design baseline.
- `about/index.html`: renewed About page and lower-page design baseline.
- `pricing/index.html`, `works/index.html`, `news/index.html`, `contact/index.html`: service lower pages.
- `css/style.css`: legacy styles plus renewed `rl-*` system.
- `js/main.js`: header, mobile menu, fade-in animation, Googleフォーム.
- `js/cms.js`: microCMS fetch/render logic for Works and News, demo fallbacks, News detail mode.

## Implementation Rules

- Use semantic HTML sections, clear headings, and the existing fixed header/footer structure.
- Use `rl-sub-hero`, `rl-sub-hero-grid`, `rl-sub-title`, `rl-sub-lead`, `rl-section`, `rl-section-head`, `rl-label`, `rl-section-title`, `rl-btn`, `rl-text-link`, `rl-contact-zone`, and related `rl-*` cards for renewed pages.
- Avoid inline styles and page-local `<style>` blocks. Add reusable styles to `css/style.css`.
- Preserve required dynamic anchors and IDs:
  - Works list: `#worksGrid`
  - News list: `#newsList`
  - News detail: `#newsDetail`
  - Contact form: `#contactForm`
  - Contact success panel: `#formSuccessMessage`
- Keep static Works/News fallback markup unless replacing it with equivalent fallback behavior.
- Keep Contact form `action="https://docs.google.com/forms/d/e/1FAIpQLSedXkcHGdmCRGb8t5eY68LZmTVNx4PsfoFbOQnrfdir5HZmxw/formResponse"` unless the user gives a new endpoint.
- Keep links directory-based (`../contact/`, `works/`) for published pages unless explicitly preparing a local-file-only build.
- Do not expose, rotate, or alter API keys unless the user specifically requests an integration change.

## Required Validation

From the repository root, run:

```bash
python3 skills/riselive-site-maintenance/scripts/validate_site.py
node --check js/main.js
node --check js/cms.js
```

If browser checking is possible, also open changed pages at either:

```bash
python3 -m http.server 8000
```

or direct `file://` URLs when local port binding is unavailable. Check desktop and mobile widths, the mobile menu, CMS fallback/list rendering, News detail `news/index.html?id=demo_renewal`, and Contact form wiring without submitting real inquiries.

## When Changing SEO

Update the page’s `<title>`, meta description, canonical URL, navigation active state when needed, and `sitemap.xml` if a page is added/removed or canonical paths change.

## When Unsure

Separate facts confirmed from repository files from assumptions. Do not claim build/deploy/test commands exist unless a config file or script confirms them.
