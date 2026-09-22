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
  Droplets,
  Check
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
        <span className="font-mono font-bold text-xs text-white">{row.id}</span>
      )
    },
    {
      header: 'Harvest Batch & Type',
      key: 'harvestBatch',
      render: (row) => (
        <div className="text-xs">
          <span className="font-semibold text-neutral-200 block">{row.sampleType}</span>
          <span className="text-3xs text-neutral-500 font-mono">Batch: {row.harvestBatch}</span>
        </div>
      )
    },
    {
      header: 'Quantity',
      key: 'quantity',
      render: (row) => <span className="text-xs font-medium text-neutral-300 font-mono">{row.quantity}</span>
    },
    {
      header: 'Collection Date',
      key: 'collectionDate',
      render: (row) => (
        <div className="text-xs font-mono">
          <span className="text-neutral-200 block">{row.collectionDate}</span>
          <span className="text-3xs text-neutral-500">By: {row.collectedBy}</span>
        </div>
      )
    },
    {
      header: 'Assigned Lab',
      key: 'testingLab',
      render: (row) => (
        <span className="text-xs text-neutral-300 truncate max-w-[150px] block">
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
        <div className="text-3xs font-mono text-neutral-300 space-y-0.5">
          {row.results?.proteinContentPercent && <div>Protein: {row.results.proteinContentPercent}%</div>}
          {row.results?.moistureContentPercent && <div>Moisture: {row.results.moistureContentPercent}%</div>}
          {row.results?.testResultStatus && (
            <span className="font-bold text-white">{row.results.testResultStatus}</span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Platform', to: '/platform' },
          { label: 'Trials', to: '/platform/trials' },
          { label: trial.id }
        ]}
      />

      {/* Flagship Header */}
      <div className="ag-glass rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-xs font-bold bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/20">
                {trial.id}
              </span>
              <StatusBadge status={trial.status} />
              <span className="text-xs text-neutral-400 font-mono">
                Seed Lot: <strong className="text-white">{trial.seedLotId}</strong>
              </span>
              <span className="text-xs text-neutral-600 hidden sm:inline">•</span>
              <span className="text-xs text-neutral-300 font-medium">{trial.companyName}</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              {trial.crop}: <span className="text-neutral-300 font-normal">({trial.variety})</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-3xl leading-relaxed">
              {trial.title}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-auto">
            <Button
              variant="outline"
              size="sm"
              icon={Camera}
              onClick={() => navigate('/platform/observations')}
            >
              Add Observation
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={TestTube}
              onClick={() => navigate('/platform/samples')}
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

        {/* Big Visual Progress Stepper (11 Stages in Monochrome) */}
        <div className="mt-8 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
              11-Stage Agronomic Protocol Lifecycle
            </span>
            <span className="font-bold text-white">
              Current: <span className="text-white underline">{trial.currentStage}</span> ({trial.progressPercentage}%)
            </span>
          </div>

          {/* Horizontal Stage Stepper */}
          <div className="overflow-x-auto pb-4 pt-2 no-scrollbar">
            <div className="flex items-center min-w-[880px] justify-between relative px-2">
              <div className="absolute left-6 right-6 top-4 h-px bg-white/15 -z-0" />

              {TRIAL_STAGES.map((st) => {
                const isCompleted = st.order < trial.currentStageOrder || trial.status === 'Completed';
                const isCurrent = st.order === trial.currentStageOrder && trial.status !== 'Completed';
                const isSelected = selectedTimelineStage === st.name;

                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedTimelineStage(st.name)}
                    className="relative z-10 flex flex-col items-center cursor-pointer group"
                    style={{ width: '78px' }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-200 ${
                        isCompleted
                          ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                          : isCurrent
                          ? 'bg-white text-black border-2 border-white shadow-[0_0_16px_rgba(255,255,255,0.6)] scale-110'
                          : 'bg-black border border-neutral-700 text-neutral-500'
                      } ${isSelected ? 'ring-2 ring-white' : ''}`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-black stroke-[3]" />
                      ) : (
                        <span>{st.order}</span>
                      )}
                    </div>

                    <span
                      className={`text-3xs font-mono font-bold text-center mt-2 leading-tight ${
                        isCurrent
                          ? 'text-white font-extrabold'
                          : isCompleted
                          ? 'text-neutral-300'
                          : 'text-neutral-500'
                      }`}
                    >
                      {st.name}
                    </span>

                    {isCurrent && (
                      <span className="mt-1 px-1.5 py-0.2 bg-white/20 text-white rounded-full text-3xs font-mono font-semibold">
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
      <div className="flex items-center gap-1 border-b border-white/[0.08] overflow-x-auto no-scrollbar">
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
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer relative ${
              activeTab === tab.id
                ? 'text-white font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_#ffffff] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Plot */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 8 Overview Key Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="ag-glass p-4 rounded-xl border border-white/10">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-white" />
                Seed Lot
              </span>
              <span className="font-mono font-bold text-sm text-white mt-1 block">
                {trial.seedLotId}
              </span>
              <span className="text-3xs text-neutral-400 mt-0.5 block font-mono">Batch: {trial.seedLotBatch}</span>
            </div>

            <div className="ag-glass p-4 rounded-xl border border-white/10">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-white" />
                Verified Farmer
              </span>
              <span className="font-bold text-sm text-white mt-1 block truncate">
                {trial.farmerName}
              </span>
              <span className="text-3xs text-neutral-300 font-mono mt-0.5 block">
                ★ 4.9 KYC Compliant
              </span>
            </div>

            <div className="ag-glass p-4 rounded-xl border border-white/10">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-white" />
                Field Plot & Area
              </span>
              <span className="font-bold text-sm text-white mt-1 block truncate">
                {field.name}
              </span>
              <span className="text-3xs text-neutral-400 mt-0.5 block font-mono">
                {trial.trialAreaHa} Ha ({field.soilType.split(' ')[0]})
              </span>
            </div>

            <div className="ag-glass p-4 rounded-xl border border-white/10">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-white" />
                Lead Agronomist
              </span>
              <span className="font-bold text-sm text-white mt-1 block truncate">
                {trial.agronomistName}
              </span>
              <span className="text-3xs text-neutral-400 mt-0.5 block font-mono">IARI Ph.D. Phenotyper</span>
            </div>

            <div className="ag-glass p-4 rounded-xl border border-white/10">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-white" />
                Field Officer
              </span>
              <span className="font-bold text-sm text-white mt-1 block truncate">
                {trial.fieldOfficerName}
              </span>
              <span className="text-3xs text-neutral-400 mt-0.5 block font-mono">Sub-meter GPS Active</span>
            </div>

            <div className="ag-glass p-4 rounded-xl border border-white/10">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-white" />
                Start & Sowing Date
              </span>
              <span className="font-mono font-bold text-sm text-white mt-1 block">
                {trial.sowingDate}
              </span>
              <span className="text-3xs text-neutral-400 mt-0.5 block font-mono">Initiated: {trial.startDate}</span>
            </div>

            <div className="ag-glass p-4 rounded-xl border border-white/10">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-white" />
                Expected Harvest
              </span>
              <span className="font-mono font-bold text-sm text-white mt-1 block">
                {trial.expectedHarvest}
              </span>
              <span className="text-3xs text-neutral-400 mt-0.5 block font-mono">140-day target</span>
            </div>

            <div className="ag-glass p-4 rounded-xl border border-white/10">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400 block flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
                Target Yield
              </span>
              <span className="font-bold text-sm text-white mt-1 block font-mono">
                {trial.targetYieldTonnesHa} MT / Ha
              </span>
              <span className="text-3xs text-neutral-300 mt-0.5 block font-mono">+18% vs check</span>
            </div>
          </div>

          {/* Interactive Field Information & Satellite Plot Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white" />
                  Geofenced Field Plot & GPS Verification
                </h3>
                <span className="text-3xs font-mono text-neutral-400 bg-white/10 px-2 py-0.5 rounded">
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
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-white" />
                Scientific Protocol Specifications
              </h3>

              <Card>
                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-3xs font-mono uppercase font-bold text-neutral-400 block">
                      Experimental Design Layout
                    </span>
                    <span className="font-semibold text-white mt-0.5 block">
                      {trial.designType}
                    </span>
                    <p className="text-3xs font-mono text-neutral-400 mt-0.5">
                      3 Replications (R1, R2, R3) + 4 Irrigation Stress Treatment Regimes
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <span className="text-3xs font-mono uppercase font-bold text-neutral-400 block">
                      Soil Nutrient Baseline (Soil Health Card 2026)
                    </span>
                    <div className="grid grid-cols-3 gap-2 mt-1.5 font-mono text-3xs">
                      <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06]">
                        <span className="text-neutral-500 block">pH</span>
                        <span className="font-bold text-white">7.2 (Optimal)</span>
                      </div>
                      <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06]">
                        <span className="text-neutral-500 block">OC%</span>
                        <span className="font-bold text-white">0.68%</span>
                      </div>
                      <div className="bg-white/[0.03] p-2 rounded-lg border border-white/[0.06]">
                        <span className="text-neutral-500 block">N-P-K</span>
                        <span className="font-bold text-white">210-24-380</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <span className="text-3xs font-mono uppercase font-bold text-neutral-400 block">
                      Scientific Objective
                    </span>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.06]">
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
              <h3 className="text-base font-bold text-white">
                Agronomic Observations Timeline
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Scientific field visits logged with GPS verification, canopy metrics, and photo evidence
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => navigate('/platform/observations')}
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
              <h3 className="text-base font-bold text-white">Trial Photographic Audit Gallery</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Geotagged photographic evidence across phenological stages
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
              {allPhotos.length} Photos Archived
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allPhotos.map((photo, pIdx) => (
              <div
                key={photo.id || pIdx}
                onClick={() => handleOpenLightbox(allPhotos, pIdx)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-4/3 cursor-pointer hover:border-white/40 transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-3xs font-mono font-semibold text-neutral-300 uppercase tracking-wider">
                    {photo.stage}
                  </span>
                  <h5 className="text-xs font-semibold text-white truncate mt-0.5">
                    {photo.caption}
                  </h5>
                  <span className="text-3xs font-mono text-neutral-400 mt-0.5">{photo.timestamp}</span>
                </div>
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Trial Analytics & Growth Curves in Monochrome */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chart 1: Plant Height Progression Curve in Monochrome */}
            <Card
              title="Plant Height Progression Curve"
              subtitle="Daily elongation trajectory vs cultivar expected benchmark"
            >
              <div className="h-64 flex flex-col justify-between pt-2">
                <div className="relative w-full h-48">
                  <svg className="w-full h-full" viewBox="0 0 400 160">
                    <line x1="40" y1="20" x2="380" y2="20" stroke="#222222" strokeWidth="1" />
                    <line x1="40" y1="60" x2="380" y2="60" stroke="#222222" strokeWidth="1" />
                    <line x1="40" y1="100" x2="380" y2="100" stroke="#222222" strokeWidth="1" />
                    <line x1="40" y1="140" x2="380" y2="140" stroke="#333333" strokeWidth="1" />

                    {/* Benchmark curve (dashed gray) */}
                    <path
                      d="M 50 135 Q 150 110, 250 50 T 360 30"
                      fill="none"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Actual Trial curve (solid white) */}
                    <path
                      d="M 50 138 Q 150 100, 250 38 T 360 22"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />

                    <circle cx="50" cy="138" r="4" fill="#ffffff" />
                    <circle cx="150" cy="100" r="4" fill="#ffffff" />
                    <circle cx="250" cy="38" r="4" fill="#ffffff" />
                    <circle cx="360" cy="22" r="5" fill="#ffffff" stroke="#000000" strokeWidth="2" />

                    <text x="330" y="15" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">218 cm</text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-3xs font-mono text-neutral-500 border-t border-white/[0.08] pt-2 px-6">
                  <span>Day 10 (VE)</span>
                  <span>Day 40 (V6)</span>
                  <span>Day 80 (V12)</span>
                  <span>Day 115 (VT-R1)</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-white rounded-full" />
                  <span className="text-white font-semibold">Observed Elongation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-neutral-600 rounded-full border-dashed" />
                  <span className="text-neutral-400">Regional Standard Check</span>
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
                    <line x1="40" y1="20" x2="380" y2="20" stroke="#222222" strokeWidth="1" />
                    <line x1="40" y1="60" x2="380" y2="60" stroke="#222222" strokeWidth="1" />
                    <line x1="40" y1="100" x2="380" y2="100" stroke="#222222" strokeWidth="1" />
                    <line x1="40" y1="140" x2="380" y2="140" stroke="#333333" strokeWidth="1" />

                    {/* Area fill under curve */}
                    <polygon
                      points="50,140 50,120 160,80 260,35 360,25 360,140"
                      fill="rgba(255, 255, 255, 0.05)"
                    />

                    {/* NDVI Line (white) */}
                    <path
                      d="M 50 120 L 160 80 L 260 35 L 360 25"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />

                    <circle cx="50" cy="120" r="4" fill="#ffffff" />
                    <circle cx="160" cy="80" r="4" fill="#ffffff" />
                    <circle cx="260" cy="35" r="4" fill="#ffffff" />
                    <circle cx="360" cy="25" r="5" fill="#ffffff" stroke="#000000" strokeWidth="2" />

                    <text x="330" y="16" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">0.84 NDVI</text>
                  </svg>
                </div>

                <div className="flex items-center justify-between text-3xs font-mono text-neutral-500 border-t border-white/[0.08] pt-2 px-6">
                  <span>Emergence (0.28)</span>
                  <span>V6 (0.54)</span>
                  <span>V10 (0.79)</span>
                  <span>Silking (0.84)</span>
                </div>
              </div>
              <div className="text-center mt-3 text-xs font-mono text-neutral-400">
                Peak vegetative density achieved with <strong className="text-white">88% ground canopy closure</strong>.
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
              <h3 className="text-base font-bold text-white">
                Physical Harvest & Laboratory Testing Samples
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Barcoded samples tracked through central seed testing and NIR spectroscopy
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={TestTube}
              onClick={() => navigate('/platform/samples')}
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
          <div className="ag-glass rounded-2xl p-6 sm:p-7 border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-3xs font-mono font-bold bg-white/10 text-white border border-white/20">
                    Official Trial Dossier
                  </span>
                  <span className="font-mono text-3xs text-neutral-400">
                    Doc ID: AGX-CERT-2026-084
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">
                  Agronomic Evaluation & Certification Dossier
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
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
                  Download (PDF)
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/platform/reports/${linkedReport?.id || 'REP-2026-065'}`)}
                  icon={ExternalLink}
                  iconPosition="right"
                >
                  Full Scientific View
                </Button>
              </div>
            </div>

            {/* Formal Report Layout Preview */}
            <div className="mt-6 space-y-6 text-xs text-neutral-300">
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                <div>
                  <span className="text-3xs text-neutral-500 block uppercase">Cultivar</span>
                  <span className="font-bold text-white mt-0.5 block">{trial.variety}</span>
                </div>
                <div>
                  <span className="text-3xs text-neutral-500 block uppercase">Seed Company</span>
                  <span className="font-bold text-white mt-0.5 block">{trial.companyName}</span>
                </div>
                <div>
                  <span className="text-3xs text-neutral-500 block uppercase">Lead Agronomist</span>
                  <span className="font-bold text-white mt-0.5 block">{trial.agronomistName}</span>
                </div>
                <div>
                  <span className="text-3xs text-neutral-500 block uppercase">Certification Status</span>
                  <span className="font-bold text-white mt-0.5 block">Approved (94.2 Score)</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  1. Executive Evaluation Summary
                </h4>
                <p className="leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
                  Trial {trial.id} demonstrates significant drought-tolerance superiority for hybrid maize cultivar {trial.variety}. Anthesis-silking synchrony (ASI 1.8 days) was maintained under 30% regulated deficit irrigation, achieving a projected yield advantage of +18% over the commercial Pioneer benchmark.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  2. Agronomist Verification Assessment
                </h4>
                <p className="leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
                  "Stand uniformity, root anchor depth in black clay vertisols, and stay-green leaf longevity under mid-season heat stress met all required Class-1 release parameters. Zero lodging was observed across all replications."
                  <span className="block mt-2 font-bold text-white font-mono text-3xs">
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
