// src/components/landing/ImpactSection.jsx
import React from 'react';
import { ShieldCheck, TrendingUp, CheckCircle2, Globe, Building } from 'lucide-react';

export const ImpactSection = () => {
  const metrics = [
    { value: '34.6 Ha', label: 'Verified Trial Sites' },
    { value: '98.4%', label: 'Protocol Compliance' },
    { value: '1,174', label: 'Field Observations Logged' },
    { value: '193', label: 'Certified Lab Samples' }
  ];

  const partners = [
    { name: 'Novis AgroSciences', tag: 'Commercial Seed R&D' },
    { name: 'Corteva Agriscience', tag: 'Hybrid Genetics' },
    { name: 'Syngenta Seeds', tag: 'Field Trials' },
    { name: 'Bayer Crop Science', tag: 'Phenotype Verification' },
    { name: 'BASF Agricultural', tag: 'Chemical Trials' },
    { name: 'Mahyco Seeds', tag: 'Germplasm Research' }
  ];

  return (
    <section id="impact" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-3xs font-mono tracking-[0.16em] uppercase text-neutral-400">
            <span>06</span>
            <span className="w-4 h-px bg-neutral-600" />
            <span>GLOBAL & ENTERPRISE IMPACT</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            Verified Field Intelligence at Enterprise Scale.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed pt-1">
            Empowering global life-science leaders, state agricultural universities, and certified seed breeders with verifiable trial integrity.
          </p>
        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="ag-glass rounded-2xl p-6 sm:p-7 text-left border border-white/10 hover:border-white/25 transition-all"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
                {m.value}
              </div>
              <div className="text-3xs sm:text-2xs font-mono uppercase tracking-[0.12em] text-neutral-400 mt-2">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Seed Company Logos / Trust Grid */}
        <div className="ag-glass rounded-2xl p-8 border border-white/10">
          <div className="text-center max-w-lg mx-auto mb-8">
            <span className="text-3xs font-mono uppercase tracking-[0.16em] text-neutral-400">
              TRUSTED ACROSS SEED R&D AND REGULATORY INSTITUTIONS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05] transition-all text-center flex flex-col justify-center items-center h-24"
              >
                <span className="text-xs font-bold text-white tracking-tight">{p.name}</span>
                <span className="text-3xs font-mono text-neutral-500 mt-1">{p.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
