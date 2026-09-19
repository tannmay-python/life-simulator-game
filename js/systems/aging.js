// Master Annual Progression Engine: Aging up by 1 year, ledger logging, salary deposits, taxes, and system synchronization

import { COUNTRIES } from "../data/countries.js";
import { stepFinancialMarkets } from "./finance_engine.js";
import { stepBusinessAnnual } from "./business_engine.js";
import { stepPropertiesAndAssets } from "./property_engine.js";
import { stepFamilyAndRelationships } from "./relationships_engine.js";
import { stepLifestyle } from "./lifestyle_engine.js";
import { EDUCATION_STAGES, calculateNetWorth, getEducationStage } from "../state.js";
import { requestEducationPayment } from "./family_finance_engine.js";
import { generateAndSetSchoolChoices, ensureSchoolCohort } from "./school_engine.js";
import { stepAcademicYear } from "./academic_engine.js";
import { stepStudentWorkYear } from "./student_work_engine.js";
import { stepStudentLifeYear } from "./student_life_engine.js";

export function ageUpOneYear(state) {
  if (!state.character.alive) {
    return { success: false, message: "Character is no longer alive." };
  }

  const startCash = state.finances.cashUSD;
  const currentAge = state.character.age;
  state.character.age += 1;
  const newAge = state.character.age;
  state.stats.energy = 100; // Reset annual energy

  // Siblings age with the character and remain part of the household story.
  for (const sibling of state.family?.siblings || []) {
    if (sibling.alive !== false) sibling.age = Math.max(0, (Number(sibling.age) || 0) + 1);
  }

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
  // Stage is explicit state. Age is used only to advance the default path;
  // an enrolled university or a deliberate gap/vocational choice wins.
  if (state.education.currentUniversity) {
    const uni = state.education.currentUniversity;
    state.education.stage = EDUCATION_STAGES.UNIVERSITY;
    uni.year += 1;

    // Tuition is routed through the household/student/loan payer engine.
    const tuition = uni.annualCostUSD ?? uni.tuitionUSD;
    const payment = requestEducationPayment(state, {
      amountUSD: tuition,
      type: "tuition",
      description: `${uni.name} annual tuition`,
      mandatory: true
    });
    yearLogs.push(payment.message);

    const burnout = state.cognition?.condition?.burnoutLevel || 0;
    uni.attendancePct = Math.max(58, Math.min(100, Math.round(94 - burnout * 0.22 + (state.stats.health - 70) * 0.08)));
    uni.creditsCompleted = (uni.creditsCompleted || 0) + (uni.attendancePct >= 70 ? 30 : 18);
    if (uni.attendancePct < 65) yearLogs.push(`University attendance fell to ${uni.attendancePct}%; academic progress is at risk.`);

    if (uni.year >= (uni.totalYears || 4)) {
      // University Graduation!
      state.education.degrees.push({
        title: `Bachelor's degree in ${uni.major}`,
        major: uni.major,
        university: uni.name,
        tier: uni.tier,
        graduationAge: newAge
      });
      state.stats.prestige = Math.min(100, state.stats.prestige + Math.round(uni.prestige / 6));
      headline = `Graduated from ${uni.name}!`;
      yearLogs.push(`🎓 MAGNA CUM LAUDE! Graduated from ${uni.name} with a Degree in ${uni.major}! Alumni network unlocked.`);
      state.education.currentUniversity = null;
      state.education.stage = EDUCATION_STAGES.GRADUATED;
    } else {
      yearLogs.push(`Completed Year ${uni.year - 1} at ${uni.name} studying ${uni.major}.`);
    }
  } else {
    const previousStage = state.education.stage;
    const nextStage = getEducationStage(newAge, null, previousStage);
    state.education.stage = nextStage;

    if (newAge === 3) {
      headline = "Preschool Decision";
      state.education.preschoolCandidates = generateAndSetSchoolChoices(state, newAge);
      yearLogs.push(`Your household is comparing local preschool options. The choice will affect early learning, cost, and peer exposure.`);
    } else if (newAge === 6) {
      headline = "Primary School Begins";
      if (!state.education.currentInstitution || state.education.currentInstitution.enrolledAtAge < 6) state.education.schoolChoices = generateAndSetSchoolChoices(state, newAge);
      yearLogs.push(`Primary-school options are open. Tuition, curriculum, teacher quality, and peer environment now matter.`);
    } else if (newAge === 11) {
      headline = "Lower Secondary Begins";
      if (!state.education.currentInstitution) state.education.schoolChoices = generateAndSetSchoolChoices(state, newAge);
      yearLogs.push(`Entered lower secondary school. Subjects and academic habits are becoming more differentiated.`);
    } else if (newAge === 14) {
      headline = "Upper Secondary Begins";
      state.education.schoolChoices = generateAndSetSchoolChoices(state, newAge, state.education.schoolBoard);
      state.education.gpa = state.education.gpa ?? 2.5;
      yearLogs.push(`Entered upper secondary school. Curriculum, subjects, workload, and future pathways now become meaningful choices.`);
    } else if (newAge === 18 && previousStage === EDUCATION_STAGES.UPPER_SECONDARY) {
      state.education.stage = EDUCATION_STAGES.GRADUATED;
      headline = "Secondary School Graduation";
      const finalGpa = state.education.gpa == null ? 2.5 : state.education.gpa;
      state.education.gpa = Number(finalGpa.toFixed(2));
      yearLogs.push(`Completed secondary school with a ${state.education.gpa.toFixed(2)} GPA-equivalent record. Applications, vocational routes, and gap-year choices are now open.`);
    } else if ([EDUCATION_STAGES.INFANCY, EDUCATION_STAGES.PRESCHOOL, EDUCATION_STAGES.PRIMARY, EDUCATION_STAGES.LOWER_SECONDARY, EDUCATION_STAGES.UPPER_SECONDARY].includes(nextStage)) {
      yearLogs.push(`Progressed through ${nextStage.replaceAll("_", " ")}.`);
    }
  }

  // A school record is only created after enrollment. Once enrolled, the same
  // institution feeds teachers, coursework, transcript, stress, and peers.
  if (state.education.currentInstitution && (state.education.currentInstitution.enrolledAtAge || 0) >= 6 && newAge >= 6 && newAge <= 18) {
    ensureSchoolCohort(state);
    const schoolPayment = requestEducationPayment(state, {
      amountUSD: state.education.currentInstitution.totalAnnualCostUSD || state.education.currentInstitution.annualTuitionUSD || 0,
      type: "school_fees",
      description: `${state.education.currentInstitution.name} annual education costs`,
      mandatory: true
    });
    if (schoolPayment.amountUSD) yearLogs.push(schoolPayment.message);
    const academicResult = stepAcademicYear(state);
    if (academicResult.success) {
      const displayedGpa = academicResult.gpa ?? state.education.gpa;
      yearLogs.push(`Academic year completed at ${state.education.currentInstitution.name}: GPA ${displayedGpa == null ? "foundation record" : Number(displayedGpa).toFixed(2)}, attendance ${state.education.academic.attendancePct}%.`);
      if (state.cognition?.condition?.burnoutLevel >= 60) yearLogs.push(`Academic workload is causing serious burnout; recovery and schedule changes are needed.`);
      const lifeResult = stepStudentLifeYear(state);
      yearLogs.push(`School life: ${lifeResult.activeClubs} active activities, ${lifeResult.closeFriends} close friends, discipline standing ${lifeResult.standing}%.`);
    }
  }

  const studentWorkResult = stepStudentWorkYear(state);
  if (studentWorkResult.success) {
    yearLogs.push(`Student work: ${studentWorkResult.hours}h/week as ${studentWorkResult.job.title}, net income $${studentWorkResult.net.toLocaleString()} credited to the student account.`);
  }

  if (newAge === 18 && state.finances.studentAccount) {
    const studentCash = state.finances.studentAccount.cashUSD || 0;
    state.finances.cashUSD += studentCash;
    state.finances.studentAccount.cashUSD = 0;
    yearLogs.push(`At legal majority, $${studentCash.toLocaleString()} moved from the student account into the adult cash account.`);
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
  for (const business of state.businesses || []) {
    const financials = stepBusinessAnnual(business, state);
    yearLogs.push(`${business.name || "Business"} completed its annual operating cycle: ${financials.pnl.netIncome >= 0 ? "profitable" : "loss-making"}.`);
  }

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
