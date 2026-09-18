// src/pages/Analytics/AnalyticsPage.jsx
import React from 'react';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { mockAnalyticsData } from '../../data/analyticsData';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  MapPin,
  TestTube,
  BarChart3,
  Calendar,
  Sparkles
} from 'lucide-react';

export const AnalyticsPage = () => {
  const { kpis, trialsByCrop, trialsByRegion, stageBreakdown, monthlyTrends } = mockAnalyticsData;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Analytics' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Field-Trial Analytics & Agronomic KPIs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data-driven insights across multi-location trial velocity, protocol compliance, and yield performance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Kharif-Rabi 2026 Season</span>
        </div>
      </div>

      {/* 4 Primary Top KPI StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Trial Success Rate"
          value={`${kpis.trialSuccessRate}%`}
          subtitle={kpis.successRateChange}
          icon={CheckCircle2}
          accent="green"
          trend="positive"
          trendValue="+3.8%"
        />

        <StatCard
          title="Average Duration"
          value={`${kpis.averageDurationDays} Days`}
          subtitle={kpis.durationChange}
          icon={Clock}
          accent="blue"
          trend="positive"
          trendValue="4d Faster"
        />

        <StatCard
          title="Protocol Compliance"
          value={`${kpis.protocolComplianceRate}%`}
          subtitle={kpis.complianceChange}
          icon={TrendingUp}
          accent="green"
          trend="positive"
          trendValue="Audit Verified"
        />

        <StatCard
          title="Sample Lab Turnaround"
          value={`${kpis.sampleTurnaroundDays} Days`}
          subtitle={kpis.turnaroundChange}
          icon={TestTube}
          accent="slate"
          trend="positive"
          trendValue="1.2d Reduced"
        />
      </div>

      {/* 2-Column Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Trials by Crop Category Distribution */}
        <Card
          title="Trials by Crop Genus"
          subtitle="Portfolio distribution across commercial seed trial programs"
        >
          <div className="space-y-3 pt-2">
            {trialsByCrop.map((c) => (
              <div key={c.crop} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{c.crop}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{c.count} trials</span>
                    <span className="text-3xs text-slate-400 font-mono w-10 text-right">({c.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${c.percentage}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chart 2: Regional Performance & Success Rate */}
        <Card
          title="Trials by Agro-Climatic Region"
          subtitle="Zonal trial volume, participating verified farmers, and completion rates"
        >
          <div className="space-y-3 pt-1">
            {trialsByRegion.map((reg) => (
              <div key={reg.region} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-slate-900">{reg.region}</h4>
                  <p className="text-3xs text-slate-500 mt-0.5">
                    {reg.trials} Trial Sites • {reg.farmers} Verified Farmers
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 font-mono block">
                    {reg.successRate}%
                  </span>
                  <span className="text-3xs text-slate-400 uppercase">Success Rate</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Observation & Sampling Throughput Trend */}
      <Card
        title="Monthly Field Observation & Sample Throughput"
        subtitle="Growth in verified digital telemetry over the 6-month trial cycle"
      >
        <div className="h-64 flex flex-col justify-between pt-2">
          {/* Visual SVG Bar Chart */}
          <div className="relative w-full h-48">
            <svg className="w-full h-full" viewBox="0 0 500 160">
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#e2e8f0" strokeWidth="1" />

              {monthlyTrends.map((item, idx) => {
                const x = 70 + idx * 70;
                const obsHeight = (item.observations / 350) * 110;
                const sampleHeight = (item.samples / 60) * 110;

                return (
                  <g key={item.month}>
                    {/* Observation bar */}
                    <rect
                      x={x - 14}
                      y={140 - obsHeight}
                      width="12"
                      height={obsHeight}
                      rx="3"
                      fill="#0F4A2A"
                    />
                    {/* Sample bar */}
                    <rect
                      x={x + 2}
                      y={140 - sampleHeight}
                      width="12"
                      height={sampleHeight}
                      rx="3"
                      fill="#2563eb"
                    />
                    <text x={x} y="155" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">
                      {item.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-center gap-8 border-t border-slate-100 pt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#0F4A2A]" />
              <span className="font-semibold text-slate-700">Logged Field Observations (Total 1,174)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#2563eb]" />
              <span className="font-semibold text-slate-700">Laboratory Samples Dispatched (Total 193)</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
