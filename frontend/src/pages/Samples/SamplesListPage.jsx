// src/pages/Samples/SamplesListPage.jsx
import React, { useState } from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ChainOfCustody } from '../../components/shared/ChainOfCustody';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockSamples } from '../../data/samples';
import { TestTube, Search, Plus, PackageCheck, ShieldCheck, Microscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SamplesListPage = () => {
  const [samples, setSamples] = useState(mockSamples);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSample, setSelectedSample] = useState(mockSamples[0]);
  const navigate = useNavigate();

  const filteredSamples = samples.filter((s) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.id.toLowerCase().includes(q) ||
        s.trialId.toLowerCase().includes(q) ||
        s.crop.toLowerCase().includes(q) ||
        s.harvestBatch.toLowerCase().includes(q) ||
        s.testingLab.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const columns = [
    {
      header: 'Sample ID',
      key: 'id',
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#0F4A2A] block">{row.id}</span>
          <span className="text-3xs text-slate-500 font-mono">Trial: {row.trialId}</span>
        </div>
      )
    },
    {
      header: 'Sample Type & Crop',
      key: 'sampleType',
      render: (row) => (
        <div>
          <span className="font-semibold text-xs text-slate-900 block">{row.crop}</span>
          <span className="text-3xs text-slate-500 block truncate max-w-[160px]">{row.sampleType}</span>
        </div>
      )
    },
    {
      header: 'Quantity',
      key: 'quantity',
      render: (row) => <span className="font-mono text-xs font-semibold text-slate-800">{row.quantity}</span>
    },
    {
      header: 'Assigned Testing Lab',
      key: 'testingLab',
      render: (row) => (
        <span className="text-xs text-slate-700 truncate max-w-[160px] block">
          {row.testingLab}
        </span>
      )
    },
    {
      header: 'Custody Stage',
      key: 'currentStage',
      render: (row) => (
        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 font-semibold text-3xs border border-blue-200">
          {row.currentStage}
        </span>
      )
    },
    {
      header: 'Testing Status',
      key: 'testingStatus',
      render: (row) => <StatusBadge status={row.testingStatus} />
    },
    {
      header: 'Action',
      key: 'action',
      render: (row) => (
        <Button
          variant={selectedSample?.id === row.id ? 'primary' : 'outline'}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSample(row);
          }}
        >
          Track Custody
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Samples' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Physical Sample Tracking & Chain of Custody
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tamper-evident barcode logging from field plot collection to central laboratory testing.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setSelectedSample(samples[0])}
        >
          Dispatch New Sample
        </Button>
      </div>

      {/* Selected Sample Chain-of-Custody Timeline Showcase */}
      {selectedSample && (
        <div className="space-y-2">
          <ChainOfCustody sample={selectedSample} />
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search sample ID, trial, batch, lab..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Samples Table */}
      <Table
        columns={columns}
        data={filteredSamples}
        onRowClick={(row) => setSelectedSample(row)}
      />
    </div>
  );
};
