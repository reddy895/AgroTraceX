// src/pages/Trials/TrialsListPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Tabs } from '../../components/ui/Tabs';
import { Table } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { CreateTrialModal } from './CreateTrialModal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { useToast } from '../../context/ToastContext';
import { mockTrials as initialTrials } from '../../data/trials';
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Eye,
  Archive,
  Edit,
  Calendar,
  User,
  MapPin,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const TrialsListPage = () => {
  const [trials, setTrials] = useState(initialTrials);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [viewMode, setViewMode] = useState('table'); // table | grid
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [archiveTarget, setArchiveTarget] = useState(null);

  const { showToast } = useToast();
  const navigate = useNavigate();

  // Tabs definitions with dynamic counts
  const tabs = [
    { id: 'all', label: 'All Trials', count: trials.length },
    { id: 'active', label: 'Active', count: trials.filter((t) => t.status === 'Active').length },
    { id: 'delayed', label: 'Delayed', count: trials.filter((t) => t.status === 'Delayed').length },
    { id: 'completed', label: 'Completed', count: trials.filter((t) => t.status === 'Completed').length }
  ];

  // Filtering logic
  const filteredTrials = useMemo(() => {
    return trials.filter((trial) => {
      // Tab filter
      if (activeTab === 'active' && trial.status !== 'Active') return false;
      if (activeTab === 'delayed' && trial.status !== 'Delayed') return false;
      if (activeTab === 'completed' && trial.status !== 'Completed') return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          trial.id.toLowerCase().includes(q) ||
          trial.title.toLowerCase().includes(q) ||
          trial.crop.toLowerCase().includes(q) ||
          trial.variety.toLowerCase().includes(q) ||
          trial.farmerName.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Crop
      if (cropFilter && trial.crop !== cropFilter) return false;

      // Company
      if (companyFilter && trial.companyId !== companyFilter) return false;

      // Status dropdown filter
      if (statusFilter && trial.status !== statusFilter) return false;

      // Region
      if (regionFilter && !trial.region.toLowerCase().includes(regionFilter.toLowerCase())) return false;

      return true;
    });
  }, [trials, activeTab, searchQuery, cropFilter, companyFilter, statusFilter, regionFilter]);

  const handleTrialCreated = (newTrial) => {
    setTrials((prev) => [newTrial, ...prev]);
  };

  const handleArchiveConfirm = () => {
    if (!archiveTarget) return;
    setTrials((prev) => prev.filter((t) => t.id !== archiveTarget.id));
    showToast(`Trial ${archiveTarget.id} archived successfully`, 'info');
    setArchiveTarget(null);
  };

  const columns = [
    {
      header: 'Trial ID & Crop',
      key: 'id',
      render: (row) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#0F4A2A] block">{row.id}</span>
          <span className="text-xs font-semibold text-slate-900 block mt-0.5">{row.crop}</span>
          <span className="text-3xs text-slate-500 truncate max-w-[160px] block">{row.variety}</span>
        </div>
      )
    },
    {
      header: 'Seed Lot',
      key: 'seedLotId',
      render: (row) => (
        <div className="text-xs font-mono text-slate-700">
          <div>{row.seedLotId}</div>
          <span className="text-3xs text-slate-400 font-sans">Batch: {row.seedLotBatch}</span>
        </div>
      )
    },
    {
      header: 'Company',
      key: 'companyName',
      render: (row) => (
        <span className="text-xs text-slate-800 font-medium truncate max-w-[140px] block">
          {row.companyName}
        </span>
      )
    },
    {
      header: 'Farmer & Location',
      key: 'farmerName',
      render: (row) => (
        <div className="text-xs">
          <span className="font-medium text-slate-900 block">{row.farmerName}</span>
          <span className="text-3xs text-slate-500 block truncate max-w-[140px]">{row.location}</span>
        </div>
      )
    },
    {
      header: 'Stage & Progress',
      key: 'currentStage',
      render: (row) => (
        <div className="w-28">
          <div className="flex items-center justify-between text-2xs mb-1">
            <span className="font-semibold text-slate-800">{row.currentStage}</span>
            <span className="text-slate-500 font-mono">{row.progressPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                row.status === 'Delayed' ? 'bg-amber-500' : 'bg-[#0F4A2A]'
              }`}
              style={{ width: `${row.progressPercentage}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Dates',
      key: 'dates',
      render: (row) => (
        <div className="text-3xs text-slate-600 font-mono space-y-0.5">
          <div>Start: {row.startDate}</div>
          <div className="text-slate-400">Harvest: {row.expectedHarvest}</div>
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
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/trials/${row.id}`);
            }}
            title="Inspect Trial"
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setArchiveTarget(row);
            }}
            title="Archive Trial"
          >
            <Archive className="w-3.5 h-3.5 text-slate-400 hover:text-red-600" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Trials' }]} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Field Trials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage multi-location experimental plots, phenotyping protocols, and yield verification.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            icon={Plus}
          >
            Create Trial
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="w-full md:w-80">
            <Input
              placeholder="Search by trial ID, variety, farmer..."
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            <Select
              className="w-36 text-xs"
              placeholder="All Crops"
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              options={['Hybrid Maize', 'Basmati Paddy / Rice', 'Bt Cotton', 'Wheat (Durum)', 'Soybean']}
            />

            <Select
              className="w-36 text-xs"
              placeholder="All Regions"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={['Central India', 'Northern Plains', 'Western Deccan', 'Southern']}
            />

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

            <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50 shrink-0">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Table view"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Card Grid */}
      {viewMode === 'table' ? (
        <Table
          columns={columns}
          data={filteredTrials}
          emptyTitle="No field trials found"
          emptyDescription="No trials match your search filters. Try clearing filters or create a new trial."
          emptyAction={
            <Button variant="primary" size="sm" onClick={() => setIsCreateModalOpen(true)}>
              Create Trial
            </Button>
          }
          onRowClick={(row) => navigate(`/trials/${row.id}`)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrials.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-xl border border-slate-200 text-center">
              <p className="text-slate-500 text-sm">No trials matching your filter criteria.</p>
            </div>
          ) : (
            filteredTrials.map((trial) => (
              <div
                key={trial.id}
                onClick={() => navigate(`/trials/${trial.id}`)}
                className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#0F4A2A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {trial.id}
                    </span>
                    <StatusBadge status={trial.status} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug">
                    {trial.crop} <span className="font-normal text-slate-600">({trial.variety})</span>
                  </h3>
                  <p className="text-2xs text-slate-500 mt-0.5">{trial.companyName}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 truncate">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Farmer: <strong>{trial.farmerName}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{trial.location} ({trial.trialAreaHa} Ha)</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Harvest: {trial.expectedHarvest}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-2xs mb-1.5">
                    <span className="font-semibold text-slate-800">Stage: {trial.currentStage}</span>
                    <span className="font-mono text-slate-500 font-bold">{trial.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        trial.status === 'Delayed' ? 'bg-amber-500' : 'bg-[#0F4A2A]'
                      }`}
                      style={{ width: `${trial.progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Trial Modal */}
      <CreateTrialModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTrialCreated={handleTrialCreated}
      />

      {/* Archive Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(archiveTarget)}
        onClose={() => setArchiveTarget(null)}
        onConfirm={handleArchiveConfirm}
        title={`Archive Trial ${archiveTarget?.id}?`}
        message={`Are you sure you want to archive trial "${archiveTarget?.title}"? The trial data will be preserved in historical records.`}
        confirmText="Archive Trial"
      />
    </div>
  );
};
