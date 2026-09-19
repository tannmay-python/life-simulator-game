// Universal Corporate Accounting & 18 Economic Sub-Engines

import { ECONOMIC_ENGINES, BUSINESS_CATALOG } from "../data/businesses_data.js";

/**
 * 1. THE 18 SPECIALIZED ECONOMIC SUB-ENGINES
 * Each engine models unique real-world business physics and returns KPI values and financial modifiers.
 */
export function evaluateEngine(engineId, biz, state) {
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
      kpis["Conversion Rate %"] = `${convRate}%`;
      kpis["Rent / SqFt"] = `$${rentSqFt}`;
      kpis["Rev / SqFt"] = `$${revSqFt}`;
      revModifier *= (parseFloat(convRate) / 4.0);
      break;
    }
    case "inventory": {
      const stockoutRate = (Math.max(1.0, 8.5 - (biz.workingCapitalDays.dio / 5))).toFixed(1);
      const turnover = (365 / Math.max(1, biz.workingCapitalDays.dio)).toFixed(1);
      const markdown = (2.5 + Math.random() * 3.0).toFixed(1);
      kpis["Stockout Rate %"] = `${stockoutRate}%`;
      kpis["Inventory Turnover"] = `${turnover}x`;
      kpis["Markdown %"] = `${markdown}%`;
      kpis["Holding Cost"] = `$${Math.round(biz.inventoryUSD * 0.18).toLocaleString()}`;
      if (parseFloat(stockoutRate) > 5.0) revModifier *= 0.92;
      break;
    }
    case "perishables": {
      const spoilage = (3.0 + Math.random() * 4.0).toFixed(1);
      const shelfLife = Math.max(2, Math.round(14 - (biz.workingCapitalDays.dio * 0.4)));
      const healthScore = Math.min(100, Math.round(90 + (state.char?.smarts || 80) * 0.1));
      kpis["Spoilage Rate %"] = `${spoilage}%`;
      kpis["Shelf Life"] = `${shelfLife} Days`;
      kpis["Health Inspection"] = `${healthScore}/100`;
      costModifier *= (1.0 + (parseFloat(spoilage) / 100));
      if (healthScore < 85) riskDelta += 0.10;
      break;
    }
    case "service_capacity": {
      const utilRate = (68 + Math.random() * 22).toFixed(1);
      const realization = (88 + Math.random() * 8).toFixed(1);
      const partnerLev = (scale * 2.5).toFixed(1);
      kpis["Billable Utilization %"] = `${utilRate}%`;
      kpis["Realization Rate %"] = `${realization}%`;
      kpis["Partner Leverage"] = `${partnerLev}x`;
      revModifier *= (parseFloat(utilRate) / 75.0) * (parseFloat(realization) / 90.0);
      break;
    }
    case "subscription": {
      const churn = (1.2 + Math.random() * 2.0).toFixed(1);
      const nrr = (105 + Math.random() * 18).toFixed(1);
      const cacPayback = Math.max(6, Math.round(18 - (scale * 1.5)));
      kpis["MRR"] = `$${Math.round(biz.annualRevenueUSD / 12).toLocaleString()}`;
      kpis["Logo Churn %"] = `${churn}%/mo`;
      kpis["NRR %"] = `${nrr}%`;
      kpis["CAC Payback"] = `${cacPayback} Mos`;
      revModifier *= (parseFloat(nrr) / 100.0) * (1.0 - parseFloat(churn) / 50.0);
      break;
    }
    case "enterprise_sales": {
      const acv = Math.round(45000 * Math.pow(scale, 0.6));
      const salesCycle = Math.max(4, Math.round(12 - (scale * 0.8)));
      const winRate = (24 + Math.random() * 12).toFixed(1);
      kpis["ACV"] = `$${acv.toLocaleString()}`;
      kpis["Sales Cycle"] = `${salesCycle} Months`;
      kpis["Win Rate %"] = `${winRate}%`;
      revModifier *= (parseFloat(winRate) / 25.0);
      break;
    }
    case "marketplace": {
      const takeRate = (12.5 + Math.random() * 3.5).toFixed(1);
      const gmv = Math.round(biz.annualRevenueUSD / (parseFloat(takeRate) / 100));
      const fillRate = (88 + Math.random() * 8).toFixed(1);
      kpis["Annual GMV"] = `$${gmv.toLocaleString()}`;
      kpis["Take Rate %"] = `${takeRate}%`;
      kpis["Liquidity Fill Rate"] = `${fillRate}%`;
      revModifier *= (parseFloat(fillRate) / 90.0);
      break;
    }
    case "advertising_attention": {
      const dau = Math.round(25000 * Math.pow(scale, 1.4));
      const ecpm = (4.5 + Math.random() * 3.0).toFixed(2);
      kpis["DAU"] = dau.toLocaleString();
      kpis["eCPM"] = `$${ecpm}`;
      kpis["Ad Fill Rate %"] = `${(92 + Math.random() * 5).toFixed(1)}%`;
      revModifier *= (dau / 25000) * (parseFloat(ecpm) / 5.0);
      break;
    }
    case "content_hits": {
      const hitProb = (15 + (scale * 3)).toFixed(1);
      const hitRoll = Math.random() * 100;
      const isHit = hitRoll < parseFloat(hitProb);
      kpis["Hit Probability %"] = `${hitProb}%`;
      kpis["Cycle Status"] = isHit ? "🌟 BLOCKBUSTER HIT!" : "Steady Catalog";
      kpis["Catalog Backlog Value"] = `$${Math.round(biz.annualRevenueUSD * 1.8).toLocaleString()}`;
      if (isHit) revModifier *= (2.2 + Math.random() * 1.5);
      break;
    }
    case "manufacturing": {
      const plantUtil = (78 + Math.random() * 16).toFixed(1);
      const lineYield = (94.5 + Math.random() * 4.5).toFixed(1);
      const scrapRate = (100 - parseFloat(lineYield)).toFixed(1);
      kpis["Plant Utilization %"] = `${plantUtil}%`;
      kpis["Line Yield %"] = `${lineYield}%`;
      kpis["Scrap Rate %"] = `${scrapRate}%`;
      costModifier *= (1.0 + (parseFloat(scrapRate) / 80.0));
      break;
    }
    case "hardware": {
      const bomCostPct = (52 + Math.random() * 8).toFixed(1);
      const leadWeeks = Math.max(6, Math.round(18 - scale));
      kpis["BOM Cost %"] = `${bomCostPct}%`;
      kpis["Lead Time"] = `${leadWeeks} Weeks`;
      kpis["Warranty Reserves"] = `$${Math.round(biz.annualRevenueUSD * 0.04).toLocaleString()}`;
      costModifier *= (parseFloat(bomCostPct) / 50.0);
      break;
    }
    case "fleet_transportation": {
      const loadFactor = (72 + Math.random() * 20).toFixed(1);
      const fuelCost = Math.round(biz.annualRevenueUSD * 0.22);
      kpis["Fleet Load Factor %"] = `${loadFactor}%`;
      kpis["Fuel Expense"] = `$${fuelCost.toLocaleString()}`;
      kpis["Vehicle Availability"] = `${(91 + Math.random() * 6).toFixed(1)}%`;
      revModifier *= (parseFloat(loadFactor) / 80.0);
      break;
    }
    case "projects": {
      const completion = (75 + Math.random() * 25).toFixed(1);
      const overrun = (2.0 + Math.random() * 6.0).toFixed(1);
      kpis["% Completion"] = `${completion}%`;
      kpis["Cost Overrun %"] = `${overrun}%`;
      kpis["Retention Receivables"] = `$${Math.round(biz.accountsReceivableUSD * 0.15).toLocaleString()}`;
      costModifier *= (1.0 + parseFloat(overrun) / 100);
      break;
    }
    case "asset_ownership": {
      const ltv = (45 + Math.random() * 15).toFixed(1);
      const capRate = (6.2 + Math.random() * 1.8).toFixed(1);
      kpis["Asset LTV %"] = `${ltv}%`;
      kpis["Cap Rate %"] = `${capRate}%`;
      kpis["Depreciation Reserve"] = `$${Math.round(biz.fixedAssetsUSD * 0.08).toLocaleString()}`;
      break;
    }
    case "regulated_balance_sheet": {
      const tier1 = (14.2 + Math.random() * 3.0).toFixed(1);
      const nim = (3.4 + Math.random() * 0.8).toFixed(2);
      const npl = (1.8 + Math.random() * 1.5).toFixed(1);
      kpis["Tier-1 Capital %"] = `${tier1}%`;
      kpis["Net Interest Margin"] = `${nim}%`;
      kpis["NPL Ratio %"] = `${npl}%`;
      if (parseFloat(tier1) < 10.5) riskDelta += 0.25;
      break;
    }
    case "research_ip": {
      const phase = biz.rdPhase || "Phase II Trials";
      const patentYears = biz.patentYearsRemaining || 14;
      kpis["Pipeline Stage"] = phase;
      kpis["Patent Runway"] = `${patentYears} Years`;
      kpis["R&D Intensity %"] = `${((biz.rdExpenseUSD / Math.max(1, biz.annualRevenueUSD)) * 100).toFixed(1)}%`;
      break;
    }
    case "commodity_extraction": {
      const cashCost = Math.round(45 + Math.random() * 15);
      const spotPrice = Math.round(75 + Math.random() * 35);
      kpis["Cash Cost / Unit"] = `$${cashCost}`;
      kpis["Market Spot Price"] = `$${spotPrice}`;
      kpis["Ore Recovery %"] = `${(88 + Math.random() * 8).toFixed(1)}%`;
      revModifier *= (spotPrice / 75);
      break;
    }
    case "network_infrastructure": {
      const uptime = (99.92 + Math.random() * 0.07).toFixed(3);
      const dens = Math.round(1500 * Math.pow(scale, 1.2));
      kpis["Network Uptime %"] = `${uptime}%`;
      kpis["Subscribers / Node"] = dens.toLocaleString();
      kpis["Backhaul Load %"] = `${(62 + Math.random() * 20).toFixed(1)}%`;
      break;
    }
    default:
      break;
  }

  return { kpis, revModifier, costModifier, riskDelta };
}

/**
 * 2. UNIVERSAL CORPORATE FINANCE ENGINE (GAAP Accrual Accounting)
 * Double-Entry Balance Sheet: Assets == Liabilities + Equity
 * Profit != Cash (Working Capital & CCC Traps)
 */
export function calculateAnnualCorporateFinancials(biz, state) {
  const scale = biz.scaleUnits || 1;
  const template = BUSINESS_CATALOG.find(t => t.id === biz.catalogId) || {};

  // Aggregate engine modifiers
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

  // Macro market factor
  const macroFactor = 0.94 + Math.random() * 0.16;
  const grossRevenue = Math.round(template.baseRev * Math.pow(scale, 0.88) * totalRevMod * macroFactor);
  const returnsAndDiscounts = Math.round(grossRevenue * 0.02);
  const netRevenue = grossRevenue - returnsAndDiscounts;

  // COGS based on template gross margin and cost modifier
  const baseMargin = template.margin || 0.60;
  const effectiveMargin = Math.max(0.10, Math.min(0.95, baseMargin / totalCostMod));
  const cogs = Math.round(netRevenue * (1 - effectiveMargin));
  const grossProfit = netRevenue - cogs;

  // OPEX (R&D, S&M, G&A)
  const tier = template.capitalTier || biz.capitalTier || "C";
  let avgSalary = 55000;
  let baseOverhead = 25000;
  let minMarketing = 5000;
  if (tier === "A") {
    avgSalary = 4000;
    baseOverhead = 1500;
    minMarketing = 200;
  } else if (tier === "B") {
    avgSalary = 22000;
    baseOverhead = 8000;
    minMarketing = 1500;
  } else if (tier === "C") {
    avgSalary = 50000;
    baseOverhead = 25000;
    minMarketing = 5000;
  } else if (tier === "D") {
    avgSalary = 75000;
    baseOverhead = 60000;
    minMarketing = 15000;
  } else {
    avgSalary = 95000;
    baseOverhead = 150000;
    minMarketing = 50000;
  }

  const smExpense = Math.max(minMarketing, Math.round(netRevenue * 0.10) + (biz.marketingBudgetUSD || 0));
  const rdExpense = Math.round(netRevenue * (biz.boundEngines?.includes("research_ip") ? 0.22 : 0.04));
  const workerCount = biz.headcount || (tier === "A" ? 1 : (tier === "B" ? 2 : scale * 4));
  const gaSalaries = Math.round(scale * baseOverhead + workerCount * avgSalary);
  const totalOpex = smExpense + rdExpense + gaSalaries;

  // Operating Income (EBITDA)
  const ebitda = grossProfit - totalOpex;

  // D&A: 10% on PP&E, 15% on IP
  const depreciation = Math.round((biz.fixedAssetsUSD || 0) * 0.10 + (biz.ipAssetsUSD || 0) * 0.15);
  const ebit = ebitda - depreciation;

  // Debt interest expense
  const interestExpense = Math.round((biz.shortTermDebtUSD || 0) * 0.08 + (biz.longTermDebtUSD || 0) * 0.065);
  const ebt = ebit - interestExpense;

  // Corporate Tax (21% if profitable, 0 with loss carryforward)
  const taxRate = 0.21;
  const taxExpense = ebt > 0 ? Math.round(ebt * taxRate) : 0;
  const netIncome = ebt - taxExpense;

  // --- WORKING CAPITAL & CASH CONVERSION CYCLE (CCC) ---
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

  // --- CASH FLOW STATEMENT (Indirect Method) ---
  // CFO: Cash Flow from Operations
  const cfo = netIncome + depreciation - deltaAR - deltaInv + deltaAP;

  // CFI: Cash Flow from Investing (CapEx)
  const capexIntensity = template.workingCapital?.capexIntensity || 0.15;
  const capex = Math.round(netRevenue * capexIntensity * (scale > 1 ? 0.8 : 1.2));
  const cfi = -capex;

  // CFF: Cash Flow from Financing
  const debtRepayment = Math.round((biz.longTermDebtUSD || 0) * 0.10);
  const equityRaised = biz.pendingEquityInjectionUSD || 0;
  biz.pendingEquityInjectionUSD = 0;
  const dividendsPaid = biz.pendingDividendsUSD || 0;
  biz.pendingDividendsUSD = 0;
  const cff = equityRaised - debtRepayment - dividendsPaid;

  // Net Cash Change
  const netCashFlow = cfo + cfi + cff;

  // Update Treasury Cash
  const newTreasury = (biz.treasuryUSD || 0) + netCashFlow;

  // Update Assets & Liabilities (Double-Entry Balance Sheet)
  const newAR = targetAR;
  const newInv = targetInventory;
  const newFixedAssets = Math.max(0, (biz.fixedAssetsUSD || 0) + capex - depreciation);
  const newIPAssets = Math.round((biz.ipAssetsUSD || 0) * 0.95 + rdExpense * 0.4);

  const totalAssets = newTreasury + newAR + newInv + newFixedAssets + newIPAssets;

  const newAP = targetAP;
  const newShortTermDebt = biz.shortTermDebtUSD || 0;
  const newLongTermDebt = Math.max(0, (biz.longTermDebtUSD || 0) - debtRepayment);
  const totalLiabilities = newAP + newShortTermDebt + newLongTermDebt;

  // Stockholders' Equity = Assets - Liabilities (Identity Preserved)
  const stockholdersEquity = totalAssets - totalLiabilities;
  const retainedEarnings = (biz.retainedEarningsUSD || 0) + netIncome - dividendsPaid;
  const paidInCapital = stockholdersEquity - retainedEarnings;

  // Valuation: multiple of EBITDA or Revenue
  const valMultiple = template.multiple || 10;
  const valuation = Math.max(5000, Math.round(Math.max(ebitda, netRevenue * 0.20) * valMultiple));

  // --- 4 PROFITABLE BANKRUPTCY TRAPS CHECK ---
  const insolvencyRisks = [];
  let isBankrupt = false;

  if (newTreasury < 0) {
    if (netIncome > 0 && deltaAR + deltaInv > netIncome) {
      insolvencyRisks.push("⚠️ Working Capital Trap: Rapid revenue growth trapped all liquid cash in uncollected invoices & warehouse inventory!");
    }
    if (debtRepayment > ebitda && ebitda > 0) {
      insolvencyRisks.push("⚠️ CapEx Debt Maturity Trap: Heavy principal debt service outstripped operational operating earnings!");
    }
    if (newTreasury + (biz.revolverLimitUSD || 0) < 0) {
      isBankrupt = true;
      insolvencyRisks.push("🚨 Illiquidity Insolvency: Treasury exhausted and credit facilities maxed out!");
    }
  }

  return {
    pnl: {
      grossRevenue,
      returnsAndDiscounts,
      netRevenue,
      cogs,
      grossProfit,
      smExpense,
      rdExpense,
      gaSalaries,
      totalOpex,
      ebitda,
      depreciation,
      ebit,
      interestExpense,
      ebt,
      taxExpense,
      netIncome
    },
    balanceSheet: {
      cash: newTreasury,
      ar: newAR,
      inventory: newInv,
      fixedAssets: newFixedAssets,
      ipAssets: newIPAssets,
      totalAssets,
      ap: newAP,
      shortTermDebt: newShortTermDebt,
      longTermDebt: newLongTermDebt,
      totalLiabilities,
      paidInCapital,
      retainedEarnings,
      stockholdersEquity
    },
    cashFlow: {
      cfo,
      cfi,
      cff,
      capex,
      netCashFlow
    },
    workingCapital: {
      dso,
      dio,
      dpo,
      ccc,
      deltaAR,
      deltaInv,
      deltaAP
    },
    valuation,
    activeKpis,
    insolvencyRisks,
    isBankrupt
  };
}

/**
 * 3. FOUNDING A BUSINESS
 */
export function incorporateBusiness(state, templateId, fundingType = "bootstrap") {
  const template = BUSINESS_CATALOG.find(t => t.id === templateId);
  if (!template) return { success: false, message: "Business template not found." };

  if (state.char.age < 18) {
    return { success: false, message: "Commercial incorporation requires legal adulthood (Age 18+)." };
  }

  if (state.stats.smarts < template.minSmarts) {
    return { success: false, message: `Requires at least ${template.minSmarts} Smarts to establish ${template.name}.` };
  }

  const cost = template.startupCost;
  if (fundingType === "bootstrap") {
    if (state.fin.cash < cost) {
      return { success: false, message: `Insufficient personal wallet cash ($${cost.toLocaleString()} required).` };
    }
    state.fin.cash -= cost;
  }

  const initialFixedAssets = Math.round(cost * (template.workingCapital?.capexIntensity || 0.25));
  const initialTreasury = cost - initialFixedAssets;

  const newBiz = {
    instanceId: `biz_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    catalogId: template.id,
    name: template.name,
    sector: template.sector,
    icon: template.icon,
    capitalTier: template.capitalTier,
    scaleUnits: 1,
    yearsActive: 0,
    founderEquityPct: 100,
    founderClassBSharesPct: 100, // Dual-class super-voting rights (10x votes)
    headcount: 4,
    annualRevenueUSD: template.baseRev,
    ebitdaUSD: Math.round(template.baseRev * 0.25),
    netProfitUSD: Math.round(template.baseRev * 0.18),
    treasuryUSD: initialTreasury,
    accountsReceivableUSD: Math.round(template.baseRev * (template.workingCapital.dso / 365)),
    inventoryUSD: Math.round(template.baseRev * (1 - template.margin) * (template.workingCapital.dio / 365)),
    fixedAssetsUSD: initialFixedAssets,
    ipAssetsUSD: template.boundEngines.includes("research_ip") ? Math.round(cost * 0.3) : 0,
    accountsPayableUSD: Math.round(template.baseRev * (1 - template.margin) * (template.workingCapital.dpo / 365)),
    shortTermDebtUSD: 0,
    longTermDebtUSD: 0,
    retainedEarningsUSD: 0,
    paidInCapitalUSD: cost,
    valuationUSD: Math.round(template.baseRev * template.multiple * 0.3),
    marketingBudgetUSD: Math.round(template.baseRev * 0.05),
    workingCapitalDays: { ...template.workingCapital },
    boundEngines: [...template.boundEngines],
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
      scaleTier: "micro", // micro (1-10), small (10-50), mid (50-250), scale (250-1000), enterprise (1000+)
      allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 },
      techDebt: 5,
      qaDeficit: 5,
      regulatoryExposure: 5,
      morale: 90
    }
  };

  if (!state.biz) state.biz = [];
  state.biz.push(newBiz);

  return { success: true, message: `Successfully incorporated ${newBiz.name}!`, business: newBiz };
}

/**
 * 4. ANNUAL STEPPING FUNCTION FOR ACTIVE BUSINESSES
 */
export function stepBusinessAnnual(biz, state) {
  biz.yearsActive += 1;

  // Compute GAAP accrual statements & working capital
  const fin = calculateAnnualCorporateFinancials(biz, state);

  // Update business state
  biz.annualRevenueUSD = fin.pnl.netRevenue;
  biz.ebitdaUSD = fin.pnl.ebitda;
  biz.netProfitUSD = fin.pnl.netIncome;
  biz.treasuryUSD = fin.balanceSheet.cash;
  biz.accountsReceivableUSD = fin.balanceSheet.ar;
  biz.inventoryUSD = fin.balanceSheet.inventory;
  biz.fixedAssetsUSD = fin.balanceSheet.fixedAssets;
  biz.ipAssetsUSD = fin.balanceSheet.ipAssets;
  biz.accountsPayableUSD = fin.balanceSheet.ap;
  biz.shortTermDebtUSD = fin.balanceSheet.shortTermDebt;
  biz.longTermDebtUSD = fin.balanceSheet.longTermDebt;
  biz.paidInCapitalUSD = fin.balanceSheet.paidInCapital;
  biz.retainedEarningsUSD = fin.balanceSheet.retainedEarnings;
  biz.valuationUSD = fin.valuation;
  biz.kpis = fin.activeKpis;
  biz.lastFinancials = fin;

  // Check insolvency & Chapter 11
  if (fin.isBankrupt) {
    biz.inRestructuring = true;
  }

  // Update Org Scale Tier
  if (biz.headcount <= 10) biz.org.scaleTier = "micro";
  else if (biz.headcount <= 50) biz.org.scaleTier = "small";
  else if (biz.headcount <= 250) biz.org.scaleTier = "mid";
  else if (biz.headcount <= 1000) biz.org.scaleTier = "scale";
  else biz.org.scaleTier = "enterprise";

  return fin;
}
