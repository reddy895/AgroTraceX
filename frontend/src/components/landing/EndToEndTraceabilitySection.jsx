// src/components/landing/EndToEndTraceabilitySection.jsx
import React from 'react';
import {
  PackageCheck,
  MapPin,
  Eye,
  TestTube,
  Microscope,
  FileCheck2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SeedToResultJourney } from '../shared/SeedToResultJourney';

export const EndToEndTraceabilitySection = () => {
  const steps = [
    { label: 'Seed', icon: PackageCheck, desc: 'Germplasm batch & seed lot purity certificate' },
    { label: 'Field', icon: MapPin, desc: 'Verified plot coordinates & geofenced boundaries' },
    { label: 'Observation', icon: Eye, desc: 'In-situ phenology audit & NDVI canopy scans' },
    { label: 'Sample', icon: TestTube, desc: 'Tamper-evident barcode bag with chain of custody' },
    { label: 'Lab', icon: Microscope, desc: 'NIR spectroscopy testing & chemical profiling' },
    { label: 'Report', icon: FileCheck2, desc: 'ANOVA statistical variance & certified dossier' }
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-3xs font-mono tracking-[0.16em] uppercase text-neutral-400">
            <span>05</span>
            <span className="w-4 h-px bg-neutral-600" />
            <span>END-TO-END TRACEABILITY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            Unbroken Scientific Chain of Custody.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed pt-1">
            Every parent cultivar is tracked through georeferenced fields, mobile phenotyping logs, sealed physical samples, and central spectroscopy laboratories without manual data intervention.
          </p>
        </div>

        {/* 6-step Flow Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={st.label}
                className="ag-glass rounded-2xl p-5 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-3xs font-mono text-neutral-500">0{i + 1}</span>
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">{st.label}</h4>
                  <p className="text-3xs text-neutral-400 mt-1.5 leading-relaxed">{st.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-4 pt-2 border-t border-white/[0.06] flex items-center justify-end text-neutral-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Interactive Traceability Pipeline Component */}
        <SeedToResultJourney />
      </div>
    </section>
  );
};
