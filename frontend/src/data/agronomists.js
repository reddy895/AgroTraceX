// src/data/agronomists.js
export const mockAgronomists = [
  {
    id: "AGRO-01",
    name: "Dr. Arvind Shrivastava",
    degree: "Ph.D. Plant Genetics & Crop Physiology (IARI)",
    specialization: "Maize & Cereal Phenotyping, Drought Resilience",
    experienceYears: 14,
    location: "Indore, Madhya Pradesh",
    email: "arvind.shrivastava@agrotracex-demo.com",
    phone: "+91 94250 88910",
    assignedTrials: ["TR-2026-084", "TR-2026-092"],
    activeVisitsThisWeek: 4,
    availability: "Available",
    verificationStatus: "Verified Scientist",
    totalObservationsApproved: 342,
    rating: 4.95,
    bio: "Principal Agronomist leading western zone hybrid evaluation trials. Expert in high-throughput field phenotyping and NDVI canopy validation."
  },
  {
    id: "AGRO-02",
    name: "Dr. Meenakshi Sundaram",
    degree: "Ph.D. Plant Pathology (TNAU)",
    specialization: "Rice Blast, Sheath Blight & Bacterial Leaf Blight",
    experienceYears: 11,
    location: "Karnal / Ludhiana, Punjab & Haryana",
    email: "meenakshi.s@agrotracex-demo.com",
    phone: "+91 98402 77123",
    assignedTrials: ["TR-2026-088"],
    activeVisitsThisWeek: 3,
    availability: "In Field",
    verificationStatus: "Verified Scientist",
    totalObservationsApproved: 289,
    rating: 4.88,
    bio: "Specialist in Basmati and hybrid rice disease screening protocols, lodging indices, and yield ANOVA statistical validation."
  },
  {
    id: "AGRO-03",
    name: "Dr. Nitin Deshmukh",
    degree: "M.Sc. Agronomy & Cotton Breeding (PDKV)",
    specialization: "Bt Cotton Agronomy, Pink Bollworm Resistance, Canopy Architecture",
    experienceYears: 9,
    location: "Nagpur / Ahmednagar, Maharashtra",
    email: "nitin.deshmukh@agrotracex-demo.com",
    phone: "+91 97640 11982",
    assignedTrials: ["TR-2026-079", "TR-2026-101"],
    activeVisitsThisWeek: 5,
    availability: "Available",
    verificationStatus: "Verified Scientist",
    totalObservationsApproved: 215,
    rating: 4.92,
    bio: "Lead specialist in precision cotton trials across rainfed and drip vertisol ecosystems in Central India."
  }
];

export const mockFieldOfficers = [
  {
    id: "OFF-101",
    name: "Vikas Shekhawat",
    phone: "+91 94251 33201",
    region: "Khargone & Nimar Zone, MP",
    assignedTrials: ["TR-2026-084"],
    completedVisitsMonth: 28,
    gpsAccuracyAvgMeters: 2.1,
    status: "Active on Field"
  },
  {
    id: "OFF-102",
    name: "Harpreet Gill",
    phone: "+91 98150 44902",
    region: "Ludhiana & Patiala, Punjab",
    assignedTrials: ["TR-2026-088"],
    completedVisitsMonth: 34,
    gpsAccuracyAvgMeters: 1.8,
    status: "Active on Field"
  },
  {
    id: "OFF-103",
    name: "Sandeep Jadhav",
    phone: "+91 98220 55819",
    region: "Ahmednagar & Aurangabad, MH",
    assignedTrials: ["TR-2026-079"],
    completedVisitsMonth: 31,
    gpsAccuracyAvgMeters: 2.4,
    status: "Active on Field"
  },
  {
    id: "OFF-104",
    name: "Karthik Reddy",
    phone: "+91 99001 88231",
    region: "Chikkaballapur & Kolar, Karnataka",
    assignedTrials: ["TR-2026-092"],
    completedVisitsMonth: 22,
    gpsAccuracyAvgMeters: 1.9,
    status: "Available"
  }
];
