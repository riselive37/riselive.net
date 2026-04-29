# RiseLive Implementation Rules

## Design System

- Treat `index.html` and `about/index.html` as the visual baseline.
- Prefer renewed `rl-*` classes over legacy centered `.section-title` lower-page patterns.
- Use large English section titles with short Japanese labels:
  - `.rl-label` or `.rl-eyebrow`
  - `.rl-section-title`
  - `.rl-sub-title`
- Keep the tone warm, practical, and low pressure:
  - "内容が固まっていなくても大丈夫"
  - "まずは相談"
  - "現状整理から"
- Keep colors from `:root` `--rl-*`: navy, blue, sky, pink, pink-soft, mint, yellow, ink, muted, line.
- Use CSS-based abstract visual motifs for lower-page hero visuals unless the user requests real imagery.

## HTML Structure

Use this architecture for renewed lower pages:

1. Header
2. `rl-sub-hero`
3. Page-specific core sections
4. Cross-link section where useful
5. `rl-contact-zone`
6. Footer

Keep header and footer structure consistent across pages. Update the active nav link for the current page.

## CSS Rules

- Add new reusable styles to `css/style.css`.
- Do not add inline `style` attributes or page-local `<style>` blocks.
- Prefer extending `rl-*` classes over creating unrelated one-off systems.
- Keep responsive rules near the related feature or in the existing media-query section.
- Avoid card-in-card layouts and large decorative-only blobs/orbs.
- Ensure mobile text does not overflow buttons, cards, or hero visuals.

## SEO Rules

Each public page should have:

- One canonical URL matching `https://www.riselive.net/.../`
- A concise `<title>`
- A page-specific meta description
- Correct relative asset paths
- Correct active navigation state

When adding/removing pages:

- Update header/footer links on all public pages if navigation changes.
- Update `sitemap.xml`.
- Consider whether a CMS detail route needs canonical handling. Current News details are client-rendered under `/news/?id=...`; no per-detail canonical logic is confirmed.

## Accessibility Rules

- Use one `<h1>` per page.
- Preserve meaningful heading order.
- Give logo images descriptive alt text: `Rise（ライズ）`.
- Mark decorative visual motifs with `aria-hidden="true"`.
- Use `aria-label` for icon-only links such as `rl-square-link`.
- Use real `<button type="button">` for filters.
- Keep form labels associated with inputs via `for`/`id`.
- Keep required fields marked in HTML with `required`, not visual markers only.

## Performance Rules

- Keep the site static and lightweight.
- Use `defer` on local scripts.
- Use lazy loading for CMS-rendered images; `js/cms.js` already sets `loading="lazy"` for Works images.
- Avoid adding large unoptimized assets.
- If adding images, compress them and use dimensions/aspect-ratio-friendly CSS.
- Avoid heavy JS dependencies unless the user explicitly approves a stack change.

## Images And Assets

- Existing assets are in `images/`.
- Use relative paths:
  - root page: `images/...`
  - subpages: `../images/...`
- Keep favicons and apple touch icon references on public pages.
- If adding new images, choose descriptive lowercase filenames and update references consistently.

## External Integration Rules

### microCMS

- Preserve `#worksGrid`, `#newsList`, and `#newsDetail`.
- Preserve static fallback content unless replacing it with equivalent fallback behavior.
- Preserve tolerant field handling for Works images, URLs, and category formats.
- Do not remove demo News fallback IDs; they are useful for local detail checks.
- Do not log sensitive CMS values or rotate keys unless the user asks.

### Googleフォーム

- Preserve `#contactForm`, `#formSuccessMessage`, method `POST`, and the current Googleフォーム action unless the user provides a replacement.
- Do not submit real form inquiries during QA without explicit user confirmation.
- Verify form wiring by checking DOM attributes and JS behavior, not by sending test messages to Googleフォーム unless approved.

## Prohibited Changes

- Do not replace the static site with a framework without explicit user approval.
- Do not delete or rewrite CMS fallback content without preserving fallback behavior.
- Do not remove Google Analytics, Googleフォーム, microCMS, `CNAME`, or `sitemap.xml` unless asked.
- Do not run `fix_links.py` or `revert_links.py` as a casual formatting step; they rewrite all HTML links.
- Do not revert user changes in a dirty worktree.
- Do not touch legacy/backup files (`index2.html`, `style2.css`, `index.html.zip`) unless the user specifically scopes them in.
