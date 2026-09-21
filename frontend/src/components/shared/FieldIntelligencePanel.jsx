import React from 'react';
import { Activity, CloudRain, MapPin, Radio, Wifi } from 'lucide-react';

const sites = [
  { name: 'Khargone', x: '34%', y: '42%', status: 'active', label: '8 active' },
  { name: 'Ludhiana', x: '67%', y: '25%', status: 'attention', label: '2 review' },
  { name: 'Kopargaon', x: '54%', y: '67%', status: 'active', label: '6 active' },
  { name: 'Gauribidanur', x: '45%', y: '82%', status: 'offline', label: 'offline' }
];

const statusStyles = {
  active: 'bg-[#6f8b50] ring-[#dce8d1]',
  attention: 'bg-[#b4863c] ring-[#fbf1d9]',
  offline: 'bg-[#9b987f] ring-[#f0ecdf]'
};

export const FieldIntelligencePanel = ({ className = '' }) => {
  return (
    <section className={`border border-slate-200/90 rounded-[10px] bg-[#fffdf7] shadow-xs overflow-hidden ${className}`}>
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900 leading-snug">Field Intelligence</h2>
            <span className="inline-flex items-center gap-1 text-2xs font-semibold uppercase tracking-[0.08em] text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Live
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">Trial site coverage and field activity across the active portfolio</p>
        </div>
        <span className="text-xs text-slate-500 flex items-center gap-1.5 whitespace-nowrap">
          <Wifi className="w-3.5 h-3.5 text-emerald-700" /> Last sync 2 min ago
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.45fr_1fr]">
        <div className="relative min-h-[248px] bg-[#eef1e7] overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-100">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 640 300" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 65 C90 28 150 102 248 68 S418 22 640 66" fill="none" stroke="#d5ddc9" strokeWidth="18" opacity="0.65" />
            <path d="M-20 218 C90 170 160 252 286 205 S490 176 670 230" fill="none" stroke="#d5ddc9" strokeWidth="28" opacity="0.65" />
            <path d="M70 0 C112 78 94 148 132 300 M330 0 C302 78 366 148 338 300 M548 0 C508 96 570 168 520 300" fill="none" stroke="#d9e1ce" strokeWidth="2" strokeDasharray="6 8" />
            <path d="M0 138 C105 114 172 165 272 136 S460 104 640 148" fill="none" stroke="#c1cfb1" strokeWidth="2" />
          </svg>
          <div className="absolute top-4 left-5 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <MapPin className="w-4 h-4 text-[#556D3F]" /> 62 trial sites mapped
          </div>
          {sites.map((site) => (
            <div key={site.name} className="absolute group" style={{ left: site.x, top: site.y }}>
              <span className={`block w-4 h-4 rounded-full ring-4 ${statusStyles[site.status]} shadow-sm`} />
              <div className="absolute left-5 -top-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none bg-[#20291f] text-white px-2 py-1 rounded text-2xs shadow-lg">
                <span className="font-semibold">{site.name}</span> <span className="text-slate-300">{site.label}</span>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-5 flex items-center gap-3 text-2xs text-slate-600 bg-[#fffdf7]/85 border border-slate-200 rounded px-2.5 py-1.5">
            <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#6f8b50]" /> Active</span>
            <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#b4863c]" /> Attention</span>
            <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#9b987f]" /> Offline</span>
          </div>
        </div>

        <div className="p-5 grid grid-cols-2 gap-x-5 gap-y-5 content-center">
          <div>
            <span className="text-2xs uppercase tracking-[0.08em] font-semibold text-slate-500">Verified area</span>
            <strong className="block text-2xl font-bold text-slate-900 mt-1">34.6 <span className="text-sm font-semibold text-slate-500">Ha</span></strong>
          </div>
          <div>
            <span className="text-2xs uppercase tracking-[0.08em] font-semibold text-slate-500">Sites reporting</span>
            <strong className="block text-2xl font-bold text-slate-900 mt-1">58<span className="text-sm font-semibold text-slate-500">/62</span></strong>
          </div>
          <div className="flex items-start gap-2.5">
            <Activity className="w-4 h-4 text-emerald-700 mt-0.5" />
            <div><span className="text-2xs uppercase tracking-[0.08em] font-semibold text-slate-500">Today</span><strong className="block text-lg font-bold text-slate-900 mt-0.5">18 <span className="text-xs font-medium text-slate-500">observations</span></strong></div>
          </div>
          <div className="flex items-start gap-2.5">
            <Radio className="w-4 h-4 text-amber-600 mt-0.5" />
            <div><span className="text-2xs uppercase tracking-[0.08em] font-semibold text-slate-500">Pending action</span><strong className="block text-lg font-bold text-slate-900 mt-0.5">7 <span className="text-xs font-medium text-slate-500">items</span></strong></div>
          </div>
          <div className="col-span-2 flex items-center gap-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
            <CloudRain className="w-4 h-4 text-amber-600" /> 2 weather alerts affecting active sites
          </div>
        </div>
      </div>
    </section>
  );
};
