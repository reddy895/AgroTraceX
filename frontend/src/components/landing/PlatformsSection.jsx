// src/components/landing/PlatformsSection.jsx
import React from 'react';
import {
  FlaskConical,
  Package,
  Smartphone,
  Users,
  Stethoscope,
  TestTube,
  FileCheck2,
  BarChart3,
  ArrowRight
} from 'lucide-react';

export const PlatformsSection = () => {
  const platforms = [
    {
      title: 'Field Trials',
      category: 'EXPERIMENTAL PROTOCOLS',
      desc: 'Multi-location RCBD experimental designs with replication plots, phenological stage tracking, and scientific agronomist audits.',
      icon: FlaskConical,
      badge: 'Multi-Location RCBD'
    },
    {
      title: 'Seed Traceability',
      category: 'GERMPLASM CUSTODY',
      desc: 'Trace certified parent breeding cultivars, germination batch percentages, and drought-shield coating through immutable barcodes.',
      icon: Package,
      badge: 'Parent Lineage Barcodes'
    },
    {
      title: 'Field Operations',
      category: 'MOBILE IN-SITU LOGGING',
      desc: 'Outdoor high-contrast mobile workflow designed for offline synchronization, NDVI canopy scans, and sub-meter GPS boundary audits.',
      icon: Smartphone,
      badge: 'Offline GPS Geofencing'
    },
    {
      title: 'Farmers',
      category: 'GROWER RELATIONSHIPS',
      desc: 'KYC grower profiles, parcel lease tenure agreements, compensation tracking, and direct field telemetry integration.',
      icon: Users,
      badge: 'Verified Grower Registry'
    },
    {
      title: 'Agronomists',
      category: 'SCIENTIFIC VALIDATION',
      desc: 'Accredited cereal phenotypers and entomologists validating emergence rates, disease stress scores, and protocol fidelity.',
      icon: Stethoscope,
      badge: 'Phenotyping Oversight'
    },
    {
      title: 'Samples & Laboratory',
      category: 'SPECTROSCOPY & ANOVA',
      desc: 'Near-infrared spectroscopy quality testing with automated ANOVA statistical modeling and certified commercial clearance dossiers.',
      icon: TestTube,
      badge: 'Tamper-Evident Assays'
    },
    {
      title: 'Reports',
      category: 'CERTIFIED DOSSIERS',
      desc: 'Cryptographically signed multi-sign-off trial dossiers, variance reports, and regulatory compliance certificates ready for commercial release.',
      icon: FileCheck2,
      badge: 'Audit-Ready Release'
    },
    {
      title: 'Analytics',
      category: 'EXECUTIVE INTELLIGENCE',
      desc: 'Real-time financial and scientific telemetry terminal tracking zonal trial velocity, protocol compliance rates, and yield variance.',
      icon: BarChart3,
      badge: 'Zonal Telemetry Grid'
    }
  ];

  return (
    <section id="platforms" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl text-left space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-3xs font-mono tracking-[0.16em] uppercase text-neutral-400">
            <span>03</span>
            <span className="w-4 h-px bg-neutral-600" />
            <span>PLATFORM CAPABILITIES</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
            Core Agricultural Intelligence Platforms.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed pt-1">
            Eight synchronized operational capabilities engineered to manage high-stakes field trials from seed genetics to laboratory release dossiers.
          </p>
        </div>

        {/* 8 Platforms Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="ag-glass rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(255,255,255,0.04)] group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:border-white/40 group-hover:bg-white/[0.12] transition-all">
                      <Icon className="w-4 h-4 text-neutral-200 group-hover:text-white" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-3xs font-mono text-neutral-400 group-hover:text-neutral-200">
                      {p.badge}
                    </span>
                  </div>

                  <span className="text-3xs font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                    {p.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                  <span className="text-3xs uppercase tracking-wider">Enterprise Grade</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
