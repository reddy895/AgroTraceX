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
          <span className="font-mono font-bold text-xs text-white block">{row.id}</span>
          <span className="text-3xs text-neutral-400 font-mono">Batch: {row.batchNumber}</span>
        </div>
      )
    },
    {
      header: 'Crop & Variety',
      key: 'crop',
      render: (row) => (
        <div>
          <span className="font-semibold text-xs text-white block">{row.crop}</span>
          <span className="text-3xs text-neutral-400 block">{row.variety}</span>
        </div>
      )
    },
    {
      header: 'Company',
      key: 'companyName',
      render: (row) => (
        <span className="text-xs text-neutral-300 font-medium truncate max-w-[150px] block">
          {row.companyName}
        </span>
      )
    },
    {
      header: 'Germination & Purity',
      key: 'germinationRate',
      render: (row) => (
        <div className="text-3xs font-mono text-neutral-300 space-y-0.5">
          <div className="text-white font-bold">Germ: {row.germinationRate}%</div>
          <div className="text-neutral-400">Purity: {row.purityPercentage}%</div>
        </div>
      )
    },
    {
      header: 'Quantity',
      key: 'quantityKg',
      render: (row) => (
        <span className="font-mono text-xs text-white font-bold">{row.quantityKg} kg</span>
      )
    },
    {
      header: 'Assigned Trials',
      key: 'assignedTrials',
      render: (row) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          {row.assignedTrials.map((tId) => (
            <span
              key={tId}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/platform/trials/${tId}`);
              }}
              className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white hover:text-black text-neutral-300 font-mono text-3xs font-semibold cursor-pointer transition-all border border-white/15"
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
      <Breadcrumb items={[{ label: 'Platform', to: '/platform' }, { label: 'Seed Lots' }]} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Seed Lots & Germplasm Traceability
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
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
      <div className="ag-glass p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
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
            <span className="text-3xs font-mono text-neutral-400">
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
          <div className="space-y-6 text-xs text-neutral-300">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.08]">
                <span className="text-3xs uppercase font-mono font-bold text-neutral-500 block">
                  Batch Number
                </span>
                <span className="font-mono font-bold text-white mt-1 block">
                  {selectedLot.batchNumber}
                </span>
              </div>
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.08]">
                <span className="text-3xs uppercase font-mono font-bold text-neutral-500 block">
                  Germination Rate
                </span>
                <span className="font-mono font-bold text-white mt-1 block">
                  {selectedLot.germinationRate}% (Tested)
                </span>
              </div>
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.08]">
                <span className="text-3xs uppercase font-mono font-bold text-neutral-500 block">
                  Physical Purity
                </span>
                <span className="font-mono font-bold text-white mt-1 block">
                  {selectedLot.purityPercentage}%
                </span>
              </div>
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.08]">
                <span className="text-3xs font-mono uppercase font-bold text-neutral-500 block">
                  Available Quantity
                </span>
                <span className="font-mono font-bold text-white mt-1 block">
                  {selectedLot.quantityKg} kg
                </span>
              </div>
            </div>

            {/* Genetic Traits & Seed Treatment */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Genetics & Chemical Treatment
              </h4>
              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.08]">
                <span className="text-3xs font-mono uppercase font-bold text-neutral-400 block">
                  Target Genetic Traits
                </span>
                <p className="font-medium text-white mt-1">{selectedLot.geneticTraits}</p>
              </div>

              <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.08]">
                <span className="text-3xs font-mono uppercase font-bold text-neutral-400 block">
                  Certified Seed Coating / Treatment
                </span>
                <p className="text-neutral-200 mt-1 font-mono">{selectedLot.seedTreatment}</p>
              </div>
            </div>

            {/* Trial Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Trial Protocol Requirements
              </h4>
              <p className="bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06] leading-relaxed text-neutral-300">
                {selectedLot.trialRequirements}
              </p>
            </div>

            {/* Linked Trials */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Linked Active Trials ({selectedLot.assignedTrials.length})
              </h4>
              <div className="space-y-2">
                {selectedLot.assignedTrials.map((tId) => {
                  const tr = mockTrials.find((t) => t.id === tId);
                  return (
                    <div
                      key={tId}
                      onClick={() => navigate(`/platform/trials/${tId}`)}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group"
                    >
                      <div>
                        <span className="font-mono font-bold text-white block">{tId}</span>
                        <span className="text-neutral-400 text-xs block mt-0.5">
                          {tr ? tr.title : 'Field Evaluation Trial'}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-white shrink-0" />
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
