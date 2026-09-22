// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout';
import { PlatformLayout } from '../components/layout/PlatformLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Protection Guards
import { ClientProtectedRoute } from './ClientProtectedRoute';
import { AdminProtectedRoute } from './AdminProtectedRoute';

// Public Pages
import { LandingPage } from '../pages/LandingPage';
import { AboutPage, PlatformInfoPage, ContactPage } from '../pages/PublicPages';
import { ClientSignInPage } from '../pages/ClientSignInPage';
import { ClientSignUpPage } from '../pages/ClientSignUpPage';

// Admin Pages
import { AdminLoginPage } from '../pages/Admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/Admin/AdminDashboardPage';
import { AdminRequestsPage } from '../pages/Admin/AdminRequestsPage';
import { AdminClientsPage } from '../pages/Admin/AdminClientsPage';
import { AdminActivityPage } from '../pages/Admin/AdminActivityPage';
import { AdminSettingsPage } from '../pages/Admin/AdminSettingsPage';

// Client Workspace Pages
import { DashboardPage } from '../pages/DashboardPage';
import { TrialsListPage } from '../pages/Trials/TrialsListPage';
import { TrialDetailsPage } from '../pages/Trials/TrialDetailsPage';
import { SeedLotsListPage } from '../pages/SeedLots/SeedLotsListPage';
import { FieldsListPage } from '../pages/Fields/FieldsListPage';
import { FarmersListPage } from '../pages/Farmers/FarmersListPage';
import { AgronomistsListPage } from '../pages/Agronomists/AgronomistsListPage';
import { FieldOfficerWorkflowPage } from '../pages/FieldOfficer/FieldOfficerWorkflowPage';
import { ObservationsListPage } from '../pages/Observations/ObservationsListPage';
import { SamplesListPage } from '../pages/Samples/SamplesListPage';
import { ReportsListPage } from '../pages/Reports/ReportsListPage';
import { ReportDetailsPage } from '../pages/Reports/ReportDetailsPage';
import { CompaniesListPage } from '../pages/Companies/CompaniesListPage';
import { AnalyticsPage } from '../pages/Analytics/AnalyticsPage';
import { SettingsPage } from '../pages/Settings/SettingsPage';

// Parameterized Redirect Helpers
const TrialRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/platform/trials/${id}`} replace />;
};

const ReportRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/platform/reports/${id}`} replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ============================================================ */}
      {/* 1. PART 1 — PUBLIC DYNAMIC WEBSITE (Route: /) */}
      {/* ============================================================ */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/platform-info" element={<PlatformInfoPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Public Client Authentication */}
      <Route path="/signin" element={<ClientSignInPage />} />
      <Route path="/login" element={<Navigate to="/signin" replace />} />
      <Route path="/signup" element={<ClientSignUpPage />} />
      <Route path="/register" element={<Navigate to="/signup" replace />} />

      {/* ============================================================ */}
      {/* 2. PART 3 — ADMIN PORTAL (Route: /admin/*) */}
      {/* ============================================================ */}
      {/* Separate Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Console */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="requests" element={<AdminRequestsPage />} />
          <Route path="clients" element={<AdminClientsPage />} />
          <Route path="activity" element={<AdminActivityPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* ============================================================ */}
      {/* 3. PART 2 — CLIENT WORKSPACE (Route: /platform/*) */}
      {/* ============================================================ */}
      <Route element={<ClientProtectedRoute />}>
        <Route path="/platform" element={<PlatformLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="trials" element={<TrialsListPage />} />
          <Route path="trials/:id" element={<TrialDetailsPage />} />
          <Route path="seed-lots" element={<SeedLotsListPage />} />
          <Route path="fields" element={<FieldsListPage />} />
          <Route path="farmers" element={<FarmersListPage />} />
          <Route path="agronomists" element={<AgronomistsListPage />} />
          <Route path="field-officer" element={<FieldOfficerWorkflowPage />} />
          <Route path="observations" element={<ObservationsListPage />} />
          <Route path="samples" element={<SamplesListPage />} />
          <Route path="reports" element={<ReportsListPage />} />
          <Route path="reports/:id" element={<ReportDetailsPage />} />
          <Route path="companies" element={<CompaniesListPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Legacy / Direct Route Redirects to /platform/* */}
      <Route path="/trials" element={<Navigate to="/platform/trials" replace />} />
      <Route path="/trials/:id" element={<TrialRedirect />} />
      <Route path="/seed-lots" element={<Navigate to="/platform/seed-lots" replace />} />
      <Route path="/fields" element={<Navigate to="/platform/fields" replace />} />
      <Route path="/farmers" element={<Navigate to="/platform/farmers" replace />} />
      <Route path="/agronomists" element={<Navigate to="/platform/agronomists" replace />} />
      <Route path="/field-officer" element={<Navigate to="/platform/field-officer" replace />} />
      <Route path="/observations" element={<Navigate to="/platform/observations" replace />} />
      <Route path="/samples" element={<Navigate to="/platform/samples" replace />} />
      <Route path="/reports" element={<Navigate to="/platform/reports" replace />} />
      <Route path="/reports/:id" element={<ReportRedirect />} />
      <Route path="/companies" element={<Navigate to="/platform/companies" replace />} />
      <Route path="/analytics" element={<Navigate to="/platform/analytics" replace />} />
      <Route path="/settings" element={<Navigate to="/platform/settings" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
