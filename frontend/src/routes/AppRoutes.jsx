// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LoginPage } from '../pages/LoginPage';
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

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Main Authenticated Layout Routes */}
      <Route path="/" element={<AppLayout />}>
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

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
