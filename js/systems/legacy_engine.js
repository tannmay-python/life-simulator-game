// Generational succession and inheritance engine: Last Will, Estate Taxes, Dynasty Trusts, and Succession to Heir

import { calculateNetWorth } from "../state.js";

export function updateWill(state, willConfig) {
  const { spousePct, childrenPct, charityPct } = willConfig;
  const total = spousePct + childrenPct + charityPct;
  if (total !== 100) {
    return { success: false, message: "Will allocations must sum to exactly 100%." };
  }

  state.family.will.spousePct = spousePct;
  state.family.will.childrenPct = childrenPct;
  state.family.will.charityPct = charityPct;

  return {
    success: true,
    message: `Last Will & Testament updated: Spouse (${spousePct}%), Children (${childrenPct}%), Charity (${charityPct}%).`
  };
}

export function establishDynastyTrust(state) {
  if (state.family.will.dynastyTrustEstablished) {
    return { success: false, message: "Dynasty Trust already established." };
  }

  const legalSetupCostUSD = 150000;
  if (state.finances.cashUSD < legalSetupCostUSD) {
    return { success: false, message: `Setting up a multi-generational offshore Dynasty Trust requires $${legalSetupCostUSD.toLocaleString()} in legal retainers.` };
  }

  state.finances.cashUSD -= legalSetupCostUSD;
  state.family.will.dynastyTrustEstablished = true;
  state.stats.prestige = Math.min(100, state.stats.prestige + 10);
  calculateNetWorth(state);

  return {
    success: true,
    message: "🏛️ DYNASTY TRUST ESTABLISHED! Your family assets, businesses, and real estate are now legally shielded against future estate and inheritance taxes!"
  };
}

export function designateHeir(state, childId, allocationPct = 100) {
  state.family.children.forEach(c => {
    if (c.id === childId) {
      c.heirAllocPct = allocationPct;
    } else {
      c.heirAllocPct = 0;
    }
  });
  return { success: true, message: "Primary designated heir set." };
}

export function executeSuccessionToChild(state, chosenChildId) {
  const child = state.family.children.find(c => c.id === chosenChildId);
  if (!child) return { success: false, message: "Designated child heir not found." };

  const currentNetWorth = calculateNetWorth(state);

  // Archive current generation to family lineage
  state.family.familyLineage.push({
    generation: state.character.generation,
    name: `${state.character.firstName} ${state.character.lastName}`,
    ageAtSuccession: state.character.age,
    peakNetWorthUSD: currentNetWorth,
    notableCareer: state.career.currentJob ? state.career.currentJob.title : (state.businesses.length > 0 ? "Billionaire Industrialist" : "Independent Investor"),
    businessesFounded: state.businesses.length
  });

  // Calculate Estate Tax (0% if dynasty trust, else 30%)
  const estateTaxRate = state.family.will.dynastyTrustEstablished ? 0 : 0.28;
  const taxPaid = Math.round(state.finances.cashUSD * estateTaxRate);
  state.finances.cashUSD = Math.max(10000, state.finances.cashUSD - taxPaid);

  // New character identity: The child
  const childFullName = child.name.split(" ");
  const childFirstName = childFullName[0];
  const childLastName = childFullName[1] || state.character.lastName;

  state.character.firstName = childFirstName;
  state.character.lastName = childLastName;
  state.character.gender = child.gender;
  state.character.age = Math.max(18, child.age);
  state.character.generation += 1;
  state.character.alive = true;
  state.character.causeOfDeath = null;
  state.character.maxAge = Math.floor(82 + Math.random() * 14);

  // Refresh physical stats for the youthful heir
  state.stats.health = 95;
  state.stats.happiness = 90;
  state.stats.smarts = Math.min(100, Math.floor(75 + Math.random() * 20));
  state.stats.looks = Math.min(100, Math.floor(70 + Math.random() * 25));
  state.stats.energy = 100;

  // Reset heir's personal family (heir starts new dating life)
  state.family.partner = null;
  state.family.children = [];

  // Re-calculate net worth with inherited assets intact
  const newNetWorth = calculateNetWorth(state);

  // Add ledger milestone
  state.ledger.unshift({
    year: state.ledger.length,
    age: state.character.age,
    headline: `Generation ${state.character.generation}: Legacy of ${child.name}`,
    logs: [
      `Assumed leadership of the family dynasty as ${child.name}.`,
      `Inherited family estate valued at $${newNetWorth.toLocaleString()}${estateTaxRate > 0 ? ` after $${taxPaid.toLocaleString()} in estate taxes` : ' (Tax-exempt via Dynasty Trust)'}.`
    ],
    netWorthUSD: newNetWorth,
    cashChangeUSD: 0
  });

  return {
    success: true,
    message: `👑 THE TORCH HAS BEEN PASSED! You are now playing as ${child.name} (Age: ${state.character.age}) with a generational empire of $${newNetWorth.toLocaleString()}!`
  };
}
