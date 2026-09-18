// src/data/reports.js
export const mockReports = [
  {
    id: "REP-2026-065",
    trialId: "TR-2026-065",
    trialTitle: "Late-Sown Terminal Heat Tolerance Durum Wheat Evaluation",
    companyId: "COMP-005",
    companyName: "Kaveri Seed Company Ltd",
    crop: "Wheat (Durum)",
    variety: "Kaveri AmberGold 102",
    seedLotId: "LOT-WH-2026-018",
    seedLotBatch: "BN-2026-W018",
    status: "Approved & Certified",
    createdDate: "2026-04-05",
    reviewedBy: "Dr. Arvind Shrivastava (Lead Agronomist)",
    approvedBy: "Dr. Ananya Sen (R&D Director)",
    certificateNumber: "AGX-CERT-2026-00441",
    overallScore: 94.2,
    yieldAdvantagePercent: "+14.8% over regional benchmark HD-4730",
    executiveSummary: "Trial TR-2026-065 conclusively establishes Kaveri AmberGold 102 as a superior terminal-heat resilient durum line. Across 3 randomized complete block replications under delayed late-sown conditions (grain-filling temps >36°C), the cultivar maintained a stay-green flag leaf duration 7 days longer than standard checks and produced an actual grain yield of 5.48 MT/Ha against the 5.2 MT/Ha target.",
    protocolHighlights: "RCBD, 3 replications, 4 critical micro-sprinkler irrigations, basal NPK 120:60:40 kg/ha. Sowing date 2025-11-25; harvest date 2026-03-28.",
    fieldMetrics: {
      fieldName: "FLD-MP-042 (Kharche North Sector-A)",
      farmer: "Rameshwar Patel (Verified Tier-1)",
      soilType: "Medium Deep Black Clay (Vertisol)",
      soilPh: 7.2,
      areaHa: 2.4
    },
    observationsSummary: {
      totalObservations: 14,
      emergenceRate: "98.2%",
      daysTo50PercentHeading: 72,
      daysToPhysiologicalMaturity: 114,
      plantHeightCm: 88.4,
      lodgingPercentage: "0% (Stiff culm)"
    },
    harvestMetrics: {
      plotGrainWeightKg: 1315.2,
      extrapolatedYieldTonnesHa: 5.48,
      benchmarkYieldTonnesHa: 4.77,
      thousandKernelWeightGrams: 48.2,
      testWeightKgHl: 82.4
    },
    laboratoryMetrics: {
      proteinPercent: 13.9,
      wetGlutenPercent: 31.4,
      sedimentationValueMl: 46.0,
      yellowPigmentPpm: 7.8,
      safetyStandard: "Aflatoxin below detectable limits (<1 ppb)"
    },
    agronomistAssessment: "Kaveri AmberGold 102 demonstrated exemplary phenotypic plasticity. The grain shriveling index under high thermal stress was only 4.2% compared to 14.8% in the susceptible check. Drip fertigation combined with deep root penetration in vertisols prevented lodging and ensured high grain test weight (82.4 kg/hL).",
    commercialRecommendation: "Recommended for commercial release across Central Zone (Madhya Pradesh, Gujarat, Southern Rajasthan) for late-sown irrigated durum markets."
  },
  {
    id: "REP-2026-084-PRE",
    trialId: "TR-2026-084",
    trialTitle: "Multi-Location Drought-Resilience Evaluation of Hybrid Maize Cultivar NA-901",
    companyId: "COMP-001",
    companyName: "Novis AgroSciences Global",
    crop: "Hybrid Maize",
    variety: "NA-GoldMax 901",
    seedLotId: "LOT-MZ-2026-089",
    seedLotBatch: "BN-2026-M892",
    status: "Mid-Term Interim Report",
    createdDate: "2026-09-16",
    reviewedBy: "Dr. Arvind Shrivastava",
    approvedBy: "Pending Final Harvest",
    certificateNumber: "AGX-INTERIM-2026-0089",
    overallScore: 89.5,
    yieldAdvantagePercent: "Projected +18% over local Pioneer hybrid check",
    executiveSummary: "Mid-term agronomic assessment through VT-R1 flowering stage. NA-GoldMax 901 exhibits synchrony in anthesis-silking interval (ASI = 1.8 days) under 30% reduced irrigation regime. Zero Fall Armyworm penetration into ear whorls.",
    fieldMetrics: {
      fieldName: "FLD-MP-042 (Kharche North Sector-A)",
      farmer: "Rameshwar Patel",
      soilType: "Black Clay Vertisol",
      soilPh: 7.2,
      areaHa: 2.4
    },
    observationsSummary: {
      totalObservations: 8,
      emergenceRate: "96.4%",
      plantHeightCm: 218,
      canopyCoverage: "88%",
      ndviIndex: 0.84
    },
    agronomistAssessment: "Vigor and stay-green characteristics remain outstanding. Final yield estimation scheduled post-October harvest."
  }
];
