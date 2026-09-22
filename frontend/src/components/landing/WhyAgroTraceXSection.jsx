// src/components/landing/WhyAgroTraceXSection.jsx
import React from 'react';
import { Layers, ShieldCheck, Cpu, GitMerge, CheckCircle2 } from 'lucide-react';

export const WhyAgroTraceXSection = () => {
  const pillars = [
    {
      icon: GitMerge,
      title: 'Unified Stakeholder Chain',
      desc: 'Eliminate silos between seed R&D biotech companies, verified trial farmers, mobile field officers, and central spectroscopy labs.'
    },
    {
      icon: ShieldCheck,
      title: 'Cryptographic Chain of Custody',
      desc: 'Every seed packet barcode, germination certificate, and grain sample is georeferenced and timestamped with tamper-evident digital verification.'
    },
    {
      icon: Cpu,
      title: 'Real-Time Phenotype Telemetry',
      desc: 'Capture in-situ V4-R1 stage progression, NDVI canopy stress scans, and automated weather anomaly alerts directly from the field.'
    },
    {
      icon: Layers,
      title: 'Automated Regulatory Dossiers',
      desc: 'Transform raw multi-location trial data into ANOVA statistical variances, commercial clearance certificates, and certified release dossiers in seconds.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-3xs font-mono tracking-[0.16em] uppercase text-neutral-400">
            <span>02</span>
            <span className="w-4 h-px bg-neutral-600" />
            <span>WHY AGROTRACEX</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            Bridging the Agricultural Trial Divide.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed pt-1">
            Agricultural field trials are historically fragmented across farmers, agronomists, field officers, laboratories, and seed companies. AgroTraceX connects the entire chain into a single, tamper-evident intelligent system of record.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="ag-glass rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:border-white/30 group-hover:bg-white/[0.1] transition-all">
                    <Icon className="w-5 h-5 text-neutral-200" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-3xs font-mono text-neutral-500">
                  <span>PILLAR 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white group-hover:scale-125 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
