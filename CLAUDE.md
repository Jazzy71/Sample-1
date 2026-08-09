# ProcureLens — Project Instructions

## 1. Product

ProcureLens is a procurement analytics SaaS application.

The core product workflow is:

Excel Workbook
→ Understand Workbook
→ Normalize Data
→ Analyze Procurement Data
→ Generate KPIs & Charts
→ Generate Business Insights
→ Generate Reports

ProcureLens is NOT a generic procurement management system.

Do not introduce unrelated modules such as:
- Purchase Order management
- RFQ management
- Approval workflows
- Inventory management
- Generic ERP functionality

---

## 2. Development Phases

### Phase 1 — Frontend Foundation
Status: COMPLETE

Focus:
- Premium UI/UX
- React application architecture
- Routing
- Upload experience
- Processing experience
- Workbook understanding screen
- Dashboard shell
- Reusable UI components
- Responsive design
- Empty/loading/error states

Phase 1 does NOT contain:
- Excel parsing
- Excel intelligence
- Real analytics
- AI insights
- Backend/API
- Fake procurement data

Phase 1 Git checkpoint:
e78e915

---

### Phase 2 — Excel Intelligence Engine
Status: NOT STARTED

Goal:

Allow ProcureLens to accept different procurement/quotation Excel workbooks rather than requiring a fixed template.

Expected pipeline:

Excel File
→ Workbook Inspection
→ Sheet Detection
→ Header Detection
→ Semantic Column Detection
→ Column Mapping
→ Data Cleaning
→ Data Validation
→ Normalized Procurement Data

The system should not depend on fixed sheet names or exact column names.

Example:

"Description", "Item Name", "Material Description"

may all represent the same semantic field.

Do not begin Phase 2 until its architecture has been reviewed and approved.

---

### Phase 3 — Analytics Engine
Status: NOT STARTED

Goal:

Transform normalized procurement data into:

- KPIs
- Spend analysis
- Vendor analysis
- Material analysis
- Quotation analysis
- Trends
- Comparisons
- Filters
- Dynamic charts

Analytics must be calculated from real normalized data.

Never hardcode production KPI values or chart values.

---

### Phase 4 — AI & Reporting
Status: NOT STARTED

Potential capabilities:

- AI-generated procurement insights
- Anomaly detection/explanations
- Cost observations
- Vendor insights
- Executive summaries
- PDF reports
- Exportable reports

Only implement these after the underlying analytics are reliable.

---

## 3. Technology Stack

Current frontend stack:

- React
- TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui
- React Router
- Lucide React
- Framer Motion
- Recharts

Do not introduce dependencies without a clear technical reason.

Avoid unnecessary state-management or data-fetching libraries until the application genuinely requires them.

---

## 4. Architecture Principles

Keep these layers separated:

UI
↓
Application State
↓
Excel Intelligence
↓
Normalized Data
↓
Analytics Engine
↓
Insights / Reports

Do not place Excel parsing or business logic directly inside React components.

UI components should remain reusable and presentation-focused.

Business logic should live in appropriate services/modules.

---

## 5. Data Principles

ProcureLens must be adaptive.

Never assume:

- Sheet1 exists
- Sheet2 exists
- specific sheet names
- exact column names
- a fixed number of sheets
- a fixed column order
- a fixed quotation template

The system should inspect the workbook and determine its structure.

Never silently invent missing business data.

If information cannot be reliably determined, report it as unknown or unresolved.

---

## 6. UI/UX Principles

ProcureLens should feel like a premium enterprise SaaS product.

Design direction:

- Light/off-white background
- Deep navy/charcoal typography
- Teal/emerald accent
- Clean modern typography
- Generous spacing
- Subtle borders
- Restrained shadows
- Purposeful animations

Prioritize:

- visual hierarchy
- usability
- consistency
- accessibility
- responsive behavior

Do not copy the visual identity of TestPilot AI.

---

## 7. Important Rules

Before implementing a major feature:

1. Inspect the existing architecture.
2. Understand what already exists.
3. Propose the implementation approach.
4. Avoid unnecessary rewrites.
5. Keep changes scoped to the current phase.
6. Test after implementation.
7. Do not automatically move into the next phase.

When a phase is complete:

- Run the build.
- Check for errors.
- Test relevant functionality.
- Review the UI where applicable.
- Commit the completed phase.

---

## 8. Current Project State

Phase 1 is complete.

Git checkpoint:

e78e915

Working tree was clean at the end of Phase 1.

The next planned work is Phase 2: Excel Intelligence Engine.

Do not begin Phase 2 automatically.
