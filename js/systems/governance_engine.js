// Board of Directors, Corporate Governance & The Boardroom Coup State Machine

export const DIRECTOR_ARCHETYPES = {
  growth_vc: { id: "growth_vc", title: "Aggressive Growth Partner", agenda: "Triple-digit revenue blitzscaling; tolerant of heavy cash burn." },
  conservative: { id: "conservative", title: "Fiscal Conservative", agenda: "Demands EBITDA margins, strict debt servicing, and positive cash flow." },
  diplomat: { id: "diplomat", title: "Independent Industry Veteran", agenda: "Focuses on corporate governance, product moat, and board stability." },
  founder_loyalist: { id: "founder_loyalist", title: "Co-Founder / Early Angel", agenda: "Unconditionally loyal to the founder's visionary long-term roadmap." }
};

/**
 * Steps annual board relations, director loyalty meters, and checks for Boardroom Coup.
 */
export function stepBoardAnnual(state, biz) {
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
      // Evaluate director loyalty adjustments
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

  // Dual-class voting consideration: Class B shares carry 10 votes per share
  const founderVotePct = biz.founderClassBSharesPct > 50
    ? 100 // Founder has super-voting majority
    : Math.round((founderVotes / totalVotes) * 100);

  // Coup Trigger Conditions:
  // 1. Founder lost absolute voting majority (< 50%)
  // 2. Runway is critical (< 6 months) OR board loyalty collapsed (< 35%)
  if (founderVotePct < 50 && (runwayMonths < 6 || averageLoyalty < 35)) {
    biz.board.coupThreat = true;
    biz.board.coupReason = runwayMonths < 6
      ? `Board called an emergency session citing imminent insolvency (${runwayMonths} months cash runway remaining).`
      : `Board called an emergency vote citing loss of confidence in leadership (Average Director Loyalty: ${averageLoyalty}%).`;
  } else {
    biz.board.coupThreat = false;
    biz.board.coupReason = null;
  }
}

/**
 * 4 Tactical Coup Defense Levers
 */
export function executeCoupDefense(state, biz, leverId, options = {}) {
  if (!biz.board || !biz.board.coupThreat) {
    return { success: false, message: "No active boardroom coup threat." };
  }

  switch (leverId) {
    case "lobby_swing_vote": {
      // Lobby Independent Swing Vote: Costs 25 Energy + 15 Prestige
      if (state.stats.energy < 25) return { success: false, message: "Insufficient energy to lobby directors." };
      state.stats.energy -= 25;

      const charm = (state.stats.looks + state.stats.smarts) / 2;
      const successProb = Math.min(85, Math.round(charm * 0.8 + (state.stats.prestige || 10) * 0.2));
      const roll = Math.random() * 100;

      if (roll <= successProb) {
        // Swing vote secured!
        biz.board.coupThreat = false;
        biz.board.coupReason = null;
        biz.board.seats.forEach(s => { if (s.type !== "founder") s.loyalty = Math.min(100, s.loyalty + 25); });
        return {
          success: true,
          message: `🎯 Masterful boardroom lobbying! You persuaded the Independent Director to back your strategic vision and defeated the coup.`
        };
      } else {
        return {
          success: false,
          message: `❌ Lobbying failed. The independent director voted with the institutional syndicate against your motion.`
        };
      }
    }

    case "dual_class_defense": {
      // Dual-Class Super-Voting Defense (10:1 voting ratio)
      if (biz.founderClassBSharesPct > 50) {
        biz.board.coupThreat = false;
        biz.board.coupReason = null;
        return {
          success: true,
          message: `⚖️ Invoked Class-B Common Stock Super-Voting Rights! With 10x statutory voting power, you vetoed the ouster motion outright.`
        };
      } else {
        return {
          success: false,
          message: `❌ Class-B super-voting rights were diluted or waived in prior preferred rounds.`
        };
      }
    }

    case "personal_cash_injection": {
      // Inject personal savings from wallet into treasury to restore 12+ months runway
      const fin = biz.lastFinancials || {};
      const annualBurn = Math.abs(fin.cashFlow?.cfo || biz.annualRevenueUSD * 0.25);
      const injectionRequired = Math.round(annualBurn * 1.1);

      if (state.fin.cash < injectionRequired) {
        return {
          success: false,
          message: `Insufficient personal wallet cash. Requires $${injectionRequired.toLocaleString()} to guarantee 12 months runway.`
        };
      }

      state.fin.cash -= injectionRequired;
      biz.treasuryUSD += injectionRequired;
      biz.paidInCapitalUSD = (biz.paidInCapitalUSD || 0) + injectionRequired;
      biz.board.coupThreat = false;
      biz.board.coupReason = null;

      biz.board.seats.forEach(s => { if (s.type !== "founder") s.loyalty = Math.min(100, s.loyalty + 30); });

      return {
        success: true,
        message: `💵 Injected $${injectionRequired.toLocaleString()} personal cash! Cash runway restored to 14 months, immediately invalidating the coup.`
      };
    }

    case "step_down_to_chairman": {
      // Step down to Chairman of the Board & Chief Product Officer (CPO)
      // Retain 100% common stock equity, appoint professional executive CEO
      biz.board.coupThreat = false;
      biz.board.coupReason = null;
      biz.founderRole = "Chairman of the Board & CPO";
      biz.hasExternalCEO = true;
      biz.board.seats.push({
        id: `hired_ceo_${Date.now()}`,
        title: "Appointed Executive CEO",
        votes: 1,
        type: "executive",
        loyalty: 90,
        agenda: "profitability"
      });

      return {
        success: true,
        message: `👑 Stepped down to Chairman & CPO. You retained full equity ownership and board chairmanship while delegating daily operations to an external CEO.`
      };
    }

    default:
      return { success: false, message: "Unknown defense lever." };
  }
}
