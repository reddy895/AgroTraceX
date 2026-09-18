// src/data/observations.js
export const mockObservations = [
  {
    id: "OBS-2026-401",
    trialId: "TR-2026-084",
    trialName: "Multi-Location Drought-Resilience Evaluation of Hybrid Maize Cultivar NA-901",
    date: "2026-09-15 10:15 AM",
    observerId: "OFF-101",
    observerName: "Vikas Shekhawat (Field Officer)",
    validatorId: "AGRO-01",
    validatorName: "Dr. Arvind Shrivastava",
    cropStage: "Flowering / Tasseling (VT-R1)",
    gps: {
      lat: 21.8235,
      lng: 75.6188,
      accuracyMeters: 2.1,
      isVerified: true
    },
    plantHealth: "Vigorous & Uniform",
    diseaseIncidence: "None detected (0% Northern Leaf Blight)",
    pestIncidence: "Minor FAW egg mass on border rows (0.8% threshold, controlled by pheromone traps)",
    measurements: {
      plantHeightCm: 218,
      canopyCoveragePercent: 88,
      ndviIndex: 0.84,
      soilMoisturePercent: 24.2,
      spadChlorophyll: 54.6,
      anthesisSilkingIntervalDays: 1.8
    },
    notes: "Tasseling complete across 92% of plants in Replicate 1 and 2. Anthesis initiated 36 hours prior to silk emergence, indicating remarkable drought resilience compared to regional check hybrid. Cob length initial projection is 22cm.",
    validationStatus: "Validated",
    validationDate: "2026-09-15 16:30",
    photos: [
      {
        id: "p1",
        caption: "Replication R1 Tassel Emergence & Ear Leaf Angle",
        stage: "Flowering",
        timestamp: "2026-09-15 10:18",
        url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p2",
        caption: "Canopy Density & Row Closure (60cm spacing)",
        stage: "Flowering",
        timestamp: "2026-09-15 10:22",
        url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "p3",
        caption: "Soil Profile & Subsurface Drip Line Inspection",
        stage: "Flowering",
        timestamp: "2026-09-15 10:28",
        url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "OBS-2026-382",
    trialId: "TR-2026-084",
    trialName: "Multi-Location Drought-Resilience Evaluation of Hybrid Maize Cultivar NA-901",
    date: "2026-08-20 09:30 AM",
    observerId: "OFF-101",
    observerName: "Vikas Shekhawat (Field Officer)",
    validatorId: "AGRO-01",
    validatorName: "Dr. Arvind Shrivastava",
    cropStage: "Vegetative (V10 Stage)",
    gps: {
      lat: 21.8233,
      lng: 75.6190,
      accuracyMeters: 1.9,
      isVerified: true
    },
    plantHealth: "Excellent",
    diseaseIncidence: "None detected",
    pestIncidence: "Trace FAW leaf scratches on 2 plants",
    measurements: {
      plantHeightCm: 164,
      canopyCoveragePercent: 74,
      ndviIndex: 0.79,
      soilMoisturePercent: 26.5,
      spadChlorophyll: 51.2,
      anthesisSilkingIntervalDays: null
    },
    notes: "Rapid elongation phase. Stem girth averages 28mm at 2nd internode. Deep green coloration with zero nutrient deficiency symptoms under second fertigation split.",
    validationStatus: "Validated",
    validationDate: "2026-08-20 18:00",
    photos: [
      {
        id: "p4",
        caption: "V10 Internode elongation & leaf collar visibility",
        stage: "Vegetative",
        timestamp: "2026-08-20 09:35",
        url: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "OBS-2026-340",
    trialId: "TR-2026-084",
    trialName: "Multi-Location Drought-Resilience Evaluation of Hybrid Maize Cultivar NA-901",
    date: "2026-06-03 08:45 AM",
    observerId: "OFF-101",
    observerName: "Vikas Shekhawat (Field Officer)",
    validatorId: "AGRO-01",
    validatorName: "Dr. Arvind Shrivastava",
    cropStage: "Germination / Emergence (VE-V1)",
    gps: {
      lat: 21.8234,
      lng: 75.6189,
      accuracyMeters: 2.3,
      isVerified: true
    },
    plantHealth: "Uniform Coleoptile Emergence",
    diseaseIncidence: "None",
    pestIncidence: "None",
    measurements: {
      plantHeightCm: 12,
      canopyCoveragePercent: 15,
      ndviIndex: 0.28,
      soilMoisturePercent: 28.0,
      spadChlorophyll: 38.0,
      anthesisSilkingIntervalDays: null
    },
    notes: "Emergence completed 8 days after sowing. 96.4% emergence count verified. Seedling vigor score 4.8/5.",
    validationStatus: "Validated",
    validationDate: "2026-06-03 15:10",
    photos: [
      {
        id: "p5",
        caption: "V1 seedling emergence count across 5m test row",
        stage: "Germination",
        timestamp: "2026-06-03 08:50",
        url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "OBS-2026-415",
    trialId: "TR-2026-088",
    trialName: "Aromatic Basmati Lodging & Blast Screening Trial",
    date: "2026-09-14 11:30 AM",
    observerId: "OFF-102",
    observerName: "Harpreet Gill (Field Officer)",
    validatorId: "AGRO-02",
    validatorName: "Dr. Meenakshi Sundaram",
    cropStage: "Vegetative / Maximum Tillering",
    gps: {
      lat: 30.6513,
      lng: 75.6022,
      accuracyMeters: 1.8,
      isVerified: true
    },
    plantHealth: "Moderate Blast Pinheads Noted",
    diseaseIncidence: "1.2% leaf blast lesion count in Susceptible Check plot; 0% in SYN-Basmati Aroma Plus",
    pestIncidence: "Stem borer moth deadheart <0.5%",
    measurements: {
      plantHeightCm: 84,
      canopyCoveragePercent: 82,
      ndviIndex: 0.81,
      soilMoisturePercent: 100.0, // flooded paddy
      spadChlorophyll: 42.1,
      anthesisSilkingIntervalDays: null
    },
    notes: "Culm thickness is 20% greater in SYN-Basmati Aroma Plus than Pusa-1121 control. Excellent blast resistance verified under high nitrogen regime.",
    validationStatus: "Validated",
    validationDate: "2026-09-14 17:00",
    photos: [
      {
        id: "p6",
        caption: "Tillering count and blast leaf screening",
        stage: "Vegetative",
        timestamp: "2026-09-14 11:35",
        url: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "OBS-2026-418",
    trialId: "TR-2026-079",
    trialName: "Bt Cotton Bollworm Resistance & Defoliation Kinetics Trial",
    date: "2026-09-13 14:00 PM",
    observerId: "OFF-103",
    observerName: "Sandeep Jadhav (Field Officer)",
    validatorId: "AGRO-03",
    validatorName: "Dr. Nitin Deshmukh",
    cropStage: "Squaring / Early Flowering",
    gps: {
      lat: 19.8912,
      lng: 74.4790,
      accuracyMeters: 2.4,
      isVerified: true
    },
    plantHealth: "Waterlogging symptoms in Plot C after torrential rain",
    diseaseIncidence: "Minor bacterial blight angular spots",
    pestIncidence: "Sucking pests (thrips) 4 per leaf",
    measurements: {
      plantHeightCm: 92,
      canopyCoveragePercent: 62,
      ndviIndex: 0.69,
      soilMoisturePercent: 34.8,
      spadChlorophyll: 46.0,
      anthesisSilkingIntervalDays: null
    },
    notes: "Protocol deviation notice: heavy unseasonal rainfall caused standing water in southwest section. Draining channels dug immediately. Agronomist review pending for bio-stimulant foliar spray.",
    validationStatus: "Pending Review",
    validationDate: null,
    photos: [
      {
        id: "p7",
        caption: "Square retention rate and waterlogging zone",
        stage: "Vegetative",
        timestamp: "2026-09-13 14:15",
        url: "https://images.unsplash.com/photo-1599818814594-55f6e80b2713?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];
