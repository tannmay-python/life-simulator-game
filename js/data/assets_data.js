// Catalog of properties (with flip, rent, and renovation systems), luxury vehicles, private aircraft, superyachts, and fine art

export const PROPERTY_TEMPLATES = [
  {
    id: "studio_apt",
    name: "Modern Downtown Studio Apartment",
    type: "Residential",
    icon: "🏢",
    basePriceUSD: 280000,
    baseRentYieldPct: 0.075, // 7.5% annual gross rent
    renovationCostUSD: 35000,
    annualMaintenancePct: 0.015,
    description: "Compact urban studio in a high-demand tech hub. Steady rental demand from young professionals."
  },
  {
    id: "suburban_villa",
    name: "Suburban 4-Bedroom Family Villa",
    type: "Residential",
    icon: "🏡",
    basePriceUSD: 750000,
    baseRentYieldPct: 0.065,
    renovationCostUSD: 85000,
    annualMaintenancePct: 0.018,
    description: "Spacious suburban home with landscaped garden, two-car garage, and top school district access."
  },
  {
    id: "historic_townhouse",
    name: "Historic Kensington Townhouse",
    type: "Residential",
    icon: "🏛️",
    basePriceUSD: 2400000,
    baseRentYieldPct: 0.055,
    renovationCostUSD: 250000,
    annualMaintenancePct: 0.020,
    description: "Victorian brick townhouse with period architecture, high ceilings, and prime central location."
  },
  {
    id: "sky_penthouse",
    name: "Billionaires' Row Sky Penthouse",
    type: "Luxury Residential",
    icon: "🌆",
    basePriceUSD: 14500000,
    baseRentYieldPct: 0.050,
    renovationCostUSD: 1200000,
    annualMaintenancePct: 0.025,
    description: "Duplex penthouse on the 88th floor featuring panoramic city skyline views, private elevator, and terrace pool."
  },
  {
    id: "oceanfront_estate",
    name: "Oceanfront Mediterranean Villa",
    type: "Luxury Residential",
    icon: "🏖️",
    basePriceUSD: 28000000,
    baseRentYieldPct: 0.052,
    renovationCostUSD: 2500000,
    annualMaintenancePct: 0.030,
    description: "Direct beach access, infinity cliffside pool, private helipad, and guest villas in French Riviera / Malibu."
  },
  {
    id: "commercial_tower",
    name: "Grade-A Corporate Office Tower",
    type: "Commercial",
    icon: "🏙️",
    basePriceUSD: 65000000,
    baseRentYieldPct: 0.082,
    renovationCostUSD: 6000000,
    annualMaintenancePct: 0.022,
    description: "32-floor commercial skyscraper leased to multinational investment banks and tech conglomerates."
  },
  {
    id: "private_island_estate",
    name: "Private Bahamian Tropical Island",
    type: "Ultra-Luxury Island",
    icon: "🏝️",
    basePriceUSD: 95000000,
    baseRentYieldPct: 0.045,
    renovationCostUSD: 12000000,
    annualMaintenancePct: 0.040,
    description: "120-acre private paradise with deep-water mega-yacht harbor, solar microgrid, runway, and royal villas."
  }
];

export const LUXURY_VEHICLES = [
  { id: "porsche_gt3", name: "Porsche 911 GT3 RS", icon: "🏎️", priceUSD: 245000, category: "Sports Car", annualDepreciation: 0.02, prestige: 25 },
  { id: "ferrari_daytona", name: "Ferrari Daytona SP3", icon: "🏎️", priceUSD: 2250000, category: "Hypercar", annualDepreciation: -0.04, prestige: 60, desc: "Limited series masterpiece that appreciates over time." },
  { id: "bugatti_chiron", name: "Bugatti Chiron Super Sport", icon: "🏎️", priceUSD: 3900000, category: "Hypercar", annualDepreciation: -0.02, prestige: 75, desc: "Quad-turbo W16 producing 1,577 hp. True automotive royalty." },
  { id: "rolls_phantom", name: "Rolls-Royce Phantom VIII Extended", icon: "🚘", priceUSD: 580000, category: "Ultra-Luxury", annualDepreciation: 0.06, prestige: 45, desc: "Starlight headliner and whisper-quiet whisper V12 engine." },
  { id: "vintage_ferrari_gto", name: "1962 Ferrari 250 GTO", icon: "🏁", priceUSD: 55000000, category: "Legendary Classic", annualDepreciation: -0.08, prestige: 100, desc: "The holy grail of collector cars. Appreciates aggressively every year." }
];

export const AVIATION_MARINE = [
  { id: "helicopter_h160", name: "Airbus H160 VIP Helicopter", icon: "🚁", priceUSD: 16000000, category: "Aviation", annualMaintenanceUSD: 450000, prestige: 55 },
  { id: "gulfstream_g700", name: "Gulfstream G700 Flagship Jet", icon: "✈️", priceUSD: 78000000, category: "Aviation", annualMaintenanceUSD: 1800000, prestige: 90, desc: "Mach 0.925 top speed with 5 bespoke living areas and master suite." },
  { id: "benetti_yacht", name: "55m Benetti Custom Superyacht", icon: "🛥️", priceUSD: 48000000, category: "Marine", annualMaintenanceUSD: 2200000, prestige: 85, desc: "Tri-deck luxury yacht with jacuzzi, beach club, and tender garage." },
  { id: "lurssen_megayacht", name: "115m Lürssen Bespoke Mega-Yacht", icon: "🛳️", priceUSD: 250000000, category: "Marine", annualMaintenanceUSD: 9000000, prestige: 100, desc: "Floating sovereign palace with submarine dock, 2 helipads, and 40 crew." }
];

export const FINE_ART_COLLECTIBLES = [
  { id: "patek_grandmaster", name: "Patek Philippe Grandmaster Chime (White Gold)", icon: "⌚", priceUSD: 3600000, appreciationRate: 0.06, prestige: 40 },
  { id: "rolex_paul_newman", name: "Vintage Rolex Daytona 'Paul Newman' Ref 6239", icon: "⏱️", priceUSD: 1400000, appreciationRate: 0.05, prestige: 30 },
  { id: "monet_water_lilies", name: "Claude Monet 'Nymphéas' (Water Lilies, 1914)", icon: "🎨", priceUSD: 48000000, appreciationRate: 0.07, prestige: 90, desc: "Museum-grade impressionist masterpiece that anchors generational prestige." },
  { id: "basquiat_painting", name: "Jean-Michel Basquiat 'Untitled Skull' (1982)", icon: "🖼️", priceUSD: 75000000, appreciationRate: 0.08, prestige: 95, desc: "Seminal contemporary artwork commanding global auction records." },
  { id: "da_vinci_codex", name: "Leonardo da Vinci Scientific Codex Folio", icon: "📜", priceUSD: 95000000, appreciationRate: 0.09, prestige: 100, desc: "Priceless Renaissance manuscript on physics and astronomy." }
];
