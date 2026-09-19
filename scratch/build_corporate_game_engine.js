// Build script to integrate the complete 120-business catalog, 18 economic engines,
// corporate finance, fundraising, board governance, and org systems into js/game_engine.js
const fs = require('fs');
const path = require('path');

const srcPath = '/Users/tannmaybaid/Desktop/Life Simulator Game/js/game_engine.js';
let content = fs.readFileSync(srcPath, 'utf8');

// Read businesses_data.js
const bizDataPath = '/Users/tannmaybaid/Desktop/Life Simulator Game/js/data/businesses_data.js';
let bizDataContent = fs.readFileSync(bizDataPath, 'utf8');
// Strip 'export '
bizDataContent = bizDataContent.replace(/export const /g, 'const ');

// Replace Section 4 in game_engine.js
const sec4Marker = '// --- 4. DATA: 50 CUSTOMIZABLE BUSINESSES ACROSS 7 SECTORS ---';
const sec5Marker = '// --- 5. DATA: REAL ESTATE, ASSETS & FORBES ---';

const sec4Idx = content.indexOf(sec4Marker);
const sec5Idx = content.indexOf(sec5Marker);

if (sec4Idx === -1 || sec5Idx === -1) {
  console.error('Section 4 or 5 marker not found!');
  process.exit(1);
}

const newSec4 = `// --- 4. DATA: 120 CUSTOMIZABLE BUSINESSES ACROSS 12 SECTORS & 7 CAPITAL TIERS ---
${bizDataContent}

  const FUNDING_SOURCES = [
    { id: "bootstrap", name: "Bootstrapping", tier: "A", minCheck: 1000, maxCheck: 100000, type: "equity", desc: "100% self-funded from personal cash wallet. Retain 100% equity ownership and complete board control." },
    { id: "friends_family", name: "Friends & Family", tier: "B", minCheck: 15000, maxCheck: 150000, type: "equity", desc: "Informal seed checks from family and childhood peers. Low scrutiny, but carries personal relationship risk." },
    { id: "angel_syndicate", name: "Angel Investor Syndicate", tier: "C", minCheck: 75000, maxCheck: 600000, type: "equity", desc: "Experienced tech founders and domain angels writing SAFE notes (Simple Agreement for Future Equity)." },
    { id: "top_accelerator", name: "Top Accelerator (YC / Sequoia Arc)", tier: "C", minCheck: 500000, maxCheck: 500000, type: "equity", desc: "The gold standard Silicon Valley accelerator: $500,000 for 7% post-money equity with Demo Day access." },
    { id: "seed_vc", name: "Seed Venture Capital", tier: "D", minCheck: 1500000, maxCheck: 4500000, type: "equity", desc: "Institutional Series Seed priced round. Requires giving up 15–22% equity and 1 permanent Board of Directors seat." },
    { id: "growth_vc", name: "Series A/B Growth VC", tier: "E", minCheck: 10000000, maxCheck: 45000000, type: "equity", desc: "High-octane tier-1 venture capital to blitzscale operations. Demands 3x YoY growth and aggressive hiring." },
    { id: "bank_revolver", name: "Commercial Bank AR Revolver", tier: "C", minCheck: 100000, maxCheck: 5000000, type: "debt", desc: "Revolving line of credit secured by up to 80% of accounts receivable. Prime + 2.5% floating interest rate." },
    { id: "venture_debt", name: "Venture Debt Facility", tier: "D", minCheck: 2000000, maxCheck: 15000000, type: "debt", desc: "Non-dilutive debt financing with 10.5% interest and 1.5% equity warrant coverage to extend cash runway." },
    { id: "private_equity", name: "Private Equity Buyout", tier: "F", minCheck: 50000000, maxCheck: 250000000, type: "equity", desc: "Institutional buyout fund acquiring a controlling majority stake (51%+) to optimize EBITDA margins." },
    { id: "project_finance", name: "Sovereign Project Finance", tier: "G", minCheck: 200000000, maxCheck: 2000000000, type: "debt", desc: "Syndicated banking consortia funding mega-scale industrial plants, seaports, and nuclear infrastructure." },
    { id: "ipo", name: "Initial Public Offering (IPO)", tier: "G", minCheck: 100000000, maxCheck: 5000000000, type: "equity", desc: "Float public common shares on NASDAQ or BSE underwritten by Goldman Sachs and Morgan Stanley." }
  ];

  const DIRECTOR_ARCHETYPES = {
    growth_vc: { id: "growth_vc", title: "Aggressive Growth Partner", agenda: "Triple-digit revenue blitzscaling; tolerant of heavy cash burn." },
    conservative: { id: "conservative", title: "Fiscal Conservative", agenda: "Demands EBITDA margins, strict debt servicing, and positive cash flow." },
    diplomat: { id: "diplomat", title: "Independent Industry Veteran", agenda: "Focuses on corporate governance, product moat, and board stability." },
    founder_loyalist: { id: "founder_loyalist", title: "Co-Founder / Early Angel", agenda: "Unconditionally loyal to the founder's visionary long-term roadmap." }
  };

  const SCALE_TIERS = {
    micro: { id: "micro", name: "Micro (1–10 Staff)", agency: "Direct 1-on-1 oversight; personal hiring & bespoke comp.", maxHeadcount: 10 },
    small: { id: "small", name: "Small (10–50 Staff)", agency: "Departmental formation; appointing team leads.", maxHeadcount: 50 },
    mid: { id: "mid", name: "Mid (50–250 Staff)", agency: "Management systems, salary bands, and recruiter pipelines.", maxHeadcount: 250 },
    scale: { id: "scale", name: "Scale (250–1,000 Staff)", agency: "VP delegation, Attention Units (AU) allocation, and fog-of-war.", maxHeadcount: 1000 },
    enterprise: { id: "enterprise", name: "Enterprise (1,000–10,000+ Staff)", agency: "C-Suite governance, board committees, and business unit presidents.", maxHeadcount: 100000 }
  };

  // --- 18 SPECIALIZED ECONOMIC SUB-ENGINES EVALUATOR ---
  function evaluateEngine(engineId, biz, state) {
    const scale = biz.scaleUnits || 1;
    const kpis = {};
    let revModifier = 1.0;
    let costModifier = 1.0;
    let riskDelta = 0.0;

    switch (engineId) {
      case "location_footfall": {
        const footfall = Math.round((800 + Math.random() * 400) * scale * (biz.marketingBudgetUSD > 10000 ? 1.3 : 1.0));
        const convRate = (3.2 + Math.random() * 1.5).toFixed(1);
        const rentSqFt = Math.round(45 + (scale * 5));
        const revSqFt = Math.round((footfall * (convRate / 100) * 35) / Math.max(1, scale * 20));
        kpis["Daily Footfall"] = footfall.toLocaleString();
        kpis["Conversion Rate %"] = \`\${convRate}%\`;
        kpis["Rent / SqFt"] = \`$\${rentSqFt}\`;
        kpis["Rev / SqFt"] = \`$\${revSqFt}\`;
        revModifier *= (parseFloat(convRate) / 4.0);
        break;
      }
      case "inventory": {
        const dio = biz.workingCapitalDays?.dio || 30;
        const stockoutRate = (Math.max(1.0, 8.5 - (dio / 5))).toFixed(1);
        const turnover = (365 / Math.max(1, dio)).toFixed(1);
        const markdown = (2.5 + Math.random() * 3.0).toFixed(1);
        kpis["Stockout Rate %"] = \`\${stockoutRate}%\`;
        kpis["Inventory Turnover"] = \`\${turnover}x\`;
        kpis["Markdown %"] = \`\${markdown}%\`;
        kpis["Holding Cost"] = \`$\${Math.round((biz.inventoryUSD || 5000) * 0.18).toLocaleString()}\`;
        if (parseFloat(stockoutRate) > 5.0) revModifier *= 0.92;
        break;
      }
      case "perishables": {
        const dio = biz.workingCapitalDays?.dio || 10;
        const spoilage = (3.0 + Math.random() * 4.0).toFixed(1);
        const shelfLife = Math.max(2, Math.round(14 - (dio * 0.4)));
        const healthScore = Math.min(100, Math.round(90 + (state.char?.smarts || 80) * 0.1));
        kpis["Spoilage Rate %"] = \`\${spoilage}%\`;
        kpis["Shelf Life"] = \`\${shelfLife} Days\`;
        kpis["Health Inspection"] = \`\${healthScore}/100\`;
        costModifier *= (1.0 + (parseFloat(spoilage) / 100));
        if (healthScore < 85) riskDelta += 0.10;
        break;
      }
      case "service_capacity": {
        const utilRate = (68 + Math.random() * 22).toFixed(1);
        const realization = (88 + Math.random() * 8).toFixed(1);
        const partnerLev = (scale * 2.5).toFixed(1);
        kpis["Billable Utilization %"] = \`\${utilRate}%\`;
        kpis["Realization Rate %"] = \`\${realization}%\`;
        kpis["Partner Leverage"] = \`\${partnerLev}x\`;
        revModifier *= (parseFloat(utilRate) / 75.0) * (parseFloat(realization) / 90.0);
        break;
      }
      case "subscription": {
        const churn = (1.2 + Math.random() * 2.0).toFixed(1);
        const nrr = (105 + Math.random() * 18).toFixed(1);
        const cacPayback = Math.max(6, Math.round(18 - (scale * 1.5)));
        kpis["MRR"] = \`$\${Math.round((biz.annualRevenueUSD || 50000) / 12).toLocaleString()}\`;
        kpis["Logo Churn %"] = \`\${churn}%/mo\`;
        kpis["NRR %"] = \`\${nrr}%\`;
        kpis["CAC Payback"] = \`\${cacPayback} Mos\`;
        revModifier *= (parseFloat(nrr) / 100.0) * (1.0 - parseFloat(churn) / 50.0);
        break;
      }
      case "enterprise_sales": {
        const acv = Math.round(45000 * Math.pow(scale, 0.6));
        const salesCycle = Math.max(4, Math.round(12 - (scale * 0.8)));
        const winRate = (24 + Math.random() * 12).toFixed(1);
        kpis["ACV"] = \`$\${acv.toLocaleString()}\`;
        kpis["Sales Cycle"] = \`\${salesCycle} Months\`;
        kpis["Win Rate %"] = \`\${winRate}%\`;
        revModifier *= (parseFloat(winRate) / 25.0);
        break;
      }
      case "marketplace": {
        const takeRate = (12.5 + Math.random() * 3.5).toFixed(1);
        const gmv = Math.round((biz.annualRevenueUSD || 100000) / (parseFloat(takeRate) / 100));
        const fillRate = (88 + Math.random() * 8).toFixed(1);
        kpis["Annual GMV"] = \`$\${gmv.toLocaleString()}\`;
        kpis["Take Rate %"] = \`\${takeRate}%\`;
        kpis["Liquidity Fill Rate"] = \`\${fillRate}%\`;
        revModifier *= (parseFloat(fillRate) / 90.0);
        break;
      }
      case "advertising_attention": {
        const dau = Math.round(25000 * Math.pow(scale, 1.4));
        const ecpm = (4.5 + Math.random() * 3.0).toFixed(2);
        kpis["DAU"] = dau.toLocaleString();
        kpis["eCPM"] = \`$\${ecpm}\`;
        kpis["Ad Fill Rate %"] = \`\${(92 + Math.random() * 5).toFixed(1)}%\`;
        revModifier *= (dau / 25000) * (parseFloat(ecpm) / 5.0);
        break;
      }
      case "content_hits": {
        const hitProb = (15 + (scale * 3)).toFixed(1);
        const hitRoll = Math.random() * 100;
        const isHit = hitRoll < parseFloat(hitProb);
        kpis["Hit Probability %"] = \`\${hitProb}%\`;
        kpis["Cycle Status"] = isHit ? "🌟 BLOCKBUSTER HIT!" : "Steady Catalog";
        kpis["Catalog Backlog Value"] = \`$\${Math.round((biz.annualRevenueUSD || 100000) * 1.8).toLocaleString()}\`;
        if (isHit) revModifier *= (2.2 + Math.random() * 1.5);
        break;
      }
      case "manufacturing": {
        const plantUtil = (78 + Math.random() * 16).toFixed(1);
        const lineYield = (94.5 + Math.random() * 4.5).toFixed(1);
        const scrapRate = (100 - parseFloat(lineYield)).toFixed(1);
        kpis["Plant Utilization %"] = \`\${plantUtil}%\`;
        kpis["Line Yield %"] = \`\${lineYield}%\`;
        kpis["Scrap Rate %"] = \`\${scrapRate}%\`;
        costModifier *= (1.0 + (parseFloat(scrapRate) / 80.0));
        break;
      }
      case "hardware": {
        const bomCostPct = (52 + Math.random() * 8).toFixed(1);
        const leadWeeks = Math.max(6, Math.round(18 - scale));
        kpis["BOM Cost %"] = \`\${bomCostPct}%\`;
        kpis["Lead Time"] = \`\${leadWeeks} Weeks\`;
        kpis["Warranty Reserves"] = \`$\${Math.round((biz.annualRevenueUSD || 100000) * 0.04).toLocaleString()}\`;
        costModifier *= (parseFloat(bomCostPct) / 50.0);
        break;
      }
      case "fleet_transportation": {
        const loadFactor = (72 + Math.random() * 20).toFixed(1);
        const fuelCost = Math.round((biz.annualRevenueUSD || 100000) * 0.22);
        kpis["Fleet Load Factor %"] = \`\${loadFactor}%\`;
        kpis["Fuel Expense"] = \`$\${fuelCost.toLocaleString()}\`;
        kpis["Vehicle Availability"] = \`\${(91 + Math.random() * 6).toFixed(1)}%\`;
        revModifier *= (parseFloat(loadFactor) / 80.0);
        break;
      }
      case "projects": {
        const completion = (75 + Math.random() * 25).toFixed(1);
        const overrun = (2.0 + Math.random() * 6.0).toFixed(1);
        kpis["% Completion"] = \`\${completion}%\`;
        kpis["Cost Overrun %"] = \`\${overrun}%\`;
        kpis["Retention Receivables"] = \`$\${Math.round((biz.accountsReceivableUSD || 20000) * 0.15).toLocaleString()}\`;
        costModifier *= (1.0 + parseFloat(overrun) / 100);
        break;
      }
      case "asset_ownership": {
        const ltv = (45 + Math.random() * 15).toFixed(1);
        const capRate = (6.2 + Math.random() * 1.8).toFixed(1);
        kpis["Asset LTV %"] = \`\${ltv}%\`;
        kpis["Cap Rate %"] = \`\${capRate}%\`;
        kpis["Depreciation Reserve"] = \`$\${Math.round((biz.fixedAssetsUSD || 100000) * 0.08).toLocaleString()}\`;
        break;
      }
      case "regulated_balance_sheet": {
        const tier1 = (14.2 + Math.random() * 3.0).toFixed(1);
        const nim = (3.4 + Math.random() * 0.8).toFixed(2);
        const npl = (1.8 + Math.random() * 1.5).toFixed(1);
        kpis["Tier-1 Capital %"] = \`\${tier1}%\`;
        kpis["Net Interest Margin"] = \`\${nim}%\`;
        kpis["NPL Ratio %"] = \`\${npl}%\`;
        if (parseFloat(tier1) < 10.5) riskDelta += 0.25;
        break;
      }
      case "research_ip": {
        const phase = biz.rdPhase || "Phase II Trials";
        const patentYears = biz.patentYearsRemaining || 14;
        kpis["Pipeline Stage"] = phase;
        kpis["Patent Runway"] = \`\${patentYears} Years\`;
        kpis["R&D Intensity %"] = \`\${(((biz.rdExpenseUSD || 25000) / Math.max(1, biz.annualRevenueUSD || 100000)) * 100).toFixed(1)}%\`;
        break;
      }
      case "commodity_extraction": {
        const cashCost = Math.round(45 + Math.random() * 15);
        const spotPrice = Math.round(75 + Math.random() * 35);
        kpis["Cash Cost / Unit"] = \`$\${cashCost}\`;
        kpis["Market Spot Price"] = \`$\${spotPrice}\`;
        kpis["Ore Recovery %"] = \`\${(88 + Math.random() * 8).toFixed(1)}%\`;
        revModifier *= (spotPrice / 75);
        break;
      }
      case "network_infrastructure": {
        const uptime = (99.92 + Math.random() * 0.07).toFixed(3);
        const dens = Math.round(1500 * Math.pow(scale, 1.2));
        kpis["Network Uptime %"] = \`\${uptime}%\`;
        kpis["Subscribers / Node"] = dens.toLocaleString();
        kpis["Backhaul Load %"] = \`\${(62 + Math.random() * 20).toFixed(1)}%\`;
        break;
      }
      default:
        break;
    }

    return { kpis, revModifier, costModifier, riskDelta };
  }

  // --- GAAP ACCRUAL CORPORATE FINANCE & WORKING CAPITAL ENGINE ---
  function calculateAnnualCorporateFinancials(biz, state) {
    const scale = biz.scaleUnits || 1;
    const template = BUSINESS_CATALOG.find(t => t.id === biz.catalogId) || {};

    let totalRevMod = 1.0;
    let totalCostMod = 1.0;
    let totalRiskDelta = 0.0;
    const activeKpis = {};

    (biz.boundEngines || []).forEach(engId => {
      const res = evaluateEngine(engId, biz, state);
      totalRevMod *= res.revModifier;
      totalCostMod *= res.costModifier;
      totalRiskDelta += res.riskDelta;
      Object.assign(activeKpis, res.kpis);
    });

    const macroFactor = 0.94 + Math.random() * 0.16;
    const baseRev = template.baseRev || biz.annualRevenueUSD || 100000;
    const grossRevenue = Math.round(baseRev * Math.pow(scale, 0.88) * totalRevMod * macroFactor);
    const returnsAndDiscounts = Math.round(grossRevenue * 0.02);
    const netRevenue = grossRevenue - returnsAndDiscounts;

    const baseMargin = template.margin || 0.60;
    const effectiveMargin = Math.max(0.10, Math.min(0.95, baseMargin / totalCostMod));
    const cogs = Math.round(netRevenue * (1 - effectiveMargin));
    const grossProfit = netRevenue - cogs;

    const smExpense = Math.max(5000, Math.round(netRevenue * 0.12) + (biz.marketingBudgetUSD || 0));
    const rdExpense = Math.round(netRevenue * (biz.boundEngines?.includes("research_ip") ? 0.22 : 0.06));
    const gaSalaries = Math.round(scale * 45000 + (biz.headcount || scale * 4) * 55000);
    const totalOpex = smExpense + rdExpense + gaSalaries;

    const ebitda = grossProfit - totalOpex;
    const depreciation = Math.round((biz.fixedAssetsUSD || 0) * 0.10 + (biz.ipAssetsUSD || 0) * 0.15);
    const ebit = ebitda - depreciation;

    const interestExpense = Math.round((biz.shortTermDebtUSD || 0) * 0.08 + (biz.longTermDebtUSD || 0) * 0.065);
    const ebt = ebit - interestExpense;

    const taxRate = 0.21;
    const taxExpense = ebt > 0 ? Math.round(ebt * taxRate) : 0;
    const netIncome = ebt - taxExpense;

    const dso = biz.workingCapitalDays?.dso || template.workingCapital?.dso || 30;
    const dio = biz.workingCapitalDays?.dio || template.workingCapital?.dio || 30;
    const dpo = biz.workingCapitalDays?.dpo || template.workingCapital?.dpo || 30;
    const ccc = dio + dso - dpo;

    const targetAR = Math.round(netRevenue * (dso / 365));
    const targetInventory = Math.round(cogs * (dio / 365));
    const targetAP = Math.round(cogs * (dpo / 365));

    const prevAR = biz.accountsReceivableUSD || targetAR;
    const prevInv = biz.inventoryUSD || targetInventory;
    const prevAP = biz.accountsPayableUSD || targetAP;

    const deltaAR = targetAR - prevAR;
    const deltaInv = targetInventory - prevInv;
    const deltaAP = targetAP - prevAP;

    // Statement of Cash Flows
    const cfo = netIncome + depreciation - deltaAR - deltaInv + deltaAP;
    const capexIntensity = template.workingCapital?.capexIntensity || 0.15;
    const capex = Math.round(netRevenue * capexIntensity * (scale > 1 ? 0.8 : 1.2));
    const cfi = -capex;

    const debtRepayment = Math.round((biz.longTermDebtUSD || 0) * 0.10);
    const equityRaised = biz.pendingEquityInjectionUSD || 0;
    biz.pendingEquityInjectionUSD = 0;
    const dividendsPaid = biz.pendingDividendsUSD || 0;
    biz.pendingDividendsUSD = 0;
    const cff = equityRaised - debtRepayment - dividendsPaid;

    const netCashFlow = cfo + cfi + cff;
    const newTreasury = (biz.treasuryUSD || 0) + netCashFlow;

    const newFixedAssets = Math.max(0, (biz.fixedAssetsUSD || 0) + capex - depreciation);
    const newIPAssets = Math.round((biz.ipAssetsUSD || 0) * 0.95 + rdExpense * 0.4);
    const totalAssets = newTreasury + targetAR + targetInventory + newFixedAssets + newIPAssets;

    const newShortTermDebt = biz.shortTermDebtUSD || 0;
    const newLongTermDebt = Math.max(0, (biz.longTermDebtUSD || 0) - debtRepayment);
    const totalLiabilities = targetAP + newShortTermDebt + newLongTermDebt;

    const stockholdersEquity = totalAssets - totalLiabilities;
    const retainedEarnings = (biz.retainedEarningsUSD || 0) + netIncome - dividendsPaid;
    const paidInCapital = stockholdersEquity - retainedEarnings;

    const valMultiple = template.multiple || 10;
    const valuation = Math.max(5000, Math.round(Math.max(ebitda, netRevenue * 0.20) * valMultiple));

    const insolvencyRisks = [];
    let isBankrupt = false;

    if (newTreasury < 0) {
      if (netIncome > 0 && deltaAR + deltaInv > netIncome) {
        insolvencyRisks.push("Working Capital Trap: Rapid revenue growth trapped all cash in receivables & inventory!");
      }
      if (debtRepayment > ebitda && ebitda > 0) {
        insolvencyRisks.push("CapEx Debt Maturity Trap: Heavy debt service outstripped operational operating earnings!");
      }
      if (newTreasury + (biz.revolverLimitUSD || 0) < 0) {
        isBankrupt = true;
        insolvencyRisks.push("Illiquidity Insolvency: Treasury exhausted and credit facilities maxed out!");
      }
    }

    return {
      pnl: {
        grossRevenue, returnsAndDiscounts, netRevenue, cogs, grossProfit,
        smExpense, rdExpense, gaSalaries, totalOpex, ebitda, depreciation,
        ebit, interestExpense, ebt, taxExpense, netIncome
      },
      balanceSheet: {
        cash: newTreasury, ar: targetAR, inventory: targetInventory,
        fixedAssets: newFixedAssets, ipAssets: newIPAssets, totalAssets,
        ap: targetAP, shortTermDebt: newShortTermDebt, longTermDebt: newLongTermDebt,
        totalLiabilities, paidInCapital, retainedEarnings, stockholdersEquity
      },
      cashFlow: { cfo, cfi, cff, capex, netCashFlow },
      workingCapital: { dso, dio, dpo, ccc, deltaAR, deltaInv, deltaAP },
      valuation, activeKpis, insolvencyRisks, isBankrupt
    };
  }

  // --- FOUNDER PITCH PEDIGREE SCORE ---
  function calculateFounderPitchScore(state, biz) {
    let score = 0;
    const smarts = state.stats?.smarts || 50;
    const prestige = state.stats?.prestige || 10;
    score += smarts * 0.25;
    score += prestige * 0.20;

    const college = state.education?.college;
    if (college) {
      if (["iit_bombay", "iit_delhi"].includes(college.id)) score += 30;
      else if (["harvard", "stanford", "mit"].includes(college.id)) score += 35;
      else if (["oxford", "cambridge"].includes(college.id)) score += 25;
      else score += 15;
    }

    const job = state.career?.job;
    if (job) {
      if (job.title?.includes("VP") || job.title?.includes("CTO") || job.title?.includes("Partner")) score += 25;
      else if (job.title?.includes("Senior") || job.title?.includes("Staff")) score += 15;
    }

    if (state.pastExits && state.pastExits.length > 0) score += 40;

    if (biz) {
      if (biz.annualRevenueUSD > 10000000) score += 25;
      else if (biz.annualRevenueUSD > 2000000) score += 15;
      else if (biz.annualRevenueUSD > 500000) score += 10;
    }

    return Math.round(score);
  }

  // --- PROCEDURAL TERM SHEET GENERATOR ---
  function generateTermSheets(state, biz, sourceId) {
    const source = FUNDING_SOURCES.find(s => s.id === sourceId) || FUNDING_SOURCES[4];
    const pitchScore = calculateFounderPitchScore(state, biz);
    const currentVal = biz.valuationUSD || 1000000;

    if (source.id === "top_accelerator") {
      return [{
        investorName: "Y Combinator (W26)",
        investorType: "Accelerator",
        investmentCheckUSD: 500000,
        preMoneyValuationUSD: 6642857,
        postMoneyEquityPct: 7.0,
        optionPoolPct: 10.0,
        liquidationPreference: "1x Non-Participating",
        boardSeatsRequested: 0,
        protectiveProvisions: "Standard SAFE Agreement"
      }];
    }

    const valMultA = 0.9 + (pitchScore / 100) * 0.4;
    const preMoneyA = Math.round(currentVal * valMultA);
    const checkA = Math.min(source.maxCheck, Math.max(source.minCheck, Math.round(preMoneyA * 0.22)));
    const postMoneyA = preMoneyA + checkA;
    const equityPctA = parseFloat(((checkA / postMoneyA) * 100).toFixed(1));

    const valMultB = 1.1 + (pitchScore / 100) * 0.5;
    const preMoneyB = Math.round(currentVal * valMultB);
    const checkB = Math.min(source.maxCheck, Math.max(source.minCheck, Math.round(preMoneyB * 0.28)));
    const postMoneyB = preMoneyB + checkB;
    const equityPctB = parseFloat(((checkB / postMoneyB) * 100).toFixed(1));

    return [
      {
        investorName: "Apex Horizon Ventures",
        investorType: "Lead Tier-1 VC",
        investmentCheckUSD: checkA,
        preMoneyValuationUSD: preMoneyA,
        postMoneyEquityPct: equityPctA,
        optionPoolPct: 15.0,
        liquidationPreference: "1x Non-Participating",
        boardSeatsRequested: source.tier >= "D" ? 1 : 0,
        protectiveProvisions: "Standard Investor Protective Provisions"
      },
      {
        investorName: "Titan Global Growth",
        investorType: "Aggressive Growth Fund",
        investmentCheckUSD: checkB,
        preMoneyValuationUSD: preMoneyB,
        postMoneyEquityPct: equityPctB,
        optionPoolPct: 20.0,
        liquidationPreference: "2x Participating (Double-Dip)",
        boardSeatsRequested: source.tier >= "D" ? 1 : 0,
        protectiveProvisions: "Veto Rights on Future Financings & M&A"
      }
    ];
  }

  function negotiateTermSheet(state, biz, originalSheet, requestedValuationBoostPct) {
    const pitchScore = calculateFounderPitchScore(state, biz);
    const boost = parseFloat(requestedValuationBoostPct);
    const requiredScore = 40 + (boost * 1.2);
    const isAccepted = pitchScore >= requiredScore;

    if (isAccepted) {
      const revisedPreMoney = Math.round(originalSheet.preMoneyValuationUSD * (1 + (boost / 100)));
      const check = originalSheet.investmentCheckUSD;
      const revisedPostMoney = revisedPreMoney + check;
      const revisedEquity = parseFloat(((check / revisedPostMoney) * 100).toFixed(1));

      return {
        accepted: true,
        revisedSheet: {
          ...originalSheet,
          preMoneyValuationUSD: revisedPreMoney,
          postMoneyEquityPct: revisedEquity,
          optionPoolPct: Math.max(10, originalSheet.optionPoolPct - 2.5)
        },
        message: \`🎉 The investment committee accepted your counter-offer! Valuation boosted to $\${revisedPreMoney.toLocaleString()}!\`
      };
    } else {
      return {
        accepted: false,
        revisedSheet: originalSheet,
        message: \`❌ Investors rejected the valuation increase. They stand firm on their original term sheet.\`
      };
    }
  }

  function executeFinancingRound(state, biz, acceptedSheet) {
    const check = acceptedSheet.investmentCheckUSD;
    const dilutionPct = acceptedSheet.postMoneyEquityPct;

    biz.treasuryUSD = (biz.treasuryUSD || 0) + check;
    biz.paidInCapitalUSD = (biz.paidInCapitalUSD || 0) + check;
    biz.valuationUSD = acceptedSheet.preMoneyValuationUSD + check;
    biz.valuation = biz.valuationUSD;

    const prevEquity = biz.founderEquityPct || 100;
    biz.founderEquityPct = parseFloat((prevEquity * (1 - (dilutionPct / 100))).toFixed(1));

    if (acceptedSheet.boardSeatsRequested > 0) {
      if (!biz.board) biz.board = { seats: [] };
      biz.board.seats.push({
        id: \`investor_\${Date.now()}\`,
        title: \`\${acceptedSheet.investorName} Partner\`,
        votes: 1,
        type: "investor",
        loyalty: 85,
        agenda: acceptedSheet.liquidationPreference.includes("Participating") ? "conservative" : "growth"
      });
    }

    return {
      success: true,
      message: \`🚀 Closed $\${check.toLocaleString()} financing round! Founder retained \${biz.founderEquityPct}% equity.\`
    };
  }

  // --- BOARD GOVERNANCE & COUP STATE MACHINE ---
  function stepBoardAnnual(state, biz) {
    if (!biz.board || !biz.board.seats) return;

    const fin = biz.lastFinancials || {};
    const runwayMonths = fin.cashFlow?.cfo < 0 ? Math.round((biz.treasuryUSD / Math.abs(fin.cashFlow.cfo)) * 12) : 99;
    const isProfitable = (biz.netProfitUSD || 0) > 0;
    const investorRelAU = biz.org?.allocatedAU?.investorRel || 15;

    let totalVotes = 0;
    let founderVotes = 0;
    let averageLoyalty = 0;

    biz.board.seats.forEach(seat => {
      totalVotes += seat.votes || 1;
      if (seat.type === "founder") {
        founderVotes += seat.votes || 1;
      } else {
        let loyaltyDelta = 0;
        if (investorRelAU >= 20) loyaltyDelta += 5;
        else if (investorRelAU < 10) loyaltyDelta -= 8;

        if (runwayMonths < 6) loyaltyDelta -= 20;
        else if (runwayMonths > 18) loyaltyDelta += 6;

        if (isProfitable) loyaltyDelta += 8;
        else if (seat.agenda === "conservative") loyaltyDelta -= 12;

        seat.loyalty = Math.max(10, Math.min(100, (seat.loyalty || 70) + loyaltyDelta));
        averageLoyalty += seat.loyalty;
      }
    });

    const nonFounderSeats = biz.board.seats.filter(s => s.type !== "founder");
    if (nonFounderSeats.length > 0) {
      averageLoyalty = Math.round(averageLoyalty / nonFounderSeats.length);
    } else {
      averageLoyalty = 100;
    }

    const founderVotePct = biz.founderClassBSharesPct > 50
      ? 100
      : Math.round((founderVotes / totalVotes) * 100);

    if (founderVotePct < 50 && (runwayMonths < 6 || averageLoyalty < 35)) {
      biz.board.coupThreat = true;
      biz.board.coupReason = runwayMonths < 6
        ? \`Board called an emergency session citing imminent insolvency (\${runwayMonths} months cash runway remaining).\`
        : \`Board called an emergency vote citing loss of confidence in leadership (Average Director Loyalty: \${averageLoyalty}%).\`;
    } else {
      biz.board.coupThreat = false;
      biz.board.coupReason = null;
    }
  }

  function executeCoupDefense(state, biz, leverId) {
    if (!biz.board || !biz.board.coupThreat) {
      return { success: false, message: "No active boardroom coup threat." };
    }

    switch (leverId) {
      case "lobby_swing_vote": {
        if (state.stats.energy < 25) return { success: false, message: "Insufficient energy to lobby directors." };
        state.stats.energy -= 25;

        const charm = (state.stats.looks + state.stats.smarts) / 2;
        const successProb = Math.min(85, Math.round(charm * 0.8 + (state.stats.prestige || 10) * 0.2));
        const roll = Math.random() * 100;

        if (roll <= successProb) {
          biz.board.coupThreat = false;
          biz.board.coupReason = null;
          biz.board.seats.forEach(s => { if (s.type !== "founder") s.loyalty = Math.min(100, s.loyalty + 25); });
          return {
            success: true,
            message: "🎯 Masterful boardroom lobbying! You persuaded the Independent Director to back your roadmap."
          };
        } else {
          return {
            success: false,
            message: "❌ Lobbying failed. The independent director voted with the institutional syndicate against your motion."
          };
        }
      }
      case "dual_class_defense": {
        if (biz.founderClassBSharesPct > 50) {
          biz.board.coupThreat = false;
          biz.board.coupReason = null;
          return {
            success: true,
            message: "⚖️ Invoked Class-B Common Stock Super-Voting Rights! With 10x statutory voting power, you vetoed the ouster motion."
          };
        } else {
          return { success: false, message: "❌ Class-B super-voting rights were diluted in prior rounds." };
        }
      }
      case "personal_cash_injection": {
        const fin = biz.lastFinancials || {};
        const annualBurn = Math.abs(fin.cashFlow?.cfo || biz.annualRevenueUSD * 0.25);
        const injectionRequired = Math.round(annualBurn * 1.1);

        if (state.fin.cash < injectionRequired) {
          return { success: false, message: \`Insufficient personal wallet cash. Requires $\${injectionRequired.toLocaleString()}.\` };
        }

        state.fin.cash -= injectionRequired;
        biz.treasuryUSD += injectionRequired;
        biz.paidInCapitalUSD = (biz.paidInCapitalUSD || 0) + injectionRequired;
        biz.board.coupThreat = false;
        biz.board.coupReason = null;
        biz.board.seats.forEach(s => { if (s.type !== "founder") s.loyalty = Math.min(100, s.loyalty + 30); });

        return {
          success: true,
          message: \`💵 Injected $\${injectionRequired.toLocaleString()} personal cash! Cash runway restored to 14 months.\`
        };
      }
      case "step_down_to_chairman": {
        biz.board.coupThreat = false;
        biz.board.coupReason = null;
        biz.founderRole = "Chairman of the Board & CPO";
        biz.hasExternalCEO = true;
        biz.board.seats.push({
          id: \`hired_ceo_\${Date.now()}\`,
          title: "Appointed Executive CEO",
          votes: 1,
          type: "executive",
          loyalty: 90,
          agenda: "profitability"
        });

        return {
          success: true,
          message: "👑 Stepped down to Chairman & CPO. Retained full equity ownership while delegating daily operations to an external CEO."
        };
      }
      default:
        return { success: false, message: "Unknown defense lever." };
    }
  }

  // --- ORG SCALING & LATENT CRISIS ENGINE ---
  function stepOrgAnnual(state, biz) {
    if (!biz.org) {
      biz.org = {
        scaleTier: "micro",
        allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 },
        techDebt: 5, qaDeficit: 5, regulatoryExposure: 5, morale: 90
      };
    }

    const au = biz.org.allocatedAU || { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 };

    if (au.product < 15) biz.org.techDebt = Math.min(100, (biz.org.techDebt || 5) + 12);
    else if (au.product >= 25) biz.org.techDebt = Math.max(0, (biz.org.techDebt || 5) - 6);

    if (au.fires < 10 || au.hiring < 15) biz.org.qaDeficit = Math.min(100, (biz.org.qaDeficit || 5) + 10);
    else if (au.hiring >= 25) biz.org.qaDeficit = Math.max(0, (biz.org.qaDeficit || 5) - 5);

    if (au.strategy < 15) biz.org.regulatoryExposure = Math.min(100, (biz.org.regulatoryExposure || 5) + 8);
    else if (au.strategy >= 25) biz.org.regulatoryExposure = Math.max(0, (biz.org.regulatoryExposure || 5) - 4);

    let moraleDelta = 0;
    if ((biz.netProfitUSD || 0) > 0) moraleDelta += 4;
    else moraleDelta -= 6;
    if (au.hiring >= 20) moraleDelta += 3;
    biz.org.morale = Math.max(20, Math.min(100, (biz.org.morale || 85) + moraleDelta));

    const crisisEvents = [];

    if (biz.org.techDebt > 75 && Math.random() < 0.35) {
      const outageCost = Math.round(biz.annualRevenueUSD * 0.08);
      biz.treasuryUSD -= outageCost;
      biz.org.techDebt = Math.max(30, biz.org.techDebt - 35);
      crisisEvents.push(\`💥 Major Infrastructure Outage! High tech debt cost $\${outageCost.toLocaleString()} in emergency downtime repairs.\`);
    }

    if (biz.org.qaDeficit > 75 && Math.random() < 0.30) {
      const recallCost = Math.round(biz.annualRevenueUSD * 0.12);
      biz.treasuryUSD -= recallCost;
      biz.org.qaDeficit = Math.max(30, biz.org.qaDeficit - 35);
      crisisEvents.push(\`⚠️ Product Defect Recall! QA deficit triggered a product recall costing $\${recallCost.toLocaleString()}.\`);
    }

    if (biz.org.regulatoryExposure > 75 && Math.random() < 0.25) {
      const fineCost = Math.round(biz.annualRevenueUSD * 0.10);
      biz.treasuryUSD -= fineCost;
      biz.org.regulatoryExposure = Math.max(30, biz.org.regulatoryExposure - 30);
      crisisEvents.push(\`⚖️ Regulatory Sanction! Compliance audit imposed a fine of $\${fineCost.toLocaleString()}.\`);
    }

    return { crisisEvents };
  }

  function reallocateAttentionUnits(biz, newAU) {
    const sum = (newAU.strategy || 0) + (newAU.hiring || 0) + (newAU.investorRel || 0) + (newAU.product || 0) + (newAU.fires || 0);
    if (sum !== 100) {
      return { success: false, message: \`Total Attention Units must equal exactly 100 AU (currently \${sum} AU).\` };
    }
    biz.org.allocatedAU = { ...newAU };
    return { success: true, message: "Successfully updated annual Attention Unit priorities!" };
  }
`;

content = content.substring(0, sec4Idx) + newSec4 + "\n\n  " + content.substring(sec5Idx);

// Now update ageUp() Life Stage 6
const ageUpBizStartMarker = '// --- LIFE STAGE 6: 50 BUSINESSES OPERATIONS ---';
const ageUpBizEndMarker = '// --- LIFE STAGE 7: REAL ESTATE RENTS & MAINTENANCE ---';

const ageUpStartIdx = content.indexOf(ageUpBizStartMarker);
const ageUpEndIdx = content.indexOf(ageUpBizEndMarker);

if (ageUpStartIdx === -1 || ageUpEndIdx === -1) {
  console.error('AgeUp markers not found!');
  process.exit(1);
}

const newAgeUpBiz = `// --- LIFE STAGE 6: 120 BUSINESSES CORPORATE OPERATIONS ---
    G.biz.forEach(b => {
      b.yearsActive = (b.yearsActive || 0) + 1;
      const fin = calculateAnnualCorporateFinancials(b, G);
      b.annualRevenueUSD = fin.pnl.netRevenue;
      b.annualRev = fin.pnl.netRevenue;
      b.ebitdaUSD = fin.pnl.ebitda;
      b.netProfitUSD = fin.pnl.netIncome;
      b.profit = fin.pnl.netIncome;
      b.treasuryUSD = fin.balanceSheet.cash;
      b.treasury = fin.balanceSheet.cash;
      b.accountsReceivableUSD = fin.balanceSheet.ar;
      b.inventoryUSD = fin.balanceSheet.inventory;
      b.fixedAssetsUSD = fin.balanceSheet.fixedAssets;
      b.ipAssetsUSD = fin.balanceSheet.ipAssets;
      b.accountsPayableUSD = fin.balanceSheet.ap;
      b.shortTermDebtUSD = fin.balanceSheet.shortTermDebt;
      b.longTermDebtUSD = fin.balanceSheet.longTermDebt;
      b.paidInCapitalUSD = fin.balanceSheet.paidInCapital;
      b.retainedEarningsUSD = fin.balanceSheet.retainedEarnings;
      b.valuationUSD = fin.valuation;
      b.valuation = fin.valuation;
      b.kpis = fin.activeKpis;
      b.lastFinancials = fin;

      // Org stepping & latent crises
      const orgRes = stepOrgAnnual(G, b);
      (orgRes.crisisEvents || []).forEach(e => logs.push(e));

      // Board stepping
      stepBoardAnnual(G, b);
      if (b.board?.coupThreat) {
        logs.push(\`⚠️ \${b.name}: Boardroom Coup initiated by institutional directors!\`);
      }

      if (fin.isBankrupt) {
        b.inRestructuring = true;
        logs.push(\`🚨 \${b.name}: Illiquid insolvency! Entered Chapter 11 restructuring.\`);
      } else {
        logs.push(\`🏭 \${b.name}: Net Rev $\${fin.pnl.netRevenue.toLocaleString()} | Profit $\${fin.pnl.netIncome.toLocaleString()} | Cash $\${fin.balanceSheet.cash.toLocaleString()}\`);
      }
    });
`;

content = content.substring(0, ageUpStartIdx) + newAgeUpBiz + "\n    " + content.substring(ageUpEndIdx);

// Now update renderBusinessTab(vc)
const renderBizStartMarker = '// TAB 3: 50 BUSINESSES';
const renderBizEndMarker = '// TAB 4: FINANCE & ASSETS';

const renderBizStartIdx = content.indexOf(renderBizStartMarker);
const renderBizEndIdx = content.indexOf(renderBizEndMarker);

if (renderBizStartIdx === -1 || renderBizEndIdx === -1) {
  console.error('renderBusinessTab markers not found!');
  process.exit(1);
}

const newRenderBiz = `// TAB 3: 120-BUSINESS CATALOG & ENTERPRISE COCKPIT
  let bizSubTab = "enterprises";
  let catalogSectorFilter = "all";
  let catalogTierFilter = "all";
  let activeBizIndex = 0;

  function renderBusinessTab(vc) {
    const age = G.char.age;
    if (age < 18) {
      vc.innerHTML = \`
        <div class="childhood-lock-box">
          <div class="childhood-lock-icon">💼</div>
          <div class="childhood-lock-title">Commercial Enterprise Locked (Age 18+)</div>
          <div class="childhood-lock-desc">
            Under commercial corporate law, founding a registered company, managing corporate treasury, and executing legal contracts requires adulthood (Age 18+).<br><br>
            <strong>Current Age: \${age}</strong> (\${18 - age} years until legal incorporation eligibility).<br>
            During childhood, focus on school, building high Smarts, and saving your pocket money!
          </div>
          <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; text-align: left; margin-top: 10px;">
            <div style="font-weight: 700; margin-bottom: 4px; color: var(--accent-emerald);">💰 Childhood Piggy Bank:</div>
            <div>Wallet Cash: <strong>$\${G.fin.cash.toLocaleString()}</strong></div>
            <div>Family Wealth Tier: <strong>\${G.char.familyWealth.replace("_", " ").toUpperCase()}</strong></div>
          </div>
        </div>
      \`;
      return;
    }

    if (!G.biz) G.biz = [];
    if (activeBizIndex >= G.biz.length) activeBizIndex = 0;
    const currentBiz = G.biz[activeBizIndex];

    const subNavHtml = \`
      <div class="subtabs-bar" style="margin-bottom: 12px;">
        <button class="subtab-btn \${bizSubTab === 'enterprises' ? 'active' : ''} btn-biz-subtab" data-tab="enterprises">🏢 Companies (\${G.biz.length})</button>
        <button class="subtab-btn \${bizSubTab === 'catalog' ? 'active' : ''} btn-biz-subtab" data-tab="catalog">🌐 Catalog (120)</button>
        \${currentBiz ? \`
          <button class="subtab-btn \${bizSubTab === 'financials' ? 'active' : ''} btn-biz-subtab" data-tab="financials">📊 Financials</button>
          <button class="subtab-btn \${bizSubTab === 'fundraising' ? 'active' : ''} btn-biz-subtab" data-tab="fundraising">🚀 Funding</button>
          <button class="subtab-btn \${bizSubTab === 'boardroom' ? 'active' : ''} btn-biz-subtab" data-tab="boardroom">🏛️ Board</button>
          <button class="subtab-btn \${bizSubTab === 'org' ? 'active' : ''} btn-biz-subtab" data-tab="org">👥 Org & AU</button>
        \` : ''}
      </div>
    \`;

    let bodyHtml = "";

    // 1. ENTERPRISES COCKPIT
    if (bizSubTab === "enterprises") {
      if (G.biz.length === 0) {
        bodyHtml = \`
          <div class="card" style="text-align: center; padding: 24px;">
            <div style="font-size: 36px; margin-bottom: 8px;">🏭</div>
            <h3 style="font-size: 15px; margin-bottom: 6px;">No Active Operating Companies</h3>
            <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 16px;">
              Incorporate a venture from the 120-business catalog across 12 sectors and capital tiers A ($500) to G ($1B+).
            </p>
            <button class="btn btn-primary btn-sm btn-go-catalog">Browse 120 Businesses ➔</button>
          </div>
        \`;
      } else {
        bodyHtml = \`
          \${G.biz.length > 1 ? \`
            <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px;">
              \${G.biz.map((b, i) => \`
                <button class="btn btn-sm \${i === activeBizIndex ? 'btn-primary' : ''} btn-switch-biz" data-idx="\${i}" style="white-space: nowrap; font-size: 11px;">
                  \${b.icon} \${b.name}
                </button>
              \`).join("")}
            </div>
          \` : ''}

          <div class="card" style="border-left: 3px solid var(--accent-emerald);">
            <div class="card-title-row">
              <div class="card-title">
                <span>\${currentBiz.icon}</span> \${currentBiz.name}
                <span class="pill-badge blue" style="font-size: 8px; margin-left: 6px;">Tier \${currentBiz.capitalTier || 'C'}</span>
                <span class="pill-badge emerald" style="font-size: 8px;">\${(currentBiz.org?.scaleTier || 'micro').toUpperCase()}</span>
              </div>
              <div style="font-size: 13px; font-weight: 800; color: var(--accent-emerald);">
                $\${(currentBiz.valuationUSD || currentBiz.valuation || 100000).toLocaleString()}
              </div>
            </div>

            \${currentBiz.inRestructuring ? \`
              <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid var(--accent-rose); border-radius: 8px; padding: 8px; font-size: 10px; color: #fca5a5; margin-bottom: 10px;">
                🚨 <strong>Chapter 11 Restructuring Notice:</strong> Operating cash exhausted. Liquidate assets, raise rescue debt, or inject personal cash to avert liquidation!
              </div>
            \` : ''}

            \${currentBiz.board?.coupThreat ? \`
              <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid var(--accent-amber); border-radius: 8px; padding: 8px; font-size: 10px; color: #fde68a; margin-bottom: 10px;">
                ⚠️ <strong>Boardroom Coup Imminent!</strong> \${currentBiz.board.coupReason}
                <div style="margin-top: 6px;">
                  <button class="btn btn-sm btn-primary btn-goto-board" style="background: var(--accent-amber); color: #000; font-weight: 700;">Open Boardroom Chamber ➔</button>
                </div>
              </div>
            \` : ''}

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 10px; text-align: center;">
              <div>
                <div style="color: var(--text-secondary);">Revenue</div>
                <div style="font-weight: 700;">$\${(currentBiz.annualRevenueUSD || currentBiz.annualRev || 0).toLocaleString()}</div>
              </div>
              <div>
                <div style="color: var(--text-secondary);">Net Profit</div>
                <div style="font-weight: 700; color: \${(currentBiz.netProfitUSD || currentBiz.profit || 0) >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                  $\${(currentBiz.netProfitUSD || currentBiz.profit || 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div style="color: var(--text-secondary);">Treasury Cash</div>
                <div style="font-weight: 700; color: \${(currentBiz.treasuryUSD || currentBiz.treasury || 0) >= 0 ? '#60a5fa' : 'var(--accent-rose)'};">
                  $\${(currentBiz.treasuryUSD || currentBiz.treasury || 0).toLocaleString()}
                </div>
              </div>
            </div>

            <div style="margin-bottom: 12px;">
              <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 4px;">
                ⚡ Live Economic Engine Telemetry (\${(currentBiz.boundEngines || []).length} Sub-Engines)
              </div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
                \${Object.entries(currentBiz.kpis || {}).map(([key, val]) => \`
                  <div style="background: var(--bg-subtle); padding: 6px 8px; border-radius: 6px; font-size: 10px; display: flex; justify-content: space-between;">
                    <span style="color: var(--text-secondary);">\${key}:</span>
                    <strong style="color: #fff;">\${val}</strong>
                  </div>
                \`).join("")}
              </div>
            </div>

            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="btn btn-sm btn-biz-expand" data-idx="\${activeBizIndex}">
                📈 Expand Scale ($\${Math.round((currentBiz.valuationUSD || currentBiz.valuation || 100000) * 0.08).toLocaleString()})
              </button>
              <button class="btn btn-sm btn-biz-dividend" data-idx="\${activeBizIndex}">
                💰 Dividend ($\${Math.round(Math.max(0, currentBiz.treasuryUSD || currentBiz.treasury || 0) * 0.3).toLocaleString()})
              </button>
              <button class="btn btn-sm btn-biz-inject" data-idx="\${activeBizIndex}">
                💵 Inject Cash
              </button>
              <button class="btn btn-sm btn-biz-sell" data-idx="\${activeBizIndex}" style="color: var(--accent-rose);">
                🤝 M&A Exit
              </button>
            </div>
          </div>
        \`;
      }
    }

    // 2. CATALOG SUBTAB (120 Businesses)
    else if (bizSubTab === "catalog") {
      const sectors = ["all", ...BUSINESS_SECTORS.map(s => s.name)];
      const tiers = ["all", "A", "B", "C", "D", "E", "F", "G"];

      const filteredCatalog = BUSINESS_CATALOG.filter(b => {
        const matchSec = catalogSectorFilter === "all" || b.sector === catalogSectorFilter;
        const matchTier = catalogTierFilter === "all" || b.capitalTier === catalogTierFilter;
        return matchSec && matchTier;
      });

      bodyHtml = \`
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>🌐</span> 120-Business Catalog</div>
            <span style="font-size: 11px; color: var(--text-secondary);">\${filteredCatalog.length} Matching</span>
          </div>

          <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 6px;">
            \${sectors.map(s => \`
              <button class="subtab-btn \${catalogSectorFilter === s ? 'active' : ''} btn-sec-filter" data-sec="\${s}" style="font-size: 9px; padding: 4px 6px; white-space: nowrap;">
                \${s === 'all' ? 'All Sectors' : s.split(" ")[0]}
              </button>
            \`).join("")}
          </div>

          <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 10px;">
            \${tiers.map(t => \`
              <button class="subtab-btn \${catalogTierFilter === t ? 'active' : ''} btn-tier-filter" data-tier="\${t}" style="font-size: 9px; padding: 4px 8px;">
                \${t === 'all' ? 'All Tiers (A-G)' : \`Tier \${t}\`}
              </button>
            \`).join("")}
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; max-height: 480px; overflow-y: auto;">
            \${filteredCatalog.map(b => \`
              <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px; background: var(--bg-subtle); padding: 8px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 18px;">\${b.icon}</span>
                    <div>
                      <h4 style="font-size: 12px; margin: 0;">\${b.name}</h4>
                      <div style="display: flex; gap: 4px; align-items: center; margin-top: 2px;">
                        <span class="pill-badge blue" style="font-size: 8px;">\${b.sector}</span>
                        <span class="pill-badge purple" style="font-size: 8px;">Tier \${b.capitalTier}</span>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-sm btn-primary btn-found-biz" data-id="\${b.id}" style="font-size: 10px; padding: 4px 8px;">
                    Found ($\${b.startupCost.toLocaleString()})
                  </button>
                </div>
                <p style="font-size: 10px; color: var(--text-secondary); margin: 4px 0 0 0;">
                  \${b.desc}
                </p>
                <div style="font-size: 9px; color: var(--accent-emerald); display: flex; gap: 8px; margin-top: 2px;">
                  <span>Margin: \${Math.round(b.margin * 100)}%</span>
                  <span>Exit: \${b.multiple}x</span>
                  <span>Min Smarts: \${b.minSmarts}</span>
                  <span>Engines: \${b.boundEngines.length}</span>
                </div>
              </div>
            \`).join("")}
          </div>
        </div>
      \`;
    }

    // 3. FINANCIALS SUBTAB
    else if (bizSubTab === "financials" && currentBiz) {
      const fin = currentBiz.lastFinancials || {};
      const pnl = fin.pnl || {
        grossRevenue: currentBiz.annualRevenueUSD || currentBiz.annualRev || 100000,
        returnsAndDiscounts: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.02),
        netRevenue: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.98),
        cogs: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.4),
        grossProfit: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.58),
        totalOpex: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.35),
        ebitda: currentBiz.ebitdaUSD || currentBiz.ebitda || 30000,
        depreciation: Math.round((currentBiz.ebitdaUSD || 30000) * 0.15),
        ebit: Math.round((currentBiz.ebitdaUSD || 30000) * 0.85),
        interestExpense: 0,
        ebt: Math.round((currentBiz.ebitdaUSD || 30000) * 0.85),
        taxExpense: Math.round((currentBiz.ebitdaUSD || 30000) * 0.18),
        netIncome: currentBiz.netProfitUSD || currentBiz.profit || 20000
      };

      const bs = fin.balanceSheet || {
        cash: currentBiz.treasuryUSD || currentBiz.treasury || 50000,
        ar: currentBiz.accountsReceivableUSD || 25000,
        inventory: currentBiz.inventoryUSD || 15000,
        fixedAssets: currentBiz.fixedAssetsUSD || 40000,
        ipAssets: currentBiz.ipAssetsUSD || 0,
        totalAssets: (currentBiz.treasuryUSD || 50000) + 80000,
        ap: currentBiz.accountsPayableUSD || 15000,
        shortTermDebt: currentBiz.shortTermDebtUSD || 0,
        longTermDebt: currentBiz.longTermDebtUSD || 0,
        totalLiabilities: (currentBiz.accountsPayableUSD || 15000),
        paidInCapital: currentBiz.paidInCapitalUSD || 50000,
        retainedEarnings: currentBiz.retainedEarningsUSD || 15000,
        stockholdersEquity: (currentBiz.paidInCapitalUSD || 50000) + (currentBiz.retainedEarningsUSD || 15000)
      };

      const cf = fin.cashFlow || { cfo: pnl.netIncome, cfi: -25000, cff: 0, capex: 25000, netCashFlow: pnl.netIncome - 25000 };
      const wc = fin.workingCapital || { dso: 30, dio: 30, dpo: 30, ccc: 30 };

      bodyHtml = \`
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>📊</span> GAAP Financial Statements</div>
            <span style="font-size: 11px; color: var(--accent-emerald);">Fiscal Year \${currentBiz.yearsActive || 1}</span>
          </div>

          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
            <div style="font-weight: 700; margin-bottom: 4px; color: #60a5fa;">⏱️ Cash Conversion Cycle (CCC): \${wc.ccc} Days</div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>DIO: \${wc.dio}d (Inventory)</span>
              <span>+ DSO: \${wc.dso}d (Receivables)</span>
              <span>- DPO: \${wc.dpo}d (Payables)</span>
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">1. Income Statement (P&L)</div>
          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between;"><span>Gross Revenue:</span><span>$\${pnl.grossRevenue.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Less: Returns & Discounts:</span><span>-$\${pnl.returnsAndDiscounts.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>Net Revenue:</span><span>$\${pnl.netRevenue.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--accent-rose);"><span>Cost of Goods Sold (COGS):</span><span>-$\${pnl.cogs.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--accent-emerald);"><span>Gross Profit:</span><span>$\${pnl.grossProfit.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Operating Expenses (OPEX):</span><span>-$\${pnl.totalOpex.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>EBITDA:</span><span>$\${pnl.ebitda.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Depreciation & Amortization:</span><span>-$\${pnl.depreciation.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>Operating EBIT:</span><span>$\${pnl.ebit.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Interest & Taxes:</span><span>-$\${(pnl.interestExpense + pnl.taxExpense).toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 4px; color: \${pnl.netIncome >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
              <span>Net Income:</span><span>$\${pnl.netIncome.toLocaleString()}</span>
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">2. Balance Sheet Identity (Assets ≡ Liabilities + Equity)</div>
          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
            <div style="font-weight: 700; color: #60a5fa;">Assets:</div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Cash & Equivalents:</span><span>$\${bs.cash.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Accounts Receivable (AR):</span><span>$\${bs.ar.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Inventory:</span><span>$\${bs.inventory.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>PP&E + IP:</span><span>$\${(bs.fixedAssets + bs.ipAssets).toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; border-top: 1px solid var(--border-color); padding-top: 2px;">
              <span>Total Assets:</span><span>$\${bs.totalAssets.toLocaleString()}</span>
            </div>

            <div style="font-weight: 700; color: #f472b6; margin-top: 4px;">Liabilities & Equity:</div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Accounts Payable (AP):</span><span>$\${bs.ap.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Debt Obligations:</span><span>$\${(bs.shortTermDebt + bs.longTermDebt).toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Stockholders' Equity:</span><span>$\${bs.stockholdersEquity.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; border-top: 1px solid var(--border-color); padding-top: 2px;">
              <span>Total Liabilities & Equity:</span><span>$\${(bs.totalLiabilities + bs.stockholdersEquity).toLocaleString()}</span>
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">3. Statement of Cash Flows</div>
          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between;"><span>Operating Cash Flow (CFO):</span><span style="color: \${cf.cfo >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">$\${cf.cfo.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Investing Cash Flow (CFI - CapEx):</span><span style="color: var(--accent-rose);">$\${cf.cfi.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Financing Cash Flow (CFF):</span><span>$\${cf.cff.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 800; border-top: 1px solid var(--border-color); padding-top: 4px;">
              <span>Net Change in Liquid Cash:</span><span>$\${cf.netCashFlow.toLocaleString()}</span>
            </div>
          </div>
        </div>
      \`;
    }

    // 4. FUNDRAISING SUBTAB
    else if (bizSubTab === "fundraising" && currentBiz) {
      const pitchScore = calculateFounderPitchScore(G, currentBiz);

      bodyHtml = \`
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>🚀</span> Capital Markets & Pitch Desk</div>
            <span class="pill-badge emerald">Pitch Score: \${pitchScore}</span>
          </div>

          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
            <div style="font-weight: 700; margin-bottom: 2px;">Founder Pedigree Breakdown:</div>
            <div style="color: var(--text-secondary);">
              Degree: \${G.education?.college?.name || "Self-Taught"} | 
              Smarts: \${G.stats.smarts} | 
              Prestige: \${G.stats.prestige} | 
              Current Equity: \${currentBiz.founderEquityPct || 100}%
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Select Funding Source to Solicit Term Sheets:</div>
          <div style="display: flex; flex-direction: column; gap: 6px; max-height: 380px; overflow-y: auto;">
            \${FUNDING_SOURCES.map(s => \`
              <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px;">
                <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 2px;">
                  <span>\${s.name} (\${s.tier})</span>
                  <button class="btn btn-sm btn-primary btn-solicit-terms" data-sid="\${s.id}" style="font-size: 9px; padding: 2px 6px;">
                    Solicit Terms ➔
                  </button>
                </div>
                <p style="margin: 0; color: var(--text-secondary);">\${s.desc}</p>
                <div style="color: #60a5fa; margin-top: 2px;">Check Size: $\${s.minCheck.toLocaleString()} – $\${s.maxCheck.toLocaleString()}</div>
              </div>
            \`).join("")}
          </div>
        </div>
      \`;
    }

    // 5. BOARDROOM SUBTAB
    else if (bizSubTab === "boardroom" && currentBiz) {
      const seats = currentBiz.board?.seats || [
        { id: "founder", title: "Founder & CEO (YOU)", votes: 1, type: "founder", loyalty: 100, agenda: "growth" }
      ];

      bodyHtml = \`
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>🏛️</span> Board of Directors Chamber</div>
            <span style="font-size: 11px; color: var(--text-secondary);">\${seats.length} Seated Directors</span>
          </div>

          \${currentBiz.board?.coupThreat ? \`
            <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid var(--accent-rose); border-radius: 8px; padding: 10px; font-size: 10px; color: #fca5a5; margin-bottom: 12px;">
              <div style="font-weight: 700; font-size: 11px; margin-bottom: 4px;">🚨 BOARDROOM COUP IN PROGRESS!</div>
              <div>\${currentBiz.board.coupReason}</div>
              <div style="margin-top: 8px; font-weight: 700; color: #fff;">Activate Tactical Defense:</div>
              <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px;">
                <button class="btn btn-sm btn-coup-def" data-lever="lobby_swing_vote" style="background: #3b82f6; text-align: left;">
                  🎯 Lobby Independent Swing Vote (25 Energy)
                </button>
                <button class="btn btn-sm btn-coup-def" data-lever="dual_class_defense" style="background: #8b5cf6; text-align: left;">
                  ⚖️ Invoke Class-B Super-Voting Defense (10:1 Voting Rights)
                </button>
                <button class="btn btn-sm btn-coup-def" data-lever="personal_cash_injection" style="background: #10b981; text-align: left;">
                  💵 Personal Cash Injection (Guarantees 12 Months Runway)
                </button>
                <button class="btn btn-sm btn-coup-def" data-lever="step_down_to_chairman" style="background: #f59e0b; color: #000; text-align: left; font-weight: 700;">
                  👑 Step Down to Chairman & CPO (Keep 100% Equity)
                </button>
              </div>
            </div>
          \` : \`
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--accent-emerald); border-radius: 8px; padding: 8px; font-size: 10px; color: #6ee7b7; margin-bottom: 12px;">
              ✅ <strong>Board Relations Stable:</strong> Founder maintains the confidence and statutory direction of the board.
            </div>
          \`}

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Director Seat Roster:</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            \${seats.map(s => \`
              <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700;">\${s.title}</div>
                  <div style="color: var(--text-secondary); font-size: 9px;">Agenda: \${(s.agenda || 'growth').toUpperCase()} | Votes: \${s.votes || 1}</div>
                </div>
                <div style="text-align: right;">
                  <div style="color: \${(s.loyalty || 70) >= 70 ? 'var(--accent-emerald)' : ((s.loyalty || 70) >= 40 ? 'var(--accent-amber)' : 'var(--accent-rose)')}; font-weight: 700;">
                    Loyalty: \${s.loyalty || 70}%
                  </div>
                </div>
              </div>
            \`).join("")}
          </div>
        </div>
      \`;
    }

    // 6. ORG & AU SUBTAB
    else if (bizSubTab === "org" && currentBiz) {
      const org = currentBiz.org || { scaleTier: "micro", allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 }, techDebt: 5, qaDeficit: 5, regulatoryExposure: 5, morale: 90 };
      const au = org.allocatedAU || { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 };

      bodyHtml = \`
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>👥</span> Organizational Scale & Attention Units</div>
            <span class="pill-badge purple">\${(org.scaleTier || 'micro').toUpperCase()} TIER</span>
          </div>

          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
            <div style="font-weight: 700; margin-bottom: 4px; color: var(--accent-rose);">⚠️ Latent Crisis Detonation Queue:</div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between;">
                <span>Tech Debt:</span>
                <strong style="color: \${org.techDebt > 70 ? 'var(--accent-rose)' : '#fff'};">\${org.techDebt}%</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>QA & Defect Deficit:</span>
                <strong style="color: \${org.qaDeficit > 70 ? 'var(--accent-rose)' : '#fff'};">\${org.qaDeficit}%</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Regulatory Exposure:</span>
                <strong style="color: \${org.regulatoryExposure > 70 ? 'var(--accent-rose)' : '#fff'};">\${org.regulatoryExposure}%</strong>
              </div>
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Allocate Founder's 100 Annual Attention Units (AU):</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Vision & Strategy:</span>
              <input type="number" class="inp-au" data-k="strategy" value="\${au.strategy}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Key Executive Hiring:</span>
              <input type="number" class="inp-au" data-k="hiring" value="\${au.hiring}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Investor Relations & Board:</span>
              <input type="number" class="inp-au" data-k="investorRel" value="\${au.investorRel}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Product & R&D Review:</span>
              <input type="number" class="inp-au" data-k="product" value="\${au.product}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Operational Firefighting:</span>
              <input type="number" class="inp-au" data-k="fires" value="\${au.fires}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <button class="btn btn-primary btn-sm btn-save-au" style="margin-top: 8px;">Save 100 AU Allocation</button>
          </div>
        </div>
      \`;
    }

    vc.innerHTML = subNavHtml + bodyHtml;

    // EVENT LISTENERS
    document.querySelectorAll(".btn-biz-subtab").forEach(btn => {
      btn.addEventListener("click", () => {
        bizSubTab = btn.dataset.tab;
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-switch-biz").forEach(btn => {
      btn.addEventListener("click", () => {
        activeBizIndex = parseInt(btn.dataset.idx);
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-sec-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        catalogSectorFilter = btn.dataset.sec;
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-tier-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        catalogTierFilter = btn.dataset.tier;
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-go-catalog").forEach(btn => {
      btn.addEventListener("click", () => {
        bizSubTab = "catalog";
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-goto-board").forEach(btn => {
      btn.addEventListener("click", () => {
        bizSubTab = "boardroom";
        renderCurrentTab();
      });
    });

    // Found Business
    document.querySelectorAll(".btn-found-biz").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const t = BUSINESS_CATALOG.find(x => x.id === id);
        if (!t) return;

        if (G.stats.smarts < t.minSmarts) {
          toast(\`Requires at least \${t.minSmarts} Smarts to establish \${t.name}!\`, "error");
          return;
        }
        if (G.fin.cash < t.startupCost) {
          toast(\`Requires $\${t.startupCost.toLocaleString()} wallet cash!\`, "error");
          return;
        }

        G.fin.cash -= t.startupCost;
        const initialFixedAssets = Math.round(t.startupCost * (t.workingCapital?.capexIntensity || 0.25));
        const initialTreasury = t.startupCost - initialFixedAssets;

        G.biz.push({
          instanceId: \`biz_\${Date.now()}\`,
          catalogId: t.id,
          name: t.name,
          sector: t.sector,
          icon: t.icon,
          capitalTier: t.capitalTier,
          scaleUnits: 1,
          yearsActive: 0,
          founderEquityPct: 100,
          founderClassBSharesPct: 100,
          headcount: 4,
          annualRevenueUSD: t.baseRev,
          annualRev: t.baseRev,
          ebitdaUSD: Math.round(t.baseRev * 0.25),
          ebitda: Math.round(t.baseRev * 0.25),
          netProfitUSD: Math.round(t.baseRev * 0.18),
          profit: Math.round(t.baseRev * 0.18),
          treasuryUSD: initialTreasury,
          treasury: initialTreasury,
          accountsReceivableUSD: Math.round(t.baseRev * (t.workingCapital.dso / 365)),
          inventoryUSD: Math.round(t.baseRev * (1 - t.margin) * (t.workingCapital.dio / 365)),
          fixedAssetsUSD: initialFixedAssets,
          ipAssetsUSD: t.boundEngines.includes("research_ip") ? Math.round(t.startupCost * 0.3) : 0,
          accountsPayableUSD: Math.round(t.baseRev * (1 - t.margin) * (t.workingCapital.dpo / 365)),
          shortTermDebtUSD: 0,
          longTermDebtUSD: 0,
          retainedEarningsUSD: 0,
          paidInCapitalUSD: t.startupCost,
          valuationUSD: Math.round(t.baseRev * t.multiple * 0.3),
          valuation: Math.round(t.baseRev * t.multiple * 0.3),
          marketingBudgetUSD: Math.round(t.baseRev * 0.05),
          workingCapitalDays: { ...t.workingCapital },
          boundEngines: [...t.boundEngines],
          kpis: {},
          inRestructuring: false,
          board: {
            seats: [
              { id: "founder", title: "Founder & CEO (YOU)", votes: 1, type: "founder", loyalty: 100, agenda: "growth" }
            ],
            coupThreat: false,
            coupReason: null
          },
          org: {
            scaleTier: "micro",
            allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 },
            techDebt: 5, qaDeficit: 5, regulatoryExposure: 5, morale: 90
          }
        });

        toast(\`🎉 Incorporated \${t.name}!\`, "celebrate");
        activeBizIndex = G.biz.length - 1;
        bizSubTab = "enterprises";
        updateHeader();
        renderCurrentTab();
      });
    });

    // Expand
    document.querySelectorAll(".btn-biz-expand").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const b = G.biz[idx];
        const val = b.valuationUSD || b.valuation || 100000;
        const cost = Math.round(val * 0.08);

        if ((b.treasuryUSD || b.treasury || 0) >= cost) {
          b.treasuryUSD = (b.treasuryUSD || 0) - cost;
          b.treasury = b.treasuryUSD;
        } else if (G.fin.cash >= cost) {
          G.fin.cash -= cost;
        } else {
          toast("Insufficient funds for expansion.", "error");
          return;
        }

        b.scaleUnits = (b.scaleUnits || 1) + 1;
        b.headcount = (b.headcount || 4) + 6;
        toast(\`Expanded \${b.name}! (Now Scale Units: \${b.scaleUnits})\`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Dividend
    document.querySelectorAll(".btn-biz-dividend").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const b = G.biz[idx];
        const cash = b.treasuryUSD || b.treasury || 0;
        const div = Math.round(Math.max(0, cash) * 0.3 * ((b.founderEquityPct || 100) / 100));

        if (div <= 0) {
          toast("No liquid treasury cash available for dividends.", "error");
          return;
        }

        b.treasuryUSD = cash - div;
        b.treasury = b.treasuryUSD;
        G.fin.cash += div;
        toast(\`Withdrew $\${div.toLocaleString()} founder dividend!\`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Inject Cash
    document.querySelectorAll(".btn-biz-inject").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const b = G.biz[idx];
        const injectAmt = 50000;

        if (G.fin.cash < injectAmt) {
          toast(\`Insufficient personal cash ($\${injectAmt.toLocaleString()} required).\`, "error");
          return;
        }

        G.fin.cash -= injectAmt;
        b.treasuryUSD = (b.treasuryUSD || 0) + injectAmt;
        b.treasury = b.treasuryUSD;
        b.paidInCapitalUSD = (b.paidInCapitalUSD || 0) + injectAmt;
        if (b.inRestructuring && b.treasuryUSD > 0) b.inRestructuring = false;

        toast(\`Injected $\${injectAmt.toLocaleString()} personal cash into \${b.name} treasury!\`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // M&A Exit
    document.querySelectorAll(".btn-biz-sell").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const b = G.biz[idx];
        const val = b.valuationUSD || b.valuation || 100000;
        const founderProceeds = Math.round(val * ((b.founderEquityPct || 100) / 100));

        if (confirm(\`Accept institutional M&A buyout offer for \${b.name} at valuation $\${val.toLocaleString()}?\\n\\nYour \${b.founderEquityPct || 100}% equity yields: $\${founderProceeds.toLocaleString()} personal cash.\`)) {
          G.fin.cash += founderProceeds;
          if (!G.pastExits) G.pastExits = [];
          G.pastExits.push({ name: b.name, valuation: val, proceeds: founderProceeds, year: G.char.age });
          G.biz.splice(idx, 1);
          toast(\`🏆 Sold \${b.name} for $\${founderProceeds.toLocaleString()}!\`, "celebrate");
          activeBizIndex = 0;
          updateHeader();
          renderCurrentTab();
        }
      });
    });

    // Coup Defense Levers
    document.querySelectorAll(".btn-coup-def").forEach(btn => {
      btn.addEventListener("click", () => {
        const lever = btn.dataset.lever;
        const res = executeCoupDefense(G, currentBiz, lever);
        if (res.success) toast(res.message, "celebrate");
        else toast(res.message, "error");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Solicit Term Sheets
    document.querySelectorAll(".btn-solicit-terms").forEach(btn => {
      btn.addEventListener("click", () => {
        const sid = btn.dataset.sid;
        const sheets = generateTermSheets(G, currentBiz, sid);
        showInteractiveTermSheetsModal(sheets, currentBiz);
      });
    });

    // Save AU
    const btnSaveAU = document.querySelector(".btn-save-au");
    if (btnSaveAU) {
      btnSaveAU.addEventListener("click", () => {
        const newAU = {};
        document.querySelectorAll(".inp-au").forEach(inp => {
          newAU[inp.dataset.k] = parseInt(inp.value) || 0;
        });
        const res = reallocateAttentionUnits(currentBiz, newAU);
        if (res.success) toast(res.message, "celebrate");
        else toast(res.message, "error");
        renderCurrentTab();
      });
    }
  }

  function showInteractiveTermSheetsModal(sheets, biz) {
    let modalHtml = \`
      <div style="font-size: 11px;">
        <p style="color: var(--text-secondary); margin-bottom: 12px;">
          Review competing investor term sheets for <strong>\${biz.name}</strong>. Negotiate valuation counter-offers or accept standard terms.
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          \${sheets.map((s, i) => \`
            <div style="background: var(--bg-subtle); padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
              <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 4px;">
                <span>\${s.investorName}</span>
                <span class="pill-badge blue" style="font-size: 9px;">\${s.investorType}</span>
              </div>
              <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 6px;">
                Check: <strong style="color: #fff;">$\${s.investmentCheckUSD.toLocaleString()}</strong> | 
                Pre-Money: <strong>$\${s.preMoneyValuationUSD.toLocaleString()}</strong> | 
                Dilution: <strong style="color: var(--accent-amber);">\${s.postMoneyEquityPct}%</strong>
              </div>
              <div style="font-size: 9px; color: var(--text-secondary); margin-bottom: 8px;">
                Liquidation Pref: <strong>\${s.liquidationPreference}</strong> | 
                Option Pool: <strong>\${s.optionPoolPct}%</strong> | 
                Board Seats: <strong>\${s.boardSeatsRequested}</strong>
              </div>
              <div style="display: flex; gap: 6px; align-items: center;">
                <button class="btn btn-sm btn-primary btn-accept-sheet" data-idx="\${i}" style="font-size: 10px; padding: 4px 8px;">
                  Accept Deal
                </button>
                <button class="btn btn-sm btn-counter-sheet" data-idx="\${i}" style="font-size: 10px; padding: 4px 8px;">
                  Counter-Offer (+20% Val)
                </button>
              </div>
            </div>
          \`).join("")}
        </div>
      </div>
    \`;

    openModal("Term Sheet Negotiations", modalHtml);

    document.querySelectorAll(".btn-accept-sheet").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const accepted = sheets[idx];
        const res = executeFinancingRound(G, biz, accepted);
        closeModal();
        toast(res.message, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-counter-sheet").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const sheet = sheets[idx];
        const res = negotiateTermSheet(G, biz, sheet, 20);
        if (res.accepted) {
          sheets[idx] = res.revisedSheet;
          toast(res.message, "celebrate");
          showInteractiveTermSheetsModal(sheets, biz);
        } else {
          toast(res.message, "error");
        }
      });
    });
  }
`;

content = content.substring(0, renderBizStartIdx) + newRenderBiz + "\n\n  " + content.substring(renderBizEndIdx);

fs.writeFileSync(srcPath, content, 'utf8');
console.log('Successfully assembled corporate game engine into game_engine.js!');
