// src/components/landing/HowItWorksSection.jsx
import React, { useState } from 'react';
import {
  Building2,
  Cpu,
  Smartphone,
  Database,
  ShieldCheck,
  FileCheck2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Client',
      subtitle: 'Protocol Setup & Trial Commissioning',
      icon: Building2,
      summary: 'Agri-enterprise R&D configure target traits and randomized block designs.',
      details:
        'The seed enterprise or research institution initializes the trial protocol, assigning target genetic cultivars, control varieties, replication counts (RCBD), and approved agro-climatic target zones.'
    },
    {
      step: '02',
      title: 'AgroTraceX',
      subtitle: 'Central Intelligence & Geofence Matrix',
      icon: Cpu,
      summary: 'Automated barcode provisioning and satellite parcel boundary mapping.',
      details:
        'AgroTraceX generates cryptographic batch barcodes for germplasm packages, maps high-resolution cadastral boundary coordinates for verified farmer plots, and dispatches logistical manifests.'
    },
    {
      step: '03',
      title: 'Field Operations',
      subtitle: 'In-Situ Mobile Execution & Sowing',
      icon: Smartphone,
      summary: 'Offline-capable mobile phenotyping and timestamped emergence logging.',
      details:
        'Equipped with offline-first mobile devices, field officers oversee seed delivery, verify farmer parcel coordinates on-site, record precision planting dates, and capture geo-tagged emergence telemetry.'
    },
    {
      step: '04',
      title: 'Data',
      subtitle: 'Continuous Telemetry & Drone Sync',
      icon: Database,
      summary: 'NDVI canopy scans, micro-weather records, and sensor inputs.',
      details:
        'Multi-spectral UAV scans, local micro-meteorological sensor feeds, and standardized phenological stage assessments (V4-V12, silking, physiological maturity) are synchronized into immutable trial ledgers.'
    },
    {
      step: '05',
      title: 'Validation',
      subtitle: 'Agronomist Audit & NIR Lab Testing',
      icon: ShieldCheck,
      summary: 'Blind spectroscopy assays and multi-agronomist scientific verification.',
      details:
        'Accredited agronomists audit field plot compliance while harvest grain composites are dispatched in sealed chain-of-custody bags to certified spectroscopy laboratories for protein, moisture, and starch screening.'
    },
    {
      step: '06',
      title: 'Reports',
      subtitle: 'Certified Dossier & Release Clearance',
      icon: FileCheck2,
      summary: 'Cryptographically signed ANOVA dossiers for commercial regulatory filing.',
      details:
        'AgroTraceX compiles complete variance analyses, multi-location yield comparisons, and tamper-evident audit logs into certified regulatory dossiers signed off for commercial seed registration.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-3xs font-mono tracking-[0.16em] uppercase text-neutral-400">
            <span>04</span>
            <span className="w-4 h-px bg-neutral-600" />
            <span>OPERATIONAL PIPELINE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            How AgroTraceX Works.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed pt-1">
            An unbroken chain of scientific integrity connecting enterprise clients directly to verified harvest intelligence.
          </p>
        </div>

        {/* Linear Workflow Pathway Header */}
        <div className="mb-8 p-4 sm:p-5 ag-glass rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[720px] gap-2 font-mono text-xs">
            {steps.map((st, idx) => (
              <React.Fragment key={st.title}>
                <button
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-3xs opacity-60">{st.step}</span>
                  <span>{st.title}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isSelected = activeStep === idx;

            return (
              <button
                key={st.title}
                onClick={() => setActiveStep(idx)}
                className={`ag-glass rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-full ${
                  isSelected
                    ? 'border-white/40 bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.06)]'
                    : 'hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-3xs font-bold text-neutral-400">
                      {st.step}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
                        isSelected
                          ? 'bg-white text-black border-white'
                          : 'bg-white/[0.04] text-neutral-400 border-white/10'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {st.title}
                  </h3>
                  <p className="text-3xs text-neutral-400 mt-1 line-clamp-2 font-mono">
                    {st.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Panel */}
        <div className="ag-glass rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-3xs font-mono text-white">
                STAGE {steps[activeStep].step} OF 06
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {steps[activeStep].title}: {steps[activeStep].subtitle}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
              {steps[activeStep].details}
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto shrink-0 font-mono">
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 text-xs transition-all cursor-pointer"
            >
              <span>Next Stage</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
