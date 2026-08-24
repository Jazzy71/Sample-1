# CostCompass

An advanced, browser-native Excel-driven procurement spend analytics platform. CostCompass allows procurement teams to upload raw Excel data and instantly receive structured insights, high-level KPIs, and beautiful data visualizations—all processed securely within the browser.

## Features

- **In-Browser Excel Processing:** Uses Web Workers to parse and map raw Excel procurement data directly in the browser (no server uploads required).
- **Automated Data Mapping:** Heuristics engine automatically maps messy, inconsistent Excel headers to a normalized schema (`vendor_name`, `total_amount`, `po_date`, etc.).
- **Rule-Based Insights Engine:** Automatically detects and flags Vendor Concentration risks, Missing Data anomalies, and High-Volume Micro-Transactions.
- **Data Quality Scanner:** Scans the dataset for missing critical fields and generates an overall data completeness score.
- **Printable Executive Reports:** Generates clean, CSS-print-optimized executive summaries ready for PDF export.
- **Premium Glassmorphism UI:** Built with an "Apple Frosted Glass" aesthetic. Features an animated Aurora background, gorgeous SVG chart gradients, and physics-based micro-interactions using Framer Motion.

## Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** Framer Motion
- **Data Visualization:** Recharts (with custom SVG linear gradients)
- **Data Processing:** XLSX (SheetJS) running inside Web Workers
- **Routing:** React Router v6

## Architecture

```text
Frontend UI (Premium Glassmorphism + Framer Motion)
    ↓
Application State (React Context)
    ↓
Excel Intelligence Engine (Web Worker + Heuristics + SheetJS)
    ↓
Normalized Procurement Data (Standardized Schema)
    ↓
Analytics & Insights Engine (Rule-based anomaly detection)
    ↓
KPIs / Charts / Reports / Actionable Insights
```

## Getting started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```
