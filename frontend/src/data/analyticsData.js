// src/data/analyticsData.js
export const mockAnalyticsData = {
  kpis: {
    trialSuccessRate: 94.2,
    successRateChange: "+3.8% vs last season",
    averageDurationDays: 138,
    durationChange: "-4 days (faster cycle)",
    activeTrialPlotsHa: 34.6,
    plotsChange: "+8.2 Ha expansion",
    sampleTurnaroundDays: 3.8,
    turnaroundChange: "-1.2 days to lab result",
    protocolComplianceRate: 98.4,
    complianceChange: "+1.6% audited adherence",
    averageYieldLiftPercent: 12.8,
    yieldLiftChange: "vs standard commercial checks"
  },
  trialsByCrop: [
    { crop: "Hybrid Maize", count: 18, percentage: 38, color: "#166534" },
    { crop: "Basmati / Rice", count: 12, percentage: 25, color: "#2563EB" },
    { crop: "Bt Cotton", count: 9, percentage: 19, color: "#D97706" },
    { crop: "Durum Wheat", count: 5, percentage: 10, color: "#854D0E" },
    { crop: "Soybean", count: 4, percentage: 8, color: "#0D9488" }
  ],
  trialsByRegion: [
    { region: "Central India (MP/Gujarat)", trials: 21, farmers: 28, successRate: 96 },
    { region: "Northern Plains (Punjab/Haryana)", trials: 14, farmers: 18, successRate: 94 },
    { region: "Western Deccan (Maharashtra)", trials: 9, farmers: 12, successRate: 89 },
    { region: "Southern Zone (KA/AP)", trials: 4, farmers: 6, successRate: 92 }
  ],
  stageBreakdown: [
    { stage: "Protocol Setup", count: 4 },
    { stage: "Farmer Assigned", count: 3 },
    { stage: "Field Verified", count: 2 },
    { stage: "Sowing", count: 5 },
    { stage: "Germination", count: 6 },
    { stage: "Vegetative", count: 11 },
    { stage: "Flowering", count: 8 },
    { stage: "Harvest", count: 3 },
    { stage: "Sample Testing", count: 4 },
    { stage: "Completed", count: 42 }
  ],
  monthlyTrends: [
    { month: "Apr", activeTrials: 18, observations: 78, samples: 14 },
    { month: "May", activeTrials: 26, observations: 112, samples: 19 },
    { month: "Jun", activeTrials: 34, observations: 168, samples: 28 },
    { month: "Jul", activeTrials: 41, observations: 220, samples: 36 },
    { month: "Aug", activeTrials: 48, observations: 284, samples: 44 },
    { month: "Sep", activeTrials: 48, observations: 312, samples: 52 }
  ]
};
