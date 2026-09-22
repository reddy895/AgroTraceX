// src/components/landing/ProductPreviewSection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Maximize2,
  ArrowRight,
  Wifi,
  Activity,
  Database,
  FlaskConical,
  Package,
  MapPin,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { mockTrials } from '../../data/trials';

export const ProductPreviewSection = () => {
  const [activeTab, setActiveTab] = useState('trials');

  return (
    <section id="platform" className="py-20 sm:py-28 border-t border-white/[0.08] relative">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl text-left space-y-3">
            <div className="inline-flex items-center gap-2 text-3xs font-mono tracking-[0.16em] uppercase text-neutral-400">
              <span>06</span>
              <span className="w-4 h-px bg-neutral-600" />
              <span>INTERACTIVE PRODUCT PREVIEW</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase leading-[1.05]">
              The High-End Scientific Terminal.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed pt-1">
              Experience the dark glassmorphic interface engineered for enterprise plant breeders, agronomists, and trial operators.
            </p>
          </div>

          <Link
            to="/platform"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] shrink-0 self-start lg:self-auto"
          >
            <span>Launch Live Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Large Floating Glass Panel Preview of the Terminal Window */}
        <div className="ag-glass rounded-3xl border border-white/20 p-4 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.03)] backdrop-blur-2xl">
          {/* Mock Window Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white/20 border border-white/30" />
                <span className="w-3 h-3 rounded-full bg-white/20 border border-white/30" />
                <span className="w-3 h-3 rounded-full bg-white/20 border border-white/30" />
              </div>
              <span className="text-neutral-400 text-3xs border-l border-white/10 pl-3">
                AGROTRACEX ENTERPRISE WORKSTATION • V2.4
              </span>
            </div>

            <div className="flex items-center gap-4 text-3xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-white" /> Khargone Telemetry Online
              </span>
              <span className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-white" /> 48 Active Multi-Loc Trials
              </span>
            </div>
          </div>

          {/* Quick Preview Header Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-3xs font-mono uppercase tracking-widest text-neutral-400">
                ACTIVE WORKSPACE PREVIEW
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Dr. Alok Verma — Khargone Field Trial Zone
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Novis AgroSciences Hybrid Maize (MZ-2026-X8) • Stage: Flowering (VT-R1)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/platform/trials"
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-3xs uppercase tracking-wider transition-all"
              >
                Inspect All Trials
              </Link>
            </div>
          </div>

          {/* 4 Mini Stat Blocks in Terminal */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-3xs font-mono uppercase tracking-widest text-neutral-400 block">
                Active Trials
              </span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">48</span>
              <span className="text-3xs font-mono text-neutral-400 mt-1 block">+12% vs last season</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-3xs font-mono uppercase tracking-widest text-neutral-400 block">
                Seed Lots
              </span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">28</span>
              <span className="text-3xs font-mono text-neutral-400 mt-1 block">96.2% avg. germ</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-3xs font-mono uppercase tracking-widest text-neutral-400 block">
                Trial Sites
              </span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">62</span>
              <span className="text-3xs font-mono text-neutral-400 mt-1 block">34.6 Ha verified</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <span className="text-3xs font-mono uppercase tracking-widest text-neutral-400 block">
                Certified Dossiers
              </span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">126</span>
              <span className="text-3xs font-mono text-neutral-400 mt-1 block">94.2% Passed GLP</span>
            </div>
          </div>

          {/* Recent Trials Table Preview */}
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.01]">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>LIVE SATELLITE PLOT REGISTRY</span>
              <Link to="/platform/trials" className="text-white hover:underline flex items-center gap-1">
                <span>View Complete Table</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-3xs font-mono uppercase tracking-wider text-neutral-400 bg-white/[0.02]">
                    <th className="px-4 py-3">Trial ID & Title</th>
                    <th className="px-4 py-3">Seed Lot</th>
                    <th className="px-4 py-3">Field Site</th>
                    <th className="px-4 py-3">Stage</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] text-neutral-300 font-mono">
                  {mockTrials.slice(0, 3).map((tr) => (
                    <tr key={tr.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-bold text-white block">{tr.id}</span>
                        <span className="text-neutral-400 text-3xs">{tr.crop} ({tr.variety})</span>
                      </td>
                      <td className="px-4 py-3">
                        <span>{tr.seedLotId}</span>
                        <span className="text-3xs text-neutral-500 block">Batch: {tr.seedLotBatch}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white block">{tr.fieldName}</span>
                        <span className="text-3xs text-neutral-400">{tr.location}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-3xs text-white">
                          {tr.currentStage}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/25 text-3xs">
                          {tr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
