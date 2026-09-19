// Advanced wealth & lifestyle systems: Angel Investing, Philanthropy, Board Seats, Patents, Auctions, Biohacking, and Tax Havens

import { calculateNetWorth } from "../state.js";

export const STARTUP_PITCHES = [
  { id: "pitch_neural", name: "Synthetix Bio-Neural", sector: "AI & Biotech", checkUSD: 100000, equityPct: 7, targetExitMultiplier: 35, risk: "High" },
  { id: "pitch_fusion", name: "Helios Clean Fusion", sector: "Clean Energy", checkUSD: 250000, equityPct: 5, targetExitMultiplier: 80, risk: "Extreme" },
  { id: "pitch_fintech", name: "Sovereign Pay Rails", sector: "Fintech", checkUSD: 50000, equityPct: 8, targetExitMultiplier: 15, risk: "Medium" },
  { id: "pitch_robotics", name: "Atlas Delivery Drones", sector: "Robotics", checkUSD: 150000, equityPct: 6, targetExitMultiplier: 25, risk: "High" }
];

export function investInStartup(state, pitchId) {
  const pitch = STARTUP_PITCHES.find(p => p.id === pitchId);
  if (!pitch) return { success: false, message: "Deal not found." };
  if (state.finances.cashUSD < pitch.checkUSD) return { success: false, message: `Insufficient cash ($${pitch.checkUSD.toLocaleString()} required).` };

  state.finances.cashUSD -= pitch.checkUSD;
  state.lifestyle.angelInvestments.push({
    startupName: pitch.name,
    sector: pitch.sector,
    investedUSD: pitch.checkUSD,
    equityPct: pitch.equityPct,
    valuationUSD: Math.round(pitch.checkUSD / (pitch.equityPct / 100)),
    targetExitMultiplier: pitch.targetExitMultiplier,
    yearsElapsed: 0,
    status: "Active"
  });

  state.stats.prestige = Math.min(100, state.stats.prestige + 4);
  calculateNetWorth(state);

  return {
    success: true,
    message: `Wrote a $${pitch.checkUSD.toLocaleString()} seed check into ${pitch.name} for ${pitch.equityPct}% equity!`
  };
}

export function establishPhilanthropicFoundation(state, endowmentUSD) {
  endowmentUSD = parseInt(endowmentUSD);
  if (isNaN(endowmentUSD) || endowmentUSD < 250000) {
    return { success: false, message: "Minimum foundation endowment is $250,000." };
  }
  if (state.finances.cashUSD < endowmentUSD) {
    return { success: false, message: "Insufficient liquid cash for endowment." };
  }

  state.finances.cashUSD -= endowmentUSD;
  state.lifestyle.foundation = {
    name: `${state.character.lastName} Global Foundation`,
    endowmentUSD,
    annualGrantsUSD: Math.round(endowmentUSD * 0.05),
    prestige: 50
  };

  state.stats.prestige = Math.min(100, state.stats.prestige + 25);
  calculateNetWorth(state);

  return {
    success: true,
    message: `🏛️ Established the ${state.lifestyle.foundation.name} with a $${endowmentUSD.toLocaleString()} endowment! Your societal prestige surged!`
  };
}

export function obtainBoardSeat(state, companyTicker) {
  // Check if already on board
  if (state.lifestyle.boardSeats.some(b => b.companyTicker === companyTicker)) {
    return { success: false, message: "You already occupy a board seat at this company." };
  }

  // Board seat requirements: Prestige >= 65 and owns at least $2,000,000 of shares
  const holding = state.finances.stockPortfolio[companyTicker];
  const price = state.finances.stockPrices[companyTicker] || 100;
  const holdingValue = holding ? holding.shares * price : 0;

  if (state.stats.prestige < 65 || holdingValue < 2000000) {
    return {
      success: false,
      message: `To secure a Board of Directors seat, you require at least 65 Prestige and $2,000,000+ in company stock holdings (Current value: $${Math.round(holdingValue).toLocaleString()}).`
    };
  }

  state.lifestyle.boardSeats.push({
    companyTicker,
    companyName: companyTicker,
    annualStipendUSD: 350000,
    equitySharesGranted: 500
  });

  state.stats.prestige = Math.min(100, state.stats.prestige + 10);
  return {
    success: true,
    message: `Elected to the Board of Directors of ${companyTicker}! Annual retainer: $350,000 + executive stock grants.`
  };
}

export function filePatent(state, title, sector, filingCostUSD = 75000) {
  if (state.stats.smarts < 80) return { success: false, message: "Filing breakthrough patents requires at least 80 Smarts." };
  if (state.finances.cashUSD < filingCostUSD) return { success: false, message: "Insufficient funds for patent attorneys and R&D filing." };

  state.finances.cashUSD -= filingCostUSD;
  const annualRoyalty = Math.round(filingCostUSD * (0.35 + Math.random() * 0.40));

  state.lifestyle.patents.push({
    title,
    sector,
    annualRoyaltyUSD: annualRoyalty,
    remainingYears: 20
  });

  return {
    success: true,
    message: `Patent granted for '${title}'! Licensed to industry partners for $${annualRoyalty.toLocaleString()}/year in royalties for 20 years!`
  };
}

export function upgradeBiohackingLongevity(state, tier) {
  const tiers = [
    { level: 1, name: "Cryotherapy & Full-Body Diagnostics", costUSD: 35000, maxAgeBoost: 3 },
    { level: 2, name: "Personalized Concierge Genetics & Peptides", costUSD: 120000, maxAgeBoost: 5 },
    { level: 3, name: "Autologous Cellular Stem Cell Therapy", costUSD: 350000, maxAgeBoost: 8 },
    { level: 4, name: "Telomere Extension & Epigenetic Reprogramming", costUSD: 1000000, maxAgeBoost: 12 }
  ];

  const target = tiers.find(t => t.level === tier);
  if (!target) return { success: false, message: "Invalid biohacking treatment." };
  if (state.finances.cashUSD < target.costUSD) return { success: false, message: `Treatment costs $${target.costUSD.toLocaleString()}. Insufficient liquid cash.` };

  state.finances.cashUSD -= target.costUSD;
  state.lifestyle.biohackingLevel = target.level;
  state.character.maxAge += target.maxAgeBoost;
  state.stats.health = 100;

  return {
    success: true,
    message: `Underwent ${target.name}! Health restored to 100% and life expectancy extended by +${target.maxAgeBoost} years (Target age: ${state.character.maxAge})!`
  };
}

export function relocateToTaxHaven(state, havenId) {
  const havens = {
    monaco: { name: "Monaco (Monte Carlo)", costUSD: 500000, desc: "0% personal income & capital gains tax." },
    dubai: { name: "Dubai, UAE", costUSD: 150000, desc: "0% personal tax & global financial crossroads." },
    singapore: { name: "Singapore", costUSD: 250000, desc: "0% capital gains tax & world-class security." }
  };

  const haven = havens[havenId];
  if (!haven) return { success: false, message: "Invalid tax haven." };
  if (state.finances.cashUSD < haven.costUSD) return { success: false, message: `Golden visa residency costs $${haven.costUSD.toLocaleString()}.` };

  state.finances.cashUSD -= haven.costUSD;
  state.character.taxHaven = havenId;
  state.character.currentCountry = havenId === "dubai" ? "uae" : (havenId === "singapore" ? "singapore" : state.character.currentCountry);
  state.stats.prestige = Math.min(100, state.stats.prestige + 10);

  return {
    success: true,
    message: `Established official tax residency in ${haven.name}! Enjoy 0% personal tax and high-society privileges!`
  };
}

// Step Lifestyle on Age Up
export function stepLifestyle(state) {
  const logs = [];

  // Angel portfolio exits & progression
  state.lifestyle.angelInvestments.forEach(inv => {
    if (inv.status === "Active") {
      inv.yearsElapsed += 1;
      // After 4-7 years, startup either exits or fails
      if (inv.yearsElapsed >= 4 && Math.random() < 0.25) {
        if (Math.random() < 0.35) {
          // Unicorn exit!
          const exitPayout = Math.round(inv.investedUSD * inv.targetExitMultiplier * (0.8 + Math.random() * 0.4));
          inv.status = "Exited (Unicorn)";
          state.finances.cashUSD += exitPayout;
          logs.push(`🦄 UNICORN EXIT! Your angel startup ${inv.startupName} went public/acquired! Received a $${exitPayout.toLocaleString()} cash distribution!`);
        } else {
          inv.status = "Written Off";
          logs.push(`Angel startup ${inv.startupName} ran out of runway and shut down.`);
        }
      }
    }
  });

  // Board Seat retainers
  let boardIncome = 0;
  state.lifestyle.boardSeats.forEach(seat => {
    boardIncome += seat.annualStipendUSD;
  });
  if (boardIncome > 0) {
    state.finances.cashUSD += boardIncome;
    logs.push(`Earned $${boardIncome.toLocaleString()} from corporate Board of Directors retainers.`);
  }

  // Patents royalties
  let patentRoyalties = 0;
  state.lifestyle.patents.forEach(pat => {
    if (pat.remainingYears > 0) {
      patentRoyalties += pat.annualRoyaltyUSD;
      pat.remainingYears -= 1;
    }
  });
  if (patentRoyalties > 0) {
    state.finances.cashUSD += patentRoyalties;
    logs.push(`Received $${patentRoyalties.toLocaleString()} in intellectual property patent royalties.`);
  }

  // Foundation prestige & grants
  if (state.lifestyle.foundation) {
    state.stats.prestige = Math.min(100, state.stats.prestige + 2);
  }

  // Black Card check
  const netWorth = calculateNetWorth(state);
  if (netWorth >= 10000000 && !state.lifestyle.blackCardUnlocked) {
    state.lifestyle.blackCardUnlocked = true;
    logs.push("💳 INVITATION ONLY: You received the Centurion Black Card with 24/7 global VIP concierge.");
  }

  return logs;
}
