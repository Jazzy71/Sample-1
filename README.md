# ProcureLens

An Excel-driven procurement spend analytics product.

## Phase 1 — Frontend Foundation

This phase establishes the complete frontend UI/UX foundation: routing, layout,
navigation, and reusable component shells (KPI cards, chart containers, data
tables, upload, empty/loading/error states, column-mapping preview). All
dashboard KPIs and charts render in an empty/placeholder state — no Excel
parsing, analytics, or backend exists yet.

```
Frontend UI
    ↓
Application State
    ↓
Future Excel Intelligence Engine     (Phase 2)
    ↓
Normalized Procurement Data          (Phase 2)
    ↓
Future Analytics Engine              (Phase 3)
    ↓
KPIs / Charts / Insights             (Phase 3)
```

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · shadcn/ui · React Router · Recharts (component architecture only)

## Getting started

```bash
npm install
npm run dev
```
