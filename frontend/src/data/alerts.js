// src/data/alerts.js
export const mockAlerts = [
  {
    id: "ALT-101",
    severity: "danger", // danger | warning | info | success
    category: "Observation Overdue",
    title: "Silking Observation Overdue (+24h)",
    message: "Trial TR-2026-084: Replication R3 silking count and tassel photo overdue for Field Officer Shekhawat.",
    timeAgo: "2 hours ago",
    trialId: "TR-2026-084",
    link: "/trials/TR-2026-084",
    unread: true
  },
  {
    id: "ALT-102",
    severity: "warning",
    category: "Protocol Deviation",
    title: "Waterlogging Detected in Cotton Trial",
    message: "Trial TR-2026-079: Sandeep Jadhav logged heavy standing water in Sector C. Agronomist intervention advised.",
    timeAgo: "5 hours ago",
    trialId: "TR-2026-079",
    link: "/trials/TR-2026-079",
    unread: true
  },
  {
    id: "ALT-103",
    severity: "info",
    category: "Sample Received",
    title: "Grain Sample Checked into Hyderabad Lab",
    message: "Sample SMP-2026-099 (Hybrid Maize NA-901) received at Central Seed Lab. NIR spectroscopy testing initiated.",
    timeAgo: "1 day ago",
    trialId: "TR-2026-084",
    link: "/samples",
    unread: false
  },
  {
    id: "ALT-104",
    severity: "success",
    category: "Report Certified",
    title: "Durum Wheat Dossier Certified",
    message: "Report REP-2026-065 signed off by Dr. Arvind Shrivastava and Dr. Ananya Sen with 94.2 rating.",
    timeAgo: "2 days ago",
    trialId: "TR-2026-065",
    link: "/reports/REP-2026-065",
    unread: false
  },
  {
    id: "ALT-105",
    severity: "warning",
    category: "Agronomist Review Pending",
    title: "Review Required: Basmati Tillering",
    message: "Trial TR-2026-088: Field Officer Gill uploaded blast lesion metrics. Pending Dr. Meenakshi's sign-off.",
    timeAgo: "3 days ago",
    trialId: "TR-2026-088",
    link: "/trials/TR-2026-088",
    unread: false
  }
];
