// ============================================================================
// File: js/data/education_data.js
// Description: Master Data for Cognition, Curricula, Exams, Clubs, and Student Jobs
// ============================================================================

// 1. INNATE COGNITIVE ATTRIBUTES SPECIFICATION (Population Norm: Mean = 50, StdDev = 15)
export const INNATE_ATTRIBUTES_SPEC = {
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

// 2. LEARNED ACADEMIC SKILLS SPECIFICATION (Range 0.0 - 100.0)
export const LEARNED_SKILLS_SPEC = {
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

// Cognitive Affinity Weights Matrix: links innate faculties to skill learning speed
export const COGNITIVE_AFFINITIES = {
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

// 3. PERFORMANCE & TEMPERAMENT TRAITS SPECIFICATION (Range 1 - 100)
export const PERFORMANCE_TRAITS_SPEC = {
  focus: { name: "Focus & Attention", desc: "Sustained concentration without digital or environmental distraction" },
  discipline: { name: "Discipline & Willpower", desc: "Initiation of difficult tasks when motivation is low" },
  conscientiousness: { name: "Conscientiousness", desc: "Checking work, precision, avoiding careless exam errors" },
  examTemperament: { name: "Exam Temperament", desc: "Parasympathetic stability, immunity to choking under clock pressure" },
  consistency: { name: "Consistency", desc: "Day-to-day variance control in study execution" },
  procrastination: { name: "Procrastination Tendency", desc: "Friction to begin study sessions before looming deadlines" },
  stressTolerance: { name: "Stress Tolerance", desc: "Resilience buffer preventing academic burnout and cortisol spikes" },
  curiosity: { name: "Intellectual Curiosity", desc: "Intrinsic drive lowering mental study fatigue" },
  ambition: { name: "Ambition & Drive", desc: "Focus on top percentiles, prestige, and honors" },
  confidence: { name: "Academic Confidence", desc: "Elimination of second-guessing during high-stakes tests" }
};

// 4. SUBJECTS & SUBTOPICS HIERARCHY
export const SUBJECT_SUBTOPICS = {
  mathematics: {
    id: "mathematics",
    name: "Mathematics",
    icon: "📐",
    subtopics: [
      { id: "arithmetic", name: "Arithmetic & Pre-Algebra", weight: 0.15 },
      { id: "algebra", name: "Polynomials & Linear Equations", weight: 0.25 },
      { id: "geometry", name: "Euclidean & Coordinate Geometry", weight: 0.20 },
      { id: "trigonometry", name: "Trigonometric Identities & Graphs", weight: 0.15 },
      { id: "calculus", name: "Differential & Integral Calculus", weight: 0.25 }
    ]
  },
  physics: {
    id: "physics",
    name: "Physics",
    icon: "⚛️",
    subtopics: [
      { id: "mechanics", name: "Classical Mechanics & Kinematics", weight: 0.30 },
      { id: "electromagnetism", name: "Electricity, Magnetism & Circuits", weight: 0.30 },
      { id: "thermodynamics", name: "Thermodynamics & Kinetic Theory", weight: 0.20 },
      { id: "optics_modern", name: "Wave Optics & Quantum Fundamentals", weight: 0.20 }
    ]
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    icon: "🧪",
    subtopics: [
      { id: "physical_chem", name: "Chemical Kinetics & Thermodynamics", weight: 0.35 },
      { id: "organic_chem", name: "Reaction Mechanisms & Synthesis", weight: 0.40 },
      { id: "inorganic_chem", name: "Periodic Trends & Coordination Compounds", weight: 0.25 }
    ]
  },
  english: {
    id: "english",
    name: "English Literature & Composition",
    icon: "📖",
    subtopics: [
      { id: "grammar_syntax", name: "Grammar, Mechanics & Rhetoric", weight: 0.25 },
      { id: "essay_composition", name: "Argumentative & Analytical Essays", weight: 0.45 },
      { id: "literary_analysis", name: "Poetry, Prose & Thematic Critique", weight: 0.30 }
    ]
  },
  economics: {
    id: "economics",
    name: "Economics",
    icon: "📈",
    subtopics: [
      { id: "microeconomics", name: "Supply, Demand & Market Structures", weight: 0.50 },
      { id: "macroeconomics", name: "Fiscal Policy, Central Banking & GDP", weight: 0.50 }
    ]
  },
  biology: {
    id: "biology",
    name: "Biology",
    icon: "🧬",
    subtopics: [
      { id: "cell_biology", name: "Cellular Metabolism & Genetics", weight: 0.35 },
      { id: "human_physiology", name: "Human Anatomy & Organ Systems", weight: 0.40 },
      { id: "ecology_evolution", name: "Ecology & Evolutionary Biology", weight: 0.25 }
    ]
  },
  computerScience: {
    id: "computerScience",
    name: "Computer Science",
    icon: "💻",
    subtopics: [
      { id: "algorithms", name: "Data Structures & Big-O Algorithms", weight: 0.40 },
      { id: "software_engineering", name: "Object-Oriented Design & Clean Code", weight: 0.35 },
      { id: "systems_architecture", name: "Computer Architecture & Networks", weight: 0.25 }
    ]
  }
};

// 5. NATIONAL CURRICULA & STREAMS
export const NATIONAL_CURRICULA = {
  india: {
    boards: [
      {
        id: "cbse",
        name: "CBSE (Central Board of Secondary Education)",
        rigor: "High",
        stemWeight: 0.85,
        streams: [
          { id: "pcm", name: "Science PCM (Physics, Chemistry, Math)", targetCareers: ["Engineering", "Tech", "CS"], mandatoryExams: ["jee_main"] },
          { id: "pcb", name: "Science PCB (Physics, Chemistry, Biology)", targetCareers: ["Medicine", "Biotech"], mandatoryExams: ["neet_ug"] },
          { id: "commerce", name: "Commerce & Finance", targetCareers: ["Banking", "Chartered Accountancy", "Biz"], mandatoryExams: ["cuet"] },
          { id: "humanities", name: "Humanities & Law", targetCareers: ["Law", "Civil Services", "Journalism"], mandatoryExams: ["clat"] }
        ]
      },
      {
        id: "icse",
        name: "ICSE / ISC (Council for the Indian School Certificate)",
        rigor: "Very High",
        stemWeight: 0.75,
        streams: [
          { id: "pcm", name: "ISC Science (PCM with English Literature)", targetCareers: ["Engineering", "Global Tech"] },
          { id: "pcb", name: "ISC Medical (PCB)", targetCareers: ["Medicine", "Surgery"] },
          { id: "commerce", name: "ISC Commerce & Accountancy", targetCareers: ["Global Finance", "Consulting"] }
        ]
      },
      {
        id: "ib_india",
        name: "International Baccalaureate (IB DP)",
        rigor: "Extensive",
        stemWeight: 0.80,
        streams: [
          { id: "ib_stem", name: "IB Diploma (Math HL, Physics HL, Econ HL)", targetCareers: ["Ivy League", "Oxbridge"] }
        ]
      }
    ]
  },
  usa: {
    boards: [
      {
        id: "us_ap_honors",
        name: "US High School (AP / Honors Track)",
        rigor: "Customizable",
        maxGPA: 5.0,
        gradeLevels: ["9th Freshman", "10th Sophomore", "11th Junior", "12th Senior"],
        apCourses: [
          "AP Calculus BC", "AP Physics C", "AP Chemistry", "AP Computer Science A",
          "AP English Language", "AP Macroeconomics", "AP US History", "AP Biology"
        ]
      }
    ]
  },
  uk: {
    boards: [
      {
        id: "uk_alevels",
        name: "A-Levels (Sixth Form)",
        rigor: "Deeply Specialized",
        gradeLevels: ["Year 12 (AS / Lower Sixth)", "Year 13 (A2 / Upper Sixth)"],
        courseCount: 3,
        subjectsList: ["Mathematics", "Further Mathematics", "Physics", "Chemistry", "Economics", "English Literature", "History", "Biology"]
      }
    ]
  },
  germany: {
    boards: [
      {
        id: "gymnasium",
        name: "Gymnasium (Abitur Track)",
        rigor: "Academic High",
        scale: "1.0 (Best) to 4.0 (Pass)"
      },
      {
        id: "duale_ausbildung",
        name: "Duale Ausbildung (Paid Vocational Apprenticeship)",
        rigor: "Practical & Applied",
        trades: ["electrician", "plumber_hvac", "machinist_cnc", "mechatronics", "it_specialist"]
      }
    ]
  },
  china: {
    boards: [
      {
        id: "gaokao_curriculum",
        name: "National Gaokao Curriculum (3+1+2)",
        rigor: "Extreme",
        totalScore: 750
      }
    ]
  }
};

// 6. EXTRACURRICULAR CLUBS CATALOG (The 7 Core High School Societies)
export const HIGH_SCHOOL_CLUBS = [
  {
    id: "debate_society",
    name: "Varsity Debate Society (World Schools & Parliamentary)",
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

// 7. AGE-GATED PART-TIME STUDENT JOBS (With PPP & Geographic Scaled Wages)
export const STUDENT_JOBS_CATALOG = [
  {
    id: "lawn_and_yard",
    title: "Neighborhood Lawn Care & Yard Work",
    minAge: 12,
    maxAge: 15,
    baseHourlyUSD: 8.0,
    weeklyHoursMax: 10,
    gainedTraits: { discipline: 4, consistency: 3 },
    desc: "Mowing lawns, raking leaves, and assisting neighborhood homeowners."
  },
  {
    id: "pet_sitting",
    title: "Pet Sitting & Dog Walker",
    minAge: 12,
    maxAge: 15,
    baseHourlyUSD: 9.0,
    weeklyHoursMax: 8,
    gainedTraits: { conscientiousness: 4, stressTolerance: 3 },
    desc: "Walking neighborhood dogs and feeding pets while owners travel."
  },
  {
    id: "junior_math_tutor",
    title: "Peer Math & Reading Tutor",
    minAge: 13,
    maxAge: 16,
    baseHourlyUSD: 14.0,
    minSmarts: 75,
    weeklyHoursMax: 8,
    gainedTraits: { focus: 4, confidence: 4 },
    gainedSkills: { algebra: 3, writing: 3 },
    desc: "Tutoring primary school kids in fractions, reading comprehension, and homework."
  },
  {
    id: "cafe_barista",
    title: "Third-Wave Coffee Barista & Cashier",
    minAge: 15,
    maxAge: 18,
    baseHourlyUSD: 13.5,
    weeklyHoursMax: 16,
    gainedTraits: { consistency: 5, stressTolerance: 4 },
    gainedSkills: { presentation: 2 },
    desc: "Pulling espresso shots, managing front register, and handling morning rush queues."
  },
  {
    id: "retail_apparel",
    title: "Retail Stock Associate & Sales Clerk",
    minAge: 15,
    maxAge: 18,
    baseHourlyUSD: 12.5,
    weeklyHoursMax: 15,
    gainedTraits: { discipline: 4, conscientiousness: 3 },
    desc: "Inventory replenishment, customer fitting assistance, and floor visual merchandising."
  },
  {
    id: "fast_food_crew",
    title: "Fast-Food Crew Member & Fry Cook",
    minAge: 15,
    maxAge: 18,
    baseHourlyUSD: 12.0,
    weeklyHoursMax: 20,
    gainedTraits: { stressTolerance: 6, discipline: 5 },
    desc: "High-paced kitchen line assembly, grill station sanitation, and drive-thru fulfillment."
  },
  {
    id: "boutique_office_intern",
    title: "Boutique Law / Accounting Office Clerk",
    minAge: 17,
    maxAge: 19,
    baseHourlyUSD: 18.0,
    minSmarts: 70,
    weeklyHoursMax: 15,
    gainedTraits: { conscientiousness: 6, ambition: 4 },
    gainedSkills: { research: 4, writing: 3 },
    desc: "Filing legal motions, client intake summaries, document discovery digitization."
  },
  {
    id: "tech_qa_tester",
    title: "Junior Web QA Tester & Script Writer",
    minAge: 17,
    maxAge: 19,
    baseHourlyUSD: 24.0,
    minSmarts: 80,
    weeklyHoursMax: 15,
    gainedTraits: { focus: 5, conscientiousness: 5 },
    gainedSkills: { coding: 6 },
    desc: "Executing automated browser test suites and reporting frontend bugs for local tech startups."
  },
  {
    id: "freelance_graphic_dev",
    title: "Freelance UI & Web Designer",
    minAge: 16,
    maxAge: 19,
    baseHourlyUSD: 22.0,
    minSmarts: 75,
    weeklyHoursMax: 12,
    gainedTraits: { creativity: 6, discipline: 4 },
    gainedSkills: { coding: 4, presentation: 3 },
    desc: "Designing landing pages and marketing collateral for local small business clients."
  }
];

// 8. VOCATIONAL APPRENTICESHIP TRADES (German & Global Dual Tracks)
export const VOCATIONAL_TRADES = [
  {
    id: "electrician",
    name: "Certified Industrial & Building Electrician",
    durationYears: 3.5,
    monthlyStipendEUR: [980, 1060, 1150, 1250],
    certTitle: "Gesellenbrief: Elektroniker",
    startingSalaryEUR: 44000,
    meisterSalaryEUR: 82000,
    keySkills: ["spatial", "quantitative", "conscientiousness"]
  },
  {
    id: "plumber_hvac",
    name: "HVAC, Sanitation & Climate Systems Specialist",
    durationYears: 3.5,
    monthlyStipendEUR: [950, 1040, 1120, 1220],
    certTitle: "Gesellenbrief: Anlagenmechaniker SHK",
    startingSalaryEUR: 43000,
    meisterSalaryEUR: 86000,
    keySkills: ["spatial", "discipline", "stressTolerance"]
  },
  {
    id: "machinist_cnc",
    name: "Precision CNC Machinist & Toolmaker",
    durationYears: 3.5,
    monthlyStipendEUR: [1020, 1100, 1190, 1280],
    certTitle: "Gesellenbrief: Zerspanungsmechaniker",
    startingSalaryEUR: 46000,
    meisterSalaryEUR: 88000,
    keySkills: ["quantitative", "conscientiousness", "workingMemory"]
  },
  {
    id: "it_specialist",
    name: "Enterprise IT Systems & Network Specialist",
    durationYears: 3.0,
    monthlyStipendEUR: [1000, 1080, 1180, 1260],
    certTitle: "Fachinformatiker für Systemintegration",
    startingSalaryEUR: 48000,
    meisterSalaryEUR: 92000,
    keySkills: ["abstractReasoning", "coding", "focus"]
  }
];
