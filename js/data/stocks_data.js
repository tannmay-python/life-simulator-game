// Stock market simulated instruments, ETFs, cryptocurrencies, and banking yields

export const STOCKS_DATA = [
  {
    ticker: "APEX",
    name: "Apex Silicon Systems (AI Chips)",
    sector: "Semiconductors",
    initialPriceUSD: 135.50,
    volatility: 0.35,
    growthBias: 0.14,
    dividendYieldPct: 0.005, // 0.5%
    peRatio: 42,
    description: "Dominant designer of GPU clusters and neural processing accelerators powering frontier AI labs."
  },
  {
    ticker: "AURA",
    name: "Aura Technologies (Devices & OS)",
    sector: "Consumer Electronics",
    initialPriceUSD: 228.00,
    volatility: 0.20,
    growthBias: 0.09,
    dividendYieldPct: 0.015,
    peRatio: 30,
    description: "Iconic consumer hardware ecosystem with over 2 billion active devices, services, and wearables."
  },
  {
    ticker: "OMNI",
    name: "OmniCloud Software",
    sector: "Enterprise Cloud",
    initialPriceUSD: 445.00,
    volatility: 0.22,
    growthBias: 0.11,
    dividendYieldPct: 0.012,
    peRatio: 34,
    description: "Enterprise operating systems, Azure cloud hosting, and enterprise office productivity software."
  },
  {
    ticker: "ATLS",
    name: "Atlas Global Commerce",
    sector: "E-Commerce & Logistics",
    initialPriceUSD: 185.00,
    volatility: 0.28,
    growthBias: 0.12,
    dividendYieldPct: 0.0,
    peRatio: 38,
    description: "Worldwide automated e-commerce fulfillment infrastructure and high-margin cloud services."
  },
  {
    ticker: "VOLT",
    name: "Voltaic Energy & Motors",
    sector: "Clean Energy & Mobility",
    initialPriceUSD: 240.00,
    volatility: 0.45,
    growthBias: 0.16,
    dividendYieldPct: 0.0,
    peRatio: 55,
    description: "Electric vehicle mass production, autonomous robotaxis, and mega-pack battery energy storage."
  },
  {
    ticker: "MORG",
    name: "Morgan Global Capital",
    sector: "Banking & Finance",
    initialPriceUSD: 215.00,
    volatility: 0.18,
    growthBias: 0.07,
    dividendYieldPct: 0.032, // 3.2% dividend
    peRatio: 12,
    description: "Wall Street investment powerhouse managing trillions in institutional debt, M&A, and consumer deposits."
  },
  {
    ticker: "BGNX",
    name: "BioGenix Therapeutics",
    sector: "Biopharma",
    initialPriceUSD: 850.00,
    volatility: 0.30,
    growthBias: 0.13,
    dividendYieldPct: 0.010,
    peRatio: 48,
    description: "Breakthrough pharmaceutical developer of GLP-1 weight loss peptides and neuro-degenerative treatments."
  },
  {
    ticker: "MRYN",
    name: "Maison Royale Luxury Group",
    sector: "Luxury Goods",
    initialPriceUSD: 790.00,
    volatility: 0.22,
    growthBias: 0.08,
    dividendYieldPct: 0.022,
    peRatio: 26,
    description: "Parisian conglomerate controlling over 70 premier luxury fashion, champagne, and high-jewelry houses."
  },
  {
    ticker: "SP50",
    name: "Global Top 500 Index ETF",
    sector: "Broad Index Fund",
    initialPriceUSD: 560.00,
    volatility: 0.14,
    growthBias: 0.085,
    dividendYieldPct: 0.018,
    peRatio: 22,
    description: "Diversified index basket tracking the 500 largest publicly traded companies worldwide. The benchmark."
  }
];

export const CRYPTO_DATA = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    initialPriceUSD: 65000.0,
    volatility: 0.65,
    growthBias: 0.20,
    description: "Decentralized digital hard money and sovereign store of value with fixed 21M hard cap."
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    initialPriceUSD: 3400.0,
    volatility: 0.75,
    growthBias: 0.22,
    description: "Smart contract programmable platform securing decentralized finance and tokenized real assets."
  },
  {
    symbol: "SOL",
    name: "Solana",
    initialPriceUSD: 160.0,
    volatility: 0.90,
    growthBias: 0.25,
    description: "High-throughput, ultra-low latency layer-1 blockchain for high-frequency decentralized applications."
  }
];

export const BANKING_PRODUCTS = {
  highYieldSavingsAPY: 0.045, // 4.5% annual interest
  fixedDeposit1YrAPY: 0.055, // 5.5% annual locked yield
  marginLoanInterestRate: 0.065, // 6.5% interest on margin borrowing
  maxMarginLTV: 0.50 // Can borrow up to 50% of stock portfolio value
};
