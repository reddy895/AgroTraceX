// src/pages/Trials/TrialDetailsPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { InteractiveMap } from '../../components/shared/InteractiveMap';
import { ObservationCard } from '../../components/shared/ObservationCard';
import { Lightbox } from '../../components/ui/Lightbox';
import { Table } from '../../components/ui/Table';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { mockTrials, TRIAL_STAGES } from '../../data/trials';
import { mockObservations as initialObservations } from '../../data/observations';
import { mockSamples } from '../../data/samples';
import { mockFields } from '../../data/fields';
import { mockReports } from '../../data/reports';
import {
  CheckCircle2,
  Calendar,
  User,
  MapPin,
  Stethoscope,
  Smartphone,
  Package,
  Layers,
  FileCheck2,
  Download,
  Plus,
  Edit,
  TestTube,
  Camera,
  Activity,
  Ruler,
  TrendingUp,
  Maximize2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Droplets
} from 'lucide-react';

export const TrialDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { currentUser } = useAuth();

  // Find trial or default to the flagship TR-2026-084
  const trial = mockTrials.find((t) => t.id === id) || mockTrials[0];
  const field = mockFields.find((f) => f.id === trial.fieldId) || mockFields[0];
  const linkedReport = mockReports.find((r) => r.trialId === trial.id);

  // States
  const [observations, setObservations] = useState(() =>
    initialObservations.filter((o) => o.trialId === trial.id)
  );
  const [activeTab, setActiveTab] = useState('overview'); // overview | observations | photos | analytics | samples | report
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedTimelineStage, setSelectedTimelineStage] = useState(trial.currentStage);

  // Collect all photos across observations
  const allPhotos = observations.flatMap((o) => o.photos || []);

  const handleOpenLightbox = (photos, idx) => {
    setLightboxImages(photos);
    setLightboxIndex(idx);
    setIsLightboxOpen(true);
  };

  const handleValidateObservation = (obsId) => {
    setObservations((prev) =>
      prev.map((o) =>
        o.id === obsId
          ? {
              ...o,
              validationStatus: 'Validated',
              validatorName: currentUser.name,
              validationDate: 'Just now'
            }
          : o
      )
    );
    showToast(`Observation ${obsId} scientifically approved!`, 'success');
  };

  const handleGenerateReport = () => {
    showToast('Compiling statistical ANOVA & phenotypic dossier...', 'info');
    setTimeout(() => {
      showToast('Trial dossier AGX-CERT generated successfully!', 'success');
      setActiveTab('report');
    }, 800);
  };

  const handleDownloadReport = () => {
    showToast(`Exporting Trial Dossier for ${trial.id} (PDF)`, 'success');
  };

  const sampleColumns = [
    {
      header: 'Sample ID',
      key: 'id',
      render: (row) => (
        <span className="font-mono font-bold text-xs text-[#0F4A2A]">{row.id}</span>
      )
    },
    {
      header: 'Harvest Batch & Type',
      key: 'harvestBatch',
      render: (row) => (
        <div className="text-xs">
          <span className="font-semibold text-slate-800 block">{row.sampleType}</span>
          <span className="text-3xs text-slate-400 font-mono">Batch: {row.harvestBatch}</span>
        </div>
      )
    },
    {
      header: 'Quantity',
      key: 'quantity',
      render: (row) => <span className="text-xs font-medium text-slate-700">{row.quantity}</span>
    },
    {
      header: 'Collection Date',
      key: 'collectionDate',
      render: (row) => (
        <div className="text-xs">
          <span className="text-slate-800 block">{row.collectionDate}</span>
          <span className="text-3xs text-slate-400">By: {row.collectedBy}</span>
        </div>
      )
    },
    {
      header: 'Assigned Lab',
      key: 'testingLab',
      render: (row) => (
        <span className="text-xs text-slate-700 truncate max-w-[150px] block">
          {row.testingLab}
        </span>
      )
    },
    {
      header: 'Testing Status',
      key: 'testingStatus',
      render: (row) => <StatusBadge status={row.testingStatus} />
    },
    {
      header: 'Result Highlights',
      key: 'results',
      render: (row) => (
        <div className="text-3xs font-mono text-slate-600 space-y-0.5">
          {row.results?.proteinContentPercent && <div>Protein: {row.results.proteinContentPercent}%</div>}
          {row.results?.moistureContentPercent && <div>Moisture: {row.results.moistureContentPercent}%</div>}
          {row.results?.testResultStatus && (
            <span className="font-bold text-emerald-700">{row.results.testResultStatus}</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Trials', to: '/trials' },
          { label: trial.id }
        ]}
      />

      {/* Flagship Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-sm font-bold bg-emerald-50 text-[#0F4A2A] px-2.5 py-1 rounded-md border border-emerald-200">
                {trial.id}
              </span>
              <StatusBadge status={trial.status} />
              <span className="text-xs text-slate-500 font-mono">
                Seed Lot: <strong className="text-slate-800">{trial.seedLotId}</strong>
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">•</span>
              <span className="text-xs text-slate-600 font-medium">{trial.companyName}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {trial.crop}: <span className="text-[#0F4A2A]">{trial.variety}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {trial.title}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-auto">
            <Button
              variant="outline"
              size="sm"
              icon={Edit}
              onClick={() => showToast("Protocol edit locked to lead agronomist", "info")}
            >
              Edit Protocol
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Camera}
              onClick={() => navigate('/observations')}
            >
              Add Observation
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={TestTube}
              onClick={() => navigate('/samples')}
            >
              Add Sample
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={FileCheck2}
              onClick={handleGenerateReport}
            >
              Generate Report
            </Button>
          </div>
        </div>

        {/* Big Visual Progress Timeline (11 Stages) */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              11-Stage Agronomic Protocol Lifecycle
            </span>
            <span className="text-xs font-bold text-slate-800">
              Current Stage: <span className="text-[#0F4A2A]">{trial.currentStage}</span> ({trial.progressPercentage}%)
            </span>
          </div>

          {/* Horizontal Stage Stepper */}
          <div className="overflow-x-auto pb-4 pt-2 no-scrollbar">
            <div className="flex items-center min-w-[850px] justify-between relative px-2">
              <div className="absolute left-6 right-6 top-4 h-0.5 bg-slate-200 -z-0" />

              {TRIAL_STAGES.map((st) => {
                const isCompleted = st.order < trial.currentStageOrder || trial.status === 'Completed';
                const isCurrent = st.order === trial.currentStageOrder && trial.status !== 'Completed';
                const isSelected = selectedTimelineStage === st.name;

                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedTimelineStage(st.name)}
                    className="relative z-10 flex flex-col items-center cursor-pointer group"
                    style={{ width: '75px' }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                        isCompleted
                          ? 'bg-[#0F4A2A] text-white shadow-2xs'
                          : isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-110'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      } ${isSelected ? 'ring-2 ring-emerald-500' : ''}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      ) : (
                        <span>{st.order}</span>
                      )}
                    </div>

                    <span
                      className={`text-3xs font-bold text-center mt-2 leading-tight ${
                        isCurrent
                          ? 'text-blue-700 font-extrabold'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {st.name}
                    </span>

                    {isCurrent && (
                      <span className="mt-1 px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full text-3xs font-semibold">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Trial Overview & Plot' },
          { id: 'observations', label: `Observations (${observations.length})` },
          { id: 'photos', label: `Trial Photos (${allPhotos.length})` },
          { id: 'analytics', label: 'Trial Analytics & Curves' },
          { id: 'samples', label: 'Harvest & Lab Samples (1)' },
          { id: 'report', label: 'Technical Certification Dossier' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer relative ${
              activeTab === tab.id
                ? 'text-[#0F4A2A]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F4A2A] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Plot */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 8 Overview Key Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-[#0F4A2A]" />
                Registered Seed Lot
              </span>
              <span className="font-mono font-bold text-sm text-slate-900 mt-1 block">
                {trial.seedLotId}
              </span>
              <span className="text-3xs text-slate-500 mt-0.5 block">Batch: {trial.seedLotBatch}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Verified Farmer
              </span>
              <span className="font-bold text-sm text-slate-900 mt-1 block truncate">
                {trial.farmerName}
              </span>
              <span className="text-3xs text-emerald-700 font-medium mt-0.5 block">
                ★ 4.9 KYC Compliant
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Field Plot & Area
              </span>
              <span className="font-bold text-sm text-slate-900 mt-1 block truncate">
                {field.name}
              </span>
              <span className="text-3xs text-slate-500 mt-0.5 block">
                {trial.trialAreaHa} Hectares ({field.soilType.split(' ')[0]})
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                Lead Agronomist
              </span>
              <span className="font-bold text-sm text-slate-900 mt-1 block truncate">
                {trial.agronomistName}
              </span>
              <span className="text-3xs text-slate-500 mt-0.5 block">IARI Ph.D. Phenotyper</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                Field Officer
              </span>
              <span className="font-bold text-sm text-slate-900 mt-1 block truncate">
                {trial.fieldOfficerName}
              </span>
              <span className="text-3xs text-slate-500 mt-0.5 block">Sub-meter GPS Active</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Start & Sowing Date
              </span>
              <span className="font-mono font-bold text-sm text-slate-900 mt-1 block">
                {trial.sowingDate}
              </span>
              <span className="text-3xs text-slate-500 mt-0.5 block">Initiated: {trial.startDate}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Expected Harvest
              </span>
              <span className="font-mono font-bold text-sm text-slate-900 mt-1 block">
                {trial.expectedHarvest}
              </span>
              <span className="text-3xs text-slate-500 mt-0.5 block">140-day maturity target</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-3xs font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Target Yield
              </span>
              <span className="font-bold text-sm text-emerald-700 mt-1 block">
                {trial.targetYieldTonnesHa} MT / Ha
              </span>
              <span className="text-3xs text-slate-500 mt-0.5 block">+18% vs regional check</span>
            </div>
          </div>

          {/* Interactive Field Information & Satellite Plot Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0F4A2A]" />
                  Geofenced Field Plot & GPS Verification
                </h3>
                <span className="text-2xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {field.id}
                </span>
              </div>

              <InteractiveMap
                fieldName={field.name}
                location={field.location}
                gps="21.8234° N, 75.6189° E"
                areaHa={trial.trialAreaHa}
                soilType={field.soilType}
                irrigation={field.irrigation}
              />
            </div>

            {/* Protocol Layout & Soil Agronomics */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0F4A2A]" />
                Scientific Protocol Specifications
              </h3>

              <Card>
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-3xs uppercase font-bold text-slate-400 block">
                      Experimental Design Layout
                    </span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">
                      {trial.designType}
                    </span>
                    <p className="text-3xs text-slate-500 mt-0.5">
                      3 Replications (R1, R2, R3) + 4 Irrigation Stress Treatment Regimes
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-3xs uppercase font-bold text-slate-400 block">
                      Soil Nutrient Baseline (Soil Health Card 2026)
                    </span>
                    <div className="grid grid-cols-3 gap-2 mt-1.5 font-mono text-3xs">
                      <div className="bg-slate-50 p-2 rounded">
                        <span className="text-slate-400 block">pH</span>
                        <span className="font-bold text-slate-800">7.2 (Optimal)</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded">
                        <span className="text-slate-400 block">OC%</span>
                        <span className="font-bold text-slate-800">0.68%</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded">
                        <span className="text-slate-400 block">N-P-K</span>
                        <span className="font-bold text-slate-800">210-24-380</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-3xs uppercase font-bold text-slate-400 block">
                      Scientific Objective
                    </span>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                      {trial.protocolObjective}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Observations Timeline */}
      {activeTab === 'observations' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Agronomic Observations Timeline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Scientific field visits logged with GPS verification, canopy metrics, and photo evidence
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/observations')}
            >
              Record New Observation
            </Button>
          </div>

          <div className="space-y-4">
            {observations.map((obs) => (
              <ObservationCard
                key={obs.id}
                observation={obs}
                onPhotoClick={handleOpenLightbox}
                onValidate={handleValidateObservation}
                userRole={currentUser.role}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Trial Photos Gallery */}
      {activeTab === 'photos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Trial Photographic Audit Gallery</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                High-resolution geotagged photographic evidence across phenological stages
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
              {allPhotos.length} Photos Archived
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allPhotos.map((photo, pIdx) => (
              <div
                key={photo.id || pIdx}
                onClick={() => handleOpenLightbox(allPhotos, pIdx)}
                className="group relative rounded-xl overflow-hidden border border-slate-200 bg-black aspect-4/3 cursor-pointer shadow-xs hover:shadow-md hover:border-[#0F4A2A] transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-2xs font-semibold text-emerald-300 uppercase tracking-wider">
                    {photo.stage}
                  </span>
                  <h5 className="text-xs font-medium text-slate-100 truncate mt-0.5">
                    {photo.caption}
                  </h5>
                  <span className="text-3xs text-slate-400 mt-0.5">{photo.timestamp}</span>
                </div>
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Trial Analytics & Growth Curves */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart 1: Plant Height Progression Curve (cm) */}
            <Card
              title="Plant Height Progression Curve"
              subtitle="Daily elongation trajectory vs cultivar expected benchmark"
            >
              <div className="h-64 flex flex-col justify-between pt-2">
                {/* Visual SVG Line Chart */}
                <div className="relative w-full h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 160">
                    <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="140" x2="380" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Benchmark curve (dashed gray) */}
                    <path
                      d="M 50 135 Q 150 110, 250 50 T 360 30"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />

                    {/* Actual Trial TR-2026-084 curve (solid green) */}
                    <path
                      d="M 50 138 Q 150 100, 250 38 T 360 22"
                      fill="none"
                      stroke="#166534"
                      strokeWidth="3"
                    />

                    {/* Data Points */}
                    <circle cx="50" cy="138" r="4" fill="#166534" />
                    <circle cx="150" cy="100" r="4" fill="#166534" />
                    <circle cx="250" cy="38" r="4" fill="#166534" />
                    <circle cx="360" cy="22" r="5" fill="#166534" stroke="#ffffff" strokeWidth="2" />

                    <text x="340" y="15" fill="#166534" fontSize="10" fontWeight="bold">218 cm</text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-3xs font-mono text-slate-500 border-t border-slate-100 pt-2 px-6">
                  <span>Day 10 (VE)</span>
                  <span>Day 40 (V6)</span>
                  <span>Day 80 (V12)</span>
                  <span>Day 115 (VT-R1)</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-[#166534] rounded-full" />
                  <span className="font-semibold text-slate-800">NA-GoldMax 901 (Observed)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-slate-400 rounded-full border-dashed" />
                  <span className="text-slate-500">Regional Standard Check</span>
                </div>
              </div>
            </Card>

            {/* Chart 2: Canopy Coverage & NDVI Trend */}
            <Card
              title="NDVI Vegetative Index & Canopy Cover"
              subtitle="Multispectral camera vigor readings across trial dates"
            >
              <div className="h-64 flex flex-col justify-between pt-2">
                <div className="relative w-full h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 160">
                    <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="140" x2="380" y2="140" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Area fill under curve */}
                    <polygon
                      points="50,140 50,120 160,80 260,35 360,25 360,140"
                      fill="rgba(37, 99, 235, 0.1)"
                    />

                    {/* NDVI Line (blue) */}
                    <path
                      d="M 50 120 L 160 80 L 260 35 L 360 25"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />

                    <circle cx="50" cy="120" r="4" fill="#2563eb" />
                    <circle cx="160" cy="80" r="4" fill="#2563eb" />
                    <circle cx="260" cy="35" r="4" fill="#2563eb" />
                    <circle cx="360" cy="25" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />

                    <text x="340" y="16" fill="#2563eb" fontSize="10" fontWeight="bold">0.84 NDVI</text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-3xs font-mono text-slate-500 border-t border-slate-100 pt-2 px-6">
                  <span>Emergence (0.28)</span>
                  <span>V6 (0.54)</span>
                  <span>V10 (0.79)</span>
                  <span>Silking (0.84)</span>
                </div>
              </div>
              <div className="text-center mt-3 text-xs text-slate-600">
                Peak vegetative density achieved with <strong>88% ground canopy closure</strong>.
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 5: Harvest & Lab Samples */}
      {activeTab === 'samples' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Physical Harvest & Laboratory Testing Samples
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Barcoded samples tracked through central seed testing and NIR spectroscopy
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={TestTube}
              onClick={() => navigate('/samples')}
            >
              Open Custody Log
            </Button>
          </div>

          <Table
            columns={sampleColumns}
            data={mockSamples.filter((s) => s.trialId === trial.id || s.trialId === 'TR-2026-084')}
          />
        </div>
      )}

      {/* Tab 6: Technical Certification Dossier */}
      {activeTab === 'report' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Official Trial Dossier
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    Doc ID: AGX-CERT-2026-084
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  Agronomic Evaluation & Certification Dossier
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conducted under AgroTraceX GLP Scientific Field Trial Guidelines
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={handleDownloadReport}
                >
                  Download Dossier (PDF)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/reports/${linkedReport?.id || 'REP-2026-065'}`)}
                  icon={ExternalLink}
                  iconPosition="right"
                >
                  Full Scientific View
                </Button>
              </div>
            </div>

            {/* Formal Report Layout Preview */}
            <div className="mt-6 space-y-6 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                <div>
                  <span className="text-3xs text-slate-400 block uppercase">Cultivar</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{trial.variety}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block uppercase">Seed Company</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{trial.companyName}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block uppercase">Lead Agronomist</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{trial.agronomistName}</span>
                </div>
                <div>
                  <span className="text-3xs text-slate-400 block uppercase">Certification Status</span>
                  <span className="font-bold text-emerald-700 mt-0.5 block">Approved (94.2 Score)</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  1. Executive Evaluation Summary
                </h4>
                <p className="leading-relaxed bg-slate-50/70 p-3.5 rounded-lg border border-slate-100">
                  Trial {trial.id} demonstrates significant drought-tolerance superiority for hybrid maize cultivar {trial.variety}. Anthesis-silking synchrony (ASI 1.8 days) was maintained under 30% regulated deficit irrigation, achieving a projected yield advantage of +18% over the commercial Pioneer benchmark.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  2. Agronomist Verification Assessment
                </h4>
                <p className="leading-relaxed bg-slate-50/70 p-3.5 rounded-lg border border-slate-100">
                  "Stand uniformity, root anchor depth in black clay vertisols, and stay-green leaf longevity under mid-season heat stress met all required Class-1 release parameters. Zero lodging was observed across all replications."
                  <span className="block mt-2 font-bold text-slate-800">
                    — {trial.agronomistName}, Principal Agronomist
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Trial Photo Inspection */}
      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
};
