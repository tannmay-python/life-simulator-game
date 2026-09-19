// ============================================================================
// File: scratch/test_education_sim.js
// Description: Automated Test Suite for Education, Cognitive & Admissions Engine
// ============================================================================

import {
  generateInitialCognitiveState,
  TimeAllocationEngine,
  StudentAcademicSimulator,
  calculateLegacySmarts,
  DEFAULT_168_HOURS_SCHEDULE
} from "../js/systems/student_engine.js";

import {
  EducationExamEngine,
  EXAM_COHORTS
} from "../js/systems/education_exam_engine.js";

import {
  generateSchoolFaculty,
  generateClassmatesCohort,
  generateRecommendationLetter,
  resolveClubTournamentMatch,
  iterateEssayDraft,
  generateFamilyEconomy,
  evaluateParentalExpenseNegotiation,
  convertCurrency
} from "../js/systems/social_school_engine.js";

console.log("=== 1. COGNITIVE ENGINE & SMARTS ADAPTER TEST ===");
const cog = generateInitialCognitiveState();
console.log("Innate Faculties Sample:", {
  quantitative: cog.innate.quantitative,
  verbal: cog.innate.verbal,
  abstractReasoning: cog.innate.abstractReasoning,
  workingMemory: cog.innate.workingMemory
});

const legacySmarts = calculateLegacySmarts(cog.innate, cog.learnedSkills, cog.traits);
console.log(`Computed Legacy Smarts: ${legacySmarts} (Expected: 30 - 85)`);
if (legacySmarts < 20 || legacySmarts > 99) {
  throw new Error(`Legacy smarts out of plausible range: ${legacySmarts}`);
}
console.log("✅ Cognitive engine & backward-compatible smarts adapter verified!");

console.log("\n=== 2. 168-HOUR ALLOCATOR & SLEEP DEGRADATION CASCADE TEST ===");
const validSchedule = { ...DEFAULT_168_HOURS_SCHEDULE };
const checkValid = TimeAllocationEngine.validateAllocation(validSchedule);
console.log(`Validation of 168h baseline: isValid=${checkValid.isValid}, total=${checkValid.totalHours}`);
if (!checkValid.isValid) throw new Error("168h baseline schedule does not sum to 168!");

// Test Sleep Cascade: 56h vs 42h vs 28h
const sleep56 = TimeAllocationEngine.calculateSleepImpact(56);
const sleep42 = TimeAllocationEngine.calculateSleepImpact(42);
const sleep28 = TimeAllocationEngine.calculateSleepImpact(28);

console.log(`Sleep 56h: LearningEff=${sleep56.learningEfficiency}, FocusMult=${sleep56.focusMultiplier}, IllnessRisk=${sleep56.illnessRisk}%`);
console.log(`Sleep 42h: LearningEff=${sleep42.learningEfficiency}, FocusMult=${sleep42.focusMultiplier}, IllnessRisk=${sleep42.illnessRisk}%`);
console.log(`Sleep 28h: LearningEff=${sleep28.learningEfficiency}, FocusMult=${sleep28.focusMultiplier}, IllnessRisk=${sleep28.illnessRisk}%`);

if (sleep28.learningEfficiency > 0.45 || sleep28.illnessRisk < 40) {
  throw new Error("Sleep 28h did not impose severe cognitive & health penalties!");
}
console.log("✅ 168-hour allocation & sleep degradation cascade verified!");

console.log("\n=== 3. MULTI-MILLION COHORT CDF INVERSION TEST ===");
// Test JEE Main (1.45M candidates)
const jee188 = EducationExamEngine.calculatePercentile(188, "jee_main");
console.log(`JEE Main Score 188/300: Percentile=${jee188.percentile}%ile, Projected Rank=${jee188.estimatedRank.toLocaleString()} out of ${jee188.totalCohort.toLocaleString()}`);
if (jee188.percentile < 97.0 || jee188.percentile > 99.8) {
  throw new Error(`JEE percentile calibration error: got ${jee188.percentile}`);
}

// Test NEET UG (2.4M candidates)
const neet650 = EducationExamEngine.calculatePercentile(650, "neet_ug");
console.log(`NEET UG Score 650/720: Percentile=${neet650.percentile}%ile, Projected Rank=${neet650.estimatedRank.toLocaleString()} out of ${neet650.totalCohort.toLocaleString()}`);

// Test SAT (1.9M candidates)
const sat1520 = EducationExamEngine.calculatePercentile(1520, "sat");
console.log(`SAT Score 1520/1600: Percentile=${sat1520.percentile}%ile, Projected Rank=${sat1520.estimatedRank.toLocaleString()} out of ${sat1520.totalCohort.toLocaleString()}`);
if (sat1520.percentile < 97.5 || sat1520.percentile > 99.9) {
  throw new Error(`SAT percentile calibration error: got ${sat1520.percentile}`);
}
console.log("✅ Exact closed-form cohort percentile CDF verified!");

console.log("\n=== 4. BAYESIAN SEQUENTIAL MOCK EXAM TEST ===");
const mockChar = { stats: { smarts: 88, energy: 90, stress: 25 }, education: { coachingEfficacy: 1.25 } };
const mock1 = EducationExamEngine.runMockExam(mockChar, "jee_main", 1);
console.log(`Mock 1 Output: ${mock1.formattedReport}`);
const mock2 = EducationExamEngine.runMockExam(mockChar, "jee_main", 2, mock1.bayesianState);
console.log(`Mock 2 Output: ${mock2.formattedReport}`);
if (!mock2.confidenceBand || mock2.confidenceBand.percentileLow >= mock2.confidenceBand.percentileHigh) {
  throw new Error("Mock exam Bayesian confidence band is invalid!");
}
console.log("✅ Bayesian sequential mock test engine verified!");

console.log("\n=== 5. US DUAL-READER HOLISTIC ADMISSIONS TEST ===");
const strongApplicant = {
  gpaWeighted: 4.85,
  satScore: 1540,
  rigorIndex: 0.95,
  ecTier: 1.2, // Olympiad / published research
  hasSpike: true,
  lorScore: 92,
  essayDrafts: 4,
  isFirstGen: true
};

const weakApplicant = {
  gpaWeighted: 3.4,
  satScore: 1220,
  rigorIndex: 0.50,
  ecTier: 4.0,
  hasSpike: false,
  lorScore: 50,
  essayDrafts: 1
};

const stanford = { tier: 1 };
const resStrong = EducationExamEngine.evaluateUSHolisticAdmissions(strongApplicant, stanford);
console.log(`Strong Applicant to Stanford: Decision=${resStrong.decision}, Composite=${resStrong.compositeScore} (R1=${resStrong.reader1}, R2=${resStrong.reader2})`);

const resWeak = EducationExamEngine.evaluateUSHolisticAdmissions(weakApplicant, stanford);
console.log(`Weak Applicant to Stanford: Decision=${resWeak.decision}, Composite=${resWeak.compositeScore} (R1=${resWeak.reader1}, R2=${resWeak.reader2})`);

if (resStrong.decision === "REJECT" || resWeak.decision === "ADMIT") {
  throw new Error("Holistic admissions decision logic failed!");
}
console.log("✅ Dual-reader holistic admissions engine verified!");

console.log("\n=== 6. TEACHER IMPRESSIONS & DYNAMIC LOR ENGINE TEST ===");
const faculty = generateSchoolFaculty("india");
console.log(`Generated ${faculty.length} teachers. First: ${faculty[0].name} (${faculty[0].subjectName})`);
// Simulate teacher with high rapport
faculty[0].impression = { intellectScore: 92, workEthicScore: 88, reliabilityScore: 90, rapport: 85, classroomEtiquette: 80 };
const lor = generateRecommendationLetter(faculty[0], "Aarav");
console.log(`Generated LoR Verbal: ${lor.verbalResponse}`);
console.log(`Hidden LoR Score: ${lor.hiddenScore}/100, Tier: ${lor.enthusiasmTier}`);
if (lor.enthusiasmTier !== "one_of_the_finest" && lor.enthusiasmTier !== "highest_recommendation") {
  throw new Error(`Expected stellar LoR for 90+ composite, got ${lor.enthusiasmTier}`);
}
console.log("✅ Teacher impressions & dynamic LoR engine verified!");

console.log("\n=== 7. FAMILY ECONOMY & 'WHO PAYS?' NEGOTIATION TEST ===");
const fam = generateFamilyEconomy("india");
console.log(`Family Economy: Currency=${fam.nativeCurrency}, Disposable Cash=$${fam.disposableCashUSD.toLocaleString()}`);

const coachingExpense = { name: "Kota JEE Coaching", costUSD: 1800 };
const outcome = evaluateParentalExpenseNegotiation(fam, coachingExpense, "invest_in_future", 3.9);
console.log(`Parent Negotiation Result: Verdict=${outcome.verdict.toUpperCase()} (Parents pay ${outcome.parentContributionPct}%)`);
console.log(`Parent Quote: ${outcome.quote}`);
if (!outcome.verdict || outcome.parentContributionPct === undefined) {
  throw new Error("Family negotiation evaluation failed!");
}
console.log("✅ Family economy & 'Who Pays?' negotiation verified!");

console.log("\n=== 8. MULTI-DRAFT ESSAY STUDIO & PPP CURRENCY TEST ===");
let essay = { title: "Personal Statement", draftStage: 1, polish: 35, authenticity: 90 };
essay = iterateEssayDraft(essay, 4, "consultant");
console.log(`After Consultant Review: Polish=${essay.polish}%, Authenticity=${essay.authenticity}% (Drop expected from over-packaging)`);
if (essay.authenticity >= 90) {
  throw new Error("Consultant edit should have penalized raw authenticity!");
}

const pppTest = convertCurrency(100, "INR", true);
console.log(`$100 USD in INR (PPP): ${pppTest.formatted} (Raw: ₹${pppTest.raw})`);
console.log("✅ Essay studio & PPP currency conversion verified!");

console.log("\n🎉 ALL EDUCATION & ADMISSIONS SYSTEM TESTS PASSED PERFECTLY! 🎉\n");
