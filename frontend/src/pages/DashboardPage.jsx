// src/pages/DashboardPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Badge } from '../components/ui/Badge';
import { FieldIntelligencePanel } from '../components/shared/FieldIntelligencePanel';
import {
  FlaskConical,
  Package,
  MapPin,
  Eye,
  TestTube,
  CheckCircle2,
  ArrowRight,
  Clock,
  Activity,
  Database,
  CloudRain,
  Wifi,
  ChevronRight,
  Plus
} from 'lucide-react';
import { mockTrials } from '../data/trials';
import { mockAlerts } from '../data/alerts';

export const DashboardPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Client';

  const columns = [
    {
      header: 'Trial ID & Title',
      key: 'id',
      className: 'w-[220px]',
      render: (row) => (
        <div className="space-y-0.5">
          <span className="font-mono font-bold text-xs text-white block">{row.id}</span>
          <span className="text-xs text-neutral-400 truncate block">
            {row.crop} ({row.variety})
          </span>
        </div>
      )
    },
    {
      header: 'Seed Lot',
      key: 'seedLotId',
      className: 'w-[140px]',
      render: (row) => (
        <div className="space-y-0.5 font-mono text-xs">
          <span className="text-white block">{row.seedLotId}</span>
          <span className="text-3xs text-neutral-400 block">Batch: {row.seedLotBatch}</span>
        </div>
      )
    },
    {
      header: 'Company',
      key: 'companyName',
      className: 'w-[160px]',
      render: (row) => (
        <span className="text-xs text-neutral-300 truncate max-w-[150px] block">
          {row.companyName}
        </span>
      )
    },
    {
      header: 'Field Site',
      key: 'location',
      className: 'w-[160px]',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span className="text-white block truncate max-w-[150px]">{row.fieldName}</span>
          <span className="text-3xs text-neutral-400 font-mono block">{row.location}</span>
        </div>
      )
    },
    {
      header: 'Stage',
      key: 'currentStage',
      className: 'w-[130px]',
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-3xs font-mono font-semibold bg-white/10 text-white border border-white/15">
          {row.currentStage}
        </span>
      )
    },
    {
      header: 'Progress',
      key: 'progressPercentage',
      className: 'w-[120px]',
      render: (row) => (
        <div className="w-24 space-y-1">
          <div className="flex items-center justify-between text-3xs font-mono text-neutral-300">
            <span>{row.progressPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                row.progressPercentage === 100
                  ? 'bg-white shadow-[0_0_8px_#ffffff]'
                  : 'bg-neutral-300'
              }`}
              style={{ width: `${row.progressPercentage}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      className: 'w-[100px] text-center',
      headerClassName: 'text-center',
      render: (row) => (
        <div className="flex justify-center">
          <StatusBadge status={row.status} />
        </div>
      )
    },
    {
      header: 'Action',
      key: 'action',
      className: 'w-[90px] text-right',
      headerClassName: 'text-right',
      render: (row) => (
        <div className="flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/platform/trials/${row.id}`);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-3xs font-mono font-semibold uppercase text-neutral-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-all cursor-pointer"
          >
            <span>Inspect</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 text-left">
      {/* 1. Standard Page Header aligned to 8px grid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-normal">
            Operational overview across 48 active trials, 28 seed lots, and 62 verified field sites.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/platform/field-officer')}
            icon={MapPin}
          >
            Field Flow
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/platform/trials')}
            icon={Plus}
          >
            Create Trial
          </Button>
        </div>
      </div>

      {/* 2. 6 Top Executive Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Active Trials"
          value="48"
          subtitle="Across 4 agro-zones"
          icon={FlaskConical}
          trend="positive"
          trendValue="+12%"
          onClick={() => navigate('/platform/trials')}
        />
        <StatCard
          title="Seed Lots"
          value="28"
          subtitle="Registered cultivars"
          icon={Package}
          onClick={() => navigate('/platform/seed-lots')}
        />
        <StatCard
          title="Trial Sites"
          value="62"
          subtitle="34.6 Ha verified"
          icon={MapPin}
          onClick={() => navigate('/platform/fields')}
        />
        <StatCard
          title="Pending Obs."
          value="7"
          subtitle="Due in 48h"
          icon={Eye}
          trend="negative"
          trendValue="3 Overdue"
          onClick={() => navigate('/platform/observations')}
        />
        <StatCard
          title="Lab Samples"
          value="12"
          subtitle="Spectroscopy assays"
          icon={TestTube}
          onClick={() => navigate('/platform/samples')}
        />
        <StatCard
          title="Completed"
          value="126"
          subtitle="Certified dossiers"
          icon={CheckCircle2}
          trend="positive"
          trendValue="94.2% Passed"
          onClick={() => navigate('/platform/reports')}
        />
      </div>

      {/* 3. Telemetry Strip */}
      <div className="w-full border-y border-white/[0.08] py-3.5 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs font-mono text-neutral-400">
        <span className="inline-flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-white" /> Last sync <strong className="font-semibold text-white">2 min ago</strong>
        </span>
        <span className="inline-flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-white" /> Sites reporting <strong className="font-semibold text-white">58/62</strong>
        </span>
        <span className="inline-flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-white" /> Observations today <strong className="font-semibold text-white">18 logged</strong>
        </span>
        <span className="inline-flex items-center gap-2">
          <CloudRain className="w-3.5 h-3.5 text-neutral-300" /> Weather alerts <strong className="font-semibold text-white">2 active</strong>
        </span>
      </div>

      {/* 4. Two Column Section: Trial Progress Overview & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Trial Progress Overview (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col">
          <Card
            title="Trial Progress Overview"
            subtitle="Real-time phenological progression across all registered field trial sites"
            className="h-full flex flex-col justify-between"
            action={
              <Link
                to="/platform/analytics"
                className="text-xs font-mono font-semibold text-white hover:underline flex items-center gap-1"
              >
                <span>View Analytics</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            <div className="space-y-6">
              {/* Top 4 KPI mini boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-6 border-b border-white/[0.08]">
                <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 rounded-xl">
                  <span className="text-3xs uppercase tracking-wider text-neutral-400 font-mono font-semibold block">Total Active Trials</span>
                  <span className="text-xl font-bold font-mono text-white mt-1 block">48</span>
                  <span className="text-3xs font-mono text-neutral-400 mt-0.5 block">+6 this month</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 rounded-xl">
                  <span className="text-3xs uppercase tracking-wider text-neutral-400 font-mono font-semibold block">Portfolio Progress</span>
                  <span className="text-xl font-bold font-mono text-white mt-1 block">68%</span>
                  <span className="text-3xs font-mono text-neutral-400 mt-0.5 block">On schedule</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 rounded-xl">
                  <span className="text-3xs uppercase tracking-wider text-neutral-400 font-mono font-semibold block">Delayed Trials</span>
                  <span className="text-xl font-bold font-mono text-neutral-200 mt-1 block">2</span>
                  <span className="text-3xs font-mono text-neutral-400 mt-0.5 block">Weather impacted</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 rounded-xl">
                  <span className="text-3xs uppercase tracking-wider text-neutral-400 font-mono font-semibold block">Requiring Review</span>
                  <span className="text-xl font-bold font-mono text-white mt-1 block">3</span>
                  <span className="text-3xs font-mono text-neutral-400 mt-0.5 block">Protocol audit</span>
                </div>
              </div>

              {/* Status Distribution Pipeline */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                    Trial Status Distribution Pipeline
                  </h4>
                  <span className="text-3xs font-mono text-neutral-500">Total 48 active trials</span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { stage: 'Planned & Protocol Setup', count: 4, percent: 8, barColor: 'bg-neutral-600' },
                    { stage: 'Farmer Assigned & Field Verified', count: 5, percent: 10, barColor: 'bg-neutral-500' },
                    { stage: 'Sown & Emergence', count: 6, percent: 12, barColor: 'bg-neutral-400' },
                    { stage: 'Growing (Vegetative V4-V12)', count: 11, percent: 23, barColor: 'bg-neutral-300' },
                    { stage: 'Flowering & Silking', count: 8, percent: 17, barColor: 'bg-white shadow-[0_0_8px_#ffffff]' },
                    { stage: 'Harvest & Field Weighing', count: 3, percent: 6, barColor: 'bg-neutral-400' },
                    { stage: 'Sample Lab Testing', count: 4, percent: 8, barColor: 'bg-neutral-500' },
                    { stage: 'Completed & Certified', count: 7, percent: 16, barColor: 'bg-white' }
                  ].map((st) => (
                    <div key={st.stage} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-300 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${st.barColor}`} />
                          {st.stage}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{st.count} trials</span>
                          <span className="text-neutral-500 text-3xs w-8 text-right">({st.percent}%)</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${st.barColor} transition-all duration-500`}
                          style={{ width: `${st.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Operational Alerts Column (1 Col) */}
        <div className="lg:col-span-1 flex flex-col">
          <Card
            title="Operational Alerts"
            subtitle="Exceptions requiring agronomist or officer intervention"
            className="h-full flex flex-col justify-between"
          >
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all text-left"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-3xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/15">
                      {alert.category}
                    </span>
                    <span className="text-3xs font-mono text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timeAgo}
                    </span>
                  </div>

                  <h5 className="text-xs font-semibold text-white mt-2">{alert.title}</h5>
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed line-clamp-2">
                    {alert.message}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-3xs text-neutral-500">{alert.trialId}</span>
                    <Link
                      to={`/platform${alert.link}`}
                      className="text-xs font-mono font-semibold text-white hover:underline inline-flex items-center gap-1"
                    >
                      Resolve Action →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 5. Field Intelligence Map Panel */}
      <FieldIntelligencePanel />

      {/* 6. Recent Trials Registry Table */}
      <Card
        title="Recent Trials Registry"
        subtitle="Active multi-location trials across cereal, cotton, and oilseed portfolios"
        action={
          <Link
            to="/platform/trials"
            className="text-xs font-mono font-semibold text-white hover:underline flex items-center gap-1"
          >
            <span>View All Trials</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        }
      >
        <Table
          columns={columns}
          data={mockTrials.slice(0, 5)}
          onRowClick={(row) => navigate(`/platform/trials/${row.id}`)}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
