// Central Game State Model, Persistence, and State Mutations

import { COUNTRIES } from "./data/countries.js";
import { STOCKS_DATA, CRYPTO_DATA } from "./data/stocks_data.js";
import { DEFAULT_168_HOURS_SCHEDULE, StudentAcademicSimulator, calculateLegacySmarts, generateInitialCognitiveState } from "./systems/student_engine.js";
import { generateSchoolCandidates } from "./systems/school_engine.js";

const STORAGE_KEY = "LIFE_SIMULATOR_SAVE_V4";
const LEGACY_STORAGE_KEY = "LIFE_SIMULATOR_SAVE_V3";
const PREVIOUS_STORAGE_KEY = "LIFE_SIMULATOR_SAVE_V2";
const OLDER_STORAGE_KEY = "LIFE_SIMULATOR_SAVE_V1";
export const STATE_SCHEMA_VERSION = 4;

export const EDUCATION_STAGES = Object.freeze({
  INFANCY: "infancy",
  PRESCHOOL: "preschool",
  PRIMARY: "primary",
  LOWER_SECONDARY: "lower_secondary",
  UPPER_SECONDARY: "upper_secondary",
  GAP_YEAR: "gap_year",
  UNIVERSITY: "university",
  VOCATIONAL: "vocational",
  GRADUATED: "graduated"
});

export function getEducationStage(age, currentUniversity = null, explicitStage = null) {
  if (currentUniversity) return EDUCATION_STAGES.UNIVERSITY;
  const legacyStage = String(explicitStage || "").toLowerCase();
  if (legacyStage.includes("university") && !legacyStage.includes("graduate")) return EDUCATION_STAGES.UNIVERSITY;
  if (legacyStage.includes("graduate")) return EDUCATION_STAGES.GRADUATED;
  if (legacyStage === "high school") return age >= 18 ? EDUCATION_STAGES.GRADUATED : EDUCATION_STAGES.UPPER_SECONDARY;
  if (explicitStage === EDUCATION_STAGES.VOCATIONAL) return EDUCATION_STAGES.VOCATIONAL;
  if (explicitStage === EDUCATION_STAGES.GAP_YEAR) return EDUCATION_STAGES.GAP_YEAR;
  if (explicitStage === EDUCATION_STAGES.GRADUATED && age >= 18) return EDUCATION_STAGES.GRADUATED;
  if (age <= 2) return EDUCATION_STAGES.INFANCY;
  if (age <= 5) return EDUCATION_STAGES.PRESCHOOL;
  if (age <= 10) return EDUCATION_STAGES.PRIMARY;
  if (age <= 13) return EDUCATION_STAGES.LOWER_SECONDARY;
  return EDUCATION_STAGES.UPPER_SECONDARY;
}

export function stageLabel(stage) {
  return {
    [EDUCATION_STAGES.INFANCY]: "Development",
    [EDUCATION_STAGES.PRESCHOOL]: "Preschool",
    [EDUCATION_STAGES.PRIMARY]: "Primary school",
    [EDUCATION_STAGES.LOWER_SECONDARY]: "Lower secondary",
    [EDUCATION_STAGES.UPPER_SECONDARY]: "Upper secondary",
    [EDUCATION_STAGES.GAP_YEAR]: "Gap year",
    [EDUCATION_STAGES.UNIVERSITY]: "University",
    [EDUCATION_STAGES.VOCATIONAL]: "Vocational training",
    [EDUCATION_STAGES.GRADUATED]: "Graduated"
  }[stage] || "Education";
}

export function applyAcademicAction(state, { skillKey = "algebra", hours = 4, teachingQuality = 1.0 } = {}) {
  if (!state.cognition) state.cognition = generateInitialCognitiveState();
  const currentSkillLevel = Number(state.cognition.learnedSkills?.[skillKey]) || 0;
  const result = StudentAcademicSimulator.executeWeeklyStudySession({
    skillKey,
    currentSkillLevel,
    innateAttributes: state.cognition.innate,
    traits: state.cognition.traits,
    studyHours: hours,
    teachingQuality,
    sleepHours: Number(state.education?.timeAllocation?.sleep) || 56,
    sleepDebt: Number(state.cognition.condition?.sleepDebtHours) || 0
  });
  state.cognition.learnedSkills[skillKey] = result.newSkillLevel;
  state.stats.smarts = calculateLegacySmarts(state.cognition.innate, state.cognition.learnedSkills, state.cognition.traits);
  return result;
}

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function createHousehold(country, lastName, wealthTier) {
  const profiles = {
    severe_hardship: [12, 8, 9000, 1200],
    low_income: [28, 22, 18000, 8500],
    working_class: [42, 35, 32000, 28000],
    lower_middle_class: [55, 48, 52000, 70000],
    middle_class: [68, 62, 78000, 150000],
    upper_middle_class: [80, 76, 125000, 360000],
    affluent: [90, 88, 240000, 1200000],
    high_net_worth: [96, 96, 650000, 6500000],
    wealthy: [99, 99, 1800000, 22000000]
  };
  const [incomePercentile, wealthPercentile, nominalIncomeUSD, liquidAssetsUSD] = profiles[wealthTier] || profiles.middle_class;
  const localFactor = country.livingCostIndex || 1;
  const annualIncomeUSD = Math.round(nominalIncomeUSD * (0.55 + localFactor * 0.45));
  const occupations = wealthTier === "severe_hardship" || wealthTier === "low_income"
    ? ["Service worker", "Driver", "Retail worker", "Contract worker"]
    : wealthTier === "affluent" || wealthTier === "high_net_worth" || wealthTier === "wealthy"
      ? ["Founder", "Senior executive", "Investor", "Specialist physician", "Partner"]
      : ["Teacher", "Engineer", "Accountant", "Civil servant", "Small-business owner", "Professional"];
  return {
    incomePercentile,
    wealthPercentile,
    annualIncomeUSD,
    liquidAssetsUSD,
    savingsUSD: Math.round(liquidAssetsUSD * 0.35),
    educationBudgetUSD: Math.round(annualIncomeUSD * 0.12),
    monthlyHousingUSD: Math.round((annualIncomeUSD / 12) * 0.24),
    currency: country.currency,
    currencySymbol: country.symbol,
    parents: [
      { name: `Parent 1 ${lastName}`, relation: "Parent", age: 32, alive: true, occupation: occupations[randomInt(0, occupations.length - 1)], incomeUSD: Math.round(annualIncomeUSD * 0.56), generosity: randomInt(40, 85), academicExpectations: randomInt(35, 90), relationship: randomInt(70, 95), netWorthUSD: Math.round(liquidAssetsUSD * 0.5) },
      { name: `Parent 2 ${lastName}`, relation: "Parent", age: 30, alive: true, occupation: occupations[randomInt(0, occupations.length - 1)], incomeUSD: Math.round(annualIncomeUSD * 0.44), generosity: randomInt(40, 85), academicExpectations: randomInt(35, 90), relationship: randomInt(70, 95), netWorthUSD: Math.round(liquidAssetsUSD * 0.5) }
    ],
    pendingExpenses: []
  };
}

function createSiblings(lastName, householdTier) {
  const countByTier = {
    severe_hardship: [1, 4],
    low_income: [0, 3],
    working_class: [0, 3],
    lower_middle_class: [0, 2],
    middle_class: [0, 2],
    upper_middle_class: [0, 2],
    affluent: [0, 2],
    high_net_worth: [0, 2],
    wealthy: [0, 3]
  };
  const [min, max] = countByTier[householdTier] || countByTier.middle_class;
  const count = randomInt(min, max);
  const names = ["Ishaan", "Meera", "Riya", "Vihaan", "Kavya", "Arjun", "Diya", "Kabir"];
  return Array.from({ length: count }, (_, index) => ({
    id: `sibling_${index}_${Math.random().toString(36).slice(2, 7)}`,
    name: `${names[randomInt(0, names.length - 1)]} ${lastName}`,
    ageOffset: randomInt(-5, 4),
    age: null,
    gender: Math.random() > 0.5 ? "female" : "male",
    relationship: randomInt(55, 90),
    schoolStage: "family",
    alive: true
  }));
}

function createInitialEducationState(country) {
  return {
    stage: EDUCATION_STAGES.INFANCY,
    schoolBoard: null,
    currentInstitution: null,
    currentUniversity: null,
    streamChoice: null,
    gpa: null,
    examScores: {},
    transcript: [],
    activities: [],
    teachers: [],
    applications: [],
    essay: { title: "Personal statement", draftStage: 1, polish: 35, authenticity: 82, hoursInvested: 0, feedbackHistory: [] },
    degrees: [],
    certifications: [],
    timeAllocation: { ...DEFAULT_168_HOURS_SCHEDULE },
    curriculumContext: { country: country.id, representation: null, gradingScale: null }
  };
}

function migrateState(state) {
  if (!state || typeof state !== "object") return null;
  const age = Number(state.character?.age) || 0;
  const currentUniversity = state.education?.currentUniversity || null;
  const country = COUNTRIES[state.character?.currentCountry] || COUNTRIES.india;
  state.schemaVersion = STATE_SCHEMA_VERSION;
  state.calendar = state.calendar || { year: age, month: state.character?.birthMonth || 1, schoolTerm: null };
  state.education = state.education || {};
  state.education.currentUniversity = currentUniversity;
  state.education.stage = getEducationStage(age, currentUniversity, state.education.stage);
  state.education.schoolBoard = state.education.schoolBoard || null;
  state.education.currentInstitution = state.education.currentInstitution || null;
  if (state.education.currentInstitution && !state.education.currentInstitution.curriculumProfile) {
    // The old runtime stored a display label such as "Local primary school",
    // not an institution. Reopen a real, selectable school record instead of
    // letting that label masquerade as a current upper-secondary school.
    state.education.currentInstitution = null;
    if (age >= 3 && age <= 18) state.education.schoolChoices = generateSchoolCandidates({ country, age, household: state.family?.household });
  }
  state.education.transcript = state.education.transcript || [];
  state.education.activities = state.education.activities || [];
  state.education.teachers = state.education.teachers || [];
  state.education.applications = state.education.applications || [];
  state.education.essay = state.education.essay || { title: "Personal statement", draftStage: 1, polish: 35, authenticity: 82, hoursInvested: 0, feedbackHistory: [] };
  state.education.degrees = state.education.degrees || [];
  state.education.certifications = state.education.certifications || [];
  state.education.examScores = state.education.examScores || {};
  state.education.enrollmentHistory = state.education.enrollmentHistory || [];
  state.education.schoolChoices = state.education.schoolChoices || [];
  state.education.academic = state.education.academic || null;
  state.education.social = state.education.social || null;
  state.education.employment = state.education.employment || { applications: [], history: [], activeJob: null };
  state.education.timeAllocation = { ...DEFAULT_168_HOURS_SCHEDULE, ...(state.education.timeAllocation || {}) };
  state.education.curriculumContext = state.education.curriculumContext || { country: country.id, representation: null, gradingScale: null };
  state.cognition = state.cognition || generateInitialCognitiveState();
  state.stats = state.stats || {};
  state.stats.smarts = calculateLegacySmarts(state.cognition.innate, state.cognition.learnedSkills, state.cognition.traits);
  state.family = state.family || {};
  if (!state.family.household) {
    state.family.household = createHousehold(country, state.character?.lastName || "Family", "middle_class");
    state.family.parents = state.family.household.parents;
  } else {
    state.family.household.parents = state.family.household.parents || state.family.parents || [];
  }
  state.family.siblings = state.family.siblings || [];
  state.family.siblings.forEach(sibling => {
    if (sibling.age == null) sibling.age = Math.max(0, age + (Number(sibling.ageOffset) || 0));
  });
  state.highSchool = state.highSchool || null;
  state.finances = state.finances || {};
  if (!state.finances.studentAccount) {
    const legacyPersonalCash = age < 18 ? (Number(state.finances.cashUSD) || 0) : 0;
    if (age < 18) state.finances.cashUSD = Math.max(0, (Number(state.finances.cashUSD) || 0) - legacyPersonalCash);
    state.finances.studentAccount = { cashUSD: legacyPersonalCash, lifetimeEarningsUSD: 0, ledger: [] };
  }
  return state;
}

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

  const familyWealthTier = customOptions.familyWealthTier || "middle_class";
  const household = createHousehold(country, lastName, familyWealthTier);
  const cognition = generateInitialCognitiveState();
  const initialCash = Math.max(500, Math.round(household.savingsUSD * 0.015));
  const birthMonth = customOptions.birthMonth || randomInt(1, 12);

  return {
    schemaVersion: STATE_SCHEMA_VERSION,
    calendar: { year: 0, month: birthMonth, schoolTerm: null },
    character: {
      firstName,
      lastName,
      gender: isMale ? "male" : "female",
      age: 0,
      birthMonth,
      birthCountry: country.id,
      currentCountry: country.id,
      taxHaven: null,
      alive: true,
      causeOfDeath: null,
      maxAge: Math.floor(82 + Math.random() * 12), // Can be extended by biohacking to 115+
      generation: 1
    },

    stats: {
      health: randomInt(72, 96),
      happiness: randomInt(62, 92),
      smarts: calculateLegacySmarts(cognition.innate, cognition.learnedSkills, cognition.traits),
      looks: randomInt(35, 88),
      energy: 100, // Refreshes annually
      creditScore: null, // FICO/CIBIL begins at legal majority
      prestige: 10, // High society rank 0-100
      fame: 0 // Media / creator celebrity rank 0-100
    },

    cognition,
    education: {
      ...createInitialEducationState(country),
      schoolChoices: [],
      preschoolCandidates: [],
      enrollmentHistory: [],
      academic: null,
      social: null,
      employment: { applications: [], history: [], activeJob: null }
    },
    highSchool: null,

    career: {
      currentJob: null, // { trackId, level, title, baseSalaryUSD, bonusPct, stockUSD, experienceYears, performance: 80 }
      specialCareer: null, // { type: 'indie_dev' | 'content_creator' | 'model' | 'musician' | 'athlete' | 'author', data: {} }
      workHistory: [],
      lifetimeEarningsUSD: 0
    },

    businesses: [], // Array of owned active businesses

    finances: {
      // Household money and the child's money are separate ledgers. The
      // student account is the only personal cash account before majority.
      cashUSD: 0,
      studentAccount: { cashUSD: initialCash, lifetimeEarningsUSD: 0, ledger: [] },
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
      parents: household.parents,
      household,
      siblings: createSiblings(lastName, familyWealthTier),
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
        age: 0,
        headline: "A New Journey Begins",
        logs: [
          `Born in ${country.name} ${country.flag}. Your family will make the first schooling decisions.`,
          `Household income is around the ${household.incomePercentile}th percentile locally; your aptitude and circumstances are still unfolding.`
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
    state.schemaVersion = STATE_SCHEMA_VERSION;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save game state to localStorage:", err);
  }
}

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || localStorage.getItem(PREVIOUS_STORAGE_KEY) || localStorage.getItem(OLDER_STORAGE_KEY);
    if (!raw) return null;
    return migrateState(JSON.parse(raw));
  } catch (err) {
    console.error("Failed to parse saved game state:", err);
    return null;
  }
}

// Net Worth Calculator
export function calculateNetWorth(state) {
  let netWorth = state.finances.cashUSD + state.finances.savingsUSD + (state.finances.studentAccount?.cashUSD || 0);

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
