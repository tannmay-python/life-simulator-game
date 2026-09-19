// Comprehensive Corporate System Simulation & Verification Suite
const fs = require('fs');

// Load game_engine.js in a mocked browser context
const src = fs.readFileSync('/Users/tannmaybaid/Desktop/Life Simulator Game/js/game_engine.js', 'utf8');

// Mock DOM environment
const mockElem = {
  textContent: '',
  innerHTML: '',
  style: {},
  dataset: {},
  classList: { add: () => {}, remove: () => {} },
  addEventListener: () => {},
  querySelector: () => mockElem,
  querySelectorAll: () => []
};

global.window = {};
global.document = {
  addEventListener: () => {},
  getElementById: () => mockElem,
  querySelector: () => mockElem,
  querySelectorAll: () => []
};

const mockDOM = ``;

const evalCode = `
  ${mockDOM}
  ${src}
`;

eval(evalCode);
const T = window.LifeSim;

console.log("=== 1. CATALOG & ENGINES VERIFICATION ===");
console.log(`Total Businesses in Catalog: ${T.BUSINESS_CATALOG.length} (Expected: 120)`);
if (T.BUSINESS_CATALOG.length !== 120) throw new Error("Catalog length is not 120!");

console.log(`Total Sectors: ${T.BUSINESS_SECTORS.length} (Expected: 12)`);
if (T.BUSINESS_SECTORS.length !== 12) throw new Error("Sector count is not 12!");

const sectorCounts = {};
T.BUSINESS_CATALOG.forEach(b => {
  sectorCounts[b.sector] = (sectorCounts[b.sector] || 0) + 1;
});
console.log("Businesses per Sector:", sectorCounts);
Object.entries(sectorCounts).forEach(([sec, count]) => {
  if (count !== 10) throw new Error(`Sector ${sec} has ${count} businesses instead of 10!`);
});

const tierCounts = {};
T.BUSINESS_CATALOG.forEach(b => {
  tierCounts[b.capitalTier] = (tierCounts[b.capitalTier] || 0) + 1;
});
console.log("Businesses per Capital Tier (A-G):", tierCounts);
["A", "B", "C", "D", "E", "F", "G"].forEach(tier => {
  if (!tierCounts[tier] || tierCounts[tier] === 0) throw new Error(`Tier ${tier} has 0 businesses!`);
});

console.log(`Total Economic Engines: ${Object.keys(T.ECONOMIC_ENGINES).length} (Expected: 18)`);
if (Object.keys(T.ECONOMIC_ENGINES).length !== 18) throw new Error("Engine count is not 18!");

console.log("✅ Catalog, Sectors, Capital Tiers and Economic Engines Verified!\n");

console.log("=== 2. CORPORATE FINANCE & ACCRUAL ACCOUNTING VERIFICATION ===");
// Test 4 distinct archetypes
const testArchetypes = [
  "street_food_cart",    // Tier A: Footfall, Perishables, Inventory
  "vertical_saas_dental",// Tier C: Subscription, Enterprise Sales
  "frontier_ai_lab",     // Tier E: Research IP, Subscription, Hardware
  "commercial_retail_bank" // Tier G: Regulated Balance Sheet, Service Capacity, Asset Ownership
];

const mockState = {
  char: { age: 28, firstName: "Aarav", lastName: "Sharma", smarts: 90 },
  stats: { smarts: 90, looks: 80, prestige: 60, energy: 100 },
  fin: { cash: 5000000 },
  education: { college: { id: "iit_bombay", name: "IIT Bombay" } },
  career: { job: { title: "VP of Engineering" } },
  pastExits: [{ name: "Prior SaaS", proceeds: 1200000 }]
};

testArchetypes.forEach(bizId => {
  const tmpl = T.BUSINESS_CATALOG.find(b => b.id === bizId);
  const isMicro = tmpl.capitalTier === "A";
  const isSmall = tmpl.capitalTier === "B";
  const biz = {
    catalogId: tmpl.id,
    name: tmpl.name,
    scaleUnits: 1,
    headcount: isMicro ? 1 : (isSmall ? 2 : (tmpl.capitalTier === "C" ? 6 : 40)),
    annualRevenueUSD: tmpl.baseRev,
    treasuryUSD: isMicro ? 2500 : (isSmall ? 25000 : 200000),
    accountsReceivableUSD: Math.round(tmpl.baseRev * 0.1),
    inventoryUSD: Math.round(tmpl.baseRev * 0.08),
    fixedAssetsUSD: Math.round(tmpl.startupCost * 0.3),
    ipAssetsUSD: tmpl.boundEngines.includes("research_ip") ? 50000 : 0,
    accountsPayableUSD: Math.round(tmpl.baseRev * 0.06),
    shortTermDebtUSD: 0,
    longTermDebtUSD: isMicro ? 0 : (isSmall ? 5000 : 100000),
    paidInCapitalUSD: tmpl.startupCost,
    retainedEarningsUSD: isMicro ? 500 : 20000,
    boundEngines: tmpl.boundEngines,
    workingCapitalDays: { ...tmpl.workingCapital }
  };

  const fin = T.calculateAnnualCorporateFinancials(biz, mockState);

  console.log(`Testing Archetype: ${tmpl.name} (Tier ${tmpl.capitalTier})`);
  console.log(`  Net Rev: $${fin.pnl.netRevenue.toLocaleString()} | EBITDA: $${fin.pnl.ebitda.toLocaleString()} | Net Income: $${fin.pnl.netIncome.toLocaleString()}`);
  console.log(`  Cash Flow: CFO: $${fin.cashFlow.cfo.toLocaleString()} | CFI: $${fin.cashFlow.cfi.toLocaleString()} | Net Cash: $${fin.cashFlow.netCashFlow.toLocaleString()}`);
  console.log(`  Balance Sheet: Assets: $${fin.balanceSheet.totalAssets.toLocaleString()} | Liabilities + Equity: $${(fin.balanceSheet.totalLiabilities + fin.balanceSheet.stockholdersEquity).toLocaleString()}`);
  console.log(`  Working Capital CCC: ${fin.workingCapital.ccc} Days (DIO: ${fin.workingCapital.dio}d + DSO: ${fin.workingCapital.dso}d - DPO: ${fin.workingCapital.dpo}d)`);

  // Verify Double-Entry Balance Sheet Identity: Assets === Liabilities + Stockholders' Equity
  const diff = Math.abs(fin.balanceSheet.totalAssets - (fin.balanceSheet.totalLiabilities + fin.balanceSheet.stockholdersEquity));
  if (diff > 1) {
    throw new Error(`Balance Sheet does NOT balance! Assets: ${fin.balanceSheet.totalAssets}, Liab+Eq: ${fin.balanceSheet.totalLiabilities + fin.balanceSheet.stockholdersEquity}, Diff: ${diff}`);
  }

  // Verify Cash Flow identity: netCashFlow === cfo + cfi + cff
  const cfDiff = Math.abs(fin.cashFlow.netCashFlow - (fin.cashFlow.cfo + fin.cashFlow.cfi + fin.cashFlow.cff));
  if (cfDiff > 1) {
    throw new Error(`Cash Flow statement does not sum to netCashFlow!`);
  }

  console.log(`  ✅ Passed Accrual Identity & Balance Sheet Checks!\n`);
});

console.log("=== 3. FUNDRAISING & TERM SHEET NEGOTIATION VERIFICATION ===");
const saasTmpl = T.BUSINESS_CATALOG.find(b => b.id === "vertical_saas_dental");
const testBiz = {
  catalogId: saasTmpl.id,
  name: saasTmpl.name,
  scaleUnits: 2,
  annualRevenueUSD: 2500000,
  valuationUSD: 25000000,
  founderEquityPct: 100,
  founderClassBSharesPct: 100,
  treasuryUSD: 500000
};

const pitchScore = T.calculateFounderPitchScore(mockState, testBiz);
console.log(`Founder Pitch Score: ${pitchScore} (Includes IIT Bombay +30, VP +25, Past Exit +40, Smarts +22.5, Prestige +12)`);
if (pitchScore < 100) throw new Error("Founder Pitch score did not properly award pedigree bonuses!");

const termSheets = T.generateTermSheets(mockState, testBiz, "seed_vc");
console.log(`Generated ${termSheets.length} competing Term Sheets for Seed VC:`);
termSheets.forEach((s, i) => {
  console.log(`  [Sheet ${i + 1}] ${s.investorName} (${s.investorType})`);
  console.log(`    Check: $${s.investmentCheckUSD.toLocaleString()} | Pre-Money: $${s.preMoneyValuationUSD.toLocaleString()} | Dilution: ${s.postMoneyEquityPct}%`);
  console.log(`    Liquidation Pref: ${s.liquidationPreference} | Option Pool: ${s.optionPoolPct}% | Seats: ${s.boardSeatsRequested}`);
});

// Test Counter-Offer Negotiation (+20% valuation)
const negoRes = T.negotiateTermSheet(mockState, testBiz, termSheets[0], 20);
console.log(`Counter-Offer Result: ${negoRes.message}`);
if (!negoRes.accepted) throw new Error("Counter-offer should have been accepted with elite pitch score!");

// Test Round Closing
const roundRes = T.executeFinancingRound(mockState, testBiz, negoRes.revisedSheet);
console.log(`Deal Closing: ${roundRes.message}`);
console.log(`New Corporate Treasury: $${testBiz.treasuryUSD.toLocaleString()} | Founder Equity: ${testBiz.founderEquityPct}%`);
if (testBiz.treasuryUSD <= 500000) throw new Error("Treasury did not receive investment check!");
if (testBiz.founderEquityPct >= 100) throw new Error("Founder equity did not dilute!");

console.log("✅ Fundraising, Term Sheets and Deal Execution Verified!\n");

console.log("=== 4. BOARD GOVERNANCE & COUP DEFENSE VERIFICATION ===");
// Add investor board seats to dilute founder voting power below 50%
testBiz.board = {
  seats: [
    { id: "founder", title: "Founder & CEO (YOU)", votes: 1, type: "founder", loyalty: 100, agenda: "growth" },
    { id: "inv_1", title: "Apex Ventures Lead", votes: 1, type: "investor", loyalty: 25, agenda: "conservative" },
    { id: "inv_2", title: "Titan Growth Lead", votes: 1, type: "investor", loyalty: 20, agenda: "conservative" }
  ],
  coupThreat: false,
  coupReason: null
};
testBiz.founderClassBSharesPct = 0; // Simulate loss of super-voting shares
testBiz.treasuryUSD = -50000; // Depleted runway
testBiz.lastFinancials = { cashFlow: { cfo: -200000 } }; // 0 runway

T.stepBoardAnnual(mockState, testBiz);
console.log(`Board Coup Check: coupThreat = ${testBiz.board.coupThreat}`);
console.log(`Coup Reason: "${testBiz.board.coupReason}"`);
if (!testBiz.board.coupThreat) throw new Error("Boardroom Coup should have triggered!");

// Test Coup Defense Lever 3: Personal Cash Injection
const defRes = T.executeCoupDefense(mockState, testBiz, "personal_cash_injection");
console.log(`Coup Defense Result: ${defRes.message}`);
console.log(`Post-Defense coupThreat = ${testBiz.board.coupThreat}`);
if (testBiz.board.coupThreat) throw new Error("Coup defense failed to clear coup threat!");

console.log("✅ Board of Directors & Coup Defense State Machine Verified!\n");

console.log("=== 5. ORG SCALING & LATENT CRISIS QUEUE VERIFICATION ===");
testBiz.org = {
  scaleTier: "scale",
  allocatedAU: { strategy: 10, hiring: 5, investorRel: 10, product: 5, fires: 70 }, // Neglecting product & hiring
  techDebt: 70,
  qaDeficit: 70,
  regulatoryExposure: 20,
  morale: 80
};

const orgStep = T.stepOrgAnnual(mockState, testBiz);
console.log(`Org Step: Tech Debt now = ${testBiz.org.techDebt}% (Product AU was 5)`);
console.log(`Crisis Events triggered:`, orgStep.crisisEvents);
if (testBiz.org.techDebt <= 70 && orgStep.crisisEvents.length === 0) {
  throw new Error("Tech Debt should have increased or detonated!");
}

// Test AU re-allocation
const auRes = T.reallocateAttentionUnits(testBiz, { strategy: 25, hiring: 20, investorRel: 15, product: 25, fires: 15 });
console.log(`AU Reallocation: ${auRes.message}`);
if (!auRes.success) throw new Error("Valid 100 AU reallocation failed!");

console.log("✅ Org Scaling, Attention Units & Latent Crisis Queue Verified!\n");

console.log("🎉 ALL CORPORATE SYSTEM TESTS PASSED PERFECTLY! 🎉");
