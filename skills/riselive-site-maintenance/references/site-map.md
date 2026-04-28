# RiseLive Repository Map

## Confirmed Site Purpose

Rise/RiseLive is a Japanese static website for a small web production and marketing support business. The site communicates Web production, marketing, SNS, Google Maps, ads, AI/business efficiency support, DTP, and consultation services. The current renewed tone is practical, warm, local-business-friendly, and low pressure.

## Confirmed Technology Stack

- Plain HTML pages.
- Plain CSS in `css/style.css`.
- Plain JavaScript in `js/main.js` and `js/cms.js`.
- Google Fonts: Inter and Noto Sans JP.
- microCMS client-side fetch for Works and News.
- Formspree AJAX submission for Contact.
- Google Analytics tag `G-DHMC1N46T3`.
- Static hosting indicator: `CNAME` and `sitemap.xml`.

## Not Confirmed In Repository

- No confirmed `package.json`, bundler, framework, npm scripts, CI config, deploy script, or test runner.
- No confirmed production deployment command.
- No confirmed local dev server command beyond generic static serving.
- No confirmed CMS schema document beyond what `js/cms.js` tolerates.

## Top-Level Files

- `README.md`: short project overview.
- `index.html`: Top page, renewed design baseline.
- `index2.html`, `style2.css`, `index.html.zip`: legacy/backup-looking artifacts; do not edit unless the user asks.
- `CNAME`: custom domain config.
- `sitemap.xml`: public URL list.
- `fix_links.py`: converts directory links to `index.html` links for local-file scenarios.
- `revert_links.py`: reverts `index.html` links back to directory links for published site.
- `design-handoff-pricing-works-news-contact.md`: design brief for the 2026 lower-page renewal.

## Directories

- `about/index.html`: About page, renewed lower-page design baseline.
- `pricing/index.html`: pricing and support page.
- `works/index.html`: portfolio page using `#worksGrid`.
- `news/index.html`: news list and detail container using `#newsList` and `#newsDetail`.
- `contact/index.html`: contact page using `#contactForm` and `#formSuccessMessage`.
- `css/style.css`: global reset, legacy classes, footer/header, renewed `rl-*` design system, lower-page styles.
- `js/main.js`: scroll header, mobile nav, fade-in observer, Formspree AJAX handler.
- `js/cms.js`: microCMS config, fetch helpers, Works renderer, News renderer/detail renderer, filters, pagination, demo News fallback.
- `images/`: `logo.png`, `favicon.ico`, `apple-touch-icon.png`.
- `skills/riselive-site-maintenance/`: this Codex Skill.

## Page Roles

- Top: service overview, plans summary, works/news previews, CTA.
- About: message, values, company overview.
- Pricing: pricing policy, monthly support plans, service menu, good-fit issues, flow, FAQ, CTA.
- Works: CMS-first portfolio grid with static fallback, filters, support range, CTA.
- News: CMS-first news list with static fallback, visual category pills, detail mode with `?id=...`, CTA.
- Contact: conversion page with contact options, Formspree form, reassurance, after-sending flow, company info.

## External Integrations

### microCMS

`js/cms.js` uses:

- `serviceDomain: 'riselive'`
- endpoints: `news`, `works`
- API key in client code, already present in repository

Renderer tolerance:

- Works images: `thumbnail`, `mainImage`, `image`, `img`, `eyecatch`, `workImage`, `photo`.
- Works URL fields: `url`, `link`, `website`, `siteUrl`.
- Category: object with `name`, string, or array.
- News body fields: `content` or `body`.
- Demo detail IDs: `demo_renewal`, `demo_work1`, `demo_work2`, `demo_column`, `demo_start`.

### Formspree

`contact/index.html` posts to:

```html
https://formspree.io/f/mwveldwq
```

`js/main.js` intercepts submit, sends `fetch(action, { method: 'POST', body: formData, headers: { Accept: 'application/json' } })`, hides the form, and shows `#formSuccessMessage` on success.

### Google Analytics

Every main page includes `gtag.js` for `G-DHMC1N46T3`.

## Link Conventions

Published HTML currently uses directory links:

- Root page links: `about/`, `works/`, `pricing/`, `news/`, `contact/`
- Subpage links: `../`, `../about/`, etc.

Use `fix_links.py` only for local-file link conversion when explicitly needed. Use `revert_links.py` before publishing if links were converted.
