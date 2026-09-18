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
  ChevronRight,
  CheckCircle2
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
    label: 'Verified Farmer',
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
    label: 'Crop Monitoring',
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
    <div className={`bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            End-to-End Trial Traceability Pipeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable chain of custody connecting seed genetics, field execution, and lab results
          </p>
        </div>
        <span className="text-2xs font-mono px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          Stage 7 of 11 Active
        </span>
      </div>

      {/* Horizontal Scrollable Step Nodes */}
      <div className="relative overflow-x-auto pb-3 pt-1 no-scrollbar">
        <div className="flex items-center min-w-[900px] justify-between relative px-2">
          {/* Connecting line */}
          <div className="absolute left-8 right-8 top-5 h-0.5 bg-slate-200 -z-0" />

          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = selectedStep.id === step.id;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className="relative z-10 flex flex-col items-center cursor-pointer group px-1"
                style={{ width: '90px' }}
              >
                {/* Node circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'ring-4 ring-emerald-500/25 scale-110 shadow-md'
                      : 'group-hover:scale-105'
                  } ${
                    isCompleted
                      ? 'bg-[#0F4A2A] text-white'
                      : isActive
                      ? 'bg-blue-600 text-white ring-4 ring-blue-400/30'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                {/* Node Label */}
                <span
                  className={`text-2xs font-bold text-center mt-2 leading-tight transition-colors ${
                    isSelected
                      ? 'text-[#0F4A2A]'
                      : isActive
                      ? 'text-blue-700 font-bold'
                      : 'text-slate-600'
                  }`}
                >
                  {step.label}
                </span>

                <span className="text-3xs text-slate-400 text-center truncate max-w-[85px] mt-0.5">
                  {step.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Box */}
      {selectedStep && (
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#0F4A2A] shrink-0">
              <selectedStep.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">{selectedStep.label}</h4>
                <span
                  className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${
                    selectedStep.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedStep.status === 'active'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {selectedStep.status === 'completed' ? 'Verified / Passed' : selectedStep.status === 'active' ? 'Current Active Step' : 'Scheduled'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">{selectedStep.desc}</p>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-500 shrink-0 self-end sm:self-center">
            Entity: <span className="font-semibold text-slate-800">{selectedStep.subtitle}</span>
          </div>
        </div>
      )}
    </div>
  );
};
