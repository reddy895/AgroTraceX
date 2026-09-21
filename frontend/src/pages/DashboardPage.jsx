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
  AlertTriangle,
  ArrowRight,
  TrendingUp,
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
import { mockAnalyticsData } from '../data/analyticsData';

export const DashboardPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Greeting time logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const columns = [
    {
      header: 'Trial ID & Title',
      key: 'id',
      render: (row) => (
        <div className="max-w-[220px]">
          <span className="font-mono font-bold text-xs text-[#556D3F] block">{row.id}</span>
          <span className="text-xs text-slate-800 font-medium truncate block mt-0.5">{row.crop} ({row.variety})</span>
        </div>
      )
    },
    {
      header: 'Seed Lot',
      key: 'seedLotId',
      render: (row) => (
        <div className="text-xs">
          <span className="font-mono text-slate-700 block">{row.seedLotId}</span>
          <span className="text-3xs text-slate-400">Batch: {row.seedLotBatch}</span>
        </div>
      )
    },
    {
      header: 'Company',
      key: 'companyName',
      render: (row) => (
        <span className="text-xs text-slate-700 font-medium truncate max-w-[140px] block">
          {row.companyName}
        </span>
      )
    },
    {
      header: 'Field Site',
      key: 'location',
      render: (row) => (
        <div className="text-xs">
          <span className="text-slate-800 block truncate max-w-[130px]">{row.fieldName}</span>
          <span className="text-3xs text-slate-500">{row.location}</span>
        </div>
      )
    },
    {
      header: 'Stage',
      key: 'currentStage',
      render: (row) => (
        <Badge variant="green" size="sm">
          {row.currentStage}
        </Badge>
      )
    },
    {
      header: 'Progress',
      key: 'progressPercentage',
      render: (row) => (
        <div className="w-24">
          <div className="flex items-center justify-between text-2xs mb-1">
            <span className="font-semibold text-slate-700">{row.progressPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                row.status === 'Delayed'
                  ? 'bg-amber-500'
                  : row.progressPercentage === 100
                  ? 'bg-emerald-600'
                  : 'bg-[#556D3F]'
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
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Action',
      key: 'action',
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/trials/${row.id}`);
          }}
          icon={ChevronRight}
          iconPosition="right"
        >
          Inspect
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-7">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {getGreeting()}, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here’s what’s happening across your field trials.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/field-officer')}
            icon={MapPin}
          >
            Field Officer Flow
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/trials')}
            icon={Plus}
          >
            Create Trial
          </Button>
        </div>
      </div>

      {/* 6 Key Executive Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Active Trials"
          value="48"
          subtitle="Across 4 agro-zones"
          icon={FlaskConical}
          accent="green"
          trend="positive"
          trendValue="+12%"
          onClick={() => navigate('/trials')}
        />
        <StatCard
          title="Seed Lots"
          value="28"
          subtitle="Registered cultivars"
          icon={Package}
          accent="slate"
          onClick={() => navigate('/seed-lots')}
        />
        <StatCard
          title="Trial Sites"
          value="62"
          subtitle="34.6 Ha verified"
          icon={MapPin}
          accent="blue"
          onClick={() => navigate('/fields')}
        />
        <StatCard
          title="Pending Obs."
          value="7"
          subtitle="Due in 48h"
          icon={Eye}
          accent="amber"
          trend="negative"
          trendValue="3 Overdue"
          onClick={() => navigate('/observations')}
        />
        <StatCard
          title="Lab Samples"
          value="12"
          subtitle="In spectroscopy testing"
          icon={TestTube}
          accent="blue"
          onClick={() => navigate('/samples')}
        />
        <StatCard
          title="Completed"
          value="126"
          subtitle="Certified dossiers"
          icon={CheckCircle2}
          accent="green"
          trend="positive"
          trendValue="94.2% Passed"
          onClick={() => navigate('/reports')}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-slate-200/80 py-3 text-xs text-slate-600">
        <span className="inline-flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-emerald-700" /> Last sync <strong className="font-semibold text-slate-800">2 min ago</strong></span>
        <span className="inline-flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-700" /> Sites reporting <strong className="font-semibold text-slate-800">58/62</strong></span>
        <span className="inline-flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-blue-700" /> Observations today <strong className="font-semibold text-slate-800">18</strong></span>
        <span className="inline-flex items-center gap-1.5"><CloudRain className="w-3.5 h-3.5 text-amber-600" /> Weather alerts <strong className="font-semibold text-slate-800">2</strong></span>
      </div>

      {/* Two Column Section: Trial Progress Overview & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trial Progress Overview & Stage Pipeline Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            title="Trial Progress Overview"
            subtitle="Real-time phenological progression across all registered field trial sites"
            action={
              <Link to="/analytics" className="text-xs font-semibold text-[#556D3F] hover:underline flex items-center gap-1">
                <span>View Analytics</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            {/* Top KPI row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-6 border-b border-slate-100">
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-3xs uppercase tracking-wider text-slate-500 font-semibold block">Total Active Trials</span>
                <span className="text-xl font-bold text-slate-900 mt-1 block">48</span>
                <span className="text-3xs text-emerald-700 font-medium">+6 this month</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-3xs uppercase tracking-wider text-slate-500 font-semibold block">Portfolio Completion</span>
                <span className="text-xl font-bold text-slate-900 mt-1 block">68%</span>
                <span className="text-3xs text-emerald-700 font-medium">On schedule</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-3xs uppercase tracking-wider text-slate-500 font-semibold block">Delayed Trials</span>
                <span className="text-xl font-bold text-amber-600 mt-1 block">2</span>
                <span className="text-3xs text-amber-700 font-medium">Weather impacted</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">
                <span className="text-3xs uppercase tracking-wider text-slate-500 font-semibold block">Requiring Review</span>
                <span className="text-xl font-bold text-red-600 mt-1 block">3</span>
                <span className="text-3xs text-red-700 font-medium">Protocol deviation</span>
              </div>
            </div>

            {/* Trial Status Pipeline Stages Chart */}
            <div className="pt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Trial Status Distribution Pipeline
                </h4>
                <span className="text-3xs text-slate-400">Total 48 active trials in ground</span>
              </div>

              {/* Status Bar Stages */}
              <div className="space-y-2.5">
                {[
                  { stage: 'Planned & Protocol Setup', count: 4, percent: 8, color: 'bg-slate-400' },
                  { stage: 'Farmer Assigned & Field Verified', count: 5, percent: 10, color: 'bg-blue-400' },
                  { stage: 'Sown & Emergence', count: 6, percent: 12, color: 'bg-emerald-500' },
                  { stage: 'Growing (Vegetative V4-V12)', count: 11, percent: 23, color: 'bg-emerald-600' },
                  { stage: 'Flowering & Silking', count: 8, percent: 17, color: 'bg-[#556D3F]' },
                  { stage: 'Harvest & Field Weighing', count: 3, percent: 6, color: 'bg-amber-500' },
                  { stage: 'Sample Lab Testing', count: 4, percent: 8, color: 'bg-blue-600' },
                  { stage: 'Completed & Certified', count: 7, percent: 16, color: 'bg-emerald-700' }
                ].map((st) => (
                  <div key={st.stage} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${st.color}`} />
                        {st.stage}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{st.count} trials</span>
                        <span className="text-slate-400 text-3xs w-8 text-right">({st.percent}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${st.color} transition-all duration-500`}
                        style={{ width: `${st.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts / Attention Required Column */}
        <div className="space-y-6">
          <Card
            title="Alerts & Attention Required"
            subtitle="Operational exceptions requiring agronomist or officer intervention"
          >
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border transition-all ${
                    alert.severity === 'danger'
                      ? 'border-red-200 bg-red-50/50'
                      : alert.severity === 'warning'
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-3xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        alert.severity === 'danger'
                          ? 'bg-red-100 text-red-800'
                          : alert.severity === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {alert.category}
                    </span>
                    <span className="text-3xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timeAgo}
                    </span>
                  </div>

                  <h5 className="text-xs font-semibold text-slate-900 mt-1.5">{alert.title}</h5>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                    {alert.message}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="font-mono text-3xs text-slate-500">{alert.trialId}</span>
                    <Link
                      to={alert.link}
                      className="text-xs font-semibold text-[#556D3F] hover:underline inline-flex items-center gap-1"
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

      <FieldIntelligencePanel />

      {/* Recent Trials Table */}
      <Card
        title="Recent Trials Registry"
        subtitle="Active multi-location trials across cereal, cotton, and oilseed portfolios"
        action={
          <Link
            to="/trials"
            className="text-xs font-semibold text-[#556D3F] hover:underline flex items-center gap-1"
          >
            <span>View All Trials</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        }
      >
        <Table
          columns={columns}
          data={mockTrials.slice(0, 5)}
          onRowClick={(row) => navigate(`/trials/${row.id}`)}
        />
      </Card>
    </div>
  );
};
