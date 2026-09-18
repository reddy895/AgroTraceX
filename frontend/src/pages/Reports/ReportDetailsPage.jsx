// src/pages/Reports/ReportDetailsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useToast } from '../../context/ToastContext';
import { mockReports } from '../../data/reports';
import {
  FileCheck2,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Package,
  Award,
  ArrowLeft
} from 'lucide-react';

export const ReportDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const report = mockReports.find((r) => r.id === id) || mockReports[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    showToast(`Downloading certified dossier ${report.certificateNumber} (PDF)`, 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumb
        items={[
          { label: 'Reports', to: '/reports' },
          { label: report.id }
        ]}
      />

      {/* Header Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/reports')}
          icon={ArrowLeft}
        >
          Back to Reports
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            icon={Printer}
          >
            Print Dossier
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadPdf}
            icon={Download}
          >
            Export Certified PDF
          </Button>
        </div>
      </div>

      {/* Formal Technical Trial Certificate Container */}
      <div className="bg-white border border-slate-300 rounded-2xl p-8 sm:p-12 shadow-sm text-slate-800 space-y-8 font-sans">
        {/* Certificate Watermark Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-slate-900">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F4A2A] text-white flex items-center justify-center font-bold text-sm">
                X
              </div>
              <span className="text-xl font-extrabold text-slate-900 font-sans tracking-tight">
                AgroTrace<span className="text-emerald-600">X</span> Verification
              </span>
            </div>
            <p className="text-2xs uppercase tracking-widest text-slate-500 font-bold mt-1">
              Independent Scientific Field-Trial Evaluation Dossier
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-slate-600 space-y-1">
            <div><strong>Dossier No:</strong> {report.certificateNumber}</div>
            <div><strong>Trial Ref:</strong> {report.trialId}</div>
            <div><strong>Date Certified:</strong> {report.createdDate}</div>
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-3xs uppercase">
              {report.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <span className="text-3xs uppercase font-extrabold tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block">
            Cultivar Performance Certification
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {report.trialTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Target Crop: <strong className="text-slate-800">{report.crop}</strong> • Variety: <strong className="text-slate-800">{report.variety}</strong> • Sponsor: <strong className="text-slate-800">{report.companyName}</strong>
          </p>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
            1. Executive Evaluation Summary
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {report.executiveSummary}
          </p>
        </div>

        {/* 2-Column Agronomics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Field & Farmer Information */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              2. Field Plot & Soil Verification
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Plot Location:</span>
                <span className="font-semibold text-slate-900">{report.fieldMetrics.fieldName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contract Farmer:</span>
                <span className="font-semibold text-slate-900">{report.fieldMetrics.farmer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Soil Profile:</span>
                <span className="font-medium text-slate-900">{report.fieldMetrics.soilType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Soil pH / Area:</span>
                <span className="font-mono text-slate-900">pH {report.fieldMetrics.soilPh} • {report.fieldMetrics.areaHa} Ha</span>
              </div>
            </div>
          </div>

          {/* Seed Lot Information */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              3. Seed Lot & Genetic Lineage
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Seed Lot ID:</span>
                <span className="font-mono font-bold text-[#0F4A2A]">{report.seedLotId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Batch Code:</span>
                <span className="font-mono text-slate-900">{report.seedLotBatch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trial Design:</span>
                <span className="font-medium text-slate-900">RCBD (3 Replications, 4 Treatments)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Emergence Purity:</span>
                <span className="font-bold text-emerald-700">98.2% Emergence Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Harvest Data & Statistical Yield ANOVA */}
        {report.harvestMetrics && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              4. Harvest Yield Statistics & Agronomic Advantage
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <span className="text-3xs text-emerald-800 uppercase block font-bold">Extrapolated Yield</span>
                <span className="text-base font-bold text-emerald-950 mt-1 block">
                  {report.harvestMetrics.extrapolatedYieldTonnesHa} MT/Ha
                </span>
                <span className="text-3xs text-emerald-700">{report.yieldAdvantagePercent}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase block font-bold">Benchmark Check</span>
                <span className="text-base font-bold text-slate-800 mt-1 block">
                  {report.harvestMetrics.benchmarkYieldTonnesHa} MT/Ha
                </span>
                <span className="text-3xs text-slate-400">Regional Standard</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase block font-bold">1000-Kernel Weight</span>
                <span className="text-base font-bold text-slate-800 mt-1 block">
                  {report.harvestMetrics.thousandKernelWeightGrams} g
                </span>
                <span className="text-3xs text-slate-400">Plump test weight</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs text-slate-500 uppercase block font-bold">Grain Test Weight</span>
                <span className="text-base font-bold text-slate-800 mt-1 block">
                  {report.harvestMetrics.testWeightKgHl} kg/hL
                </span>
                <span className="text-3xs text-emerald-700">Export Class 1</span>
              </div>
            </div>
          </div>
        )}

        {/* Laboratory Quality Results */}
        {report.laboratoryMetrics && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              5. Certified Laboratory Grain Quality Metrics
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 font-mono">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-3xs text-slate-400 block">Crude Protein:</span>
                  <span className="font-bold text-slate-900">{report.laboratoryMetrics.proteinPercent}%</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block">Wet Gluten:</span>
                  <span className="font-bold text-slate-900">{report.laboratoryMetrics.wetGlutenPercent}%</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block">Sedimentation Index:</span>
                  <span className="font-bold text-slate-900">{report.laboratoryMetrics.sedimentationValueMl} mL</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block">Beta-Carotene:</span>
                  <span className="font-bold text-slate-900">{report.laboratoryMetrics.yellowPigmentPpm} ppm</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agronomist Assessment & Commercial Recommendation */}
        <div className="space-y-4 pt-2">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              6. Agronomist Assessment
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed mt-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200 italic">
              "{report.agronomistAssessment}"
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
              7. Commercial & Regulatory Recommendation
            </h3>
            <p className="text-xs font-bold text-emerald-900 bg-emerald-50/90 p-3.5 rounded-lg border border-emerald-200">
              {report.commercialRecommendation}
            </p>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-8 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <div className="h-10 border-b border-slate-300 flex items-end font-serif italic text-sm text-slate-700">
              Dr. Arvind Shrivastava
            </div>
            <span className="text-2xs text-slate-500 font-semibold block mt-1">
              Lead Scientific Agronomist • Phenotyping Committee
            </span>
          </div>

          <div>
            <div className="h-10 border-b border-slate-300 flex items-end font-serif italic text-sm text-slate-700">
              Dr. Ananya Sen
            </div>
            <span className="text-2xs text-slate-500 font-semibold block mt-1">
              Director of Plant Genetics • Certification Authority
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
