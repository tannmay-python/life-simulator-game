// ============================================================================
// File: js/systems/social_school_engine.js
// Description: Teachers, Classmates, Clubs Tournaments, Essay Studio & Family Economy
// ============================================================================

// 1. MULTI-CURRENCY & PURCHASING POWER PARITY (PPP) ENGINE
export const CURRENCY_REGISTRY = {
  INR: { symbol: "₹", name: "Indian Rupee", nominalToUSD: 85.0, pppRatio: 0.32, formatLocale: "en-IN" },
  USD: { symbol: "$", name: "US Dollar", nominalToUSD: 1.0, pppRatio: 1.00, formatLocale: "en-US" },
  GBP: { symbol: "£", name: "British Pound", nominalToUSD: 0.78, pppRatio: 0.94, formatLocale: "en-GB" },
  EUR: { symbol: "€", name: "Euro", nominalToUSD: 0.92, pppRatio: 0.88, formatLocale: "de-DE" },
  JPY: { symbol: "¥", name: "Japanese Yen", nominalToUSD: 155.0, pppRatio: 0.72, formatLocale: "ja-JP" }
};

export function convertCurrency(amountUSD, targetCurrency = "USD", usePPP = false) {
  const curr = CURRENCY_REGISTRY[targetCurrency] || CURRENCY_REGISTRY.USD;
  if (!usePPP) {
    const nominal = amountUSD * curr.nominalToUSD;
    return {
      raw: Math.round(nominal),
      formatted: `${curr.symbol}${Math.round(nominal).toLocaleString(curr.formatLocale)}`
    };
  } else {
    const pppAmount = (amountUSD * curr.nominalToUSD) * curr.pppRatio;
    return {
      raw: Math.round(pppAmount),
      formatted: `${curr.symbol}${Math.round(pppAmount).toLocaleString(curr.formatLocale)}`
    };
  }
}

// 2. PROCEDURAL TEACHER GENERATOR & IMPRESSION MATRIX
const TEACHER_NAMES_BY_COUNTRY = {
  india: ["Dr. Alistair Vance", "Mrs. Sunita Sharma", "Mr. Rajesh Kulkarni", "Dr. Meenakshi Sundaram", "Prof. Vikram Sen", "Ms. Ananya Roy"],
  usa: ["Dr. Eleanor Vance", "Mr. Robert Harrison", "Mrs. Patricia Miller", "Dr. Marcus Chen", "Ms. Sarah Jenkins", "Mr. David Kowalski"],
  uk: ["Dr. Arthur Pendelton", "Mrs. Fiona MacLeod", "Mr. Nigel Thorne", "Ms. Beatrice Crawford", "Dr. Giles Montgomery"],
  default: ["Dr. Sterling", "Mrs. Davenport", "Mr. Gallagher", "Ms. Tanaka", "Prof. Dupont"]
};

export function generateSchoolFaculty(countryId = "india") {
  const names = TEACHER_NAMES_BY_COUNTRY[countryId] || TEACHER_NAMES_BY_COUNTRY.default;
  const subjects = [
    { id: "mathematics", name: "Mathematics & Calculus" },
    { id: "physics", name: "Physics & Mechanics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "english", name: "English Literature" },
    { id: "economics", name: "Economics & Social Sci" },
    { id: "computerScience", name: "Computer Science" }
  ];

  return subjects.map((sub, idx) => {
    const name = names[idx % names.length];
    const knowledge = 65 + Math.floor(Math.random() * 32);
    const teachingAbility = 55 + Math.floor(Math.random() * 40);
    const strictness = 30 + Math.floor(Math.random() * 60);
    const temperaments = ["inspiring", "demanding", "formal", "eccentric", "cynical"];
    const temperament = temperaments[Math.floor(Math.random() * temperaments.length)];

    return {
      id: `teacher_${sub.id}`,
      name,
      subjectId: sub.id,
      subjectName: sub.name,
      subjectKnowledge: knowledge,
      teachingAbility,
      gradingStrictness: strictness,
      workloadHours: Math.round(3 + (strictness / 20)),
      temperament,
      impression: {
        intellectScore: 50,
        workEthicScore: 50,
        reliabilityScore: 50,
        classroomEtiquette: 70,
        rapport: 50,
        primaryTag: "average"
      },
      lor: {
        requested: false,
        agreed: false,
        submitted: false,
        hiddenScore: 0,
        enthusiasmTier: "unrequested",
        specificity: 0,
        verbalResponse: null
      }
    };
  });
}

export function resolveTeacherPrimaryTag(impression) {
  const { intellectScore, workEthicScore, reliabilityScore, classroomEtiquette, rapport } = impression;
  if (classroomEtiquette < 35) return "disruptive";
  if (reliabilityScore < 40 && workEthicScore < 45) return "unreliable";
  if (intellectScore >= 85 && workEthicScore >= 75) return "brilliant";
  if (workEthicScore >= 80) return "hardworking";
  if (intellectScore >= 75 && rapport >= 65) return "curious";
  if (workEthicScore < 45 && intellectScore < 45) return "invisible";
  return "average";
}

// 3. DYNAMIC RECOMMENDATION LETTER (LoR) ENGINE (FERPA Uncertainty)
export function generateRecommendationLetter(teacher, studentName = "the student") {
  const { impression } = teacher;
  const composite = (impression.intellectScore * 0.35) + 
                    (impression.workEthicScore * 0.30) + 
                    (impression.reliabilityScore * 0.20) + 
                    (impression.rapport * 0.15);

  let enthusiasmTier = "lukewarm";
  let hiddenScore = 50;
  let verbalResponse = "";
  let traits = [];

  if (composite >= 88) {
    enthusiasmTier = "one_of_the_finest";
    hiddenScore = 94 + Math.floor(Math.random() * 6);
    verbalResponse = `"It will be an absolute honor, ${studentName}. In my career, minds like yours come once in a decade. You have my unconditional backing."`;
    traits = ["intellectual_titan", "original_synthesizer", "peerless_curiosity"];
  } else if (composite >= 76) {
    enthusiasmTier = "highest_recommendation";
    hiddenScore = 82 + Math.floor(Math.random() * 10);
    verbalResponse = `"I would be delighted to write your recommendation. You have been one of the standout contributors in my class all year."`;
    traits = ["exceptionally_diligent", "academic_rigor", "reliable_collaborator"];
  } else if (composite >= 60) {
    enthusiasmTier = "enthusiastic";
    hiddenScore = 70 + Math.floor(Math.random() * 8);
    verbalResponse = `"Of course. I can certainly attest to your solid performance and steady work ethic in my course."`;
    traits = ["consistent_worker", "dependable", "well_prepared"];
  } else if (composite >= 42) {
    enthusiasmTier = "lukewarm";
    hiddenScore = 50 + Math.floor(Math.random() * 12);
    verbalResponse = `"I can submit the standard form, yes. Given our limited interactions, I can only report your exam scores."`;
    traits = ["satisfactory_attendance", "follows_instructions"];
  } else {
    enthusiasmTier = "reservations";
    hiddenScore = 25 + Math.floor(Math.random() * 15);
    verbalResponse = `"If you insist, I can file a letter, but I must be candid about missed deadlines. You may want to ask another teacher."`;
    traits = ["frequent_absences", "unmet_potential"];
  }

  const specificity = Math.min(100, Math.round(impression.rapport * 0.6 + composite * 0.4));

  return {
    requested: true,
    agreed: composite >= 38,
    submitted: true,
    hiddenScore,
    enthusiasmTier,
    specificity,
    mentionedTraits: traits,
    verbalResponse,
    confidentialSummary: `Confidential LoR: ${enthusiasmTier.toUpperCase()} (${hiddenScore}/100). Specificity: ${specificity}%.`
  };
}

// 4. PROCEDURAL CLASSMATES & PEER NETWORK
const PEER_FIRST_NAMES = ["Aarav", "Neha", "Rohan", "Priya", "Kabir", "Ananya", "Julian", "Chloe", "Marcus", "Emily", "Liam", "Zoe"];
const PEER_LAST_NAMES = ["Patel", "Sharma", "Verma", "Sterling", "Kowalski", "Chen", "Ito", "Dubois", "MacLeod", "Rao"];

export function generateClassmatesCohort(count = 12) {
  const archetypes = [
    { id: "grindset_gunner", name: "Grindset Gunner", baseSmarts: 85, basePop: 45, clique: "olympiad" },
    { id: "varsity_jock", name: "Varsity Athlete", baseSmarts: 55, basePop: 85, clique: "varsity" },
    { id: "chill_slacker", name: "Chill Slacker", baseSmarts: 50, basePop: 70, clique: "party_circuit" },
    { id: "artsy_rebel", name: "Artsy Rebel", baseSmarts: 65, basePop: 60, clique: "arts" },
    { id: "quiet_savant", name: "Quiet Savant", baseSmarts: 92, basePop: 35, clique: "olympiad" },
    { id: "wealthy_nepo", name: "Wealthy Legacy", baseSmarts: 60, basePop: 80, clique: "party_circuit" }
  ];

  const peers = [];
  for (let i = 0; i < count; i++) {
    const fn = PEER_FIRST_NAMES[i % PEER_FIRST_NAMES.length];
    const ln = PEER_LAST_NAMES[i % PEER_LAST_NAMES.length];
    const arch = archetypes[i % archetypes.length];

    peers.push({
      id: `peer_${i}_${fn.toLowerCase()}`,
      name: `${fn} ${ln}`,
      archetype: arch.name,
      clique: arch.clique,
      smarts: Math.min(99, Math.max(20, arch.baseSmarts + Math.floor(Math.random() * 16) - 8)),
      popularity: Math.min(99, Math.max(15, arch.basePop + Math.floor(Math.random() * 16) - 8)),
      friendship: 20 + Math.floor(Math.random() * 30),
      respect: 30 + Math.floor(Math.random() * 30),
      rivalry: Math.random() > 0.6 ? 30 + Math.floor(Math.random() * 40) : 0,
      isStudyPartner: false
    });
  }
  return peers;
}

// 5. EXTRACURRICULAR TOURNAMENT MATCH ENGINE
export function resolveClubTournamentMatch(playerClub, playerStats, tier = "state") {
  const schoolPrefixes = ["Oakridge Prep", "St. Xavier's", "Phillips Academy", "Delhi Public", "Raffles Institution", "Eton College"];
  const oppSchool = `${schoolPrefixes[Math.floor(Math.random() * schoolPrefixes.length)]}`;

  const tierBase = { school: 45, district: 60, state: 75, national: 88, international: 95 }[tier] || 65;
  const oppScore = tierBase + Math.floor(Math.random() * 14) - 5;

  const playerPower = (playerStats.smarts * 0.40) + 
                      (playerClub.coachQuality * 0.30) + 
                      (playerClub.weeklyHours * 2.5);
  const playScore = Math.round(playerPower + (Math.random() * 12));

  const victory = playScore >= oppScore;
  return {
    tier,
    victory,
    opponentName: oppSchool,
    playerScore: playScore,
    opponentScore: oppScore,
    margin: Math.abs(playScore - oppScore),
    mvp: victory && playerStats.smarts > 75
  };
}

// 6. MULTI-DRAFT ESSAY STUDIO ENGINE
export const ESSAY_PROMPTS = [
  { id: "overcoming_failure", title: "Lessons from Failure & Resilience", angle: "vulnerable_raw" },
  { id: "intellectual_curiosity", title: "An Unconventional Obsession or Field of Inquiry", angle: "intellectual_deep" },
  { id: "community_impact", title: "Meaningful Impact on Community or Family", angle: "humble_service" },
  { id: "cultural_identity", title: "Bridging Worlds & Cultural Perspective", angle: "unique_perspective" }
];

export function iterateEssayDraft(currentEssay, hoursInvested = 4, reviewSource = "teacher") {
  let { draftStage = 1, polish = 40, authenticity = 85, feedbackHistory = [] } = currentEssay;

  draftStage = Math.min(4, draftStage + 1);
  let polishGain = 12 + Math.floor(Math.random() * 8);
  let authDelta = -2;
  let critique = "";

  if (reviewSource === "consultant") {
    polishGain += 10;
    authDelta = -14; // Over-packaged trap!
    critique = "Consultant replaced conversational idioms with elevated academic prose. Highly polished, but risks sounding manufactured.";
  } else if (reviewSource === "teacher") {
    critique = "English teacher trimmed passive voice and sharpened the opening hook.";
  } else {
    polishGain = 8;
    authDelta = +2;
    critique = "Independent self-editing preserved raw authentic voice.";
  }

  polish = Math.min(99, Math.max(10, polish + polishGain));
  authenticity = Math.min(100, Math.max(15, authenticity + authDelta));

  feedbackHistory.push({
    stage: draftStage,
    reviewer: reviewSource,
    critique,
    polishDelta: polishGain,
    authDelta
  });

  return {
    ...currentEssay,
    draftStage,
    polish,
    authenticity,
    hoursInvested: (currentEssay.hoursInvested || 0) + hoursInvested,
    feedbackHistory
  };
}

// 7. FAMILY HOUSEHOLD ECONOMY & "WHO PAYS?" NEGOTIATION
export function generateFamilyEconomy(countryId = "india") {
  const isIndia = countryId === "india";
  const isUS = countryId === "usa";
  const curr = isIndia ? "INR" : (isUS ? "USD" : "GBP");

  const baseIncomeUSD = isIndia ? 28000 : (isUS ? 85000 : 65000);
  const baseWealthUSD = isIndia ? 140000 : (isUS ? 220000 : 180000);

  return {
    nativeCurrency: curr,
    annualHouseholdIncomeUSD: baseIncomeUSD,
    familyNetWorthUSD: baseWealthUSD,
    disposableCashUSD: Math.round(baseIncomeUSD * 0.18),
    father: {
      name: isIndia ? "Rajesh" : "Robert",
      generosity: 55 + Math.floor(Math.random() * 35),
      strictness: 50 + Math.floor(Math.random() * 40),
      academicExpectations: 70 + Math.floor(Math.random() * 25),
      relationship: 75
    },
    mother: {
      name: isIndia ? "Sunita" : "Margaret",
      generosity: 65 + Math.floor(Math.random() * 30),
      strictness: 45 + Math.floor(Math.random() * 40),
      academicExpectations: 65 + Math.floor(Math.random() * 30),
      relationship: 82
    }
  };
}

export function evaluateParentalExpenseNegotiation(familyEconomy, expenseItem, justificationPitch = "invest_in_future", studentGPA = 3.8) {
  const parent = (familyEconomy.mother.relationship >= familyEconomy.father.relationship)
    ? familyEconomy.mother
    : familyEconomy.father;

  const cost = expenseItem.costUSD || 500;
  const disposable = familyEconomy.disposableCashUSD || 5000;

  // 1. Affordability Ratio
  const affordRatio = disposable / Math.max(1, cost);
  const affordScore = Math.min(40, affordRatio * 15);

  // 2. Generosity & Rapport
  const generosityScore = ((parent.generosity * 0.6) + (parent.relationship * 0.4)) * 0.3;

  // 3. Academic Alignment
  let academicAlignment = (studentGPA / 4.0) * (parent.academicExpectations / 100) * 20;

  // 4. Justification Pitch Bonus
  let pitchBonus = 0;
  if (justificationPitch === "invest_in_future") pitchBonus = 8;
  if (justificationPitch === "offer_skin_in_game") pitchBonus = 12; // "I'll cover 25%"

  const totalScore = affordScore + generosityScore + academicAlignment + pitchBonus;

  if (totalScore >= 72) {
    return {
      verdict: "accepted_full",
      parentContributionPct: 100,
      studentContributionPct: 0,
      quote: `"Education is our family's top priority. We will fund this in full. Make us proud."`
    };
  } else if (totalScore >= 48) {
    return {
      verdict: "compromise_half",
      parentContributionPct: 50,
      studentContributionPct: 50,
      quote: `"It's a large expense right now. We will pay half, provided you contribute the rest from your savings or part-time job."`
    };
  } else if (totalScore >= 32) {
    return {
      verdict: "conditional",
      parentContributionPct: 100,
      studentContributionPct: 0,
      quote: `"We will only consider funding this if you maintain straight A's on your midterm report card."`
    };
  } else {
    return {
      verdict: "refused",
      parentContributionPct: 0,
      studentContributionPct: 100,
      quote: `"Money doesn't grow on trees. We simply cannot justify this expense right now."`
    };
  }
}
