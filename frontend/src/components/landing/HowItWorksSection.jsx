// src/components/landing/HowItWorksSection.jsx
import React, { useState } from 'react';
import { CalendarCheck, ShieldAlert, Cpu, BarChart2, Award, ChevronRight } from 'lucide-react';

export const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Plan',
      subtitle: 'Protocol Setup & Experimental Design',
      icon: CalendarCheck,
      details:
        'Seed breeding R&D teams configure randomized complete block designs (RCBD) with replication plots, target genetic traits, and trial criteria across designated agro-climatic zones.'
    },
    {
      step: '02',
      title: 'Execute',
      subtitle: 'Farmer Assignment & Cadastral Verification',
      icon: ShieldAlert,
      details:
        'Certified seed lots are dispatched with tamper-evident barcodes to KYC-verified growers. Field plot perimeters are mapped via sub-meter satellite coordinates.'
    },
    {
      step: '03',
      title: 'Monitor',
      subtitle: 'Mobile Observation & Phenotyping Audit',
      icon: Cpu,
      details:
        'Field officers and agronomists perform scheduled emergence checks, NDVI canopy scans, and flowering metrics with offline-first outdoor mobile workflows.'
    },
    {
      step: '04',
      title: 'Analyze',
      subtitle: 'NIR Spectroscopy & Variance Modeling',
      icon: BarChart2,
      details:
        'Harvest composite grain samples are sealed and transferred under barcode custody to testing laboratories for protein, starch, and mycotoxin screening.'
    },
    {
      step: '05',
      title: 'Report',
      subtitle: 'Certified Release Dossier',
      icon: Award,
      details:
        'Automated ANOVA statistical engines generate certified trial dossiers with multi-signature R&D sign-off for commercial clearance and regulatory filing.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-3xs font-mono tracking-[0.16em] uppercase text-neutral-400">
            <span>03</span>
            <span className="w-4 h-px bg-neutral-600" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            A Seamless 5-Stage Scientific Architecture.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed pt-1">
            From initial parent cultivar genetics to final regulatory clearance, explore the structured lifecycle powering every verified AgroTraceX trial.
          </p>
        </div>

        {/* Horizontal Timeline Steps (Desktop & Mobile scrollable) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-8">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isSelected = activeStep === idx;

            return (
              <button
                key={st.title}
                onClick={() => setActiveStep(idx)}
                className={`ag-glass rounded-2xl p-5 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-white/40 bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,0.06)]'
                    : 'hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-neutral-400">
                    {st.step}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.04] text-neutral-400 border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">
                  {st.title}
                </h3>
                <p className="text-3xs text-neutral-400 mt-1 line-clamp-1 font-mono uppercase">
                  {st.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Panel */}
        <div className="ag-glass rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-3xs font-mono text-white">
                STAGE {steps[activeStep].step} OF 05
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {steps[activeStep].title}: {steps[activeStep].subtitle}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-1">
              {steps[activeStep].details}
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 font-mono text-xs transition-all cursor-pointer"
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
