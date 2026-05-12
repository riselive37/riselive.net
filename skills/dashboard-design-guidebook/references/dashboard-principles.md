# Dashboard Principles Reference

This reference contains detailed operating rules summarized from the Japan Digital Agency "Dashboard Design Guidebook" PDF.

## Dashboard Creation Flow

The guide divides dashboard creation into three steps:

- **Requirements**: define purpose and constraints.
- **Prototyping**: list required information, create a prototype, collect feedback, and improve.
- **Implementation**: build in a BI tool or software, then check design, data, accessibility, and usability.

## Requirement Worksheet Content

Capture these project basics:

- Project goal.
- Decision makers.
- Stakeholders.
- Risks.
- Schedule.

Capture these dashboard-specific items:

- Top-level purpose.
- Viewing purpose.
- Viewer attributes.
- Viewing timing and frequency.
- Viewing place, medium, and device.
- Required information and data types.
- Expected judgments or actions after viewing.
- Required functions.
- Data fields and update frequency.
- Dashboard constraints.
- Data constraints.

## Constraint Handling

If there are too many information types, reduce scope.

If the content is too complex, reduce complexity, split views, or change the artifact type.

If regular viewing is unnecessary, consider a report or one-time analysis instead of a dashboard.

If data is missing, too stale, too coarse, or not comparable, verify in the prototype whether the constraint can be worked around or whether it blocks dashboard production.

## Information Selection

Use a required-information table with:

- Metric category.
- Information detail.
- Supplemental information.
- Candidate graph.

Select information according to:

- **Purpose fit**: Does it connect to judgment or action?
- **Difference detection**: Can viewers notice standout values, timing of change, and trend direction?
- **Decomposition**: Can viewers move from overall to readable parts at the necessary granularity?
- **Freshness**: Is the latest usable data reflected with an update mechanism?

## Prototype Review

Use prototypes to improve quality, cost, and schedule. They help:

- Draw out concrete requests and opinions.
- Build agreement with stakeholders.
- Clarify the final artifact and improve implementation speed.

Review layout before polishing surface details. Create several layout options when needed by changing structure, visual weight, or order.

For feedback, distinguish:

- Requests with a clear reason tied to the dashboard purpose.
- Requests that add noise or complexity without serving the purpose.
- Needs that can be satisfied better through a different design than the requested change.

Apply the minimum necessary change, then show the improved prototype again.

## Layout Rules

Default to a 16:9 screen layout for dashboard viewing.

Use a grid that can divide the canvas vertically and horizontally into 2-6 parts. Align cards, charts, and tables to this grid.

Arrange information according to viewing order:

- Upper left: the first, largest, or most important indicator.
- Middle areas: related breakdowns and comparisons.
- Lower right: more detailed or secondary information.

When filters exist:

- Place them at the top or left.
- Put affected information below or to the right.
- Make the relationship between the filter and affected region visually clear.

When information volume grows:

- Split pages or views.
- Add navigation.
- Preserve the overview-to-detail structure.

## Chart Selection

### Metric

Use a metric when a single value strongly affects judgment or action. Pair it with comparison values where raw quantity alone is hard to interpret.

### Table

Use a table when viewers need exact values, many rows, or lookup-style reading. Tables may use text, numbers, color, and shape, but should remain readable.

### Line Chart

Use for time change and trend. The horizontal axis should be time. Mark data points when interpolation could be unclear. Place series labels near the lines when possible.

If the horizontal variable is not time, consider a bar chart.

### Bar Chart

Use for quantity comparison across categories. Keep a visible gap between bars. For multiple series, use grouped bars or stacked bars when the comparison task requires it.

For category comparisons, consider a bar chart first. For time-based quantity change, consider line or area charts.

### Area Chart

Use when communicating both time change and composition. Stacked area charts are common. Use 100% stacked area charts when only composition change matters.

If composition is unnecessary, use a line chart. If there are many series or no time-change message, use a bar chart.

### Pie or Donut Chart

Use only when the whole is clear and composition must be communicated compactly. Add values whenever possible.

In many cases, a bar chart communicates data more accurately. If the total changes over time, consider an area chart.

## Color Guidance

The guide uses Japan Digital Agency design system palettes: Blue, Light Blue, Cyan, Green, Orange, Red, and Solid Gray. Typical color roles include:

- Text: black, white, label gray, link, highlight.
- Background: standard background and controls.
- Chart: primary, secondary, neutral, and gray series.
- Semantic: positive, negative, success, error.

Accessibility requirements:

- Ensure at least 3:1 contrast between background and chart color areas when the color area itself conveys information.
- If 3:1 cannot be met, place the numeric value close to the chart color area.
- The number text itself should have at least 4.5:1 contrast with the background.
- If a nearby value cannot be shown, reveal the value on mouse hover or keyboard focus.
- Consider color vision diversity, use color-vision simulation or checkers when possible, and provide non-color distinctions.

## Chart Design Principles

### Know What You Need To Know

Keep it simple:

- Remove redundant data, explanations, and decorative expression.
- Keep chart elements only as detailed as needed for understanding.

Use meaningful order:

- Sort by size, time, recognized order, or the order best suited to the viewer's question.

Create emphasis:

- Use color, size, and weight to guide attention to important information.

Do not make viewers wait:

- Reduce load time and interaction latency so the dashboard remains suitable for repeated use.

### Avoid Misunderstanding

Write clearly:

- Avoid jargon and complex wording.
- Use concise titles, series names, and units.

Define data:

- State what was collected, what the values mean, and when they were updated.

Do not distort:

- Avoid arbitrary axis ranges, omitted ranges, and expressions that exaggerate or minimize differences.

Show metadata:

- Source.
- Data update date.
- Target date or period.
- Notes.
- Disclaimers.

## Do / Don't Rules

Do:

- Show an overall indicator and detailed charts together.
- Use meaningful order for chart/table items.
- Remove unnecessary elements and duplicated information.
- Avoid decorative or rich effects unrelated to values.
- Limit the number of chart colors.
- Write titles that include content and data type, such as monthly trend, cumulative value, or rate.
- Keep legends and labels simple.
- Place legends close to charts and in matching order.
- Use zero origins for bar charts by default.
- Identify categories through more than color.

Don't:

- Show only detailed elements without an overall signal.
- Sort in arbitrary or irrelevant order.
- Include excess gridlines, axis titles, decimal places, or repeated labels.
- Use 3D, shadows, or decorative images for emphasis.
- Use many colors without a message.
- Use titles so vague that the data meaning is unclear.
- Separate legends far from charts or reverse the visual order.
- Truncate bar chart axes in a way that distorts differences.
- Depend only on color for gender, category, status, or series distinctions.

## Final Review Checklist

### User Experience

- Does the dashboard provide information needed for judgment or action?
- Is there a reference indicator that helps viewers grasp the whole picture?
- Is the dashboard narrowed to only necessary information?
- Does it avoid unnecessary operations?
- Can viewers reach needed information without getting lost?
- Has feedback from multiple expected users been gathered and reflected?

### Indicator, Table, and Chart Design

- Does attention go first to the values viewers care about?
- Are graph and table items ordered for recognition and comparison?
- Are chart and legend adjacent and easy to map?
- Can viewers notice differences through comparison or time change?
- Are chart colors limited to roughly 1-5 colors?
- Are gridlines, borders, and other chart elements minimized?
- Are unnecessary images, 3D, shadows, and rich effects avoided?
- Are titles and series names clear and unambiguous?
- Do bar charts start from zero?
- Is the data update date shown?

### Technical

- Has the dashboard been checked in the actual viewing environment and device?
- Is loading speed acceptable?

### Data Design

- Is the selected data aligned with viewer purpose?
- Can the data be decomposed to the level viewers need?
- Is there a process to update data at the required frequency?
- Are comparison values provided when a raw quantity alone is hard to judge?
- Are data definitions available?

### Accessibility

- Is information identifiable without color alone?
- Do charts have alt text or equivalent alternatives?
- Is the underlying data available as Excel, CSV, or HTML table where appropriate?
- For public dashboards, is a summarized text version of the dashboard available?
