// Master Annual Progression Engine: Aging up by 1 year, ledger logging, salary deposits, taxes, and system synchronization

import { COUNTRIES } from "../data/countries.js";
import { stepFinancialMarkets } from "./finance_engine.js";
import { stepBusinesses } from "./business_engine.js";
import { stepPropertiesAndAssets } from "./property_engine.js";
import { stepFamilyAndRelationships } from "./relationships_engine.js";
import { stepLifestyle } from "./lifestyle_engine.js";
import { calculateNetWorth } from "../state.js";

export function ageUpOneYear(state) {
  if (!state.character.alive) {
    return { success: false, message: "Character is no longer alive." };
  }

  const startCash = state.finances.cashUSD;
  const currentAge = state.character.age;
  state.character.age += 1;
  const newAge = state.character.age;
  state.stats.energy = 100; // Reset annual energy

  const yearLogs = [];
  let headline = `Age ${newAge} Milestone`;

  // 1. Physical health & aging
  let healthChange = 0;
  if (newAge > 40 && newAge <= 65) healthChange -= 1;
  if (newAge > 65 && newAge <= 80) healthChange -= 2;
  if (newAge > 80) healthChange -= 3;

  // Biohacking mitigates health decline
  if (state.lifestyle.biohackingLevel > 0) {
    healthChange = Math.min(0, healthChange + 2);
  }

  state.stats.health = Math.min(100, Math.max(0, state.stats.health + healthChange));

  // Check mortality
  if (newAge >= state.character.maxAge || state.stats.health <= 0) {
    state.character.alive = false;
    state.character.causeOfDeath = newAge >= state.character.maxAge ? "Natural causes in old age" : "Failing physical health";
    yearLogs.push(`🕊️ You passed away peacefully at age ${newAge}. Cause: ${state.character.causeOfDeath}.`);
    calculateNetWorth(state);

    state.ledger.unshift({
      year: state.ledger.length,
      age: newAge,
      headline: `Passing at Age ${newAge}`,
      logs: yearLogs,
      netWorthUSD: state.finances.netWorthUSD,
      cashChangeUSD: state.finances.cashUSD - startCash
    });

    return {
      success: true,
      passedAway: true,
      message: `You lived a full and storied life to age ${newAge}! Your legacy now awaits the next generation.`
    };
  }

  // 2. Schooling & University Progression
  if (state.education.stage === "High School") {
    if (newAge < 18) {
      yearLogs.push(`Completed another rigorous academic year in High School.`);
    } else if (newAge === 18) {
      state.education.stage = "Graduated High School";
      state.stats.smarts = Math.min(100, state.stats.smarts + 5);
      headline = "High School Graduation!";
      yearLogs.push(`🎓 Graduated High School with a final GPA of ${state.education.gpa.toFixed(2)}! You are now eligible for premier domestic and international universities.`);
    }
  } else if (state.education.currentUniversity) {
    const uni = state.education.currentUniversity;
    uni.year += 1;

    // Pay university tuition
    const tuition = uni.tuitionUSD;
    if (state.finances.cashUSD >= tuition) {
      state.finances.cashUSD -= tuition;
      yearLogs.push(`Paid $${tuition.toLocaleString()} in annual tuition for ${uni.name}.`);
    } else {
      // Add to student loans
      state.finances.debt.studentLoansUSD = (state.finances.debt.studentLoansUSD || 0) + tuition;
      yearLogs.push(`Financed $${tuition.toLocaleString()} in student loans for ${uni.name}.`);
    }

    if (uni.year >= uni.totalYears) {
      // University Graduation!
      state.education.degrees.push({
        title: `Bachelor of Science in ${uni.major}`,
        major: uni.major,
        university: uni.name,
        tier: uni.tier,
        graduationAge: newAge
      });
      state.stats.smarts = Math.min(100, state.stats.smarts + 10);
      state.stats.prestige = Math.min(100, state.stats.prestige + Math.round(uni.prestige / 6));
      headline = `Graduated from ${uni.name}!`;
      yearLogs.push(`🎓 MAGNA CUM LAUDE! Graduated from ${uni.name} with a Degree in ${uni.major}! Alumni network unlocked.`);
      state.education.currentUniversity = null;
      state.education.stage = "University Graduate";
    } else {
      yearLogs.push(`Completed Year ${uni.year - 1} at ${uni.name} studying ${uni.major}.`);
    }
  }

  // 3. Corporate Career Step
  if (state.career.currentJob) {
    const job = state.career.currentJob;
    job.experienceYears += 1;

    // Base salary & Performance Bonus
    const bonus = Math.round(job.baseSalaryUSD * job.bonusPct * (job.performance / 80));
    const totalGrossComp = job.baseSalaryUSD + bonus;

    // RSU Stock Grants vesting
    let rsuIncome = 0;
    if (job.stockUSD > 0) {
      rsuIncome = Math.round(job.stockUSD * (0.8 + Math.random() * 0.4));
      yearLogs.push(`📈 Vested $${rsuIncome.toLocaleString()} in corporate equity / RSU stock shares.`);
    }

    // Income Taxes
    const country = COUNTRIES[state.character.currentCountry] || COUNTRIES.usa;
    let taxRate = 0.25;
    if (state.character.taxHaven) {
      taxRate = 0.0; // 0% tax haven!
    } else if (country.taxBrackets && country.taxBrackets.length > 0) {
      // Find matching bracket
      const topBracket = country.taxBrackets.find(b => totalGrossComp <= b.max);
      taxRate = topBracket ? topBracket.rate : 0.35;
    }

    const taxAmount = Math.round((totalGrossComp + rsuIncome) * taxRate);
    const netSalary = (totalGrossComp + rsuIncome) - taxAmount;

    state.finances.cashUSD += netSalary;
    state.career.lifetimeEarningsUSD += netSalary;

    yearLogs.push(`💼 Earned $${totalGrossComp.toLocaleString()} from ${job.title} (Bonus: $${bonus.toLocaleString()}). ${taxRate === 0 ? 'Taxes: $0 (Tax Haven)' : `Taxes paid: $${taxAmount.toLocaleString()}`}. Net take-home: $${netSalary.toLocaleString()}.`);

    // Promotion check
    if (job.performance >= 85 && job.experienceYears >= 3 && Math.random() < 0.45) {
      job.level += 1;
      job.baseSalaryUSD = Math.round(job.baseSalaryUSD * 1.25);
      job.stockUSD = Math.round(job.stockUSD * 1.40);
      headline = `Promoted to Level ${job.level}!`;
      yearLogs.push(`🌟 PROMOTION! Promoted to a higher seniority bracket with increased compensation!`);
    }
  }

  // 4. Special Career Royalty Step
  if (state.career.specialCareer) {
    const sc = state.career.specialCareer;
    if (sc.type === "indie_dev" && sc.annualRoyaltiesUSD > 0) {
      state.finances.cashUSD += sc.annualRoyaltiesUSD;
      yearLogs.push(`🎮 Collected $${sc.annualRoyaltiesUSD.toLocaleString()} in Steam digital game royalties.`);
      sc.annualRoyaltiesUSD = Math.round(sc.annualRoyaltiesUSD * 0.70); // Decay over time
    }
    if (sc.type === "content_creator" && sc.annualAdSenseUSD > 0) {
      const creatorPayout = sc.annualAdSenseUSD + (sc.sponsorshipsUSD || 0);
      state.finances.cashUSD += creatorPayout;
      yearLogs.push(`📹 Earned $${creatorPayout.toLocaleString()} from YouTube AdSense, brand sponsorships, and streams.`);
    }
    if (sc.type === "musician" && sc.annualStreamingUSD > 0) {
      state.finances.cashUSD += sc.annualStreamingUSD;
      yearLogs.push(`🎵 Received $${sc.annualStreamingUSD.toLocaleString()} in global music streaming & publishing royalties.`);
    }
  }

  // 5. System Sub-Routines
  const bizLogs = stepBusinesses(state);
  yearLogs.push(...bizLogs);

  const propLogs = stepPropertiesAndAssets(state);
  yearLogs.push(...propLogs);

  const marketLogs = stepFinancialMarkets(state);
  yearLogs.push(...marketLogs);

  const familyLogs = stepFamilyAndRelationships(state);
  yearLogs.push(...familyLogs);

  const lifestyleLogs = stepLifestyle(state);
  yearLogs.push(...lifestyleLogs);

  // 6. Recalculate Final Net Worth
  const finalNetWorth = calculateNetWorth(state);
  const netCashChange = state.finances.cashUSD - startCash;

  // 7. Save to Ledger
  state.ledger.unshift({
    year: state.ledger.length,
    age: newAge,
    headline,
    logs: yearLogs,
    netWorthUSD: finalNetWorth,
    cashChangeUSD: netCashChange
  });

  // Limit ledger to latest 50 years to keep state lightweight
  if (state.ledger.length > 60) state.ledger.pop();

  return {
    success: true,
    passedAway: false,
    newAge,
    netWorthUSD: finalNetWorth,
    cashChangeUSD: netCashChange,
    logs: yearLogs
  };
}
