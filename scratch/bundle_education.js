const fs = require('fs');

const targetPath = '/Users/tannmaybaid/Desktop/Life Simulator Game/js/game_engine.js';
let content = fs.readFileSync(targetPath, 'utf8');

// 1. DATA TO INJECT (Before // --- 3. DATA: CORPORATE CAREER TRACKS ---)
const dataMarker = '// --- 3. DATA: CORPORATE CAREER TRACKS ---';
const dataMarkerIdx = content.indexOf(dataMarker);
if (dataMarkerIdx === -1) {
  console.error('Data marker not found!');
  process.exit(1);
}

const educationDataCode = `// --- 2B. DATA: EDUCATION, COGNITION, CLUBS & JOBS ---
  const INNATE_ATTRIBUTES_SPEC = {
    quantitative: { name: "Quantitative Reasoning", desc: "Mental calculation, numerical intuition, symbolic manipulation" },
    verbal: { name: "Verbal Reasoning", desc: "Vocabulary breadth, syntactic parsing, semantic nuance and rhetoric" },
    spatial: { name: "Spatial Reasoning", desc: "2D/3D mental rotation, geometric topology, visual architecture" },
    workingMemory: { name: "Working Memory", desc: "Prefrontal N-back buffer capacity, live registers during multi-step proofs" },
    longTermMemory: { name: "Long-Term Memory", desc: "Consolidation durability, semantic retrieval stability over years" },
    processingSpeed: { name: "Processing Speed", desc: "Symbol inspection time, rapid test-taking reaction velocity" },
    patternRecognition: { name: "Pattern Recognition", desc: "Inductive discovery, sequence inference, anomaly detection" },
    creativity: { name: "Creativity", desc: "Divergent ideation, counter-intuitive connections, novel solutions" },
    abstractReasoning: { name: "Abstract Reasoning", desc: "Fluid intelligence (Gf), structural analogies, first-principles logic" }
  };

  const LEARNED_SKILLS_SPEC = {
    algebra: { name: "Algebra", category: "math", icon: "📐" },
    calculus: { name: "Calculus", category: "math", icon: "∫" },
    statistics: { name: "Statistics & Probability", category: "math", icon: "📊" },
    writing: { name: "Essay Writing", category: "humanities", icon: "✍️" },
    grammar: { name: "Grammar & Syntax", category: "humanities", icon: "📝" },
    economics: { name: "Economics", category: "social", icon: "📈" },
    physics: { name: "Physics", category: "science", icon: "⚛️" },
    chemistry: { name: "Chemistry", category: "science", icon: "🧪" },
    biology: { name: "Biology & Life Sciences", category: "science", icon: "🧬" },
    history: { name: "History & World Affairs", category: "humanities", icon: "🏛️" },
    coding: { name: "Computer Science & Coding", category: "tech", icon: "💻" },
    research: { name: "Academic Research & Synthesis", category: "interdisciplinary", icon: "🔍" },
    presentation: { name: "Public Speaking & Debate", category: "communication", icon: "🎤" }
  };

  const COGNITIVE_AFFINITIES = {
    algebra:      { abstractReasoning: 0.35, quantitative: 0.30, workingMemory: 0.20, patternRecognition: 0.15 },
    calculus:     { abstractReasoning: 0.35, quantitative: 0.30, spatial: 0.20, workingMemory: 0.15 },
    statistics:   { quantitative: 0.35, patternRecognition: 0.30, abstractReasoning: 0.20, workingMemory: 0.15 },
    writing:      { verbal: 0.40, creativity: 0.30, longTermMemory: 0.20, workingMemory: 0.10 },
    grammar:      { verbal: 0.45, patternRecognition: 0.25, workingMemory: 0.20, processingSpeed: 0.10 },
    economics:    { abstractReasoning: 0.30, quantitative: 0.25, verbal: 0.25, patternRecognition: 0.20 },
    physics:      { spatial: 0.30, quantitative: 0.30, abstractReasoning: 0.25, workingMemory: 0.15 },
    chemistry:    { longTermMemory: 0.30, abstractReasoning: 0.25, spatial: 0.25, quantitative: 0.20 },
    biology:      { longTermMemory: 0.45, patternRecognition: 0.25, verbal: 0.15, workingMemory: 0.15 },
    history:      { longTermMemory: 0.40, verbal: 0.30, abstractReasoning: 0.15, patternRecognition: 0.15 },
    coding:       { patternRecognition: 0.30, abstractReasoning: 0.30, workingMemory: 0.25, quantitative: 0.15 },
    research:     { abstractReasoning: 0.30, verbal: 0.25, longTermMemory: 0.25, creativity: 0.20 },
    presentation: { verbal: 0.35, creativity: 0.30, processingSpeed: 0.20, workingMemory: 0.15 }
  };

  const HIGH_SCHOOL_CLUBS = [
    {
      id: "debate_society",
      name: "Varsity Debate Society (Parliamentary & World Schools)",
      category: "speech",
      icon: "🎙️",
      trainedSkills: ["presentation", "writing", "economics"],
      trainedTraits: ["confidence", "examTemperament", "focus"],
      weeklyHours: 8,
      prestigeTier: "state_powerhouse",
      coachQuality: 78,
      baseBudgetUSD: 4500,
      roles: ["Novice Debater", "First Speaker", "Lead Rebuttalist", "Vice President", "Team Captain"],
      signatureTourney: "TOC National Debate Invitational"
    },
    {
      id: "robotics_vex",
      name: "FIRST / VEX Competitive Robotics Squad",
      category: "engineering",
      icon: "🤖",
      trainedSkills: ["coding", "physics", "algebra"],
      trainedTraits: ["discipline", "conscientiousness", "creativity"],
      weeklyHours: 10,
      prestigeTier: "district_contender",
      coachQuality: 82,
      baseBudgetUSD: 9000,
      roles: ["Pit Crew Assistant", "CAD Modeler", "Autonomous Coder", "Driver", "Chief Engineer & Captain"],
      signatureTourney: "VEX World Robotics Championship"
    },
    {
      id: "school_newspaper",
      name: "The Student Chronicle (Investigative Journalism)",
      category: "media",
      icon: "📰",
      trainedSkills: ["writing", "grammar", "research"],
      trainedTraits: ["curiosity", "conscientiousness", "focus"],
      weeklyHours: 6,
      prestigeTier: "grassroots",
      coachQuality: 70,
      baseBudgetUSD: 2000,
      roles: ["Staff Reporter", "Opinion Columnist", "Section Editor", "Managing Editor", "Editor-in-Chief"],
      signatureTourney: "National Scholastic Press Award"
    },
    {
      id: "model_un",
      name: "Model United Nations (MUN Delegation)",
      category: "diplomacy",
      icon: "🌐",
      trainedSkills: ["presentation", "research", "history"],
      trainedTraits: ["confidence", "ambition", "stressTolerance"],
      weeklyHours: 6,
      prestigeTier: "state_powerhouse",
      coachQuality: 75,
      baseBudgetUSD: 3500,
      roles: ["Delegate", "Crisis Specialist", "Bloc Leader", "Deputy Secretary", "Secretary-General"],
      signatureTourney: "Harvard National MUN Invitational"
    },
    {
      id: "varsity_athletics",
      name: "Varsity Cross-Country & Track Squad",
      category: "athletics",
      icon: "🏃",
      trainedSkills: ["physics"],
      trainedTraits: ["discipline", "stressTolerance", "consistency"],
      weeklyHours: 12,
      prestigeTier: "state_powerhouse",
      coachQuality: 85,
      baseBudgetUSD: 6000,
      roles: ["JV Runner", "Varsity Scorer", "Lead Anchor", "Co-Captain", "Varsity Team Captain"],
      signatureTourney: "State Interscholastic Championship Cup"
    },
    {
      id: "olympiad_squad",
      name: "Mathematics & Science Olympiad Guild",
      category: "stem_elite",
      icon: "🏆",
      trainedSkills: ["calculus", "physics", "chemistry"],
      trainedTraits: ["focus", "abstractReasoning", "discipline"],
      weeklyHours: 10,
      prestigeTier: "national_dynasty",
      coachQuality: 92,
      baseBudgetUSD: 5000,
      roles: ["Problem Solver", "AIME Qualifier", "USAMO / RMO Finalist", "Team Leader", "National Camp Candidate"],
      signatureTourney: "International Mathematical Olympiad (IMO)"
    },
    {
      id: "student_gov",
      name: "Student Government Association (SGA)",
      category: "politics",
      icon: "🏛️",
      trainedSkills: ["presentation", "economics"],
      trainedTraits: ["ambition", "confidence", "stressTolerance"],
      weeklyHours: 6,
      prestigeTier: "grassroots",
      coachQuality: 65,
      baseBudgetUSD: 12000,
      roles: ["Class Representative", "Treasurer", "Secretary", "Vice President", "Student Body President"],
      signatureTourney: "State Leadership Delegation Forum"
    }
  ];

  const STUDENT_JOBS_CATALOG = [
    { id: "lawn_and_yard", title: "Neighborhood Lawn Care & Yard Work", minAge: 12, maxAge: 15, baseHourlyUSD: 8.0, weeklyHoursMax: 10, desc: "Mowing lawns & raking leaves." },
    { id: "pet_sitting", title: "Pet Sitting & Dog Walker", minAge: 12, maxAge: 15, baseHourlyUSD: 9.0, weeklyHoursMax: 8, desc: "Walking neighborhood dogs." },
    { id: "junior_math_tutor", title: "Peer Math & Reading Tutor", minAge: 13, maxAge: 16, baseHourlyUSD: 14.0, minSmarts: 75, weeklyHoursMax: 8, desc: "Tutoring primary school kids." },
    { id: "cafe_barista", title: "Third-Wave Coffee Barista & Cashier", minAge: 15, maxAge: 18, baseHourlyUSD: 13.5, weeklyHoursMax: 16, desc: "Pulling espresso shots & handling front register." },
    { id: "retail_apparel", title: "Retail Stock Associate & Sales Clerk", minAge: 15, maxAge: 18, baseHourlyUSD: 12.5, weeklyHoursMax: 15, desc: "Inventory replenishment & customer assistance." },
    { id: "fast_food_crew", title: "Fast-Food Crew Member & Fry Cook", minAge: 15, maxAge: 18, baseHourlyUSD: 12.0, weeklyHoursMax: 20, desc: "Kitchen line assembly & sanitation." },
    { id: "boutique_office_intern", title: "Boutique Law / Accounting Office Clerk", minAge: 17, maxAge: 19, baseHourlyUSD: 18.0, minSmarts: 70, weeklyHoursMax: 15, desc: "Filing legal motions & intake summaries." },
    { id: "tech_qa_tester", title: "Junior Web QA Tester & Script Writer", minAge: 17, maxAge: 19, baseHourlyUSD: 24.0, minSmarts: 80, weeklyHoursMax: 15, desc: "Executing automated browser test suites." },
    { id: "freelance_graphic_dev", title: "Freelance UI & Web Designer", minAge: 16, maxAge: 19, baseHourlyUSD: 22.0, minSmarts: 75, weeklyHoursMax: 12, desc: "Designing landing pages & marketing collateral." }
  ];

  const EXAM_COHORTS = {
    jee_main: { id: "jee_main", name: "JEE Main (Engineering)", country: "india", totalCandidates: 1450000, minScore: -75, maxScore: 300, mu: 52.0, sigma: 29.5, gamma: 1.0, streamReq: "pcm" },
    neet_ug: { id: "neet_ug", name: "NEET UG (Medical Entrance)", country: "india", totalCandidates: 2400000, minScore: 0, maxScore: 720, mu: 215.0, sigma: 82.5, gamma: 1.60, streamReq: "pcb" },
    gaokao: { id: "gaokao", name: "National Gaokao (高考)", country: "china", totalCandidates: 12910000, minScore: 0, maxScore: 750, mu: 410.0, sigma: 78.0, gamma: 1.35, streamReq: "any" },
    sat: { id: "sat", name: "SAT Reasoning Test", country: "usa", totalCandidates: 1900000, minScore: 400, maxScore: 1600, mu: 1050.0, sigma: 102.0, gamma: 1.0, streamReq: "any" },
    act: { id: "act", name: "ACT Composite", country: "usa", totalCandidates: 1400000, minScore: 1, maxScore: 36, mu: 20.2, sigma: 2.9, gamma: 1.0, streamReq: "any" }
  };

  const STUDY_METHODS = {
    rereading: { id: "rereading", name: "Passive Rereading", knowledgeEff: 0.60, examTechEff: 0.30, desc: "Low friction; creates quick illusion of familiarity" },
    flashcards: { id: "flashcards", name: "Spaced Repetition (Anki)", knowledgeEff: 1.10, examTechEff: 0.60, desc: "High retention for vocab, biology & facts" },
    practice_problems: { id: "practice_problems", name: "Practice Problem Sets", knowledgeEff: 1.30, examTechEff: 1.10, desc: "Mandatory for Math, Physics & Coding intuition" },
    past_papers: { id: "past_papers", name: "Timed Past Exam Papers", knowledgeEff: 0.90, examTechEff: 1.40, desc: "Builds exam speed, timing & lowers panic" },
    active_recall: { id: "active_recall", name: "Active Recall (Feynman)", knowledgeEff: 1.35, examTechEff: 0.90, desc: "Explaining from memory; deep conceptual mastery" },
    group_study: { id: "group_study", name: "Collaborative Study Group", knowledgeEff: 1.00, examTechEff: 0.70, desc: "Morale buffer; shares insights and buffers stress" },
    mock_exams: { id: "mock_exams", name: "Full Proctored Mock Exam", knowledgeEff: 0.80, examTechEff: 1.30, desc: "Diagnostic test yielding predictive percentile bands" }
  };
\n  `;

content = content.substring(0, dataMarkerIdx) + educationDataCode + content.substring(dataMarkerIdx);

// 2. INJECT SYSTEM LOGIC BEFORE // --- GAAP ACCRUAL CORPORATE FINANCE & WORKING CAPITAL ENGINE ---
const sysMarker = '// --- GAAP ACCRUAL CORPORATE FINANCE & WORKING CAPITAL ENGINE ---';
const sysMarkerIdx = content.indexOf(sysMarker);
if (sysMarkerIdx === -1) {
  console.error('System marker not found!');
  process.exit(1);
}

const educationSystemCode = `// --- 2C. COGNITIVE & SCHOOLING SYSTEMS ---
  function calculateLegacySmarts(innate, skills, traits) {
    const innateVals = Object.values(innate || {});
    const innateAvg = innateVals.length ? innateVals.reduce((a, b) => a + b, 0) / innateVals.length : 50;
    const skillVals = Object.values(skills || {});
    const skillAvg = skillVals.length ? skillVals.reduce((a, b) => a + b, 0) / skillVals.length : 20;
    const traitsAvg = traits ? ((traits.focus || 50) + (traits.discipline || 50) + (traits.conscientiousness || 50)) / 3 : 50;
    return Math.round(Math.min(100, Math.max(1, (innateAvg * 0.35) + (skillAvg * 0.45) + (traitsAvg * 0.20))));
  }

  function calculateCohortPercentile(score, examKey) {
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

  function runProctoredMockExam(character, examKey, mockNumber = 1) {
    const cohort = EXAM_COHORTS[examKey] || EXAM_COHORTS.sat;
    const smarts = character.stats.smarts || 75;
    const normSmarts = smarts / 100;
    const baseTarget = cohort.minScore + (cohort.maxScore - cohort.minScore) * (0.30 * normSmarts + 0.35 * Math.pow(normSmarts, 1.4) + 0.25);
    const noise = (Math.random() - 0.5) * 2 * (cohort.sigma * 0.35);
    const observedScore = Math.max(cohort.minScore, Math.min(cohort.maxScore, Math.round(baseTarget + noise)));
    const lowScore = Math.max(cohort.minScore, observedScore - Math.round(cohort.sigma * 0.25));
    const highScore = Math.min(cohort.maxScore, observedScore + Math.round(cohort.sigma * 0.25));
    const lowStat = calculateCohortPercentile(lowScore, examKey);
    const highStat = calculateCohortPercentile(highScore, examKey);
    const curStat = calculateCohortPercentile(observedScore, examKey);
    return {
      mockNumber,
      observedScore,
      currentPercentile: curStat.percentile,
      currentRank: curStat.estimatedRank,
      formattedReport: \`Mock #\${mockNumber}: Score \${observedScore}/\${cohort.maxScore} | Est. %ile: \${lowStat.percentile.toFixed(1)}% - \${highStat.percentile.toFixed(1)}% | Projected Rank: ~\${highStat.estimatedRank.toLocaleString()} - ~\${lowStat.estimatedRank.toLocaleString()}\`
    };
  }

  function evaluateUSAdmissionsDossier(applicant, university) {
    const gpaWeight = ((applicant.gpaWeighted || 3.8) / 5.0) * 40;
    const satWeight = (((applicant.satScore || 1200) - 400) / 1200) * 40;
    const rigorWeight = (applicant.rigorIndex || 0.75) * 20;
    const dAcademic = Math.max(1.0, Math.min(6.0, 7.0 - ((gpaWeight + satWeight + rigorWeight) / 17.0)));
    let dExtracurricular = applicant.ecTier ? (applicant.ecTier * 1.3) : 3.5;
    if (applicant.hasSpike) dExtracurricular -= 0.5;
    const dRecommendations = Math.max(1.0, Math.min(6.0, 7.0 - ((applicant.lorScore || 70) / 17.0)));
    const dEssay = Math.max(1.0, Math.min(6.0, 1.2 + 4.5 * Math.exp(-0.75 * (applicant.essayDrafts || 1))));
    let hookBonus = applicant.isFirstGen ? 0.35 : 0;
    const r1 = (0.35 * dAcademic + 0.30 * dExtracurricular + 0.15 * dRecommendations + 0.20 * dEssay) + (Math.random() - 0.5) * 0.3 - hookBonus;
    const r2 = (0.35 * dAcademic + 0.30 * dExtracurricular + 0.15 * dRecommendations + 0.20 * dEssay) + (Math.random() - 0.5) * 0.3 - hookBonus;
    const composite = (r1 + r2) / 2.0;
    const admitCutoff = (university.tier || 1) === 1 ? 1.85 : 2.70;
    return {
      decision: composite <= admitCutoff ? "ADMIT" : (composite <= admitCutoff + 0.45 ? "WAITLIST" : "REJECT"),
      compositeScore: Math.round(composite * 100) / 100,
      reader1: Math.round(r1 * 100) / 100,
      reader2: Math.round(r2 * 100) / 100
    };
  }

  function generateRecommendationLetter(teacher, studentName = "the student") {
    const imp = teacher.impression || { intellectScore: 70, workEthicScore: 70, reliabilityScore: 70, rapport: 70 };
    const composite = (imp.intellectScore * 0.35) + (imp.workEthicScore * 0.30) + (imp.reliabilityScore * 0.20) + ((imp.rapport || 50) * 0.15);
    let enthusiasmTier = "lukewarm";
    let hiddenScore = 50;
    let verbalResponse = "";
    if (composite >= 85) {
      enthusiasmTier = "one_of_the_finest";
      hiddenScore = 95;
      verbalResponse = \`"It will be an absolute honor, \${studentName}. In my career, minds like yours come once in a decade. You have my unconditional backing."\`;
    } else if (composite >= 72) {
      enthusiasmTier = "highest_recommendation";
      hiddenScore = 85;
      verbalResponse = \`"I would be delighted to write your recommendation. You have been one of the standout contributors in my class all year."\`;
    } else if (composite >= 58) {
      enthusiasmTier = "enthusiastic";
      hiddenScore = 72;
      verbalResponse = \`"Of course. I can certainly attest to your solid performance and steady work ethic in my course."\`;
    } else {
      enthusiasmTier = "lukewarm";
      hiddenScore = 52;
      verbalResponse = \`"I can submit the standard form, yes. Given our limited interactions, I can only report your exam scores."\`;
    }
    return { requested: true, agreed: composite >= 38, submitted: true, hiddenScore, enthusiasmTier, verbalResponse };
  }

  function resolveClubMatch(club, stats, tier = "state") {
    const oppBase = { school: 45, district: 60, state: 75, national: 88 }[tier] || 65;
    const oppScore = oppBase + Math.floor(Math.random() * 12) - 4;
    const myScore = Math.round((stats.smarts * 0.40) + ((club.coachQuality || 75) * 0.30) + ((club.weeklyHours || 6) * 2.5) + (Math.random() * 10));
    return {
      victory: myScore >= oppScore,
      playerScore: myScore,
      opponentScore: oppScore,
      opponentName: "Oakridge Prep Squad"
    };
  }

  function iterateEssay(currentEssay, reviewer = "self") {
    let { draftStage = 1, polish = 40, authenticity = 85 } = currentEssay;
    draftStage = Math.min(4, draftStage + 1);
    let polishGain = 10;
    let authDelta = -2;
    if (reviewer === "consultant") {
      polishGain = 20;
      authDelta = -14;
    } else if (reviewer === "teacher") {
      polishGain = 14;
      authDelta = -3;
    } else {
      polishGain = 8;
      authDelta = +2;
    }
    return {
      ...currentEssay,
      draftStage,
      polish: Math.min(99, polish + polishGain),
      authenticity: Math.min(100, Math.max(15, authenticity + authDelta))
    };
  }

  function evaluateParentNegotiation(fam, expenseName, costUSD, gpa = 3.8) {
    const disposable = fam.disposableCashUSD || 5000;
    const affordScore = Math.min(40, (disposable / Math.max(1, costUSD)) * 15);
    const generScore = ((fam.father?.generosity || 60) * 0.3);
    const academicScore = (gpa / 4.0) * ((fam.father?.academicExpectations || 70) / 100) * 20;
    const total = affordScore + generScore + academicScore + 8;
    if (total >= 68) {
      return { verdict: "ACCEPTED_FULL", parentPct: 100, quote: '"Education is our family\'s highest priority. We will fund this in full. Make us proud."' };
    } else if (total >= 45) {
      return { verdict: "COMPROMISE_HALF", parentPct: 50, quote: '"It\'s a large expense right now. We will pay half, provided you contribute the rest from your student job."' };
    } else {
      return { verdict: "REFUSED", parentPct: 0, quote: '"Money does not grow on trees. We simply cannot justify this expense right now."' };
    }
  }

\n  `;

content = content.substring(0, sysMarkerIdx) + educationSystemCode + content.substring(sysMarkerIdx);

// 3. INJECT INITIAL HIGH SCHOOL & COGNITION STATE INTO G
const gMarker = 'childhood: {';
const gMarkerIdx = content.indexOf(gMarker);
if (gMarkerIdx !== -1) {
  const cognitionInitCode = `cognition: {
      innate: { quantitative: 58, verbal: 52, spatial: 50, workingMemory: 52, longTermMemory: 54, processingSpeed: 52, patternRecognition: 55, creativity: 50, abstractReasoning: 54 },
      skills: { algebra: 10, calculus: 0, statistics: 0, writing: 20, grammar: 25, economics: 0, physics: 5, chemistry: 5, biology: 10, history: 15, coding: 0, research: 5, presentation: 15 },
      traits: { focus: 55, discipline: 52, conscientiousness: 55, examTemperament: 54, consistency: 52, procrastination: 40, stressTolerance: 55, curiosity: 60, ambition: 55, confidence: 55 }
    },
    highSchool: {
      currentTermGPA: 3.82,
      classRankDecile: 5,
      activeStudyMethod: "practice_problems",
      timeAllocation: { sleep: 56, schoolClasses: 35, commute: 7, mealsBasicLife: 14, homework: 10, examCoaching: 0, activitiesClubs: 8, friendsSocial: 14, partTimeWork: 0, leisureGaming: 14, selfStudy: 10 },
      enrolledSubjects: [
        { id: "math", name: "AP Calculus / Advanced Math", mastery: 74, teacherStrictness: 65, currentGrade: 88, letterGrade: "B+", icon: "📐" },
        { id: "physics", name: "Physics & Mechanics", mastery: 70, teacherStrictness: 60, currentGrade: 86, letterGrade: "B", icon: "⚛️" },
        { id: "chemistry", name: "Chemistry", mastery: 68, teacherStrictness: 70, currentGrade: 82, letterGrade: "B-", icon: "🧪" },
        { id: "english", name: "English Literature & Composition", mastery: 82, teacherStrictness: 50, currentGrade: 94, letterGrade: "A", icon: "📖" },
        { id: "cs", name: "Computer Science & Logic", mastery: 78, teacherStrictness: 45, currentGrade: 92, letterGrade: "A-", icon: "💻" }
      ],
      teachers: [
        { id: "t_math", name: "Dr. Alistair Vance", subjectName: "AP Calculus", gradingStrictness: 75, impression: { primaryTag: "curious", intellectScore: 78, workEthicScore: 72, reliabilityScore: 80, rapport: 75 }, lor: { submitted: false } },
        { id: "t_chem", name: "Mrs. Davenport", subjectName: "Chemistry", gradingStrictness: 68, impression: { primaryTag: "hardworking", intellectScore: 65, workEthicScore: 84, reliabilityScore: 85, rapport: 70 }, lor: { submitted: false } },
        { id: "t_eng", name: "Mr. Harrison", subjectName: "English Lit", gradingStrictness: 55, impression: { primaryTag: "brilliant", intellectScore: 88, workEthicScore: 80, reliabilityScore: 90, rapport: 85 }, lor: { submitted: false } }
      ],
      classmates: [
        { id: "p1", name: "Neha Patel", archetype: "Grindset Gunner", smarts: 88, friendship: 45, isStudyPartner: true },
        { id: "p2", name: "Julian Sterling", archetype: "Varsity Athlete", smarts: 58, friendship: 60, isStudyPartner: false },
        { id: "p3", name: "Chloe Chen", archetype: "Artsy Rebel", smarts: 72, friendship: 50, isStudyPartner: false }
      ],
      clubs: [
        { id: "debate_society", name: "Varsity Debate Society", icon: "🎙️", role: "Lead Rebuttalist", coachQuality: 80, weeklyHours: 6 },
        { id: "robotics_vex", name: "VEX Robotics Squad", icon: "🤖", role: "CAD Modeler", coachQuality: 82, weeklyHours: 6 }
      ],
      activeJob: null,
      activeEssay: { title: "Common App Personal Statement", draftStage: 1, polish: 42, authenticity: 88, hoursInvested: 4 },
      familyEconomy: {
        disposableCashUSD: 6200,
        father: { generosity: 65, strictness: 50, academicExpectations: 75, relationship: 80 },
        mother: { generosity: 70, strictness: 45, academicExpectations: 70, relationship: 85 }
      },
      awards: ["High Honor Roll (Term 1)"]
    },\n    `;
  content = content.substring(0, gMarkerIdx) + cognitionInitCode + content.substring(gMarkerIdx);
}

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully written data, systems and state into game_engine.js');
