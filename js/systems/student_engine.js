// ============================================================================
// File: js/systems/student_engine.js
// Description: Tripartite Cognitive Model, 168-Hour Allocator & Learning Engine
// ============================================================================

import { COGNITIVE_AFFINITIES } from "../data/education_data.js";

// Gaussian Random Helper (Box-Muller Transform)
export function randomGaussian(mean = 0, stdev = 1) {
  let u = 1 - Math.random();
  let v = Math.random();
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * stdev;
}

export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

// 1. DEFAULT INITIAL COGNITIVE STATE GENERATOR
export function generateInitialCognitiveState() {
  return {
    innate: {
      quantitative: Math.round(clamp(randomGaussian(52, 14), 18, 96)),
      verbal: Math.round(clamp(randomGaussian(50, 14), 18, 96)),
      spatial: Math.round(clamp(randomGaussian(48, 14), 18, 96)),
      workingMemory: Math.round(clamp(randomGaussian(50, 12), 20, 94)),
      longTermMemory: Math.round(clamp(randomGaussian(52, 12), 20, 94)),
      processingSpeed: Math.round(clamp(randomGaussian(50, 14), 18, 96)),
      patternRecognition: Math.round(clamp(randomGaussian(53, 14), 20, 96)),
      creativity: Math.round(clamp(randomGaussian(50, 15), 15, 96)),
      abstractReasoning: Math.round(clamp(randomGaussian(51, 14), 18, 96))
    },
    learnedSkills: {
      algebra: 10,
      calculus: 0,
      statistics: 0,
      writing: 20,
      grammar: 25,
      economics: 0,
      physics: 5,
      chemistry: 5,
      biology: 10,
      history: 15,
      coding: 0,
      research: 5,
      presentation: 15
    },
    traits: {
      focus: Math.round(clamp(randomGaussian(50, 14), 15, 90)),
      discipline: Math.round(clamp(randomGaussian(50, 14), 15, 90)),
      conscientiousness: Math.round(clamp(randomGaussian(52, 13), 20, 90)),
      examTemperament: Math.round(clamp(randomGaussian(50, 15), 15, 92)),
      consistency: Math.round(clamp(randomGaussian(50, 14), 15, 90)),
      procrastination: Math.round(clamp(randomGaussian(45, 16), 10, 85)),
      stressTolerance: Math.round(clamp(randomGaussian(50, 15), 15, 90)),
      curiosity: Math.round(clamp(randomGaussian(55, 14), 20, 95)),
      ambition: Math.round(clamp(randomGaussian(50, 16), 15, 95)),
      confidence: Math.round(clamp(randomGaussian(50, 15), 15, 92))
    },
    condition: {
      sleepDebtHours: 0,
      chronicStress: 15,
      motivation: 75,
      burnoutLevel: 0,
      illnessRisk: 4
    }
  };
}

// 2. 168-HOUR WEEKLY TIME ALLOCATION ENGINE
export const DEFAULT_168_HOURS_SCHEDULE = {
  sleep: 56,          // 8h/day baseline
  schoolClasses: 35,  // Mandatory class hours (7h/day x 5)
  commute: 7,         // Transit & walking (1h/day)
  mealsBasicLife: 14, // Hygiene, meals, living essentials (2h/day)
  homework: 10,       // Required homework assignments
  examCoaching: 0,    // JEE / SAT / cram school
  activitiesClubs: 8, // Sports, debate, robotics, SGA
  friendsSocial: 14,  // Peer connection & decompression
  partTimeWork: 0,    // Student job shifts
  leisureGaming: 14,  // Relaxing, hobbies, video games
  selfStudy: 10       // Deep-work subject mastery
};

export class TimeAllocationEngine {
  static TOTAL_HOURS = 168;

  static validateAllocation(hours) {
    const sum = Object.values(hours).reduce((acc, h) => acc + (Number(h) || 0), 0);
    return {
      isValid: sum === this.TOTAL_HOURS,
      totalHours: sum,
      freeHours: this.TOTAL_HOURS - sum
    };
  }

  // Non-linear Tiered Sleep Cascade
  static calculateSleepImpact(sleepHours, sleepDebtHours = 0) {
    let workingMemoryMult = 1.0;
    let focusMult = 1.0;
    let learningEff = 1.0;
    let stressDelta = -10; // Normal restorative recovery
    let illnessRisk = 2;   // 2% base weekly illness probability

    if (sleepHours >= 56) {
      // 8h+/night optimal
      workingMemoryMult = 1.0;
      focusMult = 1.0;
      learningEff = 1.0;
      stressDelta = -12;
      illnessRisk = 2;
    } else if (sleepHours >= 49) {
      // 7h/night
      workingMemoryMult = 0.92;
      focusMult = 0.88;
      learningEff = 0.88;
      stressDelta = +8;
      illnessRisk = 8;
    } else if (sleepHours >= 42) {
      // 6h/night
      workingMemoryMult = 0.78;
      focusMult = 0.72;
      learningEff = 0.70;
      stressDelta = +24;
      illnessRisk = 22;
    } else if (sleepHours >= 28) {
      // 4h/night: severe deprivation
      workingMemoryMult = 0.55;
      focusMult = 0.45;
      learningEff = 0.40;
      stressDelta = +55;
      illnessRisk = 48;
    } else {
      // Critical sleep collapse (<4h/night)
      workingMemoryMult = 0.30;
      focusMult = 0.20;
      learningEff = 0.15;
      stressDelta = +95;
      illnessRisk = 82;
    }

    if (sleepDebtHours > 10) {
      learningEff *= Math.max(0.2, 1.0 - (sleepDebtHours - 10) * 0.03);
      stressDelta += Math.round(sleepDebtHours * 1.5);
      illnessRisk += Math.round(sleepDebtHours * 1.2);
    }

    return {
      workingMemoryMultiplier: clamp(workingMemoryMult, 0.2, 1.0),
      focusMultiplier: clamp(focusMult, 0.15, 1.0),
      learningEfficiency: clamp(learningEff, 0.1, 1.05),
      stressDelta,
      illnessRisk: clamp(illnessRisk, 1, 95)
    };
  }

  // Fatigue Decay Saturation Curve
  static calculateFatigueIntegral(totalStudyHours, focusTrait, disciplineTrait) {
    const hHalf = Math.max(1.0, 2.8 * ((focusTrait + disciplineTrait) / 100));
    const dailyHours = totalStudyHours / 7;
    let dailyEffectiveHours = 0;
    const step = 0.25;

    for (let t = 0; t < dailyHours; t += step) {
      const fatigueAtT = 1.0 / (1.0 + Math.pow(t / hHalf, 2.2));
      dailyEffectiveHours += fatigueAtT * step;
    }

    return dailyEffectiveHours * 7;
  }
}

// 3. STUDY METHODS
export const STUDY_METHODS = {
  rereading: {
    id: "rereading",
    name: "Passive Rereading / Highlighting",
    knowledgeEff: 0.60,
    examTechEff: 0.30,
    fatigueRate: 0.70,
    desc: "Low cognitive friction; creates quick illusion of familiarity"
  },
  flashcards: {
    id: "flashcards",
    name: "Spaced Repetition Flashcards (Anki)",
    knowledgeEff: 1.10,
    examTechEff: 0.60,
    fatigueRate: 1.00,
    desc: "High retention durability for vocabulary, biology & chemical reactions"
  },
  practice_problems: {
    id: "practice_problems",
    name: "Intensive Practice Problem Sets",
    knowledgeEff: 1.30,
    examTechEff: 1.10,
    fatigueRate: 1.25,
    desc: "Mandatory for Math, Physics, and Coding problem intuition"
  },
  past_papers: {
    id: "past_papers",
    name: "Timed Past Exam Papers & Mark Schemes",
    knowledgeEff: 0.90,
    examTechEff: 1.40,
    fatigueRate: 1.40,
    desc: "Directly builds test-taking speed, mark scheme calibration & lowers panic"
  },
  active_recall: {
    id: "active_recall",
    name: "Active Recall (Feynman Technique)",
    knowledgeEff: 1.35,
    examTechEff: 0.90,
    fatigueRate: 1.30,
    desc: "Explaining concepts from memory without notes; deep mastery"
  },
  group_study: {
    id: "group_study",
    name: "Collaborative Study Group",
    knowledgeEff: 1.00, // Scales with peer ability
    examTechEff: 0.70,
    fatigueRate: 0.90,
    desc: "Morale buffer; shares peer insights and reduces weekly stress"
  },
  mock_exams: {
    id: "mock_exams",
    name: "Full Proctored Mock Exam",
    knowledgeEff: 0.80,
    examTechEff: 1.30,
    fatigueRate: 1.50,
    desc: "Diagnostic test yielding predictive percentile ranges and rank bands"
  }
};

// 4. STUDENT ACADEMIC SIMULATOR
export class StudentAcademicSimulator {
  static computeAbilityForSkill(skillKey, innateAttributes) {
    const affinities = COGNITIVE_AFFINITIES[skillKey];
    if (!affinities) return 1.0;

    let abilitySum = 0;
    for (const [attr, weight] of Object.entries(affinities)) {
      const val = innateAttributes[attr] || 50;
      abilitySum += weight * (val / 50);
    }
    return abilitySum;
  }

  // Master Learning Formula
  static executeWeeklyStudySession({
    skillKey,
    currentSkillLevel = 0,
    innateAttributes,
    traits,
    studyHours,
    methodId = "practice_problems",
    teachingQuality = 1.0,
    sleepHours = 56,
    sleepDebt = 0,
    peerAbility = 50
  }) {
    const method = STUDY_METHODS[methodId] || STUDY_METHODS.practice_problems;
    const sleepImpact = TimeAllocationEngine.calculateSleepImpact(sleepHours, sleepDebt);
    const ability = this.computeAbilityForSkill(skillKey, innateAttributes);

    // Effective study time with fatigue
    const effectiveHoursWithFatigue = TimeAllocationEngine.calculateFatigueIntegral(
      studyHours,
      traits.focus * sleepImpact.focusMultiplier,
      traits.discipline
    );
    const procrastinationFriction = 1.0 - (traits.procrastination / 200);
    const focusRatio = (traits.focus * sleepImpact.focusMultiplier) / 100;
    const effectiveStudyTime = effectiveHoursWithFatigue * procrastinationFriction * focusRatio;

    // Group study peer modulation
    let methodEff = method.knowledgeEff;
    if (method.id === "group_study") {
      const playerSkill = currentSkillLevel || 40;
      const ratio = peerAbility / Math.max(10, playerSkill);
      methodEff = clamp(0.80 + 0.45 * ratio, 0.4, 1.6);
      if (traits.conscientiousness < 40) methodEff *= 0.75;
    }

    const BASE_LEARNING_CONSTANT = 0.85;
    // Diminishing returns headroom
    const headroomFactor = Math.pow(Math.max(0, 1.0 - (currentSkillLevel / 100)), 0.65);

    const knowledgeGain = BASE_LEARNING_CONSTANT *
      ability *
      teachingQuality *
      effectiveStudyTime *
      methodEff *
      sleepImpact.learningEfficiency *
      headroomFactor;

    const examTechGain = (effectiveStudyTime * 0.15) * method.examTechEff * sleepImpact.focusMultiplier;
    const newSkillLevel = clamp(currentSkillLevel + knowledgeGain, 0, 100);

    return {
      skillKey,
      previousSkillLevel: currentSkillLevel,
      newSkillLevel: Number(newSkillLevel.toFixed(2)),
      knowledgeGain: Number(knowledgeGain.toFixed(2)),
      examTechGain: Number(examTechGain.toFixed(2)),
      sleepImpact,
      effectiveStudyHours: Number(effectiveStudyTime.toFixed(1))
    };
  }

  // Exam & Assignment Performance Evaluation with Yerkes-Dodson Stress
  static simulateAssessment({
    assessmentType = "midterm", // "homework", "quiz", "midterm", "project", "final_exam"
    subjectKnowledge = 70,
    examTechnique = 50,
    innateAttributes,
    traits,
    stressLevel = 40,
    sleepHours = 56,
    sleepDebt = 0
  }) {
    const weights = {
      homework:   { knowledge: 0.40, technique: 0.10, effort: 0.50, sigma: 3.0 },
      quiz:       { knowledge: 0.70, technique: 0.20, effort: 0.10, sigma: 4.5 },
      midterm:    { knowledge: 0.55, technique: 0.35, effort: 0.10, sigma: 5.5 },
      project:    { knowledge: 0.40, technique: 0.15, effort: 0.45, sigma: 4.0 },
      final_exam: { knowledge: 0.55, technique: 0.35, effort: 0.10, sigma: 6.0 }
    }[assessmentType] || { knowledge: 0.55, technique: 0.35, effort: 0.10, sigma: 5.0 };

    const effort = (traits.ambition * 0.5 + traits.discipline * 0.5);
    const baseCore = (
      weights.knowledge * subjectKnowledge +
      weights.technique * examTechnique +
      weights.effort * effort
    );

    // Sleep condition
    const sleepFactor = clamp((sleepHours / 56) * (1.0 - (sleepDebt / 100)), 0.35, 1.0);

    // Yerkes-Dodson Stress Curve & Exam Temperament
    const excessStress = Math.max(0, stressLevel - traits.stressTolerance);
    const chokingVulnerability = 1.0 - (traits.examTemperament / 100);
    const stressPenalty = (excessStress / 100) * chokingVulnerability * 0.40;
    const arousalFactor = clamp(1.0 - stressPenalty, 0.45, 1.05);

    const condition = sleepFactor * arousalFactor;

    // Consistency reduces variance noise
    const calibratedSigma = weights.sigma * (1.0 - (traits.consistency / 200)) * (1.0 - (examTechnique / 250));
    const noise = randomGaussian(0, calibratedSigma);

    const finalScore = clamp(Math.round((baseCore * condition) + noise), 0, 100);

    return {
      assessmentType,
      score: finalScore,
      baseCore: Math.round(baseCore),
      conditionMultiplier: Number(condition.toFixed(2)),
      noiseDelta: Number(noise.toFixed(1)),
      chokedUnderPressure: stressPenalty > 0.15,
      sleepDeprivedImpression: sleepFactor < 0.80
    };
  }

  // Course Grade Compilation (HW 15%, Quizzes 15%, Midterm 30%, Project 15%, Final 25%)
  static calculateCourseGrade(components) {
    const weights = { homework: 0.15, quizzes: 0.15, midterm: 0.30, project: 0.15, finalExam: 0.25 };
    let totalScore = 0;
    let totalWeight = 0;

    for (const [key, weight] of Object.entries(weights)) {
      if (components[key] !== undefined && components[key] !== null) {
        totalScore += components[key] * weight;
        totalWeight += weight;
      }
    }

    const pct = totalWeight > 0 ? totalScore / totalWeight : 0;
    let gpa = 0.0;
    let letter = "F";

    if (pct >= 93) { gpa = 4.0; letter = "A"; }
    else if (pct >= 90) { gpa = 3.7; letter = "A-"; }
    else if (pct >= 87) { gpa = 3.3; letter = "B+"; }
    else if (pct >= 83) { gpa = 3.0; letter = "B"; }
    else if (pct >= 80) { gpa = 2.7; letter = "B-"; }
    else if (pct >= 77) { gpa = 2.3; letter = "C+"; }
    else if (pct >= 73) { gpa = 2.0; letter = "C"; }
    else if (pct >= 70) { gpa = 1.7; letter = "C-"; }
    else if (pct >= 60) { gpa = 1.0; letter = "D"; }
    else { gpa = 0.0; letter = "F"; }

    return {
      percentage: Number(pct.toFixed(1)),
      gpa,
      letter
    };
  }

  // Grade Trajectory & Trend Analysis
  static analyzeGradeTrend(scores = []) {
    if (scores.length < 2) return { status: "Stable", velocity: 0 };
    let deltas = [];
    for (let i = 1; i < scores.length; i++) {
      deltas.push(scores[i] - scores[i - 1]);
    }
    const avgVelocity = deltas.reduce((a, b) => a + b, 0) / deltas.length;
    const latest = scores[scores.length - 1];

    let trajectory = "Stable";
    if (avgVelocity > 2.5) trajectory = "Accelerating Upward";
    else if (avgVelocity > 0.8) trajectory = "Improving";
    else if (avgVelocity < -2.5) trajectory = "In Decline";
    else if (avgVelocity < -0.8) trajectory = "Slipping";
    else if (latest >= 90) trajectory = "Consistently High";
    else if (latest < 65) trajectory = "In Academic Crisis";

    return {
      trajectory,
      velocity: Number(avgVelocity.toFixed(2)),
      latestScore: latest
    };
  }
}

// 5. BACKWARD COMPATIBILITY ADAPTER
export function calculateLegacySmarts(innate, skills, traits) {
  const innateVals = Object.values(innate || {});
  const innateAvg = innateVals.length ? innateVals.reduce((a, b) => a + b, 0) / innateVals.length : 50;

  const skillVals = Object.values(skills || {});
  const skillAvg = skillVals.length ? skillVals.reduce((a, b) => a + b, 0) / skillVals.length : 20;

  const traitsAvg = traits ? ((traits.focus || 50) + (traits.discipline || 50) + (traits.conscientiousness || 50)) / 3 : 50;

  const composite = (innateAvg * 0.35) + (skillAvg * 0.45) + (traitsAvg * 0.20);
  return Math.round(clamp(composite, 1, 100));
}
