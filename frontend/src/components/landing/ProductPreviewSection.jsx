// src/components/landing/ProductPreviewSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const ProductPreviewSection = () => {

  return (
    <section id="platform" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl text-left space-y-2.5">
            <div className="inline-flex items-center gap-2 text-3xs font-mono tracking-[0.16em] uppercase text-neutral-400">
              <span>06</span>
              <span className="w-4 h-px bg-neutral-600" />
              <span>LIVE TRIAL WORKSPACE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              Real-Time Field Intelligence.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed">
              Track crop phenology, GPS-verified acreage, and certified harvest dossiers from a unified live console.
            </p>
          </div>

          <Link
            to="/platform"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] shrink-0 self-start lg:self-auto"
          >
            <span>Launch Live Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Large Floating Glass Panel Preview of the Terminal Window */}
        <div className="ag-glass rounded-3xl border border-white/20 p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-2xl">
          {/* Mock Window Top Bar */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/30" />
              </div>
              <span className="text-neutral-400 text-xs border-l border-white/10 pl-3">
                AgroTraceX Trial Console
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-300">Live Telemetry Active</span>
            </div>
          </div>

          {/* Clean Station Banner */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Khargone Field Trial Station
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Multi-location hybrid performance monitoring • Kharif Season
              </p>
            </div>

            <Link
              to="/platform/trials"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium transition-all self-start sm:self-auto"
            >
              <span>Inspect All Trials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Clean Metric Blocks */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-xs text-neutral-400 block font-medium">
                Active Trials
              </span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">48</span>
              <span className="text-3xs text-neutral-500 mt-0.5 block">Across 14 regions</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-xs text-neutral-400 block font-medium">
                Verified Land
              </span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">34.6 Ha</span>
              <span className="text-3xs text-neutral-500 mt-0.5 block">62 GPS plots</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-xs text-neutral-400 block font-medium">
                Cultivars
              </span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">28</span>
              <span className="text-3xs text-neutral-500 mt-0.5 block">Maize, Rice, Cotton</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-xs text-neutral-400 block font-medium">
                Certified Dossiers
              </span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">126</span>
              <span className="text-3xs text-neutral-500 mt-0.5 block">100% GLP Verified</span>
            </div>
          </div>

          {/* Simplified, Clean Trials Table */}
          <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.01]">
            <div className="px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span className="font-medium text-neutral-300">Active Field Plots</span>
              <Link to="/platform/trials" className="text-white hover:underline flex items-center gap-1 text-xs">
                <span>Full Registry</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-3xs font-mono uppercase tracking-wider text-neutral-400 bg-white/[0.02]">
                    <th className="px-4 py-2.5">Crop & Variety</th>
                    <th className="px-4 py-2.5">Location</th>
                    <th className="px-4 py-2.5">Growth Stage</th>
                    <th className="px-4 py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-neutral-300">
                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-white block">Hybrid Maize</span>
                      <span className="text-neutral-400 text-3xs">NA-GoldMax 901</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-300">
                      Khargone, MP
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-3xs text-white">
                        Flowering (VT-R1)
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-3xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        On Track
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-white block">Basmati Rice</span>
                      <span className="text-neutral-400 text-3xs">Aroma Plus</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-300">
                      Ludhiana, Punjab
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-3xs text-white">
                        Canopy Development
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-3xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        On Track
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-white block">Bt Cotton</span>
                      <span className="text-neutral-400 text-3xs">BollGuard Ultra</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-300">
                      Ahmednagar, MH
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-3xs text-white">
                        Boll Formation
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-3xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Review
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
