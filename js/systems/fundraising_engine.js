// Fundraising Engine: 11 Capital Tiers, Founder Pitch Pedigree & Term Sheet Negotiations

export const FUNDING_SOURCES = [
  { id: "bootstrap", name: "Bootstrapping", tier: "A", minCheck: 1000, maxCheck: 100000, type: "equity", desc: "100% self-funded from your personal cash wallet. Retain 100% equity ownership and complete board control." },
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

/**
 * Calculates Founder Pitch Pedigree Score (0 - 100+) based on player attributes, education & career.
 */
export function calculateFounderPitchScore(state, biz) {
  let score = 0;

  // Base traits & stats
  const smarts = state.stats?.smarts || 50;
  const prestige = state.stats?.prestige || 10;
  score += smarts * 0.25;
  score += prestige * 0.20;

  // College Degree Bonuses
  const college = state.education?.college;
  if (college) {
    if (["iit_bombay", "iit_delhi"].includes(college.id)) score += 30; // IIT Pedigree
    else if (["harvard", "stanford", "mit"].includes(college.id)) score += 35; // Ivy / Stanford
    else if (["oxford", "cambridge"].includes(college.id)) score += 25; // Oxbridge
    else score += 15;
  }

  // Career Pedigree Bonus
  const job = state.career?.job;
  if (job) {
    if (job.title?.includes("VP") || job.title?.includes("CTO") || job.title?.includes("Partner")) score += 25;
    else if (job.title?.includes("Senior") || job.title?.includes("Staff")) score += 15;
  }

  // Prior Exit Bonus
  if (state.pastExits && state.pastExits.length > 0) {
    score += 40; // Proven serial founder
  }

  // Business Traction Bonus
  if (biz) {
    if (biz.annualRevenueUSD > 10000000) score += 25;
    else if (biz.annualRevenueUSD > 2000000) score += 15;
    else if (biz.annualRevenueUSD > 500000) score += 10;
  }

  return Math.round(score);
}

/**
 * Procedural Term Sheet Generator: Creates 2 competing investment term sheets for negotiation.
 */
export function generateTermSheets(state, biz, sourceId) {
  const source = FUNDING_SOURCES.find(s => s.id === sourceId) || FUNDING_SOURCES[4];
  const pitchScore = calculateFounderPitchScore(state, biz);
  const currentVal = biz.valuationUSD || 1000000;

  if (source.id === "top_accelerator") {
    // Standard YC / Sequoia Arc terms
    return [{
      investorName: "Y Combinator (W26)",
      investorType: "Accelerator",
      investmentCheckUSD: 500000,
      preMoneyValuationUSD: 6642857, // Implies $500k for 7% post-money
      postMoneyEquityPct: 7.0,
      optionPoolPct: 10.0,
      liquidationPreference: "1x Non-Participating",
      boardSeatsRequested: 0,
      protectiveProvisions: "Standard SAFE Agreement"
    }];
  }

  // Term Sheet A: Lead Venture Partner (Founder-friendly, standard terms)
  const valMultA = 0.9 + (pitchScore / 100) * 0.4;
  const preMoneyA = Math.round(currentVal * valMultA);
  const checkA = Math.min(source.maxCheck, Math.max(source.minCheck, Math.round(preMoneyA * 0.22)));
  const postMoneyA = preMoneyA + checkA;
  const equityPctA = parseFloat(((checkA / postMoneyA) * 100).toFixed(1));

  // Term Sheet B: Aggressive Growth Capital (Higher check, aggressive terms: 2x participating)
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

/**
 * Counter-Offer Negotiation
 */
export function negotiateTermSheet(state, biz, originalSheet, requestedValuationBoostPct) {
  const pitchScore = calculateFounderPitchScore(state, biz);
  const boost = parseFloat(requestedValuationBoostPct); // e.g. 20% boost

  // Difficulty threshold: Boosts above 35% require elite pitch score (>= 85)
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
        optionPoolPct: Math.max(10, originalSheet.optionPoolPct - 2.5) // pushed back on pool
      },
      message: `🎉 The investment committee accepted your counter-offer! Valuation boosted to $${revisedPreMoney.toLocaleString()}!`
    };
  } else {
    return {
      accepted: false,
      revisedSheet: originalSheet,
      message: `❌ Investors rejected the valuation increase. They cited market comparables and stand firm on their original term sheet.`
    };
  }
}

/**
 * Execute Financing Deal: Closes round, deposits cash to corporate treasury, updates dilution & seats
 */
export function executeFinancingRound(state, biz, acceptedSheet) {
  const check = acceptedSheet.investmentCheckUSD;
  const dilutionPct = acceptedSheet.postMoneyEquityPct;

  // Deposit to business treasury
  biz.treasuryUSD += check;
  biz.paidInCapitalUSD = (biz.paidInCapitalUSD || 0) + check;
  biz.valuationUSD = acceptedSheet.preMoneyValuationUSD + check;

  // Dilute founder
  const prevEquity = biz.founderEquityPct || 100;
  biz.founderEquityPct = parseFloat((prevEquity * (1 - (dilutionPct / 100))).toFixed(1));

  // Add Board Seat if requested
  if (acceptedSheet.boardSeatsRequested > 0) {
    if (!biz.board) biz.board = { seats: [] };
    biz.board.seats.push({
      id: `investor_${Date.now()}`,
      title: `${acceptedSheet.investorName} Partner`,
      votes: 1,
      type: "investor",
      loyalty: 85,
      agenda: acceptedSheet.liquidationPreference.includes("Participating") ? "conservative" : "growth"
    });
  }

  return {
    success: true,
    message: `🚀 Closed $${check.toLocaleString()} financing round! Founder retained ${biz.founderEquityPct}% equity.`
  };
}
