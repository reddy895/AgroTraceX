// src/pages/SeedLots/SeedLotsListPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Drawer } from '../../components/ui/Drawer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { SeedToResultJourney } from '../../components/shared/SeedToResultJourney';
import { mockSeedLots } from '../../data/seedLots';
import { mockTrials } from '../../data/trials';
import {
  Package,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sprout,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const SeedLotsListPage = () => {
  const [seedLots, setSeedLots] = useState(mockSeedLots);
  const [searchQuery, setSearchQuery] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);
  const navigate = useNavigate();

  const filteredLots = seedLots.filter((lot) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        lot.id.toLowerCase().includes(q) ||
        lot.variety.toLowerCase().includes(q) ||
        lot.crop.toLowerCase().includes(q) ||
        lot.batchNumber.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (cropFilter && lot.crop !== cropFilter) return false;
    return true;
  });

  const columns = [
    {
      header: 'Seed Lot ID & Batch',
      key: 'id',
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#0F4A2A] block">{row.id}</span>
          <span className="text-3xs text-slate-500 font-mono">Batch: {row.batchNumber}</span>
        </div>
      )
    },
    {
      header: 'Crop & Variety',
      key: 'crop',
      render: (row) => (
        <div>
          <span className="font-semibold text-xs text-slate-900 block">{row.crop}</span>
          <span className="text-3xs text-slate-600 block">{row.variety}</span>
        </div>
      )
    },
    {
      header: 'Company',
      key: 'companyName',
      render: (row) => (
        <span className="text-xs text-slate-800 font-medium truncate max-w-[150px] block">
          {row.companyName}
        </span>
      )
    },
    {
      header: 'Germination & Purity',
      key: 'germinationRate',
      render: (row) => (
        <div className="text-3xs font-mono text-slate-700 space-y-0.5">
          <div className="text-emerald-700 font-bold">Germ: {row.germinationRate}%</div>
          <div className="text-slate-500">Purity: {row.purityPercentage}%</div>
        </div>
      )
    },
    {
      header: 'Quantity',
      key: 'quantityKg',
      render: (row) => (
        <span className="font-mono text-xs text-slate-800 font-semibold">{row.quantityKg} kg</span>
      )
    },
    {
      header: 'Assigned Trials',
      key: 'assignedTrials',
      render: (row) => (
        <div className="flex items-center gap-1 flex-wrap">
          {row.assignedTrials.map((tId) => (
            <span
              key={tId}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/trials/${tId}`);
              }}
              className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 hover:text-[#0F4A2A] text-slate-700 font-mono text-3xs font-semibold cursor-pointer transition-colors"
            >
              {tId}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedLot(row);
          }}
        >
          Details
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Seed Lots' }]} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Seed Lots & Germplasm Traceability
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track certified breeding parent lots, genetic traits, and trial chain of custody.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setSelectedLot(seedLots[0])}
        >
          Register Seed Lot
        </Button>
      </div>

      {/* Visual Traceability Journey */}
      <SeedToResultJourney />

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search lot ID, variety, batch..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto">
          <Select
            className="w-full sm:w-48 text-xs"
            placeholder="All Crops"
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            options={['Hybrid Maize', 'Basmati Paddy / Rice', 'Bt Cotton', 'Soybean', 'Wheat (Durum)']}
          />
        </div>
      </div>

      {/* Seed Lots Table */}
      <Table
        columns={columns}
        data={filteredLots}
        onRowClick={(row) => setSelectedLot(row)}
      />

      {/* Seed Lot Profile & Journey Drawer */}
      <Drawer
        isOpen={Boolean(selectedLot)}
        onClose={() => setSelectedLot(null)}
        title={selectedLot?.variety}
        subtitle={`${selectedLot?.id} • ${selectedLot?.crop}`}
        width="max-w-xl"
        footer={
          <div className="flex items-center justify-between w-full">
            <span className="text-2xs font-mono text-slate-500">
              Cert: {selectedLot?.certificationId}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedLot(null)}
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedLot && (
          <div className="space-y-6 text-xs text-slate-700">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">
                  Batch Number
                </span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                  {selectedLot.batchNumber}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">
                  Germination Rate
                </span>
                <span className="font-mono font-bold text-emerald-700 mt-0.5 block">
                  {selectedLot.germinationRate}% (Tested)
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">
                  Physical Purity
                </span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                  {selectedLot.purityPercentage}%
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-400 block">
                  Available Quantity
                </span>
                <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                  {selectedLot.quantityKg} kg
                </span>
              </div>
            </div>

            {/* Genetic Traits & Seed Treatment */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Genetics & Chemical Treatment
              </h4>
              <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                <span className="text-3xs uppercase font-bold text-emerald-800 block">
                  Target Genetic Traits
                </span>
                <p className="font-medium text-emerald-900 mt-0.5">{selectedLot.geneticTraits}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-3xs uppercase font-bold text-slate-500 block">
                  Certified Seed Coating / Treatment
                </span>
                <p className="text-slate-800 mt-0.5 font-mono">{selectedLot.seedTreatment}</p>
              </div>
            </div>

            {/* Trial Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Trial Protocol Requirements
              </h4>
              <p className="bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
                {selectedLot.trialRequirements}
              </p>
            </div>

            {/* Linked Trials */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Linked Active Trials ({selectedLot.assignedTrials.length})
              </h4>
              <div className="space-y-2">
                {selectedLot.assignedTrials.map((tId) => {
                  const tr = mockTrials.find((t) => t.id === tId);
                  return (
                    <div
                      key={tId}
                      onClick={() => navigate(`/trials/${tId}`)}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer group"
                    >
                      <div>
                        <span className="font-mono font-bold text-[#0F4A2A] block">{tId}</span>
                        <span className="text-slate-600 block mt-0.5">
                          {tr ? tr.title : 'Field Evaluation Trial'}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0F4A2A] shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
