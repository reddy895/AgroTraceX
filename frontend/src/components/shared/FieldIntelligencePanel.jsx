import React from 'react';
import { Activity, CloudRain, MapPin, Radio, Wifi } from 'lucide-react';

const sites = [
  { name: 'Khargone', x: '34%', y: '42%', status: 'active', label: '8 active' },
  { name: 'Ludhiana', x: '67%', y: '25%', status: 'attention', label: '2 review' },
  { name: 'Kopargaon', x: '54%', y: '67%', status: 'active', label: '6 active' },
  { name: 'Gauribidanur', x: '45%', y: '82%', status: 'offline', label: 'offline' }
];

export const FieldIntelligencePanel = ({ className = '' }) => {
  return (
    <section className={`ag-glass rounded-2xl border border-white/10 overflow-hidden ${className}`}>
      <div className="px-6 py-5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold text-white tracking-tight leading-snug">Field Intelligence</h2>
            <span className="inline-flex items-center gap-1 text-3xs font-mono font-medium uppercase tracking-[0.08em] text-white bg-white/10 border border-white/20 rounded-full px-2.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Live Telemetry
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">Trial site coverage and sensor telemetry across the active portfolio</p>
        </div>
        <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5 whitespace-nowrap">
          <Wifi className="w-3.5 h-3.5 text-white" /> Last sync 2 min ago
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.45fr_1fr]">
        <div className="relative min-h-[260px] bg-[#050505] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08]">
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 640 300" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 65 C90 28 150 102 248 68 S418 22 640 66" fill="none" stroke="#555555" strokeWidth="18" opacity="0.65" />
            <path d="M-20 218 C90 170 160 252 286 205 S490 176 670 230" fill="none" stroke="#555555" strokeWidth="28" opacity="0.65" />
            <path d="M70 0 C112 78 94 148 132 300 M330 0 C302 78 366 148 338 300 M548 0 C508 96 570 168 520 300" fill="none" stroke="#444444" strokeWidth="1" strokeDasharray="6 8" />
            <path d="M0 138 C105 114 172 165 272 136 S460 104 640 148" fill="none" stroke="#888888" strokeWidth="2" />
          </svg>
          <div className="absolute top-4 left-5 flex items-center gap-2 text-xs font-mono text-neutral-300 bg-black/70 px-3 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-4 h-4 text-white" /> 62 trial sites mapped
          </div>
          {sites.map((site) => (
            <div key={site.name} className="absolute group" style={{ left: site.x, top: site.y }}>
              <span className="block w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] ring-4 ring-white/20" />
              <div className="absolute left-5 -top-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-black text-white px-2.5 py-1 rounded-lg border border-white/20 text-3xs font-mono shadow-xl">
                <span className="font-semibold text-white">{site.name}</span> <span className="text-neutral-400">({site.label})</span>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-5 flex items-center gap-3 text-3xs font-mono text-neutral-300 bg-black/80 border border-white/15 rounded-full px-3 py-1.5">
            <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white" /> Active</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neutral-400" /> Attention</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neutral-600" /> Offline</span>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-6 content-center bg-white/[0.01]">
          <div>
            <span className="text-3xs uppercase tracking-[0.1em] font-mono text-neutral-400">Verified area</span>
            <strong className="block text-2xl sm:text-3xl font-bold font-mono text-white mt-1">34.6 <span className="text-xs font-normal text-neutral-400">Ha</span></strong>
          </div>
          <div>
            <span className="text-3xs uppercase tracking-[0.1em] font-mono text-neutral-400">Sites reporting</span>
            <strong className="block text-2xl sm:text-3xl font-bold font-mono text-white mt-1">58<span className="text-xs font-normal text-neutral-400">/62</span></strong>
          </div>
          <div className="flex items-start gap-3">
            <Activity className="w-4 h-4 text-white mt-0.5" />
            <div>
              <span className="text-3xs uppercase tracking-[0.1em] font-mono text-neutral-400">Today</span>
              <strong className="block text-lg font-bold text-white mt-0.5">18 <span className="text-xs font-normal text-neutral-400">observations</span></strong>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Radio className="w-4 h-4 text-neutral-300 mt-0.5" />
            <div>
              <span className="text-3xs uppercase tracking-[0.1em] font-mono text-neutral-400">Pending action</span>
              <strong className="block text-lg font-bold text-white mt-0.5">7 <span className="text-xs font-normal text-neutral-400">items</span></strong>
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-2 text-xs font-mono text-neutral-400 border-t border-white/[0.08] pt-4">
            <CloudRain className="w-4 h-4 text-white" /> 2 weather alerts affecting active sites
          </div>
        </div>
      </div>
    </section>
  );
};
