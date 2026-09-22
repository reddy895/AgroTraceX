// src/components/shared/SeedToResultJourney.jsx
import React, { useState } from 'react';
import {
  Building2,
  PackageCheck,
  FlaskConical,
  UserCheck,
  MapPin,
  Stethoscope,
  Eye,
  Scissors,
  TestTube,
  Microscope,
  FileCheck2,
  Check
} from 'lucide-react';

const JOURNEY_STEPS = [
  {
    id: 'company',
    label: 'Seed Company',
    subtitle: 'Novis AgroSciences',
    icon: Building2,
    status: 'completed',
    desc: 'Agri-science R&D initiates multi-location protocol with genetic target metrics.'
  },
  {
    id: 'seed_lot',
    label: 'Seed Lot',
    subtitle: 'LOT-MZ-2026-089',
    icon: PackageCheck,
    status: 'completed',
    desc: 'Certified seed lot with batch number, 96.2% germination, and drought-shield coating.'
  },
  {
    id: 'trial',
    label: 'Trial Protocol',
    subtitle: 'TR-2026-084',
    icon: FlaskConical,
    status: 'completed',
    desc: 'RCBD experimental design with 3 replications and 4 irrigation treatments.'
  },
  {
    id: 'farmer',
    label: 'Farmer',
    subtitle: 'Rameshwar Patel',
    icon: UserCheck,
    status: 'completed',
    desc: 'KYC & Aadhaar verified grower with 4.9 reliability rating and vertisol soil history.'
  },
  {
    id: 'field',
    label: 'Field Plot',
    subtitle: 'FLD-MP-042 (2.4 Ha)',
    icon: MapPin,
    status: 'completed',
    desc: 'Georeferenced boundary coordinates verified by Field Officer Shekhawat.'
  },
  {
    id: 'agronomist',
    label: 'Agronomist',
    subtitle: 'Dr. Arvind Shrivastava',
    icon: Stethoscope,
    status: 'completed',
    desc: 'Scientific trial oversight, phenology validation, and protocol audit.'
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    subtitle: 'Flowering / VT-R1',
    icon: Eye,
    status: 'active',
    desc: 'Periodic NDVI canopy scans, plant height (218cm), and ASI stress tracking.'
  },
  {
    id: 'harvest',
    label: 'Harvest',
    subtitle: 'Expected Oct 2026',
    icon: Scissors,
    status: 'pending',
    desc: 'Plot yield determination and 1000-kernel grain harvest weighing.'
  },
  {
    id: 'sample',
    label: 'Sample Custody',
    subtitle: 'SMP-2026-099',
    icon: TestTube,
    status: 'pending',
    desc: 'Tamper-evident sealed composite grain sample dispatched under barcode.'
  },
  {
    id: 'testing',
    label: 'Lab Testing',
    subtitle: 'Central Quality Lab',
    icon: Microscope,
    status: 'pending',
    desc: 'NIR spectroscopy for protein (10.4%), starch, and mycotoxin screening.'
  },
  {
    id: 'report',
    label: 'Final Report',
    subtitle: 'AGX Certification',
    icon: FileCheck2,
    status: 'pending',
    desc: 'ANOVA statistical dossier, R&D sign-off, and commercial release clearance.'
  }
];

export const SeedToResultJourney = ({ activeStepId = 'monitoring', className = '' }) => {
  const [selectedStep, setSelectedStep] = useState(
    JOURNEY_STEPS.find((s) => s.id === activeStepId) || JOURNEY_STEPS[6]
  );

  return (
    <div className={`ag-glass rounded-2xl p-6 sm:p-7 border border-white/10 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse" />
            End-to-End Trial Traceability Pipeline
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Immutable chain of custody connecting seed genetics, field execution, and lab results
          </p>
        </div>
        <span className="text-3xs font-mono px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 self-start sm:self-auto">
          STAGE 07 OF 11 ACTIVE
        </span>
      </div>

      {/* Horizontal Scrollable Step Nodes */}
      <div className="relative overflow-x-auto pb-4 pt-3 no-scrollbar">
        <div className="flex items-start min-w-[1020px] justify-between relative px-6">
          {/* Base Inactive Connecting Line */}
          <div className="absolute left-10 right-10 top-5 h-px bg-white/15" />
          {/* Active Completed Progress Line (from step 1 to step 7) */}
          <div
            className="absolute left-10 top-5 h-px bg-gradient-to-r from-white via-white to-white/80 transition-all duration-500"
            style={{ width: '58%' }}
          />

          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = selectedStep.id === step.id;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className="relative z-10 flex flex-col items-center cursor-pointer group px-1 select-none"
                style={{ width: '84px' }}
              >
                {/* Node Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-black'
                      : 'group-hover:scale-105'
                  } ${
                    isCompleted
                      ? 'bg-white text-black shadow-[0_0_14px_rgba(255,255,255,0.2)]'
                      : isActive
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.6)] ring-2 ring-white/60'
                      : 'bg-[#0c0d10] border border-white/20 text-neutral-400 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-black stroke-[3]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Index & Clean Title (Single aligned baseline, no bulky subtitles) */}
                <span className="text-[10px] font-mono text-neutral-500 mt-2.5">
                  0{idx + 1}
                </span>

                <span
                  className={`text-xs font-semibold text-center mt-0.5 leading-snug tracking-tight transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'text-white font-bold'
                      : isActive
                      ? 'text-white'
                      : isCompleted
                      ? 'text-neutral-200'
                      : 'text-neutral-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Box (Clean & Uncluttered) */}
      {selectedStep && (
        <div className="mt-5 p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white shrink-0 mt-0.5">
              <selectedStep.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h4 className="text-sm font-semibold text-white tracking-tight">{selectedStep.label}</h4>
                <span
                  className={`text-3xs font-mono px-2 py-0.5 rounded-md border ${
                    selectedStep.status === 'completed'
                      ? 'bg-white/5 text-neutral-300 border-white/15'
                      : selectedStep.status === 'active'
                      ? 'bg-white text-black font-semibold border-white shadow-[0_0_8px_rgba(255,255,255,0.25)]'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                  }`}
                >
                  {selectedStep.status === 'completed'
                    ? 'Verified'
                    : selectedStep.status === 'active'
                    ? 'In Progress'
                    : 'Scheduled'}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl leading-relaxed">{selectedStep.desc}</p>
            </div>
          </div>
          <div className="text-xs font-mono text-neutral-400 shrink-0 self-end sm:self-center bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.06]">
            Entity: <span className="text-white font-medium">{selectedStep.subtitle}</span>
          </div>
        </div>
      )}
    </div>
  );
};
