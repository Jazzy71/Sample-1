import { createBrowserRouter, Navigate } from "react-router-dom"

import { OnboardingLayout } from "@/app/layouts/OnboardingLayout"
import { DashboardLayout } from "@/app/layouts/DashboardLayout"

import { LandingUploadPage } from "@/features/landing-upload/LandingUploadPage"
import { ProcessingPage } from "@/features/processing/ProcessingPage"
import { WorkbookUnderstandingPage } from "@/features/workbook-understanding/WorkbookUnderstandingPage"
import { OverviewPage } from "@/features/overview/OverviewPage"
import { SpendAnalysisPage } from "@/features/spend-analysis/SpendAnalysisPage"
import { VendorsPage } from "@/features/vendors/VendorsPage"
import { MaterialsPage } from "@/features/materials/MaterialsPage"
import { QuotationsPage } from "@/features/quotations/QuotationsPage"
import { InsightsPage } from "@/features/insights/InsightsPage"
import { DataQualityPage } from "@/features/data-quality/DataQualityPage"
import { RawDataPage } from "@/features/raw-data/RawDataPage"
import { ReportsPage } from "@/features/reports/ReportsPage"

export const router = createBrowserRouter([
  {
    element: <OnboardingLayout />,
    children: [
      { path: "/", element: <LandingUploadPage /> },
      { path: "/processing", element: <ProcessingPage /> },
      { path: "/workbook-understanding", element: <WorkbookUnderstandingPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: "/overview", element: <OverviewPage /> },
      { path: "/spend-analysis", element: <SpendAnalysisPage /> },
      { path: "/vendors", element: <VendorsPage /> },
      { path: "/materials", element: <MaterialsPage /> },
      { path: "/quotations", element: <QuotationsPage /> },
      { path: "/insights", element: <InsightsPage /> },
      { path: "/data-quality", element: <DataQualityPage /> },
      { path: "/raw-data", element: <RawDataPage /> },
      { path: "/reports", element: <ReportsPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
])
