---
name: dashboard-design-guidebook
description: Design or review clear presentation-oriented dashboards using Japan Digital Agency dashboard design guidance. Use when Codex plans dashboard requirements, chooses charts, creates prototypes, evaluates layout, color, accessibility, metadata, or final dashboard checklists for BI tools, web dashboards, reports, or analytics screens.
---

# Dashboard Design Guidebook

Use this skill to design or review presentation-oriented dashboards that help viewers understand facts, build shared recognition, and decide what to do next. The source guide focuses on visualization, not data collection, ETL, cleansing, warehousing, or security operations.

For detailed rules, chart choices, color guidance, and review checklist items, read `references/dashboard-principles.md`.

## Scope

Prefer this skill for **presentation dashboards**: viewers need to quickly understand current status, compare it with a standard, notice abnormalities or differences, and decide whether action is needed.

Be careful with **exploratory dashboards**: viewers need domain knowledge, deeper filtering, drilling, or complex operations. Apply the principles here, but add more domain-specific analysis support.

## Workflow

1. Define requirements before drawing charts.
2. Prototype before implementation.
3. Choose information expressions that match the message.
4. Implement with layout, color, accessibility, and metadata checks.
5. Review with the checklist before calling the dashboard complete.

## Requirements

Clarify the dashboard purpose with 5W1H:

- **Why**: top-level goal and reason the dashboard is viewed.
- **What / So what**: information needed to achieve the goal, and the judgments or actions after viewing.
- **Who**: viewer role, organization, work context, and data literacy.
- **When**: viewing timing and frequency.
- **Where**: viewing location, medium, and device.
- **How**: required functions, data fields, and update frequency.

Also document constraints:

- Too many information types or too much complexity.
- No recurring need to view the dashboard.
- Missing data, insufficient update frequency, inadequate granularity, or metrics that cannot be compared.

If the purpose or data constraints make a dashboard unsuitable, say so and propose a better artifact such as a report, table, workflow alert, or analysis notebook.

## Prototyping

Start from the required information list, not the tool UI.

For each candidate item, capture:

- Metric category.
- Information detail.
- Supplemental information or definition.
- Candidate chart or table.

Select information using four criteria:

- Purpose fit: keep only information that supports judgment or action.
- Noticeable difference: make outliers, changes, and trends discoverable.
- Decomposability: provide enough granularity to move from whole to part.
- Freshness: reflect the latest useful data and define the update process.

Build prototypes in two passes:

1. **Skeleton layout**: prioritize information, relationships, size, order, pages, and navigation.
2. **Near-final mockup**: add sample values, chart types, labels, color direction, and notes for unresolved discussion points.

When gathering feedback, ask for the reason behind each request. Reflect requests that are clearly tied to the dashboard purpose; reduce or redesign requests that would make the dashboard noisy.

## Layout

Design for the viewer's eye movement. Place the whole picture and most important signals toward the upper left, and more detailed information toward the lower right.

Use a 16:9 canvas when the dashboard will be viewed on screens or in BI tools. A 2- to 6-column/row grid is a good default. Place filters at the top or left, and place affected information below or to the right so the relationship is clear.

The dashboard should:

- Move from overview to detail.
- Require little or no operation for core understanding.
- Keep information volume manageable.
- Provide comparison targets such as goals, averages, previous year values, previous period values, or thresholds.

## Chart Choice

Choose the chart by the information to communicate:

- **Line chart**: time change and trends.
- **Bar chart**: quantity comparison across categories.
- **Area chart**: time change plus composition, especially stacked series.
- **Pie or donut chart**: compact composition only when the whole is clear; otherwise prefer bars.
- **Table**: many values, precise lookup, or data that must be browsed rather than compared visually.
- **Metric card**: a judgment-relevant value that should be understood immediately.

## Design Principles

Every chart should satisfy two principles:

- **Know what you need to know**: keep it simple, use meaningful ordering, create emphasis, and keep loading/interaction fast.
- **Avoid misunderstanding**: use clear wording, define the data, avoid distorted visual scales, and show source/update/notes/disclaimers.

Common rules:

- Show an overall metric together with detailed charts.
- Sort chart items by a meaningful order.
- Remove redundant gridlines, frames, decimals, titles, and repeated labels.
- Avoid decorative 3D, shadows, images, or effects that do not encode data.
- Limit chart colors, usually to 1-5 meaningful colors.
- Put chart content and data type in the title.
- Keep titles, legends, and labels concise.
- Place legends near the chart and match the visual order.
- Use zero as the origin for bar charts unless there is a documented reason.
- Do not rely on color alone; add labels, marker shapes, patterns, or direct values.

## Implementation Checks

Before finishing, verify:

- Viewers can make the intended judgment or action.
- Only necessary information remains.
- The dashboard works in the actual viewing environment and device.
- Charts and tables are ordered, labeled, scaled, and colored to avoid confusion.
- Data source, definition, update date, target date, notes, and disclaimers are available.
- Loading and interactions are fast enough for repeated use.
- Accessibility alternatives exist where needed: data table or CSV/Excel, alt text, and a text summary of key indicators and trends.

## Source Note

This skill summarizes `20260331_resources_dashboard-guidebook_guidebook_02.pdf`, "ダッシュボードデザインの実践ガイドブック / Dashboard Design Guidebook", updated 2026-03-31 by Japan Digital Agency.
