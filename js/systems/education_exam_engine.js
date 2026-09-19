// ============================================================================
// File: js/systems/education_exam_engine.js
// Description: Global Cohort Examinations, Holistic Admissions & Financial Aid
// ============================================================================

// 1. NATIONAL HIGH-STAKES EXAM COHORT DISTRIBUTIONS
export const EXAM_COHORTS = {
  jee_main: {
    id: "jee_main",
    name: "JEE Main (Engineering)",
    country: "india",
    totalCandidates: 1450000,
    minScore: -75,
    maxScore: 300,
    mu: 52.0,
    sigma: 29.5,
    gamma: 1.0,
    streamReq: "pcm"
  },
  neet_ug: {
    id: "neet_ug",
    name: "NEET UG (Medical Entrance)",
    country: "india",
    totalCandidates: 2400000,
    minScore: 0,
    maxScore: 720,
    mu: 215.0,
    sigma: 82.5,
    gamma: 1.60,
    streamReq: "pcb"
  },
  gaokao: {
    id: "gaokao",
    name: "National Gaokao (高考)",
    country: "china",
    totalCandidates: 12910000,
    minScore: 0,
    maxScore: 750,
    mu: 410.0,
    sigma: 78.0,
    gamma: 1.35,
    streamReq: "any"
  },
  sat: {
    id: "sat",
    name: "SAT Reasoning Test",
    country: "usa",
    totalCandidates: 1900000,
    minScore: 400,
    maxScore: 1600,
    mu: 1050.0,
    sigma: 102.0,
    gamma: 1.0,
    streamReq: "any"
  },
  act: {
    id: "act",
    name: "ACT Composite",
    country: "usa",
    totalCandidates: 1400000,
    minScore: 1,
    maxScore: 36,
    mu: 20.2,
    sigma: 2.9,
    gamma: 1.0,
    streamReq: "any"
  }
};

export class EducationExamEngine {
  /**
   * Generalized Logistic Cumulative Distribution Function
   * Calculates exact percentile against millions of simulated candidates in O(1) time.
   * F(x) = (1 + exp(-z))^(-gamma)
   */
  static calculatePercentile(score, examKey) {
    const cohort = EXAM_COHORTS[examKey] || EXAM_COHORTS.sat;
    const clampedScore = Math.max(cohort.minScore, Math.min(cohort.maxScore, score));
    const z = (clampedScore - cohort.mu) / cohort.sigma;
    
    const rawCDF = Math.pow(1.0 + Math.exp(-z), -cohort.gamma);
    const percentile = Math.min(99.9999, Math.max(0.01, rawCDF * 100));
    const rank = Math.max(1, Math.ceil(cohort.totalCandidates * (1 - percentile / 100)));

    return {
      rawScore: clampedScore,
      percentile: Math.round(percentile * 1000) / 1000,
      estimatedRank: rank,
      totalCohort: cohort.totalCandidates
    };
  }

  /**
   * Bayesian Sequential Mock Exam Simulator with Predictive Confidence Bands
   */
  static runMockExam(character, examKey, mockNumber = 1, previousBayesianState = null) {
    const cohort = EXAM_COHORTS[examKey] || EXAM_COHORTS.sat;
    const smarts = character.stats.smarts || 75;
    const coachingEfficacy = character.education?.coachingEfficacy || 1.0;
    const energy = character.stats.energy || 80;
    const anxiety = character.stats.stress || 20;

    const normSmarts = smarts / 100;
    const baseTarget = cohort.minScore + (cohort.maxScore - cohort.minScore) * (
      0.30 * normSmarts + 
      0.35 * Math.pow(normSmarts, 1.4) + 
      0.25 * (coachingEfficacy / 2.0) +
      0.05 * ((energy - 50) / 50) -
      0.05 * (Math.max(0, anxiety - 40) / 60)
    );

    const noise = (Math.random() - 0.5) * 2 * (cohort.sigma * 0.4);
    const observedScore = Math.max(cohort.minScore, Math.min(cohort.maxScore, Math.round(baseTarget + noise)));

    // Bayesian recursive normal-normal update
    let priorMu = previousBayesianState ? previousBayesianState.mu : baseTarget;
    let priorVar = previousBayesianState ? previousBayesianState.variance : Math.pow(cohort.sigma * 0.8, 2);
    const mockVar = Math.pow(cohort.sigma * 0.35, 2);

    const postVar = 1.0 / ((1.0 / priorVar) + (1.0 / mockVar));
    const postMu = postVar * ((priorMu / priorVar) + (observedScore / mockVar));
    const stdDev = Math.sqrt(postVar);

    const lowScore = Math.max(cohort.minScore, postMu - 1.96 * stdDev);
    const highScore = Math.min(cohort.maxScore, postMu + 1.96 * stdDev);

    const lowStat = this.calculatePercentile(lowScore, examKey);
    const highStat = this.calculatePercentile(highScore, examKey);
    const currentStat = this.calculatePercentile(observedScore, examKey);

    return {
      mockNumber,
      observedScore,
      currentPercentile: currentStat.percentile,
      currentRank: currentStat.estimatedRank,
      confidenceBand: {
        percentileLow: lowStat.percentile,
        percentileHigh: highStat.percentile,
        rankBest: highStat.estimatedRank,
        rankWorst: lowStat.estimatedRank
      },
      bayesianState: { mu: postMu, variance: postVar },
      formattedReport: `Mock #${mockNumber}: Score ${observedScore}/${cohort.maxScore} | Est. %ile: ${lowStat.percentile.toFixed(1)}% - ${highStat.percentile.toFixed(1)}% | Projected Rank: ~${highStat.estimatedRank.toLocaleString()} - ~${lowStat.estimatedRank.toLocaleString()}`
    };
  }

  /**
   * Dual-Reader US Holistic Admissions Committee Engine
   */
  static evaluateUSHolisticAdmissions(applicant, university) {
    // 1. Academic Index (1-6 scale, 1 is best)
    const gpaWeight = ((applicant.gpaWeighted || 3.8) / 5.0) * 40;
    const satWeight = (((applicant.satScore || 1200) - 400) / 1200) * 40;
    const rigorWeight = (applicant.rigorIndex || 0.75) * 20;
    const aiRaw = gpaWeight + satWeight + rigorWeight;
    const dAcademic = Math.max(1.0, Math.min(6.0, 7.0 - (aiRaw / 17.0)));

    // 2. Extracurricular Depth & Spike (1-6 scale)
    let dExtracurricular = applicant.ecTier ? (applicant.ecTier * 1.3) : 3.5;
    if (applicant.hasSpike) dExtracurricular -= 0.5;
    dExtracurricular = Math.max(1.0, Math.min(6.0, dExtracurricular));

    // 3. Letters of Recommendation (1-6 scale)
    const lorRating = applicant.lorScore || 70;
    const dRecommendations = Math.max(1.0, Math.min(6.0, 7.0 - (lorRating / 17.0)));

    // 4. Multi-Draft Personal Statement & Essays
    const drafts = applicant.essayDrafts || 1;
    const dEssay = Math.max(1.0, Math.min(6.0, 1.2 + 4.5 * Math.exp(-0.75 * drafts)));

    // 5. Institutional Priorities & Hooks
    let hookBonus = 0;
    if (applicant.isFirstGen) hookBonus += 0.35;
    if (applicant.isRecruitedAthlete) hookBonus += 1.20;
    if (applicant.isLegacy) hookBonus += 0.50;

    // Independent Reader 1 and Reader 2 evaluations
    const noise1 = (Math.random() - 0.5) * 0.4;
    const noise2 = (Math.random() - 0.5) * 0.4;

    const r1 = (0.35 * dAcademic + 0.30 * dExtracurricular + 0.15 * dRecommendations + 0.20 * dEssay) + noise1 - hookBonus;
    const r2 = (0.35 * dAcademic + 0.30 * dExtracurricular + 0.15 * dRecommendations + 0.20 * dEssay) + noise2 - hookBonus;

    const compositeScore = (r1 + r2) / 2.0;
    const discrepancy = Math.abs(r1 - r2);
    const committeeDebate = discrepancy >= 0.8;

    const uniTier = university.tier || 1;
    const admitCutoff = uniTier === 1 ? 1.85 : (uniTier === 2 ? 2.70 : 3.80);
    const waitlistCutoff = admitCutoff + 0.45;

    let decision = "REJECT";
    if (compositeScore <= admitCutoff) {
      decision = "ADMIT";
    } else if (compositeScore <= waitlistCutoff) {
      decision = "WAITLIST";
    }

    return {
      decision,
      compositeScore: Math.round(compositeScore * 100) / 100,
      reader1: Math.round(r1 * 100) / 100,
      reader2: Math.round(r2 * 100) / 100,
      committeeDebate,
      ratings: {
        academic: Math.round(dAcademic * 10) / 10,
        extracurricular: Math.round(dExtracurricular * 10) / 10,
        recommendations: Math.round(dRecommendations * 10) / 10,
        essay: Math.round(dEssay * 10) / 10
      }
    };
  }

  /**
   * UK UCAS Conditional Offer Fulfillment Engine
   */
  static evaluateUCASApplication(applicant, courseReq) {
    // Check prerequisites
    for (const reqSub of (courseReq.mandatorySubjects || [])) {
      if (!applicant.aLevelSubjects || !applicant.aLevelSubjects.includes(reqSub)) {
        return { decision: "REJECTED_PREREQUISITES_MISSING", reason: `Missing mandatory A-Level: ${reqSub}` };
      }
    }

    const gradeWeight = { "A*": 6, "A": 5, "B": 4, "C": 3, "D": 2, "E": 1, "U": 0 };
    const predTotal = (applicant.predictedGrades || []).reduce((sum, g) => sum + (gradeWeight[g] || 0), 0);
    const reqTotal = (courseReq.conditionalOffer?.aLevelGrades || ["A", "A", "A"]).reduce((sum, g) => sum + (gradeWeight[g] || 0), 0);

    if (predTotal < reqTotal - 1) {
      return { decision: "REJECTED_PREDICTED_GRADES_BELOW_OFFER" };
    }

    return {
      decision: "CONDITIONAL_OFFER",
      conditions: courseReq.conditionalOffer || { aLevelGrades: ["A*", "A", "A"] }
    };
  }

  /**
   * Financial Aid & Student Loan Amortization
   */
  static calculateFinancialAid(costOfAttendance, parentFinancials, academicIndex, uniPolicy = {}) {
    const parentIncome = parentFinancials.annualIncomeUSD || 55000;
    const parentAssets = parentFinancials.liquidAssetsUSD || 25000;

    // Expected Family Contribution (EFC)
    const incomeContrib = Math.max(0, (parentIncome - 35000) * 0.22);
    const assetContrib = Math.max(0, parentAssets * 0.05);
    const efc = Math.min(costOfAttendance, Math.round(incomeContrib + assetContrib));

    // Demonstrated Need & Need Grant
    const demonstratedNeed = Math.max(0, costOfAttendance - efc);
    const needMetRatio = uniPolicy.needMetRatio || 0.65;
    const needGrant = Math.round(demonstratedNeed * needMetRatio);

    // Merit Aid
    let meritAid = 0;
    if (!uniPolicy.noMeritAid && academicIndex >= 95.0) {
      meritAid = 22000;
    } else if (!uniPolicy.noMeritAid && academicIndex >= 90.0) {
      meritAid = 12000;
    }

    const totalAid = needGrant + meritAid;
    const netCost = Math.max(0, costOfAttendance - totalAid);
    const unmetGap = Math.max(0, netCost - efc);

    // 10-Year Student Loan Amortization (120 Months @ 6.8% APR)
    const totalFourYearDebt = unmetGap * 4;
    const monthlyRate = 0.068 / 12;
    const numPayments = 120;
    
    let monthlyLoanPayment = 0;
    if (totalFourYearDebt > 0) {
      monthlyLoanPayment = Math.round(
        totalFourYearDebt * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      );
    }

    return {
      costOfAttendance,
      expectedFamilyContribution: efc,
      demonstratedNeed,
      needGrant,
      meritAid,
      totalAid,
      netPricePerYear: netCost,
      unmetGapPerYear: unmetGap,
      projectedTotalDebt: totalFourYearDebt,
      monthlyLoanRepaymentPostGrad: monthlyLoanPayment
    };
  }
}
