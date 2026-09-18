// src/data/samples.js
export const mockSamples = [
  {
    id: "SMP-2026-099",
    trialId: "TR-2026-084",
    trialName: "Hybrid Maize Cultivar NA-901 Drought Evaluation",
    crop: "Hybrid Maize",
    harvestBatch: "BATCH-MZ-084-R1",
    quantity: "12.5 kg Grain Composite",
    sampleType: "Physiological Maturity Ear & Kernel Sample",
    collectionDate: "2026-09-16 11:30 AM",
    collectedBy: "Vikas Shekhawat (Field Officer)",
    packagingType: "Barcoded Tamper-Evident Poly-Woven Bag #TX-8991",
    testingLab: "AgriTraceX Central Seed Quality Lab, Hyderabad",
    currentStage: "Testing", // Collected | Packed | Dispatched | Received by Lab | Testing | Result Available
    testingStatus: "Testing in Progress",
    custodyChain: [
      {
        stage: "Collected",
        timestamp: "2026-09-16 11:30 AM",
        person: "Vikas Shekhawat (Field Officer)",
        location: "FLD-MP-042 Plot A, Khargone",
        status: "Completed",
        notes: "Representative sampling from 5 primary cobs per row across replications."
      },
      {
        stage: "Packed",
        timestamp: "2026-09-16 13:00 PM",
        person: "Vikas Shekhawat",
        location: "Khargone Field Office Hub",
        status: "Completed",
        notes: "Desiccant packet included. Tamper seal QR code #TX-8991 scanned."
      },
      {
        stage: "Dispatched",
        timestamp: "2026-09-16 17:30 PM",
        person: "BlueDart Express Logistics (AWB #889201944)",
        location: "Indore Logistics Hub",
        status: "Completed",
        notes: "Temperature-logged transit box maintained at 22°C."
      },
      {
        stage: "Received by Lab",
        timestamp: "2026-09-17 09:15 AM",
        person: "Dr. Kavita Narayanan (Senior Lab Analyst)",
        location: "Central Testing Lab, Hyderabad",
        status: "Completed",
        notes: "Barcode verified. Tamper seal intact. Moisture sensor reading 14.1% on arrival."
      },
      {
        stage: "Testing",
        timestamp: "2026-09-17 14:00 PM",
        person: "Dr. Kavita Narayanan",
        location: "Chromatography & Grain Quality Suite",
        status: "In Progress",
        notes: "Assays underway for starch amylose ratio, protein NIR, and 1000-grain weight."
      },
      {
        stage: "Result Available",
        timestamp: "Expected 2026-09-19 16:00",
        person: "Lab Director",
        location: "Central Testing Lab, Hyderabad",
        status: "Pending",
        notes: "Final certified analytical certificate generation."
      }
    ],
    results: {
      moistureContentPercent: 13.8,
      proteinContentPercent: 10.4,
      starchContentPercent: 72.1,
      oilContentPercent: 4.8,
      thousandKernelWeightGrams: 342.5,
      aflatoxinB1Ppb: "< 2.0 (Safe / Export Grade)",
      testResultStatus: "Preliminary Validated"
    }
  },
  {
    id: "SMP-2026-082",
    trialId: "TR-2026-065",
    trialName: "Late-Sown Terminal Heat Tolerance Durum Wheat Evaluation",
    crop: "Wheat (Durum)",
    harvestBatch: "BATCH-WH-065-FINAL",
    quantity: "20.0 kg Grain Composite",
    sampleType: "Final Plot Harvest Composite",
    collectionDate: "2026-03-29 10:00 AM",
    collectedBy: "Vikas Shekhawat",
    packagingType: "Barcoded Seal #TX-7740",
    testingLab: "AgriTraceX Central Seed Quality Lab, Hyderabad",
    currentStage: "Result Available",
    testingStatus: "Completed / Certified",
    custodyChain: [
      { stage: "Collected", timestamp: "2026-03-29 10:00 AM", person: "Vikas Shekhawat", location: "Khargone Field Plot", status: "Completed" },
      { stage: "Packed", timestamp: "2026-03-29 12:30 PM", person: "Vikas Shekhawat", location: "Khargone Hub", status: "Completed" },
      { stage: "Dispatched", timestamp: "2026-03-29 16:00 PM", person: "BlueDart Express", location: "Indore Transit Hub", status: "Completed" },
      { stage: "Received by Lab", timestamp: "2026-03-30 11:20 AM", person: "Dr. Kavita Narayanan", location: "Central Lab, Hyderabad", status: "Completed" },
      { stage: "Testing", timestamp: "2026-03-31 09:00 AM", person: "Dr. Kavita Narayanan", location: "Central Lab, Hyderabad", status: "Completed" },
      { stage: "Result Available", timestamp: "2026-04-02 15:30 PM", person: "Lab Director", location: "Central Lab, Hyderabad", status: "Completed" }
    ],
    results: {
      moistureContentPercent: 11.8,
      proteinContentPercent: 13.9,
      wetGlutenPercent: 31.4,
      sedimentationIndexMl: 46.0,
      thousandKernelWeightGrams: 48.2,
      yellowPigmentPpm: 7.8,
      testResultStatus: "Passed - Premium Durum Grade 1"
    }
  },
  {
    id: "SMP-2026-104",
    trialId: "TR-2026-088",
    trialName: "Aromatic Basmati Lodging & Blast Screening Trial",
    crop: "Basmati Paddy / Rice",
    harvestBatch: "BATCH-RC-088-MID",
    quantity: "5.0 kg Tillering Biomass",
    sampleType: "Mid-Season Plant Tissue Analysis",
    collectionDate: "2026-09-14 14:30 PM",
    collectedBy: "Harpreet Gill",
    packagingType: "Cold-Chain Sealed Cryo-Box #TX-9102",
    testingLab: "PAU Molecular Pathology Center, Ludhiana",
    currentStage: "Received by Lab",
    testingStatus: "Sample Checked In",
    custodyChain: [
      { stage: "Collected", timestamp: "2026-09-14 14:30 PM", person: "Harpreet Gill", location: "Raikot Field", status: "Completed" },
      { stage: "Packed", timestamp: "2026-09-14 16:00 PM", person: "Harpreet Gill", location: "Ludhiana Depot", status: "Completed" },
      { stage: "Dispatched", timestamp: "2026-09-15 09:00 AM", person: "SpeedPost Express", location: "Ludhiana Post", status: "Completed" },
      { stage: "Received by Lab", timestamp: "2026-09-15 13:45 PM", person: "Dr. S. K. Aulakh", location: "PAU Lab", status: "Completed" },
      { stage: "Testing", timestamp: "Scheduled 2026-09-18", person: "PAU Pathology Team", location: "PAU Lab", status: "Pending" },
      { stage: "Result Available", timestamp: "Expected 2026-09-22", person: "Lead Pathologist", location: "PAU Lab", status: "Pending" }
    ],
    results: {
      blastGeneMarkers: "Pi9 positive (+), Pita positive (+)",
      nitrogenTissuePercent: 3.42,
      siliconTissuePercent: 4.88,
      testResultStatus: "In Assay"
    }
  }
];
