// Organizational Scaling, Attention Units (AU), Talent Roster & Latent Crisis Queue

export const SCALE_TIERS = {
  micro: { id: "micro", name: "Micro (1–10 Staff)", agency: "Direct 1-on-1 oversight; personal hiring & bespoke comp.", maxHeadcount: 10 },
  small: { id: "small", name: "Small (10–50 Staff)", agency: "Departmental formation; appointing team leads.", maxHeadcount: 50 },
  mid: { id: "mid", name: "Mid (50–250 Staff)", agency: "Management systems, salary bands, and recruiter pipelines.", maxHeadcount: 250 },
  scale: { id: "scale", name: "Scale (250–1,000 Staff)", agency: "VP delegation, Attention Units (AU) allocation, and fog-of-war.", maxHeadcount: 1000 },
  enterprise: { id: "enterprise", name: "Enterprise (1,000–10,000+ Staff)", agency: "C-Suite governance, board committees, and business unit presidents.", maxHeadcount: 100000 }
};

/**
 * Annual organizational step: updates morale, advances latent risks, and processes Peter Principle
 */
export function stepOrgAnnual(state, biz) {
  if (!biz.org) {
    biz.org = {
      scaleTier: "micro",
      allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 },
      techDebt: 5,
      qaDeficit: 5,
      regulatoryExposure: 5,
      morale: 90
    };
  }

  const au = biz.org.allocatedAU || { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 };

  // 1. Latent Risk Dynamics based on Attention Unit Allocation
  // Product / R&D AU prevents Tech Debt
  if (au.product < 15) biz.org.techDebt = Math.min(100, (biz.org.techDebt || 5) + 12);
  else if (au.product >= 25) biz.org.techDebt = Math.max(0, (biz.org.techDebt || 5) - 6);

  // Hiring & Firefighting AU prevents QA Deficit
  if (au.fires < 10 || au.hiring < 15) biz.org.qaDeficit = Math.min(100, (biz.org.qaDeficit || 5) + 10);
  else if (au.hiring >= 25) biz.org.qaDeficit = Math.max(0, (biz.org.qaDeficit || 5) - 5);

  // Strategy & Investor Relations prevents Regulatory Exposure
  if (au.strategy < 15) biz.org.regulatoryExposure = Math.min(100, (biz.org.regulatoryExposure || 5) + 8);
  else if (au.strategy >= 25) biz.org.regulatoryExposure = Math.max(0, (biz.org.regulatoryExposure || 5) - 4);

  // 2. Team Morale
  let moraleDelta = 0;
  if ((biz.netProfitUSD || 0) > 0) moraleDelta += 4;
  else moraleDelta -= 6;
  if (au.hiring >= 20) moraleDelta += 3;
  biz.org.morale = Math.max(20, Math.min(100, (biz.org.morale || 85) + moraleDelta));

  // 3. Latent Crisis Detonation Checks
  const crisisEvents = [];

  // Tech Debt Detonation (> 75%)
  if (biz.org.techDebt > 75 && Math.random() < 0.35) {
    const outageCost = Math.round(biz.annualRevenueUSD * 0.08);
    biz.treasuryUSD -= outageCost;
    biz.org.techDebt = Math.max(30, biz.org.techDebt - 35);
    crisisEvents.push(`💥 Major Infrastructure Outage! High technical debt caused a 3-day platform collapse costing $${outageCost.toLocaleString()} in remediation.`);
  }

  // QA Deficit Detonation (> 75%)
  if (biz.org.qaDeficit > 75 && Math.random() < 0.30) {
    const recallCost = Math.round(biz.annualRevenueUSD * 0.12);
    biz.treasuryUSD -= recallCost;
    biz.org.qaDeficit = Math.max(30, biz.org.qaDeficit - 35);
    crisisEvents.push(`⚠️ National Product Recall! Quality assurance deficit triggered a safety recall costing $${recallCost.toLocaleString()}.`);
  }

  // Regulatory Exposure Detonation (> 75%)
  if (biz.org.regulatoryExposure > 75 && Math.random() < 0.25) {
    const fineCost = Math.round(biz.annualRevenueUSD * 0.10);
    biz.treasuryUSD -= fineCost;
    biz.org.regulatoryExposure = Math.max(30, biz.org.regulatoryExposure - 30);
    crisisEvents.push(`⚖️ Regulatory Compliance Sanction! Regulatory audit imposed an antitrust/compliance fine of $${fineCost.toLocaleString()}.`);
  }

  return { crisisEvents };
}

/**
 * Reallocate Founder's 100 Annual Attention Units (AU)
 */
export function reallocateAttentionUnits(biz, newAU) {
  const sum = (newAU.strategy || 0) + (newAU.hiring || 0) + (newAU.investorRel || 0) + (newAU.product || 0) + (newAU.fires || 0);
  if (sum !== 100) {
    return { success: false, message: `Total Attention Units must equal exactly 100 AU (currently ${sum} AU).` };
  }
  biz.org.allocatedAU = { ...newAU };
  return { success: true, message: "Successfully updated annual Attention Unit priorities!" };
}
