# RiseLive Task Recipes

## Page Addition

1. Create `new-page/index.html` using an existing renewed lower page as a base.
2. Set canonical URL, title, meta description, favicon paths, stylesheet path, and scripts.
3. Add header/footer nav links only if the page should be global navigation.
4. Use `rl-sub-hero` and `rl-section` patterns.
5. Add page-specific CSS to `css/style.css`.
6. Add the URL to `sitemap.xml`.
7. Run validation and browser checks.

## Text Revision

1. Locate the exact page and section.
2. Preserve heading hierarchy and CTA tone.
3. Update only the requested text.
4. If the text appears in header/footer/common CTA, update all duplicated occurrences intentionally.
5. Run validation.

## Design Revision

1. Compare the target page with `index.html` and `about/index.html`.
2. Prefer existing `rl-*` layout/card/button/CTA classes.
3. Add or adjust CSS in `css/style.css`; avoid inline styles.
4. Check both desktop and mobile widths.
5. Verify no text overlap and no mobile menu regression.

## Component Addition

1. Decide whether an existing component fits:
   - Cards: `rl-service-card`, `rl-plan-card`, `rl-value-card`, `rl-issue-card`.
   - Flow: `rl-flow-grid`.
   - CTA: `rl-contact-zone`, `rl-contact-card`, `rl-btn`, `rl-text-link`, `rl-square-link`.
2. Add semantic HTML.
3. Add CSS only for genuinely new behavior or layout.
4. Include responsive rules for the component.

## Meta Information Change

1. Update `<title>`, meta description, and canonical URL.
2. Keep title format aligned with existing pages, e.g. `Pricing | Rise（ライズ）`.
3. Update `sitemap.xml` if page path or page set changes.
4. Validate that every public HTML page still has title, description, and canonical.

## Works Or News Update

1. Preserve `js/cms.js` fetch/render behavior and static fallback markup.
2. For Works cards, keep image fallback and URL extraction tolerance.
3. For News details, keep `?id=` detail mode and demo fallback IDs.
4. If adding filters, make sure static fallback and CMS-rendered content both behave acceptably.
5. Test list and detail modes:
   - `works/index.html`
   - `news/index.html`
   - `news/index.html?id=demo_renewal`

## Contact Form Update

1. Preserve `id="contactForm"` and `id="formSuccessMessage"`.
2. Preserve Formspree action unless the user provides a new endpoint.
3. Keep labels, input IDs, names, and required attributes aligned.
4. Check `js/main.js` still finds the submit button and success panel.
5. Do not submit a real message without action-time user confirmation.

## Build Or Validation Error Fix

This repository has no confirmed build pipeline. Treat "build error" as one of:

- JavaScript syntax error from `node --check`.
- Static validation failure from `validate_site.py`.
- Browser console error on a changed page.
- Broken local file path or public link.

Fix the reported issue directly, then rerun:

```bash
python3 skills/riselive-site-maintenance/scripts/validate_site.py
node --check js/main.js
node --check js/cms.js
```

## Release-Oriented Check

1. Confirm directory-style links are present for published pages.
2. Confirm `CNAME` remains unchanged unless domain changed.
3. Confirm `sitemap.xml` includes all public pages.
4. Open changed pages in a browser using local server if possible.
5. If local server is unavailable, use `file://` URLs and note that server-based verification was not possible.
