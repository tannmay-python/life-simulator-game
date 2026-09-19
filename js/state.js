// Central Game State Model, Persistence, and State Mutations

import { COUNTRIES } from "./data/countries.js";
import { STOCKS_DATA, CRYPTO_DATA } from "./data/stocks_data.js";

const STORAGE_KEY = "LIFE_SIMULATOR_SAVE_V1";

export function createInitialState(customOptions = {}) {
  const countryId = customOptions.countryId || "india";
  const country = COUNTRIES[countryId] || COUNTRIES.india;
  const isMale = customOptions.gender === "male" || Math.random() > 0.5;
  const firstName = customOptions.firstName || (isMale ? "Aarav" : "Ananya");
  const lastName = customOptions.lastName || "Sharma";

  // Initial stock prices from data
  const stockPrices = {};
  const stockHistory = {};
  STOCKS_DATA.forEach(stock => {
    stockPrices[stock.ticker] = stock.initialPriceUSD;
    stockHistory[stock.ticker] = [stock.initialPriceUSD];
  });

  // Initial crypto prices from data
  const cryptoPrices = {};
  const cryptoHistory = {};
  CRYPTO_DATA.forEach(crypto => {
    cryptoPrices[crypto.symbol] = crypto.initialPriceUSD;
    cryptoHistory[crypto.symbol] = [crypto.initialPriceUSD];
  });

  // Parents generation
  const fatherAge = 32;
  const motherAge = 30;
  const familyWealthTier = customOptions.familyWealthTier || "middle_class"; // middle_class, affluent, wealthy
  let initialCash = 1500;
  if (familyWealthTier === "affluent") initialCash = 15000;
  if (familyWealthTier === "wealthy") initialCash = 100000;

  return {
    character: {
      firstName,
      lastName,
      gender: isMale ? "male" : "female",
      age: 14, // Starts at teenage schooling age for immediate agency and rich career choices!
      birthCountry: country.id,
      currentCountry: country.id,
      taxHaven: null,
      alive: true,
      causeOfDeath: null,
      maxAge: Math.floor(82 + Math.random() * 12), // Can be extended by biohacking to 115+
      generation: 1
    },

    stats: {
      health: 90,
      happiness: 85,
      smarts: 80,
      looks: 75,
      energy: 100, // Refreshes annually
      creditScore: 680, // FICO/CIBIL scale 300-850
      prestige: 10, // High society rank 0-100
      fame: 0 // Media / creator celebrity rank 0-100
    },

    education: {
      stage: "High School", // High School, University, Graduated
      schoolBoard: country.schoolBoards[0].id,
      gpa: 3.8, // Out of 4.0
      examScores: {}, // e.g. { sat: 1480, jee: 98.4, neet: 650, cat: null, ielts: 8.0 }
      currentUniversity: null, // { id, name, major, tier, year, totalYears, tuitionUSD }
      degrees: [], // [{ title, major, university, tier, graduationYear }]
      certifications: [] // ["CFA", "Private Pilot License", "Bar Exam"]
    },

    career: {
      currentJob: null, // { trackId, level, title, baseSalaryUSD, bonusPct, stockUSD, experienceYears, performance: 80 }
      specialCareer: null, // { type: 'indie_dev' | 'content_creator' | 'model' | 'musician' | 'athlete' | 'author', data: {} }
      workHistory: [],
      lifetimeEarningsUSD: 0
    },

    businesses: [], // Array of owned active businesses

    finances: {
      cashUSD: initialCash,
      savingsUSD: 2000, // Earning 4.5% APY
      stockPortfolio: {}, // { TICKER: { shares: 10, avgCostUSD: 120 } }
      cryptoPortfolio: {}, // { BTC: { coins: 0.05, avgCostUSD: 60000 } }
      stockPrices,
      stockHistory,
      cryptoPrices,
      cryptoHistory,
      debt: {
        marginLoanUSD: 0,
        studentLoansUSD: 0,
        propertyMortgagesUSD: 0,
        businessLoansUSD: 0
      },
      netWorthUSD: initialCash + 2000
    },

    assets: {
      properties: [], // [{ instanceId, templateId, name, purchasePriceUSD, marketValueUSD, conditionPct, isRented, annualRentUSD, mortgageBalanceUSD, renovatedLevel }]
      vehicles: [], // [{ id, name, priceUSD, purchaseAge, prestige }]
      aviationMarine: [], // [{ id, name, priceUSD, annualMaintenanceUSD, prestige }]
      fineArtCollectibles: [] // [{ id, name, priceUSD, appreciationRate, prestige }]
    },

    family: {
      parents: [
        { name: isMale ? "Rajesh " + lastName : "David " + lastName, relation: "Father", age: fatherAge, alive: true, relationship: 88, netWorthUSD: 250000 },
        { name: isMale ? "Priya " + lastName : "Sarah " + lastName, relation: "Mother", age: motherAge, alive: true, relationship: 92, netWorthUSD: 250000 }
      ],
      partner: null, // { name, gender, age, occupation, netWorthUSD, relationship: 80, isMarried: false, hasPrenup: false }
      children: [], // [{ name, age, gender, relationship: 90, education: "Private School", heirAllocPct: 100 }]
      will: {
        spousePct: 50,
        childrenPct: 40,
        charityPct: 10,
        dynastyTrustEstablished: false
      },
      familyLineage: [] // Generational archive
    },

    lifestyle: {
      angelInvestments: [], // [{ startupName, sector, investedUSD, equityPct, valuationUSD, stage, yearsElapsed }]
      foundation: null, // { name, endowmentUSD, annualGrantsUSD, prestige }
      boardSeats: [], // [{ companyTicker, companyName, annualStipendUSD, equitySharesGranted }]
      patents: [], // [{ title, sector, annualRoyaltyUSD, remainingYears }]
      auctionsWon: [],
      biohackingLevel: 0, // 0: None, 1: Cryo, 2: Concierge Genetics, 3: Cellular Stem Cells, 4: Telomere Therapy
      blackCardUnlocked: false
    },

    ledger: [
      {
        year: 0,
        age: 14,
        headline: "A New Journey Begins",
        logs: [
          `Born in ${country.name} ${country.flag}. Enrolled in ${country.schoolBoards[0].name}.`,
          `Current family assets: $${initialCash.toLocaleString()}. Set your sights on mastering education and creating an empire.`
        ],
        netWorthUSD: initialCash + 2000,
        cashChangeUSD: 0
      }
    ]
  };
}

let currentState = null;

export function getGameState() {
  if (!currentState) {
    currentState = loadGameState() || createInitialState();
  }
  return currentState;
}

export function setGameState(newState) {
  currentState = newState;
  saveGameState(currentState);
}

export function resetGame(options = {}) {
  currentState = createInitialState(options);
  saveGameState(currentState);
  return currentState;
}

export function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save game state to localStorage:", err);
  }
}

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse saved game state:", err);
    return null;
  }
}

// Net Worth Calculator
export function calculateNetWorth(state) {
  let netWorth = state.finances.cashUSD + state.finances.savingsUSD;

  // Stocks
  for (const [ticker, holding] of Object.entries(state.finances.stockPortfolio)) {
    const price = state.finances.stockPrices[ticker] || 0;
    netWorth += holding.shares * price;
  }

  // Crypto
  for (const [symbol, holding] of Object.entries(state.finances.cryptoPortfolio)) {
    const price = state.finances.cryptoPrices[symbol] || 0;
    netWorth += holding.coins * price;
  }

  // Properties
  state.assets.properties.forEach(prop => {
    netWorth += (prop.marketValueUSD - prop.mortgageBalanceUSD);
  });

  // Luxury Assets
  state.assets.vehicles.forEach(v => netWorth += v.priceUSD);
  state.assets.aviationMarine.forEach(am => netWorth += am.priceUSD);
  state.assets.fineArtCollectibles.forEach(art => netWorth += art.priceUSD);

  // Businesses (Valuation)
  state.businesses.forEach(biz => {
    netWorth += biz.currentValuationUSD || 0;
  });

  // Angel Investments
  state.lifestyle.angelInvestments.forEach(inv => {
    netWorth += (inv.valuationUSD * (inv.equityPct / 100));
  });

  // Liabilities / Debts
  netWorth -= (state.finances.debt.marginLoanUSD || 0);
  netWorth -= (state.finances.debt.studentLoansUSD || 0);
  netWorth -= (state.finances.debt.businessLoansUSD || 0);

  state.finances.netWorthUSD = Math.round(netWorth);
  return state.finances.netWorthUSD;
}
