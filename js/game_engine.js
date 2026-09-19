// Life Simulator Game - Core Engine, Complete Data & UI Runtime (Zero-CORS Standalone Compatible)
(function () {
  "use strict";

  // --- 1. DATA: COUNTRIES & REGIONAL SCHOOLING ---
  const COUNTRIES = {
    india: {
      id: "india",
      name: "India",
      currency: "INR",
      symbol: "₹",
      exchangeRateToUSD: 85,
      flag: "🇮🇳",
      cities: ["Mumbai", "New Delhi", "Bengaluru", "Kolkata", "Hyderabad", "Pune"],
      preschools: [
        { id: "montessori_in", name: "Modern Montessori Preschool", costUSD: 800, smartsGain: 4, desc: "Experiential play, self-directed learning and curiosity." },
        { id: "academic_prep_in", name: "EuroKids / Kangaroo Kids Prep", costUSD: 1200, smartsGain: 6, desc: "Structured phonics, early numeracy and reading readiness." },
        { id: "local_anganwadi", name: "Local Community Playgroup", costUSD: 0, happinessGain: 5, desc: "Neighborhood friends, social bonding and outdoor games." }
      ],
      schoolBoards: [
        { id: "cbse", name: "CBSE (Central Board of Secondary Education)", rigor: "High", prestige: 85, desc: "NCERT curriculum focused on science, math, and competitive national exams." },
        { id: "icse", name: "ICSE / ISC", rigor: "Very High", prestige: 90, desc: "Rigorous English literature, broad humanities and detailed sciences." },
        { id: "state_board", name: "State Board", rigor: "Moderate", prestige: 65, desc: "Regional curriculum with local state focus." },
        { id: "ib_india", name: "IB World School", rigor: "Extensive", prestige: 95, desc: "Elite private international education ideal for Ivy League and Oxbridge." }
      ],
      undergradColleges: [
        { id: "iit_bombay", name: "IIT Bombay", tier: 1, prestige: 99, tuitionUSD: 2800, majors: ["Computer Science & AI", "Aerospace Eng", "Electrical Eng"], examReq: "jee" },
        { id: "iit_delhi", name: "IIT Delhi", tier: 1, prestige: 98, tuitionUSD: 2800, majors: ["Computer Science & AI", "Mechanical Eng", "Data Science"], examReq: "jee" },
        { id: "bits_pilani", name: "BITS Pilani", tier: 2, prestige: 92, tuitionUSD: 6500, majors: ["Computer Science & AI", "Economics & Finance"], examReq: "jee" },
        { id: "aiims_delhi", name: "AIIMS New Delhi", tier: 1, prestige: 100, tuitionUSD: 500, majors: ["Medicine & Surgery (MBBS)"], examReq: "neet" },
        { id: "srcc_delhi", name: "SRCC (Delhi University)", tier: 2, prestige: 92, tuitionUSD: 1200, majors: ["Commerce & Finance", "Economics (Hons)"], examReq: null },
        { id: "nlsiu_bangalore", name: "NLSIU Bangalore (National Law School)", tier: 1, prestige: 96, tuitionUSD: 4500, majors: ["Corporate Law (BA LLB)"], examReq: null }
      ],
      postgradInstitutes: [
        { id: "iim_ahmedabad", name: "IIM Ahmedabad (MBA)", tier: 1, prestige: 100, tuitionUSD: 16000, examReq: "cat", reqDegree: true },
        { id: "iim_bangalore", name: "IIM Bangalore (MBA)", tier: 1, prestige: 98, tuitionUSD: 15000, examReq: "cat", reqDegree: true },
        { id: "lbsnaa_upsc", name: "LBSNAA Mussoorie (UPSC IAS Academy)", tier: 1, prestige: 100, tuitionUSD: 0, examReq: "upsc", reqDegree: true }
      ]
    },

    usa: {
      id: "usa",
      name: "United States",
      currency: "USD",
      symbol: "$",
      exchangeRateToUSD: 1,
      flag: "🇺🇸",
      cities: ["New York", "San Francisco", "Boston", "Chicago", "Austin", "Los Angeles"],
      preschools: [
        { id: "us_preschool_prep", name: "Goddard Early Childhood Academy", costUSD: 12000, smartsGain: 6, desc: "Inquiry-based early STEM and reading readiness." },
        { id: "us_montessori", name: "American Montessori Toddler Program", costUSD: 8000, smartsGain: 4, desc: "Sensory learning and independent exploration." },
        { id: "us_public_daycare", name: "Community Pre-K & Playgroup", costUSD: 2000, happinessGain: 6, desc: "Play-based social and motor development." }
      ],
      schoolBoards: [
        { id: "us_public_ap", name: "US High School (AP / Honors Track)", rigor: "High", prestige: 85, desc: "Advanced Placement coursework and extracurricular varsity prep." },
        { id: "us_prep_school", name: "New England Boarding Prep (Exeter / Andover)", rigor: "Very High", prestige: 98, desc: "Feeder academy for Ivy League and generational leadership." }
      ],
      undergradColleges: [
        { id: "harvard", name: "Harvard University", tier: 1, prestige: 100, tuitionUSD: 58000, majors: ["Economics & Finance", "Computer Science", "Government & Pre-Law", "Biomedical Sciences"], examReq: "sat" },
        { id: "stanford", name: "Stanford University", tier: 1, prestige: 100, tuitionUSD: 60000, majors: ["Computer Science & AI", "Tech Entrepreneurship", "Electrical Eng"], examReq: "sat" },
        { id: "mit", name: "MIT (Massachusetts Institute of Technology)", tier: 1, prestige: 100, tuitionUSD: 59000, majors: ["Computer Science & AI", "Physics & Quantum Eng", "Aerospace Robotics"], examReq: "sat" },
        { id: "uchicago", name: "University of Chicago", tier: 1, prestige: 97, tuitionUSD: 62000, majors: ["Quantitative Economics", "Mathematics", "Law & Society"], examReq: "sat" },
        { id: "uc_berkeley", name: "UC Berkeley", tier: 2, prestige: 94, tuitionUSD: 32000, majors: ["Computer Science", "EECS", "Business Administration"], examReq: "sat" },
        { id: "state_college", name: "Top State University (UT Austin / Penn State)", tier: 3, prestige: 85, tuitionUSD: 22000, majors: ["General Business", "Software Systems", "Communications"], examReq: "sat" }
      ],
      postgradInstitutes: [
        { id: "harvard_business", name: "Harvard Business School (HBS MBA)", tier: 1, prestige: 100, tuitionUSD: 74000, examReq: "gmat", reqDegree: true },
        { id: "stanford_gsb", name: "Stanford Graduate School of Business (GSB)", tier: 1, prestige: 100, tuitionUSD: 76000, examReq: "gmat", reqDegree: true },
        { id: "yale_law", name: "Yale Law School (JD)", tier: 1, prestige: 100, tuitionUSD: 72000, examReq: "lsat", reqDegree: true }
      ]
    },

    uk: {
      id: "uk",
      name: "United Kingdom",
      currency: "GBP",
      symbol: "£",
      exchangeRateToUSD: 0.79,
      flag: "🇬🇧",
      cities: ["London", "Oxford", "Cambridge", "Edinburgh", "Manchester"],
      preschools: [
        { id: "uk_nursery", name: "Cranbrook Private Nursery & Pre-Prep", costUSD: 10000, smartsGain: 5, desc: "Traditional British early education and manners." }
      ],
      schoolBoards: [
        { id: "uk_alevels", name: "A-Levels (Sixth Form)", rigor: "Very High", prestige: 94, desc: "3-4 specialized subjects required for Oxbridge and Russell Group." },
        { id: "uk_public_school", name: "Historic Public School (Eton / Winchester)", rigor: "Extreme", prestige: 99, desc: "Centuries-old aristocracy feeder schools." }
      ],
      undergradColleges: [
        { id: "oxford", name: "University of Oxford", tier: 1, prestige: 100, tuitionUSD: 38000, majors: ["Philosophy, Politics & Economics (PPE)", "Jurisprudence (Law)", "Computer Science", "Medicine"], examReq: "sat" },
        { id: "cambridge", name: "University of Cambridge", tier: 1, prestige: 100, tuitionUSD: 39000, majors: ["Natural Sciences", "Mathematics & Computing", "Engineering Tripos"], examReq: "sat" },
        { id: "imperial", name: "Imperial College London", tier: 1, prestige: 96, tuitionUSD: 39000, majors: ["Computing & AI", "Biomedical Eng", "Finance & Fintech"], examReq: null },
        { id: "lse", name: "London School of Economics (LSE)", tier: 1, prestige: 95, tuitionUSD: 35000, majors: ["Economics", "Investment Finance", "International Law"], examReq: null }
      ],
      postgradInstitutes: []
    },

    singapore: {
      id: "singapore",
      name: "Singapore",
      currency: "SGD",
      symbol: "S$",
      exchangeRateToUSD: 1.34,
      flag: "🇸🇬",
      cities: ["Singapore"],
      preschools: [],
      schoolBoards: [{ id: "sg_junior_college", name: "Singapore Junior College (Raffles/Hwa Chong)", rigor: "Extreme", prestige: 96, desc: "High-pressure math and science excellence." }],
      undergradColleges: [
        { id: "nus", name: "National University of Singapore (NUS)", tier: 1, prestige: 97, tuitionUSD: 24000, majors: ["Computer Science", "Business Analytics", "Corporate Law", "Medicine"], examReq: null },
        { id: "ntu", name: "Nanyang Technological University (NTU)", tier: 1, prestige: 95, tuitionUSD: 22000, majors: ["AI & Data Engineering", "Materials Science"], examReq: null }
      ],
      postgradInstitutes: []
    },

    germany: {
      id: "germany",
      name: "Germany",
      currency: "EUR",
      symbol: "€",
      exchangeRateToUSD: 0.92,
      flag: "🇩🇪",
      cities: ["Munich", "Berlin", "Frankfurt", "Hamburg"],
      preschools: [],
      schoolBoards: [{ id: "de_gymnasium", name: "Gymnasium (Abitur)", rigor: "High", prestige: 90, desc: "Rigorous Abitur university prep." }],
      undergradColleges: [
        { id: "tum", name: "Technical University of Munich (TUM)", tier: 1, prestige: 95, tuitionUSD: 1600, majors: ["Automotive & Robotics", "Informatics AI", "Aerospace"], examReq: null },
        { id: "heidelberg", name: "Heidelberg University", tier: 2, prestige: 92, tuitionUSD: 1500, majors: ["Medicine & Surgery", "Biochemistry"], examReq: null }
      ],
      postgradInstitutes: []
    },

    canada: {
      id: "canada",
      name: "Canada",
      currency: "CAD",
      symbol: "C$",
      exchangeRateToUSD: 1.36,
      flag: "🇨🇦",
      cities: ["Toronto", "Vancouver", "Montreal"],
      preschools: [],
      schoolBoards: [{ id: "ca_highschool", name: "Canadian High School (OSSD)", rigor: "High", prestige: 85, desc: "Credit-based curriculum." }],
      undergradColleges: [
        { id: "utoronto", name: "University of Toronto", tier: 1, prestige: 95, tuitionUSD: 28000, majors: ["Computer Science & Deep Learning", "Rotman Finance", "Medicine"], examReq: null },
        { id: "waterloo", name: "University of Waterloo", tier: 1, prestige: 94, tuitionUSD: 30000, majors: ["Software Engineering (Co-op)", "Quantum Computing"], examReq: null }
      ],
      postgradInstitutes: []
    },

    switzerland: {
      id: "switzerland",
      name: "Switzerland",
      currency: "CHF",
      symbol: "CHF",
      exchangeRateToUSD: 0.89,
      flag: "🇨🇭",
      cities: ["Zurich", "Geneva", "Lausanne"],
      preschools: [],
      schoolBoards: [{ id: "ch_matura", name: "Swiss Matura Gymnasium", rigor: "Very High", prestige: 95, desc: "Multilingual academic sciences." }],
      undergradColleges: [
        { id: "eth_zurich", name: "ETH Zurich", tier: 1, prestige: 99, tuitionUSD: 2200, majors: ["Computer Science & Robotics", "Quantum Physics", "Mechanical Eng"], examReq: null }
      ],
      postgradInstitutes: []
    },

    japan: {
      id: "japan",
      name: "Japan",
      currency: "JPY",
      symbol: "¥",
      exchangeRateToUSD: 155,
      flag: "🇯🇵",
      cities: ["Tokyo", "Kyoto", "Osaka"],
      preschools: [],
      schoolBoards: [{ id: "jp_highschool", name: "Japanese Academic High School", rigor: "Extreme", prestige: 92, desc: "Rigorous entrance exam discipline." }],
      undergradColleges: [
        { id: "tokyo_univ", name: "University of Tokyo (Todai)", tier: 1, prestige: 98, tuitionUSD: 4500, majors: ["Law & Bureaucracy", "Precision Robotics", "Physics"], examReq: null }
      ],
      postgradInstitutes: []
    },

    australia: {
      id: "australia",
      name: "Australia",
      currency: "AUD",
      symbol: "A$",
      exchangeRateToUSD: 1.52,
      flag: "🇦🇺",
      cities: ["Melbourne", "Sydney", "Brisbane"],
      preschools: [],
      schoolBoards: [{ id: "au_atar", name: "Australian ATAR System", rigor: "High", prestige: 86, desc: "Senior secondary certificate." }],
      undergradColleges: [
        { id: "unimelb", name: "University of Melbourne", tier: 1, prestige: 95, tuitionUSD: 29000, majors: ["BioMedicine", "Commerce", "Software Systems"], examReq: null }
      ],
      postgradInstitutes: []
    },

    uae: {
      id: "uae",
      name: "United Arab Emirates",
      currency: "AED",
      symbol: "AED",
      exchangeRateToUSD: 3.67,
      flag: "🇦🇪",
      cities: ["Dubai", "Abu Dhabi"],
      preschools: [],
      schoolBoards: [{ id: "uae_intl", name: "Dubai International Academy", rigor: "High", prestige: 90, desc: "Cosmopolitan international school." }],
      undergradColleges: [
        { id: "nyu_abudhabi", name: "NYU Abu Dhabi", tier: 1, prestige: 95, tuitionUSD: 52000, majors: ["Global Economics", "Computer Science"], examReq: null }
      ],
      postgradInstitutes: []
    }
  };

  // --- 2. DATA: EXAMS (STRICTLY REALISTIC CHRONOLOGY) ---
  const ENTRANCE_EXAMS = {
    // High school exams (Age 17-19)
    jee: {
      id: "jee",
      name: "JEE (Main & Advanced)",
      timing: "high_school",
      requiredStream: "pcm",
      minAge: 17,
      maxAge: 20,
      requiresDegree: false,
      costUSD: 40,
      description: "Indian engineering exam for IIT Bombay, IIT Delhi, and BITS Pilani. Over 1.2M compete for <17k seats."
    },
    neet: {
      id: "neet",
      name: "NEET UG",
      timing: "high_school",
      requiredStream: "pcb",
      minAge: 17,
      maxAge: 25,
      requiresDegree: false,
      costUSD: 30,
      description: "National Eligibility Entrance Test for elite medical institutes like AIIMS New Delhi."
    },
    sat: {
      id: "sat",
      name: "SAT Reasoning Test",
      timing: "high_school",
      requiredStream: null,
      minAge: 15,
      maxAge: 20,
      requiresDegree: false,
      costUSD: 110,
      description: "Standardized college exam scored out of 1600. 1530+ needed for Harvard, Stanford, MIT, UChicago."
    },
    ielts: {
      id: "ielts",
      name: "IELTS Academic Test",
      timing: "any",
      requiredStream: null,
      minAge: 16,
      maxAge: 50,
      requiresDegree: false,
      costUSD: 240,
      description: "English language proficiency assessment required for student visas and study abroad."
    },

    // POST-GRADUATION EXAMS (Strictly requires an undergraduate degree & Age >= 21)
    upsc: {
      id: "upsc",
      name: "UPSC Civil Services Examination",
      timing: "post_grad",
      minAge: 21,
      maxAge: 32,
      requiresDegree: true,
      costUSD: 10,
      description: "Legendary 3-stage exam (Prelims, Mains, Interview) to become an IAS, IPS, or IFS Officer. ONLY eligible AFTER graduating college!"
    },
    cat: {
      id: "cat",
      name: "CAT (Common Admission Test)",
      timing: "post_grad",
      minAge: 20,
      maxAge: 35,
      requiresDegree: true,
      costUSD: 35,
      description: "Premier post-grad entrance exam for MBA at IIM Ahmedabad, IIM Bangalore, IIM Calcutta."
    },
    gmat: {
      id: "gmat",
      name: "GMAT Focus Edition",
      timing: "post_grad",
      minAge: 21,
      maxAge: 40,
      requiresDegree: true,
      costUSD: 275,
      description: "Benchmark graduate business test for Harvard Business School (HBS) and Stanford GSB."
    }
  };

  // --- 2B. DATA: EDUCATION, COGNITION, CLUBS & JOBS ---
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

  // --- 3. DATA: CORPORATE CAREER TRACKS ---
  const CAREER_TRACKS = [
    {
      id: "swe",
      name: "Software Engineering & AI",
      icon: "💻",
      requiredDegrees: ["Computer Science & AI", "Computer Science", "Physics & Quantum Eng", "Electrical Eng"],
      minSmarts: 70,
      ladder: [
        { level: 1, title: "Junior Software Engineer", baseSalaryUSD: 115000, bonusPct: 0.10, stockUSD: 25000 },
        { level: 2, title: "Software Engineer II", baseSalaryUSD: 155000, bonusPct: 0.15, stockUSD: 45000 },
        { level: 3, title: "Senior Software Engineer", baseSalaryUSD: 200000, bonusPct: 0.20, stockUSD: 90000 },
        { level: 4, title: "Staff Software Engineer", baseSalaryUSD: 260000, bonusPct: 0.25, stockUSD: 175000 },
        { level: 5, title: "Principal Engineer", baseSalaryUSD: 340000, bonusPct: 0.30, stockUSD: 300000 },
        { level: 6, title: "VP of Engineering", baseSalaryUSD: 480000, bonusPct: 0.40, stockUSD: 550000 },
        { level: 7, title: "Chief Technology Officer (CTO)", baseSalaryUSD: 700000, bonusPct: 0.50, stockUSD: 1400000 }
      ]
    },
    {
      id: "law_firm",
      name: "Corporate Law Firm (BigLaw)",
      icon: "⚖️",
      requiredDegrees: ["Corporate Law (BA LLB)", "Jurisprudence (Law)", "Government & Pre-Law", "Law & Society"],
      minSmarts: 78,
      ladder: [
        { level: 1, title: "First-Year Associate (BigLaw)", baseSalaryUSD: 225000, bonusPct: 0.10, stockUSD: 0 },
        { level: 2, title: "Senior Associate", baseSalaryUSD: 390000, bonusPct: 0.25, stockUSD: 0 },
        { level: 3, title: "Junior Partner", baseSalaryUSD: 850000, bonusPct: 0.45, stockUSD: 0 },
        { level: 4, title: "Senior Equity Partner (Profit Share)", baseSalaryUSD: 2100000, bonusPct: 0.60, stockUSD: 0 }
      ]
    },
    {
      id: "inhouse_counsel",
      name: "In-House Corporate Counsel",
      icon: "📜",
      requiredDegrees: ["Corporate Law (BA LLB)", "Jurisprudence (Law)", "Government & Pre-Law"],
      minSmarts: 75,
      ladder: [
        { level: 1, title: "Corporate Legal Counsel", baseSalaryUSD: 165000, bonusPct: 0.15, stockUSD: 40000 },
        { level: 2, title: "Director of Legal", baseSalaryUSD: 295000, bonusPct: 0.25, stockUSD: 150000 },
        { level: 3, title: "General Counsel & Chief Legal Officer", baseSalaryUSD: 650000, bonusPct: 0.50, stockUSD: 900000 }
      ]
    },
    {
      id: "investment_banking",
      name: "Investment Banking & Private Equity",
      icon: "📈",
      requiredDegrees: ["Economics & Finance", "Quantitative Economics", "Commerce & Finance", "Rotman Finance"],
      minSmarts: 78,
      ladder: [
        { level: 1, title: "Investment Banking Analyst", baseSalaryUSD: 130000, bonusPct: 0.70, stockUSD: 15000 },
        { level: 2, title: "Vice President (M&A)", baseSalaryUSD: 320000, bonusPct: 1.00, stockUSD: 90000 },
        { level: 3, title: "Managing Director", baseSalaryUSD: 580000, bonusPct: 1.50, stockUSD: 400000 },
        { level: 4, title: "Hedge Fund / PE Partner", baseSalaryUSD: 1000000, bonusPct: 2.50, stockUSD: 2000000 }
      ]
    },
    {
      id: "medicine",
      name: "Medicine & Specialty Surgery",
      icon: "🩺",
      requiredDegrees: ["Medicine & Surgery (MBBS)", "Medicine", "Biomedical Sciences"],
      minSmarts: 82,
      ladder: [
        { level: 1, title: "Surgical Resident", baseSalaryUSD: 75000, bonusPct: 0.05, stockUSD: 0 },
        { level: 2, title: "Attending Specialist Surgeon", baseSalaryUSD: 440000, bonusPct: 0.15, stockUSD: 0 },
        { level: 3, title: "Department Chief of Surgery", baseSalaryUSD: 680000, bonusPct: 0.20, stockUSD: 60000 },
        { level: 4, title: "Director of Private Specialty Clinic", baseSalaryUSD: 1250000, bonusPct: 0.35, stockUSD: 250000 }
      ]
    },
    {
      id: "civil_service",
      name: "Civil Services (IAS / Diplomat)",
      icon: "🏛️",
      requiredDegrees: ["*"], // Any degree allowed after clearing UPSC!
      requiresExam: "upsc",
      minSmarts: 82,
      ladder: [
        { level: 1, title: "Sub-Divisional Magistrate (IAS)", baseSalaryUSD: 50000, bonusPct: 0.05, stockUSD: 0 },
        { level: 2, title: "District Magistrate / Collector (DM)", baseSalaryUSD: 72000, bonusPct: 0.05, stockUSD: 0 },
        { level: 3, title: "Joint Secretary to Government", baseSalaryUSD: 98000, bonusPct: 0.08, stockUSD: 0 },
        { level: 4, title: "Cabinet Secretary / Ambassador", baseSalaryUSD: 195000, bonusPct: 0.12, stockUSD: 0 }
      ]
    },
    {
      id: "consulting",
      name: "Management Consulting (MBB)",
      icon: "📊",
      requiredDegrees: ["Economics & Finance", "MBA Business Strategy", "Computer Science", "General Business"],
      minSmarts: 76,
      ladder: [
        { level: 1, title: "Business Analyst (MBB)", baseSalaryUSD: 120000, bonusPct: 0.20, stockUSD: 0 },
        { level: 2, title: "Engagement Manager", baseSalaryUSD: 270000, bonusPct: 0.35, stockUSD: 0 },
        { level: 3, title: "Senior Partner & Director", baseSalaryUSD: 1300000, bonusPct: 0.80, stockUSD: 300000 }
      ]
    },
    {
      id: "quant_trading",
      name: "Quantitative Trading (Citadel/Jane St)",
      icon: "⚡",
      requiredDegrees: ["Mathematics & Computing", "Physics & Quantum Eng", "Computer Science & AI"],
      minSmarts: 88,
      ladder: [
        { level: 1, title: "Junior Quant Researcher", baseSalaryUSD: 220000, bonusPct: 1.00, stockUSD: 60000 },
        { level: 2, title: "Senior Quant Portfolio Manager", baseSalaryUSD: 550000, bonusPct: 3.00, stockUSD: 500000 },
        { level: 3, title: "Head of Quantitative Strategies", baseSalaryUSD: 1100000, bonusPct: 5.00, stockUSD: 2500000 }
      ]
    }
  ];

  // --- 4. DATA: 120 CUSTOMIZABLE BUSINESSES ACROSS 12 SECTORS & 7 CAPITAL TIERS ---
// 120 Business Catalog across 12 Sectors and 7 Capital Tiers (A-G) with 18 Modular Economic Engines

const BUSINESS_SECTORS = [
  { id: "retail_food", name: "Retail, Food & Hospitality", icon: "🍽️", desc: "Restaurants, cafes, boutique hotels, and consumer storefronts." },
  { id: "local_services", name: "Local & Professional Services", icon: "💼", desc: "Law practices, consulting, medical clinics, and skilled local trades." },
  { id: "software_tech", name: "Software & Technology", icon: "💻", desc: "Cloud SaaS, cybersecurity, developer tooling, and AI foundation models." },
  { id: "platforms_internet", name: "Platforms & Internet", icon: "🌐", desc: "Two-sided marketplaces, gig networks, social media, and fintech rails." },
  { id: "media_entertainment", name: "Media, Entertainment & Education", icon: "🎬", desc: "Film studios, music catalogs, gaming franchises, and edtech." },
  { id: "manufacturing_hardware", name: "Manufacturing & Hardware", icon: "🏭", desc: "Precision machining, IoT electronics, battery gigafactories, and fabs." },
  { id: "healthcare_biotech", name: "Healthcare & Life Sciences", icon: "🧬", desc: "Surgical robotics, clinical longevity, specialty hospitals, and pharma." },
  { id: "financial_services", name: "Financial Services & Capital", icon: "🏛️", desc: "Quant HFT, venture capital, private equity, and commercial banks." },
  { id: "logistics_transport", name: "Logistics & Transportation", icon: "🚚", desc: "Cold storage, air cargo, container shipping fleets, and rail networks." },
  { id: "real_estate_construction", name: "Real Estate & Construction", icon: "🏗️", desc: "Luxury spec homes, modular housing, commercial towers, and seaports." },
  { id: "energy_infrastructure", name: "Energy, Resources & Infrastructure", icon: "⚡", desc: "Solar farms, battery storage, offshore wind, and modular nuclear SMRs." },
  { id: "agriculture_frontier", name: "Agriculture & Frontier Mega-Industry", icon: "🚀", desc: "Hydroponics, aquaculture, carbon capture, rockets, and space mining." }
];

const CAPITAL_TIERS = {
  A: { tier: "A", name: "Micro-Capital ($500 – $10k)", minCost: 500, maxCost: 10000, profile: "Bootstrapped / Personal Savings / Side Hustle" },
  B: { tier: "B", name: "Small Business ($10k – $100k)", minCost: 10000, maxCost: 100000, profile: "Friends & Family / Bank Micro-Loan" },
  C: { tier: "C", name: "Mid-Market Venture ($100k – $1M)", minCost: 100000, maxCost: 1000000, profile: "Angel Syndicates / Accelerators (YC, Sequoia Arc)" },
  D: { tier: "D", name: "Commercial Enterprise ($1M – $10M)", minCost: 1000000, maxCost: 10000000, profile: "Seed & Series A Venture Capital / Commercial Debt" },
  E: { tier: "E", name: "Growth Scale ($10M – $100M)", minCost: 10000000, maxCost: 100000000, profile: "Series B/C Growth Equity / Private Credit" },
  F: { tier: "F", name: "Institutional Heavyweight ($100M – $1B)", minCost: 100000000, maxCost: 1000000000, profile: "Private Equity Buyout / Sovereign Wealth Funds" },
  G: { tier: "G", name: "Sovereign Mega-Industry ($1B+)", minCost: 1000000000, maxCost: 50000000000, profile: "Global Syndicated Consortia / Sovereign State Backing" }
};

const ECONOMIC_ENGINES = {
  location_footfall: { id: "location_footfall", name: "Location & Footfall", icon: "📍", kpis: ["Daily Footfall", "Conversion Rate %", "Rent / SqFt", "Rev / SqFt"] },
  inventory: { id: "inventory", name: "Inventory Management", icon: "📦", kpis: ["Stockout Rate %", "Inventory Turnover", "Holding Cost", "Markdown %"] },
  perishables: { id: "perishables", name: "Perishables & Spoilage", icon: "🥑", kpis: ["Spoilage Rate %", "Shelf Life (Days)", "Cold-Chain Health", "Health Inspection Score"] },
  service_capacity: { id: "service_capacity", name: "Service Capacity & Utilization", icon: "⏱️", kpis: ["Billable Utilization %", "Realization Rate %", "Hourly Rate", "Partner Leverage"] },
  subscription: { id: "subscription", name: "Subscription & SaaS Recurring", icon: "🔄", kpis: ["ARR / MRR", "Logo Churn %", "Net Revenue Retention (NRR)", "LTV / CAC Ratio"] },
  enterprise_sales: { id: "enterprise_sales", name: "Enterprise B2B Pipeline", icon: "🤝", kpis: ["Average Contract Value (ACV)", "Sales Cycle (Months)", "Pipeline Coverage", "Win Rate %"] },
  marketplace: { id: "marketplace", name: "Two-Sided Marketplace", icon: "⚖️", kpis: ["Gross Merchandise Value (GMV)", "Take Rate %", "Buyer/Seller Ratio", "Liquidity Fill Rate %"] },
  advertising_attention: { id: "advertising_attention", name: "Attention & Advertising", icon: "👁️", kpis: ["Daily Active Users (DAU)", "eCPM ($)", "Ad Impressions / Day", "Ad Blocker Rate %"] },
  content_hits: { id: "content_hits", name: "Hit-Driven Media & Royalty", icon: "🎯", kpis: ["Hit Likelihood %", "Catalog Royalties", "Streaming Multiplier", "Box Office Multiple"] },
  manufacturing: { id: "manufacturing", name: "Industrial Manufacturing", icon: "⚙️", kpis: ["Plant Utilization %", "Line Yield %", "Unit Scrap Rate %", "Tooling Depreciation"] },
  hardware: { id: "hardware", name: "Hardware & Supply Chain", icon: "🔌", kpis: ["Bill of Materials (BOM)", "NRE Tooling Cost", "Component Lead Time", "Warranty Reserves %"] },
  fleet_transportation: { id: "fleet_transportation", name: "Fleet Logistics & Transport", icon: "🚛", kpis: ["Fleet Load Factor %", "Fuel Hedging Gain/Loss", "Maintenance per Mile", "Route Density"] },
  projects: { id: "projects", name: "Project Completion Accounting", icon: "📐", kpis: ["% of Completion", "Cost Overrun %", "Change Orders ($)", "Retention Receivables"] },
  asset_ownership: { id: "asset_ownership", name: "Heavy Asset Capitalization", icon: "🏢", kpis: ["Loan-To-Value (LTV) %", "Cap Rate %", "Asset Depreciation", "Refinancing Spread"] },
  regulated_balance_sheet: { id: "regulated_balance_sheet", name: "Regulated Financial Capital", icon: "🏦", kpis: ["Tier-1 Capital Adequacy %", "Net Interest Margin (NIM)", "Non-Performing Loans %", "Audit Rating"] },
  research_ip: { id: "research_ip", name: "Deep R&D & Patent Gauntlet", icon: "🔬", kpis: ["Clinical / TRL Stage", "Phase Success Prob %", "Patent Expiry Cliff", "R&D Intensity %"] },
  commodity_extraction: { id: "commodity_extraction", name: "Commodity Resource Extraction", icon: "⛏️", kpis: ["Proven Reserves (Units)", "Cash Cost per Unit ($)", "Ore Grade %", "Commodity Spot Price ($)"] },
  network_infrastructure: { id: "network_infrastructure", name: "Network Infrastructure", icon: "📡", kpis: ["Coverage Density", "Backhaul Throughput", "Capex per Pop", "Spectrum License Value"] }
};

const BUSINESS_CATALOG = [
  // ==========================================
  // SECTOR 1: Retail, Food & Hospitality (1-10)
  // ==========================================
  {
    id: "street_food_cart",
    name: "Artisanal Street Food & Chai Cart",
    sector: "Retail, Food & Hospitality",
    icon: "🥘",
    capitalTier: "A",
    startupCost: 1500,
    minSmarts: 40,
    margin: 0.65,
    multiple: 4,
    baseRev: 35000,
    boundEngines: ["location_footfall", "perishables", "inventory"],
    workingCapital: { dso: 0, dio: 4, dpo: 10, capexIntensity: 0.08 },
    desc: "Serve fresh authentic street culinary dishes and spiced chai with high daily footfall and instant cash settlement."
  },
  {
    id: "artisan_bakery",
    name: "Slow-Ferment Sourdough Bakery",
    sector: "Retail, Food & Hospitality",
    icon: "🥖",
    capitalTier: "A",
    startupCost: 8500,
    minSmarts: 48,
    margin: 0.70,
    multiple: 5,
    baseRev: 95000,
    boundEngines: ["perishables", "location_footfall", "inventory"],
    workingCapital: { dso: 2, dio: 6, dpo: 14, capexIntensity: 0.12 },
    desc: "Stone-milled organic flour and French laminated croissants sold out by 10 AM each morning."
  },
  {
    id: "espresso_bar",
    name: "Specialty Third-Wave Espresso Bar",
    sector: "Retail, Food & Hospitality",
    icon: "☕",
    capitalTier: "B",
    startupCost: 45000,
    minSmarts: 55,
    margin: 0.72,
    multiple: 6,
    baseRev: 280000,
    boundEngines: ["location_footfall", "inventory", "perishables"],
    workingCapital: { dso: 1, dio: 12, dpo: 20, capexIntensity: 0.15 },
    desc: "Single-origin Ethiopian pourovers and boutique espresso drinks with loyal repeat neighbourhood patrons."
  },
  {
    id: "craft_microbrewery",
    name: "Independent Craft Microbrewery & Taproom",
    sector: "Retail, Food & Hospitality",
    icon: "🍺",
    capitalTier: "B",
    startupCost: 85000,
    minSmarts: 60,
    margin: 0.62,
    multiple: 7,
    baseRev: 420000,
    boundEngines: ["manufacturing", "inventory", "location_footfall"],
    workingCapital: { dso: 15, dio: 35, dpo: 25, capexIntensity: 0.22 },
    desc: "Hazy IPAs, barrel-aged stouts, and botanical ciders brewed in copper tanks with an energetic taproom."
  },
  {
    id: "cocktail_speakeasy",
    name: "Secret Velvet Cocktail Speakeasy",
    sector: "Retail, Food & Hospitality",
    icon: "🍸",
    capitalTier: "C",
    startupCost: 250000,
    minSmarts: 62,
    margin: 0.78,
    multiple: 7,
    baseRev: 850000,
    boundEngines: ["location_footfall", "service_capacity", "inventory"],
    workingCapital: { dso: 3, dio: 25, dpo: 30, capexIntensity: 0.18 },
    desc: "Hidden doorway behind an antique bookstore serving rare vintage amari and craft mixology cocktails."
  },
  {
    id: "cloud_kitchen_hub",
    name: "Multi-Brand Ghost Kitchen Commissary",
    sector: "Retail, Food & Hospitality",
    icon: "🥡",
    capitalTier: "C",
    startupCost: 400000,
    minSmarts: 66,
    margin: 0.55,
    multiple: 8,
    baseRev: 1400000,
    boundEngines: ["perishables", "inventory", "manufacturing"],
    workingCapital: { dso: 10, dio: 8, dpo: 30, capexIntensity: 0.20 },
    desc: "Data-optimized commissary kitchen running 6 virtual delivery-only brands across DoorDash, UberEats, and Zomato."
  },
  {
    id: "michelin_restaurant",
    name: "Three-Michelin-Star Gastronomy Atelier",
    sector: "Retail, Food & Hospitality",
    icon: "🍽️",
    capitalTier: "D",
    startupCost: 2500000,
    minSmarts: 76,
    margin: 0.42,
    multiple: 7,
    baseRev: 3200000,
    boundEngines: ["perishables", "service_capacity", "content_hits"],
    workingCapital: { dso: 5, dio: 10, dpo: 30, capexIntensity: 0.25 },
    desc: "Sixteen-course seasonal tasting menu with a six-month reservation waiting list and world-class wine cellar."
  },
  {
    id: "heritage_boutique_hotel",
    name: "Heritage Riad & Luxury Boutique Hotel",
    sector: "Retail, Food & Hospitality",
    icon: "🏨",
    capitalTier: "D",
    startupCost: 4500000,
    minSmarts: 72,
    margin: 0.58,
    multiple: 11,
    baseRev: 3800000,
    boundEngines: ["asset_ownership", "service_capacity", "location_footfall"],
    workingCapital: { dso: 12, dio: 5, dpo: 30, capexIntensity: 0.35 },
    desc: "Historic 28-key palace restoration with high Average Daily Rates (ADR), courtyard fountains, and spa."
  },
  {
    id: "fast_casual_franchise",
    name: "National Fast-Casual Salad Franchise",
    sector: "Retail, Food & Hospitality",
    icon: "🥗",
    capitalTier: "E",
    startupCost: 25000000,
    minSmarts: 78,
    margin: 0.48,
    multiple: 14,
    baseRev: 38000000,
    boundEngines: ["location_footfall", "perishables", "inventory"],
    workingCapital: { dso: 4, dio: 5, dpo: 40, capexIntensity: 0.22 },
    desc: "Scalable healthy bowl concept with 80 franchised store locations, centralized cold-chain supply, and mobile ordering."
  },
  {
    id: "private_island_resort",
    name: "Ultra-Luxury Private Island Resort",
    sector: "Retail, Food & Hospitality",
    icon: "🏝️",
    capitalTier: "F",
    startupCost: 150000000,
    minSmarts: 82,
    margin: 0.64,
    multiple: 16,
    baseRev: 72000000,
    boundEngines: ["asset_ownership", "service_capacity", "location_footfall"],
    workingCapital: { dso: 20, dio: 15, dpo: 45, capexIntensity: 0.45 },
    desc: "Overwater coral villas, private jet airstrip, Michelin-starred chefs, and personal butlers for global high-net-worth VIPs."
  },

  // ==========================================
  // SECTOR 2: Local & Professional Services (11-20)
  // ==========================================
  {
    id: "window_solar_cleaning",
    name: "Residential Solar & Window Detailing",
    sector: "Local & Professional Services",
    icon: "🪟",
    capitalTier: "A",
    startupCost: 2500,
    minSmarts: 45,
    margin: 0.75,
    multiple: 4,
    baseRev: 48000,
    boundEngines: ["service_capacity", "location_footfall"],
    workingCapital: { dso: 5, dio: 3, dpo: 15, capexIntensity: 0.05 },
    desc: "Deionized pure water washing for residential photovoltaic panels and multi-story glass with high recurring margin."
  },
  {
    id: "mobile_auto_detailing",
    name: "Concierge Mobile Exotic Auto Detailing",
    sector: "Local & Professional Services",
    icon: "🏎️",
    capitalTier: "A",
    startupCost: 6000,
    minSmarts: 50,
    margin: 0.72,
    multiple: 4,
    baseRev: 82000,
    boundEngines: ["service_capacity", "inventory"],
    workingCapital: { dso: 3, dio: 8, dpo: 15, capexIntensity: 0.10 },
    desc: "Ceramic coatings, paint correction, and steam interior detailing delivered directly to luxury driveway carports."
  },
  {
    id: "commercial_hvac",
    name: "Commercial HVAC & Refrigeration Service",
    sector: "Local & Professional Services",
    icon: "❄️",
    capitalTier: "B",
    startupCost: 55000,
    minSmarts: 62,
    margin: 0.52,
    multiple: 6,
    baseRev: 340000,
    boundEngines: ["service_capacity", "inventory", "enterprise_sales"],
    workingCapital: { dso: 45, dio: 20, dpo: 30, capexIntensity: 0.18 },
    desc: "Quarterly preventative maintenance contracts and 24/7 emergency chillers for corporate offices and grocery chains."
  },
  {
    id: "boutique_pilates_studio",
    name: "Reformer Pilates & Wellness Sanctuary",
    sector: "Local & Professional Services",
    icon: "🧘‍♀️",
    capitalTier: "B",
    startupCost: 75000,
    minSmarts: 58,
    margin: 0.65,
    multiple: 6,
    baseRev: 320000,
    boundEngines: ["subscription", "service_capacity", "location_footfall"],
    workingCapital: { dso: 2, dio: 4, dpo: 20, capexIntensity: 0.15 },
    desc: "Boutique Allegro 2 reformers, infrared saunas, and recurring monthly membership dues from affluent fitness regulars."
  },
  {
    id: "corporate_immigration_law",
    name: "Boutique Corporate Immigration Law Firm",
    sector: "Local & Professional Services",
    icon: "⚖️",
    capitalTier: "C",
    startupCost: 180000,
    minSmarts: 75,
    margin: 0.68,
    multiple: 8,
    baseRev: 920000,
    boundEngines: ["service_capacity", "enterprise_sales"],
    workingCapital: { dso: 60, dio: 0, dpo: 25, capexIntensity: 0.05 },
    desc: "Advising Silicon Valley tech firms on O-1, H-1B, and EB-1 extraordinary ability talent petitions with high retainer fees."
  },
  {
    id: "exec_search_headhunting",
    name: "Executive Search & C-Suite Headhunting",
    sector: "Local & Professional Services",
    icon: "🎯",
    capitalTier: "C",
    startupCost: 220000,
    minSmarts: 78,
    margin: 0.74,
    multiple: 7,
    baseRev: 1200000,
    boundEngines: ["service_capacity", "enterprise_sales"],
    workingCapital: { dso: 50, dio: 0, dpo: 20, capexIntensity: 0.04 },
    desc: "Retained search partner charging 33% of first-year executive compensation placing Fortune 500 CEOs, CTOs, and Board Directors."
  },
  {
    id: "forensic_accounting",
    name: "Forensic Accounting & Asset Tracing Firm",
    sector: "Local & Professional Services",
    icon: "🔍",
    capitalTier: "D",
    startupCost: 1200000,
    minSmarts: 84,
    margin: 0.66,
    multiple: 9,
    baseRev: 2900000,
    boundEngines: ["service_capacity", "projects", "enterprise_sales"],
    workingCapital: { dso: 75, dio: 0, dpo: 30, capexIntensity: 0.08 },
    desc: "Court-appointed financial investigators unravelling offshore tax evasion, Ponzi syndicates, and disputed billionaire divorces."
  },
  {
    id: "starchitect_atelier",
    name: "Starchitect Architectural Atelier",
    sector: "Local & Professional Services",
    icon: "📐",
    capitalTier: "D",
    startupCost: 2800000,
    minSmarts: 85,
    margin: 0.60,
    multiple: 9,
    baseRev: 4500000,
    boundEngines: ["projects", "service_capacity", "content_hits"],
    workingCapital: { dso: 90, dio: 0, dpo: 35, capexIntensity: 0.12 },
    desc: "Parametric cultural museums, sovereign civic monuments, and ultra-prime penthouses commanding 12% construction design fees."
  },
  {
    id: "strategy_consulting_partnership",
    name: "Global Strategy Consulting Partnership",
    sector: "Local & Professional Services",
    icon: "📊",
    capitalTier: "E",
    startupCost: 35000000,
    minSmarts: 88,
    margin: 0.55,
    multiple: 12,
    baseRev: 65000000,
    boundEngines: ["service_capacity", "enterprise_sales", "projects"],
    workingCapital: { dso: 80, dio: 0, dpo: 30, capexIntensity: 0.06 },
    desc: "Advising G7 sovereigns and Fortune 50 multinationals on M&A integration, antitrust carveouts, and organizational restructuring."
  },
  {
    id: "facilities_management_conglomerate",
    name: "Mega-Scale Facilities Services Conglomerate",
    sector: "Local & Professional Services",
    icon: "🏢",
    capitalTier: "F",
    startupCost: 120000000,
    minSmarts: 76,
    margin: 0.28,
    multiple: 8,
    baseRev: 210000000,
    boundEngines: ["enterprise_sales", "service_capacity", "fleet_transportation"],
    workingCapital: { dso: 60, dio: 12, dpo: 45, capexIntensity: 0.14 },
    desc: "15,000-person unified janitorial, physical perimeter security, and plant maintenance for 45 international airport terminals."
  },

  // ==========================================
  // SECTOR 3: Software & Technology (21-30)
  // ==========================================
  {
    id: "micro_saas_tool",
    name: "Indie Micro-SaaS Workflow Utility",
    sector: "Software & Technology",
    icon: "⚡",
    capitalTier: "A",
    startupCost: 4000,
    minSmarts: 65,
    margin: 0.88,
    multiple: 8,
    baseRev: 65000,
    boundEngines: ["subscription", "advertising_attention"],
    workingCapital: { dso: 0, dio: 0, dpo: 15, capexIntensity: 0.05 },
    desc: "Automated webhook sync tool for remote teams charging $29/mo recurring on Stripe with 92% gross margin."
  },
  {
    id: "ecommerce_plugin",
    name: "Shopify Conversion & E-commerce Plugin",
    sector: "Software & Technology",
    icon: "🛍️",
    capitalTier: "B",
    startupCost: 30000,
    minSmarts: 70,
    margin: 0.85,
    multiple: 9,
    baseRev: 220000,
    boundEngines: ["subscription", "marketplace"],
    workingCapital: { dso: 30, dio: 0, dpo: 20, capexIntensity: 0.06 },
    desc: "Checkout upsell algorithm installed on 8,000 Shopify stores with automated monthly usage-based tiers."
  },
  {
    id: "mobile_game_studio",
    name: "Hyper-Casual Mobile Game Studio",
    sector: "Software & Technology",
    icon: "📱",
    capitalTier: "B",
    startupCost: 60000,
    minSmarts: 72,
    margin: 0.70,
    multiple: 7,
    baseRev: 380000,
    boundEngines: ["content_hits", "advertising_attention"],
    workingCapital: { dso: 45, dio: 0, dpo: 25, capexIntensity: 0.10 },
    desc: "Rapid-iteration puzzle mobile games monetized through rewarded video ads and in-app currency microtransactions."
  },
  {
    id: "vertical_saas_dental",
    name: "Vertical Practice Cloud SaaS",
    sector: "Software & Technology",
    icon: "🦷",
    capitalTier: "C",
    startupCost: 350000,
    minSmarts: 78,
    margin: 0.82,
    multiple: 12,
    baseRev: 1100000,
    boundEngines: ["subscription", "enterprise_sales"],
    workingCapital: { dso: 30, dio: 0, dpo: 30, capexIntensity: 0.08 },
    desc: "End-to-end cloud scheduling, insurance claim clearinghouse, and 3D imaging software for private medical clinics."
  },
  {
    id: "ai_voice_agents_api",
    name: "Real-Time AI Voice Agent Developer API",
    sector: "Software & Technology",
    icon: "🎙️",
    capitalTier: "C",
    startupCost: 600000,
    minSmarts: 84,
    margin: 0.78,
    multiple: 16,
    baseRev: 1800000,
    boundEngines: ["subscription", "research_ip"],
    workingCapital: { dso: 30, dio: 0, dpo: 30, capexIntensity: 0.22 },
    desc: "Sub-200ms latency conversational speech-to-speech API licensing compute tokens to enterprise contact centers."
  },
  {
    id: "dev_database_infra",
    name: "Distributed Serverless Database Rails",
    sector: "Software & Technology",
    icon: "💾",
    capitalTier: "D",
    startupCost: 3500000,
    minSmarts: 88,
    margin: 0.84,
    multiple: 18,
    baseRev: 6200000,
    boundEngines: ["subscription", "enterprise_sales", "network_infrastructure"],
    workingCapital: { dso: 45, dio: 0, dpo: 35, capexIntensity: 0.28 },
    desc: "Multi-region low-latency ACID database engine charging developer teams for read/write compute throughput."
  },
  {
    id: "zero_trust_cybersecurity",
    name: "Zero-Trust Enterprise Cybersecurity Perimeter",
    sector: "Software & Technology",
    icon: "🛡️",
    capitalTier: "D",
    startupCost: 6000000,
    minSmarts: 86,
    margin: 0.82,
    multiple: 16,
    baseRev: 9500000,
    boundEngines: ["subscription", "enterprise_sales"],
    workingCapital: { dso: 60, dio: 0, dpo: 30, capexIntensity: 0.12 },
    desc: "Sovereign defensive identity perimeter, autonomous threat containment, and automated penetration testing for banks."
  },
  {
    id: "frontier_ai_lab",
    name: "Frontier Foundation Multimodal AI Lab",
    sector: "Software & Technology",
    icon: "🧠",
    capitalTier: "E",
    startupCost: 45000000,
    minSmarts: 94,
    margin: 0.74,
    multiple: 26,
    baseRev: 75000000,
    boundEngines: ["research_ip", "subscription", "hardware"],
    workingCapital: { dso: 45, dio: 0, dpo: 40, capexIntensity: 0.55 },
    desc: "Training 100B+ parameter frontier models on 30,000-GPU clusters, licensing reasoning API tokens to sovereign governments."
  },
  {
    id: "hyperscale_cloud",
    name: "Sovereign Hyperscale Cloud Infrastructure",
    sector: "Software & Technology",
    icon: "☁️",
    capitalTier: "F",
    startupCost: 250000000,
    minSmarts: 90,
    margin: 0.62,
    multiple: 18,
    baseRev: 320000000,
    boundEngines: ["network_infrastructure", "asset_ownership", "subscription"],
    workingCapital: { dso: 50, dio: 10, dpo: 45, capexIntensity: 0.42 },
    desc: "Tier-4 datacenter campus providing bare-metal compute, sovereign data compliance, and fiber-optic edge transit."
  },
  {
    id: "semiconductor_eda_design",
    name: "Semiconductor EDA & Fabless IP Core Giant",
    sector: "Software & Technology",
    icon: "🔲",
    capitalTier: "G",
    startupCost: 1200000000,
    minSmarts: 96,
    margin: 0.88,
    multiple: 30,
    baseRev: 1400000000,
    boundEngines: ["research_ip", "enterprise_sales", "hardware"],
    workingCapital: { dso: 75, dio: 15, dpo: 45, capexIntensity: 0.35 },
    desc: "Designing patented neural processing cores and sub-2nm electronic design automation suites licensed to global chipmakers."
  },

  // ==========================================
  // SECTOR 4: Platforms & Internet (31-40)
  // ==========================================
  {
    id: "niche_job_board",
    name: "Curated Remote Engineering Job Board",
    sector: "Platforms & Internet",
    icon: "📋",
    capitalTier: "A",
    startupCost: 3500,
    minSmarts: 58,
    margin: 0.90,
    multiple: 6,
    baseRev: 55000,
    boundEngines: ["marketplace", "advertising_attention"],
    workingCapital: { dso: 0, dio: 0, dpo: 15, capexIntensity: 0.04 },
    desc: "Charging $299 per 30-day hiring spotlight listing to YC startups seeking elite remote systems engineers."
  },
  {
    id: "local_services_mkt",
    name: "Vetted Local Home Services Marketplace",
    sector: "Platforms & Internet",
    icon: "🏡",
    capitalTier: "B",
    startupCost: 40000,
    minSmarts: 65,
    margin: 0.72,
    multiple: 8,
    baseRev: 260000,
    boundEngines: ["marketplace", "location_footfall"],
    workingCapital: { dso: 5, dio: 0, dpo: 25, capexIntensity: 0.08 },
    desc: "Taking a 14% commission matching verified plumbers, electricians, and landscapers with affluent suburban homeowners."
  },
  {
    id: "equipment_rental_platform",
    name: "Peer-to-Peer Heavy Equipment Sharing",
    sector: "Platforms & Internet",
    icon: "🚜",
    capitalTier: "B",
    startupCost: 80000,
    minSmarts: 68,
    margin: 0.68,
    multiple: 8,
    baseRev: 420000,
    boundEngines: ["marketplace", "asset_ownership"],
    workingCapital: { dso: 15, dio: 0, dpo: 30, capexIntensity: 0.12 },
    desc: "Facilitating rentals of excavators, scissor lifts, and generators between idle contractors with built-in cargo insurance."
  },
  {
    id: "b2b_wholesale_mkt",
    name: "B2B Wholesale Construction Supply Exchange",
    sector: "Platforms & Internet",
    icon: "🧱",
    capitalTier: "C",
    startupCost: 450000,
    minSmarts: 74,
    margin: 0.45,
    multiple: 10,
    baseRev: 2800000,
    boundEngines: ["marketplace", "enterprise_sales", "inventory"],
    workingCapital: { dso: 45, dio: 12, dpo: 40, capexIntensity: 0.10 },
    desc: "Connecting cement mills and steel fabricators directly to general contractors with Net-30 invoice factoring."
  },
  {
    id: "creator_monetization_app",
    name: "Creator Membership & Paid Community Platform",
    sector: "Platforms & Internet",
    icon: "✨",
    capitalTier: "C",
    startupCost: 750000,
    minSmarts: 76,
    margin: 0.80,
    multiple: 14,
    baseRev: 2200000,
    boundEngines: ["marketplace", "subscription", "advertising_attention"],
    workingCapital: { dso: 2, dio: 0, dpo: 30, capexIntensity: 0.08 },
    desc: "Takes 8% of creator subscriptions, course sales, and VIP fan discords for 100,000 independent media educators."
  },
  {
    id: "remittance_fintech_rails",
    name: "Cross-Border FX Remittance & Neobank",
    sector: "Platforms & Internet",
    icon: "💸",
    capitalTier: "D",
    startupCost: 4000000,
    minSmarts: 84,
    margin: 0.65,
    multiple: 15,
    baseRev: 8500000,
    boundEngines: ["regulated_balance_sheet", "subscription", "marketplace"],
    workingCapital: { dso: 2, dio: 0, dpo: 15, capexIntensity: 0.15 },
    desc: "Zero-fee remittances and multi-currency accounts charging 40 bps foreign exchange margin across Latin America and Asia."
  },
  {
    id: "urban_micromobility",
    name: "Autonomous Dockless E-Scooter Network",
    sector: "Platforms & Internet",
    icon: "🛴",
    capitalTier: "D",
    startupCost: 8500000,
    minSmarts: 76,
    margin: 0.46,
    multiple: 8,
    baseRev: 14000000,
    boundEngines: ["fleet_transportation", "hardware", "location_footfall"],
    workingCapital: { dso: 3, dio: 20, dpo: 35, capexIntensity: 0.38 },
    desc: "IoT-connected electric scooters across 12 metropolitan hubs with GPS geofencing and swappable battery depots."
  },
  {
    id: "superapp_delivery_network",
    name: "On-Demand Super-App Ride & Courier",
    sector: "Platforms & Internet",
    icon: "🚖",
    capitalTier: "E",
    startupCost: 65000000,
    minSmarts: 82,
    margin: 0.35,
    multiple: 12,
    baseRev: 160000000,
    boundEngines: ["marketplace", "fleet_transportation", "advertising_attention"],
    workingCapital: { dso: 10, dio: 0, dpo: 14, capexIntensity: 0.15 },
    desc: "Two-sided algorithmic matching routing millions of passenger rides and restaurant meals daily with surge pricing."
  },
  {
    id: "short_video_network",
    name: "Algorithmic Short-Video Attention Platform",
    sector: "Platforms & Internet",
    icon: "📱🔥",
    capitalTier: "F",
    startupCost: 300000000,
    minSmarts: 88,
    margin: 0.68,
    multiple: 20,
    baseRev: 620000000,
    boundEngines: ["advertising_attention", "content_hits", "network_infrastructure"],
    workingCapital: { dso: 55, dio: 0, dpo: 40, capexIntensity: 0.30 },
    desc: "Global video feed powered by deep recommendation graphs capturing 85 minutes of daily user attention per active account."
  },
  {
    id: "global_ecommerce_fulfillment",
    name: "Global E-Commerce Logistics Marketplace",
    sector: "Platforms & Internet",
    icon: "📦🌐",
    capitalTier: "G",
    startupCost: 2000000000,
    minSmarts: 92,
    margin: 0.32,
    multiple: 16,
    baseRev: 4500000000,
    boundEngines: ["marketplace", "fleet_transportation", "inventory"],
    workingCapital: { dso: 25, dio: 18, dpo: 65, capexIntensity: 0.35 },
    desc: "Unifying 500,000 merchants with robotic sorting hubs, same-day air delivery, and full prime subscription loyalty."
  },

  // ==========================================
  // SECTOR 5: Media, Entertainment & Education (41-50)
  // ==========================================
  {
    id: "paid_substack_newsletter",
    name: "Institutional Macro Finance Newsletter",
    sector: "Media, Entertainment & Education",
    icon: "📰",
    capitalTier: "A",
    startupCost: 1800,
    minSmarts: 72,
    margin: 0.92,
    multiple: 6,
    baseRev: 52000,
    boundEngines: ["subscription", "content_hits"],
    workingCapital: { dso: 0, dio: 0, dpo: 10, capexIntensity: 0.02 },
    desc: "Delivering deep central bank liquidity and geopolitical risk analyses to 2,500 paying hedge fund subscribers at $35/month."
  },
  {
    id: "podcast_network",
    name: "Independent Studio Podcast Network",
    sector: "Media, Entertainment & Education",
    icon: "🎙️",
    capitalTier: "B",
    startupCost: 35000,
    minSmarts: 65,
    margin: 0.74,
    multiple: 6,
    baseRev: 190000,
    boundEngines: ["advertising_attention", "content_hits"],
    workingCapital: { dso: 60, dio: 0, dpo: 20, capexIntensity: 0.12 },
    desc: "Four weekly narrative series with 2M monthly downloads securing dynamic host-read sponsorship ad packages."
  },
  {
    id: "adaptive_coding_bootcamp",
    name: "AI & Full-Stack Career Bootcamp",
    sector: "Media, Entertainment & Education",
    icon: "🎓",
    capitalTier: "B",
    startupCost: 90000,
    minSmarts: 72,
    margin: 0.65,
    multiple: 7,
    baseRev: 450000,
    boundEngines: ["service_capacity", "subscription"],
    workingCapital: { dso: 30, dio: 0, dpo: 25, capexIntensity: 0.10 },
    desc: "16-week rigorous software engineering immersion with Income Share Agreements (ISAs) and enterprise hiring pipelines."
  },
  {
    id: "comic_ip_studio",
    name: "Graphic Novel & Superhero IP Atelier",
    sector: "Media, Entertainment & Education",
    icon: "🦸‍♂️",
    capitalTier: "C",
    startupCost: 250000,
    minSmarts: 70,
    margin: 0.68,
    multiple: 10,
    baseRev: 720000,
    boundEngines: ["content_hits", "inventory"],
    workingCapital: { dso: 45, dio: 25, dpo: 30, capexIntensity: 0.15 },
    desc: "Creating cinematic graphic novel universes, character trademarks, and Kickstarter physical special editions."
  },
  {
    id: "esports_franchise",
    name: "Global Esports Championship Franchise",
    sector: "Media, Entertainment & Education",
    icon: "🎮🏆",
    capitalTier: "C",
    startupCost: 800000,
    minSmarts: 68,
    margin: 0.52,
    multiple: 8,
    baseRev: 1600000,
    boundEngines: ["advertising_attention", "content_hits", "service_capacity"],
    workingCapital: { dso: 60, dio: 10, dpo: 30, capexIntensity: 0.14 },
    desc: "Franchised league tournament slots in League of Legends and Counter-Strike with global sponsorship deals and jersey apparel."
  },
  {
    id: "film_production_house",
    name: "Prestige Feature Film Production Studio",
    sector: "Media, Entertainment & Education",
    icon: "🎬",
    capitalTier: "D",
    startupCost: 4000000,
    minSmarts: 76,
    margin: 0.55,
    multiple: 11,
    baseRev: 6500000,
    boundEngines: ["content_hits", "projects"],
    workingCapital: { dso: 90, dio: 0, dpo: 40, capexIntensity: 0.25 },
    desc: "A24-style theatrical indie pictures premiering at Sundance and licensed globally to Netflix, Apple TV, and MUBI."
  },
  {
    id: "music_publishing_catalog",
    name: "Evergreen Music Publishing & Royalties",
    sector: "Media, Entertainment & Education",
    icon: "💿",
    capitalTier: "D",
    startupCost: 8000000,
    minSmarts: 74,
    margin: 0.82,
    multiple: 14,
    baseRev: 7800000,
    boundEngines: ["content_hits", "asset_ownership"],
    workingCapital: { dso: 75, dio: 0, dpo: 20, capexIntensity: 0.10 },
    desc: "Acquiring timeless master recording rights generating perpetual quarterly streaming and synch licensing revenues."
  },
  {
    id: "aaa_game_studio",
    name: "AAA Open-World Unreal Engine Studio",
    sector: "Media, Entertainment & Education",
    icon: "🕹️",
    capitalTier: "E",
    startupCost: 50000000,
    minSmarts: 86,
    margin: 0.65,
    multiple: 14,
    baseRev: 75000000,
    boundEngines: ["content_hits", "projects", "research_ip"],
    workingCapital: { dso: 45, dio: 5, dpo: 35, capexIntensity: 0.35 },
    desc: "Developing cinematic sci-fi RPGs on PlayStation 5, Xbox, and Steam with 250 in-house motion-capture artists and engineers."
  },
  {
    id: "streaming_platform",
    name: "Independent Subscription Streaming Video Network",
    sector: "Media, Entertainment & Education",
    icon: "📺",
    capitalTier: "F",
    startupCost: 200000000,
    minSmarts: 84,
    margin: 0.44,
    multiple: 12,
    baseRev: 310000000,
    boundEngines: ["subscription", "content_hits", "network_infrastructure"],
    workingCapital: { dso: 15, dio: 0, dpo: 45, capexIntensity: 0.40 },
    desc: "Global 4K content distribution network serving 15 million paid monthly active households with exclusive original dramas."
  },
  {
    id: "cinematic_theme_park",
    name: "Cinematic Universe Destination Theme Park",
    sector: "Media, Entertainment & Education",
    icon: "🎢",
    capitalTier: "G",
    startupCost: 1500000000,
    minSmarts: 85,
    margin: 0.42,
    multiple: 15,
    baseRev: 1800000000,
    boundEngines: ["location_footfall", "asset_ownership", "content_hits"],
    workingCapital: { dso: 10, dio: 12, dpo: 50, capexIntensity: 0.48 },
    desc: "400-acre immersive roller coaster resort with themed luxury hotels, waterparks, and character IP merchandise."
  },

  // ==========================================
  // SECTOR 6: Manufacturing & Hardware (51-60)
  // ==========================================
  {
    id: "mechanical_keyboards",
    name: "Custom CNC Mechanical Keyboards",
    sector: "Manufacturing & Hardware",
    icon: "⌨️",
    capitalTier: "A",
    startupCost: 5000,
    minSmarts: 60,
    margin: 0.58,
    multiple: 5,
    baseRev: 72000,
    boundEngines: ["manufacturing", "inventory"],
    workingCapital: { dso: 5, dio: 25, dpo: 20, capexIntensity: 0.15 },
    desc: "Anodized aluminum cases, brass weight bars, and hand-lubed switches sold in limited-run community group buys."
  },
  {
    id: "artisanal_leather_atelier",
    name: "Artisanal Saddleback Leather Workshop",
    sector: "Manufacturing & Hardware",
    icon: "👜",
    capitalTier: "B",
    startupCost: 35000,
    minSmarts: 56,
    margin: 0.65,
    multiple: 5,
    baseRev: 180000,
    boundEngines: ["manufacturing", "inventory"],
    workingCapital: { dso: 10, dio: 35, dpo: 25, capexIntensity: 0.14 },
    desc: "Full-grain Italian bridle leather travel bags and wallets hand-stitched with rot-resistant waxed linen thread."
  },
  {
    id: "cnc_machining_shop",
    name: "5-Axis Precision Aerospace CNC Shop",
    sector: "Manufacturing & Hardware",
    icon: "⚙️",
    capitalTier: "B",
    startupCost: 95000,
    minSmarts: 70,
    margin: 0.52,
    multiple: 6,
    baseRev: 380000,
    boundEngines: ["manufacturing", "service_capacity"],
    workingCapital: { dso: 50, dio: 20, dpo: 30, capexIntensity: 0.28 },
    desc: "Machining titanium and Inconel aerospace components to 5-micron tolerances for satellite and defense contractors."
  },
  {
    id: "smart_home_iot",
    name: "Connected Smart Home IoT Hardware",
    sector: "Manufacturing & Hardware",
    icon: "💡",
    capitalTier: "C",
    startupCost: 450000,
    minSmarts: 76,
    margin: 0.54,
    multiple: 10,
    baseRev: 1600000,
    boundEngines: ["hardware", "manufacturing", "inventory"],
    workingCapital: { dso: 40, dio: 45, dpo: 35, capexIntensity: 0.22 },
    desc: "Matter-compatible wireless circadian LED fixtures with custom ASIC microcontrollers sold direct-to-consumer."
  },
  {
    id: "industrial_drones",
    name: "Autonomous Infrastructure Inspection Drones",
    sector: "Manufacturing & Hardware",
    icon: "🛸",
    capitalTier: "C",
    startupCost: 850000,
    minSmarts: 82,
    margin: 0.58,
    multiple: 12,
    baseRev: 2400000,
    boundEngines: ["hardware", "enterprise_sales", "research_ip"],
    workingCapital: { dso: 60, dio: 35, dpo: 35, capexIntensity: 0.24 },
    desc: "Long-range LiDAR drones conducting automated structural surveys of utility high-voltage pylons and offshore wind farms."
  },
  {
    id: "orthopedic_implants",
    name: "Medical 3D-Printed Titanium Implants",
    sector: "Manufacturing & Hardware",
    icon: "🦾",
    capitalTier: "D",
    startupCost: 3500000,
    minSmarts: 86,
    margin: 0.68,
    multiple: 14,
    baseRev: 5800000,
    boundEngines: ["manufacturing", "research_ip", "enterprise_sales"],
    workingCapital: { dso: 75, dio: 30, dpo: 40, capexIntensity: 0.32 },
    desc: "Additive laser sintering producing patient-specific trabecular bone titanium spinal cages and hip joints."
  },
  {
    id: "electric_motorcycle_plant",
    name: "Performance Electric Motorcycle Assembly",
    sector: "Manufacturing & Hardware",
    icon: "⚡🏍️",
    capitalTier: "D",
    startupCost: 9000000,
    minSmarts: 80,
    margin: 0.38,
    multiple: 11,
    baseRev: 14000000,
    boundEngines: ["manufacturing", "hardware", "inventory"],
    workingCapital: { dso: 40, dio: 55, dpo: 45, capexIntensity: 0.35 },
    desc: "Aerodynamic carbon-chassis electric hyper-motorcycles with 200 kW liquid-cooled motors and 15-minute DC fast charging."
  },
  {
    id: "solid_state_gigafactory",
    name: "Solid-State EV Battery Cell Gigafactory",
    sector: "Manufacturing & Hardware",
    icon: "🔋",
    capitalTier: "E",
    startupCost: 80000000,
    minSmarts: 90,
    margin: 0.34,
    multiple: 16,
    baseRev: 140000000,
    boundEngines: ["manufacturing", "research_ip", "enterprise_sales"],
    workingCapital: { dso: 65, dio: 40, dpo: 50, capexIntensity: 0.50 },
    desc: "Roll-to-roll dry electrode manufacturing of non-flammable solid ceramic electrolyte cells for tier-1 automakers."
  },
  {
    id: "commercial_aerostructures",
    name: "Commercial Jetliner Aerostructures Plant",
    sector: "Manufacturing & Hardware",
    icon: "✈️",
    capitalTier: "F",
    startupCost: 400000000,
    minSmarts: 88,
    margin: 0.26,
    multiple: 10,
    baseRev: 550000000,
    boundEngines: ["manufacturing", "projects", "enterprise_sales"],
    workingCapital: { dso: 90, dio: 60, dpo: 60, capexIntensity: 0.40 },
    desc: "Autoclave fabrication of carbon-fiber composite wings and fuselages contracted by Boeing and Airbus on 10-year orders."
  },
  {
    id: "euv_silicon_foundry",
    name: "Leading-Edge EUV Semiconductor Foundry",
    sector: "Manufacturing & Hardware",
    icon: "🔬🔲",
    capitalTier: "G",
    startupCost: 15000000000,
    minSmarts: 96,
    margin: 0.52,
    multiple: 24,
    baseRev: 18000000000,
    boundEngines: ["manufacturing", "hardware", "research_ip"],
    workingCapital: { dso: 60, dio: 50, dpo: 60, capexIntensity: 0.65 },
    desc: "Class-1 cleanroom fab operating High-NA Extreme Ultraviolet lithography scanners printing 1.4nm GAA silicon wafers."
  },

  // ==========================================
  // SECTOR 7: Healthcare & Life Sciences (61-70)
  // ==========================================
  {
    id: "telehealth_network",
    name: "Boutique Telehealth Mental Health Clinic",
    sector: "Healthcare & Life Sciences",
    icon: "💬",
    capitalTier: "A",
    startupCost: 8000,
    minSmarts: 65,
    margin: 0.76,
    multiple: 7,
    baseRev: 110000,
    boundEngines: ["service_capacity", "subscription"],
    workingCapital: { dso: 15, dio: 0, dpo: 15, capexIntensity: 0.05 },
    desc: "Matching board-certified therapists with clients for weekly video consultations via HIPAA-compliant encrypted web portal."
  },
  {
    id: "mobile_diagnostics_van",
    name: "Mobile Ultrasound & Cardiogram Van",
    sector: "Healthcare & Life Sciences",
    icon: "🚐🩺",
    capitalTier: "B",
    startupCost: 60000,
    minSmarts: 70,
    margin: 0.64,
    multiple: 6,
    baseRev: 260000,
    boundEngines: ["service_capacity", "fleet_transportation"],
    workingCapital: { dso: 40, dio: 5, dpo: 20, capexIntensity: 0.20 },
    desc: "Traveling biometric diagnostic van servicing corporate wellness retreats and rural nursing centers with instant cardiologist review."
  },
  {
    id: "sports_rehab_center",
    name: "Orthopedic Physical Therapy & Cryo Center",
    sector: "Healthcare & Life Sciences",
    icon: "🏃‍♂️🩹",
    capitalTier: "B",
    startupCost: 95000,
    minSmarts: 68,
    margin: 0.58,
    multiple: 7,
    baseRev: 390000,
    boundEngines: ["service_capacity", "location_footfall"],
    workingCapital: { dso: 45, dio: 5, dpo: 25, capexIntensity: 0.18 },
    desc: "Sports injury rehabilitation, whole-body cryotherapy chambers, and dry-needling clinic with recurring insurance billing."
  },
  {
    id: "compounding_pharmacy",
    name: "Specialty Peptide & Hormone Pharmacy",
    sector: "Healthcare & Life Sciences",
    icon: "💊",
    capitalTier: "C",
    startupCost: 500000,
    minSmarts: 80,
    margin: 0.66,
    multiple: 9,
    baseRev: 1800000,
    boundEngines: ["perishables", "inventory", "manufacturing"],
    workingCapital: { dso: 30, dio: 20, dpo: 30, capexIntensity: 0.18 },
    desc: "Sterile compounding of custom bio-identical hormones, GLP-1 peptide blends, and dermatological retinoid solutions."
  },
  {
    id: "dental_implant_chain",
    name: "Full-Arch 3D Dental Implant Center",
    sector: "Healthcare & Life Sciences",
    icon: "🦷✨",
    capitalTier: "C",
    startupCost: 900000,
    minSmarts: 78,
    margin: 0.62,
    multiple: 8,
    baseRev: 2600000,
    boundEngines: ["service_capacity", "manufacturing", "location_footfall"],
    workingCapital: { dso: 25, dio: 15, dpo: 30, capexIntensity: 0.25 },
    desc: "Same-day All-on-4 zirconia dental implants utilizing in-house cone-beam CT scanning and automated ceramic milling."
  },
  {
    id: "surgical_robotics_oem",
    name: "Sub-Millimeter Robotic Surgery Systems",
    sector: "Healthcare & Life Sciences",
    icon: "🦾🔬",
    capitalTier: "D",
    startupCost: 5500000,
    minSmarts: 88,
    margin: 0.72,
    multiple: 18,
    baseRev: 8500000,
    boundEngines: ["research_ip", "hardware", "enterprise_sales"],
    workingCapital: { dso: 75, dio: 35, dpo: 40, capexIntensity: 0.30 },
    desc: "Multi-jointed robotic consoles for laparoscopic neurosurgery, selling hardware units plus high-margin consumable instruments."
  },
  {
    id: "concierge_hospital",
    name: "Private Specialty Surgical Hospital",
    sector: "Healthcare & Life Sciences",
    icon: "🏥",
    capitalTier: "D",
    startupCost: 9500000,
    minSmarts: 82,
    margin: 0.44,
    multiple: 11,
    baseRev: 16000000,
    boundEngines: ["service_capacity", "asset_ownership", "regulated_balance_sheet"],
    workingCapital: { dso: 65, dio: 12, dpo: 45, capexIntensity: 0.35 },
    desc: "40-bed boutique inpatient surgical pavilion with Michelin room service, private suites, and elective orthopedic theaters."
  },
  {
    id: "longevity_cellular_clinic",
    name: "Cellular Longevity & Epigenetic Institute",
    sector: "Healthcare & Life Sciences",
    icon: "⏳🧬",
    capitalTier: "E",
    startupCost: 30000000,
    minSmarts: 90,
    margin: 0.68,
    multiple: 18,
    baseRev: 42000000,
    boundEngines: ["service_capacity", "research_ip", "subscription"],
    workingCapital: { dso: 20, dio: 15, dpo: 30, capexIntensity: 0.30 },
    desc: "Stem cell banking, hyperbaric oxygen suites, NAD+ infusions, and epigenetic age testing memberships for $50k/year."
  },
  {
    id: "oncology_biotech_phase3",
    name: "Targeted Oncology Antibody-Drug Conjugate Biotech",
    sector: "Healthcare & Life Sciences",
    icon: "🔬💊",
    capitalTier: "F",
    startupCost: 180000000,
    minSmarts: 94,
    margin: 0.85,
    multiple: 28,
    baseRev: 120000000,
    boundEngines: ["research_ip", "regulated_balance_sheet"],
    workingCapital: { dso: 60, dio: 20, dpo: 40, capexIntensity: 0.45 },
    desc: "Conducting global Phase-III FDA pivotal clinical trials for next-gen antibody-drug conjugates eradicating metastatic solid tumors."
  },
  {
    id: "mrna_vaccine_campus",
    name: "Sovereign mRNA Vaccine & Biologics Campus",
    sector: "Healthcare & Life Sciences",
    icon: "🧬🏭",
    capitalTier: "G",
    startupCost: 1100000000,
    minSmarts: 92,
    margin: 0.58,
    multiple: 20,
    baseRev: 1600000000,
    boundEngines: ["manufacturing", "research_ip", "regulated_balance_sheet"],
    workingCapital: { dso: 70, dio: 45, dpo: 50, capexIntensity: 0.50 },
    desc: "Capping 500M annual doses of lipid nanoparticle mRNA vaccines and therapeutic biologics under federal pandemic preparedness pacts."
  },

  // ==========================================
  // SECTOR 8: Financial Services (71-80)
  // ==========================================
  {
    id: "ria_wealth_practice",
    name: "Fee-Only Registered Investment Advisory (RIA)",
    sector: "Financial Services & Capital",
    icon: "📊",
    capitalTier: "A",
    startupCost: 7500,
    minSmarts: 68,
    margin: 0.85,
    multiple: 8,
    baseRev: 95000,
    boundEngines: ["subscription", "service_capacity"],
    workingCapital: { dso: 15, dio: 0, dpo: 15, capexIntensity: 0.04 },
    desc: "Managing $25M in retail client portfolios charging a 1.00% annual AUM fee with zero commission conflicts of interest."
  },
  {
    id: "p2p_microfinance_desk",
    name: "Digital Microfinance & Peer Lending Desk",
    sector: "Financial Services & Capital",
    icon: "🪙",
    capitalTier: "B",
    startupCost: 70000,
    minSmarts: 72,
    margin: 0.65,
    multiple: 7,
    baseRev: 310000,
    boundEngines: ["regulated_balance_sheet", "marketplace"],
    workingCapital: { dso: 30, dio: 0, dpo: 20, capexIntensity: 0.08 },
    desc: "Underwriting small business microloans at 14% APR with mobile algorithmic credit scoring in emerging secondary markets."
  },
  {
    id: "mortgage_origination",
    name: "High-Volume Residential Mortgage Brokerage",
    sector: "Financial Services & Capital",
    icon: "🏡💵",
    capitalTier: "B",
    startupCost: 90000,
    minSmarts: 65,
    margin: 0.70,
    multiple: 6,
    baseRev: 480000,
    boundEngines: ["service_capacity", "enterprise_sales"],
    workingCapital: { dso: 35, dio: 0, dpo: 20, capexIntensity: 0.05 },
    desc: "Originating prime jumbo and conforming mortgage paper, selling packages to Fannie Mae and institutional secondary buyers."
  },
  {
    id: "boutique_ma_advisory",
    name: "Boutique Technology M&A Advisory",
    sector: "Financial Services & Capital",
    icon: "🤝",
    capitalTier: "C",
    startupCost: 350000,
    minSmarts: 82,
    margin: 0.78,
    multiple: 9,
    baseRev: 1800000,
    boundEngines: ["service_capacity", "enterprise_sales"],
    workingCapital: { dso: 60, dio: 0, dpo: 25, capexIntensity: 0.05 },
    desc: "Brokering $20M–$100M founder software acquisitions for 3% Lehman formula success fees plus monthly retainer fees."
  },
  {
    id: "crypto_market_maker",
    name: "Algorithmic Digital Asset Market Maker",
    sector: "Financial Services & Capital",
    icon: "💎⚡",
    capitalTier: "C",
    startupCost: 800000,
    minSmarts: 88,
    margin: 0.82,
    multiple: 11,
    baseRev: 3400000,
    boundEngines: ["regulated_balance_sheet", "network_infrastructure"],
    workingCapital: { dso: 2, dio: 0, dpo: 5, capexIntensity: 0.15 },
    desc: "Automated two-sided orderbook liquidity across crypto spot and perpetual futures capturing bid-ask fractional spreads."
  },
  {
    id: "dynasty_family_office",
    name: "Multi-Family Office & Dynasty Trust Advisory",
    sector: "Financial Services & Capital",
    icon: "📜",
    capitalTier: "D",
    startupCost: 2500000,
    minSmarts: 84,
    margin: 0.74,
    multiple: 12,
    baseRev: 5200000,
    boundEngines: ["subscription", "service_capacity", "regulated_balance_sheet"],
    workingCapital: { dso: 30, dio: 0, dpo: 20, capexIntensity: 0.08 },
    desc: "Structuring sovereign dynasty trusts, private philanthropy foundations, and estate tax shielding for $100M+ net-worth families."
  },
  {
    id: "private_credit_fund",
    name: "Specialty Direct Lending & Private Credit",
    sector: "Financial Services & Capital",
    icon: "💼💵",
    capitalTier: "D",
    startupCost: 8000000,
    minSmarts: 82,
    margin: 0.68,
    multiple: 10,
    baseRev: 12000000,
    boundEngines: ["regulated_balance_sheet", "enterprise_sales"],
    workingCapital: { dso: 40, dio: 0, dpo: 15, capexIntensity: 0.10 },
    desc: "Issuing senior secured floating-rate unitranche loans to private equity-backed software companies earning SOFR + 650 bps."
  },
  {
    id: "quant_hft_firm",
    name: "FPGA High-Frequency Statistical Arbitrage",
    sector: "Financial Services & Capital",
    icon: "⚡🏛️",
    capitalTier: "E",
    startupCost: 40000000,
    minSmarts: 94,
    margin: 0.88,
    multiple: 18,
    baseRev: 95000000,
    boundEngines: ["regulated_balance_sheet", "research_ip", "network_infrastructure"],
    workingCapital: { dso: 2, dio: 0, dpo: 5, capexIntensity: 0.35 },
    desc: "Sub-microsecond microwave laser links between Chicago CME and New York NASDAQ exploiting cross-asset pricing anomalies."
  },
  {
    id: "private_equity_buyouts",
    name: "Middle-Market Private Equity Buyout Fund",
    sector: "Financial Services & Capital",
    icon: "🏛️📈",
    capitalTier: "F",
    startupCost: 150000000,
    minSmarts: 88,
    margin: 0.78,
    multiple: 16,
    baseRev: 180000000,
    boundEngines: ["regulated_balance_sheet", "enterprise_sales", "asset_ownership"],
    workingCapital: { dso: 45, dio: 0, dpo: 30, capexIntensity: 0.10 },
    desc: "Deploying $1B in institutional capital across leveraged buyouts (LBOs), earning 2% annual management fees plus 20% carried interest."
  },
  {
    id: "commercial_retail_bank",
    name: "Chartered Full-Reserve Commercial Retail Bank",
    sector: "Financial Services & Capital",
    icon: "🏦",
    capitalTier: "G",
    startupCost: 2500000000,
    minSmarts: 86,
    margin: 0.52,
    multiple: 14,
    baseRev: 3200000000,
    boundEngines: ["regulated_balance_sheet", "service_capacity", "asset_ownership"],
    workingCapital: { dso: 30, dio: 0, dpo: 15, capexIntensity: 0.20 },
    desc: "Holding $40B in consumer and commercial deposits, issuing mortgages, lines of credit, and corporate syndicated term loans."
  },

  // ==========================================
  // SECTOR 9: Logistics & Transportation (81-90)
  // ==========================================
  {
    id: "cargo_bike_courier",
    name: "Zero-Emission Urban Cargo Bike Courier",
    sector: "Logistics & Transportation",
    icon: "🚲📦",
    capitalTier: "A",
    startupCost: 4500,
    minSmarts: 45,
    margin: 0.72,
    multiple: 4,
    baseRev: 62000,
    boundEngines: ["fleet_transportation", "service_capacity"],
    workingCapital: { dso: 15, dio: 0, dpo: 15, capexIntensity: 0.10 },
    desc: "Rapid delivery of legal documents, architectural blueprints, and luxury bakery catering through dense city centers."
  },
  {
    id: "semi_truck_freight",
    name: "Long-Haul Owner-Operator Freight Rig",
    sector: "Logistics & Transportation",
    icon: "🚛",
    capitalTier: "B",
    startupCost: 85000,
    minSmarts: 55,
    margin: 0.32,
    multiple: 5,
    baseRev: 290000,
    boundEngines: ["fleet_transportation", "inventory"],
    workingCapital: { dso: 35, dio: 0, dpo: 20, capexIntensity: 0.25 },
    desc: "Hauling refrigerated 53-foot dry van produce across interstate freight lanes booked through digital spot load boards."
  },
  {
    id: "cold_storage_depot",
    name: "Cold-Chain Temperature Controlled Warehouse",
    sector: "Logistics & Transportation",
    icon: "❄️📦",
    capitalTier: "B",
    startupCost: 95000,
    minSmarts: 62,
    margin: 0.48,
    multiple: 7,
    baseRev: 340000,
    boundEngines: ["perishables", "asset_ownership", "inventory"],
    workingCapital: { dso: 45, dio: 5, dpo: 25, capexIntensity: 0.30 },
    desc: "Multi-temperature blast freezers storing imported pharmaceuticals and seafood for regional restaurant distributors."
  },
  {
    id: "freight_brokerage",
    name: "Digital Cross-Docking Freight Brokerage",
    sector: "Logistics & Transportation",
    icon: "🚚📲",
    capitalTier: "C",
    startupCost: 350000,
    minSmarts: 70,
    margin: 0.22,
    multiple: 8,
    baseRev: 3200000,
    boundEngines: ["marketplace", "enterprise_sales"],
    workingCapital: { dso: 50, dio: 0, dpo: 25, capexIntensity: 0.08 },
    desc: "Software platform brokering 10,000 monthly truckloads between shippers and independent fleets for 12% gross margins."
  },
  {
    id: "armored_transit",
    name: "Armored Bullion & Cash Transit Carrier",
    sector: "Logistics & Transportation",
    icon: "🛡️🚚",
    capitalTier: "C",
    startupCost: 750000,
    minSmarts: 74,
    margin: 0.44,
    multiple: 8,
    baseRev: 2100000,
    boundEngines: ["fleet_transportation", "service_capacity"],
    workingCapital: { dso: 45, dio: 5, dpo: 30, capexIntensity: 0.32 },
    desc: "Level-IV ballistic steel trucks and armed security details transporting bank reserves, gold bullion, and diamond vaults."
  },
  {
    id: "regional_air_cargo",
    name: "Regional Turboprop Air Cargo Feeder",
    sector: "Logistics & Transportation",
    icon: "✈️📦",
    capitalTier: "D",
    startupCost: 4500000,
    minSmarts: 78,
    margin: 0.36,
    multiple: 9,
    baseRev: 9500000,
    boundEngines: ["fleet_transportation", "enterprise_sales", "asset_ownership"],
    workingCapital: { dso: 60, dio: 10, dpo: 35, capexIntensity: 0.40 },
    desc: "Fleet of ATR-72 freighters servicing dedicated overnight express contracts for DHL and FedEx across island archipelagos."
  },
  {
    id: "offshore_marine_vessels",
    name: "Offshore Supply Vessel (OSV) Fleet",
    sector: "Logistics & Transportation",
    icon: "🚢⚓",
    capitalTier: "D",
    startupCost: 9000000,
    minSmarts: 76,
    margin: 0.42,
    multiple: 10,
    baseRev: 14000000,
    boundEngines: ["fleet_transportation", "asset_ownership", "projects"],
    workingCapital: { dso: 75, dio: 8, dpo: 40, capexIntensity: 0.45 },
    desc: "Dynamic positioning vessels delivering drill pipe, fuel, and crew changes to deep-water oil rigs and offshore wind farms."
  },
  {
    id: "robotic_fulfillment_hub",
    name: "Automated Robotic Sorting Mega-Hub",
    sector: "Logistics & Transportation",
    icon: "🤖🏭",
    capitalTier: "E",
    startupCost: 60000000,
    minSmarts: 84,
    margin: 0.38,
    multiple: 12,
    baseRev: 120000000,
    boundEngines: ["asset_ownership", "fleet_transportation", "network_infrastructure"],
    workingCapital: { dso: 45, dio: 8, dpo: 45, capexIntensity: 0.45 },
    desc: "One-million square foot cross-docking terminal sorting 450,000 packages daily with autonomous mobile robots (AMRs)."
  },
  {
    id: "container_shipping_line",
    name: "Ultra-Large Container Shipping Vessel Fleet",
    sector: "Logistics & Transportation",
    icon: "🚢🌊",
    capitalTier: "F",
    startupCost: 350000000,
    minSmarts: 85,
    margin: 0.30,
    multiple: 8,
    baseRev: 520000000,
    boundEngines: ["fleet_transportation", "asset_ownership", "enterprise_sales"],
    workingCapital: { dso: 65, dio: 10, dpo: 50, capexIntensity: 0.45 },
    desc: "Twelve 24,000-TEU mega container vessels operating trans-Pacific and Asia-Europe arterial ocean trade routes."
  },
  {
    id: "freight_rail_network",
    name: "Class-I Transcontinental Freight Rail System",
    sector: "Logistics & Transportation",
    icon: "🚂",
    capitalTier: "G",
    startupCost: 5000000000,
    minSmarts: 86,
    margin: 0.48,
    multiple: 16,
    baseRev: 7200000000,
    boundEngines: ["network_infrastructure", "asset_ownership", "fleet_transportation"],
    workingCapital: { dso: 45, dio: 15, dpo: 50, capexIntensity: 0.50 },
    desc: "14,000 miles of proprietary heavy-haul trackage hauling grain, coal, chemicals, and intermodal doublestack containers."
  },

  // ==========================================
  // SECTOR 10: Real Estate & Construction (91-100)
  // ==========================================
  {
    id: "residential_contractor",
    name: "Handyman & Custom Home Renovation Builder",
    sector: "Real Estate & Construction",
    icon: "🔨",
    capitalTier: "A",
    startupCost: 6500,
    minSmarts: 52,
    margin: 0.55,
    multiple: 4,
    baseRev: 92000,
    boundEngines: ["projects", "service_capacity"],
    workingCapital: { dso: 20, dio: 5, dpo: 20, capexIntensity: 0.08 },
    desc: "Kitchen remodels, master bath renovations, and hardwood flooring with customer milestone stage payments."
  },
  {
    id: "airbnb_portfolio_mgmt",
    name: "Luxury Short-Term Rental Asset Management",
    sector: "Real Estate & Construction",
    icon: "🏖️🔑",
    capitalTier: "B",
    startupCost: 45000,
    minSmarts: 60,
    margin: 0.62,
    multiple: 6,
    baseRev: 280000,
    boundEngines: ["service_capacity", "asset_ownership", "location_footfall"],
    workingCapital: { dso: 5, dio: 0, dpo: 20, capexIntensity: 0.12 },
    desc: "Managing 35 prime beachfront villas for 22% gross management fees with dynamic algorithmic pricing and turnover crews."
  },
  {
    id: "architectural_glazing",
    name: "Architectural Glazing & Curtain Wall Systems",
    sector: "Real Estate & Construction",
    icon: "🪟🏗️",
    capitalTier: "B",
    startupCost: 90000,
    minSmarts: 66,
    margin: 0.42,
    multiple: 6,
    baseRev: 480000,
    boundEngines: ["manufacturing", "projects"],
    workingCapital: { dso: 60, dio: 25, dpo: 30, capexIntensity: 0.22 },
    desc: "Fabricating and installing blast-resistant structural double-glazed facades for commercial airport and corporate builds."
  },
  {
    id: "modular_housing_fab",
    name: "Prefabricated Modular Steel Housing Plant",
    sector: "Real Estate & Construction",
    icon: "🏗️🏡",
    capitalTier: "C",
    startupCost: 600000,
    minSmarts: 75,
    margin: 0.46,
    multiple: 8,
    baseRev: 2400000,
    boundEngines: ["manufacturing", "projects", "inventory"],
    workingCapital: { dso: 50, dio: 35, dpo: 35, capexIntensity: 0.28 },
    desc: "Indoor factory assembly of multi-family modular apartment blocks shipped on flatbeds and crane-assembled on site in 4 days."
  },
  {
    id: "luxury_spec_home",
    name: "Ultra-Prime Bel Air Luxury Spec Home",
    sector: "Real Estate & Construction",
    icon: "🏰",
    capitalTier: "C",
    startupCost: 950000,
    minSmarts: 76,
    margin: 0.40,
    multiple: 7,
    baseRev: 3800000,
    boundEngines: ["projects", "asset_ownership"],
    workingCapital: { dso: 90, dio: 50, dpo: 40, capexIntensity: 0.45 },
    desc: "Developing 12,000 sq ft hillside architectural estates with infinity pools, car galleries, and 45% return on equity upon sale."
  },
  {
    id: "suburban_subdivision",
    name: "Master-Planned 150-Home Residential Community",
    sector: "Real Estate & Construction",
    icon: "🏘️",
    capitalTier: "D",
    startupCost: 5500000,
    minSmarts: 78,
    margin: 0.35,
    multiple: 8,
    baseRev: 18000000,
    boundEngines: ["projects", "asset_ownership"],
    workingCapital: { dso: 75, dio: 45, dpo: 40, capexIntensity: 0.40 },
    desc: "Acquiring raw farmland, zoning approvals, civil grading, and building single-family homes sold to first-time buyers."
  },
  {
    id: "transit_oriented_mixed_use",
    name: "Transit-Oriented Mixed-Use High-Rise Complex",
    sector: "Real Estate & Construction",
    icon: "🏬🚆",
    capitalTier: "D",
    startupCost: 9000000,
    minSmarts: 82,
    margin: 0.38,
    multiple: 11,
    baseRev: 24000000,
    boundEngines: ["projects", "asset_ownership", "location_footfall"],
    workingCapital: { dso: 60, dio: 30, dpo: 45, capexIntensity: 0.42 },
    desc: "32-story skyscraper atop a subway terminal with 400 rental apartments, whole-foods retail anchor, and co-working floors."
  },
  {
    id: "commercial_cbd_skyscraper",
    name: "Grade-A Central Business District Skyscraper",
    sector: "Real Estate & Construction",
    icon: "🏙️",
    capitalTier: "E",
    startupCost: 75000000,
    minSmarts: 85,
    margin: 0.55,
    multiple: 14,
    baseRev: 95000000,
    boundEngines: ["asset_ownership", "projects", "service_capacity"],
    workingCapital: { dso: 45, dio: 10, dpo: 45, capexIntensity: 0.50 },
    desc: "65-story LEED Platinum office tower in Manhattan or London pre-leased to investment banks and BigLaw anchors on 15-year terms."
  },
  {
    id: "megacity_smart_district",
    name: "Master-Planned Sovereign Smart District",
    sector: "Real Estate & Construction",
    icon: "🌐🏙️",
    capitalTier: "F",
    startupCost: 500000000,
    minSmarts: 90,
    margin: 0.40,
    multiple: 16,
    baseRev: 750000000,
    boundEngines: ["projects", "network_infrastructure", "asset_ownership"],
    workingCapital: { dso: 90, dio: 40, dpo: 60, capexIntensity: 0.55 },
    desc: "1,000-hectare smart megacity development featuring district cooling, autonomous transit shuttles, and zero-carbon grid power."
  },
  {
    id: "deepwater_seaport_terminal",
    name: "Sovereign Deep-Water Seaport & Free Trade Zone",
    sector: "Real Estate & Construction",
    icon: "⚓🏗️",
    capitalTier: "G",
    startupCost: 2800000000,
    minSmarts: 88,
    margin: 0.52,
    multiple: 18,
    baseRev: 3600000000,
    boundEngines: ["asset_ownership", "network_infrastructure", "fleet_transportation"],
    workingCapital: { dso: 60, dio: 15, dpo: 60, capexIntensity: 0.55 },
    desc: "Automated container cranes, deep-dredged berths for Post-Panamax ships, bonded warehouses, and customs clearance free-trade zone."
  },

  // ==========================================
  // SECTOR 11: Energy, Resources & Infrastructure (101-110)
  // ==========================================
  {
    id: "rooftop_solar_crew",
    name: "Residential Rooftop Solar & Storage Installer",
    sector: "Energy, Resources & Infrastructure",
    icon: "☀️🏠",
    capitalTier: "A",
    startupCost: 9000,
    minSmarts: 55,
    margin: 0.42,
    multiple: 5,
    baseRev: 120000,
    boundEngines: ["projects", "inventory"],
    workingCapital: { dso: 30, dio: 15, dpo: 25, capexIntensity: 0.12 },
    desc: "Installing 10 kW rooftop solar panel arrays and Tesla Powerwall home storage batteries with net-metering utility grid hookups."
  },
  {
    id: "ev_charging_hub",
    name: "Commercial Ultra-Fast EV Charging Plaza",
    sector: "Energy, Resources & Infrastructure",
    icon: "⚡🔌",
    capitalTier: "B",
    startupCost: 75000,
    minSmarts: 65,
    margin: 0.48,
    multiple: 8,
    baseRev: 310000,
    boundEngines: ["location_footfall", "asset_ownership"],
    workingCapital: { dso: 5, dio: 0, dpo: 20, capexIntensity: 0.35 },
    desc: "Twelve 350 kW DC fast chargers off highway exits pairing electricity resale with convenience store snack margins."
  },
  {
    id: "commercial_energy_esco",
    name: "Commercial Building Energy Efficiency Retrofit",
    sector: "Energy, Resources & Infrastructure",
    icon: "🏢💡",
    capitalTier: "B",
    startupCost: 90000,
    minSmarts: 70,
    margin: 0.45,
    multiple: 7,
    baseRev: 410000,
    boundEngines: ["projects", "enterprise_sales"],
    workingCapital: { dso: 60, dio: 15, dpo: 30, capexIntensity: 0.15 },
    desc: "Energy Service Company (ESCO) retrofitting HVAC variable speed drives and smart building BMS, sharing electricity savings."
  },
  {
    id: "waste_biogas_digester",
    name: "Agricultural Waste-to-Biogas Anaerobic Digester",
    sector: "Energy, Resources & Infrastructure",
    icon: "♻️⚡",
    capitalTier: "C",
    startupCost: 650000,
    minSmarts: 74,
    margin: 0.58,
    multiple: 9,
    baseRev: 1800000,
    boundEngines: ["commodity_extraction", "manufacturing"],
    workingCapital: { dso: 35, dio: 5, dpo: 25, capexIntensity: 0.35 },
    desc: "Converting dairy farm manure and food scraps into pipeline-grade renewable natural gas (RNG) with federal carbon credits."
  },
  {
    id: "micro_hydro_dam",
    name: "Run-of-River Micro-Hydroelectric Generator",
    sector: "Energy, Resources & Infrastructure",
    icon: "💧⚡",
    capitalTier: "C",
    startupCost: 950000,
    minSmarts: 78,
    margin: 0.72,
    multiple: 10,
    baseRev: 2200000,
    boundEngines: ["asset_ownership", "commodity_extraction"],
    workingCapital: { dso: 40, dio: 0, dpo: 20, capexIntensity: 0.40 },
    desc: "3 MW eco-friendly stream water diversion powering Pelton turbines with a 25-year feed-in tariff contract to the national grid."
  },
  {
    id: "geothermal_district_heating",
    name: "Deep Geothermal District Heating & Power Plant",
    sector: "Energy, Resources & Infrastructure",
    icon: "🌋⚡",
    capitalTier: "D",
    startupCost: 6000000,
    minSmarts: 84,
    margin: 0.65,
    multiple: 12,
    baseRev: 11000000,
    boundEngines: ["commodity_extraction", "asset_ownership", "projects"],
    workingCapital: { dso: 45, dio: 5, dpo: 30, capexIntensity: 0.45 },
    desc: "Drilling 4,000 meters into subterranean granite aquifers producing 200°C steam for municipal heating and baseload electricity."
  },
  {
    id: "utility_bess_storage",
    name: "200MWh Grid-Scale Battery Storage (BESS)",
    sector: "Energy, Resources & Infrastructure",
    icon: "🔋⚡",
    capitalTier: "D",
    startupCost: 9500000,
    minSmarts: 82,
    margin: 0.54,
    multiple: 13,
    baseRev: 17000000,
    boundEngines: ["asset_ownership", "commodity_extraction"],
    workingCapital: { dso: 35, dio: 10, dpo: 30, capexIntensity: 0.42 },
    desc: "Lithium iron phosphate (LFP) containers capturing cheap daytime solar and discharging during peak evening spikes for power arbitrage."
  },
  {
    id: "utility_solar_park",
    name: "500MW Utility-Scale Solar Photovoltaic Park",
    sector: "Energy, Resources & Infrastructure",
    icon: "☀️🏞️",
    capitalTier: "E",
    startupCost: 45000000,
    minSmarts: 80,
    margin: 0.70,
    multiple: 14,
    baseRev: 62000000,
    boundEngines: ["asset_ownership", "projects"],
    workingCapital: { dso: 45, dio: 5, dpo: 35, capexIntensity: 0.48 },
    desc: "Two million bifacial tracking solar panels spanning desert acreage selling clean power to utilities on a 20-year fixed PPA."
  },
  {
    id: "offshore_wind_array",
    name: "1GW Deep-Water Offshore Wind Array",
    sector: "Energy, Resources & Infrastructure",
    icon: "🌬️🌊",
    capitalTier: "F",
    startupCost: 300000000,
    minSmarts: 86,
    margin: 0.68,
    multiple: 15,
    baseRev: 410000000,
    boundEngines: ["asset_ownership", "projects", "network_infrastructure"],
    workingCapital: { dso: 50, dio: 10, dpo: 45, capexIntensity: 0.52 },
    desc: "Sixty-five 15MW floating ocean wind turbines anchored in the North Sea tied to high-voltage direct current (HVDC) seabed subsea cables."
  },
  {
    id: "modular_nuclear_smr",
    name: "Small Modular Nuclear Reactor (SMR) Station",
    sector: "Energy, Resources & Infrastructure",
    icon: "⚛️🏭",
    capitalTier: "G",
    startupCost: 3500000000,
    minSmarts: 94,
    margin: 0.75,
    multiple: 22,
    baseRev: 4800000000,
    boundEngines: ["asset_ownership", "regulated_balance_sheet", "research_ip"],
    workingCapital: { dso: 45, dio: 30, dpo: 50, capexIntensity: 0.58 },
    desc: "Factory-built 300MW passive-safety molten salt reactors providing carbon-free baseload energy directly to AI hyperscale datacenters."
  },

  // ==========================================
  // SECTOR 12: Agriculture, Frontier & Mega-Industry (111-120)
  // ==========================================
  {
    id: "urban_microgreens_farm",
    name: "Vertical Gourmet Microgreens & Mushroom Lab",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🌱🍄",
    capitalTier: "A",
    startupCost: 3500,
    minSmarts: 48,
    margin: 0.74,
    multiple: 5,
    baseRev: 58000,
    boundEngines: ["perishables", "inventory"],
    workingCapital: { dso: 7, dio: 4, dpo: 15, capexIntensity: 0.10 },
    desc: "LED vertical racks growing culinary pea shoots, red amaranth, and lion's mane mushrooms for local farm-to-table dining."
  },
  {
    id: "pollination_fleet",
    name: "Commercial Migratory Honeybee Pollination Fleet",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🐝🍯",
    capitalTier: "B",
    startupCost: 45000,
    minSmarts: 58,
    margin: 0.60,
    multiple: 5,
    baseRev: 240000,
    boundEngines: ["fleet_transportation", "service_capacity", "perishables"],
    workingCapital: { dso: 25, dio: 8, dpo: 20, capexIntensity: 0.18 },
    desc: "Trucking 1,500 beehives across California almond orchards and Pacific Northwest apple groves for vital seasonal pollination fees."
  },
  {
    id: "hydroponic_greenhouse",
    name: "High-Tech Automated Hydroponic Greenhouse",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🍅🌿",
    capitalTier: "B",
    startupCost: 90000,
    minSmarts: 65,
    margin: 0.55,
    multiple: 6,
    baseRev: 380000,
    boundEngines: ["perishables", "manufacturing", "inventory"],
    workingCapital: { dso: 20, dio: 6, dpo: 25, capexIntensity: 0.25 },
    desc: "Closed-loop computer nutrient dosing growing vine-ripened heritage tomatoes and butterhead lettuce year-round."
  },
  {
    id: "robotic_fruit_harvester",
    name: "Autonomous Computer-Vision Fruit Harvesting Fleet",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🍎🤖",
    capitalTier: "C",
    startupCost: 500000,
    minSmarts: 78,
    margin: 0.62,
    multiple: 10,
    baseRev: 1700000,
    boundEngines: ["hardware", "service_capacity", "research_ip"],
    workingCapital: { dso: 40, dio: 18, dpo: 30, capexIntensity: 0.28 },
    desc: "Soft-touch robotic grippers picking ripe strawberries and apples 24/7 without bruising, leased to commercial growers."
  },
  {
    id: "land_salmon_hatchery",
    name: "Recirculating Aquaculture Land Salmon Farm",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🐟🌊",
    capitalTier: "C",
    startupCost: 850000,
    minSmarts: 76,
    margin: 0.48,
    multiple: 9,
    baseRev: 2600000,
    boundEngines: ["perishables", "manufacturing", "inventory"],
    workingCapital: { dso: 30, dio: 45, dpo: 30, capexIntensity: 0.35 },
    desc: "Bio-filtered indoor tanks raising sashimi-grade Atlantic salmon free of sea lice and microplastics close to major urban markets."
  },
  {
    id: "drone_crop_analytics",
    name: "Hyperspectral Drone Crop Dusting & Soil Analytics",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🛸🌾",
    capitalTier: "D",
    startupCost: 3200000,
    minSmarts: 80,
    margin: 0.58,
    multiple: 11,
    baseRev: 7200000,
    boundEngines: ["service_capacity", "fleet_transportation", "subscription"],
    workingCapital: { dso: 55, dio: 12, dpo: 30, capexIntensity: 0.25 },
    desc: "Heavy-payload autonomous spraying drones applying bio-fungicides with centimeter precision based on satellite vegetation indices."
  },
  {
    id: "direct_air_carbon_capture",
    name: "Direct Air Carbon Mineralization Plant",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "💨🪨",
    capitalTier: "D",
    startupCost: 8000000,
    minSmarts: 88,
    margin: 0.66,
    multiple: 16,
    baseRev: 14000000,
    boundEngines: ["commodity_extraction", "research_ip", "projects"],
    workingCapital: { dso: 60, dio: 5, dpo: 35, capexIntensity: 0.45 },
    desc: "Massive solid-sorbent fan collectors capturing atmospheric CO2 and permanently mineralizing it into basalt rock for carbon credits."
  },
  {
    id: "deepsea_nodule_mining",
    name: "Deep-Ocean Polymetallic Nodule Harvester",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🌊⛏️",
    capitalTier: "E",
    startupCost: 65000000,
    minSmarts: 90,
    margin: 0.52,
    multiple: 15,
    baseRev: 110000000,
    boundEngines: ["commodity_extraction", "fleet_transportation", "hardware"],
    workingCapital: { dso: 65, dio: 30, dpo: 45, capexIntensity: 0.52 },
    desc: "Seafloor crawler vacuuming high-grade nickel, copper, cobalt, and manganese nodules at 4,000-meter abyssal plains for EV batteries."
  },
  {
    id: "orbital_rocket_launch",
    name: "Reusable Heavy-Lift Orbital Rocket Launch Provider",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🚀⭐",
    capitalTier: "F",
    startupCost: 450000000,
    minSmarts: 95,
    margin: 0.62,
    multiple: 25,
    baseRev: 580000000,
    boundEngines: ["manufacturing", "research_ip", "fleet_transportation"],
    workingCapital: { dso: 60, dio: 35, dpo: 50, capexIntensity: 0.55 },
    desc: "Stainless-steel methane-fueled orbital boosters deploying broadband mega-constellations and deep space probes at $1,500/kg."
  },
  {
    id: "lunar_resource_mining",
    name: "Lunar Regolith & Helium-3 Prospecting Conglomerate",
    sector: "Agriculture & Frontier Mega-Industry",
    icon: "🌑⛏️",
    capitalTier: "G",
    startupCost: 4000000000,
    minSmarts: 96,
    margin: 0.72,
    multiple: 35,
    baseRev: 6200000000,
    boundEngines: ["commodity_extraction", "research_ip", "projects"],
    workingCapital: { dso: 90, dio: 45, dpo: 60, capexIntensity: 0.65 },
    desc: "Autonomous rover swarms extracting volatile water-ice from permanently shadowed craters at the lunar south pole for orbital fuel."
  }
];


  const FUNDING_SOURCES = [
    { id: "bootstrap", name: "Bootstrapping", tier: "A", minCheck: 1000, maxCheck: 100000, type: "equity", desc: "100% self-funded from personal cash wallet. Retain 100% equity ownership and complete board control." },
    { id: "friends_family", name: "Friends & Family", tier: "B", minCheck: 15000, maxCheck: 150000, type: "equity", desc: "Informal seed checks from family and childhood peers. Low scrutiny, but carries personal relationship risk." },
    { id: "angel_syndicate", name: "Angel Investor Syndicate", tier: "C", minCheck: 75000, maxCheck: 600000, type: "equity", desc: "Experienced tech founders and domain angels writing SAFE notes (Simple Agreement for Future Equity)." },
    { id: "top_accelerator", name: "Top Accelerator (YC / Sequoia Arc)", tier: "C", minCheck: 500000, maxCheck: 500000, type: "equity", desc: "The gold standard Silicon Valley accelerator: $500,000 for 7% post-money equity with Demo Day access." },
    { id: "seed_vc", name: "Seed Venture Capital", tier: "D", minCheck: 1500000, maxCheck: 4500000, type: "equity", desc: "Institutional Series Seed priced round. Requires giving up 15–22% equity and 1 permanent Board of Directors seat." },
    { id: "growth_vc", name: "Series A/B Growth VC", tier: "E", minCheck: 10000000, maxCheck: 45000000, type: "equity", desc: "High-octane tier-1 venture capital to blitzscale operations. Demands 3x YoY growth and aggressive hiring." },
    { id: "bank_revolver", name: "Commercial Bank AR Revolver", tier: "C", minCheck: 100000, maxCheck: 5000000, type: "debt", desc: "Revolving line of credit secured by up to 80% of accounts receivable. Prime + 2.5% floating interest rate." },
    { id: "venture_debt", name: "Venture Debt Facility", tier: "D", minCheck: 2000000, maxCheck: 15000000, type: "debt", desc: "Non-dilutive debt financing with 10.5% interest and 1.5% equity warrant coverage to extend cash runway." },
    { id: "private_equity", name: "Private Equity Buyout", tier: "F", minCheck: 50000000, maxCheck: 250000000, type: "equity", desc: "Institutional buyout fund acquiring a controlling majority stake (51%+) to optimize EBITDA margins." },
    { id: "project_finance", name: "Sovereign Project Finance", tier: "G", minCheck: 200000000, maxCheck: 2000000000, type: "debt", desc: "Syndicated banking consortia funding mega-scale industrial plants, seaports, and nuclear infrastructure." },
    { id: "ipo", name: "Initial Public Offering (IPO)", tier: "G", minCheck: 100000000, maxCheck: 5000000000, type: "equity", desc: "Float public common shares on NASDAQ or BSE underwritten by Goldman Sachs and Morgan Stanley." }
  ];

  const DIRECTOR_ARCHETYPES = {
    growth_vc: { id: "growth_vc", title: "Aggressive Growth Partner", agenda: "Triple-digit revenue blitzscaling; tolerant of heavy cash burn." },
    conservative: { id: "conservative", title: "Fiscal Conservative", agenda: "Demands EBITDA margins, strict debt servicing, and positive cash flow." },
    diplomat: { id: "diplomat", title: "Independent Industry Veteran", agenda: "Focuses on corporate governance, product moat, and board stability." },
    founder_loyalist: { id: "founder_loyalist", title: "Co-Founder / Early Angel", agenda: "Unconditionally loyal to the founder's visionary long-term roadmap." }
  };

  const SCALE_TIERS = {
    micro: { id: "micro", name: "Micro (1–10 Staff)", agency: "Direct 1-on-1 oversight; personal hiring & bespoke comp.", maxHeadcount: 10 },
    small: { id: "small", name: "Small (10–50 Staff)", agency: "Departmental formation; appointing team leads.", maxHeadcount: 50 },
    mid: { id: "mid", name: "Mid (50–250 Staff)", agency: "Management systems, salary bands, and recruiter pipelines.", maxHeadcount: 250 },
    scale: { id: "scale", name: "Scale (250–1,000 Staff)", agency: "VP delegation, Attention Units (AU) allocation, and fog-of-war.", maxHeadcount: 1000 },
    enterprise: { id: "enterprise", name: "Enterprise (1,000–10,000+ Staff)", agency: "C-Suite governance, board committees, and business unit presidents.", maxHeadcount: 100000 }
  };

  // --- 18 SPECIALIZED ECONOMIC SUB-ENGINES EVALUATOR ---
  function evaluateEngine(engineId, biz, state) {
    const scale = biz.scaleUnits || 1;
    const kpis = {};
    let revModifier = 1.0;
    let costModifier = 1.0;
    let riskDelta = 0.0;

    switch (engineId) {
      case "location_footfall": {
        const footfall = Math.round((800 + Math.random() * 400) * scale * (biz.marketingBudgetUSD > 10000 ? 1.3 : 1.0));
        const convRate = (3.2 + Math.random() * 1.5).toFixed(1);
        const rentSqFt = Math.round(45 + (scale * 5));
        const revSqFt = Math.round((footfall * (convRate / 100) * 35) / Math.max(1, scale * 20));
        kpis["Daily Footfall"] = footfall.toLocaleString();
        kpis["Conversion Rate %"] = `${convRate}%`;
        kpis["Rent / SqFt"] = `$${rentSqFt}`;
        kpis["Rev / SqFt"] = `$${revSqFt}`;
        revModifier *= (parseFloat(convRate) / 4.0);
        break;
      }
      case "inventory": {
        const dio = biz.workingCapitalDays?.dio || 30;
        const stockoutRate = (Math.max(1.0, 8.5 - (dio / 5))).toFixed(1);
        const turnover = (365 / Math.max(1, dio)).toFixed(1);
        const markdown = (2.5 + Math.random() * 3.0).toFixed(1);
        kpis["Stockout Rate %"] = `${stockoutRate}%`;
        kpis["Inventory Turnover"] = `${turnover}x`;
        kpis["Markdown %"] = `${markdown}%`;
        kpis["Holding Cost"] = `$${Math.round((biz.inventoryUSD || 5000) * 0.18).toLocaleString()}`;
        if (parseFloat(stockoutRate) > 5.0) revModifier *= 0.92;
        break;
      }
      case "perishables": {
        const dio = biz.workingCapitalDays?.dio || 10;
        const spoilage = (3.0 + Math.random() * 4.0).toFixed(1);
        const shelfLife = Math.max(2, Math.round(14 - (dio * 0.4)));
        const healthScore = Math.min(100, Math.round(90 + (state.char?.smarts || 80) * 0.1));
        kpis["Spoilage Rate %"] = `${spoilage}%`;
        kpis["Shelf Life"] = `${shelfLife} Days`;
        kpis["Health Inspection"] = `${healthScore}/100`;
        costModifier *= (1.0 + (parseFloat(spoilage) / 100));
        if (healthScore < 85) riskDelta += 0.10;
        break;
      }
      case "service_capacity": {
        const utilRate = (68 + Math.random() * 22).toFixed(1);
        const realization = (88 + Math.random() * 8).toFixed(1);
        const partnerLev = (scale * 2.5).toFixed(1);
        kpis["Billable Utilization %"] = `${utilRate}%`;
        kpis["Realization Rate %"] = `${realization}%`;
        kpis["Partner Leverage"] = `${partnerLev}x`;
        revModifier *= (parseFloat(utilRate) / 75.0) * (parseFloat(realization) / 90.0);
        break;
      }
      case "subscription": {
        const churn = (1.2 + Math.random() * 2.0).toFixed(1);
        const nrr = (105 + Math.random() * 18).toFixed(1);
        const cacPayback = Math.max(6, Math.round(18 - (scale * 1.5)));
        kpis["MRR"] = `$${Math.round((biz.annualRevenueUSD || 50000) / 12).toLocaleString()}`;
        kpis["Logo Churn %"] = `${churn}%/mo`;
        kpis["NRR %"] = `${nrr}%`;
        kpis["CAC Payback"] = `${cacPayback} Mos`;
        revModifier *= (parseFloat(nrr) / 100.0) * (1.0 - parseFloat(churn) / 50.0);
        break;
      }
      case "enterprise_sales": {
        const acv = Math.round(45000 * Math.pow(scale, 0.6));
        const salesCycle = Math.max(4, Math.round(12 - (scale * 0.8)));
        const winRate = (24 + Math.random() * 12).toFixed(1);
        kpis["ACV"] = `$${acv.toLocaleString()}`;
        kpis["Sales Cycle"] = `${salesCycle} Months`;
        kpis["Win Rate %"] = `${winRate}%`;
        revModifier *= (parseFloat(winRate) / 25.0);
        break;
      }
      case "marketplace": {
        const takeRate = (12.5 + Math.random() * 3.5).toFixed(1);
        const gmv = Math.round((biz.annualRevenueUSD || 100000) / (parseFloat(takeRate) / 100));
        const fillRate = (88 + Math.random() * 8).toFixed(1);
        kpis["Annual GMV"] = `$${gmv.toLocaleString()}`;
        kpis["Take Rate %"] = `${takeRate}%`;
        kpis["Liquidity Fill Rate"] = `${fillRate}%`;
        revModifier *= (parseFloat(fillRate) / 90.0);
        break;
      }
      case "advertising_attention": {
        const dau = Math.round(25000 * Math.pow(scale, 1.4));
        const ecpm = (4.5 + Math.random() * 3.0).toFixed(2);
        kpis["DAU"] = dau.toLocaleString();
        kpis["eCPM"] = `$${ecpm}`;
        kpis["Ad Fill Rate %"] = `${(92 + Math.random() * 5).toFixed(1)}%`;
        revModifier *= (dau / 25000) * (parseFloat(ecpm) / 5.0);
        break;
      }
      case "content_hits": {
        const hitProb = (15 + (scale * 3)).toFixed(1);
        const hitRoll = Math.random() * 100;
        const isHit = hitRoll < parseFloat(hitProb);
        kpis["Hit Probability %"] = `${hitProb}%`;
        kpis["Cycle Status"] = isHit ? "🌟 BLOCKBUSTER HIT!" : "Steady Catalog";
        kpis["Catalog Backlog Value"] = `$${Math.round((biz.annualRevenueUSD || 100000) * 1.8).toLocaleString()}`;
        if (isHit) revModifier *= (2.2 + Math.random() * 1.5);
        break;
      }
      case "manufacturing": {
        const plantUtil = (78 + Math.random() * 16).toFixed(1);
        const lineYield = (94.5 + Math.random() * 4.5).toFixed(1);
        const scrapRate = (100 - parseFloat(lineYield)).toFixed(1);
        kpis["Plant Utilization %"] = `${plantUtil}%`;
        kpis["Line Yield %"] = `${lineYield}%`;
        kpis["Scrap Rate %"] = `${scrapRate}%`;
        costModifier *= (1.0 + (parseFloat(scrapRate) / 80.0));
        break;
      }
      case "hardware": {
        const bomCostPct = (52 + Math.random() * 8).toFixed(1);
        const leadWeeks = Math.max(6, Math.round(18 - scale));
        kpis["BOM Cost %"] = `${bomCostPct}%`;
        kpis["Lead Time"] = `${leadWeeks} Weeks`;
        kpis["Warranty Reserves"] = `$${Math.round((biz.annualRevenueUSD || 100000) * 0.04).toLocaleString()}`;
        costModifier *= (parseFloat(bomCostPct) / 50.0);
        break;
      }
      case "fleet_transportation": {
        const loadFactor = (72 + Math.random() * 20).toFixed(1);
        const fuelCost = Math.round((biz.annualRevenueUSD || 100000) * 0.22);
        kpis["Fleet Load Factor %"] = `${loadFactor}%`;
        kpis["Fuel Expense"] = `$${fuelCost.toLocaleString()}`;
        kpis["Vehicle Availability"] = `${(91 + Math.random() * 6).toFixed(1)}%`;
        revModifier *= (parseFloat(loadFactor) / 80.0);
        break;
      }
      case "projects": {
        const completion = (75 + Math.random() * 25).toFixed(1);
        const overrun = (2.0 + Math.random() * 6.0).toFixed(1);
        kpis["% Completion"] = `${completion}%`;
        kpis["Cost Overrun %"] = `${overrun}%`;
        kpis["Retention Receivables"] = `$${Math.round((biz.accountsReceivableUSD || 20000) * 0.15).toLocaleString()}`;
        costModifier *= (1.0 + parseFloat(overrun) / 100);
        break;
      }
      case "asset_ownership": {
        const ltv = (45 + Math.random() * 15).toFixed(1);
        const capRate = (6.2 + Math.random() * 1.8).toFixed(1);
        kpis["Asset LTV %"] = `${ltv}%`;
        kpis["Cap Rate %"] = `${capRate}%`;
        kpis["Depreciation Reserve"] = `$${Math.round((biz.fixedAssetsUSD || 100000) * 0.08).toLocaleString()}`;
        break;
      }
      case "regulated_balance_sheet": {
        const tier1 = (14.2 + Math.random() * 3.0).toFixed(1);
        const nim = (3.4 + Math.random() * 0.8).toFixed(2);
        const npl = (1.8 + Math.random() * 1.5).toFixed(1);
        kpis["Tier-1 Capital %"] = `${tier1}%`;
        kpis["Net Interest Margin"] = `${nim}%`;
        kpis["NPL Ratio %"] = `${npl}%`;
        if (parseFloat(tier1) < 10.5) riskDelta += 0.25;
        break;
      }
      case "research_ip": {
        const phase = biz.rdPhase || "Phase II Trials";
        const patentYears = biz.patentYearsRemaining || 14;
        kpis["Pipeline Stage"] = phase;
        kpis["Patent Runway"] = `${patentYears} Years`;
        kpis["R&D Intensity %"] = `${(((biz.rdExpenseUSD || 25000) / Math.max(1, biz.annualRevenueUSD || 100000)) * 100).toFixed(1)}%`;
        break;
      }
      case "commodity_extraction": {
        const cashCost = Math.round(45 + Math.random() * 15);
        const spotPrice = Math.round(75 + Math.random() * 35);
        kpis["Cash Cost / Unit"] = `$${cashCost}`;
        kpis["Market Spot Price"] = `$${spotPrice}`;
        kpis["Ore Recovery %"] = `${(88 + Math.random() * 8).toFixed(1)}%`;
        revModifier *= (spotPrice / 75);
        break;
      }
      case "network_infrastructure": {
        const uptime = (99.92 + Math.random() * 0.07).toFixed(3);
        const dens = Math.round(1500 * Math.pow(scale, 1.2));
        kpis["Network Uptime %"] = `${uptime}%`;
        kpis["Subscribers / Node"] = dens.toLocaleString();
        kpis["Backhaul Load %"] = `${(62 + Math.random() * 20).toFixed(1)}%`;
        break;
      }
      default:
        break;
    }

    return { kpis, revModifier, costModifier, riskDelta };
  }

  // --- 2C. COGNITIVE & SCHOOLING SYSTEMS ---
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
    const smarts = (character && character.stats ? character.stats.smarts : (G && G.stats ? G.stats.smarts : (character ? character.smarts : 75))) || 75;
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
      formattedReport: `Mock #${mockNumber}: Score ${observedScore}/${cohort.maxScore} | Est. %ile: ${lowStat.percentile.toFixed(1)}% - ${highStat.percentile.toFixed(1)}% | Projected Rank: ~${highStat.estimatedRank.toLocaleString()} - ~${lowStat.estimatedRank.toLocaleString()}`
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
      verbalResponse = `"It will be an absolute honor, ${studentName}. In my career, minds like yours come once in a decade. You have my unconditional backing."`;
    } else if (composite >= 72) {
      enthusiasmTier = "highest_recommendation";
      hiddenScore = 85;
      verbalResponse = `"I would be delighted to write your recommendation. You have been one of the standout contributors in my class all year."`;
    } else if (composite >= 58) {
      enthusiasmTier = "enthusiastic";
      hiddenScore = 72;
      verbalResponse = `"Of course. I can certainly attest to your solid performance and steady work ethic in my course."`;
    } else {
      enthusiasmTier = "lukewarm";
      hiddenScore = 52;
      verbalResponse = `"I can submit the standard form, yes. Given our limited interactions, I can only report your exam scores."`;
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
      return { verdict: "ACCEPTED_FULL", parentPct: 100, quote: "\"Education is our family's highest priority. We will fund this in full. Make us proud.\"" };
    } else if (total >= 45) {
      return { verdict: "COMPROMISE_HALF", parentPct: 50, quote: "\"It is a large expense right now. We will pay half, provided you contribute the rest from your student job.\"" };
    } else {
      return { verdict: "REFUSED", parentPct: 0, quote: "\"Money does not grow on trees. We simply cannot justify this expense right now.\"" };
    }
  }


  // --- GAAP ACCRUAL CORPORATE FINANCE & WORKING CAPITAL ENGINE ---
  function calculateAnnualCorporateFinancials(biz, state) {
    const scale = biz.scaleUnits || 1;
    const template = BUSINESS_CATALOG.find(t => t.id === biz.catalogId) || {};

    let totalRevMod = 1.0;
    let totalCostMod = 1.0;
    let totalRiskDelta = 0.0;
    const activeKpis = {};

    (biz.boundEngines || []).forEach(engId => {
      const res = evaluateEngine(engId, biz, state);
      totalRevMod *= res.revModifier;
      totalCostMod *= res.costModifier;
      totalRiskDelta += res.riskDelta;
      Object.assign(activeKpis, res.kpis);
    });

    const macroFactor = 0.94 + Math.random() * 0.16;
    const baseRev = template.baseRev || biz.annualRevenueUSD || 100000;
    const grossRevenue = Math.round(baseRev * Math.pow(scale, 0.88) * totalRevMod * macroFactor);
    const returnsAndDiscounts = Math.round(grossRevenue * 0.02);
    const netRevenue = grossRevenue - returnsAndDiscounts;

    const baseMargin = template.margin || 0.60;
    const effectiveMargin = Math.max(0.10, Math.min(0.95, baseMargin / totalCostMod));
    const cogs = Math.round(netRevenue * (1 - effectiveMargin));
    const grossProfit = netRevenue - cogs;

    const tier = template.capitalTier || biz.capitalTier || "C";
    let avgSalary = 55000;
    let baseOverhead = 25000;
    let minMarketing = 5000;
    if (tier === "A") {
      avgSalary = 4000;
      baseOverhead = 1500;
      minMarketing = 200;
    } else if (tier === "B") {
      avgSalary = 22000;
      baseOverhead = 8000;
      minMarketing = 1500;
    } else if (tier === "C") {
      avgSalary = 50000;
      baseOverhead = 25000;
      minMarketing = 5000;
    } else if (tier === "D") {
      avgSalary = 75000;
      baseOverhead = 60000;
      minMarketing = 15000;
    } else {
      avgSalary = 95000;
      baseOverhead = 150000;
      minMarketing = 50000;
    }

    const smExpense = Math.max(minMarketing, Math.round(netRevenue * 0.10) + (biz.marketingBudgetUSD || 0));
    const rdExpense = Math.round(netRevenue * (biz.boundEngines?.includes("research_ip") ? 0.22 : 0.04));
    const workerCount = biz.headcount || (tier === "A" ? 1 : (tier === "B" ? 2 : scale * 4));
    const gaSalaries = Math.round(scale * baseOverhead + workerCount * avgSalary);
    const totalOpex = smExpense + rdExpense + gaSalaries;

    const ebitda = grossProfit - totalOpex;
    const depreciation = Math.round((biz.fixedAssetsUSD || 0) * 0.10 + (biz.ipAssetsUSD || 0) * 0.15);
    const ebit = ebitda - depreciation;

    const interestExpense = Math.round((biz.shortTermDebtUSD || 0) * 0.08 + (biz.longTermDebtUSD || 0) * 0.065);
    const ebt = ebit - interestExpense;

    const taxRate = 0.21;
    const taxExpense = ebt > 0 ? Math.round(ebt * taxRate) : 0;
    const netIncome = ebt - taxExpense;

    const dso = biz.workingCapitalDays?.dso || template.workingCapital?.dso || 30;
    const dio = biz.workingCapitalDays?.dio || template.workingCapital?.dio || 30;
    const dpo = biz.workingCapitalDays?.dpo || template.workingCapital?.dpo || 30;
    const ccc = dio + dso - dpo;

    const targetAR = Math.round(netRevenue * (dso / 365));
    const targetInventory = Math.round(cogs * (dio / 365));
    const targetAP = Math.round(cogs * (dpo / 365));

    const prevAR = biz.accountsReceivableUSD || targetAR;
    const prevInv = biz.inventoryUSD || targetInventory;
    const prevAP = biz.accountsPayableUSD || targetAP;

    const deltaAR = targetAR - prevAR;
    const deltaInv = targetInventory - prevInv;
    const deltaAP = targetAP - prevAP;

    // Statement of Cash Flows
    const cfo = netIncome + depreciation - deltaAR - deltaInv + deltaAP;
    const capexIntensity = template.workingCapital?.capexIntensity || 0.15;
    const capex = Math.round(netRevenue * capexIntensity * (scale > 1 ? 0.8 : 1.2));
    const cfi = -capex;

    const debtRepayment = Math.round((biz.longTermDebtUSD || 0) * 0.10);
    const equityRaised = biz.pendingEquityInjectionUSD || 0;
    biz.pendingEquityInjectionUSD = 0;
    const dividendsPaid = biz.pendingDividendsUSD || 0;
    biz.pendingDividendsUSD = 0;
    const cff = equityRaised - debtRepayment - dividendsPaid;

    const netCashFlow = cfo + cfi + cff;
    const newTreasury = (biz.treasuryUSD || 0) + netCashFlow;

    const newFixedAssets = Math.max(0, (biz.fixedAssetsUSD || 0) + capex - depreciation);
    const newIPAssets = Math.round((biz.ipAssetsUSD || 0) * 0.95 + rdExpense * 0.4);
    const totalAssets = newTreasury + targetAR + targetInventory + newFixedAssets + newIPAssets;

    const newShortTermDebt = biz.shortTermDebtUSD || 0;
    const newLongTermDebt = Math.max(0, (biz.longTermDebtUSD || 0) - debtRepayment);
    const totalLiabilities = targetAP + newShortTermDebt + newLongTermDebt;

    const stockholdersEquity = totalAssets - totalLiabilities;
    const retainedEarnings = (biz.retainedEarningsUSD || 0) + netIncome - dividendsPaid;
    const paidInCapital = stockholdersEquity - retainedEarnings;

    const valMultiple = template.multiple || 10;
    const valuation = Math.max(5000, Math.round(Math.max(ebitda, netRevenue * 0.20) * valMultiple));

    const insolvencyRisks = [];
    let isBankrupt = false;

    if (newTreasury < 0) {
      if (netIncome > 0 && deltaAR + deltaInv > netIncome) {
        insolvencyRisks.push("Working Capital Trap: Rapid revenue growth trapped all cash in receivables & inventory!");
      }
      if (debtRepayment > ebitda && ebitda > 0) {
        insolvencyRisks.push("CapEx Debt Maturity Trap: Heavy debt service outstripped operational operating earnings!");
      }
      if (newTreasury + (biz.revolverLimitUSD || 0) < 0) {
        isBankrupt = true;
        insolvencyRisks.push("Illiquidity Insolvency: Treasury exhausted and credit facilities maxed out!");
      }
    }

    return {
      pnl: {
        grossRevenue, returnsAndDiscounts, netRevenue, cogs, grossProfit,
        smExpense, rdExpense, gaSalaries, totalOpex, ebitda, depreciation,
        ebit, interestExpense, ebt, taxExpense, netIncome
      },
      balanceSheet: {
        cash: newTreasury, ar: targetAR, inventory: targetInventory,
        fixedAssets: newFixedAssets, ipAssets: newIPAssets, totalAssets,
        ap: targetAP, shortTermDebt: newShortTermDebt, longTermDebt: newLongTermDebt,
        totalLiabilities, paidInCapital, retainedEarnings, stockholdersEquity
      },
      cashFlow: { cfo, cfi, cff, capex, netCashFlow },
      workingCapital: { dso, dio, dpo, ccc, deltaAR, deltaInv, deltaAP },
      valuation, activeKpis, insolvencyRisks, isBankrupt
    };
  }

  // --- FOUNDER PITCH PEDIGREE SCORE ---
  function calculateFounderPitchScore(state, biz) {
    let score = 0;
    const smarts = state.stats?.smarts || 50;
    const prestige = state.stats?.prestige || 10;
    score += smarts * 0.25;
    score += prestige * 0.20;

    const college = state.education?.college;
    if (college) {
      if (["iit_bombay", "iit_delhi"].includes(college.id)) score += 30;
      else if (["harvard", "stanford", "mit"].includes(college.id)) score += 35;
      else if (["oxford", "cambridge"].includes(college.id)) score += 25;
      else score += 15;
    }

    const job = state.career?.job;
    if (job) {
      if (job.title?.includes("VP") || job.title?.includes("CTO") || job.title?.includes("Partner")) score += 25;
      else if (job.title?.includes("Senior") || job.title?.includes("Staff")) score += 15;
    }

    if (state.pastExits && state.pastExits.length > 0) score += 40;

    if (biz) {
      if (biz.annualRevenueUSD > 10000000) score += 25;
      else if (biz.annualRevenueUSD > 2000000) score += 15;
      else if (biz.annualRevenueUSD > 500000) score += 10;
    }

    return Math.round(score);
  }

  // --- PROCEDURAL TERM SHEET GENERATOR ---
  function generateTermSheets(state, biz, sourceId) {
    const source = FUNDING_SOURCES.find(s => s.id === sourceId) || FUNDING_SOURCES[4];
    const pitchScore = calculateFounderPitchScore(state, biz);
    const currentVal = biz.valuationUSD || 1000000;

    if (source.id === "top_accelerator") {
      return [{
        investorName: "Y Combinator (W26)",
        investorType: "Accelerator",
        investmentCheckUSD: 500000,
        preMoneyValuationUSD: 6642857,
        postMoneyEquityPct: 7.0,
        optionPoolPct: 10.0,
        liquidationPreference: "1x Non-Participating",
        boardSeatsRequested: 0,
        protectiveProvisions: "Standard SAFE Agreement"
      }];
    }

    const valMultA = 0.9 + (pitchScore / 100) * 0.4;
    const preMoneyA = Math.round(currentVal * valMultA);
    const checkA = Math.min(source.maxCheck, Math.max(source.minCheck, Math.round(preMoneyA * 0.22)));
    const postMoneyA = preMoneyA + checkA;
    const equityPctA = parseFloat(((checkA / postMoneyA) * 100).toFixed(1));

    const valMultB = 1.1 + (pitchScore / 100) * 0.5;
    const preMoneyB = Math.round(currentVal * valMultB);
    const checkB = Math.min(source.maxCheck, Math.max(source.minCheck, Math.round(preMoneyB * 0.28)));
    const postMoneyB = preMoneyB + checkB;
    const equityPctB = parseFloat(((checkB / postMoneyB) * 100).toFixed(1));

    return [
      {
        investorName: "Apex Horizon Ventures",
        investorType: "Lead Tier-1 VC",
        investmentCheckUSD: checkA,
        preMoneyValuationUSD: preMoneyA,
        postMoneyEquityPct: equityPctA,
        optionPoolPct: 15.0,
        liquidationPreference: "1x Non-Participating",
        boardSeatsRequested: source.tier >= "D" ? 1 : 0,
        protectiveProvisions: "Standard Investor Protective Provisions"
      },
      {
        investorName: "Titan Global Growth",
        investorType: "Aggressive Growth Fund",
        investmentCheckUSD: checkB,
        preMoneyValuationUSD: preMoneyB,
        postMoneyEquityPct: equityPctB,
        optionPoolPct: 20.0,
        liquidationPreference: "2x Participating (Double-Dip)",
        boardSeatsRequested: source.tier >= "D" ? 1 : 0,
        protectiveProvisions: "Veto Rights on Future Financings & M&A"
      }
    ];
  }

  function negotiateTermSheet(state, biz, originalSheet, requestedValuationBoostPct) {
    const pitchScore = calculateFounderPitchScore(state, biz);
    const boost = parseFloat(requestedValuationBoostPct);
    const requiredScore = 40 + (boost * 1.2);
    const isAccepted = pitchScore >= requiredScore;

    if (isAccepted) {
      const revisedPreMoney = Math.round(originalSheet.preMoneyValuationUSD * (1 + (boost / 100)));
      const check = originalSheet.investmentCheckUSD;
      const revisedPostMoney = revisedPreMoney + check;
      const revisedEquity = parseFloat(((check / revisedPostMoney) * 100).toFixed(1));

      return {
        accepted: true,
        revisedSheet: {
          ...originalSheet,
          preMoneyValuationUSD: revisedPreMoney,
          postMoneyEquityPct: revisedEquity,
          optionPoolPct: Math.max(10, originalSheet.optionPoolPct - 2.5)
        },
        message: `🎉 The investment committee accepted your counter-offer! Valuation boosted to $${revisedPreMoney.toLocaleString()}!`
      };
    } else {
      return {
        accepted: false,
        revisedSheet: originalSheet,
        message: `❌ Investors rejected the valuation increase. They stand firm on their original term sheet.`
      };
    }
  }

  function executeFinancingRound(state, biz, acceptedSheet) {
    const check = acceptedSheet.investmentCheckUSD;
    const dilutionPct = acceptedSheet.postMoneyEquityPct;

    biz.treasuryUSD = (biz.treasuryUSD || 0) + check;
    biz.paidInCapitalUSD = (biz.paidInCapitalUSD || 0) + check;
    biz.valuationUSD = acceptedSheet.preMoneyValuationUSD + check;
    biz.valuation = biz.valuationUSD;

    const prevEquity = biz.founderEquityPct || 100;
    biz.founderEquityPct = parseFloat((prevEquity * (1 - (dilutionPct / 100))).toFixed(1));

    if (acceptedSheet.boardSeatsRequested > 0) {
      if (!biz.board) biz.board = { seats: [] };
      biz.board.seats.push({
        id: `investor_${Date.now()}`,
        title: `${acceptedSheet.investorName} Partner`,
        votes: 1,
        type: "investor",
        loyalty: 85,
        agenda: acceptedSheet.liquidationPreference.includes("Participating") ? "conservative" : "growth"
      });
    }

    return {
      success: true,
      message: `🚀 Closed $${check.toLocaleString()} financing round! Founder retained ${biz.founderEquityPct}% equity.`
    };
  }

  // --- BOARD GOVERNANCE & COUP STATE MACHINE ---
  function stepBoardAnnual(state, biz) {
    if (!biz.board || !biz.board.seats) return;

    const fin = biz.lastFinancials || {};
    const runwayMonths = fin.cashFlow?.cfo < 0 ? Math.round((biz.treasuryUSD / Math.abs(fin.cashFlow.cfo)) * 12) : 99;
    const isProfitable = (biz.netProfitUSD || 0) > 0;
    const investorRelAU = biz.org?.allocatedAU?.investorRel || 15;

    let totalVotes = 0;
    let founderVotes = 0;
    let averageLoyalty = 0;

    biz.board.seats.forEach(seat => {
      totalVotes += seat.votes || 1;
      if (seat.type === "founder") {
        founderVotes += seat.votes || 1;
      } else {
        let loyaltyDelta = 0;
        if (investorRelAU >= 20) loyaltyDelta += 5;
        else if (investorRelAU < 10) loyaltyDelta -= 8;

        if (runwayMonths < 6) loyaltyDelta -= 20;
        else if (runwayMonths > 18) loyaltyDelta += 6;

        if (isProfitable) loyaltyDelta += 8;
        else if (seat.agenda === "conservative") loyaltyDelta -= 12;

        seat.loyalty = Math.max(10, Math.min(100, (seat.loyalty || 70) + loyaltyDelta));
        averageLoyalty += seat.loyalty;
      }
    });

    const nonFounderSeats = biz.board.seats.filter(s => s.type !== "founder");
    if (nonFounderSeats.length > 0) {
      averageLoyalty = Math.round(averageLoyalty / nonFounderSeats.length);
    } else {
      averageLoyalty = 100;
    }

    const founderVotePct = biz.founderClassBSharesPct > 50
      ? 100
      : Math.round((founderVotes / totalVotes) * 100);

    if (founderVotePct < 50 && (runwayMonths < 6 || averageLoyalty < 35)) {
      biz.board.coupThreat = true;
      biz.board.coupReason = runwayMonths < 6
        ? `Board called an emergency session citing imminent insolvency (${runwayMonths} months cash runway remaining).`
        : `Board called an emergency vote citing loss of confidence in leadership (Average Director Loyalty: ${averageLoyalty}%).`;
    } else {
      biz.board.coupThreat = false;
      biz.board.coupReason = null;
    }
  }

  function executeCoupDefense(state, biz, leverId) {
    if (!biz.board || !biz.board.coupThreat) {
      return { success: false, message: "No active boardroom coup threat." };
    }

    switch (leverId) {
      case "lobby_swing_vote": {
        if (state.stats.energy < 25) return { success: false, message: "Insufficient energy to lobby directors." };
        state.stats.energy -= 25;

        const charm = (state.stats.looks + state.stats.smarts) / 2;
        const successProb = Math.min(85, Math.round(charm * 0.8 + (state.stats.prestige || 10) * 0.2));
        const roll = Math.random() * 100;

        if (roll <= successProb) {
          biz.board.coupThreat = false;
          biz.board.coupReason = null;
          biz.board.seats.forEach(s => { if (s.type !== "founder") s.loyalty = Math.min(100, s.loyalty + 25); });
          return {
            success: true,
            message: "🎯 Masterful boardroom lobbying! You persuaded the Independent Director to back your roadmap."
          };
        } else {
          return {
            success: false,
            message: "❌ Lobbying failed. The independent director voted with the institutional syndicate against your motion."
          };
        }
      }
      case "dual_class_defense": {
        if (biz.founderClassBSharesPct > 50) {
          biz.board.coupThreat = false;
          biz.board.coupReason = null;
          return {
            success: true,
            message: "⚖️ Invoked Class-B Common Stock Super-Voting Rights! With 10x statutory voting power, you vetoed the ouster motion."
          };
        } else {
          return { success: false, message: "❌ Class-B super-voting rights were diluted in prior rounds." };
        }
      }
      case "personal_cash_injection": {
        const fin = biz.lastFinancials || {};
        const annualBurn = Math.abs(fin.cashFlow?.cfo || biz.annualRevenueUSD * 0.25);
        const injectionRequired = Math.round(annualBurn * 1.1);

        if (state.fin.cash < injectionRequired) {
          return { success: false, message: `Insufficient personal wallet cash. Requires $${injectionRequired.toLocaleString()}.` };
        }

        state.fin.cash -= injectionRequired;
        biz.treasuryUSD += injectionRequired;
        biz.paidInCapitalUSD = (biz.paidInCapitalUSD || 0) + injectionRequired;
        biz.board.coupThreat = false;
        biz.board.coupReason = null;
        biz.board.seats.forEach(s => { if (s.type !== "founder") s.loyalty = Math.min(100, s.loyalty + 30); });

        return {
          success: true,
          message: `💵 Injected $${injectionRequired.toLocaleString()} personal cash! Cash runway restored to 14 months.`
        };
      }
      case "step_down_to_chairman": {
        biz.board.coupThreat = false;
        biz.board.coupReason = null;
        biz.founderRole = "Chairman of the Board & CPO";
        biz.hasExternalCEO = true;
        biz.board.seats.push({
          id: `hired_ceo_${Date.now()}`,
          title: "Appointed Executive CEO",
          votes: 1,
          type: "executive",
          loyalty: 90,
          agenda: "profitability"
        });

        return {
          success: true,
          message: "👑 Stepped down to Chairman & CPO. Retained full equity ownership while delegating daily operations to an external CEO."
        };
      }
      default:
        return { success: false, message: "Unknown defense lever." };
    }
  }

  // --- ORG SCALING & LATENT CRISIS ENGINE ---
  function stepOrgAnnual(state, biz) {
    if (!biz.org) {
      biz.org = {
        scaleTier: "micro",
        allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 },
        techDebt: 5, qaDeficit: 5, regulatoryExposure: 5, morale: 90
      };
    }

    const au = biz.org.allocatedAU || { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 };

    if (au.product < 15) biz.org.techDebt = Math.min(100, (biz.org.techDebt || 5) + 12);
    else if (au.product >= 25) biz.org.techDebt = Math.max(0, (biz.org.techDebt || 5) - 6);

    if (au.fires < 10 || au.hiring < 15) biz.org.qaDeficit = Math.min(100, (biz.org.qaDeficit || 5) + 10);
    else if (au.hiring >= 25) biz.org.qaDeficit = Math.max(0, (biz.org.qaDeficit || 5) - 5);

    if (au.strategy < 15) biz.org.regulatoryExposure = Math.min(100, (biz.org.regulatoryExposure || 5) + 8);
    else if (au.strategy >= 25) biz.org.regulatoryExposure = Math.max(0, (biz.org.regulatoryExposure || 5) - 4);

    let moraleDelta = 0;
    if ((biz.netProfitUSD || 0) > 0) moraleDelta += 4;
    else moraleDelta -= 6;
    if (au.hiring >= 20) moraleDelta += 3;
    biz.org.morale = Math.max(20, Math.min(100, (biz.org.morale || 85) + moraleDelta));

    const crisisEvents = [];

    if (biz.org.techDebt > 75 && Math.random() < 0.35) {
      const outageCost = Math.round(biz.annualRevenueUSD * 0.08);
      biz.treasuryUSD -= outageCost;
      biz.org.techDebt = Math.max(30, biz.org.techDebt - 35);
      crisisEvents.push(`💥 Major Infrastructure Outage! High tech debt cost $${outageCost.toLocaleString()} in emergency downtime repairs.`);
    }

    if (biz.org.qaDeficit > 75 && Math.random() < 0.30) {
      const recallCost = Math.round(biz.annualRevenueUSD * 0.12);
      biz.treasuryUSD -= recallCost;
      biz.org.qaDeficit = Math.max(30, biz.org.qaDeficit - 35);
      crisisEvents.push(`⚠️ Product Defect Recall! QA deficit triggered a product recall costing $${recallCost.toLocaleString()}.`);
    }

    if (biz.org.regulatoryExposure > 75 && Math.random() < 0.25) {
      const fineCost = Math.round(biz.annualRevenueUSD * 0.10);
      biz.treasuryUSD -= fineCost;
      biz.org.regulatoryExposure = Math.max(30, biz.org.regulatoryExposure - 30);
      crisisEvents.push(`⚖️ Regulatory Sanction! Compliance audit imposed a fine of $${fineCost.toLocaleString()}.`);
    }

    return { crisisEvents };
  }

  function reallocateAttentionUnits(biz, newAU) {
    const sum = (newAU.strategy || 0) + (newAU.hiring || 0) + (newAU.investorRel || 0) + (newAU.product || 0) + (newAU.fires || 0);
    if (sum !== 100) {
      return { success: false, message: `Total Attention Units must equal exactly 100 AU (currently ${sum} AU).` };
    }
    biz.org.allocatedAU = { ...newAU };
    return { success: true, message: "Successfully updated annual Attention Unit priorities!" };
  }


  // --- 5. DATA: REAL ESTATE, ASSETS & FORBES ---
  const PROPERTY_TEMPLATES = [
    { id: "studio_apt", name: "Downtown Studio Condo", icon: "🏢", priceUSD: 280000, rentYield: 0.075, renoCost: 35000 },
    { id: "suburban_villa", name: "Suburban Family Villa", icon: "🏡", priceUSD: 750000, rentYield: 0.065, renoCost: 85000 },
    { id: "historic_townhouse", name: "Historic Kensington Townhouse", icon: "🏛️", priceUSD: 2400000, rentYield: 0.055, renoCost: 250000 },
    { id: "sky_penthouse", name: "Billionaires' Row Penthouse", icon: "🌆", priceUSD: 14500000, rentYield: 0.050, renoCost: 1200000 },
    { id: "oceanfront_estate", name: "Oceanfront French Riviera Villa", icon: "🏖️", priceUSD: 28000000, rentYield: 0.052, renoCost: 2500000 },
    { id: "commercial_tower", name: "Grade-A Corporate Tower", icon: "🏙️", priceUSD: 65000000, rentYield: 0.082, renoCost: 6000000 },
    { id: "private_island", name: "Private Tropical Island", icon: "🏝️", priceUSD: 95000000, rentYield: 0.045, renoCost: 12000000 }
  ];

  const FORBES_TITANS = [
    { name: "Elon Musk", nw: 245000000000, flag: "🇺🇸", source: "Tesla, SpaceX" },
    { name: "Bernard Arnault", nw: 215000000000, flag: "🇫🇷", source: "LVMH Luxury" },
    { name: "Jeff Bezos", nw: 205000000000, flag: "🇺🇸", source: "Amazon, Blue Origin" },
    { name: "Mark Zuckerberg", nw: 185000000000, flag: "🇺🇸", source: "Meta" },
    { name: "Larry Ellison", nw: 165000000000, flag: "🇺🇸", source: "Oracle" },
    { name: "Warren Buffett", nw: 140000000000, flag: "🇺🇸", source: "Berkshire Hathaway" },
    { name: "Mukesh Ambani", nw: 118000000000, flag: "🇮🇳", source: "Reliance Jio" },
    { name: "Gautam Adani", nw: 92000000000, flag: "🇮🇳", source: "Adani Infrastructure" },
    { name: "Françoise Bettencourt", nw: 95000000000, flag: "🇫🇷", source: "L'Oréal" },
    { name: "Amancio Ortega", nw: 98000000000, flag: "🇪🇸", source: "Zara, Inditex" }
  ];

  const STOCKS_CATALOG = [
    { ticker: "APEX", name: "Apex Silicon AI", price: 140.0, pe: 42, div: 0.005 },
    { ticker: "AURA", name: "Aura Devices & OS", price: 230.0, pe: 30, div: 0.015 },
    { ticker: "OMNI", name: "OmniCloud Enterprise", price: 450.0, pe: 34, div: 0.012 },
    { ticker: "VOLT", name: "Voltaic Energy & EV", price: 245.0, pe: 55, div: 0.000 },
    { ticker: "MORG", name: "Morgan Global Bank", price: 220.0, pe: 12, div: 0.032 },
    { ticker: "BGNX", name: "BioGenix Pharma", price: 860.0, pe: 48, div: 0.010 },
    { ticker: "SP50", name: "Global 500 Index ETF", price: 570.0, pe: 22, div: 0.018 }
  ];

  // --- 6. STATE INITIALIZATION ---
  let G = {
    char: {
      firstName: "Aarav",
      lastName: "Sharma",
      gender: "male",
      age: 0, // Starts at birth!
      birthCountry: "india",
      currentCountry: "india",
      city: "Mumbai",
      familyWealth: "middle_class", // middle_class, affluent, billionaire
      trait: "prodigy",
      taxHaven: null,
      alive: true,
      causeOfDeath: null,
      maxAge: 88,
      generation: 1
    },
    stats: {
      health: 95,
      happiness: 90,
      smarts: 85,
      looks: 80,
      energy: 100, // ⚡ Energy pool (0-100)
      creditScore: null, // Unlocks at legal age 18
      prestige: 10,
      fame: 0
    },
    yearActions: {
      actionsDone: {}, // actionKey -> count this year
      specialRelease: false,
      renoDone: {}, // propertyId -> boolean
      pocketMoneyTaken: false,
      choresDone: false,
      napTaken: false,
      overtimeDone: false,
      networkingDone: false
    },
    cognition: {
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
    },
    childhood: {
      preschoolChoice: null,
      primaryHobby: null,
      streamChoice: null, // "pcm", "pcb", "commerce", "arts"
      coachingChoice: null, // "kota_jee", "aakash_neet", "sat_prep"
      class10Score: null,
      class12Score: null,
      upscAttempts: 0
    },
    edu: {
      stage: "Infancy", // Infancy, Preschool, Primary School, Middle School, High School, College, College Graduate
      currentUni: null,
      degrees: [],
      examScores: {}
    },
    career: {
      job: null,
      specialCareer: null,
      lifetimeEarnings: 0
    },
    biz: [],
    fin: {
      cash: 0, // Newborn has $0 personal pocket cash (parents hold family wealth)
      savings: 0, // Childhood piggy bank / savings starts at $0
      stocks: {}, // ticker -> shares
      stockPrices: {},
      crypto: { BTC: 0, ETH: 0 },
      cryptoPrices: { BTC: 65000, ETH: 3400 },
      marginDebt: 0,
      netWorth: 0
    },
    assets: {
      properties: [],
      vehicles: [],
      luxury: []
    },
    family: {
      parents: [
        { name: "Rajesh Sharma", relation: "Father", age: 29, alive: true, nw: 180000 },
        { name: "Priya Sharma", relation: "Mother", age: 27, alive: true, nw: 180000 }
      ],
      partner: null,
      children: [],
      will: { spouse: 50, kids: 40, charity: 10, dynastyTrust: false },
      lineage: []
    },
    lifestyle: {
      angel: [],
      foundation: null,
      boardSeats: [],
      patents: [],
      bioLevel: 0,
      blackCard: false
    },
    ledger: [
      { age: 0, headline: "Born into the World", text: "You were born in Mumbai, India to loving parents. A whole life of boundless possibilities lies ahead." }
    ]
  };

  // Populate stock prices
  STOCKS_CATALOG.forEach(s => {
    G.fin.stockPrices[s.ticker] = s.price;
  });

  // Calculate Net Worth
  function calcNW() {
    let nw = G.fin.cash + G.fin.savings;
    // Stocks
    for (const [t, sh] of Object.entries(G.fin.stocks)) {
      nw += sh * (G.fin.stockPrices[t] || 100);
    }
    // Crypto
    nw += (G.fin.crypto.BTC * G.fin.cryptoPrices.BTC) + (G.fin.crypto.ETH * G.fin.cryptoPrices.ETH);
    // Real Estate
    G.assets.properties.forEach(p => {
      nw += p.val;
    });
    // Luxury
    G.assets.vehicles.forEach(v => nw += v.price);
    // Businesses
    G.biz.forEach(b => nw += b.valuation);
    // Angel
    G.lifestyle.angel.forEach(a => nw += (a.val * (a.eq / 100)));
    // Liabilities
    nw -= G.fin.marginDebt;

    G.fin.netWorth = Math.max(0, Math.round(nw));
    return G.fin.netWorth;
  }

  // --- 7. UI STATS & HEADER BINDING ---
  function updateHeader() {
    calcNW();
    const c = COUNTRIES[G.char.currentCountry] || COUNTRIES.india;

    const nameEl = document.getElementById("headerName");
    if (nameEl) nameEl.innerHTML = `${G.char.firstName} ${G.char.lastName} <span style="font-size: 14px;">${c.flag}</span>`;

    const subEl = document.getElementById("headerSubtitle");
    if (subEl) {
      let role = "Independent";
      if (G.char.age < 3) {
        role = "Infant (Newborn)";
      } else if (G.char.age < 6) {
        role = G.childhood.preschoolChoice ? `Toddler (${G.childhood.preschoolChoice.split(" ")[0]})` : "Toddler (Preschool)";
      } else if (G.char.age < 11) {
        role = `Primary School (Grade ${G.char.age - 5})`;
      } else if (G.char.age < 15) {
        role = `Middle School (Grade ${G.char.age - 5})`;
      } else if (G.char.age < 18) {
        role = `High School (${G.childhood.streamChoice ? G.childhood.streamChoice.toUpperCase() : 'Student'})`;
      } else if (G.edu.currentUni) {
        role = `Undergrad @ ${G.edu.currentUni.name}`;
      } else if (G.career.job) {
        role = G.career.job.title;
      } else if (G.biz.length > 0) {
        role = `Founder & CEO (${G.biz[0].name})`;
      }
      subEl.innerText = `Age ${G.char.age} • Gen ${G.char.generation} • ${role}`;
    }

    const nwEl = document.getElementById("headerNetWorth");
    if (nwEl) nwEl.innerText = `$${G.fin.netWorth.toLocaleString()}`;

    // Update 5 thick vitality progress bars
    setStatBar("statHealth", G.stats.health);
    setStatBar("statHappiness", G.stats.happiness);
    setStatBar("statSmarts", G.stats.smarts);
    setStatBar("statLooks", G.stats.looks);
    setStatBar("statEnergy", G.stats.energy);
  }

  function setStatBar(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const fill = el.querySelector(".stat-bar-fill");
    const txt = el.querySelector(".stat-val-text");
    const cleanVal = Math.min(100, Math.max(0, Math.round(val !== undefined && val !== null ? val : 100)));
    if (fill) fill.style.width = `${cleanVal}%`;
    if (txt) txt.innerText = `${cleanVal}%`;
  }

  // --- 8. MODAL & TOAST SYSTEM ---
  function modal(title, html) {
    const ov = document.getElementById("modalOverlay");
    const mt = document.getElementById("modalTitle");
    const mb = document.getElementById("modalBody");
    if (!ov || !mt || !mb) return;
    mt.innerText = title;
    mb.innerHTML = html;
    ov.classList.add("open");
  }

  function closeModal() {
    const ov = document.getElementById("modalOverlay");
    if (ov) ov.classList.remove("open");
  }

  function toast(msg, type = "info") {
    const box = document.getElementById("toastContainer");
    if (!box) return;
    const t = document.createElement("div");
    t.className = "toast";
    let icon = type === "celebrate" ? "🎉" : (type === "error" ? "⚠️" : "ℹ️");
    t.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
    box.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      t.style.transform = "translateY(-6px)";
      t.style.transition = "all 0.25s ease";
      setTimeout(() => {
        if (t && t.parentNode) {
          t.parentNode.removeChild(t);
        } else if (t && typeof t.remove === "function") {
          t.remove();
        }
      }, 250);
    }, 3200);
  }

  // Energy & Action Limit Consumption Helper
  function consumeEnergy(cost, actionKey, maxPerYear = 1) {
    if (!G.yearActions) {
      G.yearActions = { actionsDone: {}, specialRelease: false, renoDone: {} };
    }
    if (!G.yearActions.actionsDone[actionKey]) {
      G.yearActions.actionsDone[actionKey] = 0;
    }
    if (G.yearActions.actionsDone[actionKey] >= maxPerYear) {
      toast("You already did this for the year! Click 'Age Up' to advance.", "error");
      return false;
    }
    if (G.stats.energy < cost) {
      toast(`Not enough energy (${G.stats.energy}% available, requires ${cost}%). Age up to rest!`, "error");
      return false;
    }
    G.stats.energy -= cost;
    G.yearActions.actionsDone[actionKey] += 1;
    return true;
  }

  // --- CHILDHOOD INTERACTIVE MODALS ---
  function showPreschoolModal() {
    const c = COUNTRIES[G.char.birthCountry] || COUNTRIES.india;
    const opts = c.preschools && c.preschools.length > 0 ? c.preschools : [
      { id: "montessori", name: "Modern Montessori Nursery", costUSD: 1200, smartsGain: 6, desc: "Experiential play, self-directed learning and curiosity." },
      { id: "academic_prep", name: "Early Academic Academy", costUSD: 2000, smartsGain: 8, desc: "Structured phonics, early numeracy and reading readiness." },
      { id: "community_play", name: "Community Playgroup", costUSD: 0, happinessGain: 8, desc: "Neighborhood friends, social bonding and outdoor games." }
    ];

    modal("🎨 Choose Early Preschool & Daycare (Age 3)", `
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
        Your parents are enrolling you in your very first early childhood education program.
      </p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${opts.map(o => `
          <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
              <div>
                <h4 style="font-size: 12px;">${o.name}</h4>
                <span class="pill-badge blue" style="font-size: 8px;">${o.costUSD > 0 ? `$${o.costUSD}/yr (Parent-Paid)` : 'Free Community'}</span>
              </div>
              <button class="btn btn-sm btn-primary btn-select-preschool" data-id="${o.id}" data-name="${o.name}" data-smarts="${o.smartsGain || 0}" data-happy="${o.happinessGain || 0}">Enroll</button>
            </div>
            <p style="font-size: 10px; color: var(--text-secondary);">${o.desc}</p>
          </div>
        `).join("")}
      </div>
    `);

    document.querySelectorAll(".btn-select-preschool").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const smarts = parseInt(btn.dataset.smarts);
        const happy = parseInt(btn.dataset.happy);
        G.childhood.preschoolChoice = name;
        if (smarts > 0) G.stats.smarts = Math.min(100, G.stats.smarts + smarts);
        if (happy > 0) G.stats.happiness = Math.min(100, G.stats.happiness + happy);
        closeModal();
        toast(`Enrolled in ${name}!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });
  }

  function showHobbyModal() {
    const hobbies = [
      { id: "coding", name: "🤖 Robotics & Early Scratch Coding", boost: "smarts", gain: 8, desc: "Build logic, algorithmic thinking and computer literacy." },
      { id: "chess", name: "♟️ Competitive Chess Training", boost: "smarts", gain: 8, desc: "Tactical foresight, analytical problem solving and patience." },
      { id: "swimming", name: "🏊 Junior Swimming & Athletics", boost: "health", gain: 10, desc: "Physical endurance, cardio stamina and athletic discipline." },
      { id: "piano", name: "🎹 Classical Piano & Music", boost: "looks", gain: 6, happyGain: 6, desc: "Creative expression, rhythm and stage presence." }
    ];

    modal("🎒 Choose Childhood Passion / Hobby (Age 7)", `
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
        You are in Grade 2 of Primary School! Your parents encourage you to dedicate your afternoons to a focused extracurricular passion.
      </p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${hobbies.map(h => `
          <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
              <h4 style="font-size: 12px;">${h.name}</h4>
              <button class="btn btn-sm btn-primary btn-select-hobby" data-name="${h.name}" data-boost="${h.boost}" data-gain="${h.gain}">Choose</button>
            </div>
            <p style="font-size: 10px; color: var(--text-secondary);">${h.desc}</p>
          </div>
        `).join("")}
      </div>
    `);

    document.querySelectorAll(".btn-select-hobby").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const boost = btn.dataset.boost;
        const gain = parseInt(btn.dataset.gain);
        G.childhood.primaryHobby = name;
        if (boost === "smarts") G.stats.smarts = Math.min(100, G.stats.smarts + gain);
        if (boost === "health") G.stats.health = Math.min(100, G.stats.health + gain);
        if (boost === "looks") {
          G.stats.looks = Math.min(100, G.stats.looks + gain);
          G.stats.happiness = Math.min(100, G.stats.happiness + 6);
        }
        closeModal();
        toast(`Selected ${name} as childhood hobby!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });
  }

  function showStreamSelectionModal() {
    modal(`🎓 Class 10 Boards Result: ${G.childhood.class10Score}%! Choose Senior Secondary Stream (Age 16)`, `
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
        Outstanding performance on your Class 10 Board Examinations! You must now select your Senior Secondary (Class 11 & 12) academic stream. This choice dictates your future competitive entrance exams and college eligibility!
      </p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <div>
              <h4 style="font-size: 12px;">⚛️ Science PCM (Physics, Chemistry, Math)</h4>
              <span class="pill-badge blue" style="font-size: 8px;">Prerequisite for JEE Main & Advanced</span>
            </div>
            <button class="btn btn-sm btn-primary btn-choose-stream-modal" data-stream="pcm">Select PCM</button>
          </div>
          <p style="font-size: 10px; color: var(--text-secondary);">Target IIT Bombay, IIT Delhi, BITS Pilani & Computer Science Engineering.</p>
        </div>

        <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <div>
              <h4 style="font-size: 12px;">🧬 Science PCB (Physics, Chemistry, Biology)</h4>
              <span class="pill-badge emerald" style="font-size: 8px;">Prerequisite for NEET UG</span>
            </div>
            <button class="btn btn-sm btn-primary btn-choose-stream-modal" data-stream="pcb">Select PCB</button>
          </div>
          <p style="font-size: 10px; color: var(--text-secondary);">Target AIIMS New Delhi, Premier Medical Colleges & MBBS Degree.</p>
        </div>

        <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <div>
              <h4 style="font-size: 12px;">📊 Commerce & Mathematics</h4>
              <span class="pill-badge amber" style="font-size: 8px;">For SRCC, CA & Finance</span>
            </div>
            <button class="btn btn-sm btn-primary btn-choose-stream-modal" data-stream="commerce">Select Commerce</button>
          </div>
          <p style="font-size: 10px; color: var(--text-secondary);">Target SRCC Delhi University, Chartered Accountancy (CA) & Corporate Finance.</p>
        </div>

        <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <div>
              <h4 style="font-size: 12px;">🏛️ Humanities / Arts & Law</h4>
              <span class="pill-badge purple" style="font-size: 8px;">For NLSIU & Pre-Law</span>
            </div>
            <button class="btn btn-sm btn-primary btn-choose-stream-modal" data-stream="arts">Select Arts</button>
          </div>
          <p style="font-size: 10px; color: var(--text-secondary);">Target National Law Universities, International Relations & Governance.</p>
        </div>
      </div>
    `);

    document.querySelectorAll(".btn-choose-stream-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        const stream = btn.dataset.stream;
        G.childhood.streamChoice = stream;
        closeModal();
        toast(`Enrolled in Class 11 ${stream.toUpperCase()} Stream!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });
  }

  function showCoachingModal() {
    const stream = G.childhood.streamChoice || "pcm";
    let coachingName = "Kota Super-30 Academy (Allen/Resonance)";
    let targetExam = "JEE Advanced";
    if (stream === "pcb") {
      coachingName = "Aakash Medical Institute";
      targetExam = "NEET UG";
    } else if (stream === "commerce") {
      coachingName = "Elite Commerce & CA Foundation Prep";
      targetExam = "CUET & CA Foundation";
    } else if (stream === "arts") {
      coachingName = "Career Launcher CLAT & Humanities Academy";
      targetExam = "CLAT / Pre-Law";
    }

    modal("🎯 Class 11-12 Coaching Academy Enrollment (Age 17)", `
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
        To compete against 1.5 Million students in ${targetExam}, national coaching academies offer intensive problem-solving regimens.
      </p>
      <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; margin-bottom: 12px;">
        <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px;">${coachingName}</div>
        <div style="color: var(--text-secondary); margin-bottom: 6px;">Target Exam: <strong>${targetExam}</strong></div>
        <div>Cost: <strong>$1,800 (Paid by Parents)</strong> | Benefit: <strong>+10 Smarts, Competitive Exam Boost</strong></div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-primary btn-full" id="btnEnrollCoaching">Enroll in Coaching</button>
        <button class="btn btn-full" id="btnSelfStudy">Self Study at Home</button>
      </div>
    `);

    document.getElementById("btnEnrollCoaching")?.addEventListener("click", () => {
      G.childhood.coachingChoice = coachingName;
      G.stats.smarts = Math.min(100, G.stats.smarts + 10);
      closeModal();
      toast(`Enrolled in ${coachingName}! Exam preparedness boosted!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSelfStudy")?.addEventListener("click", () => {
      G.childhood.coachingChoice = "Self Study";
      G.stats.happiness = Math.min(100, G.stats.happiness + 5);
      closeModal();
      toast("Chose self-directed home study.", "info");
      updateHeader();
      renderCurrentTab();
    });
  }

  // --- AUTHENTIC 3-STAGE UPSC CIVIL SERVICES GAUNTLET ---
  function startUPSCProcess() {
    if (G.char.age < 21 || G.edu.degrees.length === 0) {
      toast("UPSC Civil Services strictly requires a Bachelor's Degree and minimum age 21!", "error");
      return;
    }
    if (G.childhood.upscAttempts >= 6) {
      toast("You have exhausted the maximum limit of 6 UPSC attempts in your lifetime.", "error");
      return;
    }

    G.childhood.upscAttempts = (G.childhood.upscAttempts || 0) + 1;
    const attemptNum = G.childhood.upscAttempts;

    // Stage 1: Prelims (GS + CSAT)
    const prelimScore = Math.round(70 + (G.stats.smarts / 100) * 55 + (Math.random() * 18));
    const prelimCutoff = 98;

    if (prelimScore < prelimCutoff) {
      modal(`UPSC Civil Services — Attempt #${attemptNum}`, `
        <div style="text-align: center; padding: 10px;">
          <div style="font-size: 38px; margin-bottom: 8px;">❌</div>
          <h4 style="font-size: 15px; margin-bottom: 6px;">UPSC Prelims Cutoff Not Met</h4>
          <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; text-align: left; margin-bottom: 12px;">
            <div>General Studies Paper I: <strong>${prelimScore} / 200</strong></div>
            <div>Category Cutoff: <strong>${prelimCutoff} / 200</strong></div>
            <div>Result: <span style="color: var(--accent-rose); font-weight: 700;">Disqualified</span></div>
          </div>
          <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
            Over 1,100,000 aspirants took the preliminary exam. Review your GS fundamentals, practice NCERT mock tests, and attempt again next year! (Attempts used: ${attemptNum}/6).
          </p>
          <button class="btn btn-primary btn-full" onclick="document.getElementById('modalOverlay').classList.remove('open')">Understood</button>
        </div>
      `);
      return;
    }

    // Stage 1 Passed -> Stage 2: Mains
    const mainsScore = Math.round(620 + (G.stats.smarts / 100) * 230 + (Math.random() * 40));
    const mainsCutoff = 745;

    modal(`🏛️ UPSC Civil Services — Stage 1 Cleared!`, `
      <div style="text-align: center; padding: 10px;">
        <div style="font-size: 38px; margin-bottom: 8px;">🎉</div>
        <h4 style="font-size: 15px; margin-bottom: 6px;">CLEARED UPSC PRELIMS!</h4>
        <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; text-align: left; margin-bottom: 12px;">
          <div>Your Score: <strong style="color: var(--accent-emerald);">${prelimScore} / 200</strong> (Cutoff: ${prelimCutoff})</div>
          <div>Status: <strong>Qualified for 9 Descriptive Mains Papers</strong></div>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 14px;">
          You are among the top 13,000 candidates nationwide selected to sit for the 5-day subjective written examination.
        </p>
        <button class="btn btn-emerald btn-full" id="btnProceedMains">Write UPSC Mains Examination ➔</button>
      </div>
    `);

    document.getElementById("btnProceedMains")?.addEventListener("click", () => {
      if (mainsScore < mainsCutoff) {
        modal(`UPSC Civil Services — Mains Result`, `
          <div style="text-align: center; padding: 10px;">
            <div style="font-size: 38px; margin-bottom: 8px;">📝</div>
            <h4 style="font-size: 15px; margin-bottom: 6px;">Mains Written Cutoff Missed</h4>
            <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; text-align: left; margin-bottom: 12px;">
              <div>Total Written Score: <strong>${mainsScore} / 1750</strong></div>
              <div>Mains Interview Cutoff: <strong>${mainsCutoff} / 1750</strong></div>
            </div>
            <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
              You wrote 9 rigorous descriptive papers across Essay, GS I-IV, and Optional subjects. You narrowly missed the interview call cutoff by ${mainsCutoff - mainsScore} marks. Revise answer-writing and re-attempt next year!
            </p>
            <button class="btn btn-primary btn-full" onclick="document.getElementById('modalOverlay').classList.remove('open')">Close</button>
          </div>
        `);
        return;
      }

      // Stage 2 Passed -> Stage 3: Personality Interview at Dholpur House
      modal(`🏛️ SUMMONED TO DHOLPUR HOUSE, NEW DELHI!`, `
        <div style="text-align: center; padding: 10px;">
          <div style="font-size: 38px; margin-bottom: 8px;">🎖️</div>
          <h4 style="font-size: 15px; margin-bottom: 6px;">CLEARED UPSC MAINS WRITTEN!</h4>
          <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; text-align: left; margin-bottom: 12px;">
            <div>Mains Written Score: <strong style="color: var(--accent-emerald);">${mainsScore} / 1750</strong> (Cutoff: ${mainsCutoff})</div>
            <div>Status: <strong>Invited for Final Personality Board Interview</strong></div>
          </div>
          <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 14px;">
            Only 2,800 candidates across the country reached this pinnacle. The interview board of 5 esteemed members will assess your poise, leadership, and constitutional wisdom.
          </p>
          <button class="btn btn-emerald btn-full" id="btnProceedInterview">Face the UPSC Interview Board ➔</button>
        </div>
      `);

      document.getElementById("btnProceedInterview")?.addEventListener("click", () => {
        const interviewScore = Math.round(135 + (G.stats.smarts / 100) * 55 + (G.stats.looks / 100) * 35 + (Math.random() * 25));
        const finalTotal = mainsScore + interviewScore;
        const finalRank = Math.max(1, Math.min(250, Math.round(980 - (finalTotal * 0.45))));

        G.edu.examScores.upsc = `AIR ${finalRank} (IAS Cadre)`;
        G.career.job = {
          trackId: "civil_service",
          title: "Sub-Divisional Magistrate (IAS)",
          baseSalary: 50000,
          bonusPct: 0.05,
          stockUSD: 0
        };
        G.stats.prestige = Math.min(100, G.stats.prestige + 45);
        G.stats.happiness = 100;

        modal(`🌟 CONGRATULATIONS: ALL-INDIA RANK ${finalRank}!`, `
          <div style="text-align: center; padding: 10px;">
            <div style="font-size: 42px; margin-bottom: 8px;">🇮🇳</div>
            <h3 style="font-size: 17px; margin-bottom: 4px; color: var(--accent-emerald);">ALL-INDIA RANK ${finalRank}</h3>
            <p style="font-size: 12px; font-weight: 700; margin-bottom: 12px;">RECOMMENDED FOR INDIAN ADMINISTRATIVE SERVICE (IAS)!</p>
            <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; text-align: left; margin-bottom: 14px;">
              <div>Mains Written: <strong>${mainsScore} / 1750</strong></div>
              <div>Interview Score: <strong>${interviewScore} / 275</strong></div>
              <div>Grand Total: <strong>${finalTotal} / 2025</strong></div>
              <div>Service Allocation: <strong style="color: var(--accent-emerald);">IAS (Indian Administrative Service)</strong></div>
              <div>Official Cadre: <strong>Sub-Divisional Magistrate (SDM)</strong></div>
            </div>
            <button class="btn btn-emerald btn-full" onclick="document.getElementById('modalOverlay').classList.remove('open')">Take Oath of Office & Begin Governance 🇮🇳</button>
          </div>
        `);

        G.ledger.unshift({
          age: G.char.age,
          headline: `Cleared UPSC CSE — AIR ${finalRank} (IAS)!`,
          text: `Cleared the legendary 3-stage UPSC Civil Services Examination with All-India Rank ${finalRank}! Appointed Sub-Divisional Magistrate (SDM) in the elite Indian Administrative Service.`
        });

        updateHeader();
        renderCurrentTab();
        toast(`🎉 UPSC Cleared! AIR ${finalRank} — Appointed SDM (IAS)!`, "celebrate");
      });
    });
  }

  // --- END OF LIFE & SUCCESSION MODAL ---
  function showEndOfLifeModal() {
    const highestJob = G.career.job ? G.career.job.title : (G.biz.length > 0 ? "Billionaire Founder" : "Private Investor");
    const heirsHtml = G.family.children.length > 0 ? `
      <div style="margin-top: 12px;">
        <div style="font-weight: 700; margin-bottom: 6px;">Select an Heir to Continue Playing (Gen ${G.char.generation + 1}):</div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${G.family.children.map((c, i) => `
            <button class="btn btn-sm btn-primary btn-pass-torch" data-idx="${i}" style="text-align: left; padding: 8px 12px;">
              👑 Play as ${c.name} (Age ${c.age})
            </button>
          `).join("")}
        </div>
      </div>
    ` : `
      <p style="font-size: 11px; color: var(--text-secondary); margin-top: 10px;">You have no surviving children to inherit the estate.</p>
    `;

    modal(`🕊️ Life Completed: In Memoriam (Age ${G.char.age})`, `
      <div style="text-align: center; padding: 8px;">
        <div style="font-size: 36px; margin-bottom: 8px;">👑</div>
        <h4 style="font-size: 16px; margin-bottom: 4px;">${G.char.firstName} ${G.char.lastName}</h4>
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">Generation ${G.char.generation} Patriarch / Matriarch</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; background: var(--bg-subtle); padding: 12px; border-radius: 8px; text-align: left; margin-bottom: 12px;">
          <div>Final Net Worth: <strong style="color: var(--accent-emerald);">$ ${G.fin.netWorth.toLocaleString()}</strong></div>
          <div>Pinnacle Career: <strong>${highestJob}</strong></div>
          <div>Operating Companies: <strong>${G.biz.length}</strong></div>
          <div>Real Estate Assets: <strong>${G.assets.properties.length}</strong></div>
        </div>

        ${heirsHtml}

        <button class="btn btn-emerald btn-full" id="btnRestartDynasty" style="margin-top: 12px;">
          ✨ Start a Brand New Life (Gen 1)
        </button>
      </div>
    `);

    document.querySelectorAll(".btn-pass-torch").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        passTorchToChild(idx);
      });
    });

    document.getElementById("btnRestartDynasty")?.addEventListener("click", () => {
      closeModal();
      showCharacterCreation();
    });
  }

  function passTorchToChild(idx) {
    const c = G.family.children[idx];
    if (!c) return;

    const hasTrust = G.family.will.dynastyTrust;
    const estateTaxRate = hasTrust ? 0 : 0.28;
    const estateTax = Math.round(G.fin.cash * estateTaxRate);
    const inheritedCash = G.fin.cash - estateTax;

    const parentName = `${G.char.firstName} ${G.char.lastName}`;
    G.char.firstName = c.name.split(" ")[0];
    G.char.lastName = c.name.split(" ")[1] || G.char.lastName;
    G.char.age = Math.max(18, c.age);
    G.char.generation += 1;
    G.char.alive = true;
    G.stats.health = 95;
    G.stats.happiness = 90;
    G.stats.energy = 100;
    G.stats.creditScore = 700;
    G.fin.cash = inheritedCash;
    G.family.partner = null;
    G.family.children = [];
    G.career.job = null;
    G.edu.degrees = [{ title: "High School Diploma", major: "General Studies", uni: "Heritage Academy", yr: G.char.age }];
    G.edu.currentUni = null;
    G.edu.examScores = {};

    let msg = `👑 Crown passed to ${c.name} (Gen ${G.char.generation})!`;
    if (estateTax > 0) {
      msg += ` Paid $${estateTax.toLocaleString()} in 28% estate taxes (Establish a Dynasty Trust to avoid this next time).`;
    } else {
      msg += ` 0% Estate Tax applied via active Dynasty Trust!`;
    }
    closeModal();
    toast(msg, "celebrate");

    G.ledger = [
      {
        age: G.char.age,
        headline: `Ascended as Gen ${G.char.generation} Heir`,
        text: `Took over the family dynasty from ${parentName}. Inherited $${inheritedCash.toLocaleString()} in liquid capital, existing commercial companies, and real estate estates.`
      }
    ];

    updateHeader();
    switchTab("profile");
  }

  // --- 9. ANNUAL PROGRESSION (AGE UP +1 YEAR) ---
  function ageUp() {
    if (!G.char.alive) {
      showEndOfLifeModal();
      return;
    }

    // Reset Annual Energy & Action Counters
    G.stats.energy = 100;
    G.yearActions = {
      actionsDone: {},
      specialRelease: false,
      renoDone: {},
      pocketMoneyTaken: false,
      choresDone: false,
      napTaken: false,
      overtimeDone: false,
      networkingDone: false
    };

    G.char.age += 1;
    const age = G.char.age;
    const startCash = G.fin.cash;
    const logs = [];
    let headline = `Turned Age ${age}`;

    // Natural Stat Drift / Development
    if (age <= 18) {
      G.stats.health = Math.min(100, G.stats.health + 1);
    } else if (age > 45) {
      G.stats.health = Math.max(10, G.stats.health - (age > 70 ? 3 : 1));
      G.stats.looks = Math.max(10, G.stats.looks - 1);
    }

    // Initialize Credit Score at Legal Majority (Age 18)
    if (age === 18 && G.stats.creditScore === null) {
      G.stats.creditScore = 680;
      logs.push("💳 Opened first bank account & credit line. Starting FICO score: 680.");
    } else if (G.stats.creditScore !== null && G.stats.creditScore < 850) {
      G.stats.creditScore = Math.min(850, G.stats.creditScore + 5);
    }

    // --- LIFE STAGE 1: INFANCY & TODDLER (Age 1 - 5) ---
    if (age === 1) {
      headline = "First Steps & Words";
      logs.push("You took your very first steps across the living room and said 'Mama'! Pediatrician gave you a clean bill of health.");
      G.stats.happiness += 5;
    } else if (age === 2) {
      headline = "Curious Explorer";
      logs.push("You love babbling, stacking colorful toy blocks, and running in circles with your parents.");
      G.stats.smarts += 3;
    } else if (age === 3) {
      headline = "Preschool Choices";
      logs.push("Time for early childhood schooling! Your parents are evaluating top Montessori and prep programs.");
      G.edu.stage = "Preschool";
      setTimeout(showPreschoolModal, 300);
    } else if (age === 4) {
      headline = "Preschool Play & Learning";
      logs.push("Making finger painting art, singing nursery rhymes, and developing early motor skills.");
      G.stats.smarts += 3;
    } else if (age === 5) {
      headline = "Kindergarten Graduation";
      logs.push("You learned the alphabet, numbers to 100, and drew pictures. Ready for primary school!");
      G.stats.smarts += 4;
      G.edu.stage = "Primary School";
    }

    // --- LIFE STAGE 2: PRIMARY & MIDDLE SCHOOL (Age 6 - 14) ---
    else if (age === 6) {
      headline = "Entered Grade 1 Primary School";
      logs.push(`Enrolled in Primary School in ${G.char.city}. Started reading chapter books and making school friends.`);
    } else if (age === 7) {
      headline = "Childhood Passion Discovery";
      logs.push("Your curiosity is blossoming. Time to pick a dedicated childhood passion!");
      setTimeout(showHobbyModal, 300);
    } else if (age >= 8 && age <= 10) {
      headline = `Grade ${age - 5} Academic Year`;
      logs.push(`Attending primary school in ${G.char.city}. Reading books, participating in sports, and making lifelong childhood friends.`);
      if (G.childhood.primaryHobby) logs.push(`Practiced ${G.childhood.primaryHobby} diligently.`);
    } else if (age === 11) {
      headline = "Entered Middle School (Grade 6)";
      logs.push("School curriculum stepped up in difficulty. Started algebra, biology, and history.");
      G.edu.stage = "Middle School";
    } else if (age >= 12 && age <= 14) {
      headline = `Middle School Year (Grade ${age - 5})`;
      logs.push("Studied hard for school examinations, navigated friendship circles, and participated in science fairs.");
    }

    // --- LIFE STAGE 3: HIGH SCHOOL, 10TH BOARDS & STREAM SELECTION (Age 15 - 18) ---
    else if (age === 15) {
      headline = "High School (Class 10 Prep)";
      G.edu.stage = "High School";
      logs.push("Enrolled in High School. All focus is on the upcoming Class 10 Board Examinations!");
    } else if (age === 16) {
      // CLASS 10 BOARDS RESULT & STREAM CHOICE
      const boardScore = Math.min(99.4, Math.round(75 + (G.stats.smarts / 100) * 23 + (Math.random() * 2)));
      G.childhood.class10Score = boardScore;
      headline = `Class 10 Boards Result: ${boardScore}%!`;
      logs.push(`🎓 Scored an impressive ${boardScore}% on Class 10 Boards! Now choose your Class 11-12 Stream (PCM / PCB / Commerce / Humanities).`);
      G.stats.smarts += 5;
      setTimeout(showStreamSelectionModal, 350);
    } else if (age === 17) {
      headline = "Class 11 Junior College & Coaching";
      const streamName = G.childhood.streamChoice ? G.childhood.streamChoice.toUpperCase() : "Science PCM";
      logs.push(`Deep in Class 11 coursework in the ${streamName} stream. National coaching prep underway!`);
      setTimeout(showCoachingModal, 350);
    } else if (age === 18) {
      headline = "Class 12 Boards & College Admissions!";
      G.edu.stage = "High School Graduate";
      const board12 = Math.min(99.6, Math.round(78 + (G.stats.smarts / 100) * 20 + Math.random()));
      G.childhood.class12Score = board12;
      logs.push(`🎓 Graduated High School! Scored ${board12}% in Class 12 Boards. National entrance exams & premier college gates are now unlocked!`);
    }

    // --- 9B. HIGH SCHOOL & ACADEMIC PROGRESSION (Age 6 - 22) ---
    if (G.highSchool && G.char.age >= 6 && G.char.age <= 22) {
      const hs = G.highSchool;
      const alloc = hs.timeAllocation || {};
      const sleepHours = Number(alloc.sleep) || 56;
      const studyHours = (Number(alloc.selfStudy) || 0) + (Number(alloc.homework) || 0) + (Number(alloc.schoolClasses) || 30);
      const totalHours = Object.values(alloc).reduce((acc, h) => acc + (Number(h) || 0), 0);

      // 1. Sleep Debt & Health Impact
      if (sleepHours < 49) {
        G.stats.health = Math.max(10, G.stats.health - (sleepHours < 42 ? 4 : 2));
        G.stats.happiness = Math.max(10, G.stats.happiness - 3);
        logs.push(`⚠️ Sleep Debt: Operating on only ${sleepHours}h sleep/wk caused chronic fatigue (-Health, -Happiness).`);
      } else if (sleepHours >= 56) {
        G.stats.health = Math.min(100, G.stats.health + 1);
      }

      // 2. Schedule Deficit Burnout Check
      if (totalHours > 168) {
        const overtime = totalHours - 168;
        G.stats.happiness = Math.max(10, G.stats.happiness - 5);
        logs.push(`🚨 Overloaded Schedule: Deficit of ${overtime}h/wk triggered academic burnout!`);
      }

      // 3. Student Job Compensation
      if (hs.activeJob && Number(alloc.partTimeWork) > 0) {
        const weeksWorked = 36;
        const jobEarnings = Math.round(hs.activeJob.baseHourlyUSD * Number(alloc.partTimeWork) * weeksWorked);
        G.fin.cash += jobEarnings;
        logs.push(`💼 Student Hustle: Earned $${jobEarnings.toLocaleString()} working as a ${hs.activeJob.title} (${alloc.partTimeWork}h/wk for ${weeksWorked} weeks).`);
      }

      // 4. Course Mastery & Grade Simulation
      let totalGradePoints = 0;
      let subjectCount = 0;
      (hs.enrolledSubjects || []).forEach(s => {
        let masteryDelta = studyHours >= 45 ? 5 : (studyHours >= 35 ? 3 : (studyHours < 25 ? -3 : 0));
        s.mastery = Math.min(99, Math.max(30, (s.mastery || 70) + masteryDelta));

        const sleepPenalty = sleepHours < 42 ? 8 : (sleepHours < 49 ? 4 : 0);
        const rawScore = Math.min(99, Math.max(50, Math.round(
          (s.mastery * 0.65) +
          ((G.stats.smarts || 75) * 0.35) -
          ((s.teacherStrictness || 50) - 50) * 0.15 -
          sleepPenalty +
          (Math.random() * 4 - 2)
        )));

        s.currentGrade = rawScore;
        let letter = "F";
        let pts = 0.0;
        if (rawScore >= 93) { letter = "A"; pts = 4.0; }
        else if (rawScore >= 90) { letter = "A-"; pts = 3.7; }
        else if (rawScore >= 87) { letter = "B+"; pts = 3.3; }
        else if (rawScore >= 83) { letter = "B"; pts = 3.0; }
        else if (rawScore >= 80) { letter = "B-"; pts = 2.7; }
        else if (rawScore >= 77) { letter = "C+"; pts = 2.3; }
        else if (rawScore >= 70) { letter = "C"; pts = 2.0; }
        else { letter = "D"; pts = 1.0; }
        s.letterGrade = letter;

        totalGradePoints += pts;
        subjectCount++;
      });

      if (subjectCount > 0) {
        hs.currentTermGPA = Number((totalGradePoints / subjectCount).toFixed(2));
        if (hs.currentTermGPA >= 3.9) hs.classRankDecile = 2;
        else if (hs.currentTermGPA >= 3.7) hs.classRankDecile = 5;
        else if (hs.currentTermGPA >= 3.4) hs.classRankDecile = 10;
        else if (hs.currentTermGPA >= 3.0) hs.classRankDecile = 25;
        else hs.classRankDecile = 50;

        logs.push(`📚 Academic Standing: Completed academic year with a ${hs.currentTermGPA.toFixed(2)} GPA (Top ${hs.classRankDecile}% of class).`);
      }

      // 5. Cognitive Skills Growth & Smarts Sync
      if (G.cognition?.skills) {
        const sk = G.cognition.skills;
        sk.algebra = Math.min(100, (sk.algebra || 10) + 3);
        sk.writing = Math.min(100, (sk.writing || 20) + 2);
        if (studyHours >= 40) {
          sk.research = Math.min(100, (sk.research || 5) + 2);
          sk.physics = Math.min(100, (sk.physics || 5) + 3);
        }
        G.stats.smarts = calculateLegacySmarts(G.cognition.innate, G.cognition.skills, G.cognition.traits);
      }
    }

    // --- LIFE STAGE 4: UNDERGRADUATE COLLEGE (Age 19 - 22) ---
    else if (G.edu.currentUni) {
      const u = G.edu.currentUni;
      u.year += 1;
      G.fin.cash = Math.max(0, G.fin.cash - u.tuition);
      logs.push(`Completed Year ${u.year - 1} at ${u.name} studying ${u.major}. Paid $${u.tuition.toLocaleString()} tuition.`);

      if (u.year >= u.totalYears) {
        headline = `Graduated from ${u.name}!`;
        G.edu.degrees.push({ title: `B.S. in ${u.major}`, major: u.major, uni: u.name, yr: age });
        G.stats.smarts += 12;
        G.stats.prestige += Math.round(u.prestige / 5);
        logs.push(`🎓 MAGNA CUM LAUDE! Graduated with a Bachelor's Degree in ${u.major} from ${u.name}! Corporate ladders and post-grad exams (UPSC & CAT) are now accessible!`);
        G.edu.currentUni = null;
        G.edu.stage = "College Graduate";
      }
    }

    // --- LIFE STAGE 5: CORPORATE SALARY & RSUs ---
    if (G.career.job) {
      const j = G.career.job;
      const bonus = Math.round(j.baseSalary * j.bonusPct);
      const gross = j.baseSalary + bonus;
      const rsu = j.stockUSD > 0 ? Math.round(j.stockUSD * (0.8 + Math.random() * 0.4)) : 0;
      const taxRate = G.char.taxHaven ? 0 : 0.25;
      const net = Math.round((gross + rsu) * (1 - taxRate));

      G.fin.cash += net;
      G.career.lifetimeEarnings += net;
      logs.push(`💼 Earned $${gross.toLocaleString()} from ${j.title} (RSU Vested: $${rsu.toLocaleString()}). Take-home net: $${net.toLocaleString()}`);

      // Promotion check
      if (age > 24 && Math.random() < 0.35) {
        const track = CAREER_TRACKS.find(t => t.id === j.trackId);
        if (track) {
          const currIdx = track.ladder.findIndex(lvl => lvl.title === j.title);
          if (currIdx >= 0 && currIdx < track.ladder.length - 1) {
            const nextLvl = track.ladder[currIdx + 1];
            j.title = nextLvl.title;
            j.baseSalary = nextLvl.baseSalaryUSD;
            j.bonusPct = nextLvl.bonusPct;
            j.stockUSD = nextLvl.stockUSD;
            headline = `Promoted to ${j.title}!`;
            logs.push(`🌟 PROMOTION! Advanced to ${j.title} with higher compensation and executive RSUs!`);
          }
        }
      }
    }

    // --- LIFE STAGE 6: 120 BUSINESSES CORPORATE OPERATIONS ---
    G.biz.forEach(b => {
      b.yearsActive = (b.yearsActive || 0) + 1;
      const fin = calculateAnnualCorporateFinancials(b, G);
      b.annualRevenueUSD = fin.pnl.netRevenue;
      b.annualRev = fin.pnl.netRevenue;
      b.ebitdaUSD = fin.pnl.ebitda;
      b.netProfitUSD = fin.pnl.netIncome;
      b.profit = fin.pnl.netIncome;
      b.treasuryUSD = fin.balanceSheet.cash;
      b.treasury = fin.balanceSheet.cash;
      b.accountsReceivableUSD = fin.balanceSheet.ar;
      b.inventoryUSD = fin.balanceSheet.inventory;
      b.fixedAssetsUSD = fin.balanceSheet.fixedAssets;
      b.ipAssetsUSD = fin.balanceSheet.ipAssets;
      b.accountsPayableUSD = fin.balanceSheet.ap;
      b.shortTermDebtUSD = fin.balanceSheet.shortTermDebt;
      b.longTermDebtUSD = fin.balanceSheet.longTermDebt;
      b.paidInCapitalUSD = fin.balanceSheet.paidInCapital;
      b.retainedEarningsUSD = fin.balanceSheet.retainedEarnings;
      b.valuationUSD = fin.valuation;
      b.valuation = fin.valuation;
      b.kpis = fin.activeKpis;
      b.lastFinancials = fin;

      // Org stepping & latent crises
      const orgRes = stepOrgAnnual(G, b);
      (orgRes.crisisEvents || []).forEach(e => logs.push(e));

      // Board stepping
      stepBoardAnnual(G, b);
      if (b.board?.coupThreat) {
        logs.push(`⚠️ ${b.name}: Boardroom Coup initiated by institutional directors!`);
      }

      if (fin.isBankrupt) {
        b.inRestructuring = true;
        logs.push(`🚨 ${b.name}: Illiquid insolvency! Entered Chapter 11 restructuring.`);
      } else {
        logs.push(`🏭 ${b.name}: Net Rev $${fin.pnl.netRevenue.toLocaleString()} | Profit $${fin.pnl.netIncome.toLocaleString()} | Cash $${fin.balanceSheet.cash.toLocaleString()}`);
      }
    });

    // --- LIFE STAGE 7: REAL ESTATE RENTS & MAINTENANCE ---
    let totalRent = 0;
    let totalHolding = 0;
    G.assets.properties.forEach(p => {
      p.val = Math.round(p.val * 1.045); // 4.5% annual appreciation
      totalHolding += Math.round(p.val * 0.012); // 1.2% annual property tax & maintenance upkeep
      if (p.isRented) {
        const rent = Math.round(p.val * p.rentYield);
        totalRent += rent;
      }
    });
    if (totalRent > 0) {
      G.fin.cash += totalRent;
      logs.push(`🏠 Collected $${totalRent.toLocaleString()} in net property rental distributions.`);
    }
    if (totalHolding > 0 && age >= 18) {
      G.fin.cash = Math.max(0, G.fin.cash - totalHolding);
      logs.push(`Paid $${totalHolding.toLocaleString()} in property taxes and maintenance.`);
    }

    // --- LIFE STAGE 8: FINANCIAL MARKETS & SAVINGS ---
    let divTotal = 0;
    STOCKS_CATALOG.forEach(s => {
      const p = G.fin.stockPrices[s.ticker];
      const change = (Math.random() * 0.24) - 0.08;
      const newP = Math.max(1, Math.round(p * (1 + change) * 100) / 100);
      G.fin.stockPrices[s.ticker] = newP;
      const sh = G.fin.stocks[s.ticker] || 0;
      if (sh > 0 && s.div > 0) divTotal += Math.round(sh * newP * s.div);
    });
    if (divTotal > 0) {
      G.fin.cash += divTotal;
      logs.push(`📈 Received $${divTotal.toLocaleString()} in annual equity dividend payouts.`);
    }

    // Savings APY (Child Piggy Bank 3%, Adult High-Yield 4.5%)
    if (G.fin.savings > 0) {
      const apyRate = age < 18 ? 0.03 : 0.045;
      const int = Math.round(G.fin.savings * apyRate);
      G.fin.savings += int;
      logs.push(`Earned $${int.toLocaleString()} interest on savings (${(apyRate * 100).toFixed(1)}% APY).`);
    }

    // --- LIFE STAGE 9: RELATIONSHIPS & AGING ---
    // Parents
    G.family.parents.forEach(par => {
      if (par.alive) {
        par.age += 1;
        if (par.age > 84 && Math.random() < 0.25) {
          par.alive = false;
          const inh = Math.round(par.nw * 0.9);
          G.fin.cash += inh;
          logs.push(`Passing: Your ${par.relation} passed away peacefully. You inherited the family estate of $${inh.toLocaleString()}.`);
        }
      }
    });

    // Partner
    if (G.family.partner) {
      G.family.partner.age += 1;
    }

    // Children Aging (Fixes Peter Pan bug!)
    G.family.children.forEach(c => {
      c.age += 1;
    });

    // Mortality check
    if (age >= G.char.maxAge || G.stats.health <= 0) {
      G.char.alive = false;
      G.char.causeOfDeath = G.stats.health <= 0 ? "Failing health" : "Peaceful old age";
      headline = `Passing at Age ${age}`;
      logs.push(`🕊️ You lived a legendary and fruitful life to age ${age}!`);
      setTimeout(showEndOfLifeModal, 600);
    }

    // Ledger entry
    G.ledger.unshift({
      age,
      headline,
      logs,
      cashDelta: G.fin.cash - startCash
    });

    calcNW();
    updateHeader();
    renderCurrentTab();
    toast(`Aged up to ${age}! Net Worth: $${G.fin.netWorth.toLocaleString()}`, "celebrate");
  }

  // --- 10. TAB NAVIGATION & VIEW RENDERING ---
  let activeTab = "profile";

  function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll(".nav-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === tabId);
    });
    renderCurrentTab();
  }

  function renderCurrentTab() {
    const vc = document.getElementById("viewContent");
    if (!vc) return;

    if (activeTab === "profile") {
      renderProfileTab(vc);
    } else if (activeTab === "education_career") {
      renderEducationCareerTab(vc);
    } else if (activeTab === "business") {
      renderBusinessTab(vc);
    } else if (activeTab === "finance_assets") {
      renderFinanceAssetsTab(vc);
    } else if (activeTab === "relationships") {
      renderRelationshipsTab(vc);
    } else if (activeTab === "lifestyle") {
      renderLifestyleTab(vc);
    }
  }

  // TAB 1: LIFE / PROFILE & CHRONICLES
  function renderProfileTab(vc) {
    const c = COUNTRIES[G.char.currentCountry] || COUNTRIES.india;
    const age = G.char.age;
    const actionsDone = G.yearActions.actionsDone || {};

    const ledgerHtml = G.ledger.map(item => `
      <div class="ledger-item">
        <div class="ledger-headline">
          <span>Age ${item.age}: ${item.headline}</span>
          ${item.cashDelta !== undefined ? `<span style="font-size: 11px; color: ${item.cashDelta >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${item.cashDelta >= 0 ? '+' : ''}$${Math.round(item.cashDelta).toLocaleString()}</span>` : ''}
        </div>
        ${item.logs ? item.logs.map(l => `<p class="ledger-log-text">• ${l}</p>`).join("") : `<p class="ledger-log-text">${item.text}</p>`}
      </div>
    `).join("");

    // Generate Stage-Appropriate Life Actions
    let stageTitle = "🌟 Adulthood Actions";
    let actionsHtml = "";

    if (age <= 2) {
      stageTitle = "🍼 Infancy Actions (Home & Sensory Development)";
      const napDone = actionsDone["nap"] >= 1;
      actionsHtml = `
        <button class="btn btn-sm" id="btnActCuddle">
          <span>🍼 Cuddle Parents</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡20 (${actionsDone["cuddle"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActRattle">
          <span>🧸 Play Rattles</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡20 (${actionsDone["rattle"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActCrawl">
          <span>👣 Learn to Walk</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["crawl"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActNap" ${napDone ? 'disabled' : ''}>
          <span>😴 Afternoon Nap</span>
          <span class="pill-badge emerald" style="font-size: 8px;">+30 ⚡ (${napDone ? 'Done' : '1/yr'})</span>
        </button>
      `;
    } else if (age >= 3 && age <= 5) {
      stageTitle = "🎨 Toddler & Preschool Activities";
      actionsHtml = `
        <button class="btn btn-sm" id="btnActPaint">
          <span>🎨 Finger Paint</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["paint"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActPhonics">
          <span>🔤 Phonics & ABCs</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["phonics"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActPlayground">
          <span>🛝 Playground Fun</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["playground"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActPuzzles">
          <span>🧩 Shape Blocks</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["puzzles"] || 0}/2)</span>
        </button>
      `;
    } else if (age >= 6 && age <= 10) {
      stageTitle = "🎒 Primary School Activities (Grades 1-5)";
      const moneyDone = actionsDone["pocket_money"] >= 1;
      actionsHtml = `
        <button class="btn btn-sm" id="btnActSoccer">
          <span>⚽ Play Tag & Soccer</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["soccer"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActBicycle">
          <span>🚲 Ride Bicycle</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["bicycle"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActBooks">
          <span>📖 Science Books</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["books"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActPocketMoney" ${moneyDone ? 'disabled' : ''}>
          <span>💰 Ask Pocket Money</span>
          <span class="pill-badge emerald" style="font-size: 8px;">⚡15 (${moneyDone ? 'Done' : '1/yr'})</span>
        </button>
      `;
    } else if (age >= 11 && age <= 14) {
      stageTitle = "🏫 Middle School Activities (Grades 6-8)";
      const choresDone = actionsDone["chores"] >= 1;
      actionsHtml = `
        <button class="btn btn-sm" id="btnActTermExam">
          <span>📚 Study for Exams</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["term_exam"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActChessClub">
          <span>♟️ School Chess Club</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["chess_club"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActGaming">
          <span>🎮 Gaming Squad</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["gaming"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActChores" ${choresDone ? 'disabled' : ''}>
          <span>🧹 Household Chores</span>
          <span class="pill-badge emerald" style="font-size: 8px;">⚡25 (${choresDone ? 'Done' : '1/yr'})</span>
        </button>
      `;
    } else if (age >= 15 && age <= 17) {
      stageTitle = "🎓 High School Activities (Boards Prep)";
      const hustleDone = actionsDone["side_hustle"] >= 1;
      actionsHtml = `
        <button class="btn btn-sm" id="btnActBoardPrep">
          <span>📖 Intensive Study</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["board_prep"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActTrack">
          <span>🏃 Varsity Track</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["track"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActSquad">
          <span>☕ Squad Hangout</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡20 (${actionsDone["squad"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnActHustle" ${hustleDone ? 'disabled' : ''}>
          <span>💼 Teen Hustle</span>
          <span class="pill-badge emerald" style="font-size: 8px;">⚡30 (${hustleDone ? 'Done' : '1/yr'})</span>
        </button>
      `;
    } else {
      // Adulthood (18+)
      stageTitle = "💪 Adult Wellness, Academics & High Society";
      actionsHtml = `
        <button class="btn btn-sm" id="btnGym">
          <span>💪 Gym Workout</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["gym"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnStudy">
          <span>📚 Advanced Research</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["study"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnMeditate">
          <span>🧘 Mindfulness</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡20 (${actionsDone["meditate"] || 0}/2)</span>
        </button>
        <button class="btn btn-sm" id="btnSalon">
          <span>✨ Salon & Style ($200)</span>
          <span class="pill-badge purple" style="font-size: 8px;">⚡20 (${actionsDone["salon"] || 0}/2)</span>
        </button>
      `;
    }

    vc.innerHTML = `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>👤</span> Identity & Heritage</div>
          <span class="pill-badge blue">Gen ${G.char.generation}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px; margin-bottom: 12px;">
          <div><span style="color: var(--text-muted);">Birth City:</span> <strong>${G.char.city}, ${c.name} ${c.flag}</strong></div>
          <div><span style="color: var(--text-muted);">Family Tier:</span> <strong>${G.char.familyWealth.replace("_", " ").toUpperCase()}</strong></div>
          <div><span style="color: var(--text-muted);">Credit Score:</span> <strong style="color: var(--accent-emerald);">${G.stats.creditScore ? G.stats.creditScore + ' (FICO)' : 'Age 18+ Locked'}</strong></div>
          <div><span style="color: var(--text-muted);">Prestige:</span> <strong style="color: var(--accent-purple);">${G.stats.prestige}/100</strong></div>
        </div>

        <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: var(--text-secondary);">
          ${stageTitle}
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
          ${actionsHtml}
        </div>
      </div>

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>📜</span> Life Chronicles & Ledger</div>
          <span class="pill-badge">${G.ledger.length} Entries</span>
        </div>
        <div style="max-height: 440px; overflow-y: auto; padding-right: 4px;">
          ${ledgerHtml}
        </div>
      </div>
    `;

    // Bind Stage Action Click Handlers
    if (age <= 2) {
      document.getElementById("btnActCuddle")?.addEventListener("click", () => {
        if (!consumeEnergy(20, "cuddle", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 6);
        G.stats.health = Math.min(100, G.stats.health + 2);
        toast("Cuddled in parents' warm embrace! (+Happiness, +Health)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActRattle")?.addEventListener("click", () => {
        if (!consumeEnergy(20, "rattle", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 5);
        G.stats.smarts = Math.min(100, G.stats.smarts + 2);
        toast("Played with musical rattles and wooden blocks! (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActCrawl")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "crawl", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 5);
        toast("Practiced crawling and standing on toddler legs! (+Health)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActNap")?.addEventListener("click", () => {
        if (G.yearActions.actionsDone["nap"] >= 1) {
          toast("Already took an afternoon nap this year.", "info");
          return;
        }
        G.yearActions.actionsDone["nap"] = 1;
        G.stats.energy = Math.min(100, G.stats.energy + 30);
        toast("Deep peaceful nap restored +30% Energy!", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else if (age >= 3 && age <= 5) {
      document.getElementById("btnActPaint")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "paint", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 6);
        G.stats.looks = Math.min(100, G.stats.looks + 2);
        toast("Made colorful finger paintings! (+Happiness)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActPhonics")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "phonics", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 6);
        toast("Mastered phonics and early alphabet sounds! (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActPlayground")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "playground", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 6);
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast("Slid down the slide and ran in the sandpit! (+Health, +Happy)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActPuzzles")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "puzzles", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 6);
        toast("Solved 3D geometric shape puzzles! (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else if (age >= 6 && age <= 10) {
      document.getElementById("btnActSoccer")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "soccer", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 6);
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast("Scored goals in schoolyard soccer! (+Health, +Happy)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActBicycle")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "bicycle", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 5);
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast("Rode your bicycle around the neighborhood! (+Health)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActBooks")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "books", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 6);
        toast("Read illustrated space and dinosaur encyclopedias! (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActPocketMoney")?.addEventListener("click", () => {
        if (!consumeEnergy(15, "pocket_money", 1)) return;
        let amt = G.char.familyWealth === "billionaire" ? 150 : (G.char.familyWealth === "affluent" ? 60 : 25);
        G.fin.cash += amt;
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast(`Parents gave you $${amt} pocket money allowance!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else if (age >= 11 && age <= 14) {
      document.getElementById("btnActTermExam")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "term_exam", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 6);
        toast("Reviewed algebra and science notes for term exams! (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActChessClub")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "chess_club", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 5);
        G.stats.prestige = Math.min(100, G.stats.prestige + 3);
        toast("Won middle school chess tournament match! (+Smarts, +Prestige)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActGaming")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "gaming", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 8);
        toast("Crushed an online multiplayer session with classmates! (+Happiness)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActChores")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "chores", 1)) return;
        let amt = G.char.familyWealth === "billionaire" ? 300 : (G.char.familyWealth === "affluent" ? 120 : 60);
        G.fin.cash += amt;
        toast(`Completed lawn mowing & chores! Earned $${amt} allowance!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else if (age >= 15 && age <= 17) {
      document.getElementById("btnActBoardPrep")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "board_prep", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 7);
        toast("Solved past 10 years' question papers! (+7 Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActTrack")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "track", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 6);
        G.stats.looks = Math.min(100, G.stats.looks + 3);
        toast("Ran varsity track & conditioning drills! (+Health, +Looks)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActSquad")?.addEventListener("click", () => {
        if (!consumeEnergy(20, "squad", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 7);
        toast("Hung out at the local cafe with your high school squad! (+Happiness)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActHustle")?.addEventListener("click", () => {
        if (!consumeEnergy(30, "side_hustle", 1)) return;
        let amt = 400 + Math.round(G.stats.smarts * 4);
        G.fin.cash += amt;
        toast(`Worked high school tutoring & coding side gig! Earned $${amt}!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else {
      // Adult 18+
      document.getElementById("btnGym")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "gym", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 5);
        G.stats.looks = Math.min(100, G.stats.looks + 3);
        toast("Crushed high-intensity weight training! (+5 Health, +3 Looks)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnStudy")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "study", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 5);
        toast("Deep research into advanced mathematics & markets! (+5 Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnMeditate")?.addEventListener("click", () => {
        if (!consumeEnergy(20, "meditate", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 7);
        toast("Mindfulness meditation cleared mental fog! (+7 Happiness)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnSalon")?.addEventListener("click", () => {
        if (G.fin.cash < 200) { toast("Insufficient cash for styling salon ($200).", "error"); return; }
        if (!consumeEnergy(20, "salon", 2)) return;
        G.fin.cash -= 200;
        G.stats.looks = Math.min(100, G.stats.looks + 6);
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast("High-end salon styling complete! (+6 Looks)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    }
  }

  // ============================================================================
  // HIGH SCHOOL & EDUCATION COCKPIT: 8 FOLDING SUBTABS
  // ============================================================================
  let schoolSubTab = "overview"; // "overview" | "academics" | "people" | "activities" | "career" | "applications" | "family" | "records"

  function initHighSchoolState(G) {
    const defaultAlloc = {
      sleep: 56,
      schoolClasses: 35,
      commute: 7,
      mealsBasicLife: 14,
      homework: 10,
      examCoaching: 0,
      activitiesClubs: 8,
      friendsSocial: 14,
      partTimeWork: 0,
      leisureGaming: 14,
      selfStudy: 10
    };

    G.highSchool = {
      currentTermGPA: 3.82,
      classRankDecile: 5,
      timeAllocation: defaultAlloc,
      activeStudyMethod: "practice_problems",
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
    };

    return G.highSchool;
  }

  function renderHighSchoolCockpit(G) {
    const hs = G.highSchool || initHighSchoolState(G);
    const age = G.char ? G.char.age : 16;
    const birthCountry = G.char ? G.char.birthCountry : "usa";
    const schoolName = birthCountry === "india" 
      ? "Delhi Public School (CBSE)" 
      : (birthCountry === "china" ? "Tsinghua High School" : "Oakridge High School (AP / Honors)");

    return `
      <div class="school-cockpit">
        <!-- Cockpit Header Banner -->
        <div class="card" style="margin-bottom: 10px; background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border: 1px solid #4338ca;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #a5b4fc; font-weight: 700;">
                🎓 ${schoolName}
              </div>
              <h3 style="margin: 2px 0 0 0; font-size: 15px; font-weight: 800; color: #ffffff;">
                Grade ${Math.max(1, Math.min(12, age - 5))} • Term GPA: <span style="color: #38bdf8;">${(hs.currentTermGPA || 3.85).toFixed(2)}</span>
              </h3>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 11px; color: #94a3b8;">Class Rank</div>
              <div style="font-size: 13px; font-weight: 700; color: #34d399;">Top ${hs.classRankDecile || 5}%ile</div>
            </div>
          </div>
        </div>

        <!-- 8-Subtab Horizontal Navigation Strip -->
        <div class="subtabs-bar" style="overflow-x: auto; white-space: nowrap; padding-bottom: 6px; margin-bottom: 12px;">
          <button class="subtab-btn ${schoolSubTab === 'overview' ? 'active' : ''}" data-schooltab="overview">⏱️ Overview</button>
          <button class="subtab-btn ${schoolSubTab === 'academics' ? 'active' : ''}" data-schooltab="academics">📚 Academics</button>
          <button class="subtab-btn ${schoolSubTab === 'people' ? 'active' : ''}" data-schooltab="people">👥 People</button>
          <button class="subtab-btn ${schoolSubTab === 'activities' ? 'active' : ''}" data-schooltab="activities">🏆 Activities</button>
          <button class="subtab-btn ${schoolSubTab === 'career' ? 'active' : ''}" data-schooltab="career">💼 Career</button>
          <button class="subtab-btn ${schoolSubTab === 'applications' ? 'active' : ''}" data-schooltab="applications">🎓 College Prep</button>
          <button class="subtab-btn ${schoolSubTab === 'family' ? 'active' : ''}" data-schooltab="family">👨‍👩‍👦 Family & Aid</button>
          <button class="subtab-btn ${schoolSubTab === 'records' ? 'active' : ''}" data-schooltab="records">📜 Records</button>
        </div>

        <!-- Dynamic Active Subtab Viewport -->
        ${renderActiveSchoolSubtab(schoolSubTab, G, hs)}
      </div>
    `;
  }

  function renderActiveSchoolSubtab(subTab, G, hs) {
    switch (subTab) {
      case "overview": return renderOverviewSubtab(G, hs);
      case "academics": return renderAcademicsSubtab(G, hs);
      case "people": return renderPeopleSubtab(G, hs);
      case "activities": return renderActivitiesSubtab(G, hs);
      case "career": return renderCareerSubtab(G, hs);
      case "applications": return renderApplicationsSubtab(G, hs);
      case "family": return renderFamilySubtab(G, hs);
      case "records": return renderRecordsSubtab(G, hs);
      default: return renderOverviewSubtab(G, hs);
    }
  }

  // 1. OVERVIEW: 168-Hour Resource Budget & Fatigue
  function renderOverviewSubtab(G, hs) {
    const alloc = hs.timeAllocation || {};
    const total = Object.values(alloc).reduce((acc, h) => acc + (Number(h) || 0), 0);
    const free = 168 - total;
    const isBurnout = free < 0;

    return `
      <div class="card" style="margin-bottom: 12px;">
        <div class="card-title-row">
          <div class="card-title">
            <span>⏱️</span> Weekly 168-Hour Resource Budget
          </div>
          <span class="pill-badge ${isBurnout ? 'rose' : 'emerald'}">
            ${isBurnout ? `🚨 Deficit: ${free}h` : `Free: ${free}h / week`}
          </span>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
          Every hour spent on competitive coaching, jobs, or varsity clubs must be carved out of sleep, leisure, or socializing.
        </p>

        ${renderSliderRow("sleep", "😴 Sleep (Rec: 56h)", alloc.sleep || 56, 28, 70)}
        ${renderSliderRow("selfStudy", "📖 Self Study", alloc.selfStudy || 10, 0, 35)}
        ${renderSliderRow("examCoaching", "🎯 Coaching / Mocks", alloc.examCoaching || 0, 0, 25)}
        ${renderSliderRow("activitiesClubs", "🎭 Clubs & Sports", alloc.activitiesClubs || 8, 0, 25)}
        ${renderSliderRow("partTimeWork", "💼 Student Job", alloc.partTimeWork || 0, 0, 25)}
        ${renderSliderRow("friendsSocial", "🎉 Friends & Dating", alloc.friendsSocial || 14, 0, 25)}
        ${renderSliderRow("leisureGaming", "🎮 Gaming / Rest", alloc.leisureGaming || 14, 0, 35)}

        ${isBurnout ? `
          <div style="margin-top: 10px; padding: 8px 12px; background: rgba(244,63,94,0.15); border: 1px solid #f43f5e; border-radius: 8px; font-size: 11px; color: #fecdd3;">
            ⚠️ <strong>Chronic Sleep & Schedule Deficit!</strong> Exceeding 168h triggers cognitive fatigue, drops exam focus, and spikes illness risk.
          </div>
        ` : ''}
      </div>

      <!-- Physiological Status Matrix -->
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🧠</span> Mental Condition & Vigor</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 6px;">
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; font-size: 11px; border: 1px solid var(--border-color);">
            <span style="color: var(--text-secondary);">Sleep Debt:</span> <strong style="color: ${(alloc.sleep || 56) < 49 ? '#f43f5e' : '#34d399'};">${Math.max(0, 56 - (alloc.sleep || 56))}h / wk</strong>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; font-size: 11px; border: 1px solid var(--border-color);">
            <span style="color: var(--text-secondary);">Study Focus:</span> <strong>${G.cognition?.traits?.focus || 70}%</strong>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; font-size: 11px; border: 1px solid var(--border-color);">
            <span style="color: var(--text-secondary);">Exam Temperament:</span> <strong>${G.cognition?.traits?.examTemperament || 65}%</strong>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; font-size: 11px; border: 1px solid var(--border-color);">
            <span style="color: var(--text-secondary);">Burnout Risk:</span> <strong style="color: ${isBurnout ? '#f43f5e' : '#38bdf8'};">${isBurnout ? 'CRITICAL' : 'Minimal'}</strong>
          </div>
        </div>
      </div>
    `;
  }

  function renderSliderRow(key, label, val, min, max) {
    return `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 11px; color: var(--text-secondary); width: 135px;">${label}</span>
        <input type="range" class="slider-alloc" data-key="${key}" min="${min}" max="${max}" value="${val}" style="flex: 1; accent-color: var(--accent-indigo); cursor: pointer;" />
        <span style="font-size: 11px; font-weight: 700; color: #ffffff; width: 35px; text-align: right;">${val}h</span>
      </div>
    `;
  }

  // 2. ACADEMICS: Coursework, Study Methods & Diagnostic Mocks
  function renderAcademicsSubtab(G, hs) {
    const subjects = hs.enrolledSubjects || [];
    const activeMethod = hs.activeStudyMethod || "practice_problems";
    const birthCountry = G.char ? G.char.birthCountry : "usa";
    const examKey = birthCountry === "india" ? "jee_main" : (birthCountry === "china" ? "gaokao" : "sat");

    return `
      <!-- Study Strategy Selector -->
      <div class="card" style="margin-bottom: 12px;">
        <div class="card-title-row">
          <div class="card-title"><span>📖</span> Active Study Strategy</div>
        </div>
        <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; margin-top: 6px;">
          ${Object.values(STUDY_METHODS).map(m => `
            <button class="pill-badge ${activeMethod === m.id ? 'purple' : 'gray'} btn-set-study-method" data-method="${m.id}" style="cursor: pointer; padding: 4px 8px; font-size: 10px;">
              ${m.name}
            </button>
          `).join("")}
        </div>
        <div style="font-size: 10px; color: var(--text-secondary); margin-top: 6px;">
          ${STUDY_METHODS[activeMethod]?.desc || ''} (Eff: ${STUDY_METHODS[activeMethod]?.knowledgeEff}x)
        </div>
      </div>

      <!-- Enrolled Coursework -->
      <div class="card" style="margin-bottom: 12px;">
        <div class="card-title-row">
          <div class="card-title"><span>📚</span> Coursework & Academic Mastery</div>
        </div>
        ${subjects.map(s => `
          <div class="list-row" style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <div class="list-row-left">
              <div class="list-icon-box" style="background: rgba(99, 102, 241, 0.15); color: #818cf8;">${s.icon || '📖'}</div>
              <div class="list-row-text">
                <h4>${s.name}</h4>
                <p>Mastery: ${s.mastery}% • Strictness: ${s.teacherStrictness}%</p>
              </div>
            </div>
            <div class="list-row-right">
              <span class="pill-badge ${s.currentGrade >= 90 ? 'emerald' : (s.currentGrade >= 80 ? 'blue' : 'amber')}">
                ${s.currentGrade}% (${s.letterGrade})
              </span>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Diagnostic Mock Exam Engine -->
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>📝</span> Proctored National Mock Tests</div>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary);">
          Simulate high-stakes examinations against cohorts of up to 12M candidates to discover your Bayesian confidence interval and projected national rank.
        </p>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="btn btn-sm btn-primary btn-run-mock" data-exam="${examKey}">
            Take Proctored ${EXAM_COHORTS[examKey]?.name || 'National'} Mock
          </button>
        </div>
        ${hs.mockResults ? `
          <div style="margin-top: 10px; padding: 10px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); border-radius: 6px; font-size: 11px; line-height: 1.5;">
            ${hs.mockResults.formattedReport}
          </div>
        ` : ''}
      </div>
    `;
  }

  // 3. PEOPLE: Faculty Directory, LoRs & Classmates
  function renderPeopleSubtab(G, hs) {
    const teachers = hs.teachers || [];
    const classmates = hs.classmates || [];

    return `
      <!-- Teachers & Sealed LoRs -->
      <div class="card" style="margin-bottom: 12px;">
        <div class="card-title-row">
          <div class="card-title"><span>👨‍🏫</span> Faculty & Recommendation Letters (LoRs)</div>
        </div>
        ${teachers.map(t => `
          <div class="list-row" style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <div class="list-row-left">
              <div class="list-row-text">
                <h4>${t.name} <span style="font-size: 10px; color: var(--text-secondary);">(${t.subjectName})</span></h4>
                <p>Perception: <strong style="color: #a855f7;">${t.impression?.primaryTag?.toUpperCase()}</strong> • Strictness: ${t.gradingStrictness}%</p>
              </div>
            </div>
            <div class="list-row-right">
              ${t.lor?.submitted ? `
                <span class="pill-badge emerald" title="Confidential LoR filed directly to admissions under FERPA waiver">🔒 Sealed LoR</span>
              ` : `
                <button class="btn btn-sm btn-outline btn-request-lor" data-tid="${t.id}" style="font-size: 10px; padding: 4px 6px;">
                  Request LoR
                </button>
              `}
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Classmates & Study Pacts -->
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>👥</span> Classmate Cohort & Study Alliances</div>
        </div>
        ${classmates.map(c => `
          <div class="list-row" style="padding: 6px 0;">
            <div class="list-row-left">
              <div class="list-row-text">
                <h4>${c.name} <span class="pill-badge gray" style="font-size: 9px;">${c.archetype}</span></h4>
                <p>Friendship: ${c.friendship}% • Smarts: ${c.smarts}</p>
              </div>
            </div>
            <div class="list-row-right">
              <button class="btn btn-sm ${c.isStudyPartner ? 'btn-success' : 'btn-outline'} btn-toggle-study-partner" data-pid="${c.id}" style="font-size: 9px; padding: 3px 6px;">
                ${c.isStudyPartner ? 'Pact Active ✓' : 'Form Pact'}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 4. ACTIVITIES: Clubs & Interscholastic Tournaments
  function renderActivitiesSubtab(G, hs) {
    const clubs = hs.clubs || [];

    return `
      <div class="card" style="margin-bottom: 12px;">
        <div class="card-title-row">
          <div class="card-title"><span>🏆</span> Extracurricular Squads & Competitions</div>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">
          Compete against simulated rival academies across 5 tournament tiers (School ➔ District ➔ State ➔ National ➔ World).
        </p>
        ${clubs.map(c => `
          <div class="list-row" style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <div class="list-row-left">
              <div class="list-icon-box" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">${c.icon}</div>
              <div class="list-row-text">
                <h4>${c.name}</h4>
                <p>Role: <strong>${c.role}</strong> • Coach Quality: ${c.coachQuality}%</p>
              </div>
            </div>
            <div class="list-row-right">
              <button class="btn btn-sm btn-primary btn-club-match" data-cid="${c.id}" style="font-size: 10px; padding: 4px 8px;">
                Compete
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 5. CAREER: Student Employment & Internships
  function renderCareerSubtab(G, hs) {
    const age = G.char ? G.char.age : 16;
    const jobs = STUDENT_JOBS_CATALOG.filter(j => age >= j.minAge && age <= j.maxAge);
    const activeJob = hs.activeJob;

    return `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>💼</span> Student Jobs & Part-Time Employment</div>
          ${activeJob ? `<span class="pill-badge emerald">Employed</span>` : ''}
        </div>
        ${activeJob ? `
          <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); padding: 10px; border-radius: 8px; margin-bottom: 12px;">
            <h4 style="margin: 0 0 4px 0; font-size: 13px; color: #38bdf8;">${activeJob.title}</h4>
            <p style="font-size: 11px; color: var(--text-secondary); margin: 0;">
              Wage: $${activeJob.baseHourlyUSD}/hr • Scheduled: ${hs.timeAllocation?.partTimeWork || 0}h/week
            </p>
            <button class="btn btn-sm btn-outline btn-quit-job" style="margin-top: 8px; color: #f43f5e; border-color: #f43f5e;">
              Quit Job
            </button>
          </div>
        ` : ''}

        <div style="font-size: 11px; font-weight: 700; color: #cbd5e1; margin-bottom: 6px;">Available Openings (Age ${age})</div>
        ${jobs.length === 0 ? `<p style="font-size: 11px; color: var(--text-secondary);">No student openings available at your current age.</p>` : ''}
        ${jobs.map(j => `
          <div class="list-row" style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
            <div class="list-row-left">
              <div class="list-row-text">
                <h4>${j.title}</h4>
                <p>$${j.baseHourlyUSD}/hr • Max ${j.weeklyHoursMax}h/wk</p>
              </div>
            </div>
            <div class="list-row-right">
              <button class="btn btn-sm btn-primary btn-apply-job" data-jid="${j.id}" style="font-size: 10px;">
                Apply
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 6. APPLICATIONS: Multi-Draft Essay Studio & College Admissions
  function renderApplicationsSubtab(G, hs) {
    const essay = hs.activeEssay || { title: "Common App Personal Statement", draftStage: 1, polish: 45, authenticity: 85 };

    return `
      <!-- Multi-Draft Essay Studio -->
      <div class="card" style="margin-bottom: 12px;">
        <div class="card-title-row">
          <div class="card-title"><span>✍️</span> Multi-Draft Admissions Essay Studio</div>
          <span class="pill-badge purple">Draft ${essay.draftStage}/4</span>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">
          Balance technical polish with raw personal authenticity. Private consultants increase polish but risk over-sanitizing authenticity!
        </p>
        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px;">
          <span>Polish: <strong style="color: #38bdf8;">${essay.polish}%</strong></span>
          <span>Authenticity: <strong style="color: #34d399;">${essay.authenticity}%</strong></span>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <button class="btn btn-sm btn-outline btn-revise-essay" data-reviewer="self">Self-Edit (+8 Polish)</button>
          <button class="btn btn-sm btn-primary btn-revise-essay" data-reviewer="teacher">Ask Teacher (+14 Polish)</button>
          <button class="btn btn-sm btn-outline btn-revise-essay" data-reviewer="consultant" style="color: #fbbf24; border-color: #fbbf24;">Consultant ($500)</button>
        </div>
      </div>

      <!-- Target University Admissions Launchpad -->
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏛️</span> Target University Applications</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div class="list-row">
            <div class="list-row-left">
              <div class="list-row-text">
                <h4>Stanford / Harvard / MIT</h4>
                <p>US Dual-Reader Holistic Admissions Committee</p>
              </div>
            </div>
            <div class="list-row-right">
              <button class="btn btn-sm btn-primary btn-submit-college-app" data-uni="stanford">Submit Dossier</button>
            </div>
          </div>
          <div class="list-row">
            <div class="list-row-left">
              <div class="list-row-text">
                <h4>IIT Bombay / IIT Delhi</h4>
                <p>Joint Seat Allocation Authority (JoSAA Cutoffs)</p>
              </div>
            </div>
            <div class="list-row-right">
              <button class="btn btn-sm btn-primary btn-submit-college-app" data-uni="iit_bombay">Counseling</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 7. FAMILY: Household Economy & 'Who Pays?' Negotiations
  function renderFamilySubtab(G, hs) {
    const fam = hs.familyEconomy || { disposableCashUSD: 6200, father: { generosity: 65, academicExpectations: 75 } };

    return `
      <div class="card" style="margin-bottom: 12px;">
        <div class="card-title-row">
          <div class="card-title"><span>👨‍👩‍👦</span> Household Finances & Generosity</div>
        </div>
        <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">
          As a student, major capital requests must be pitched to parents. They evaluate disposable cash, generosity, and your term GPA.
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; font-size: 11px; border: 1px solid var(--border-color);">
            <span style="color: var(--text-secondary);">Disposable Cash:</span> <strong>$${(fam.disposableCashUSD || 5000).toLocaleString()}</strong>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; font-size: 11px; border: 1px solid var(--border-color);">
            <span style="color: var(--text-secondary);">Academic Expectation:</span> <strong>${fam.father?.academicExpectations || 75}%</strong>
          </div>
        </div>

        <div style="font-size: 11px; font-weight: 700; color: #cbd5e1; margin-bottom: 6px;">Request Educational Sponsorship</div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <button class="btn btn-sm btn-outline btn-ask-parents-pay" data-item="sat_coaching">
            Ask to Fund National Coaching ($1,500)
          </button>
          <button class="btn btn-sm btn-outline btn-ask-parents-pay" data-item="laptop_coding">
            Ask to Buy Coding Workstation ($1,200)
          </button>
          <button class="btn btn-sm btn-outline btn-ask-parents-pay" data-item="college_tuition">
            Ask to Fund University Tuition ($15,000)
          </button>
        </div>
      </div>
    `;
  }

  // 8. RECORDS: Transcripts & Awards
  function renderRecordsSubtab(G, hs) {
    const awards = hs.awards || ["State Debate Championship Quarterfinalist", "High Honor Roll (Term 1)"];

    return `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>📜</span> Official Academic Transcript & Awards</div>
        </div>
        <div style="margin-bottom: 12px;">
          <h4 style="font-size: 12px; color: #a5b4fc; margin-bottom: 4px;">Verified Honors & Credentials</h4>
          ${awards.map(a => `
            <div style="font-size: 11px; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #cbd5e1;">
              🎖️ ${a}
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Attach Event Listeners to School Cockpit UI
  function attachSchoolCockpitListeners(G, renderCallback) {
    // 1. Subtab Switching
    document.querySelectorAll("[data-schooltab]").forEach(btn => {
      btn.addEventListener("click", () => {
        schoolSubTab = btn.dataset.schooltab;
        renderCallback();
      });
    });

    // 2. Time Allocator Sliders
    document.querySelectorAll(".slider-alloc").forEach(input => {
      input.addEventListener("input", (e) => {
        const key = e.target.dataset.key;
        const val = parseInt(e.target.value, 10);
        if (G.highSchool && G.highSchool.timeAllocation) {
          G.highSchool.timeAllocation[key] = val;
          renderCallback();
        }
      });
    });

    // 3. Study Strategy Setter
    document.querySelectorAll(".btn-set-study-method").forEach(btn => {
      btn.addEventListener("click", () => {
        if (G.highSchool) {
          G.highSchool.activeStudyMethod = btn.dataset.method;
          toast(`Switched study strategy to ${STUDY_METHODS[btn.dataset.method]?.name}!`, "info");
          renderCallback();
        }
      });
    });

    // 4. Proctored Mock Exam
    document.querySelectorAll(".btn-run-mock").forEach(btn => {
      btn.addEventListener("click", () => {
        const examKey = btn.dataset.exam;
        const mockResult = runProctoredMockExam(G.char, examKey, 1);
        G.highSchool.mockResults = mockResult;
        toast(`Completed mock test: ${mockResult.formattedReport}`, "celebrate");
        renderCallback();
      });
    });

    // 5. LoR Requests
    document.querySelectorAll(".btn-request-lor").forEach(btn => {
      btn.addEventListener("click", () => {
        const tid = btn.dataset.tid;
        const teacher = G.highSchool?.teachers?.find(t => t.id === tid);
        if (teacher) {
          const lor = generateRecommendationLetter(teacher, G.char?.firstName || "Student");
          teacher.lor = lor;
          modal("Recommendation Request Outcome", `
            <p style="font-size: 13px; font-style: italic; color: #cbd5e1; margin-bottom: 12px;">
              ${lor.verbalResponse}
            </p>
            <div style="padding: 8px; background: rgba(16, 185, 129, 0.15); border: 1px dashed #10b981; border-radius: 8px; font-size: 11px; color: #a7f3d0;">
              🔒 <strong>Confidential Letter Submitted:</strong> Under FERPA rules, this document is sealed directly to your college admissions portal.
            </div>
          `);
          renderCallback();
        }
      });
    });

    // 6. Club Tournament Matches
    document.querySelectorAll(".btn-club-match").forEach(btn => {
      btn.addEventListener("click", () => {
        const cid = btn.dataset.cid;
        const club = G.highSchool?.clubs?.find(c => c.id === cid);
        if (club) {
          const result = resolveClubMatch(club, G.stats, "state");
          modal(`${club.name} Tournament Result`, `
            <div style="text-align: center; margin-bottom: 12px;">
              <div style="font-size: 28px;">${result.victory ? '🏆' : '🥈'}</div>
              <h3 style="margin: 4px 0; color: ${result.victory ? '#34d399' : '#f43f5e'};">
                ${result.victory ? 'VICTORY!' : 'DEFEAT'}
              </h3>
              <p style="font-size: 12px; color: #94a3b8;">
                Your Squad: <strong>${result.playerScore} pts</strong> vs ${result.opponentName}: <strong>${result.opponentScore} pts</strong>
              </p>
            </div>
          `);
          if (result.victory) {
            G.stats.prestige = Math.min(100, (G.stats.prestige || 50) + 3);
          }
          renderCallback();
        }
      });
    });

    // 7. Multi-Draft Essay Revision
    document.querySelectorAll(".btn-revise-essay").forEach(btn => {
      btn.addEventListener("click", () => {
        const reviewer = btn.dataset.reviewer;
        if (reviewer === "consultant" && (G.fin?.cash || 0) < 500) {
          toast("Requires $500 cash to hire private consultant!", "error");
          return;
        }
        if (reviewer === "consultant") G.fin.cash -= 500;

        G.highSchool.activeEssay = iterateEssay(G.highSchool.activeEssay, reviewer);
        toast(`Revised essay draft (Draft ${G.highSchool.activeEssay.draftStage}/4)!`, "celebrate");
        renderCallback();
      });
    });

    // 8. Ask Parents to Pay
    document.querySelectorAll(".btn-ask-parents-pay").forEach(btn => {
      btn.addEventListener("click", () => {
        const itemKey = btn.dataset.item;
        const expenseMap = {
          sat_coaching: { name: "National Exam Coaching", costUSD: 1500 },
          laptop_coding: { name: "Coding Workstation Laptop", costUSD: 1200 },
          college_tuition: { name: "University Tuition", costUSD: 15000 }
        };
        const exp = expenseMap[itemKey];
        const outcome = evaluateParentNegotiation(G.highSchool.familyEconomy, exp.name, exp.costUSD, G.highSchool.currentTermGPA);

        modal(`Parental Response: ${exp.name}`, `
          <p style="font-size: 13px; font-style: italic; color: #cbd5e1; margin-bottom: 12px;">
            ${outcome.quote}
          </p>
          <div style="padding: 8px; background: rgba(56, 189, 248, 0.15); border-radius: 8px; font-size: 11px; color: #bae6fd;">
            Outcome: <strong>${outcome.verdict}</strong> (Parents pay ${outcome.parentPct}%)
          </div>
        `);
        renderCallback();
      });
    });

    // 9. Student Job Apply & Quit
    document.querySelectorAll(".btn-apply-job").forEach(btn => {
      btn.addEventListener("click", () => {
        const jid = btn.dataset.jid;
        const job = STUDENT_JOBS_CATALOG.find(j => j.id === jid);
        if (job && G.highSchool) {
          G.highSchool.activeJob = job;
          G.highSchool.timeAllocation.partTimeWork = Math.min(12, job.weeklyHoursMax || 10);
          toast(`Hired as ${job.title} at $${job.baseHourlyUSD}/hr!`, "celebrate");
          renderCallback();
        }
      });
    });

    document.querySelectorAll(".btn-quit-job").forEach(btn => {
      btn.addEventListener("click", () => {
        if (G.highSchool) {
          G.highSchool.activeJob = null;
          G.highSchool.timeAllocation.partTimeWork = 0;
          toast("Resigned from student job.", "info");
          renderCallback();
        }
      });
    });

    // 10. Study Partner Toggle
    document.querySelectorAll(".btn-toggle-study-partner").forEach(btn => {
      btn.addEventListener("click", () => {
        const pid = btn.dataset.pid;
        const classmate = G.highSchool?.classmates?.find(p => p.id === pid);
        if (classmate) {
          classmate.isStudyPartner = !classmate.isStudyPartner;
          toast(classmate.isStudyPartner ? `Formed study pact with ${classmate.name}!` : `Ended study pact with ${classmate.name}.`, "info");
          renderCallback();
        }
      });
    });

    // 11. Target University Admissions
    document.querySelectorAll(".btn-submit-college-app").forEach(btn => {
      btn.addEventListener("click", () => {
        const uniKey = btn.dataset.uni;
        if (uniKey === "stanford") {
          const applicant = {
            gpaWeighted: ((G.highSchool?.currentTermGPA || 3.8) / 4.0) * 4.8,
            satScore: G.edu?.examScores?.sat || 1480,
            rigorIndex: 0.88,
            ecTier: 2,
            hasSpike: true,
            lorScore: 88,
            essayDrafts: G.highSchool?.activeEssay?.draftStage || 2,
            isFirstGen: false
          };
          const res = evaluateUSAdmissionsDossier(applicant, { tier: 1 });
          let badgeColor = res.decision === "ADMIT" ? "#10b981" : (res.decision === "WAITLIST" ? "#f59e0b" : "#ef4444");
          modal("Stanford Admissions Committee Dossier Outcome", `
            <div style="text-align: center; margin-bottom: 14px;">
              <div style="font-size: 32px;">${res.decision === 'ADMIT' ? '🌲🎓' : (res.decision === 'WAITLIST' ? '⏳' : '📜')}</div>
              <h3 style="margin: 6px 0; color: ${badgeColor}; font-size: 18px; font-weight: 800;">DECISION: ${res.decision}</h3>
              <p style="font-size: 12px; color: #94a3b8;">Holistic Dual-Reader Admissions Committee Review</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 12px; border-radius: 8px; font-size: 11px; line-height: 1.6; margin-bottom: 12px;">
              <div>Reader 1 (Admissions Officer): <strong>${res.reader1} / 6.0</strong></div>
              <div>Reader 2 (Faculty Reader): <strong>${res.reader2} / 6.0</strong></div>
              <div>Committee Composite: <strong>${res.compositeScore}</strong> (Admit cutoff: &le; 1.85)</div>
            </div>
            ${res.decision === 'ADMIT' ? `
              <div style="padding: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; font-size: 12px; color: #a7f3d0; margin-bottom: 12px;">
                🎉 <strong>Congratulations!</strong> You have been offered admission to Stanford University Class of 2028!
              </div>
              <button class="btn btn-emerald btn-full btn-matriculate-uni" data-name="Stanford University" data-tuition="58000" data-prestige="98">
                Accept Offer & Matriculate ($58,000 / yr)
              </button>
            ` : `
              <p style="font-size: 11px; color: #94a3b8;">Our admissions committee faced the most competitive applicant pool in history, with over 55,000 candidates for 2,000 seats.</p>
            `}
          `);
          document.querySelector(".btn-matriculate-uni")?.addEventListener("click", (e) => {
            const mBtn = e.currentTarget;
            G.edu.currentUni = {
              name: mBtn.dataset.name,
              major: "Computer Science",
              year: 1,
              totalYears: 4,
              tuition: parseInt(mBtn.dataset.tuition, 10),
              prestige: parseInt(mBtn.dataset.prestige, 10)
            };
            G.edu.stage = "University (Yr 1)";
            closeModal();
            toast(`Matriculated into ${mBtn.dataset.name}!`, "celebrate");
            renderCallback();
          });
        } else if (uniKey === "iit_bombay") {
          const jeeScore = G.edu?.examScores?.jee || 0;
          const passed = jeeScore >= 98.5;
          modal("IIT Bombay Joint Seat Allocation (JoSAA)", `
            <div style="text-align: center; margin-bottom: 14px;">
              <div style="font-size: 32px;">${passed ? '🇮🇳🏛️' : '📚'}</div>
              <h3 style="margin: 6px 0; color: ${passed ? '#10b981' : '#ef4444'}; font-size: 18px; font-weight: 800;">
                ${passed ? 'SEAT ALLOCATED: Computer Science & Eng.' : 'RANK CUTOFF NOT MET'}
              </h3>
              <p style="font-size: 12px; color: #94a3b8;">JEE Advanced Common Rank List (CRL)</p>
            </div>
            <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 12px; border-radius: 8px; font-size: 11px; line-height: 1.6; margin-bottom: 12px;">
              <div>Your JEE Standing: <strong>${jeeScore > 0 ? jeeScore + '%ile' : 'No JEE Score Recorded'}</strong></div>
              <div>IIT Bombay CSE Cutoff: <strong>99.85 %ile (CRL Rank &le; 65)</strong></div>
              <div>IIT Bombay Mechanical / Elec Cutoff: <strong>98.50 %ile (CRL Rank &le; 1,200)</strong></div>
            </div>
            ${passed ? `
              <div style="padding: 10px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; font-size: 12px; color: #a7f3d0; margin-bottom: 12px;">
                🇮🇳 <strong>Seat Confirmed:</strong> You have been allotted B.Tech in CSE at Indian Institute of Technology Bombay!
              </div>
              <button class="btn btn-emerald btn-full btn-matriculate-uni" data-name="IIT Bombay" data-tuition="2800" data-prestige="96">
                Accept JoSAA Allocation (₹2.2 Lakh / yr)
              </button>
            ` : `
              <p style="font-size: 11px; color: #94a3b8;">Take JEE Main and prepare with mock tests to improve your cohort percentile rank.</p>
            `}
          `);
          document.querySelector(".btn-matriculate-uni")?.addEventListener("click", (e) => {
            const mBtn = e.currentTarget;
            G.edu.currentUni = {
              name: mBtn.dataset.name,
              major: "Computer Science",
              year: 1,
              totalYears: 4,
              tuition: parseInt(mBtn.dataset.tuition, 10),
              prestige: parseInt(mBtn.dataset.prestige, 10)
            };
            G.edu.stage = "University (Yr 1)";
            closeModal();
            toast(`Matriculated into ${mBtn.dataset.name}!`, "celebrate");
            renderCallback();
          });
        }
      });
    });
  }

  // TAB 2: EDUCATION, EXAMS & CAREER
  let eduViewSub = "school"; // "school", "corporate", "special"
  function renderEducationCareerTab(vc) {
    const c = COUNTRIES[G.char.birthCountry] || COUNTRIES.india;
    const hasDegree = G.edu.degrees.length > 0;

    vc.innerHTML = `
      <div class="subtabs-bar">
        <button class="subtab-btn ${eduViewSub === 'school' ? 'active' : ''}" id="subtabSchool">🎓 School & Exams</button>
        <button class="subtab-btn ${eduViewSub === 'corporate' ? 'active' : ''}" id="subtabCorp">💼 Corporate Ladders</button>
        <button class="subtab-btn ${eduViewSub === 'special' ? 'active' : ''}" id="subtabSpec">✨ Special Careers</button>
      </div>

      ${eduViewSub === 'school' ? (G.char.age <= 22 ? renderHighSchoolCockpit(G) : renderSchoolSubview(c, hasDegree)) : ''}
      ${eduViewSub === 'corporate' ? renderCorpSubview() : ''}
      ${eduViewSub === 'special' ? renderSpecialSubview() : ''}
    `;

    document.getElementById("subtabSchool")?.addEventListener("click", () => { eduViewSub = "school"; renderCurrentTab(); });
    document.getElementById("subtabCorp")?.addEventListener("click", () => { eduViewSub = "corporate"; renderCurrentTab(); });
    document.getElementById("subtabSpec")?.addEventListener("click", () => { eduViewSub = "special"; renderCurrentTab(); });

    if (eduViewSub === 'school' && G.char.age <= 22) {
      attachSchoolCockpitListeners(G, renderCurrentTab);
    }
    bindEduEvents(c, hasDegree);
  }

  function renderSchoolSubview(c, hasDegree) {
    const age = G.char.age;
    const stream = G.childhood.streamChoice;

    return `
      <!-- Academic Standing -->
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏫</span> Academic Standing</div>
          <span class="pill-badge emerald">${G.edu.currentUni ? `University (Yr ${G.edu.currentUni.year})` : G.edu.stage}</span>
        </div>
        <div style="font-size: 12px; line-height: 1.5; margin-bottom: 8px;">
          ${G.edu.currentUni ? `
            <div>University: <strong>${G.edu.currentUni.name}</strong></div>
            <div>Degree: <strong>${G.edu.currentUni.major}</strong> (Year ${G.edu.currentUni.year} of ${G.edu.currentUni.totalYears})</div>
          ` : `
            <div>Curriculum: <strong>${c.name} Academic Framework</strong></div>
            ${G.childhood.preschoolChoice ? `<div>Preschool: <strong>${G.childhood.preschoolChoice}</strong></div>` : ''}
            ${G.childhood.primaryHobby ? `<div>Childhood Passion: <strong>${G.childhood.primaryHobby}</strong></div>` : ''}
            ${G.childhood.class10Score ? `<div>Class 10 Board Score: <strong>${G.childhood.class10Score}%</strong></div>` : ''}
            ${G.childhood.streamChoice ? `<div>Senior Secondary Stream: <strong>${G.childhood.streamChoice.toUpperCase()}</strong></div>` : ''}
            ${G.childhood.coachingChoice ? `<div>Coaching Institute: <strong>${G.childhood.coachingChoice}</strong></div>` : ''}
            ${G.childhood.class12Score ? `<div>Class 12 Board Score: <strong>${G.childhood.class12Score}%</strong></div>` : ''}
          `}
          ${G.edu.degrees.length > 0 ? `
            <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid var(--border-color);">
              <span style="color: var(--accent-emerald); font-weight: 700;">Conferred Degrees:</span>
              ${G.edu.degrees.map(d => `<div style="font-weight: 600;">🎓 ${d.title} — ${d.uni}</div>`).join("")}
            </div>
          ` : ''}
        </div>
      </div>

      <!-- HIGH SCHOOL ENTRANCE EXAMS (Class 12 / Age 17+) -->
      ${age >= 16 ? `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>✍️</span> Senior Secondary Entrance Exams (Class 12)</div>
          </div>
          <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">
            National competitive entrance examinations taken during or after Class 12 for undergraduate admissions.
          </p>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <!-- JEE -->
            <div class="list-row">
              <div>
                <h4>JEE Main & Advanced</h4>
                <p>For IIT Bombay, IIT Delhi & BITS. <strong>Requires PCM Stream</strong>.</p>
              </div>
              ${G.edu.examScores.jee ? `<span class="pill-badge emerald">${G.edu.examScores.jee}%ile</span>` : `
                <button class="btn btn-sm btn-primary btn-take-exam" data-exam="jee" ${stream !== 'pcm' ? 'disabled title="Requires Science PCM Stream"' : ''}>
                  ${stream === 'pcm' ? 'Take JEE ($40)' : 'Locked (PCM Stream Only)'}
                </button>
              `}
            </div>

            <!-- NEET -->
            <div class="list-row">
              <div>
                <h4>NEET UG</h4>
                <p>For AIIMS New Delhi & Top Medical Colleges. <strong>Requires PCB Stream</strong>.</p>
              </div>
              ${G.edu.examScores.neet ? `<span class="pill-badge emerald">${G.edu.examScores.neet}/720</span>` : `
                <button class="btn btn-sm btn-primary btn-take-exam" data-exam="neet" ${stream !== 'pcb' ? 'disabled title="Requires Science PCB Stream"' : ''}>
                  ${stream === 'pcb' ? 'Take NEET ($30)' : 'Locked (PCB Stream Only)'}
                </button>
              `}
            </div>

            <!-- SAT -->
            <div class="list-row">
              <div>
                <h4>SAT Reasoning Test</h4>
                <p>Scored out of 1600. Benchmark for US Ivies, Stanford, MIT, Oxford.</p>
              </div>
              ${G.edu.examScores.sat ? `<span class="pill-badge emerald">${G.edu.examScores.sat}/1600</span>` : `
                <button class="btn btn-sm btn-primary btn-take-exam" data-exam="sat">Take SAT ($110)</button>
              `}
            </div>
          </div>
        </div>
      ` : `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>✍️</span> High School Entrance Exams</div>
          </div>
          <p style="font-size: 11px; color: var(--text-secondary);">
            National competitive examinations (JEE for Engineering, NEET for Medical, SAT for Abroad) unlock in Class 12 (Age 17+). Currently focus on school foundations!
          </p>
        </div>
      `}

      <!-- POST-GRADUATION COMPETITIVE EXAMS (STRICTLY AGE 21+ & BACHELOR'S DEGREE REQUIRED) -->
      <div class="card" style="border-left: 3px solid var(--accent-purple);">
        <div class="card-title-row">
          <div class="card-title"><span>🏛️</span> Post-Graduation Competitive Exams (After Degree)</div>
          ${hasDegree && age >= 21 ? `<span class="pill-badge emerald">Eligible</span>` : `<span class="pill-badge amber">Locked</span>`}
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">
          Strictly requires an undergraduate Bachelor's Degree and minimum Age 21!
        </p>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <!-- UPSC -->
          <div class="list-row">
            <div>
              <h4>UPSC Civil Services Examination (IAS / IPS)</h4>
              <p>Prelims ➔ Mains (9 Papers) ➔ Dholpur House Interview. Appoints IAS officers.</p>
            </div>
            ${G.edu.examScores.upsc ? `<span class="pill-badge purple">${G.edu.examScores.upsc}</span>` : `
              <button class="btn btn-sm ${hasDegree && age >= 21 ? 'btn-primary' : ''} btn-take-exam" data-exam="upsc" ${!hasDegree || age < 21 ? 'disabled title="Requires Bachelor Degree & Age 21+"' : ''}>
                ${hasDegree && age >= 21 ? 'Attempt UPSC (IAS)' : 'Locked (Degree & Age 21+)'}
              </button>
            `}
          </div>

          <!-- CAT -->
          <div class="list-row">
            <div>
              <h4>CAT (Common Admission Test)</h4>
              <p>Premier post-graduate entrance exam for MBA at IIM Ahmedabad & Bangalore.</p>
            </div>
            ${G.edu.examScores.cat ? `<span class="pill-badge emerald">${G.edu.examScores.cat}%ile</span>` : `
              <button class="btn btn-sm ${hasDegree && age >= 21 ? 'btn-primary' : ''} btn-take-exam" data-exam="cat" ${!hasDegree || age < 21 ? 'disabled title="Requires Bachelor Degree & Age 21+"' : ''}>
                ${hasDegree && age >= 21 ? 'Take CAT ($35)' : 'Locked (Degree & Age 21+)'}
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- University Admissions (Domestic & Abroad) -->
      ${age >= 17 ? `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>🌍</span> Premier World Universities</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${(c.undergradColleges || []).concat(COUNTRIES.usa.undergradColleges.slice(0, 3)).map(u => `
              <div class="list-row">
                <div>
                  <h4>${u.name}</h4>
                  <p>Prestige: ${u.prestige}/100 • $${u.tuitionUSD.toLocaleString()}/yr • Exam: ${u.examReq ? u.examReq.toUpperCase() : 'Merit'}</p>
                </div>
                <button class="btn btn-sm btn-primary btn-apply-uni" data-uni="${u.id}">Apply</button>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ''}
    `;
  }

  function renderCorpSubview() {
    const j = G.career.job;
    const age = G.char.age;
    const actionsDone = G.yearActions.actionsDone || {};

    if (age < 18) {
      return `
        <div class="childhood-lock-box">
          <div class="childhood-lock-icon">💼</div>
          <div class="childhood-lock-title">Corporate Workforce Restricted (Age 18+)</div>
          <div class="childhood-lock-desc">
            Labor statutes restrict corporate employment contracts to adults (Age 18+).<br>
            Current Age: <strong>${age}</strong>. Focus on graduating high school and earning an undergraduate university degree!
          </div>
        </div>
      `;
    }

    return `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>💼</span> Current Corporate Position</div>
          ${j ? `<span class="pill-badge emerald">${j.title}</span>` : `<span class="pill-badge">Unemployed</span>`}
        </div>
        ${j ? `
          <div style="font-size: 12px; margin-bottom: 8px;">
            <div>Base Salary: <strong>$${j.baseSalary.toLocaleString()}</strong> | Bonus: <strong>${Math.round(j.bonusPct * 100)}%</strong></div>
            <div>Annual RSU Grants: <strong>$${j.stockUSD.toLocaleString()}</strong></div>
            <div>Lifetime Career Earnings: <strong>$${G.career.lifetimeEarnings.toLocaleString()}</strong></div>
          </div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button class="btn btn-sm btn-primary" id="btnWorkOvertime">
              <span>⏰ Work Overtime</span>
              <span class="pill-badge purple" style="font-size: 8px;">⚡25 (${actionsDone["overtime"] || 0}/1)</span>
            </button>
            <button class="btn btn-sm btn-primary" id="btnExecNetworking">
              <span>🤝 Exec Networking</span>
              <span class="pill-badge purple" style="font-size: 8px;">⚡20 (${actionsDone["networking"] || 0}/1)</span>
            </button>
            <button class="btn btn-sm" id="btnResign" style="color: var(--accent-rose);">Resign</button>
          </div>
        ` : `
          <p style="font-size: 11px; color: var(--text-secondary);">You are currently not employed. Browse career openings below.</p>
        `}
      </div>

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏢</span> Corporate Career Tracks</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${CAREER_TRACKS.map(t => {
            const entry = t.ladder[0];
            const hasReqDegree = !t.requiredDegrees || t.requiredDegrees.includes("*") || G.edu.degrees.some(d => t.requiredDegrees.includes(d.major));
            const hasSmarts = G.stats.smarts >= (t.minSmarts || 0);
            const isEligible = hasReqDegree && hasSmarts;

            return `
              <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 16px;">${t.icon}</span>
                    <div>
                      <h4 style="font-size: 12px;">${t.name}</h4>
                      <p style="font-size: 10px;">Entry: ${entry.title} • $${entry.baseSalaryUSD.toLocaleString()}/yr</p>
                    </div>
                  </div>
                  <button class="btn btn-sm ${isEligible ? 'btn-primary' : ''} btn-apply-job" data-track="${t.id}">
                    Apply
                  </button>
                </div>
                <p style="font-size: 9px; color: var(--text-secondary);">
                  Required Degrees: ${t.requiredDegrees ? t.requiredDegrees.join(", ") : "Any"} • Min Smarts: ${t.minSmarts || 0}
                </p>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderSpecialSubview() {
    const age = G.char.age;
    if (age < 16) {
      return `
        <div class="childhood-lock-box">
          <div class="childhood-lock-icon">✨</div>
          <div class="childhood-lock-title">Special Careers Restricted (Age 16+)</div>
          <div class="childhood-lock-desc">
            Talent agency representation and commercial publishing contracts require minimum Age 16.<br>
            Current Age: <strong>${age}</strong>. Focus on school and childhood hobbies!
          </div>
        </div>
      `;
    }

    const released = G.yearActions.specialRelease;

    return `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🌟</span> Special Skill-Based Careers</div>
          ${released ? `<span class="pill-badge amber">Released This Year</span>` : `<span class="pill-badge emerald">Ready</span>`}
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">
          Produce commercial creative works, viral media, or athletic contracts. Each project consumes 30 Energy and is limited to 1 launch per year.
        </p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div class="list-row">
            <div>
              <h4>🎮 Indie Game Developer</h4>
              <p>Code & ship on Steam ($100 fee). Earn royalties.</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnSpecialIndie" ${released ? 'disabled' : ''}>Ship Game (⚡30)</button>
          </div>
          <div class="list-row">
            <div>
              <h4>📹 Content Creator / YouTuber</h4>
              <p>Upload video to algorithm. Earn AdSense revenue.</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnSpecialCreator" ${released ? 'disabled' : ''}>Publish Video (⚡30)</button>
          </div>
          <div class="list-row">
            <div>
              <h4>👠 Runway Fashion Model</h4>
              <p>Paris/Milan fashion week runway (Requires 70+ Looks).</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnSpecialModel" ${released ? 'disabled' : ''}>Walk Runway (⚡30)</button>
          </div>
          <div class="list-row">
            <div>
              <h4>🎵 Music Artist / Producer</h4>
              <p>Drop a studio single on Spotify & Apple Music.</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnSpecialMusician" ${released ? 'disabled' : ''}>Drop Single (⚡30)</button>
          </div>
          <div class="list-row">
            <div>
              <h4>🏆 Professional Athlete</h4>
              <p>Sign sports championship franchise contract.</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnSpecialAthlete" ${released ? 'disabled' : ''}>Sign Deal (⚡30)</button>
          </div>
          <div class="list-row">
            <div>
              <h4>📖 Novelist / Author</h4>
              <p>Publish literary novel for publishing advances.</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnSpecialAuthor" ${released ? 'disabled' : ''}>Publish Book (⚡30)</button>
          </div>
        </div>
      </div>
    `;
  }

  function bindEduEvents(c, hasDegree) {
    // Exam attempts
    document.querySelectorAll(".btn-take-exam").forEach(btn => {
      btn.addEventListener("click", () => {
        const exKey = btn.dataset.exam;
        const ex = ENTRANCE_EXAMS[exKey];
        if (!ex) return;

        if (exKey === "jee") {
          if (G.childhood.streamChoice !== "pcm") {
            toast("JEE strictly requires the Science PCM (Physics, Chemistry, Math) stream!", "error");
            return;
          }
          if (G.char.age < 16) {
            toast("JEE is taken during or after Class 12 (Age 17+)!", "error");
            return;
          }
          if (G.fin.cash < ex.costUSD) { toast("Insufficient cash for exam fee ($40).", "error"); return; }
          G.fin.cash -= ex.costUSD;
          const coachingBoost = G.childhood.coachingChoice?.includes("Kota") ? 4.0 : 0;
          const pct = Math.min(99.98, Math.round((72 + (G.stats.smarts / 100) * 27 + coachingBoost + (Math.random() * 0.8)) * 100) / 100);
          G.edu.examScores.jee = pct;
          toast(`JEE Advanced Result: ${pct}%ile! ${pct >= 95 ? 'Eligible for IIT Bombay / Delhi!' : 'Eligible for NITs.'}`, "celebrate");
        } else if (exKey === "neet") {
          if (G.childhood.streamChoice !== "pcb") {
            toast("NEET UG strictly requires the Science PCB (Physics, Chemistry, Biology) stream!", "error");
            return;
          }
          if (G.char.age < 16) {
            toast("NEET is taken during or after Class 12 (Age 17+)!", "error");
            return;
          }
          if (G.fin.cash < ex.costUSD) { toast("Insufficient cash for exam fee ($30).", "error"); return; }
          G.fin.cash -= ex.costUSD;
          const coachingBoost = G.childhood.coachingChoice?.includes("Aakash") ? 45 : 0;
          const score = Math.min(720, Math.round(450 + (G.stats.smarts / 100) * 240 + coachingBoost + (Math.random() * 15)));
          G.edu.examScores.neet = score;
          toast(`NEET UG Score: ${score}/720! ${score >= 650 ? 'Eligible for AIIMS New Delhi MBBS!' : 'Eligible for State Medical Colleges.'}`, "celebrate");
        } else if (exKey === "sat") {
          if (G.char.age < 15) {
            toast("SAT is taken during high school (Age 15+)!", "error");
            return;
          }
          if (G.fin.cash < ex.costUSD) { toast("Insufficient cash for exam fee ($110).", "error"); return; }
          G.fin.cash -= ex.costUSD;
          const sat = Math.min(1600, Math.round(1020 + (G.stats.smarts / 100) * 560 + (Math.random() * 15)));
          G.edu.examScores.sat = sat;
          toast(`SAT Score: ${sat}/1600! ${sat >= 1500 ? 'Eligible for Harvard, MIT, Stanford, Oxford!' : 'Eligible for State Universities.'}`, "celebrate");
        } else if (exKey === "upsc") {
          startUPSCProcess();
          return;
        } else if (exKey === "cat") {
          if (!hasDegree || G.char.age < 21) {
            toast("CAT strictly requires a completed Bachelor's Degree and minimum age 21!", "error");
            return;
          }
          if (G.fin.cash < ex.costUSD) { toast("Insufficient cash for exam fee ($35).", "error"); return; }
          G.fin.cash -= ex.costUSD;
          const cat = Math.min(99.95, Math.round((82 + (G.stats.smarts / 100) * 17.8) * 100) / 100);
          G.edu.examScores.cat = cat;
          toast(`CAT Score: ${cat}%ile! Admitted to IIM Ahmedabad & Bangalore!`, "celebrate");
        }
        updateHeader();
        renderCurrentTab();
      });
    });

    // Apply University
    document.querySelectorAll(".btn-apply-uni").forEach(btn => {
      btn.addEventListener("click", () => {
        const uId = btn.dataset.uni;
        const allUnis = (c.undergradColleges || []).concat(COUNTRIES.usa.undergradColleges);
        const uni = allUnis.find(u => u.id === uId);
        if (!uni) return;

        if (G.char.age < 17) {
          toast("You must graduate high school (Age 17+) before college!", "error");
          return;
        }

        let accepted = true;
        if (uni.examReq === "jee") {
          if (!G.edu.examScores.jee || G.edu.examScores.jee < 94) accepted = false;
        }
        if (uni.examReq === "neet") {
          if (!G.edu.examScores.neet || G.edu.examScores.neet < 650) accepted = false;
        }
        if (uni.examReq === "sat") {
          if (!G.edu.examScores.sat || G.edu.examScores.sat < 1500) accepted = false;
        }

        if (accepted) {
          G.edu.currentUni = {
            id: uni.id,
            name: uni.name,
            major: uni.majors[0],
            tuition: uni.tuitionUSD,
            year: 1,
            totalYears: uni.majors[0].includes("MBBS") ? 5 : 4,
            prestige: uni.prestige
          };
          toast(`🎉 ADMITTED! Welcome to ${uni.name} studying ${uni.majors[0]}!`, "celebrate");
        } else {
          toast(`Application rejected by ${uni.name}. Boost your exam scores!`, "error");
        }
        updateHeader();
        renderCurrentTab();
      });
    });

    // Apply Job
    document.querySelectorAll(".btn-apply-job").forEach(btn => {
      btn.addEventListener("click", () => {
        const trId = btn.dataset.track;
        const track = CAREER_TRACKS.find(t => t.id === trId);
        if (!track) return;

        if (G.char.age < 18) {
          toast("Must be at least 18 to enter corporate workforce!", "error");
          return;
        }

        if (track.requiresExam === "upsc" && !G.edu.examScores.upsc) {
          toast("Must clear the UPSC Civil Services Examination first!", "error");
          return;
        }

        if (track.requiredDegrees && !track.requiredDegrees.includes("*")) {
          const matchingDegree = G.edu.degrees.some(d => track.requiredDegrees.includes(d.major));
          if (!matchingDegree) {
            toast(`Requires degree in: ${track.requiredDegrees.join(" or ")}!`, "error");
            return;
          }
        }

        if (track.minSmarts && G.stats.smarts < track.minSmarts) {
          toast(`Requires at least ${track.minSmarts} Smarts to pass interviews!`, "error");
          return;
        }

        const entry = track.ladder[0];
        G.career.job = {
          trackId: track.id,
          title: entry.title,
          baseSalary: entry.baseSalaryUSD,
          bonusPct: entry.bonusPct,
          stockUSD: entry.stockUSD
        };
        toast(`Hired as ${entry.title}! ($${entry.baseSalaryUSD.toLocaleString()}/yr)`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Workplace Actions
    document.getElementById("btnWorkOvertime")?.addEventListener("click", () => {
      if (!consumeEnergy(25, "overtime", 1)) return;
      G.stats.prestige = Math.min(100, G.stats.prestige + 4);
      G.stats.happiness = Math.max(10, G.stats.happiness - 3);
      toast("Burned the midnight oil! Executive leadership noted your dedication! (+Prestige)", "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnExecNetworking")?.addEventListener("click", () => {
      if (!consumeEnergy(20, "networking", 1)) return;
      G.stats.prestige = Math.min(100, G.stats.prestige + 5);
      toast("Attended private executive dinner! Expanded high-level network.", "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnResign")?.addEventListener("click", () => {
      G.career.job = null;
      toast("Resigned from position.", "info");
      updateHeader();
      renderCurrentTab();
    });

    // Special careers
    document.getElementById("btnSpecialIndie")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("You already released a project this year! Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy!", "error"); return; }
      if (G.fin.cash < 100) { toast("Requires $100 Steam publishing fee.", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      G.fin.cash -= 100;
      const sales = Math.round(50000 + (G.stats.smarts * 800));
      G.fin.cash += sales;
      toast(`🎮 Steam Game launched! 96% Positive! Earned $${sales.toLocaleString()} royalties!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialCreator")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("You already released a project this year! Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy!", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const subs = 25000 + Math.round(G.stats.looks * 500);
      const ad = Math.round(subs * 0.7);
      G.fin.cash += ad;
      toast(`📹 YouTube video went viral! Gained ${subs.toLocaleString()} subscribers and earned $${ad.toLocaleString()} AdSense!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialModel")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("You already released a project this year! Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy!", "error"); return; }
      if (G.stats.looks < 70) { toast("Requires 70+ Looks!", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const pay = Math.round(G.stats.looks * 400);
      G.fin.cash += pay;
      toast(`👠 Walked Paris Haute Couture runway! Earned $${pay.toLocaleString()}!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialMusician")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("You already released a project this year! Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy!", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const roy = 35000 + Math.round(Math.random() * 40000);
      G.fin.cash += roy;
      toast(`🎵 Single charted on Billboard! Collected $${roy.toLocaleString()} streaming royalties!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialAthlete")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("You already released a project this year! Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy!", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const sal = 80000;
      G.fin.cash += sal;
      toast(`🏆 Signed franchise sports contract! Earned $${sal.toLocaleString()} salary!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialAuthor")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("You already released a project this year! Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy!", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const adv = 20000 + (G.stats.smarts * 300);
      G.fin.cash += adv;
      toast(`📖 Novel hit the New York Times Bestseller list! Earned $${adv.toLocaleString()}!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });
  }

  // TAB 3: 120-BUSINESS CATALOG & ENTERPRISE COCKPIT
  let bizSubTab = "enterprises";
  let catalogSectorFilter = "all";
  let catalogTierFilter = "all";
  let activeBizIndex = 0;

  function renderBusinessTab(vc) {
    const age = G.char.age;
    if (age < 18) {
      vc.innerHTML = `
        <div class="childhood-lock-box">
          <div class="childhood-lock-icon">💼</div>
          <div class="childhood-lock-title">Commercial Enterprise Locked (Age 18+)</div>
          <div class="childhood-lock-desc">
            Under commercial corporate law, founding a registered company, managing corporate treasury, and executing legal contracts requires adulthood (Age 18+).<br><br>
            <strong>Current Age: ${age}</strong> (${18 - age} years until legal incorporation eligibility).<br>
            During childhood, focus on school, building high Smarts, and saving your pocket money!
          </div>
          <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; text-align: left; margin-top: 10px;">
            <div style="font-weight: 700; margin-bottom: 4px; color: var(--accent-emerald);">💰 Childhood Piggy Bank:</div>
            <div>Wallet Cash: <strong>$${G.fin.cash.toLocaleString()}</strong></div>
            <div>Family Wealth Tier: <strong>${G.char.familyWealth.replace("_", " ").toUpperCase()}</strong></div>
          </div>
        </div>
      `;
      return;
    }

    if (!G.biz) G.biz = [];
    if (activeBizIndex >= G.biz.length) activeBizIndex = 0;
    const currentBiz = G.biz[activeBizIndex];

    const subNavHtml = `
      <div class="subtabs-bar" style="margin-bottom: 12px;">
        <button class="subtab-btn ${bizSubTab === 'enterprises' ? 'active' : ''} btn-biz-subtab" data-tab="enterprises">🏢 Companies (${G.biz.length})</button>
        <button class="subtab-btn ${bizSubTab === 'catalog' ? 'active' : ''} btn-biz-subtab" data-tab="catalog">🌐 Catalog (120)</button>
        ${currentBiz ? `
          <button class="subtab-btn ${bizSubTab === 'financials' ? 'active' : ''} btn-biz-subtab" data-tab="financials">📊 Financials</button>
          <button class="subtab-btn ${bizSubTab === 'fundraising' ? 'active' : ''} btn-biz-subtab" data-tab="fundraising">🚀 Funding</button>
          <button class="subtab-btn ${bizSubTab === 'boardroom' ? 'active' : ''} btn-biz-subtab" data-tab="boardroom">🏛️ Board</button>
          <button class="subtab-btn ${bizSubTab === 'org' ? 'active' : ''} btn-biz-subtab" data-tab="org">👥 Org & AU</button>
        ` : ''}
      </div>
    `;

    let bodyHtml = "";

    // 1. ENTERPRISES COCKPIT
    if (bizSubTab === "enterprises") {
      if (G.biz.length === 0) {
        bodyHtml = `
          <div class="card" style="text-align: center; padding: 24px;">
            <div style="font-size: 36px; margin-bottom: 8px;">🏭</div>
            <h3 style="font-size: 15px; margin-bottom: 6px;">No Active Operating Companies</h3>
            <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 16px;">
              Incorporate a venture from the 120-business catalog across 12 sectors and capital tiers A ($500) to G ($1B+).
            </p>
            <button class="btn btn-primary btn-sm btn-go-catalog">Browse 120 Businesses ➔</button>
          </div>
        `;
      } else {
        bodyHtml = `
          ${G.biz.length > 1 ? `
            <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px;">
              ${G.biz.map((b, i) => `
                <button class="btn btn-sm ${i === activeBizIndex ? 'btn-primary' : ''} btn-switch-biz" data-idx="${i}" style="white-space: nowrap; font-size: 11px;">
                  ${b.icon} ${b.name}
                </button>
              `).join("")}
            </div>
          ` : ''}

          <div class="card" style="border-left: 3px solid var(--accent-emerald);">
            <div class="card-title-row">
              <div class="card-title">
                <span>${currentBiz.icon}</span> ${currentBiz.name}
                <span class="pill-badge blue" style="font-size: 8px; margin-left: 6px;">Tier ${currentBiz.capitalTier || 'C'}</span>
                <span class="pill-badge emerald" style="font-size: 8px;">${(currentBiz.org?.scaleTier || 'micro').toUpperCase()}</span>
              </div>
              <div style="font-size: 13px; font-weight: 800; color: var(--accent-emerald);">
                $${(currentBiz.valuationUSD || currentBiz.valuation || 100000).toLocaleString()}
              </div>
            </div>

            ${currentBiz.inRestructuring ? `
              <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid var(--accent-rose); border-radius: 8px; padding: 8px; font-size: 10px; color: #fca5a5; margin-bottom: 10px;">
                🚨 <strong>Chapter 11 Restructuring Notice:</strong> Operating cash exhausted. Liquidate assets, raise rescue debt, or inject personal cash to avert liquidation!
              </div>
            ` : ''}

            ${currentBiz.board?.coupThreat ? `
              <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid var(--accent-amber); border-radius: 8px; padding: 8px; font-size: 10px; color: #fde68a; margin-bottom: 10px;">
                ⚠️ <strong>Boardroom Coup Imminent!</strong> ${currentBiz.board.coupReason}
                <div style="margin-top: 6px;">
                  <button class="btn btn-sm btn-primary btn-goto-board" style="background: var(--accent-amber); color: #000; font-weight: 700;">Open Boardroom Chamber ➔</button>
                </div>
              </div>
            ` : ''}

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 10px; text-align: center;">
              <div>
                <div style="color: var(--text-secondary);">Revenue</div>
                <div style="font-weight: 700;">$${(currentBiz.annualRevenueUSD || currentBiz.annualRev || 0).toLocaleString()}</div>
              </div>
              <div>
                <div style="color: var(--text-secondary);">Net Profit</div>
                <div style="font-weight: 700; color: ${(currentBiz.netProfitUSD || currentBiz.profit || 0) >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                  $${(currentBiz.netProfitUSD || currentBiz.profit || 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div style="color: var(--text-secondary);">Treasury Cash</div>
                <div style="font-weight: 700; color: ${(currentBiz.treasuryUSD || currentBiz.treasury || 0) >= 0 ? '#60a5fa' : 'var(--accent-rose)'};">
                  $${(currentBiz.treasuryUSD || currentBiz.treasury || 0).toLocaleString()}
                </div>
              </div>
            </div>

            <div style="margin-bottom: 12px;">
              <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 4px;">
                ⚡ Live Economic Engine Telemetry (${(currentBiz.boundEngines || []).length} Sub-Engines)
              </div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
                ${Object.entries(currentBiz.kpis || {}).map(([key, val]) => `
                  <div style="background: var(--bg-subtle); padding: 6px 8px; border-radius: 6px; font-size: 10px; display: flex; justify-content: space-between;">
                    <span style="color: var(--text-secondary);">${key}:</span>
                    <strong style="color: #fff;">${val}</strong>
                  </div>
                `).join("")}
              </div>
            </div>

            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              <button class="btn btn-sm btn-biz-expand" data-idx="${activeBizIndex}">
                📈 Expand Scale ($${Math.round((currentBiz.valuationUSD || currentBiz.valuation || 100000) * 0.08).toLocaleString()})
              </button>
              <button class="btn btn-sm btn-biz-dividend" data-idx="${activeBizIndex}">
                💰 Dividend ($${Math.round(Math.max(0, currentBiz.treasuryUSD || currentBiz.treasury || 0) * 0.3).toLocaleString()})
              </button>
              <button class="btn btn-sm btn-biz-inject" data-idx="${activeBizIndex}">
                💵 Inject Cash
              </button>
              <button class="btn btn-sm btn-biz-sell" data-idx="${activeBizIndex}" style="color: var(--accent-rose);">
                🤝 M&A Exit
              </button>
            </div>
          </div>
        `;
      }
    }

    // 2. CATALOG SUBTAB (120 Businesses)
    else if (bizSubTab === "catalog") {
      const sectors = ["all", ...BUSINESS_SECTORS.map(s => s.name)];
      const tiers = ["all", "A", "B", "C", "D", "E", "F", "G"];

      const filteredCatalog = BUSINESS_CATALOG.filter(b => {
        const matchSec = catalogSectorFilter === "all" || b.sector === catalogSectorFilter;
        const matchTier = catalogTierFilter === "all" || b.capitalTier === catalogTierFilter;
        return matchSec && matchTier;
      });

      bodyHtml = `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>🌐</span> 120-Business Catalog</div>
            <span style="font-size: 11px; color: var(--text-secondary);">${filteredCatalog.length} Matching</span>
          </div>

          <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 6px;">
            ${sectors.map(s => `
              <button class="subtab-btn ${catalogSectorFilter === s ? 'active' : ''} btn-sec-filter" data-sec="${s}" style="font-size: 9px; padding: 4px 6px; white-space: nowrap;">
                ${s === 'all' ? 'All Sectors' : s.split(" ")[0]}
              </button>
            `).join("")}
          </div>

          <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 10px;">
            ${tiers.map(t => `
              <button class="subtab-btn ${catalogTierFilter === t ? 'active' : ''} btn-tier-filter" data-tier="${t}" style="font-size: 9px; padding: 4px 8px;">
                ${t === 'all' ? 'All Tiers (A-G)' : `Tier ${t}`}
              </button>
            `).join("")}
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; max-height: 480px; overflow-y: auto;">
            ${filteredCatalog.map(b => `
              <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px; background: var(--bg-subtle); padding: 8px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 18px;">${b.icon}</span>
                    <div>
                      <h4 style="font-size: 12px; margin: 0;">${b.name}</h4>
                      <div style="display: flex; gap: 4px; align-items: center; margin-top: 2px;">
                        <span class="pill-badge blue" style="font-size: 8px;">${b.sector}</span>
                        <span class="pill-badge purple" style="font-size: 8px;">Tier ${b.capitalTier}</span>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-sm btn-primary btn-found-biz" data-id="${b.id}" style="font-size: 10px; padding: 4px 8px;">
                    Found ($${b.startupCost.toLocaleString()})
                  </button>
                </div>
                <p style="font-size: 10px; color: var(--text-secondary); margin: 4px 0 0 0;">
                  ${b.desc}
                </p>
                <div style="font-size: 9px; color: var(--accent-emerald); display: flex; gap: 8px; margin-top: 2px;">
                  <span>Margin: ${Math.round(b.margin * 100)}%</span>
                  <span>Exit: ${b.multiple}x</span>
                  <span>Min Smarts: ${b.minSmarts}</span>
                  <span>Engines: ${b.boundEngines.length}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // 3. FINANCIALS SUBTAB
    else if (bizSubTab === "financials" && currentBiz) {
      const fin = currentBiz.lastFinancials || {};
      const pnl = fin.pnl || {
        grossRevenue: currentBiz.annualRevenueUSD || currentBiz.annualRev || 100000,
        returnsAndDiscounts: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.02),
        netRevenue: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.98),
        cogs: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.4),
        grossProfit: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.58),
        totalOpex: Math.round((currentBiz.annualRevenueUSD || 100000) * 0.35),
        ebitda: currentBiz.ebitdaUSD || currentBiz.ebitda || 30000,
        depreciation: Math.round((currentBiz.ebitdaUSD || 30000) * 0.15),
        ebit: Math.round((currentBiz.ebitdaUSD || 30000) * 0.85),
        interestExpense: 0,
        ebt: Math.round((currentBiz.ebitdaUSD || 30000) * 0.85),
        taxExpense: Math.round((currentBiz.ebitdaUSD || 30000) * 0.18),
        netIncome: currentBiz.netProfitUSD || currentBiz.profit || 20000
      };

      const bs = fin.balanceSheet || {
        cash: currentBiz.treasuryUSD || currentBiz.treasury || 50000,
        ar: currentBiz.accountsReceivableUSD || 25000,
        inventory: currentBiz.inventoryUSD || 15000,
        fixedAssets: currentBiz.fixedAssetsUSD || 40000,
        ipAssets: currentBiz.ipAssetsUSD || 0,
        totalAssets: (currentBiz.treasuryUSD || 50000) + 80000,
        ap: currentBiz.accountsPayableUSD || 15000,
        shortTermDebt: currentBiz.shortTermDebtUSD || 0,
        longTermDebt: currentBiz.longTermDebtUSD || 0,
        totalLiabilities: (currentBiz.accountsPayableUSD || 15000),
        paidInCapital: currentBiz.paidInCapitalUSD || 50000,
        retainedEarnings: currentBiz.retainedEarningsUSD || 15000,
        stockholdersEquity: (currentBiz.paidInCapitalUSD || 50000) + (currentBiz.retainedEarningsUSD || 15000)
      };

      const cf = fin.cashFlow || { cfo: pnl.netIncome, cfi: -25000, cff: 0, capex: 25000, netCashFlow: pnl.netIncome - 25000 };
      const wc = fin.workingCapital || { dso: 30, dio: 30, dpo: 30, ccc: 30 };

      bodyHtml = `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>📊</span> GAAP Financial Statements</div>
            <span style="font-size: 11px; color: var(--accent-emerald);">Fiscal Year ${currentBiz.yearsActive || 1}</span>
          </div>

          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
            <div style="font-weight: 700; margin-bottom: 4px; color: #60a5fa;">⏱️ Cash Conversion Cycle (CCC): ${wc.ccc} Days</div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
              <span>DIO: ${wc.dio}d (Inventory)</span>
              <span>+ DSO: ${wc.dso}d (Receivables)</span>
              <span>- DPO: ${wc.dpo}d (Payables)</span>
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">1. Income Statement (P&L)</div>
          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between;"><span>Gross Revenue:</span><span>$${pnl.grossRevenue.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Less: Returns & Discounts:</span><span>-$${pnl.returnsAndDiscounts.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>Net Revenue:</span><span>$${pnl.netRevenue.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--accent-rose);"><span>Cost of Goods Sold (COGS):</span><span>-$${pnl.cogs.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--accent-emerald);"><span>Gross Profit:</span><span>$${pnl.grossProfit.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Operating Expenses (OPEX):</span><span>-$${pnl.totalOpex.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>EBITDA:</span><span>$${pnl.ebitda.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Depreciation & Amortization:</span><span>-$${pnl.depreciation.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>Operating EBIT:</span><span>$${pnl.ebit.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Interest & Taxes:</span><span>-$${(pnl.interestExpense + pnl.taxExpense).toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 4px; color: ${pnl.netIncome >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
              <span>Net Income:</span><span>$${pnl.netIncome.toLocaleString()}</span>
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">2. Balance Sheet Identity (Assets ≡ Liabilities + Equity)</div>
          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
            <div style="font-weight: 700; color: #60a5fa;">Assets:</div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Cash & Equivalents:</span><span>$${bs.cash.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Accounts Receivable (AR):</span><span>$${bs.ar.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Inventory:</span><span>$${bs.inventory.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>PP&E + IP:</span><span>$${(bs.fixedAssets + bs.ipAssets).toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; border-top: 1px solid var(--border-color); padding-top: 2px;">
              <span>Total Assets:</span><span>$${bs.totalAssets.toLocaleString()}</span>
            </div>

            <div style="font-weight: 700; color: #f472b6; margin-top: 4px;">Liabilities & Equity:</div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Accounts Payable (AP):</span><span>$${bs.ap.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Debt Obligations:</span><span>$${(bs.shortTermDebt + bs.longTermDebt).toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Stockholders' Equity:</span><span>$${bs.stockholdersEquity.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; border-top: 1px solid var(--border-color); padding-top: 2px;">
              <span>Total Liabilities & Equity:</span><span>$${(bs.totalLiabilities + bs.stockholdersEquity).toLocaleString()}</span>
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">3. Statement of Cash Flows</div>
          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between;"><span>Operating Cash Flow (CFO):</span><span style="color: ${cf.cfo >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">$${cf.cfo.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Investing Cash Flow (CFI - CapEx):</span><span style="color: var(--accent-rose);">$${cf.cfi.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>Financing Cash Flow (CFF):</span><span>$${cf.cff.toLocaleString()}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 800; border-top: 1px solid var(--border-color); padding-top: 4px;">
              <span>Net Change in Liquid Cash:</span><span>$${cf.netCashFlow.toLocaleString()}</span>
            </div>
          </div>
        </div>
      `;
    }

    // 4. FUNDRAISING SUBTAB
    else if (bizSubTab === "fundraising" && currentBiz) {
      const pitchScore = calculateFounderPitchScore(G, currentBiz);

      bodyHtml = `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>🚀</span> Capital Markets & Pitch Desk</div>
            <span class="pill-badge emerald">Pitch Score: ${pitchScore}</span>
          </div>

          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
            <div style="font-weight: 700; margin-bottom: 2px;">Founder Pedigree Breakdown:</div>
            <div style="color: var(--text-secondary);">
              Degree: ${G.education?.college?.name || "Self-Taught"} | 
              Smarts: ${G.stats.smarts} | 
              Prestige: ${G.stats.prestige} | 
              Current Equity: ${currentBiz.founderEquityPct || 100}%
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Select Funding Source to Solicit Term Sheets:</div>
          <div style="display: flex; flex-direction: column; gap: 6px; max-height: 380px; overflow-y: auto;">
            ${FUNDING_SOURCES.map(s => `
              <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px;">
                <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 2px;">
                  <span>${s.name} (${s.tier})</span>
                  <button class="btn btn-sm btn-primary btn-solicit-terms" data-sid="${s.id}" style="font-size: 9px; padding: 2px 6px;">
                    Solicit Terms ➔
                  </button>
                </div>
                <p style="margin: 0; color: var(--text-secondary);">${s.desc}</p>
                <div style="color: #60a5fa; margin-top: 2px;">Check Size: $${s.minCheck.toLocaleString()} – $${s.maxCheck.toLocaleString()}</div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // 5. BOARDROOM SUBTAB
    else if (bizSubTab === "boardroom" && currentBiz) {
      const seats = currentBiz.board?.seats || [
        { id: "founder", title: "Founder & CEO (YOU)", votes: 1, type: "founder", loyalty: 100, agenda: "growth" }
      ];

      bodyHtml = `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>🏛️</span> Board of Directors Chamber</div>
            <span style="font-size: 11px; color: var(--text-secondary);">${seats.length} Seated Directors</span>
          </div>

          ${currentBiz.board?.coupThreat ? `
            <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid var(--accent-rose); border-radius: 8px; padding: 10px; font-size: 10px; color: #fca5a5; margin-bottom: 12px;">
              <div style="font-weight: 700; font-size: 11px; margin-bottom: 4px;">🚨 BOARDROOM COUP IN PROGRESS!</div>
              <div>${currentBiz.board.coupReason}</div>
              <div style="margin-top: 8px; font-weight: 700; color: #fff;">Activate Tactical Defense:</div>
              <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px;">
                <button class="btn btn-sm btn-coup-def" data-lever="lobby_swing_vote" style="background: #3b82f6; text-align: left;">
                  🎯 Lobby Independent Swing Vote (25 Energy)
                </button>
                <button class="btn btn-sm btn-coup-def" data-lever="dual_class_defense" style="background: #8b5cf6; text-align: left;">
                  ⚖️ Invoke Class-B Super-Voting Defense (10:1 Voting Rights)
                </button>
                <button class="btn btn-sm btn-coup-def" data-lever="personal_cash_injection" style="background: #10b981; text-align: left;">
                  💵 Personal Cash Injection (Guarantees 12 Months Runway)
                </button>
                <button class="btn btn-sm btn-coup-def" data-lever="step_down_to_chairman" style="background: #f59e0b; color: #000; text-align: left; font-weight: 700;">
                  👑 Step Down to Chairman & CPO (Keep 100% Equity)
                </button>
              </div>
            </div>
          ` : `
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--accent-emerald); border-radius: 8px; padding: 8px; font-size: 10px; color: #6ee7b7; margin-bottom: 12px;">
              ✅ <strong>Board Relations Stable:</strong> Founder maintains the confidence and statutory direction of the board.
            </div>
          `}

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Director Seat Roster:</div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${seats.map(s => `
              <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700;">${s.title}</div>
                  <div style="color: var(--text-secondary); font-size: 9px;">Agenda: ${(s.agenda || 'growth').toUpperCase()} | Votes: ${s.votes || 1}</div>
                </div>
                <div style="text-align: right;">
                  <div style="color: ${(s.loyalty || 70) >= 70 ? 'var(--accent-emerald)' : ((s.loyalty || 70) >= 40 ? 'var(--accent-amber)' : 'var(--accent-rose)')}; font-weight: 700;">
                    Loyalty: ${s.loyalty || 70}%
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // 6. ORG & AU SUBTAB
    else if (bizSubTab === "org" && currentBiz) {
      const org = currentBiz.org || { scaleTier: "micro", allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 }, techDebt: 5, qaDeficit: 5, regulatoryExposure: 5, morale: 90 };
      const au = org.allocatedAU || { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 };

      bodyHtml = `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>👥</span> Organizational Scale & Attention Units</div>
            <span class="pill-badge purple">${(org.scaleTier || 'micro').toUpperCase()} TIER</span>
          </div>

          <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
            <div style="font-weight: 700; margin-bottom: 4px; color: var(--accent-rose);">⚠️ Latent Crisis Detonation Queue:</div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between;">
                <span>Tech Debt:</span>
                <strong style="color: ${org.techDebt > 70 ? 'var(--accent-rose)' : '#fff'};">${org.techDebt}%</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>QA & Defect Deficit:</span>
                <strong style="color: ${org.qaDeficit > 70 ? 'var(--accent-rose)' : '#fff'};">${org.qaDeficit}%</strong>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Regulatory Exposure:</span>
                <strong style="color: ${org.regulatoryExposure > 70 ? 'var(--accent-rose)' : '#fff'};">${org.regulatoryExposure}%</strong>
              </div>
            </div>
          </div>

          <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Allocate Founder's 100 Annual Attention Units (AU):</div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Vision & Strategy:</span>
              <input type="number" class="inp-au" data-k="strategy" value="${au.strategy}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Key Executive Hiring:</span>
              <input type="number" class="inp-au" data-k="hiring" value="${au.hiring}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Investor Relations & Board:</span>
              <input type="number" class="inp-au" data-k="investorRel" value="${au.investorRel}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Product & R&D Review:</span>
              <input type="number" class="inp-au" data-k="product" value="${au.product}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Operational Firefighting:</span>
              <input type="number" class="inp-au" data-k="fires" value="${au.fires}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
            </div>
            <button class="btn btn-primary btn-sm btn-save-au" style="margin-top: 8px;">Save 100 AU Allocation</button>
          </div>
        </div>
      `;
    }

    vc.innerHTML = subNavHtml + bodyHtml;

    // EVENT LISTENERS
    document.querySelectorAll(".btn-biz-subtab").forEach(btn => {
      btn.addEventListener("click", () => {
        bizSubTab = btn.dataset.tab;
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-switch-biz").forEach(btn => {
      btn.addEventListener("click", () => {
        activeBizIndex = parseInt(btn.dataset.idx);
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-sec-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        catalogSectorFilter = btn.dataset.sec;
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-tier-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        catalogTierFilter = btn.dataset.tier;
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-go-catalog").forEach(btn => {
      btn.addEventListener("click", () => {
        bizSubTab = "catalog";
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-goto-board").forEach(btn => {
      btn.addEventListener("click", () => {
        bizSubTab = "boardroom";
        renderCurrentTab();
      });
    });

    // Found Business
    document.querySelectorAll(".btn-found-biz").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const t = BUSINESS_CATALOG.find(x => x.id === id);
        if (!t) return;

        if (G.stats.smarts < t.minSmarts) {
          toast(`Requires at least ${t.minSmarts} Smarts to establish ${t.name}!`, "error");
          return;
        }
        if (G.fin.cash < t.startupCost) {
          toast(`Requires $${t.startupCost.toLocaleString()} wallet cash!`, "error");
          return;
        }

        G.fin.cash -= t.startupCost;
        const initialFixedAssets = Math.round(t.startupCost * (t.workingCapital?.capexIntensity || 0.25));
        const initialTreasury = t.startupCost - initialFixedAssets;

        G.biz.push({
          instanceId: `biz_${Date.now()}`,
          catalogId: t.id,
          name: t.name,
          sector: t.sector,
          icon: t.icon,
          capitalTier: t.capitalTier,
          scaleUnits: 1,
          yearsActive: 0,
          founderEquityPct: 100,
          founderClassBSharesPct: 100,
          headcount: t.capitalTier === "A" ? 1 : (t.capitalTier === "B" ? 2 : (t.capitalTier === "C" ? 6 : (t.capitalTier === "D" ? 20 : (t.capitalTier === "E" ? 60 : (t.capitalTier === "F" ? 150 : 500))))),
          annualRevenueUSD: t.baseRev,
          annualRev: t.baseRev,
          ebitdaUSD: Math.round(t.baseRev * 0.25),
          ebitda: Math.round(t.baseRev * 0.25),
          netProfitUSD: Math.round(t.baseRev * 0.18),
          profit: Math.round(t.baseRev * 0.18),
          treasuryUSD: initialTreasury,
          treasury: initialTreasury,
          accountsReceivableUSD: Math.round(t.baseRev * (t.workingCapital.dso / 365)),
          inventoryUSD: Math.round(t.baseRev * (1 - t.margin) * (t.workingCapital.dio / 365)),
          fixedAssetsUSD: initialFixedAssets,
          ipAssetsUSD: t.boundEngines.includes("research_ip") ? Math.round(t.startupCost * 0.3) : 0,
          accountsPayableUSD: Math.round(t.baseRev * (1 - t.margin) * (t.workingCapital.dpo / 365)),
          shortTermDebtUSD: 0,
          longTermDebtUSD: 0,
          retainedEarningsUSD: 0,
          paidInCapitalUSD: t.startupCost,
          valuationUSD: Math.round(t.baseRev * t.multiple * 0.3),
          valuation: Math.round(t.baseRev * t.multiple * 0.3),
          marketingBudgetUSD: Math.round(t.baseRev * 0.05),
          workingCapitalDays: { ...t.workingCapital },
          boundEngines: [...t.boundEngines],
          kpis: {},
          inRestructuring: false,
          board: {
            seats: [
              { id: "founder", title: "Founder & CEO (YOU)", votes: 1, type: "founder", loyalty: 100, agenda: "growth" }
            ],
            coupThreat: false,
            coupReason: null
          },
          org: {
            scaleTier: "micro",
            allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 },
            techDebt: 5, qaDeficit: 5, regulatoryExposure: 5, morale: 90
          }
        });

        toast(`🎉 Incorporated ${t.name}!`, "celebrate");
        activeBizIndex = G.biz.length - 1;
        bizSubTab = "enterprises";
        updateHeader();
        renderCurrentTab();
      });
    });

    // Expand
    document.querySelectorAll(".btn-biz-expand").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const b = G.biz[idx];
        const val = b.valuationUSD || b.valuation || 100000;
        const cost = Math.round(val * 0.08);

        if ((b.treasuryUSD || b.treasury || 0) >= cost) {
          b.treasuryUSD = (b.treasuryUSD || 0) - cost;
          b.treasury = b.treasuryUSD;
        } else if (G.fin.cash >= cost) {
          G.fin.cash -= cost;
        } else {
          toast("Insufficient funds for expansion.", "error");
          return;
        }

        b.scaleUnits = (b.scaleUnits || 1) + 1;
        b.headcount = (b.headcount || 4) + 6;
        toast(`Expanded ${b.name}! (Now Scale Units: ${b.scaleUnits})`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Dividend
    document.querySelectorAll(".btn-biz-dividend").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const b = G.biz[idx];
        const cash = b.treasuryUSD || b.treasury || 0;
        const div = Math.round(Math.max(0, cash) * 0.3 * ((b.founderEquityPct || 100) / 100));

        if (div <= 0) {
          toast("No liquid treasury cash available for dividends.", "error");
          return;
        }

        b.treasuryUSD = cash - div;
        b.treasury = b.treasuryUSD;
        G.fin.cash += div;
        toast(`Withdrew $${div.toLocaleString()} founder dividend!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Inject Cash
    document.querySelectorAll(".btn-biz-inject").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const b = G.biz[idx];
        const injectAmt = 50000;

        if (G.fin.cash < injectAmt) {
          toast(`Insufficient personal cash ($${injectAmt.toLocaleString()} required).`, "error");
          return;
        }

        G.fin.cash -= injectAmt;
        b.treasuryUSD = (b.treasuryUSD || 0) + injectAmt;
        b.treasury = b.treasuryUSD;
        b.paidInCapitalUSD = (b.paidInCapitalUSD || 0) + injectAmt;
        if (b.inRestructuring && b.treasuryUSD > 0) b.inRestructuring = false;

        toast(`Injected $${injectAmt.toLocaleString()} personal cash into ${b.name} treasury!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // M&A Exit
    document.querySelectorAll(".btn-biz-sell").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const b = G.biz[idx];
        const val = b.valuationUSD || b.valuation || 100000;
        const founderProceeds = Math.round(val * ((b.founderEquityPct || 100) / 100));

        if (confirm(`Accept institutional M&A buyout offer for ${b.name} at valuation $${val.toLocaleString()}?\n\nYour ${b.founderEquityPct || 100}% equity yields: $${founderProceeds.toLocaleString()} personal cash.`)) {
          G.fin.cash += founderProceeds;
          if (!G.pastExits) G.pastExits = [];
          G.pastExits.push({ name: b.name, valuation: val, proceeds: founderProceeds, year: G.char.age });
          G.biz.splice(idx, 1);
          toast(`🏆 Sold ${b.name} for $${founderProceeds.toLocaleString()}!`, "celebrate");
          activeBizIndex = 0;
          updateHeader();
          renderCurrentTab();
        }
      });
    });

    // Coup Defense Levers
    document.querySelectorAll(".btn-coup-def").forEach(btn => {
      btn.addEventListener("click", () => {
        const lever = btn.dataset.lever;
        const res = executeCoupDefense(G, currentBiz, lever);
        if (res.success) toast(res.message, "celebrate");
        else toast(res.message, "error");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Solicit Term Sheets
    document.querySelectorAll(".btn-solicit-terms").forEach(btn => {
      btn.addEventListener("click", () => {
        const sid = btn.dataset.sid;
        const sheets = generateTermSheets(G, currentBiz, sid);
        showInteractiveTermSheetsModal(sheets, currentBiz);
      });
    });

    // Save AU
    const btnSaveAU = document.querySelector(".btn-save-au");
    if (btnSaveAU) {
      btnSaveAU.addEventListener("click", () => {
        const newAU = {};
        document.querySelectorAll(".inp-au").forEach(inp => {
          newAU[inp.dataset.k] = parseInt(inp.value) || 0;
        });
        const res = reallocateAttentionUnits(currentBiz, newAU);
        if (res.success) toast(res.message, "celebrate");
        else toast(res.message, "error");
        renderCurrentTab();
      });
    }
  }

  function showInteractiveTermSheetsModal(sheets, biz) {
    let modalHtml = `
      <div style="font-size: 11px;">
        <p style="color: var(--text-secondary); margin-bottom: 12px;">
          Review competing investor term sheets for <strong>${biz.name}</strong>. Negotiate valuation counter-offers or accept standard terms.
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${sheets.map((s, i) => `
            <div style="background: var(--bg-subtle); padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
              <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 4px;">
                <span>${s.investorName}</span>
                <span class="pill-badge blue" style="font-size: 9px;">${s.investorType}</span>
              </div>
              <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 6px;">
                Check: <strong style="color: #fff;">$${s.investmentCheckUSD.toLocaleString()}</strong> | 
                Pre-Money: <strong>$${s.preMoneyValuationUSD.toLocaleString()}</strong> | 
                Dilution: <strong style="color: var(--accent-amber);">${s.postMoneyEquityPct}%</strong>
              </div>
              <div style="font-size: 9px; color: var(--text-secondary); margin-bottom: 8px;">
                Liquidation Pref: <strong>${s.liquidationPreference}</strong> | 
                Option Pool: <strong>${s.optionPoolPct}%</strong> | 
                Board Seats: <strong>${s.boardSeatsRequested}</strong>
              </div>
              <div style="display: flex; gap: 6px; align-items: center;">
                <button class="btn btn-sm btn-primary btn-accept-sheet" data-idx="${i}" style="font-size: 10px; padding: 4px 8px;">
                  Accept Deal
                </button>
                <button class="btn btn-sm btn-counter-sheet" data-idx="${i}" style="font-size: 10px; padding: 4px 8px;">
                  Counter-Offer (+20% Val)
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    openModal("Term Sheet Negotiations", modalHtml);

    document.querySelectorAll(".btn-accept-sheet").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const accepted = sheets[idx];
        const res = executeFinancingRound(G, biz, accepted);
        closeModal();
        toast(res.message, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-counter-sheet").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const sheet = sheets[idx];
        const res = negotiateTermSheet(G, biz, sheet, 20);
        if (res.accepted) {
          sheets[idx] = res.revisedSheet;
          toast(res.message, "celebrate");
          showInteractiveTermSheetsModal(sheets, biz);
        } else {
          toast(res.message, "error");
        }
      });
    });
  }


  // TAB 4: FINANCE & ASSETS
  let finSub = "stocks";
  function renderFinanceAssetsTab(vc) {
    const age = G.char.age;

    if (age < 18) {
      vc.innerHTML = `
        <div class="subtabs-bar">
          <button class="subtab-btn ${finSub === 'piggy' ? 'active' : ''}" id="fsubPiggy">🪙 Piggy Bank</button>
          <button class="subtab-btn ${finSub === 'stocks' ? 'active' : ''}" id="fsubStocks">📈 Stocks (Locked)</button>
          <button class="subtab-btn ${finSub === 'real_estate' ? 'active' : ''}" id="fsubRE">🏠 Real Estate (Locked)</button>
          <button class="subtab-btn ${finSub === 'forbes' ? 'active' : ''}" id="fsubForbes">🏆 Forbes Richest</button>
        </div>

        ${finSub === 'piggy' || finSub === 'stocks' ? renderChildPiggyView() : ''}
        ${finSub === 'real_estate' ? renderChildRELockView() : ''}
        ${finSub === 'forbes' ? renderForbesView() : ''}
      `;

      document.getElementById("fsubPiggy")?.addEventListener("click", () => { finSub = "piggy"; renderCurrentTab(); });
      document.getElementById("fsubStocks")?.addEventListener("click", () => { finSub = "stocks"; renderCurrentTab(); });
      document.getElementById("fsubRE")?.addEventListener("click", () => { finSub = "real_estate"; renderCurrentTab(); });
      document.getElementById("fsubForbes")?.addEventListener("click", () => { finSub = "forbes"; renderCurrentTab(); });

      bindChildFinanceEvents();
      return;
    }

    vc.innerHTML = `
      <div class="subtabs-bar">
        <button class="subtab-btn ${finSub === 'stocks' ? 'active' : ''}" id="fsubStocks">📈 Stocks & Crypto</button>
        <button class="subtab-btn ${finSub === 'real_estate' ? 'active' : ''}" id="fsubRE">🏠 Real Estate</button>
        <button class="subtab-btn ${finSub === 'forbes' ? 'active' : ''}" id="fsubForbes">🏆 Forbes Richest</button>
      </div>

      ${finSub === 'stocks' ? renderStocksView() : ''}
      ${finSub === 'real_estate' ? renderREView() : ''}
      ${finSub === 'forbes' ? renderForbesView() : ''}
    `;

    document.getElementById("fsubStocks")?.addEventListener("click", () => { finSub = "stocks"; renderCurrentTab(); });
    document.getElementById("fsubRE")?.addEventListener("click", () => { finSub = "real_estate"; renderCurrentTab(); });
    document.getElementById("fsubForbes")?.addEventListener("click", () => { finSub = "forbes"; renderCurrentTab(); });

    bindFinanceEvents();
  }

  function renderChildPiggyView() {
    return `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🪙</span> Childhood Piggy Bank & Savings</div>
          <span class="pill-badge emerald">3.0% APY</span>
        </div>
        <div style="font-size: 12px; margin-bottom: 12px; line-height: 1.6;">
          <div>Wallet Cash: <strong style="color: var(--accent-emerald);">$${G.fin.cash.toLocaleString()}</strong></div>
          <div>Piggy Bank Savings: <strong>$${G.fin.savings.toLocaleString()}</strong></div>
          <p style="font-size: 11px; color: var(--text-secondary); margin-top: 6px;">
            Save your pocket money allowances! Earn 3% interest annually.
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-sm btn-primary" id="btnDepositPiggy">Deposit to Piggy Bank</button>
          <button class="btn btn-sm" id="btnWithdrawPiggy">Withdraw Cash</button>
        </div>
      </div>

      <div class="childhood-lock-box">
        <div class="childhood-lock-icon">📈</div>
        <div class="childhood-lock-title">Securities Brokerage Restricted (Age 18+)</div>
        <div class="childhood-lock-desc">
          KYC regulations require legal majority age (18+) to trade publicly listed equities, ETFs, crypto tokens, and margin loans.
        </div>
      </div>
    `;
  }

  function renderChildRELockView() {
    return `
      <div class="childhood-lock-box">
        <div class="childhood-lock-icon">🏠</div>
        <div class="childhood-lock-title">Real Estate Deeds Restricted (Age 18+)</div>
        <div class="childhood-lock-desc">
          Property titles, mortgages, and commercial leasing contracts legally require adulthood (Age 18+).
        </div>
      </div>
    `;
  }

  function bindChildFinanceEvents() {
    document.getElementById("btnDepositPiggy")?.addEventListener("click", () => {
      if (G.fin.cash <= 0) { toast("No cash in wallet to deposit!", "error"); return; }
      const dep = G.fin.cash;
      G.fin.savings += dep;
      G.fin.cash = 0;
      toast(`Deposited $${dep.toLocaleString()} to Piggy Bank!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnWithdrawPiggy")?.addEventListener("click", () => {
      if (G.fin.savings <= 0) { toast("Piggy bank is empty!", "error"); return; }
      const wd = G.fin.savings;
      G.fin.cash += wd;
      G.fin.savings = 0;
      toast(`Withdrew $${wd.toLocaleString()} from Piggy Bank!`, "info");
      updateHeader();
      renderCurrentTab();
    });
  }

  function renderStocksView() {
    return `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏦</span> Private Banking & Margin</div>
          <span class="pill-badge emerald">4.5% APY</span>
        </div>
        <div style="font-size: 12px; margin-bottom: 8px;">
          <div>Liquid Cash: <strong style="color: var(--accent-emerald);">$${G.fin.cash.toLocaleString()}</strong></div>
          <div>High-Yield Savings: <strong>$${G.fin.savings.toLocaleString()}</strong></div>
          <div>Margin Debt: <strong style="color: var(--accent-rose);">$${G.fin.marginDebt.toLocaleString()}</strong></div>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-sm btn-primary" id="btnDepositSav">Deposit Cash</button>
          <button class="btn btn-sm" id="btnWithdrawSav">Withdraw Savings</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>📈</span> Public Equities Market</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${STOCKS_CATALOG.map(s => {
            const curP = G.fin.stockPrices[s.ticker] || s.price;
            const sh = G.fin.stocks[s.ticker] || 0;
            return `
              <div class="list-row">
                <div>
                  <h4>${s.name} (${s.ticker})</h4>
                  <p>Price: $${curP.toFixed(2)} • Owned: ${sh} sh</p>
                </div>
                <div style="display: flex; gap: 4px;">
                  <button class="btn btn-sm btn-primary btn-buy-stock" data-t="${s.ticker}">Buy 10</button>
                  <button class="btn btn-sm btn-sell-stock" data-t="${s.ticker}">Sell 10</button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🪙</span> Digital Assets (Crypto)</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div class="list-row">
            <div>
              <h4>Bitcoin (BTC)</h4>
              <p>$${G.fin.cryptoPrices.BTC.toLocaleString()} • Owned: ${G.fin.crypto.BTC} BTC</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnBuyBTC">Buy 0.1 BTC</button>
          </div>
          <div class="list-row">
            <div>
              <h4>Ethereum (ETH)</h4>
              <p>$${G.fin.cryptoPrices.ETH.toLocaleString()} • Owned: ${G.fin.crypto.ETH} ETH</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnBuyETH">Buy 1 ETH</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderREView() {
    return `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏠</span> Owned Real Estate (${G.assets.properties.length})</div>
        </div>
        ${G.assets.properties.length === 0 ? `<p style="font-size: 11px; color: var(--text-secondary);">You own no real estate. Browse the property listings below.</p>` : `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${G.assets.properties.map((p, i) => `
              <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 11px;">
                <div style="display: flex; justify-content: space-between; font-weight: 700;">
                  <span>${p.icon} ${p.name}</span>
                  <span style="color: var(--accent-emerald);">$${p.val.toLocaleString()}</span>
                </div>
                <div>Condition: ${p.cond}% | Status: ${p.isRented ? 'Rented Out' : 'Vacant'}</div>
                <div style="display: flex; gap: 4px; margin-top: 6px;">
                  <button class="btn btn-sm btn-re-rent" data-idx="${i}">${p.isRented ? 'Evict Tenant' : 'Rent Out'}</button>
                  <button class="btn btn-sm btn-re-reno" data-idx="${i}">Renovate ($${Math.round(p.val * 0.12).toLocaleString()})</button>
                  <button class="btn btn-sm btn-re-flip" data-idx="${i}" style="color: var(--accent-rose);">Flip / Sell</button>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏛️</span> Real Estate Market Listings</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${PROPERTY_TEMPLATES.map(p => `
            <div class="list-row">
              <div>
                <h4>${p.icon} ${p.name}</h4>
                <p>Price: $${p.priceUSD.toLocaleString()} • Yield: ${(p.rentYield * 100).toFixed(1)}%</p>
              </div>
              <button class="btn btn-sm btn-primary btn-buy-prop" data-id="${p.id}">Buy Property</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderForbesView() {
    calcNW();
    const titans = [...FORBES_TITANS, { name: `${G.char.firstName} ${G.char.lastName} (YOU)`, nw: G.fin.netWorth, flag: COUNTRIES[G.char.birthCountry]?.flag || "🌐", source: G.biz.length > 0 ? G.biz[0].name : "Self-Made" }].sort((a, b) => b.nw - a.nw);

    return `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏆</span> The World's Richest (Forbes Global)</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px; max-height: 520px; overflow-y: auto;">
          ${titans.map((t, idx) => {
            const isUser = t.name.includes("(YOU)");
            return `
              <div class="list-row" style="${isUser ? 'background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-emerald);' : ''}">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-weight: 800; font-size: 13px; color: var(--text-muted); width: 20px;">#${idx + 1}</span>
                  <div>
                    <h4 style="${isUser ? 'color: var(--accent-emerald); font-weight: 800;' : ''}">${t.name} ${t.flag}</h4>
                    <p style="font-size: 10px;">${t.source}</p>
                  </div>
                </div>
                <div style="font-weight: 700; font-size: 12px; color: var(--accent-emerald);">
                  $${(t.nw >= 1000000000 ? (t.nw / 1000000000).toFixed(1) + 'B' : (t.nw / 1000000).toFixed(1) + 'M')}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  function bindFinanceEvents() {
    // Deposit / Withdraw savings
    document.getElementById("btnDepositSav")?.addEventListener("click", () => {
      if (G.fin.cash <= 0) { toast("No cash in wallet to deposit!", "error"); return; }
      const dep = Math.round(G.fin.cash * 0.5);
      G.fin.savings += dep;
      G.fin.cash -= dep;
      toast(`Deposited $${dep.toLocaleString()} into High-Yield Savings!`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnWithdrawSav")?.addEventListener("click", () => {
      if (G.fin.savings <= 0) { toast("Savings account is empty!", "error"); return; }
      const wd = Math.round(G.fin.savings * 0.5);
      G.fin.cash += wd;
      G.fin.savings -= wd;
      toast(`Withdrew $${wd.toLocaleString()} from Savings!`, "info");
      updateHeader();
      renderCurrentTab();
    });

    // Buy / Sell stock
    document.querySelectorAll(".btn-buy-stock").forEach(btn => {
      btn.addEventListener("click", () => {
        const t = btn.dataset.t;
        const p = G.fin.stockPrices[t] || 100;
        const cost = Math.round(p * 10);
        if (G.fin.cash < cost) { toast(`Requires $${cost.toLocaleString()} cash to buy 10 shares!`, "error"); return; }
        G.fin.cash -= cost;
        G.fin.stocks[t] = (G.fin.stocks[t] || 0) + 10;
        toast(`Bought 10 shares of ${t} at $${p.toFixed(2)}!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    document.querySelectorAll(".btn-sell-stock").forEach(btn => {
      btn.addEventListener("click", () => {
        const t = btn.dataset.t;
        const sh = G.fin.stocks[t] || 0;
        if (sh < 10) { toast("You own less than 10 shares.", "error"); return; }
        const p = G.fin.stockPrices[t] || 100;
        const val = Math.round(p * 10);
        G.fin.stocks[t] -= 10;
        G.fin.cash += val;
        toast(`Sold 10 shares of ${t} for $${val.toLocaleString()} cash!`, "info");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Buy crypto
    document.getElementById("btnBuyBTC")?.addEventListener("click", () => {
      const cost = Math.round(G.fin.cryptoPrices.BTC * 0.1);
      if (G.fin.cash < cost) { toast(`Requires $${cost.toLocaleString()} cash.`, "error"); return; }
      G.fin.cash -= cost;
      G.fin.crypto.BTC = Math.round((G.fin.crypto.BTC + 0.1) * 100) / 100;
      toast("Purchased 0.1 Bitcoin (BTC)!", "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnBuyETH")?.addEventListener("click", () => {
      const cost = G.fin.cryptoPrices.ETH;
      if (G.fin.cash < cost) { toast(`Requires $${cost.toLocaleString()} cash.`, "error"); return; }
      G.fin.cash -= cost;
      G.fin.crypto.ETH += 1;
      toast("Purchased 1 Ethereum (ETH)!", "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    // Real estate purchase
    document.querySelectorAll(".btn-buy-prop").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const t = PROPERTY_TEMPLATES.find(x => x.id === id);
        if (!t) return;
        if (G.fin.cash < t.priceUSD) { toast(`Requires $${t.priceUSD.toLocaleString()} cash!`, "error"); return; }
        G.fin.cash -= t.priceUSD;
        G.assets.properties.push({
          id: t.id,
          name: t.name,
          icon: t.icon,
          val: t.priceUSD,
          origPrice: t.priceUSD,
          rentYield: t.rentYield,
          cond: 80,
          isRented: true,
          lastRenoYear: null
        });
        toast(`Acquired ${t.name}!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Rent toggle
    document.querySelectorAll(".btn-re-rent").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const p = G.assets.properties[idx];
        p.isRented = !p.isRented;
        toast(p.isRented ? "Property leased to verified tenant!" : "Tenant vacated property.", "info");
        renderCurrentTab();
      });
    });

    // Renovate with cooldown
    document.querySelectorAll(".btn-re-reno").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const p = G.assets.properties[idx];
        if (p.lastRenoYear === G.char.age) {
          toast("This property was already renovated this year! Age up to renovate again.", "error");
          return;
        }
        if (p.cond >= 100) {
          toast("Property is already in pristine 100% mint condition!", "info");
          return;
        }
        const cost = Math.round(p.val * 0.12);
        if (G.fin.cash < cost) {
          toast(`Renovation requires $${cost.toLocaleString()} cash.`, "error");
          return;
        }
        G.fin.cash -= cost;
        p.cond = Math.min(100, p.cond + 20);
        p.val = Math.round(p.val * 1.22);
        p.lastRenoYear = G.char.age;
        toast(`Renovated property! Condition upgraded to ${p.cond}%, valuation rose to $${p.val.toLocaleString()}!`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Flip with broker fee and capital gains tax
    document.querySelectorAll(".btn-re-flip").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        const p = G.assets.properties[idx];
        const brokerFee = Math.round(p.val * 0.05); // 5% broker commission
        const capitalGain = Math.max(0, p.val - (p.origPrice || p.val * 0.8));
        const tax = G.char.taxHaven ? 0 : Math.round(capitalGain * 0.15); // 15% capital gains tax
        const netProceeds = p.val - brokerFee - tax;
        G.fin.cash += netProceeds;
        G.assets.properties.splice(idx, 1);
        toast(`Flipped property! Gross: $${p.val.toLocaleString()} | Fees & Tax: $${(brokerFee + tax).toLocaleString()} | Net Cash: +$${netProceeds.toLocaleString()}`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });
  }

  // TAB 5: FAMILY, ROMANCE & SUCCESSION
  function renderRelationshipsTab(vc) {
    const age = G.char.age;
    const p = G.family.partner;

    let romanceHtml = "";
    if (age < 16) {
      romanceHtml = `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>❤️</span> Romantic Dating</div>
            <span class="pill-badge">School Stage</span>
          </div>
          <p style="font-size: 11px; color: var(--text-secondary);">
            Romantic dating unlocks at high school age (16+). Focus on school and childhood friendships!
          </p>
        </div>
      `;
    } else if (age >= 16 && age < 18) {
      romanceHtml = `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>❤️</span> High School Crush & Dating</div>
            ${p ? `<span class="pill-badge emerald">High School Sweetheart</span>` : `<span class="pill-badge">Single</span>`}
          </div>
          ${p ? `
            <div style="font-size: 12px; margin-bottom: 8px;">
              <div>Partner: <strong>${p.name}</strong> (Classmate)</div>
              <div>Status: High School Dating (Marriage & Children unlock at 18)</div>
            </div>
            <button class="btn btn-sm" id="btnBreakup" style="color: var(--accent-rose);">Break Up</button>
          ` : `
            <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">You are currently single.</p>
            <button class="btn btn-sm btn-primary" id="btnTeenDate">Ask Prom Date Out</button>
          `}
        </div>
      `;
    } else {
      // Adult 18+
      romanceHtml = `
        <div class="card">
          <div class="card-title-row">
            <div class="card-title"><span>❤️</span> Romantic Partner</div>
            ${p ? `<span class="pill-badge ${p.married ? 'purple' : 'emerald'}">${p.married ? 'Spouse' : 'Partner'}</span>` : `<span class="pill-badge">Single</span>`}
          </div>
          ${p ? `
            <div style="font-size: 12px; margin-bottom: 8px;">
              <div>${p.name} (${p.occupation}, Age ${p.age || age})</div>
              <div>Status: ${p.married ? (p.prenup ? 'Ironclad Prenup Signed' : 'Community Property') : 'Dating'}</div>
            </div>
            <div style="display: flex; gap: 4px;">
              ${!p.married ? `<button class="btn btn-sm btn-primary" id="btnMarry">Propose Marriage 💍</button>` : `
                <button class="btn btn-sm" id="btnBaby">Have Baby 👶</button>
                <button class="btn btn-sm" id="btnDivorce" style="color: var(--accent-rose);">Divorce</button>
              `}
            </div>
          ` : `
            <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">You are single.</p>
            <button class="btn btn-sm btn-primary" id="btnDate">Find Dating Match</button>
          `}
        </div>
      `;
    }

    vc.innerHTML = `
      ${romanceHtml}

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>👨‍👩‍👧</span> Family Parents</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${G.family.parents.map(par => `
            <div class="list-row">
              <div>
                <h4>${par.name} (${par.relation})</h4>
                <p>Age ${par.age} • ${par.alive ? 'In Good Health' : 'Passed Away'}</p>
              </div>
              ${par.alive ? `<span class="pill-badge emerald">100% Bond</span>` : `<span class="pill-badge">In Memoriam</span>`}
            </div>
          `).join("")}
        </div>
      </div>

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>👶</span> Children & Generational Heirs (${G.family.children.length})</div>
        </div>
        ${G.family.children.length === 0 ? `<p style="font-size: 11px; color: var(--text-secondary);">No children yet.</p>` : `
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${G.family.children.map((c, i) => `
              <div class="list-row">
                <div>
                  <h4>${c.name} (Age ${c.age})</h4>
                  <p>Heir Allocation: 100%</p>
                </div>
                <button class="btn btn-sm btn-primary btn-pass-torch" data-idx="${i}">Pass Torch (Play as Heir)</button>
              </div>
            `).join("")}
          </div>
        `}
      </div>

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏛️</span> Dynasty Trust & Will</div>
          ${G.family.will.dynastyTrust ? `<span class="pill-badge emerald">0% Estate Tax</span>` : `<span class="pill-badge amber">28% Tax</span>`}
        </div>
        ${!G.family.will.dynastyTrust ? `
          <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 8px;">Shield all real estate, businesses, and cash from estate taxes on succession.</p>
          <button class="btn btn-sm btn-primary" id="btnDynasty">Establish Dynasty Trust ($150k)</button>
        ` : `<span class="pill-badge emerald">Dynasty Trust Active (100% Protected)</span>`}
      </div>
    `;

    document.getElementById("btnTeenDate")?.addEventListener("click", () => {
      G.family.partner = { name: "Ananya Roy", occupation: "High School Classmate", age: age, married: false, prenup: false };
      toast("Started dating high school sweetheart Ananya Roy!", "celebrate");
      renderCurrentTab();
    });

    document.getElementById("btnBreakup")?.addEventListener("click", () => {
      G.family.partner = null;
      toast("Parted ways amicably.", "info");
      renderCurrentTab();
    });

    document.getElementById("btnDate")?.addEventListener("click", () => {
      G.family.partner = { name: "Elena Vance", occupation: "Venture Partner", age: age, married: false, prenup: false };
      toast("Started dating Elena Vance!", "celebrate");
      renderCurrentTab();
    });

    document.getElementById("btnMarry")?.addEventListener("click", () => {
      G.family.partner.married = true;
      G.family.partner.prenup = true;
      toast("💍 MARRIED! Ironclad prenuptial agreement signed!", "celebrate");
      renderCurrentTab();
    });

    document.getElementById("btnBaby")?.addEventListener("click", () => {
      const child = { name: "Devan " + G.char.lastName, age: 0 };
      G.family.children.push(child);
      toast(`👶 A baby heir is born: ${child.name}!`, "celebrate");
      renderCurrentTab();
    });

    document.getElementById("btnDivorce")?.addEventListener("click", () => {
      G.family.partner = null;
      toast("Divorce finalized. Assets protected by prenup.", "info");
      renderCurrentTab();
    });

    document.getElementById("btnDynasty")?.addEventListener("click", () => {
      if (G.fin.cash < 150000) { toast("Requires $150k legal retainer.", "error"); return; }
      G.fin.cash -= 150000;
      G.family.will.dynastyTrust = true;
      toast("🏛️ Dynasty Trust Active! Estate is now 100% tax-free!", "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.querySelectorAll(".btn-pass-torch").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        passTorchToChild(idx);
      });
    });
  }

  // TAB 6: ELITE & LIFESTYLE
  function renderLifestyleTab(vc) {
    const age = G.char.age;
    if (age < 18) {
      vc.innerHTML = `
        <div class="childhood-lock-box">
          <div class="childhood-lock-icon">🌟</div>
          <div class="childhood-lock-title">Elite Status & Biohacking Locked (Age 18+)</div>
          <div class="childhood-lock-desc">
            Ultra-high net worth tax havens, private concierges, and longevity rejuvenation protocols unlock in adulthood.<br>
            Current Age: <strong>${age}</strong>. Focus on growing up healthy and strong!
          </div>
        </div>
      `;
      return;
    }

    vc.innerHTML = `
      <div class="card" style="border-left: 3px solid var(--accent-purple);">
        <div class="card-title-row">
          <div class="card-title"><span>🌟</span> Elite Status & Tax Havens</div>
        </div>
        <div style="display: flex; gap: 4px; margin-bottom: 8px;">
          <button class="btn btn-sm btn-primary" id="btnHavenMonaco">Monaco Haven ($500k)</button>
          <button class="btn btn-sm btn-primary" id="btnHavenDubai">Dubai 0% Tax ($150k)</button>
        </div>
      </div>

      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>⏳</span> Longevity Biohacking (Live to 110+)</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div class="list-row">
            <div>
              <h4>Stem Cell Regeneration</h4>
              <p>+8 Years Lifespan</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnBioStem">Undergo ($350k)</button>
          </div>
          <div class="list-row">
            <div>
              <h4>Telomere Epigenetic Reprogramming</h4>
              <p>+15 Years Lifespan</p>
            </div>
            <button class="btn btn-sm btn-primary" id="btnBioTelo">Undergo ($1M)</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("btnHavenMonaco")?.addEventListener("click", () => {
      if (G.fin.cash < 500000) { toast("Requires $500k.", "error"); return; }
      G.fin.cash -= 500000;
      G.char.taxHaven = "Monaco";
      toast("🌴 Official resident of Monaco! 0% personal income & capital gains tax!", "celebrate");
      updateHeader();
    });

    document.getElementById("btnHavenDubai")?.addEventListener("click", () => {
      if (G.fin.cash < 150000) { toast("Requires $150k.", "error"); return; }
      G.fin.cash -= 150000;
      G.char.taxHaven = "Dubai";
      toast("🌴 Dubai Golden Visa granted! 0% personal tax!", "celebrate");
      updateHeader();
    });

    document.getElementById("btnBioStem")?.addEventListener("click", () => {
      if (G.fin.cash < 350000) { toast("Requires $350k.", "error"); return; }
      G.fin.cash -= 350000;
      G.char.maxAge += 8;
      G.stats.health = 100;
      toast("Stem cell regeneration complete! Lifespan extended!", "celebrate");
      updateHeader();
    });

    document.getElementById("btnBioTelo")?.addEventListener("click", () => {
      if (G.fin.cash < 1000000) { toast("Requires $1M.", "error"); return; }
      G.fin.cash -= 1000000;
      G.char.maxAge += 15;
      G.stats.health = 100;
      toast("Epigenetic telomere rejuvenation active! Target lifespan 110+!", "celebrate");
      updateHeader();
    });
  }

  // --- 11. CHARACTER CREATION SCREEN (BEFORE BIRTH) ---
  function showCharacterCreation() {
    const cOpts = Object.values(COUNTRIES).map(c => `<option value="${c.id}">${c.name} ${c.flag}</option>`).join("");

    modal("Create Character & Take Birth", `
      <div class="input-group">
        <label class="input-label">First Name</label>
        <input type="text" id="inFirstName" class="input-field" value="Aarav">
      </div>
      <div class="input-group">
        <label class="input-label">Last Name</label>
        <input type="text" id="inLastName" class="input-field" value="Sharma">
      </div>
      <div class="input-group">
        <label class="input-label">Gender</label>
        <select id="inGender" class="input-field">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Country of Birth</label>
        <select id="inCountry" class="input-field">${cOpts}</select>
      </div>
      <div class="input-group">
        <label class="input-label">Family Background</label>
        <select id="inFamily" class="input-field">
          <option value="middle_class">Middle Class (Comfortable Home)</option>
          <option value="affluent">Affluent Professional (Private Schooling & Wealthy Parents)</option>
          <option value="billionaire">Billionaire Dynasty (Generational Titan Family)</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Starting Trait / Talent</label>
        <select id="inTrait" class="input-field">
          <option value="prodigy">🧠 Genius IQ (+15 Smarts)</option>
          <option value="athlete">🏃 Natural Athlete (+15 Health)</option>
          <option value="star">✨ Charismatic Star (+12 Looks, +10 Happiness)</option>
          <option value="hustler">💼 Business Prodigy (+15 Commerce)</option>
        </select>
      </div>
      <button class="btn btn-emerald btn-full" id="btnConfirmBirth" style="margin-top: 6px;">Take Birth into the World (Age 0)</button>
    `);

    document.getElementById("btnConfirmBirth")?.addEventListener("click", () => {
      const fn = document.getElementById("inFirstName")?.value || "Aarav";
      const ln = document.getElementById("inLastName")?.value || "Sharma";
      const g = document.getElementById("inGender")?.value || "male";
      const c = document.getElementById("inCountry")?.value || "india";
      const fam = document.getElementById("inFamily")?.value || "middle_class";
      const tr = document.getElementById("inTrait")?.value || "prodigy";

      let parentNw = 180000;
      if (fam === "affluent") parentNw = 1200000;
      if (fam === "billionaire") parentNw = 50000000;

      G.char.firstName = fn;
      G.char.lastName = ln;
      G.char.gender = g;
      G.char.birthCountry = c;
      G.char.currentCountry = c;
      G.char.city = COUNTRIES[c].cities ? COUNTRIES[c].cities[0] : "Metropolis";
      G.char.familyWealth = fam;
      G.char.trait = tr;
      G.char.age = 0; // Starts at age 0!
      G.char.alive = true;
      G.char.generation = 1;

      // Personal wallet cash starts at $0 for newborn baby!
      G.fin.cash = 0;
      G.fin.savings = 0;
      G.fin.stocks = {};
      G.biz = [];
      G.assets.properties = [];
      G.edu.degrees = [];
      G.edu.examScores = {};
      G.edu.currentUni = null;
      G.career.job = null;
      G.family.partner = null;
      G.family.children = [];

      G.family.parents = [
        { name: "Father", relation: "Father", age: 28, alive: true, nw: parentNw },
        { name: "Mother", relation: "Mother", age: 26, alive: true, nw: parentNw }
      ];

      G.stats.smarts = tr === "prodigy" ? 92 : 80;
      G.stats.health = tr === "athlete" ? 98 : 90;
      G.stats.looks = tr === "star" ? 92 : 80;
      G.stats.happiness = 90;
      G.stats.energy = 100;
      G.stats.creditScore = null;

      G.cognition = {
        innate: {
          quantitative: tr === "prodigy" ? 78 : 55,
          verbal: tr === "prodigy" ? 72 : 52,
          spatial: tr === "prodigy" ? 70 : 50,
          workingMemory: tr === "prodigy" ? 75 : 52,
          longTermMemory: tr === "prodigy" ? 74 : 54,
          processingSpeed: tr === "prodigy" ? 72 : 52,
          patternRecognition: tr === "prodigy" ? 76 : 55,
          creativity: tr === "star" ? 78 : 52,
          abstractReasoning: tr === "prodigy" ? 77 : 54
        },
        skills: { algebra: 10, calculus: 0, statistics: 0, writing: 20, grammar: 25, economics: 0, physics: 5, chemistry: 5, biology: 10, history: 15, coding: 0, research: 5, presentation: 15 },
        traits: { focus: 55, discipline: 52, conscientiousness: 55, examTemperament: 54, consistency: 52, procrastination: 40, stressTolerance: 55, curiosity: 60, ambition: 55, confidence: 55 }
      };

      G.highSchool = initHighSchoolState(G);

      G.yearActions = {
        actionsDone: {},
        specialRelease: false,
        renoDone: {},
        pocketMoneyTaken: false,
        choresDone: false,
        napTaken: false,
        overtimeDone: false,
        networkingDone: false
      };

      G.childhood = {
        preschoolChoice: null,
        primaryHobby: null,
        streamChoice: null,
        coachingChoice: null,
        class10Score: null,
        class12Score: null,
        upscAttempts: 0
      };

      G.ledger = [
        { age: 0, headline: "Born into the World", text: `You were born in ${G.char.city}, ${COUNTRIES[c].name} ${COUNTRIES[c].flag}. A full childhood and life lies ahead.` }
      ];

      closeModal();
      calcNW();
      updateHeader();
      switchTab("profile");
      toast(`Welcome to life, ${fn}! You are 0 years old!`, "celebrate");
    });
  }

  // --- 12. INITIALIZATION ON DOM READY ---
  function init() {
    // Tab event bindings
    document.querySelectorAll(".nav-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        switchTab(tab.dataset.tab);
      });
    });

    // Age-up button
    const btnAge = document.getElementById("btnAgeUp");
    if (btnAge) {
      btnAge.addEventListener("click", ageUp);
    }

    // New Life button
    const btnNew = document.getElementById("btnNewLife");
    if (btnNew) {
      btnNew.addEventListener("click", showCharacterCreation);
    }

    // Modal close
    document.getElementById("modalClose")?.addEventListener("click", closeModal);
    document.getElementById("modalOverlay")?.addEventListener("click", (e) => {
      if (e.target.id === "modalOverlay") closeModal();
    });

    // Initial render
    updateHeader();
    renderCurrentTab();

    // Show Character creation if brand new
    if (G.char.age === 0 && G.ledger.length <= 1 && G.fin.cash === 0) {
      setTimeout(showCharacterCreation, 300);
    }
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }

  if (typeof window !== "undefined") {
    window.LifeSim = {
      G,
      BUSINESS_SECTORS,
      CAPITAL_TIERS,
      ECONOMIC_ENGINES,
      BUSINESS_CATALOG,
      FUNDING_SOURCES,
      DIRECTOR_ARCHETYPES,
      SCALE_TIERS,
      evaluateEngine,
      calculateAnnualCorporateFinancials,
      calculateFounderPitchScore,
      generateTermSheets,
      negotiateTermSheet,
      executeFinancingRound,
      stepBoardAnnual,
      executeCoupDefense,
      stepOrgAnnual,
      reallocateAttentionUnits
    };
  }

})();
