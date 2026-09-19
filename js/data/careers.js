// Professional corporate careers, progression ladders, salary benchmarks, and equity compensation

export const CAREER_TRACKS = [
  {
    id: "swe",
    name: "Software Engineering & Tech",
    industry: "Technology",
    icon: "💻",
    description: "Build distributed cloud systems, AI algorithms, and tech infrastructure with lucrative RSUs.",
    requiredDegrees: ["Computer Science & AI", "Computer Science", "Physics & Quantum Eng", "Electrical Eng", "Informatics & AI"],
    minSmarts: 70,
    ladder: [
      { level: 1, title: "Junior Software Engineer", baseSalaryUSD: 115000, bonusPct: 0.10, stockUSD: 25000, reqExp: 0, minSmarts: 70 },
      { level: 2, title: "Software Engineer II", baseSalaryUSD: 155000, bonusPct: 0.15, stockUSD: 45000, reqExp: 2, minSmarts: 72 },
      { level: 3, title: "Senior Software Engineer", baseSalaryUSD: 195000, bonusPct: 0.20, stockUSD: 85000, reqExp: 5, minSmarts: 75 },
      { level: 4, title: "Staff Software Engineer", baseSalaryUSD: 250000, bonusPct: 0.25, stockUSD: 160000, reqExp: 8, minSmarts: 80 },
      { level: 5, title: "Principal Engineer", baseSalaryUSD: 330000, bonusPct: 0.30, stockUSD: 280000, reqExp: 12, minSmarts: 85 },
      { level: 6, title: "VP of Engineering", baseSalaryUSD: 450000, bonusPct: 0.40, stockUSD: 500000, reqExp: 16, minSmarts: 88 },
      { level: 7, title: "Chief Technology Officer (CTO)", baseSalaryUSD: 650000, bonusPct: 0.50, stockUSD: 1200000, reqExp: 20, minSmarts: 90 }
    ]
  },
  {
    id: "law_firm",
    name: "Corporate Law Firm (BigLaw)",
    industry: "Legal",
    icon: "⚖️",
    description: "Grind the prestigious BigLaw partnership track handling billion-dollar M&A and corporate litigations.",
    requiredDegrees: ["Corporate Law (BA LLB)", "Government & Law", "Jurisprudence (Law)", "Law & Society", "Law"],
    minSmarts: 78,
    ladder: [
      { level: 1, title: "First-Year Associate (BigLaw)", baseSalaryUSD: 225000, bonusPct: 0.10, stockUSD: 0, reqExp: 0, minSmarts: 78 },
      { level: 2, title: "Mid-Level Associate", baseSalaryUSD: 295000, bonusPct: 0.18, stockUSD: 0, reqExp: 3, minSmarts: 80 },
      { level: 3, title: "Senior Associate", baseSalaryUSD: 390000, bonusPct: 0.25, stockUSD: 0, reqExp: 6, minSmarts: 82 },
      { level: 4, title: "Special Counsel / Non-Equity Partner", baseSalaryUSD: 520000, bonusPct: 0.35, stockUSD: 0, reqExp: 9, minSmarts: 85 },
      { level: 5, title: "Junior Partner", baseSalaryUSD: 850000, bonusPct: 0.45, stockUSD: 0, reqExp: 12, minSmarts: 88 },
      { level: 6, title: "Senior Equity Partner (Profit Share)", baseSalaryUSD: 1950000, bonusPct: 0.60, stockUSD: 0, reqExp: 16, minSmarts: 90 }
    ]
  },
  {
    id: "inhouse_counsel",
    name: "In-House Corporate Counsel",
    industry: "Corporate Legal",
    icon: "📜",
    description: "Provide strategic legal counsel inside a multinational tech or fortune 500 corporation with equity grants.",
    requiredDegrees: ["Corporate Law (BA LLB)", "Government & Law", "Jurisprudence (Law)", "Law"],
    minSmarts: 75,
    ladder: [
      { level: 1, title: "Legal Counsel", baseSalaryUSD: 160000, bonusPct: 0.15, stockUSD: 35000, reqExp: 2, minSmarts: 75 },
      { level: 2, title: "Senior Corporate Counsel", baseSalaryUSD: 220000, bonusPct: 0.20, stockUSD: 70000, reqExp: 5, minSmarts: 78 },
      { level: 3, title: "Director of Legal", baseSalaryUSD: 290000, bonusPct: 0.25, stockUSD: 140000, reqExp: 8, minSmarts: 82 },
      { level: 4, title: "VP of Legal & Deputy GC", baseSalaryUSD: 400000, bonusPct: 0.35, stockUSD: 300000, reqExp: 12, minSmarts: 85 },
      { level: 5, title: "General Counsel & Chief Legal Officer", baseSalaryUSD: 600000, bonusPct: 0.50, stockUSD: 850000, reqExp: 16, minSmarts: 88 }
    ]
  },
  {
    id: "investment_banking",
    name: "Investment Banking & Private Equity",
    industry: "Finance",
    icon: "📈",
    description: "Advise on mega-mergers, IPO listings, and leverage buyout funds on Wall Street / City of London.",
    requiredDegrees: ["Economics & Finance", "Quantitative Economics", "Commerce & Finance", "Rotman Finance", "Finance & Fintech"],
    minSmarts: 78,
    ladder: [
      { level: 1, title: "Investment Banking Analyst", baseSalaryUSD: 125000, bonusPct: 0.70, stockUSD: 10000, reqExp: 0, minSmarts: 78 },
      { level: 2, title: "Investment Banking Associate", baseSalaryUSD: 200000, bonusPct: 0.85, stockUSD: 30000, reqExp: 3, minSmarts: 80 },
      { level: 3, title: "Vice President (M&A)", baseSalaryUSD: 300000, bonusPct: 1.00, stockUSD: 80000, reqExp: 6, minSmarts: 83 },
      { level: 4, title: "Managing Director", baseSalaryUSD: 550000, bonusPct: 1.50, stockUSD: 350000, reqExp: 10, minSmarts: 87 },
      { level: 5, title: "Hedge Fund / Private Equity Partner", baseSalaryUSD: 950000, bonusPct: 2.20, stockUSD: 1500000, reqExp: 14, minSmarts: 90 }
    ]
  },
  {
    id: "medicine",
    name: "Medicine & Specialty Surgery",
    industry: "Healthcare",
    icon: "🩺",
    description: "Undergo demanding clinical training to become a world-renowned surgeon and medical specialist.",
    requiredDegrees: ["Medicine (MBBS)", "Medicine & Surgery", "Medicine", "Biomedical Sciences"],
    minSmarts: 82,
    ladder: [
      { level: 1, title: "Surgical Resident", baseSalaryUSD: 72000, bonusPct: 0.05, stockUSD: 0, reqExp: 0, minSmarts: 82 },
      { level: 2, title: "Chief Resident / Clinical Fellow", baseSalaryUSD: 95000, bonusPct: 0.08, stockUSD: 0, reqExp: 4, minSmarts: 83 },
      { level: 3, title: "Attending Specialist Surgeon", baseSalaryUSD: 420000, bonusPct: 0.15, stockUSD: 0, reqExp: 7, minSmarts: 85 },
      { level: 4, title: "Department Chief of Surgery", baseSalaryUSD: 650000, bonusPct: 0.20, stockUSD: 50000, reqExp: 12, minSmarts: 88 },
      { level: 5, title: "Director of Private Specialty Clinic", baseSalaryUSD: 1100000, bonusPct: 0.35, stockUSD: 200000, reqExp: 16, minSmarts: 90 }
    ]
  },
  {
    id: "consulting",
    name: "Management Consulting (MBB)",
    industry: "Consulting",
    icon: "📊",
    description: "Advise Fortune 500 CEOs and sovereign states on high-stakes corporate strategy and turnaround.",
    requiredDegrees: ["Economics & Finance", "MBA Business Strategy", "Computer Science", "General Business", "Business Administration"],
    minSmarts: 76,
    ladder: [
      { level: 1, title: "Business Analyst (MBB)", baseSalaryUSD: 115000, bonusPct: 0.20, stockUSD: 0, reqExp: 0, minSmarts: 76 },
      { level: 2, title: "Senior Consultant", baseSalaryUSD: 185000, bonusPct: 0.25, stockUSD: 0, reqExp: 2, minSmarts: 78 },
      { level: 3, title: "Engagement Manager / Project Leader", baseSalaryUSD: 260000, bonusPct: 0.35, stockUSD: 0, reqExp: 5, minSmarts: 82 },
      { level: 4, title: "Associate Partner", baseSalaryUSD: 400000, bonusPct: 0.50, stockUSD: 50000, reqExp: 8, minSmarts: 85 },
      { level: 5, title: "Senior Partner & Managing Director", baseSalaryUSD: 1200000, bonusPct: 0.80, stockUSD: 250000, reqExp: 12, minSmarts: 89 }
    ]
  },
  {
    id: "civil_service",
    name: "Civil Services & Governance (IAS/Diplomat)",
    industry: "Government",
    icon: "🏛️",
    description: "Wield immense executive administrative power governing districts, policy ministries, and foreign diplomacy.",
    requiredDegrees: ["Government & Law", "Philosophy, Politics & Economics (PPE)", "Law", "History", "Commerce"],
    minSmarts: 80,
    ladder: [
      { level: 1, title: "Sub-Divisional Magistrate / Assistant Secretary", baseSalaryUSD: 45000, bonusPct: 0.05, stockUSD: 0, reqExp: 0, minSmarts: 80, prestige: 30 },
      { level: 2, title: "District Magistrate / Collector", baseSalaryUSD: 65000, bonusPct: 0.05, stockUSD: 0, reqExp: 4, minSmarts: 82, prestige: 55 },
      { level: 3, title: "Joint Secretary to Government", baseSalaryUSD: 90000, bonusPct: 0.08, stockUSD: 0, reqExp: 9, minSmarts: 85, prestige: 75 },
      { level: 4, title: "Secretary / Ambassador Plenipotentiary", baseSalaryUSD: 130000, bonusPct: 0.10, stockUSD: 0, reqExp: 15, minSmarts: 88, prestige: 90 },
      { level: 5, title: "Cabinet Secretary / Head of Civil Service", baseSalaryUSD: 180000, bonusPct: 0.12, stockUSD: 0, reqExp: 20, minSmarts: 92, prestige: 100 }
    ]
  },
  {
    id: "quant_trading",
    name: "Quantitative Trading & Algo Fund",
    industry: "Quantitative Finance",
    icon: "⚡",
    description: "Develop algorithmic mathematical models trading billions across global electronic exchanges.",
    requiredDegrees: ["Mathematics & Computing", "Physics & Quantum Eng", "Computer Science & AI", "Mathematics"],
    minSmarts: 88,
    ladder: [
      { level: 1, title: "Junior Quantitative Researcher", baseSalaryUSD: 200000, bonusPct: 1.00, stockUSD: 50000, reqExp: 0, minSmarts: 88 },
      { level: 2, title: "Quantitative Trader", baseSalaryUSD: 300000, bonusPct: 1.80, stockUSD: 120000, reqExp: 3, minSmarts: 90 },
      { level: 3, title: "Senior Quant Portfolio Manager", baseSalaryUSD: 500000, bonusPct: 3.00, stockUSD: 400000, reqExp: 6, minSmarts: 92 },
      { level: 4, title: "Head of Quantitative Strategies", baseSalaryUSD: 1000000, bonusPct: 5.00, stockUSD: 2000000, reqExp: 10, minSmarts: 95 }
    ]
  }
];

export const WORK_ACTIONS = [
  { id: "work_overtime", name: "Work Hard & Overtime", energyCost: 15, performanceGain: 12, stressGain: 8, desc: "Deliver outstanding presentations, stay late, and impress senior leadership." },
  { id: "network_execs", name: "Network with Executives & Mentors", energyCost: 10, performanceGain: 8, prestigeGain: 5, desc: "Attend private industry dinners and secure powerful sponsors." },
  { id: "slump", name: "Quiet Quitting / Relax", energyCost: -10, performanceGain: -10, stressGain: -15, desc: "Do the bare minimum to preserve mental health." }
];
