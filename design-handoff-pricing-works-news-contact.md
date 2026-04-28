# Rise site renewal: Pricing / Works / News / Contact design handoff

Date: 2026-04-28
Scope: design phase only. Top page and About page are already renewed. The next UI design thread should use this document as the page design brief.

## 1. Existing Tone And Component Direction

The renewed pages use a warmer, practical B2B tone: "regional work", "Web and AI", "organize thoughts", "build together", and "not just launch and leave".

Keep these visual/UX conventions:

- Use the new `rl-*` design language from Top/About, not the older centered `section-title` style.
- Use large English page headings with short Japanese labels: `Pricing`, `Works`, `News`, `Contact`.
- Keep colors from the new system: navy, magenta, sky, mint, yellow, white.
- Keep typography bold but friendly. Avoid overly corporate/agency-heavy wording.
- Use sections with clear business purpose, not decorative filler.
- CTA tone should be low-pressure: "内容が固まっていなくても大丈夫", "まずは相談", "現状整理から".
- The page should feel useful to a local business owner who may not know what to ask for yet.

Existing reusable patterns:

- Sub page hero: `.rl-sub-hero`, `.rl-sub-hero-grid`, `.rl-sub-title`, `.rl-sub-lead`
- Section header: `.rl-section`, `.rl-section-head`, `.rl-label`, `.rl-section-title`
- Cards: `.rl-service-card`, `.rl-plan-card`, `.rl-value-card`
- Flow grid: `.rl-flow-grid`
- CTA: `.rl-contact-zone`, `.rl-contact-card`, `.rl-btn`, `.rl-text-link`, `.rl-square-link`

Implementation note for next thread:

- Pricing / Works / News / Contact currently still use older page layout. Redesign them to align with the Top/About structure.
- Update their stylesheet query from `?v=20241221_02` to the current renewed version pattern.
- Avoid inline styles in the renewed pages where possible.

## 2. Global Page Design Rules

All four pages should share the same lower-page architecture:

1. Header
2. Renewed sub hero
3. Page-specific core sections
4. Cross-link section where useful
5. Contact CTA
6. Footer

Shared sub hero formula:

- Eyebrow: short English/Japanese signal.
- H1: 2-line Japanese outcome phrase.
- Lead: 1 paragraph that explains the page's purpose.
- Right-side visual: abstract but content-specific dashboard/card motif using CSS, matching About hero.

Shared CTA wording:

Title: `Contact`

Lead:
`内容が固まっていなくても大丈夫です。現状の課題整理や改善のヒントだけでも、お気軽にご相談ください。`

Primary link:
`相談する` to `../contact/`

## 3. Pricing Page Design

Page role:
Help users understand "what can I ask for?", "rough budget sense", and "how estimate happens" without making prices feel rigid.

Recommended meta:

- Title: `Pricing | Rise（ライズ）`
- Description: `Rise（ライズ）の料金・サポート内容。ホームページ制作、LP制作、SNS・広告運用、Googleマップ最適化、AI活用まで、目的に合わせて柔軟にご提案します。`

Hero:

- Eyebrow: `Pricing Policy`
- H1: `必要な分だけ、成果につながる形で。`
- Lead: `Web制作や運用支援は、目的・規模・更新体制によって必要な内容が変わります。Riseでは、まず現状を整理し、無理なく始められる組み合わせでご提案します。`
- Visual motif: estimate sheet + stacked service chips + highlighted monthly support card.

Section order:

1. `Policy`
   - Purpose: explain flexible quotation philosophy.
   - Layout: story panel or 2-column panel.
   - Copy points:
     - packaged prices are guideposts, not forced bundles
     - begin with current issues and goals
     - propose practical scope and priority

2. `Plan`
   - Purpose: show monthly support plans already introduced on Top with more detail.
   - Cards:
     - ライトプラン: `30,000円〜 / 月`
       - 月1回の相談
       - 簡単な改善提案
       - メール・LINEサポート
       - Recommended for: `まず相談先を持ちたい方`
     - ベーシックプラン: `50,000円〜 / 月`
       - 更新・修正
       - 改善提案
       - SNS / Googleマップサポート
       - Recommended for: `継続的にWebを育てたい方`
       - Featured card
     - コンサル・運用プラン: `80,000円〜 / 月`
       - 戦略設計
       - 施策実行
       - 広告・分析・AI活用
       - Recommended for: `集客や業務改善まで伴走してほしい方`

3. `Service Menu`
   - Purpose: list one-time and project-based services.
   - Card categories:
     - ホームページ制作・改修
     - LP制作
     - SNS運用サポート
     - Googleマップ最適化
     - 広告運用サポート
     - 業務効率化・AI活用
     - 印刷物・DTPデザイン
     - IT/Web個別レッスン
   - Avoid detailed fixed prices for these unless client confirms exact numbers.

4. `Good Fit`
   - Purpose: answer "is this for me?"
   - Use issue cards like Top:
     - ホームページを作ったけど問い合わせがこない
     - SNSやチラシがバラバラで効果が出ない
     - WebやAIを活用したいが何から始めるか分からない
     - 更新・発信を続ける時間が足りない

5. `Flow`
   - Purpose: quotation and start process.
   - Steps:
     - 01 お問い合わせ
     - 02 現状ヒアリング
     - 03 課題整理・優先順位づけ
     - 04 プラン・お見積もり
     - 05 制作・運用開始
     - 06 改善・継続サポート

6. `FAQ`
   - Purpose: reduce contact friction.
   - Suggested questions:
     - まだ内容が決まっていなくても相談できますか？
     - 小さな修正や相談だけでも依頼できますか？
     - 月額サポートなしで制作だけお願いできますか？
     - 打ち合わせはオンラインでも可能ですか？
     - AI活用やSNSだけの相談もできますか？

7. Contact CTA

## 4. Works Page Design

Page role:
Show proof of work and clarify that Rise can support Web, design, marketing, and operation. Should feel like a practical portfolio, not a gallery-only page.

Recommended meta:

- Title: `Works | Rise（ライズ）`
- Description: `Rise（ライズ）の制作実績。ホームページ制作、LP制作、SNS運用、Googleマップ、印刷物デザインなど、事業に合わせた支援事例をご紹介します。`

Hero:

- Eyebrow: `Works`
- H1: `事業の想いが、伝わる形になった事例。`
- Lead: `ホームページやLP、SNS、印刷物など、目的に合わせて整理・制作した実績を掲載しています。公開できる範囲で、支援内容や狙いもあわせて紹介します。`
- Visual motif: portfolio board with category tabs and preview cards.

Section order:

1. `Works`
   - Main CMS grid.
   - Keep using `#worksGrid`.
   - Cards should show:
     - thumbnail
     - title
     - category/tag
     - optional URL
     - optional short role/scope if CMS has field later
   - Existing CMS renderer can remain, but visual classes should be restyled to the new tone.

2. `Filter`
   - Current filters: All / Web / DTP / Other.
   - Recommended filters:
     - All
     - Web
     - LP
     - SNS
     - DTP
     - Other
   - Design: pill buttons, left or center depending layout. Use navy active and light border inactive.

3. `Support Range`
   - Purpose: show that works are not only deliverables, but support scope.
   - Cards:
     - 企画・構成整理
     - デザイン・実装
     - 更新・運用
     - 集客導線改善

4. `From Works To Consultation`
   - Purpose: guide visitors who like a case.
   - Copy:
     `近い業種や目的の事例がなくても大丈夫です。状況やご予算に合わせて、必要な形を一緒に整理します。`
   - CTA to Pricing and Contact.

5. Contact CTA

CMS note:

- `js/cms.js` currently fetches `works` and renders cards into `#worksGrid`.
- Static placeholders are fallback. In the redesigned page, use CMS-first but preserve fallback content for API failure.
- The current renderer supports image fields such as `thumbnail`, `mainImage`, `image`, etc. Keep this tolerance.

## 5. News Page Design

Page role:
Keep announcements simple, but allow future column/knowledge posts. The page should feel readable and trustworthy.

Recommended meta:

- Title: `News | Rise（ライズ）`
- Description: `Rise（ライズ）からのお知らせ、制作実績の更新、Web・SNS・AI活用に関するコラムを掲載しています。`

Hero:

- Eyebrow: `News / Column`
- H1: `お知らせと、役立つ小さなヒント。`
- Lead: `制作実績の更新やサービスのお知らせに加えて、Web・SNS・AI活用の考え方を少しずつ発信していきます。`
- Visual motif: article list + highlighted latest article card.

List view section order:

1. `Latest`
   - Main `#newsList` list.
   - Keep existing date/category/title structure.
   - New design should use airy list rows, clear category pill, and strong hover.

2. `Categories`
   - Optional if CMS categories are reliable.
   - Suggested pills:
     - All
     - Info
     - Work
     - Column
     - Service
   - Existing JS does not implement category filtering for News yet. UI design can include category pills as visual plan, but implementation thread should decide whether to add JS.

3. `Reading Guide`
   - Purpose: explain what News contains.
   - Cards:
     - お知らせ: 営業・サービス・サイト更新
     - 実績更新: 公開可能な制作事例
     - コラム: Web・SNS・AI活用のヒント

4. Contact CTA

Detail view design:

- Existing `?id=` detail mode should remain.
- Detail should use:
  - Back link at top: `News一覧へ戻る`
  - Date and category
  - Large article title
  - Body with comfortable max width
  - Bottom CTA: `この記事に近い内容を相談する`
- Avoid old inline styles in detail renderer if possible; move to CSS classes.

CMS note:

- `js/cms.js` fetches `news`, renders `#newsList`, and supports detail view in `#newsDetail`.
- Pagination currently runs after CMS render but may initialize before async-rendered items in some cases. Implementation thread should verify if pagination is needed after CMS list population.

## 6. Contact Page Design

Page role:
Primary conversion page. Should reduce anxiety, clarify contact options, and make the form feel easy.

Recommended meta:

- Title: `Contact | Rise（ライズ）`
- Description: `Rise（ライズ）へのお問い合わせ。Web制作、マーケティング支援、SNS運用、AI活用、お見積もりなど、内容が固まっていない段階でもお気軽にご相談ください。`

Hero:

- Eyebrow: `Contact`
- H1: `まずは、今の状況から聞かせてください。`
- Lead: `制作内容や予算が決まっていなくても大丈夫です。現状の課題、やってみたいこと、困っていることを伺いながら、必要な進め方を一緒に整理します。`
- Visual motif: message card + response timeline + LINE/mail contact chips.

Section order:

1. `Contact Options`
   - Purpose: show ways to contact before the form.
   - Cards:
     - フォームで相談
     - LINEで相談
     - メールで相談
   - Include response time: `通常3営業日以内に返信いたします。`
   - Include business hours from About:
     - 月〜土 / 10:00〜18:30
     - 定休日 日曜日

2. `Form`
   - Existing Formspree action should stay unless client changes it.
   - Fields recommended:
     - 御社名 / 屋号 optional
     - お名前 required
     - メールアドレス required
     - 電話番号 optional
     - ご相談内容 required select
       - Webサイト制作・改修
       - LP制作
       - SNS運用
       - Googleマップ・広告
       - AI活用・業務改善
       - 印刷物・DTP
       - その他
     - ご予算 optional select
       - 未定
       - 〜10万円
       - 10〜30万円
       - 30〜50万円
       - 50万円〜
       - 月額サポートを相談したい
     - お問い合わせ内容 required textarea
   - Keep placeholders friendly and concrete.

3. `Before Contact`
   - Purpose: reassure users they do not need complete requirements.
   - Checklist:
     - 目的や課題が曖昧でもOK
     - 既存サイトやSNSのURLだけでもOK
     - 予算感の相談からでもOK
     - オンライン相談もOK

4. `After Sending`
   - Purpose: set expectations.
   - Flow:
     - 01 内容確認
     - 02 返信・日程調整
     - 03 ヒアリング
     - 04 ご提案

5. `Company Contact Info`
   - Use information from About:
     - Rise
     - 樋口 和也
     - 福岡県福岡市南区大楠
     - 050-3743-5058
     - info@riselive.net
     - LINE link

Success message design:

- Existing AJAX success message should be styled as a renewed panel.
- Current success copy mentions "メールソフトが起動します" even though Formspree AJAX is used. Replace in implementation with:
  `お問い合わせありがとうございます。内容を確認のうえ、通常3営業日以内にご返信いたします。`

## 7. Cross Page Navigation And Conversion

Recommended cross-links:

- Pricing to Contact: primary CTA.
- Pricing to Works: "事例を見る" secondary CTA.
- Works to Pricing: "料金・進め方を見る" secondary CTA.
- News detail to Contact: "この記事に近い内容を相談する".
- Contact to Pricing: small text link near form for price concerns.

## 8. Implementation Notes For Next Thread

Files likely to edit:

- `pricing/index.html`
- `works/index.html`
- `news/index.html`
- `contact/index.html`
- `css/style.css`
- `js/cms.js` only if News filters/detail styles or pagination behavior need adjustment.

Do not alter unless needed:

- `index.html` top page
- `about/index.html`
- Existing header/footer structure except active nav and asset paths.

Verification checklist for UI design thread:

- Desktop and mobile visual check for all four pages.
- Header active states correct.
- Contact form still submits through Formspree.
- Works and News CMS fallback still renders if API fails.
- News detail `?id=demo_renewal` still works.
- No visible old inline styles remain in renewed sections.

