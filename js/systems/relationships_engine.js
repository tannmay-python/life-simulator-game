// Relationships & Family engine: Dating, Marriage, Prenuptials, Children, and Parental Inheritance

import { calculateNetWorth } from "../state.js";

const PARTNER_OCCUPATIONS = [
  { title: "Senior AI Researcher", wealthUSD: 350000 },
  { title: "BigLaw Litigation Partner", wealthUSD: 1200000 },
  { title: "Venture Capital Principal", wealthUSD: 850000 },
  { title: "Pediatric Cardiothoracic Surgeon", wealthUSD: 950000 },
  { title: "Fashion Creative Director", wealthUSD: 400000 },
  { title: "Fintech Co-Founder", wealthUSD: 2500000 },
  { title: "Diplomatic Attache", wealthUSD: 200000 },
  { title: "Contemporary Artist & Sculptor", wealthUSD: 300000 }
];

const NAMES_MALE = ["Liam", "Alexander", "Rohan", "Kabir", "Sebastian", "Oliver", "Lucas", "Noah"];
const NAMES_FEMALE = ["Maya", "Sophia", "Aanya", "Zara", "Chloe", "Emma", "Isabella", "Aria"];

export function generateDatingProfiles(state) {
  const isLookingForMale = state.character.gender === "female";
  const namePool = isLookingForMale ? NAMES_MALE : NAMES_FEMALE;

  const profiles = [];
  for (let i = 0; i < 3; i++) {
    const name = namePool[Math.floor(Math.random() * namePool.length)] + " " + (["Vance", "Mehta", "Sterling", "Kowalski", "Chen", "Sinclair"][Math.floor(Math.random() * 6)]);
    const occ = PARTNER_OCCUPATIONS[Math.floor(Math.random() * PARTNER_OCCUPATIONS.length)];
    const ageDelta = Math.floor(Math.random() * 5) - 2;
    const partnerAge = Math.max(18, state.character.age + ageDelta);

    profiles.push({
      id: "partner_" + Date.now() + "_" + i,
      name,
      gender: isLookingForMale ? "male" : "female",
      age: partnerAge,
      occupation: occ.title,
      netWorthUSD: Math.round(occ.wealthUSD * (0.8 + Math.random() * 0.5)),
      relationship: 75,
      isMarried: false,
      hasPrenup: false
    });
  }
  return profiles;
}

export function startDating(state, profile) {
  state.family.partner = profile;
  state.stats.happiness = Math.min(100, state.stats.happiness + 12);
  return { success: true, message: `You are now in a relationship with ${profile.name}, ${profile.occupation}!` };
}

export function spendTimeWithPartner(state) {
  if (!state.family.partner) return { success: false, message: "You are currently single." };
  state.family.partner.relationship = Math.min(100, state.family.partner.relationship + 10);
  state.stats.happiness = Math.min(100, state.stats.happiness + 5);
  return { success: true, message: `Spent a wonderful weekend with ${state.family.partner.name}. Relationship score: ${state.family.partner.relationship}%.` };
}

export function proposeMarriage(state, withPrenup = true, weddingCostUSD = 25000) {
  if (!state.family.partner) return { success: false, message: "You are not dating anyone." };
  const p = state.family.partner;
  if (p.isMarried) return { success: false, message: "You are already married!" };

  if (state.finances.cashUSD < weddingCostUSD) {
    return { success: false, message: `Insufficient cash for the wedding ceremony ($${weddingCostUSD.toLocaleString()} required).` };
  }

  // Acceptance logic
  if (withPrenup && p.relationship < 70) {
    p.relationship -= 20;
    return {
      success: false,
      message: `${p.name} felt offended by the prenuptial agreement demand! Relationship strained.`
    };
  }

  state.finances.cashUSD -= weddingCostUSD;
  p.isMarried = true;
  p.hasPrenup = withPrenup;
  state.stats.happiness = Math.min(100, state.stats.happiness + 20);

  // Combine spouse initial wealth
  const spouseGift = Math.round(p.netWorthUSD * 0.25);
  state.finances.cashUSD += spouseGift;
  calculateNetWorth(state);

  return {
    success: true,
    message: `💍 CONGRATULATIONS! You married ${p.name}! ${withPrenup ? '(Ironclad Prenuptial Agreement Signed)' : '(Community Property - No Prenup)'}. Added $${spouseGift.toLocaleString()} from your spouse.`
  };
}

export function divorceSpouse(state) {
  if (!state.family.partner || !state.family.partner.isMarried) {
    return { success: false, message: "You are not married." };
  }

  const p = state.family.partner;
  let settlement = 0;

  if (!p.hasPrenup) {
    // 50% split of personal cash and liquid assets!
    settlement = Math.round(state.finances.cashUSD * 0.40);
    state.finances.cashUSD -= settlement;
  }

  state.family.partner = null;
  state.stats.happiness = Math.max(10, state.stats.happiness - 25);
  calculateNetWorth(state);

  return {
    success: true,
    message: `Divorce finalized with ${p.name}. ${p.hasPrenup ? 'Your prenuptial agreement shielded your fortune.' : `Without a prenup, you paid a $${settlement.toLocaleString()} divorce settlement.`}`
  };
}

export function haveChild(state, childName = null) {
  if (state.character.age < 18) return { success: false, message: "Too young to have children." };
  if (!state.family.partner) return { success: false, message: "You need a partner to start a family." };

  const isBoy = Math.random() > 0.5;
  const autoName = isBoy ? NAMES_MALE[Math.floor(Math.random() * NAMES_MALE.length)] : NAMES_FEMALE[Math.floor(Math.random() * NAMES_FEMALE.length)];
  const name = childName || autoName;

  const child = {
    id: "child_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    name: name + " " + state.character.lastName,
    gender: isBoy ? "male" : "female",
    age: 0,
    relationship: 100,
    educationTier: "Standard",
    heirAllocPct: 100 // Default full heir
  };

  state.family.children.push(child);
  state.stats.happiness = Math.min(100, state.stats.happiness + 20);

  return {
    success: true,
    message: `👶 A new heir is born! Welcome your ${child.gender === 'male' ? 'son' : 'daughter'}, ${child.name}, to the family dynasty!`
  };
}

export function enrollChildEducation(state, childId, tier = "elite_prep") {
  const child = state.family.children.find(c => c.id === childId);
  if (!child) return { success: false, message: "Child not found." };

  const cost = tier === "elite_prep" ? 35000 : 8000;
  if (state.finances.cashUSD < cost) return { success: false, message: `Requires $${cost.toLocaleString()} in tuition.` };

  state.finances.cashUSD -= cost;
  child.educationTier = tier === "elite_prep" ? "Elite Swiss/Exeter Academy" : "Private Day School";
  child.relationship = Math.min(100, child.relationship + 10);

  return { success: true, message: `Enrolled ${child.name} in ${child.educationTier}!` };
}

// Annual Relationships Step
export function stepFamilyAndRelationships(state) {
  const logs = [];

  // Partner
  if (state.family.partner) {
    state.family.partner.age += 1;
    // Natural slight variance in affection
    if (Math.random() > 0.7) state.family.partner.relationship = Math.max(30, state.family.partner.relationship - 2);
  }

  // Children
  state.family.children.forEach(child => {
    child.age += 1;
  });

  // Parents aging & inheritance
  state.family.parents.forEach(parent => {
    if (parent.alive) {
      parent.age += 1;
      if (parent.age > 82 && Math.random() < 0.20) {
        parent.alive = false;
        const inheritance = Math.round(parent.netWorthUSD * (0.8 + Math.random() * 0.4));
        state.finances.cashUSD += inheritance;
        state.stats.happiness = Math.max(10, state.stats.happiness - 30);
        logs.push(`Tragic passing: Your ${parent.relation} passed away peacefully at age ${parent.age}. You received a family inheritance of $${inheritance.toLocaleString()}.`);
        calculateNetWorth(state);
      }
    }
  });

  return logs;
}
