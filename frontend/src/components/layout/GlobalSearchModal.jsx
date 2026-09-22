// src/components/layout/GlobalSearchModal.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import {
  Search,
  X,
  FlaskConical,
  Package,
  Users,
  MapPin,
  Building2,
  TestTube,
  CornerDownLeft
} from 'lucide-react';
import { mockTrials } from '../../data/trials';
import { mockSeedLots } from '../../data/seedLots';
import { mockFarmers } from '../../data/farmers';
import { mockFields } from '../../data/fields';
import { mockCompanies } from '../../data/companies';
import { mockSamples } from '../../data/samples';

export const GlobalSearchModal = () => {
  const { isOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const trials = mockTrials
      .filter((t) => t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.crop.toLowerCase().includes(q))
      .slice(0, 3)
      .map((t) => ({ id: t.id, title: `${t.id} - ${t.crop} (${t.variety})`, subtitle: t.companyName, link: `/platform/trials/${t.id}`, type: 'Trials', icon: FlaskConical }));

    const seedLots = mockSeedLots
      .filter((s) => s.id.toLowerCase().includes(q) || s.variety.toLowerCase().includes(q) || s.crop.toLowerCase().includes(q))
      .slice(0, 3)
      .map((s) => ({ id: s.id, title: `${s.id} - ${s.variety}`, subtitle: `${s.crop} • Batch ${s.batchNumber}`, link: `/platform/seed-lots`, type: 'Seed Lots', icon: Package }));

    const farmers = mockFarmers
      .filter((f) => f.name.toLowerCase().includes(q) || f.location.toLowerCase().includes(q) || f.id.toLowerCase().includes(q))
      .slice(0, 3)
      .map((f) => ({ id: f.id, title: f.name, subtitle: `${f.location} • ${f.totalLandHa} Ha`, link: `/platform/farmers`, type: 'Farmers', icon: Users }));

    const fields = mockFields
      .filter((fl) => fl.id.toLowerCase().includes(q) || fl.name.toLowerCase().includes(q) || fl.location.toLowerCase().includes(q))
      .slice(0, 3)
      .map((fl) => ({ id: fl.id, title: `${fl.id}: ${fl.name}`, subtitle: `${fl.areaHa} Ha • ${fl.soilType}`, link: `/platform/fields`, type: 'Fields', icon: MapPin }));

    const companies = mockCompanies
      .filter((c) => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q))
      .slice(0, 2)
      .map((c) => ({ id: c.id, title: c.name, subtitle: c.industry, link: `/platform/companies`, type: 'Companies', icon: Building2 }));

    const samples = mockSamples
      .filter((sm) => sm.id.toLowerCase().includes(q) || sm.crop.toLowerCase().includes(q) || sm.harvestBatch.toLowerCase().includes(q))
      .slice(0, 2)
      .map((sm) => ({ id: sm.id, title: `${sm.id} (${sm.crop})`, subtitle: `${sm.currentStage} • ${sm.testingLab}`, link: `/platform/samples`, type: 'Samples', icon: TestTube }));

    const grouped = [];
    if (trials.length) grouped.push({ category: 'Trials', items: trials });
    if (seedLots.length) grouped.push({ category: 'Seed Lots', items: seedLots });
    if (farmers.length) grouped.push({ category: 'Farmers', items: farmers });
    if (fields.length) grouped.push({ category: 'Fields', items: fields });
    if (companies.length) grouped.push({ category: 'Companies', items: companies });
    if (samples.length) grouped.push({ category: 'Samples', items: samples });

    return grouped;
  }, [query]);

  const handleSelect = (link) => {
    closeSearch();
    setQuery('');
    navigate(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={closeSearch} />

      <div className="relative mx-auto max-w-2xl transform overflow-hidden rounded-2xl bg-[#0a0a0a]/95 shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all border border-white/15 backdrop-blur-2xl text-white">
        {/* Search input header */}
        <div className="relative flex items-center border-b border-white/10 px-4 py-3.5">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trials, seed lots, farmers, fields, companies..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-neutral-500 focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-white mr-2 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline text-3xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/15">
            ESC
          </span>
        </div>

        {/* Results area */}
        <div className="max-h-96 overflow-y-auto p-4">
          {!query.trim() && (
            <div className="py-8 text-center text-xs text-neutral-400 font-mono">
              <p>Type to search across all AgroTraceX entities...</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {['Maize', 'TR-2026', 'Rameshwar', 'Novis'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-3xs transition-colors cursor-pointer"
                  >
                    Try "{term}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results && results.length === 0 && (
            <div className="py-10 text-center text-xs font-mono text-neutral-400">
              No results found for "<span className="font-semibold text-white">{query}</span>"
            </div>
          )}

          {query.trim() && results && results.length > 0 && (
            <div className="space-y-4">
              {results.map((group) => (
                <div key={group.category}>
                  <div className="text-3xs font-mono font-bold uppercase tracking-wider text-neutral-500 px-2 mb-1.5">
                    {group.category}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item.link)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/15 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 rounded-lg bg-white/5 text-neutral-300 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-white truncate">
                                {item.title}
                              </div>
                              <div className="text-3xs font-mono text-neutral-400 truncate">{item.subtitle}</div>
                            </div>
                          </div>
                          <CornerDownLeft className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0 ml-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white/[0.02] px-4 py-2.5 border-t border-white/10 flex items-center justify-between text-3xs font-mono text-neutral-500">
          <span>Search entity registry with instant jump</span>
          <div className="flex items-center gap-3">
            <span>Press Enter to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
