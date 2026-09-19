// Special skill-based interactive careers: Indie Game Dev, Content Creator, Fashion Model, Musician, Pro Athlete, Author

export const SPECIAL_CAREERS = {
  indie_dev: {
    id: "indie_dev",
    name: "Indie Game Developer",
    icon: "🎮",
    description: "Design, code, and self-publish hit video games on Steam and digital stores.",
    genres: [
      { id: "roguelike", name: "Action Roguelike", baseCost: 15000, marketAppeal: 0.85, devTimeYears: 1 },
      { id: "cozy_sim", name: "Cozy Farming & Life Sim", baseCost: 25000, marketAppeal: 0.90, devTimeYears: 2 },
      { id: "cyberpunk_rpg", name: "Sci-Fi Cyberpunk RPG", baseCost: 80000, marketAppeal: 0.95, devTimeYears: 3 },
      { id: "tactical_strategy", name: "Grand Tactical Strategy", baseCost: 40000, marketAppeal: 0.80, devTimeYears: 2 },
      { id: "psychological_horror", name: "Psychological Survival Horror", baseCost: 20000, marketAppeal: 0.85, devTimeYears: 1 }
    ],
    platforms: [
      { id: "steam_pc", name: "Steam PC", feeUSD: 100, cut: 0.30, reachMultiplier: 1.5 },
      { id: "mobile_stores", name: "iOS & Android Mobile", feeUSD: 99, cut: 0.30, reachMultiplier: 2.0 },
      { id: "consoles", name: "PlayStation & Switch", feeUSD: 5000, cut: 0.30, reachMultiplier: 1.2 }
    ],
    gearUpgrades: [
      { id: "dev_pc", name: "High-End Workstation PC", costUSD: 3500, qualityBonus: 15 },
      { id: "sound_booth", name: "Foley Studio & Sound Suite", costUSD: 12000, qualityBonus: 25 },
      { id: "mocap_suit", name: "Full-Body Motion Capture Rig", costUSD: 30000, qualityBonus: 40 }
    ]
  },

  content_creator: {
    id: "content_creator",
    name: "Digital Creator & Streamer",
    icon: "📹",
    description: "Build a massive media empire with millions of subscribers, sponsorships, and viral streams.",
    niches: [
      { id: "tech_ai", name: "Tech, AI & Gadget Reviews", rpmUSD: 18, appeal: "High" },
      { id: "gaming_esports", name: "Gaming & Live Streaming", rpmUSD: 6, appeal: "Massive" },
      { id: "finance_wealth", name: "Personal Finance & Investing", rpmUSD: 32, appeal: "Elite" },
      { id: "comedy_lifestyle", name: "Comedy & High-Energy Vlogs", rpmUSD: 10, appeal: "Viral" }
    ],
    studioTiers: [
      { id: "smartphone", name: "Smartphone & Desk Mic", costUSD: 800, prodScore: 20 },
      { id: "dslr_studio", name: "4K Cinema Camera & Acoustic Studio", costUSD: 8500, prodScore: 50 },
      { id: "media_house", name: "Full Production House & Editor Team", costUSD: 60000, prodScore: 95 }
    ],
    milestones: [
      { subs: 100000, title: "Silver Play Button", sponsorRateUSD: 2500 },
      { subs: 1000000, title: "Gold Creator Award", sponsorRateUSD: 25000 },
      { subs: 10000000, title: "Diamond Creator Icon", sponsorRateUSD: 150000 }
    ]
  },

  model: {
    id: "model",
    name: "Fashion Model & Brand Ambassador",
    icon: "👠",
    description: "Walk Paris Fashion Week, grace international magazine covers, and front global luxury campaigns.",
    minLooks: 75,
    agencyTiers: [
      { id: "local_agency", name: "Boutique City Agency", cutPct: 0.25, prestigeReq: 20, gigPayUSD: 3000 },
      { id: "national_agency", name: "National Talent Management", cutPct: 0.20, prestigeReq: 50, gigPayUSD: 18000 },
      { id: "elite_world", name: "Elite / IMG Models Worldwide", cutPct: 0.15, prestigeReq: 80, gigPayUSD: 120000 }
    ],
    campaigns: [
      { id: "lookbook", name: "E-Commerce Lookbook Shoot", payUSD: 4000, minLooks: 70 },
      { id: "runway_paris", name: "Paris Haute Couture Runway", payUSD: 25000, minLooks: 85 },
      { id: "vogue_cover", name: "Vogue Cover Story & Editorial", payUSD: 50000, minLooks: 90 },
      { id: "luxury_fragrance", name: "Global Luxury Perfume Campaign (Chanel/Dior)", payUSD: 750000, minLooks: 95 }
    ]
  },

  musician: {
    id: "musician",
    name: "Music Artist & Producer",
    icon: "🎵",
    description: "Compose multi-platinum records, top global charts, and perform sold-out stadium tours.",
    genres: [
      { id: "hip_hop", name: "Hip-Hop & Trap", viralFactor: 1.3, streamingWeight: 1.4 },
      { id: "pop", name: "Global Pop", viralFactor: 1.5, streamingWeight: 1.5 },
      { id: "electronic", name: "Electronic & House", viralFactor: 1.1, streamingWeight: 1.2 },
      { id: "alt_rock", name: "Alternative Rock", viralFactor: 0.9, streamingWeight: 1.0 },
      { id: "rnb", name: "Neo-Soul & R&B", viralFactor: 1.0, streamingWeight: 1.1 }
    ],
    studioGear: [
      { id: "home_mic", name: "Home Audio Interface & Mic", costUSD: 1500, quality: 30 },
      { id: "pro_studio", name: "Pro Acoustics & Analog Synths", costUSD: 25000, quality: 70 },
      { id: "legendary_master", name: "Abbey Road-Grade Master Suite", costUSD: 120000, quality: 100 }
    ],
    tourTypes: [
      { id: "club_tour", name: "Intimate Club Tour (15 Dates)", costUSD: 30000, estRevenueUSD: 120000, minFame: 30 },
      { id: "arena_tour", name: "National Arena Tour (30 Arenas)", costUSD: 500000, estRevenueUSD: 6000000, minFame: 65 },
      { id: "world_stadium", name: "Global World Stadium Tour (50 Stadiums)", costUSD: 4000000, estRevenueUSD: 45000000, minFame: 88 }
    ]
  },

  athlete: {
    id: "athlete",
    name: "Professional Athlete",
    icon: "🏆",
    description: "Compete at the highest athletic echelon, win championship trophies, and sign blockbuster shoe deals.",
    sports: [
      { id: "football", name: "Football / Soccer", peakAgeRange: [22, 33], topSalaryUSD: 35000000 },
      { id: "basketball", name: "Basketball (NBA)", peakAgeRange: [21, 34], topSalaryUSD: 45000000 },
      { id: "f1", name: "Formula 1 Racing", peakAgeRange: [22, 36], topSalaryUSD: 50000000 },
      { id: "tennis", name: "Grand Slam Tennis", peakAgeRange: [20, 34], topSalaryUSD: 25000000 }
    ],
    trainingRegimens: [
      { id: "daily_drills", name: "Intensive Team Conditioning", costUSD: 0, skillGain: 3, energyCost: 20 },
      { id: "olympic_trainer", name: "Olympic Biomechanics Coach", costUSD: 25000, skillGain: 8, energyCost: 25 },
      { id: "cryo_recovery", name: "Hyperbaric & Cryo Recovery Chamber", costUSD: 50000, skillGain: 12, healthGain: 5 }
    ]
  },

  author: {
    id: "author",
    name: "Author & Novelist",
    icon: "📖",
    description: "Pen bestselling novels, secure massive publishing advances, and license Hollywood screenplays.",
    genres: [
      { id: "sci_fi", name: "Sci-Fi & Cyberpunk", royaltyRate: 0.12, adaptationAppeal: 0.90 },
      { id: "epic_fantasy", name: "Epic High Fantasy", royaltyRate: 0.15, adaptationAppeal: 0.95 },
      { id: "thriller", name: "Psychological Thriller", royaltyRate: 0.12, adaptationAppeal: 0.85 },
      { id: "biography", name: "Titan Biography / Non-Fiction", royaltyRate: 0.18, adaptationAppeal: 0.70 }
    ]
  }
};
