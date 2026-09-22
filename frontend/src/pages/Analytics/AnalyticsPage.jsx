// src/pages/Analytics/AnalyticsPage.jsx
import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { mockAnalyticsData } from '../../data/analyticsData';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  TestTube
} from 'lucide-react';

export const AnalyticsPage = () => {
  const { kpis, trialsByCrop, trialsByRegion, monthlyTrends } = mockAnalyticsData;

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Trial Analytics & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-normal">
            Data-driven insights across multi-location trial velocity, protocol compliance, and yield performance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white/[0.04] border border-white/10 px-3.5 py-2 rounded-xl text-neutral-300">
          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
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
          trend="positive"
          trendValue="+3.8%"
        />

        <StatCard
          title="Average Duration"
          value={`${kpis.averageDurationDays} Days`}
          subtitle={kpis.durationChange}
          icon={Clock}
          trend="positive"
          trendValue="4d Faster"
        />

        <StatCard
          title="Protocol Compliance"
          value={`${kpis.protocolComplianceRate}%`}
          subtitle={kpis.complianceChange}
          icon={TrendingUp}
          trend="positive"
          trendValue="Verified"
        />

        <StatCard
          title="Sample Lab Turnaround"
          value={`${kpis.sampleTurnaroundDays} Days`}
          subtitle={kpis.turnaroundChange}
          icon={TestTube}
          trend="positive"
          trendValue="1.2d Reduced"
        />
      </div>

      {/* 2-Column Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Chart 1: Trials by Crop Category Distribution */}
        <Card
          title="Trials by Crop Genus"
          subtitle="Portfolio distribution across commercial seed trial programs"
          className="h-full flex flex-col justify-between"
        >
          <div className="space-y-4 pt-1">
            {trialsByCrop.map((c, idx) => {
              const shadeClass =
                idx === 0
                  ? 'bg-white'
                  : idx === 1
                  ? 'bg-neutral-300'
                  : idx === 2
                  ? 'bg-neutral-400'
                  : idx === 3
                  ? 'bg-neutral-500'
                  : 'bg-neutral-600';

              return (
                <div key={c.crop} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-neutral-200">{c.crop}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{c.count} trials</span>
                      <span className="text-3xs text-neutral-500 w-10 text-right">({c.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${shadeClass}`}
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Chart 2: Regional Performance & Success Rate */}
        <Card
          title="Trials by Agro-Climatic Region"
          subtitle="Zonal trial volume, participating verified farmers, and completion rates"
          className="h-full flex flex-col justify-between"
        >
          <div className="space-y-3 pt-1">
            {trialsByRegion.map((reg) => (
              <div
                key={reg.region}
                className="p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.08] flex items-center justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <h4 className="font-semibold text-xs text-white">{reg.region}</h4>
                  <p className="text-3xs text-neutral-400 mt-0.5 font-mono">
                    {reg.trials} Trial Sites • {reg.farmers} Verified Farmers
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-white font-mono block">
                    {reg.successRate}%
                  </span>
                  <span className="text-3xs text-neutral-500 font-mono uppercase tracking-wider">
                    Success Rate
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Observation & Sampling Throughput Trend (Pure Monochrome SVG) */}
      <Card
        title="Monthly Field Observation & Sample Throughput"
        subtitle="Growth in verified digital telemetry over the 6-month trial cycle"
      >
        <div className="h-64 flex flex-col justify-between pt-2">
          {/* Visual SVG Bar Chart */}
          <div className="relative w-full h-48">
            <svg className="w-full h-full" viewBox="0 0 500 160">
              <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {monthlyTrends.map((item, idx) => {
                const x = 70 + idx * 70;
                const obsHeight = (item.observations / 350) * 110;
                const sampleHeight = (item.samples / 60) * 110;

                return (
                  <g key={item.month}>
                    {/* Observation bar: White */}
                    <rect
                      x={x - 13}
                      y={140 - obsHeight}
                      width="11"
                      height={obsHeight}
                      rx="2"
                      fill="#ffffff"
                      opacity="0.9"
                    />
                    {/* Sample bar: Grayscale / Neutral */}
                    <rect
                      x={x + 2}
                      y={140 - sampleHeight}
                      width="11"
                      height={sampleHeight}
                      rx="2"
                      fill="#737373"
                      opacity="0.8"
                    />
                    <text
                      x={x}
                      y="155"
                      textAnchor="middle"
                      fill="#a3a3a3"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="600"
                    >
                      {item.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 border-t border-white/[0.08] pt-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-white" />
              <span className="text-neutral-300">Logged Observations (Total 1,174)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-[#737373]" />
              <span className="text-neutral-400">Lab Samples Dispatched (Total 193)</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
