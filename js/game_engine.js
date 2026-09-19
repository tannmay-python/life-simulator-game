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
    if (nameEl) nameEl.innerHTML = `${G.char.firstName} ${G.char.lastName} <span style="font-size: 13px; color: var(--text-tertiary); margin-left: 4px;">· ${c.name}</span>`;

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
      subEl.innerText = `Age ${G.char.age} · Gen ${G.char.generation} · ${role}`;
    }

    const nextAgeEl = document.getElementById("ageUpNext");
    if (nextAgeEl) nextAgeEl.innerText = `Age ${G.char.age + 1}`;

    const nwEl = document.getElementById("headerNetWorth");
    if (nwEl) nwEl.innerText = `$${G.fin.netWorth.toLocaleString()}`;

    // Update 5 vitality progress bars
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
    const cleanMsg = (msg || "")
      .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[!！]+$/, '')
      .trim();
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<span>${cleanMsg}</span>`;
    box.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      t.style.transform = "translateY(-4px)";
      t.style.transition = "all 0.2s ease";
      setTimeout(() => {
        if (t && t.parentNode) t.parentNode.removeChild(t);
      }, 200);
    }, 3000);
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
      toast("Annual limit reached for this activity. Age up to advance.", "error");
      return false;
    }
    if (G.stats.energy < cost) {
      toast(`Insufficient energy (${G.stats.energy}% available, ${cost}% required). Age up to recover.`, "error");
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

    modal("Early Preschool & Daycare (Age 3)", `
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
      { id: "coding", name: "Robotics & Early Programming", boost: "smarts", gain: 8, desc: "Build logic, algorithmic thinking and computer literacy." },
      { id: "chess", name: "Competitive Chess Training", boost: "smarts", gain: 8, desc: "Tactical foresight, analytical problem solving and patience." },
      { id: "swimming", name: "Junior Swimming & Athletics", boost: "health", gain: 10, desc: "Physical endurance, cardio stamina and athletic discipline." },
      { id: "piano", name: "Classical Piano & Music", boost: "looks", gain: 6, happyGain: 6, desc: "Creative expression, rhythm and stage presence." }
    ];

    modal("Childhood Passion & Extracurriculars (Age 7)", `
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
    modal(`Class 10 Boards Result (${G.childhood.class10Score}%): Select Senior Secondary Stream`, `
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
        Outstanding performance on your Class 10 Board Examinations! You must now select your Senior Secondary (Class 11 & 12) academic stream. This choice dictates your future competitive entrance exams and college eligibility!
      </p>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <div>
              <h4 style="font-size: 12px;">Science PCM (Physics, Chemistry, Math)</h4>
              <span class="pill-badge blue" style="font-size: 8px;">Prerequisite for JEE Main & Advanced</span>
            </div>
            <button class="btn btn-sm btn-primary btn-choose-stream-modal" data-stream="pcm">Select PCM</button>
          </div>
          <p style="font-size: 10px; color: var(--text-secondary);">Target IIT Bombay, IIT Delhi, BITS Pilani & Computer Science Engineering.</p>
        </div>

        <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <div>
              <h4 style="font-size: 12px;">Science PCB (Physics, Chemistry, Biology)</h4>
              <span class="pill-badge emerald" style="font-size: 8px;">Prerequisite for NEET UG</span>
            </div>
            <button class="btn btn-sm btn-primary btn-choose-stream-modal" data-stream="pcb">Select PCB</button>
          </div>
          <p style="font-size: 10px; color: var(--text-secondary);">Target AIIMS New Delhi, Premier Medical Colleges & MBBS Degree.</p>
        </div>

        <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <div>
              <h4 style="font-size: 12px;">Commerce & Mathematics</h4>
              <span class="pill-badge amber" style="font-size: 8px;">For SRCC, CA & Finance</span>
            </div>
            <button class="btn btn-sm btn-primary btn-choose-stream-modal" data-stream="commerce">Select Commerce</button>
          </div>
          <p style="font-size: 10px; color: var(--text-secondary);">Target SRCC Delhi University, Chartered Accountancy (CA) & Corporate Finance.</p>
        </div>

        <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px;">
          <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
            <div>
              <h4 style="font-size: 12px;">Humanities / Arts & Law</h4>
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

    modal("Competitive Coaching Academy Enrollment (Age 17)", `
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

    modal(`UPSC Civil Services — Stage 1 Cleared`, `
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

    modal(`In Memoriam (Age ${G.char.age})`, `
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
    const bCountry = COUNTRIES[G.char.birthCountry] || COUNTRIES.india;
    const age = G.char.age;
    const actionsDone = G.yearActions?.actionsDone || {};

    const ledgerHtml = G.ledger.slice().reverse().map(item => {
      const cleanHeadline = (item.headline || "").replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[!！]+$/, '').trim();
      return `
        <div class="ledger-row">
          <div class="ledger-age">Age ${item.age}</div>
          <div class="ledger-body">
            <div class="ledger-headline">${cleanHeadline}</div>
            ${(item.logs || (item.text ? [item.text] : [])).map(log => {
              const cleanLog = log.replace(/^[•·\s]+/, '').replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[!！]+$/, '').trim();
              return `<div class="ledger-logs">${cleanLog}</div>`;
            }).join("")}
          </div>
          <div class="ledger-cash">
            ${item.cashDelta !== undefined ? `${item.cashDelta >= 0 ? '+' : ''}$${Math.round(item.cashDelta).toLocaleString()}` : (item.cashChangeUSD ? `${item.cashChangeUSD >= 0 ? '+' : ''}$${Math.round(item.cashChangeUSD).toLocaleString()}` : '')}
          </div>
        </div>
      `;
    }).join("");

    // Stage-Appropriate Life Actions
    let stageTitle = "Adulthood actions";
    let actionsHtml = "";

    if (age <= 2) {
      stageTitle = "Infancy actions";
      const napDone = (actionsDone["nap"] || 0) >= 1;
      actionsHtml = `
        <button class="action-btn" id="btnActCuddle" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">favorite</span>
            <span class="action-btn-label">Cuddle parents</span>
          </div>
          <span class="action-btn-meta">⚡ 20 · ${actionsDone["cuddle"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActRattle" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">toys</span>
            <span class="action-btn-label">Play rattles</span>
          </div>
          <span class="action-btn-meta">⚡ 20 · ${actionsDone["rattle"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActCrawl" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">directions_walk</span>
            <span class="action-btn-label">Learn to walk</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["crawl"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActNap" type="button" ${napDone ? 'disabled' : ''}>
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">bedtime</span>
            <span class="action-btn-label">Afternoon nap</span>
          </div>
          <span class="action-btn-meta">+30 ⚡ · ${napDone ? 'Done' : '1/yr'}</span>
        </button>
      `;
    } else if (age >= 3 && age <= 5) {
      stageTitle = "Toddler & preschool activities";
      actionsHtml = `
        <button class="action-btn" id="btnActPaint" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">palette</span>
            <span class="action-btn-label">Finger paint</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["paint"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActPhonics" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">spellcheck</span>
            <span class="action-btn-label">Phonics and ABCs</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["phonics"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActPlayground" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">park</span>
            <span class="action-btn-label">Playground fun</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["playground"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActPuzzles" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">extension</span>
            <span class="action-btn-label">Shape blocks</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["puzzles"] || 0}/2</span>
        </button>
      `;
    } else if (age >= 6 && age <= 10) {
      stageTitle = "Primary school activities";
      const moneyDone = (actionsDone["pocket_money"] || 0) >= 1;
      actionsHtml = `
        <button class="action-btn" id="btnActSoccer" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">sports_soccer</span>
            <span class="action-btn-label">Play tag and soccer</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["soccer"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActBicycle" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">pedal_bike</span>
            <span class="action-btn-label">Ride bicycle</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["bicycle"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActBooks" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">menu_book</span>
            <span class="action-btn-label">Science books</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["books"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActPocketMoney" type="button" ${moneyDone ? 'disabled' : ''}>
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">payments</span>
            <span class="action-btn-label">Ask pocket money</span>
          </div>
          <span class="action-btn-meta">⚡ 15 · ${moneyDone ? 'Done' : '1/yr'}</span>
        </button>
      `;
    } else if (age >= 11 && age <= 14) {
      stageTitle = "Middle school activities";
      const choresDone = (actionsDone["chores"] || 0) >= 1;
      actionsHtml = `
        <button class="action-btn" id="btnActTermExam" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">school</span>
            <span class="action-btn-label">Study for exams</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["term_exam"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActChessClub" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">emoji_events</span>
            <span class="action-btn-label">School chess club</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["chess_club"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActGaming" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">sports_esports</span>
            <span class="action-btn-label">Gaming squad</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["gaming"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActChores" type="button" ${choresDone ? 'disabled' : ''}>
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">cleaning_services</span>
            <span class="action-btn-label">Household chores</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${choresDone ? 'Done' : '1/yr'}</span>
        </button>
      `;
    } else if (age >= 15 && age <= 17) {
      stageTitle = "High school activities";
      const hustleDone = (actionsDone["side_hustle"] || 0) >= 1;
      actionsHtml = `
        <button class="action-btn" id="btnActBoardPrep" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">history_edu</span>
            <span class="action-btn-label">Intensive study</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["board_prep"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActTrack" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">directions_run</span>
            <span class="action-btn-label">Varsity track</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["track"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActSquad" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">coffee</span>
            <span class="action-btn-label">Squad hangout</span>
          </div>
          <span class="action-btn-meta">⚡ 20 · ${actionsDone["squad"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnActHustle" type="button" ${hustleDone ? 'disabled' : ''}>
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">work</span>
            <span class="action-btn-label">Teen hustle</span>
          </div>
          <span class="action-btn-meta">⚡ 30 · ${hustleDone ? 'Done' : '1/yr'}</span>
        </button>
      `;
    } else {
      // Adulthood (18+)
      stageTitle = "Adult wellness and activities";
      actionsHtml = `
        <button class="action-btn" id="btnGym" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">fitness_center</span>
            <span class="action-btn-label">Gym and fitness</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["gym"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnStudy" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">psychology</span>
            <span class="action-btn-label">Advanced research</span>
          </div>
          <span class="action-btn-meta">⚡ 25 · ${actionsDone["study"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnMeditate" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">self_improvement</span>
            <span class="action-btn-label">Mindfulness</span>
          </div>
          <span class="action-btn-meta">⚡ 20 · ${actionsDone["meditate"] || 0}/2</span>
        </button>
        <button class="action-btn" id="btnSalon" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">content_cut</span>
            <span class="action-btn-label">Styling salon</span>
          </div>
          <span class="action-btn-meta">$200 · ⚡ 20 · ${actionsDone["salon"] || 0}/2</span>
        </button>
      `;
    }

    vc.innerHTML = `
      <section style="padding-top: 8px;">
        <!-- Identity Section -->
        <h2 class="section-heading first">Identity</h2>
        <div class="detail-grid">
          <div>
            <div class="detail-label">Birth city</div>
            <div class="detail-val">${G.char.city}, ${c.name}</div>
          </div>
          <div>
            <div class="detail-label">Family tier</div>
            <div class="detail-val" style="text-transform: capitalize;">${G.char.familyWealth.replace("_", " ")}</div>
          </div>
          <div>
            <div class="detail-label">Credit score</div>
            <div class="detail-val-mono">${G.stats.creditScore ? G.stats.creditScore + ' FICO' : '—'}</div>
          </div>
          <div>
            <div class="detail-label">Societal standing</div>
            <div class="detail-val-mono">${G.stats.prestige || 10}<span style="color: var(--text-tertiary);">/100</span></div>
          </div>
        </div>

        <!-- Actions Section -->
        <h2 class="section-heading">${stageTitle}</h2>
        <div class="actions-grid">
          ${actionsHtml}
        </div>

        <!-- Ledger Section -->
        <h2 class="section-heading">Ledger</h2>
        <div>
          ${ledgerHtml}
        </div>
      </section>
    `;

    // Bind Stage Action Click Handlers
    if (age <= 2) {
      document.getElementById("btnActCuddle")?.addEventListener("click", () => {
        if (!consumeEnergy(20, "cuddle", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 6);
        G.stats.health = Math.min(100, G.stats.health + 2);
        toast("Cuddled in parents' warm embrace (+Happiness, +Health)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActRattle")?.addEventListener("click", () => {
        if (!consumeEnergy(20, "rattle", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 5);
        G.stats.smarts = Math.min(100, G.stats.smarts + 2);
        toast("Played with musical rattles and wooden blocks (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActCrawl")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "crawl", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 5);
        toast("Practiced crawling and standing on toddler legs (+Health)", "celebrate");
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
        toast("Deep peaceful nap restored +30% Energy", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else if (age >= 3 && age <= 5) {
      document.getElementById("btnActPaint")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "paint", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 6);
        G.stats.looks = Math.min(100, G.stats.looks + 2);
        toast("Made colorful finger paintings (+Happiness)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActPhonics")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "phonics", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 6);
        toast("Mastered phonics and early alphabet sounds (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActPlayground")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "playground", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 6);
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast("Slid down the slide and ran in the sandpit (+Health, +Happy)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActPuzzles")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "puzzles", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 6);
        toast("Solved 3D geometric shape puzzles (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else if (age >= 6 && age <= 10) {
      document.getElementById("btnActSoccer")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "soccer", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 6);
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast("Scored goals in schoolyard soccer (+Health, +Happy)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActBicycle")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "bicycle", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 5);
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast("Rode your bicycle around the neighborhood (+Health)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActBooks")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "books", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 6);
        toast("Read illustrated space and dinosaur encyclopedias (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActPocketMoney")?.addEventListener("click", () => {
        if (!consumeEnergy(15, "pocket_money", 1)) return;
        let amt = G.char.familyWealth === "billionaire" ? 150 : (G.char.familyWealth === "affluent" ? 60 : 25);
        G.fin.cash += amt;
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast(`Parents gave you $${amt} pocket money allowance`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else if (age >= 11 && age <= 14) {
      document.getElementById("btnActTermExam")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "term_exam", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 6);
        toast("Reviewed algebra and science notes for term exams (+Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActChessClub")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "chess_club", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 5);
        G.stats.prestige = Math.min(100, G.stats.prestige + 3);
        toast("Won middle school chess tournament match (+Smarts, +Prestige)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActGaming")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "gaming", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 8);
        toast("Crushed an online multiplayer session with classmates (+Happiness)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActChores")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "chores", 1)) return;
        let amt = G.char.familyWealth === "billionaire" ? 300 : (G.char.familyWealth === "affluent" ? 120 : 60);
        G.fin.cash += amt;
        toast(`Completed household chores and earned $${amt} allowance`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else if (age >= 15 && age <= 17) {
      document.getElementById("btnActBoardPrep")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "board_prep", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 7);
        toast("Solved past 10 years' question papers (+7 Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActTrack")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "track", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 6);
        G.stats.looks = Math.min(100, G.stats.looks + 3);
        toast("Ran varsity track and conditioning drills (+Health, +Looks)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActSquad")?.addEventListener("click", () => {
        if (!consumeEnergy(20, "squad", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 7);
        toast("Hung out at the local cafe with your high school squad (+Happiness)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnActHustle")?.addEventListener("click", () => {
        if (!consumeEnergy(30, "side_hustle", 1)) return;
        let amt = 400 + Math.round(G.stats.smarts * 4);
        G.fin.cash += amt;
        toast(`Worked tutoring and coding side gig, earned $${amt}`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    } else {
      // Adult 18+
      document.getElementById("btnGym")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "gym", 2)) return;
        G.stats.health = Math.min(100, G.stats.health + 5);
        G.stats.looks = Math.min(100, G.stats.looks + 3);
        toast("Completed weight training session (+5 Health, +3 Looks)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnStudy")?.addEventListener("click", () => {
        if (!consumeEnergy(25, "study", 2)) return;
        G.stats.smarts = Math.min(100, G.stats.smarts + 5);
        toast("Conducted deep research into mathematics and markets (+5 Smarts)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnMeditate")?.addEventListener("click", () => {
        if (!consumeEnergy(20, "meditate", 2)) return;
        G.stats.happiness = Math.min(100, G.stats.happiness + 7);
        toast("Mindfulness meditation cleared mental fog (+7 Happiness)", "celebrate");
        updateHeader();
        renderCurrentTab();
      });
      document.getElementById("btnSalon")?.addEventListener("click", () => {
        if (G.fin.cash < 200) { toast("Insufficient cash for styling salon ($200).", "error"); return; }
        if (!consumeEnergy(20, "salon", 2)) return;
        G.fin.cash -= 200;
        G.stats.looks = Math.min(100, G.stats.looks + 6);
        G.stats.happiness = Math.min(100, G.stats.happiness + 4);
        toast("Salon styling complete (+6 Looks)", "celebrate");
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
      exerciseVarsity: 7,
      socialFamily: 14,
      paidWork: 0,
      selfStudyResearch: 7,
      idleDowntime: 10
    };

    return {
      timeAllocation: defaultAlloc,
      unallocatedHours: 0,
      burnoutIndex: 12,
      sleepDeprivationIndex: 0,
      academicStanding: "Good Standing",
      currentTermGPA: 3.85,
      cumulativeGPA: 3.82,
      classRankDecile: 4,
      subjectGrades: {
        mathematics: 92,
        physics: 88,
        chemistry: 85,
        englishLiterature: 90,
        computerScience: 95
      },
      classmates: [
        { name: "Rohan Verma", tier: "Study Buddy", affection: 75, status: "Active" },
        { name: "Ananya Iyer", tier: "Academic Rival", affection: 45, status: "Active" },
        { name: "Vikram Malhotra", tier: "Close Friend", affection: 85, status: "Active" }
      ],
      teachers: [
        { name: "Dr. K. S. Ramanujan", subject: "Mathematics", strictness: 8, favorability: 70 },
        { name: "Prof. Sarah Jenkins", subject: "English Literature", strictness: 5, favorability: 82 }
      ],
      clubs: ["Robotics & AI Club", "Competitive Chess"],
      studentJobs: [],
      targetColleges: [
        { name: "IIT Bombay", country: "India", reachLevel: "Reach", status: "Preparing" },
        { name: "Stanford University", country: "USA", reachLevel: "Dream", status: "Preparing" }
      ],
      recommendationLetters: [],
      collegeEssays: [
        { topic: "Personal Growth & Algorithmic Discovery", draftScore: 78, polished: false }
      ],
      awardsAchievements: ["National Science Olympiad State Finalist"],
      disciplinaryRecord: []
    };
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
        <div class="surface-box" style="padding: 18px 20px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div>
              <div style="font-size: 12px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.4px;">
                ${schoolName}
              </div>
              <div style="font-size: 16px; margin-top: 2px;">
                Grade ${Math.max(1, Math.min(12, age - 5))} · Term GPA <span class="mono-val">${(hs.currentTermGPA || 3.85).toFixed(2)}</span>
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 12px; color: var(--text-tertiary);">Class rank</div>
              <div class="mono-val" style="margin-top: 2px;">Top ${hs.classRankDecile || 5}%ile</div>
            </div>
          </div>
        </div>

        <!-- 8-Subtab Horizontal Navigation Strip -->
        <div class="subtabs-bar">
          <button class="subtab-btn ${schoolSubTab === 'overview' ? 'active' : ''}" data-schooltab="overview" type="button">Overview</button>
          <button class="subtab-btn ${schoolSubTab === 'academics' ? 'active' : ''}" data-schooltab="academics" type="button">Academics</button>
          <button class="subtab-btn ${schoolSubTab === 'people' ? 'active' : ''}" data-schooltab="people" type="button">People</button>
          <button class="subtab-btn ${schoolSubTab === 'activities' ? 'active' : ''}" data-schooltab="activities" type="button">Activities</button>
          <button class="subtab-btn ${schoolSubTab === 'career' ? 'active' : ''}" data-schooltab="career" type="button">Career</button>
          <button class="subtab-btn ${schoolSubTab === 'applications' ? 'active' : ''}" data-schooltab="applications" type="button">College prep</button>
          <button class="subtab-btn ${schoolSubTab === 'family' ? 'active' : ''}" data-schooltab="family" type="button">Family & aid</button>
          <button class="subtab-btn ${schoolSubTab === 'records' ? 'active' : ''}" data-schooltab="records" type="button">Records</button>
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

  function renderOverviewSubtab(G, hs) {
    const alloc = hs.timeAllocation || {};
    const totalAllocated = Object.values(alloc).reduce((a, b) => a + Number(b), 0);
    const unallocated = 168 - totalAllocated;

    return `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
        <h2 class="section-heading first" style="margin: 0;">Weekly time budget</h2>
        <span class="mono-sm" style="color: ${unallocated < 0 ? 'var(--accent-rose)' : 'var(--text-secondary)'};">
          ${totalAllocated}/168h (${unallocated >= 0 ? '+' : ''}${unallocated}h unallocated)
        </span>
      </div>

      <div class="surface-box" style="padding: 16px 20px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px 24px;">
          ${renderSliderRow("sleep", "Sleep", alloc.sleep, 35, 70)}
          ${renderSliderRow("schoolClasses", "School classes", alloc.schoolClasses, 25, 45)}
          ${renderSliderRow("homework", "Homework & assignments", alloc.homework, 0, 35)}
          ${renderSliderRow("examCoaching", "Coaching & prep", alloc.examCoaching, 0, 35)}
          ${renderSliderRow("selfStudyResearch", "Self-study & research", alloc.selfStudyResearch, 0, 30)}
          ${renderSliderRow("activitiesClubs", "Clubs & leadership", alloc.activitiesClubs, 0, 25)}
          ${renderSliderRow("exerciseVarsity", "Fitness & sports", alloc.exerciseVarsity, 0, 25)}
          ${renderSliderRow("socialFamily", "Social & family", alloc.socialFamily, 0, 35)}
          ${renderSliderRow("paidWork", "Student employment", alloc.paidWork, 0, 25)}
          ${renderSliderRow("idleDowntime", "Rest & recovery", alloc.idleDowntime, 0, 35)}
        </div>
      </div>

      <h2 class="section-heading">Physiological indicators</h2>
      <div class="detail-grid">
        <div>
          <div class="detail-label">Weekly sleep</div>
          <div class="detail-val-mono">${alloc.sleep}h <span style="font-size: 11px; color: var(--text-tertiary);">(${(alloc.sleep / 7).toFixed(1)}h/day)</span></div>
        </div>
        <div>
          <div class="detail-label">Burnout index</div>
          <div class="detail-val-mono">${hs.burnoutIndex || 12}/100</div>
        </div>
        <div>
          <div class="detail-label">Sleep deficit</div>
          <div class="detail-val-mono">${hs.sleepDeprivationIndex || 0}h</div>
        </div>
        <div>
          <div class="detail-label">Academic standing</div>
          <div class="detail-val">${hs.academicStanding || 'Good Standing'}</div>
        </div>
      </div>
    `;
  }

  function renderSliderRow(key, label, val, min, max) {
    return `
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
          <span style="color: var(--text-secondary);">${label}</span>
          <span class="mono-val" id="val_${key}">${val}h</span>
        </div>
        <input type="range" class="time-slider" data-key="${key}" min="${min}" max="${max}" value="${val}" style="width: 100%; accent-color: var(--accent-ink); cursor: pointer;">
      </div>
    `;
  }

  function renderAcademicsSubtab(G, hs) {
    const subjects = hs.subjectGrades || { mathematics: 92, physics: 88, chemistry: 85, englishLiterature: 90, computerScience: 95 };
    return `
      <h2 class="section-heading first">Subject mastery</h2>
      <div>
        ${Object.entries(subjects).map(([subj, grade]) => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px; text-transform: capitalize;">${subj.replace(/([A-Z])/g, ' $1')}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                Term grade · Standard curriculum
              </div>
            </div>
            <div style="display: flex; align-items: baseline; gap: 12px;">
              <div class="mono-val" style="font-size: 15px;">${grade}%</div>
              <button class="btn btn-outline btn-sm btn-study-subject" data-subject="${subj}" type="button">Study</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderPeopleSubtab(G, hs) {
    const classmates = hs.classmates || [];
    const teachers = hs.teachers || [];
    return `
      <h2 class="section-heading first">Classmates & cohorts</h2>
      <div>
        ${classmates.map((c, i) => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${c.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${c.tier} · Affection ${c.affection}%</div>
            </div>
            <button class="btn btn-outline btn-sm btn-interact-classmate" data-idx="${i}" type="button">Interact</button>
          </div>
        `).join("")}
      </div>

      <h2 class="section-heading">Faculty & teachers</h2>
      <div>
        ${teachers.map((t, i) => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${t.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${t.subject} · Strictness ${t.strictness}/10</div>
            </div>
            <button class="btn btn-outline btn-sm btn-office-hours" data-idx="${i}" type="button">Office hours</button>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderActivitiesSubtab(G, hs) {
    const clubs = hs.clubs || [];
    return `
      <h2 class="section-heading first">Extracurricular leadership</h2>
      <div>
        ${clubs.map(club => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${club}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">Active member</div>
            </div>
            <button class="btn btn-outline btn-sm btn-compete-club" data-club="${club}" type="button">Compete</button>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderCareerSubtab(G, hs) {
    const jobs = hs.studentJobs || [];
    return `
      <h2 class="section-heading first">Student employment</h2>
      <div>
        ${jobs.length === 0 ? `
          <div class="surface-box" style="padding: 24px; text-align: center;">
            <div style="font-size: 15px; font-weight: 500; margin-bottom: 6px;">No active employment</div>
            <p style="font-size: 13px; color: var(--text-secondary); margin: 0 auto 16px; max-width: 360px;">
              Apply for student fellowships, tutoring roles, or technical internships to build early commercial acumen.
            </p>
            <button class="btn btn-primary btn-sm btn-find-student-job" type="button">Browse student jobs</button>
          </div>
        ` : jobs.map(j => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${j.title}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">$${j.hourlyRateUSD}/hr · ${j.hoursPerWeek}h/wk</div>
            </div>
            <div class="mono-val">$${j.hourlyRateUSD * j.hoursPerWeek * 52}/yr</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderApplicationsSubtab(G, hs) {
    const targets = hs.targetColleges || [];
    const essays = hs.collegeEssays || [];
    return `
      <h2 class="section-heading first">Admissions portfolio</h2>
      <div>
        ${targets.map(t => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${t.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${t.country} · ${t.reachLevel}</div>
            </div>
            <span class="mono-sm" style="color: var(--accent-emerald);">${t.status}</span>
          </div>
        `).join("")}
      </div>

      <h2 class="section-heading">Application essays</h2>
      <div>
        ${essays.map((e, idx) => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${e.topic}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">Draft score <span class="mono-val">${e.draftScore}</span>/100</div>
            </div>
            <button class="btn btn-outline btn-sm btn-polish-essay" data-idx="${idx}" type="button">Polish draft</button>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderFamilySubtab(G, hs) {
    return `
      <h2 class="section-heading first">Parental expectations & aid</h2>
      <div class="detail-grid">
        <div>
          <div class="detail-label">Family wealth tier</div>
          <div class="detail-val" style="text-transform: capitalize;">${G.char.familyWealth.replace("_", " ")}</div>
        </div>
        <div>
          <div class="detail-label">College budget allocation</div>
          <div class="detail-val-mono">${G.char.familyWealth === 'billionaire' ? 'Full Sponsorship (Any)' : (G.char.familyWealth === 'affluent' ? '$180,000 Total' : '$35,000 Total')}</div>
        </div>
      </div>
      <div style="margin-top: 14px;">
        <button class="btn btn-outline btn-sm" id="btnRequestTuitionSupport" type="button">Negotiate tuition support</button>
      </div>
    `;
  }

  function renderRecordsSubtab(G, hs) {
    const awards = hs.awardsAchievements || [];
    return `
      <h2 class="section-heading first">Academic honors & achievements</h2>
      <div>
        ${awards.map(a => `
          <div class="list-row">
            <div style="font-size: 15px;">${a}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function attachSchoolCockpitListeners(G, renderCallback) {
    const hs = G.highSchool || initHighSchoolState(G);

    document.querySelectorAll(".subtab-btn[data-schooltab]").forEach(btn => {
      btn.addEventListener("click", () => {
        schoolSubTab = btn.dataset.schooltab;
        renderCallback();
      });
    });

    document.querySelectorAll(".time-slider").forEach(slider => {
      slider.addEventListener("input", (e) => {
        const key = e.target.dataset.key;
        const val = parseInt(e.target.value, 10);
        if (hs.timeAllocation) {
          hs.timeAllocation[key] = val;
        }
        const valEl = document.getElementById(`val_${key}`);
        if (valEl) valEl.textContent = `${val}h`;
      });
      slider.addEventListener("change", () => {
        renderCallback();
      });
    });

    document.querySelectorAll(".btn-study-subject").forEach(btn => {
      btn.addEventListener("click", () => {
        const subj = btn.dataset.subject;
        if (!consumeEnergy(15, "study_subj", 3)) return;
        if (hs.subjectGrades && hs.subjectGrades[subj] !== undefined) {
          hs.subjectGrades[subj] = Math.min(100, hs.subjectGrades[subj] + 3);
        }
        toast(`Studied ${subj} (+Mastery)`, "celebrate");
        updateHeader();
        renderCallback();
      });
    });

    document.querySelectorAll(".btn-interact-classmate").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        if (!consumeEnergy(10, "interact_class", 3)) return;
        if (hs.classmates && hs.classmates[idx]) {
          hs.classmates[idx].affection = Math.min(100, hs.classmates[idx].affection + 6);
        }
        toast("Socialized with classmate (+Affection)", "celebrate");
        updateHeader();
        renderCallback();
      });
    });

    document.querySelectorAll(".btn-office-hours").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        if (!consumeEnergy(15, "office_hrs", 2)) return;
        if (hs.teachers && hs.teachers[idx]) {
          hs.teachers[idx].favorability = Math.min(100, hs.teachers[idx].favorability + 8);
        }
        toast("Attended faculty office hours (+Favorability)", "celebrate");
        updateHeader();
        renderCallback();
      });
    });

    document.querySelectorAll(".btn-compete-club").forEach(btn => {
      btn.addEventListener("click", () => {
        const club = btn.dataset.club;
        if (!consumeEnergy(20, "compete_club", 2)) return;
        G.stats.prestige = Math.min(100, G.stats.prestige + 3);
        toast(`Competed in ${club} regional match (+Prestige)`, "celebrate");
        updateHeader();
        renderCallback();
      });
    });

    document.querySelectorAll(".btn-polish-essay").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        if (!consumeEnergy(20, "polish_essay", 2)) return;
        if (hs.collegeEssays && hs.collegeEssays[idx]) {
          hs.collegeEssays[idx].draftScore = Math.min(100, hs.collegeEssays[idx].draftScore + 5);
        }
        toast("Polished admissions essay draft (+Score)", "celebrate");
        updateHeader();
        renderCallback();
      });
    });

    document.getElementById("btnRequestTuitionSupport")?.addEventListener("click", () => {
      toast("Discussed college financing with parents. Support confirmed.", "celebrate");
    });
  }

  // TAB 2: EDUCATION & CAREER TAB
  let eduViewSub = "school"; // "school", "corporate", "special"
  function renderEducationCareerTab(vc) {
    const c = COUNTRIES[G.char.birthCountry] || COUNTRIES.india;
    const hasDegree = G.edu.degrees.length > 0;

    vc.innerHTML = `
      <div class="subtabs-bar">
        <button class="subtab-btn ${eduViewSub === 'school' ? 'active' : ''}" id="subtabSchool" type="button">Schooling</button>
        <button class="subtab-btn ${eduViewSub === 'corporate' ? 'active' : ''}" id="subtabCorp" type="button">Corporate</button>
        <button class="subtab-btn ${eduViewSub === 'special' ? 'active' : ''}" id="subtabSpec" type="button">Special</button>
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
      <h2 class="section-heading first">Academic standing</h2>
      <div class="detail-grid">
        <div>
          <div class="detail-label">Institution / Degree</div>
          <div class="detail-val">${G.edu.currentUni ? G.edu.currentUni.name : (c.name + ' Academic Framework')}</div>
        </div>
        <div>
          <div class="detail-label">Stage</div>
          <div class="detail-val">${G.edu.currentUni ? `Year ${G.edu.currentUni.year} of ${G.edu.currentUni.totalYears}` : G.edu.stage}</div>
        </div>
        <div>
          <div class="detail-label">Class 10 boards</div>
          <div class="detail-val-mono">${G.childhood.class10Score ? G.childhood.class10Score + '%' : '—'}</div>
        </div>
        <div>
          <div class="detail-label">Class 12 boards</div>
          <div class="detail-val-mono">${G.childhood.class12Score ? G.childhood.class12Score + '%' : '—'}</div>
        </div>
      </div>

      ${G.edu.degrees.length > 0 ? `
        <h2 class="section-heading">Conferred degrees</h2>
        <div>
          ${G.edu.degrees.map(d => `
            <div class="list-row">
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 15px;">${d.title}</div>
                <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${d.uni}</div>
              </div>
              <span class="mono-sm">Conferred</span>
            </div>
          `).join("")}
        </div>
      ` : ''}

      <!-- HIGH SCHOOL ENTRANCE EXAMS -->
      <h2 class="section-heading">Examinations</h2>
      <div>
        <!-- JEE -->
        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">JEE Main & Advanced</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              For IIT Bombay & IIT Delhi · Requires Science PCM
            </div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px;">
            ${G.edu.examScores.jee ? `<span class="mono-val" style="font-size: 15px;">${G.edu.examScores.jee}%ile</span>` : `
              <button class="btn btn-outline btn-sm btn-take-exam" data-exam="jee" ${stream !== 'pcm' || age < 16 ? 'disabled' : ''}>
                ${stream === 'pcm' && age >= 16 ? 'Take JEE ($40)' : 'Locked'}
              </button>
            `}
          </div>
        </div>

        <!-- NEET -->
        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">NEET UG</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              For AIIMS New Delhi MBBS · Requires Science PCB
            </div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px;">
            ${G.edu.examScores.neet ? `<span class="mono-val" style="font-size: 15px;">${G.edu.examScores.neet}/720</span>` : `
              <button class="btn btn-outline btn-sm btn-take-exam" data-exam="neet" ${stream !== 'pcb' || age < 16 ? 'disabled' : ''}>
                ${stream === 'pcb' && age >= 16 ? 'Take NEET ($30)' : 'Locked'}
              </button>
            `}
          </div>
        </div>

        <!-- SAT -->
        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">SAT Reasoning Test</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              Standardized benchmark for US & UK global admissions
            </div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px;">
            ${G.edu.examScores.sat ? `<span class="mono-val" style="font-size: 15px;">${G.edu.examScores.sat}/1600</span>` : `
              <button class="btn btn-outline btn-sm btn-take-exam" data-exam="sat" ${age < 15 ? 'disabled' : ''}>
                ${age >= 15 ? 'Take SAT ($110)' : 'Locked'}
              </button>
            `}
          </div>
        </div>

        <!-- UPSC -->
        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">UPSC Civil Services Examination</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              IAS / IPS · Strictly requires Bachelor's Degree & Age 21+
            </div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px;">
            ${G.edu.examScores.upsc ? `<span class="mono-val" style="font-size: 15px;">${G.edu.examScores.upsc}</span>` : `
              <button class="btn btn-outline btn-sm btn-take-exam" data-exam="upsc" ${!hasDegree || age < 21 ? 'disabled' : ''}>
                ${hasDegree && age >= 21 ? 'Attempt UPSC' : 'Locked'}
              </button>
            `}
          </div>
        </div>

        <!-- CAT -->
        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">Common Admission Test (CAT)</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              For IIM Ahmedabad & Bangalore MBA · Strictly requires Degree & Age 21+
            </div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px;">
            ${G.edu.examScores.cat ? `<span class="mono-val" style="font-size: 15px;">${G.edu.examScores.cat}%ile</span>` : `
              <button class="btn btn-outline btn-sm btn-take-exam" data-exam="cat" ${!hasDegree || age < 21 ? 'disabled' : ''}>
                ${hasDegree && age >= 21 ? 'Take CAT ($35)' : 'Locked'}
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- University Admissions -->
      ${age >= 17 ? `
        <h2 class="section-heading">Global university admissions</h2>
        <div>
          ${(c.undergradColleges || []).concat(COUNTRIES.usa.undergradColleges.slice(0, 3)).map(u => `
            <div class="list-row">
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 15px;">${u.name}</div>
                <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                  Prestige ${u.prestige}/100 · $${u.tuitionUSD.toLocaleString()}/yr · Exam: ${u.examReq ? u.examReq.toUpperCase() : 'Merit'}
                </div>
              </div>
              <button class="btn btn-outline btn-sm btn-apply-uni" data-uni="${u.id}" type="button">Apply</button>
            </div>
          `).join("")}
        </div>
      ` : ''}
    `;
  }

  function renderCorpSubview() {
    const job = G.career.job;

    return `
      <h2 class="section-heading first">Current employment</h2>
      ${job ? `
        <div class="detail-grid">
          <div>
            <div class="detail-label">Position</div>
            <div class="detail-val">${job.title}</div>
          </div>
          <div>
            <div class="detail-label">Base salary</div>
            <div class="detail-val-mono">$${job.baseSalary.toLocaleString()}/yr</div>
          </div>
          <div>
            <div class="detail-label">Annual bonus</div>
            <div class="detail-val-mono">${Math.round(job.bonusPct * 100)}%</div>
          </div>
          <div>
            <div class="detail-label">Equity compensation</div>
            <div class="detail-val-mono">$${(job.stockUSD || 0).toLocaleString()}</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" id="btnWorkOvertime" type="button">Work overtime</button>
          <button class="btn btn-outline btn-sm" id="btnExecNetworking" type="button">Executive networking</button>
          <button class="btn btn-outline btn-sm" id="btnResign" type="button" style="color: var(--accent-rose);">Resign</button>
        </div>
      ` : `
        <div class="surface-box" style="padding: 24px; text-align: center;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 6px;">Unemployed</div>
          <p style="font-size: 13px; color: var(--text-secondary); margin: 0 auto 16px; max-width: 360px;">
            Apply for positions across Technology, Investment Banking, Consulting, Big Law, and Medicine below.
          </p>
        </div>
      `}

      <h2 class="section-heading">Available corporate tracks</h2>
      <div>
        ${CAREER_TRACKS.map(track => {
          const entry = track.ladder[0];
          return `
            <div class="list-row">
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 15px;">${track.name} · ${entry.title}</div>
                <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                  Entry salary: $${entry.baseSalaryUSD.toLocaleString()}/yr · Requires: ${track.requiredDegrees ? track.requiredDegrees.join(", ") : 'Merit'}
                </div>
              </div>
              <button class="btn btn-outline btn-sm btn-apply-job" data-track="${track.id}" type="button">Apply</button>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderSpecialSubview() {
    return `
      <h2 class="section-heading first">Independent ventures & creative tracks</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">
        <div class="surface-box" style="padding: 18px 20px;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 4px;">Indie Game Studio</div>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            Develop and publish independent titles on Steam. Revenue scales with programming expertise and critical reception.
          </p>
          <button class="btn btn-outline btn-sm" id="btnSpecialIndie" type="button">Publish game ($100)</button>
        </div>

        <div class="surface-box" style="padding: 18px 20px;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 4px;">Content & Media</div>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            Produce videos and livestreams. Monetize via digital advertising, sponsorship agreements, and merchandise.
          </p>
          <button class="btn btn-outline btn-sm" id="btnSpecialCreator" type="button">Publish content</button>
        </div>

        <div class="surface-box" style="padding: 18px 20px;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 4px;">Fashion & Modeling</div>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            High-fashion runway appearances and luxury brand ambassador campaigns. Requires exceptional aesthetic presence.
          </p>
          <button class="btn btn-outline btn-sm" id="btnSpecialModel" type="button">Runway booking</button>
        </div>

        <div class="surface-box" style="padding: 18px 20px;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 4px;">Music Recording</div>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            Compose, record, and release studio singles across global digital streaming platforms.
          </p>
          <button class="btn btn-outline btn-sm" id="btnSpecialMusician" type="button">Release record</button>
        </div>

        <div class="surface-box" style="padding: 18px 20px;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 4px;">Professional Athletics</div>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            Compete in elite franchise athletic leagues with multi-year performance contracts.
          </p>
          <button class="btn btn-outline btn-sm" id="btnSpecialAthlete" type="button">Sign contract</button>
        </div>

        <div class="surface-box" style="padding: 18px 20px;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 4px;">Author & Publishing</div>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
            Author literary works and commercial non-fiction for publishing houses and royalties.
          </p>
          <button class="btn btn-outline btn-sm" id="btnSpecialAuthor" type="button">Publish book</button>
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
            toast("JEE strictly requires the Science PCM stream.", "error");
            return;
          }
          if (G.char.age < 16) {
            toast("JEE is taken during or after Class 12.", "error");
            return;
          }
          if (G.fin.cash < ex.costUSD) { toast("Insufficient cash for exam fee ($40).", "error"); return; }
          G.fin.cash -= ex.costUSD;
          const coachingBoost = G.childhood.coachingChoice?.includes("Kota") ? 4.0 : 0;
          const pct = Math.min(99.98, Math.round((72 + (G.stats.smarts / 100) * 27 + coachingBoost + (Math.random() * 0.8)) * 100) / 100);
          G.edu.examScores.jee = pct;
          toast(`JEE Advanced Result: ${pct}%ile. ${pct >= 95 ? 'Eligible for IIT Bombay and IIT Delhi.' : 'Eligible for NITs.'}`, "celebrate");
        } else if (exKey === "neet") {
          if (G.childhood.streamChoice !== "pcb") {
            toast("NEET UG strictly requires the Science PCB stream.", "error");
            return;
          }
          if (G.char.age < 16) {
            toast("NEET is taken during or after Class 12.", "error");
            return;
          }
          if (G.fin.cash < ex.costUSD) { toast("Insufficient cash for exam fee ($30).", "error"); return; }
          G.fin.cash -= ex.costUSD;
          const coachingBoost = G.childhood.coachingChoice?.includes("Aakash") ? 45 : 0;
          const score = Math.min(720, Math.round(450 + (G.stats.smarts / 100) * 240 + coachingBoost + (Math.random() * 15)));
          G.edu.examScores.neet = score;
          toast(`NEET UG Score: ${score}/720. ${score >= 650 ? 'Eligible for AIIMS New Delhi MBBS.' : 'Eligible for State Medical Colleges.'}`, "celebrate");
        } else if (exKey === "sat") {
          if (G.char.age < 15) {
            toast("SAT is taken during high school.", "error");
            return;
          }
          if (G.fin.cash < ex.costUSD) { toast("Insufficient cash for exam fee ($110).", "error"); return; }
          G.fin.cash -= ex.costUSD;
          const sat = Math.min(1600, Math.round(1020 + (G.stats.smarts / 100) * 560 + (Math.random() * 15)));
          G.edu.examScores.sat = sat;
          toast(`SAT Score: ${sat}/1600. ${sat >= 1500 ? 'Competitive for global admissions.' : 'Standard competitive benchmark.'}`, "celebrate");
        } else if (exKey === "upsc") {
          startUPSCProcess();
          return;
        } else if (exKey === "cat") {
          if (!hasDegree || G.char.age < 21) {
            toast("CAT strictly requires a completed Bachelor's Degree and minimum age 21.", "error");
            return;
          }
          if (G.fin.cash < ex.costUSD) { toast("Insufficient cash for exam fee ($35).", "error"); return; }
          G.fin.cash -= ex.costUSD;
          const cat = Math.min(99.95, Math.round((82 + (G.stats.smarts / 100) * 17.8) * 100) / 100);
          G.edu.examScores.cat = cat;
          toast(`CAT Score: ${cat}%ile. Admitted to IIM Ahmedabad & Bangalore.`, "celebrate");
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
          toast("You must graduate high school before college enrollment.", "error");
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
          toast(`Admitted: welcome to ${uni.name} studying ${uni.majors[0]}.`, "celebrate");
        } else {
          toast(`Application rejected by ${uni.name}. Boost competitive exam scores.`, "error");
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
          toast("Must be at least 18 to enter corporate workforce.", "error");
          return;
        }

        if (track.requiresExam === "upsc" && !G.edu.examScores.upsc) {
          toast("Must clear the UPSC Civil Services Examination first.", "error");
          return;
        }

        if (track.requiredDegrees && !track.requiredDegrees.includes("*")) {
          const matchingDegree = G.edu.degrees.some(d => track.requiredDegrees.includes(d.major));
          if (!matchingDegree) {
            toast(`Requires degree in: ${track.requiredDegrees.join(" or ")}.`, "error");
            return;
          }
        }

        if (track.minSmarts && G.stats.smarts < track.minSmarts) {
          toast(`Requires at least ${track.minSmarts} Smarts to pass technical interviews.`, "error");
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
        toast(`Hired as ${entry.title} ($${entry.baseSalaryUSD.toLocaleString()}/yr).`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });

    // Workplace Actions
    document.getElementById("btnWorkOvertime")?.addEventListener("click", () => {
      if (!consumeEnergy(25, "overtime", 1)) return;
      G.stats.prestige = Math.min(100, G.stats.prestige + 4);
      G.stats.happiness = Math.max(10, G.stats.happiness - 3);
      toast("Burned the midnight oil. Dedication noted by executive leadership (+Prestige)", "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnExecNetworking")?.addEventListener("click", () => {
      if (!consumeEnergy(20, "networking", 1)) return;
      G.stats.prestige = Math.min(100, G.stats.prestige + 5);
      toast("Attended private executive dinner. Expanded professional network.", "celebrate");
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
      if (G.yearActions.specialRelease) { toast("Annual release limit reached. Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy.", "error"); return; }
      if (G.fin.cash < 100) { toast("Requires $100 Steam publishing fee.", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      G.fin.cash -= 100;
      const sales = Math.round(50000 + (G.stats.smarts * 800));
      G.fin.cash += sales;
      toast(`Steam game launched. Earned $${sales.toLocaleString()} royalties.`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialCreator")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("Annual release limit reached. Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy.", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const subs = 25000 + Math.round(G.stats.looks * 500);
      const ad = Math.round(subs * 0.7);
      G.fin.cash += ad;
      toast(`Video published. Gained ${subs.toLocaleString()} subscribers and earned $${ad.toLocaleString()}.`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialModel")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("Annual release limit reached. Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy.", "error"); return; }
      if (G.stats.looks < 70) { toast("Requires 70+ Looks.", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const pay = Math.round(G.stats.looks * 400);
      G.fin.cash += pay;
      toast(`Walked Paris runway. Earned $${pay.toLocaleString()}.`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialMusician")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("Annual release limit reached. Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy.", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const roy = 35000 + Math.round(Math.random() * 40000);
      G.fin.cash += roy;
      toast(`Single charted on streaming services. Collected $${roy.toLocaleString()} royalties.`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialAthlete")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("Annual release limit reached. Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy.", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const sal = 80000;
      G.fin.cash += sal;
      toast(`Signed franchise sports contract. Earned $${sal.toLocaleString()} salary.`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });

    document.getElementById("btnSpecialAuthor")?.addEventListener("click", () => {
      if (G.char.age < 16) { toast("Requires age 16+.", "error"); return; }
      if (G.yearActions.specialRelease) { toast("Annual release limit reached. Age up to release another.", "error"); return; }
      if (G.stats.energy < 30) { toast("Requires 30% Energy.", "error"); return; }
      G.stats.energy -= 30;
      G.yearActions.specialRelease = true;
      const adv = 20000 + (G.stats.smarts * 300);
      G.fin.cash += adv;
      toast(`Novel published. Earned $${adv.toLocaleString()} advance.`, "celebrate");
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
        <div class="surface-box" style="text-align: center; padding: 36px 24px;">
          <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">Commercial enterprise locked</div>
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.55; max-width: 440px; margin: 0 auto 20px;">
            Under commercial corporate law, founding a registered company, managing corporate treasury, and executing legal contracts requires adulthood (Age 18+).
          </p>
          <div class="detail-grid" style="max-width: 340px; margin: 0 auto; text-align: left;">
            <div>
              <div class="detail-label">Current age</div>
              <div class="detail-val-mono">${age}</div>
            </div>
            <div>
              <div class="detail-label">Years to incorporation</div>
              <div class="detail-val-mono">${18 - age}</div>
            </div>
            <div>
              <div class="detail-label">Childhood cash</div>
              <div class="detail-val-mono">$${G.fin.cash.toLocaleString()}</div>
            </div>
            <div>
              <div class="detail-label">Family wealth</div>
              <div class="detail-val" style="text-transform: capitalize;">${G.char.familyWealth.replace("_", " ")}</div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (!G.biz) G.biz = [];
    if (activeBizIndex >= G.biz.length) activeBizIndex = 0;
    const currentBiz = G.biz[activeBizIndex];

    const subNavHtml = `
      <div class="subtabs-bar">
        <button class="subtab-btn ${bizSubTab === 'enterprises' ? 'active' : ''} btn-biz-subtab" data-tab="enterprises" type="button">Portfolio (${G.biz.length})</button>
        <button class="subtab-btn ${bizSubTab === 'catalog' ? 'active' : ''} btn-biz-subtab" data-tab="catalog" type="button">Catalog (120)</button>
        ${currentBiz ? `
          <button class="subtab-btn ${bizSubTab === 'financials' ? 'active' : ''} btn-biz-subtab" data-tab="financials" type="button">Financials</button>
          <button class="subtab-btn ${bizSubTab === 'fundraising' ? 'active' : ''} btn-biz-subtab" data-tab="fundraising" type="button">Funding</button>
          <button class="subtab-btn ${bizSubTab === 'boardroom' ? 'active' : ''} btn-biz-subtab" data-tab="boardroom" type="button">Board</button>
          <button class="subtab-btn ${bizSubTab === 'org' ? 'active' : ''} btn-biz-subtab" data-tab="org" type="button">Org</button>
        ` : ''}
      </div>
    `;

    let bodyHtml = "";

    // 1. ENTERPRISES / PORTFOLIO SUBTAB
    if (bizSubTab === "enterprises") {
      if (G.biz.length === 0) {
        bodyHtml = `
          <div class="surface-box" style="text-align: center; padding: 36px 24px;">
            <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">No operating companies</div>
            <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.55; max-width: 420px; margin: 0 auto 20px;">
              Incorporate a venture from the 120-business catalog spanning 12 sectors and capital tiers from $500 to $2B+.
            </p>
            <button class="btn btn-primary btn-go-catalog" type="button">Browse catalog</button>
          </div>
        `;
      } else {
        bodyHtml = `
          ${G.biz.length > 1 ? `
            <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px;">
              ${G.biz.map((b, i) => `
                <button class="subtab-btn ${i === activeBizIndex ? 'active' : ''} btn-switch-biz" data-idx="${i}" type="button" style="font-size: 12px; padding: 4px 10px;">
                  ${b.name}
                </button>
              `).join("")}
            </div>
          ` : ''}

          <h2 class="section-heading first">${currentBiz.name}</h2>
          <div class="detail-grid">
            <div>
              <div class="detail-label">Valuation</div>
              <div class="detail-val-mono">$${(currentBiz.valuationUSD || currentBiz.valuation || 100000).toLocaleString()}</div>
            </div>
            <div>
              <div class="detail-label">Annual revenue</div>
              <div class="detail-val-mono">$${(currentBiz.annualRevenueUSD || currentBiz.revenue || 0).toLocaleString()}</div>
            </div>
            <div>
              <div class="detail-label">Net income</div>
              <div class="detail-val-mono">$${(currentBiz.netProfitUSD || currentBiz.netProfit || 0).toLocaleString()}</div>
            </div>
            <div>
              <div class="detail-label">Treasury cash</div>
              <div class="detail-val-mono">$${(currentBiz.treasuryUSD || currentBiz.treasury || 0).toLocaleString()}</div>
            </div>
            <div>
              <div class="detail-label">Founder equity</div>
              <div class="detail-val-mono">${currentBiz.founderEquityPct || 100}%</div>
            </div>
            <div>
              <div class="detail-label">Scale tier</div>
              <div class="detail-val" style="text-transform: capitalize;">Tier ${currentBiz.capitalTier || 'C'} · ${currentBiz.org?.scaleTier || 'micro'}</div>
            </div>
          </div>

          <h2 class="section-heading">Corporate operations</h2>
          <div class="actions-grid">
            <button class="action-btn" id="btnBizPrice" type="button">
              <div class="action-btn-left">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">tune</span>
                <span class="action-btn-label">Adjust pricing</span>
              </div>
              <span class="action-btn-meta">${((currentBiz.priceMultiplier || 1.0) * 100).toFixed(0)}% base</span>
            </button>
            <button class="action-btn" id="btnBizMarketing" type="button">
              <div class="action-btn-left">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">campaign</span>
                <span class="action-btn-label">Marketing blitz</span>
              </div>
              <span class="action-btn-meta">$${Math.round((currentBiz.valuationUSD || 100000) * 0.05).toLocaleString()}</span>
            </button>
            <button class="action-btn" id="btnBizRD" type="button">
              <div class="action-btn-left">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">biotech</span>
                <span class="action-btn-label">R&D initiative</span>
              </div>
              <span class="action-btn-meta">$${Math.round((currentBiz.valuationUSD || 100000) * 0.08).toLocaleString()}</span>
            </button>
            <button class="action-btn" id="btnBizDividend" type="button">
              <div class="action-btn-left">
                <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">payments</span>
                <span class="action-btn-label">Pay dividend</span>
              </div>
              <span class="action-btn-meta">Founder distribution</span>
            </button>
          </div>

          <h2 class="section-heading">Exit transactions</h2>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" id="btnBizIPO" type="button">Public listing (IPO)</button>
            <button class="btn btn-outline btn-sm" id="btnBizSell" type="button" style="color: var(--accent-rose);">Accept buyout</button>
          </div>
        `;
      }
    } else if (bizSubTab === "catalog") {
      // 2. CATALOG SUBTAB
      const sectors = Object.keys(BUSINESS_SECTORS);
      const filtered = BUSINESS_CATALOG.filter(b => {
        if (catalogSectorFilter !== "all" && b.sector !== catalogSectorFilter) return false;
        if (catalogTierFilter !== "all" && b.tier !== catalogTierFilter) return false;
        return true;
      });

      bodyHtml = `
        <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px;">
          <button class="subtab-btn ${catalogSectorFilter === 'all' ? 'active' : ''} btn-filter-sec" data-sec="all" type="button" style="font-size: 12px; padding: 4px 10px;">All sectors</button>
          ${sectors.map(s => `
            <button class="subtab-btn ${catalogSectorFilter === s ? 'active' : ''} btn-filter-sec" data-sec="${s}" type="button" style="font-size: 12px; padding: 4px 10px; text-transform: capitalize;">${s}</button>
          `).join("")}
        </div>

        <div>
          ${filtered.map(b => {
            const canAfford = G.fin.cash >= b.startupCostUSD;
            return `
              <div class="list-row">
                <div style="flex: 1; min-width: 0;">
                  <div style="font-size: 15px;">${b.name}</div>
                  <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                    ${b.sector} · Tier ${b.tier} · Margin ${Math.round(b.financialProfile.cogsRate * 100)}%
                  </div>
                </div>
                <div style="display: flex; align-items: baseline; gap: 12px;">
                  <div class="mono-val" style="font-size: 15px;">$${b.startupCostUSD.toLocaleString()}</div>
                  <button class="btn btn-outline btn-sm btn-found-biz" data-id="${b.id}" ${!canAfford ? 'disabled' : ''} type="button">
                    ${canAfford ? 'Incorporate' : 'Insufficient cash'}
                  </button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    } else if (bizSubTab === "financials" && currentBiz) {
      // 3. FINANCIALS SUBTAB
      const rev = currentBiz.annualRevenueUSD || currentBiz.revenue || 0;
      const cogs = currentBiz.annualCOGSUSD || (rev * 0.4);
      const gross = rev - cogs;
      const opex = currentBiz.annualOpexUSD || (rev * 0.3);
      const ebitda = gross - opex;
      const net = currentBiz.netProfitUSD || (ebitda * 0.75);

      bodyHtml = `
        <h2 class="section-heading first">Income statement</h2>
        <div class="surface-box" style="padding: 16px 20px;">
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-hairline);">
            <span>Gross revenue</span>
            <span class="mono-val">$${Math.round(rev).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-hairline); color: var(--text-secondary);">
            <span>Cost of goods sold (COGS)</span>
            <span class="mono-val">-$${Math.round(cogs).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-hairline); font-weight: 500;">
            <span>Gross profit</span>
            <span class="mono-val">$${Math.round(gross).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-hairline); color: var(--text-secondary);">
            <span>Operating expenses (OPEX)</span>
            <span class="mono-val">-$${Math.round(opex).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border-hairline); font-weight: 500;">
            <span>EBITDA</span>
            <span class="mono-val">$${Math.round(ebitda).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; font-weight: 600;">
            <span>Net income</span>
            <span class="mono-val" style="color: ${net >= 0 ? 'var(--accent-ink)' : 'var(--accent-rose)'};">$${Math.round(net).toLocaleString()}</span>
          </div>
        </div>
      `;
    } else if (bizSubTab === "fundraising" && currentBiz) {
      // 4. FUNDRAISING SUBTAB
      const pitchScore = calculateFounderPitchScore ? calculateFounderPitchScore(G, currentBiz) : 80;
      bodyHtml = `
        <h2 class="section-heading first">Venture financing</h2>
        <div class="detail-grid">
          <div>
            <div class="detail-label">Pitch readiness score</div>
            <div class="detail-val-mono">${pitchScore}/100</div>
          </div>
          <div>
            <div class="detail-label">Current valuation</div>
            <div class="detail-val-mono">$${(currentBiz.valuationUSD || 100000).toLocaleString()}</div>
          </div>
          <div>
            <div class="detail-label">Founder equity</div>
            <div class="detail-val-mono">${currentBiz.founderEquityPct || 100}%</div>
          </div>
          <div>
            <div class="detail-label">Treasury runway</div>
            <div class="detail-val-mono">${currentBiz.treasuryUSD > 0 ? 'Positive' : 'Breakeven'}</div>
          </div>
        </div>

        <div style="margin-top: 18px;">
          <button class="btn btn-primary btn-sm" id="btnGenerateTermSheets" type="button">Pitch venture investors</button>
        </div>
      `;
    } else if (bizSubTab === "boardroom" && currentBiz) {
      // 5. BOARDROOM SUBTAB
      const members = currentBiz.board?.members || [
        { name: `${G.char.firstName} ${G.char.lastName}`, archetype: "Founder", votingShare: 60, alignment: 100 }
      ];
      bodyHtml = `
        <h2 class="section-heading first">Board of directors</h2>
        <div>
          ${members.map(m => `
            <div class="list-row">
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 15px;">${m.name}</div>
                <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                  ${m.archetype} · Alignment ${m.alignment}%
                </div>
              </div>
              <div class="mono-val">${m.votingShare}% vote</div>
            </div>
          `).join("")}
        </div>
      `;
    } else if (bizSubTab === "org" && currentBiz) {
      // 6. ORG & ATTENTION UNITS SUBTAB
      bodyHtml = `
        <h2 class="section-heading first">Executive focus & organization</h2>
        <div class="detail-grid">
          <div>
            <div class="detail-label">Scale tier</div>
            <div class="detail-val" style="text-transform: capitalize;">${currentBiz.org?.scaleTier || 'micro'}</div>
          </div>
          <div>
            <div class="detail-label">Headcount</div>
            <div class="detail-val-mono">${currentBiz.org?.headcount || 12}</div>
          </div>
        </div>
      `;
    }

    vc.innerHTML = `
      ${subNavHtml}
      ${bodyHtml}
    `;

    // Event Bindings
    document.querySelectorAll(".btn-biz-subtab").forEach(btn => {
      btn.addEventListener("click", () => {
        bizSubTab = btn.dataset.tab;
        renderBusinessTab(vc);
      });
    });

    document.querySelectorAll(".btn-switch-biz").forEach(btn => {
      btn.addEventListener("click", () => {
        activeBizIndex = parseInt(btn.dataset.idx, 10);
        renderBusinessTab(vc);
      });
    });

    document.querySelector(".btn-go-catalog")?.addEventListener("click", () => {
      bizSubTab = "catalog";
      renderBusinessTab(vc);
    });

    document.querySelectorAll(".btn-filter-sec").forEach(btn => {
      btn.addEventListener("click", () => {
        catalogSectorFilter = btn.dataset.sec;
        renderBusinessTab(vc);
      });
    });

    document.querySelectorAll(".btn-found-biz").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const template = BUSINESS_CATALOG.find(b => b.id === id);
        if (!template) return;
        if (G.fin.cash < template.startupCostUSD) {
          toast("Insufficient personal cash to incorporate.", "error");
          return;
        }
        G.fin.cash -= template.startupCostUSD;
        const newBiz = {
          id: template.id + "_" + Date.now(),
          templateId: template.id,
          name: template.name,
          sector: template.sector,
          capitalTier: template.tier,
          valuationUSD: template.startupCostUSD * 2.5,
          annualRevenueUSD: template.baselineRevenueUSD || (template.startupCostUSD * 1.2),
          annualCOGSUSD: (template.baselineRevenueUSD || (template.startupCostUSD * 1.2)) * (template.financialProfile?.cogsRate || 0.4),
          annualOpexUSD: (template.baselineRevenueUSD || (template.startupCostUSD * 1.2)) * (template.financialProfile?.opexRate || 0.3),
          netProfitUSD: (template.baselineRevenueUSD || (template.startupCostUSD * 1.2)) * 0.25,
          treasuryUSD: Math.round(template.startupCostUSD * 0.4),
          founderEquityPct: 100,
          sharesIssued: 1000000,
          board: {
            members: [
              { name: `${G.char.firstName} ${G.char.lastName}`, archetype: "Founder", votingShare: 100, alignment: 100 }
            ]
          },
          org: { scaleTier: "micro", headcount: 8, attentionUnits: { product: 30, sales: 25, engineering: 25, compliance: 10, ops: 10 } }
        };
        G.biz.push(newBiz);
        activeBizIndex = G.biz.length - 1;
        bizSubTab = "enterprises";
        toast(`Incorporated ${newBiz.name}.`, "celebrate");
        updateHeader();
        renderBusinessTab(vc);
      });
    });

    document.getElementById("btnBizPrice")?.addEventListener("click", () => {
      if (!currentBiz) return;
      currentBiz.priceMultiplier = ((currentBiz.priceMultiplier || 1.0) >= 1.3) ? 0.8 : ((currentBiz.priceMultiplier || 1.0) + 0.1);
      toast(`Adjusted product pricing to ${((currentBiz.priceMultiplier) * 100).toFixed(0)}% of baseline.`, "info");
      renderBusinessTab(vc);
    });

    document.getElementById("btnBizMarketing")?.addEventListener("click", () => {
      if (!currentBiz) return;
      const cost = Math.round((currentBiz.valuationUSD || 100000) * 0.05);
      if (currentBiz.treasuryUSD < cost) { toast("Insufficient corporate treasury cash.", "error"); return; }
      currentBiz.treasuryUSD -= cost;
      currentBiz.annualRevenueUSD = Math.round((currentBiz.annualRevenueUSD || 100000) * 1.15);
      toast(`Marketing campaign launched (+15% Revenue).`, "celebrate");
      renderBusinessTab(vc);
    });

    document.getElementById("btnBizRD")?.addEventListener("click", () => {
      if (!currentBiz) return;
      const cost = Math.round((currentBiz.valuationUSD || 100000) * 0.08);
      if (currentBiz.treasuryUSD < cost) { toast("Insufficient corporate treasury cash.", "error"); return; }
      currentBiz.treasuryUSD -= cost;
      currentBiz.valuationUSD = Math.round((currentBiz.valuationUSD || 100000) * 1.2);
      toast(`R&D completed (+20% Valuation).`, "celebrate");
      renderBusinessTab(vc);
    });

    document.getElementById("btnBizDividend")?.addEventListener("click", () => {
      if (!currentBiz) return;
      const div = Math.round((currentBiz.treasuryUSD || 0) * 0.4);
      if (div <= 0) { toast("No treasury cash available for dividends.", "error"); return; }
      currentBiz.treasuryUSD -= div;
      const founderShare = Math.round(div * ((currentBiz.founderEquityPct || 100) / 100));
      G.fin.cash += founderShare;
      toast(`Distributed $${div.toLocaleString()} dividend ($${founderShare.toLocaleString()} to founder).`, "celebrate");
      updateHeader();
      renderBusinessTab(vc);
    });

    document.getElementById("btnBizIPO")?.addEventListener("click", () => {
      if (!currentBiz) return;
      if ((currentBiz.valuationUSD || 0) < 50000000) {
        toast("Requires at least $50,000,000 valuation for public IPO.", "error");
        return;
      }
      const payout = Math.round((currentBiz.valuationUSD || 0) * ((currentBiz.founderEquityPct || 100) / 100) * 0.85);
      G.fin.cash += payout;
      toast(`IPO successful. Listed on NASDAQ, founder liquid payout $${payout.toLocaleString()}.`, "celebrate");
      G.biz.splice(activeBizIndex, 1);
      activeBizIndex = 0;
      updateHeader();
      renderBusinessTab(vc);
    });

    document.getElementById("btnBizSell")?.addEventListener("click", () => {
      if (!currentBiz) return;
      const buyout = Math.round((currentBiz.valuationUSD || 100000) * 1.1);
      const founderCash = Math.round(buyout * ((currentBiz.founderEquityPct || 100) / 100));
      modal("Corporate Buyout Offer", `
        <p style="font-size: 14px; line-height: 1.5; color: var(--text-secondary); margin-bottom: 16px;">
          A private equity group has tendered a buyout offer for ${currentBiz.name} at a valuation of $${buyout.toLocaleString()}. Your net proceeds would be $${founderCash.toLocaleString()}.
        </p>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary btn-full" id="btnAcceptBuyout" type="button">Accept buyout</button>
          <button class="btn btn-outline btn-full" onclick="document.getElementById('modalOverlay').classList.remove('open')" type="button">Decline</button>
        </div>
      `);
      document.getElementById("btnAcceptBuyout")?.addEventListener("click", () => {
        closeModal();
        G.fin.cash += founderCash;
        G.biz.splice(activeBizIndex, 1);
        activeBizIndex = 0;
        toast(`Acquisition closed. Received $${founderCash.toLocaleString()}.`, "celebrate");
        updateHeader();
        renderBusinessTab(vc);
      });
    });

    document.getElementById("btnGenerateTermSheets")?.addEventListener("click", () => {
      if (!currentBiz) return;
      const sheets = generateTermSheets ? generateTermSheets(G, currentBiz) : [
        { investorName: "Sequoia Capital", investmentUSD: 2000000, preMoneyValuationUSD: 10000000, equityPct: 16.7, boardSeats: 1, liquidationPref: "1x Non-Participating" },
        { investorName: "Founders Fund", investmentUSD: 2500000, preMoneyValuationUSD: 12000000, equityPct: 17.2, boardSeats: 1, liquidationPref: "1x Non-Participating" }
      ];
      showInteractiveTermSheetsModal(sheets, currentBiz);
    });
  }

  function showInteractiveTermSheetsModal(sheets, biz) {
    modal("Term sheet comparison", `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${sheets.map((s, idx) => `
          <div class="surface-box" style="padding: 16px 20px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
              <span style="font-weight: 500; font-size: 15px;">${s.investorName}</span>
              <span class="mono-val" style="font-size: 15px;">$${s.investmentUSD.toLocaleString()}</span>
            </div>
            <div class="detail-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 12px;">
              <div>
                <div class="detail-label">Pre-money</div>
                <div class="detail-val-mono">$${s.preMoneyValuationUSD.toLocaleString()}</div>
              </div>
              <div>
                <div class="detail-label">Dilution</div>
                <div class="detail-val-mono">${s.equityPct}%</div>
              </div>
              <div>
                <div class="detail-label">Board seats</div>
                <div class="detail-val-mono">${s.boardSeats}</div>
              </div>
            </div>
            <button class="btn btn-outline btn-sm btn-accept-termsheet" data-idx="${idx}" type="button">Execute investment</button>
          </div>
        `).join("")}
      </div>
    `);

    document.querySelectorAll(".btn-accept-termsheet").forEach(btn => {
      btn.addEventListener("click", () => {
        const s = sheets[parseInt(btn.dataset.idx, 10)];
        if (!s) return;
        biz.treasuryUSD += s.investmentUSD;
        biz.valuationUSD = s.preMoneyValuationUSD + s.investmentUSD;
        biz.founderEquityPct = Math.round(biz.founderEquityPct * (1 - s.equityPct / 100));
        closeModal();
        toast(`Financing closed with ${s.investorName}.`, "celebrate");
        updateHeader();
        renderCurrentTab();
      });
    });
  }

  // TAB 4: FINANCE, ASSETS & MARKETS
  let finSub = "stocks"; // "stocks", "real_estate", "forbes"
  function renderFinanceAssetsTab(vc) {
    const age = G.char.age;

    if (age < 18) {
      vc.innerHTML = `
        <div class="surface-box" style="padding: 24px; text-align: center; margin-bottom: 16px;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 6px;">Childhood savings</div>
          <div class="detail-grid" style="max-width: 320px; margin: 0 auto 16px; text-align: left;">
            <div>
              <div class="detail-label">Pocket money cash</div>
              <div class="detail-val-mono">$${G.fin.cash.toLocaleString()}</div>
            </div>
            <div>
              <div class="detail-label">Savings deposit</div>
              <div class="detail-val-mono">$${G.fin.savings.toLocaleString()}</div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; justify-content: center;">
            <button class="btn btn-outline btn-sm" id="btnDepositPiggy" type="button">Deposit cash</button>
            <button class="btn btn-outline btn-sm" id="btnWithdrawPiggy" type="button">Withdraw savings</button>
          </div>
        </div>

        <div class="surface-box" style="padding: 20px; text-align: center;">
          <div style="font-size: 13px; color: var(--text-secondary);">
            Brokerage accounts, publicly traded equities, and real estate legal deeds unlock at legal majority age (18+).
          </div>
        </div>
      `;

      document.getElementById("btnDepositPiggy")?.addEventListener("click", () => {
        if (G.fin.cash <= 0) { toast("No cash available to deposit.", "error"); return; }
        G.fin.savings += G.fin.cash;
        G.fin.cash = 0;
        toast("Deposited cash into savings.", "celebrate");
        updateHeader();
        renderFinanceAssetsTab(vc);
      });

      document.getElementById("btnWithdrawPiggy")?.addEventListener("click", () => {
        if (G.fin.savings <= 0) { toast("No savings available to withdraw.", "error"); return; }
        G.fin.cash += G.fin.savings;
        G.fin.savings = 0;
        toast("Withdrew all savings to cash.", "info");
        updateHeader();
        renderFinanceAssetsTab(vc);
      });
      return;
    }

    // Adult 18+
    let eqVal = 0;
    Object.entries(G.fin.stocks || {}).forEach(([tk, sh]) => {
      const curP = G.fin.stockPrices[tk] || 100;
      eqVal += sh * curP;
    });

    vc.innerHTML = `
      <!-- Top Balance Strip -->
      <div class="detail-grid" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 20px;">
        <div>
          <div class="detail-label">Liquid cash</div>
          <div class="detail-val-mono">$${G.fin.cash.toLocaleString()}</div>
        </div>
        <div>
          <div class="detail-label">Savings (4.5%)</div>
          <div class="detail-val-mono">$${G.fin.savings.toLocaleString()}</div>
        </div>
        <div>
          <div class="detail-label">Equities</div>
          <div class="detail-val-mono">$${Math.round(eqVal).toLocaleString()}</div>
        </div>
        <div>
          <div class="detail-label">Margin debt</div>
          <div class="detail-val-mono">$${(G.fin.marginDebt || 0).toLocaleString()}</div>
        </div>
      </div>

      <div class="subtabs-bar">
        <button class="subtab-btn ${finSub === 'stocks' ? 'active' : ''}" id="fsubStocks" type="button">Markets</button>
        <button class="subtab-btn ${finSub === 'real_estate' ? 'active' : ''}" id="fsubRE" type="button">Real estate</button>
        <button class="subtab-btn ${finSub === 'forbes' ? 'active' : ''}" id="fsubForbes" type="button">Forbes</button>
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

  function renderStocksView() {
    return `
      <div style="display: flex; gap: 8px; margin-bottom: 20px;">
        <button class="btn btn-outline btn-sm" id="btnDepositSav" type="button">Deposit savings</button>
        <button class="btn btn-outline btn-sm" id="btnWithdrawSav" type="button">Withdraw savings</button>
      </div>

      <h2 class="section-heading first">Public equities</h2>
      <div>
        ${STOCKS_CATALOG.map(s => {
          const curP = G.fin.stockPrices[s.ticker] || s.price;
          const sh = G.fin.stocks[s.ticker] || 0;
          return `
            <div class="list-row">
              <div style="font-family: var(--font-mono); font-size: 14px; min-width: 58px;">${s.ticker}</div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 15px;">${s.name}</div>
                <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">Owned: ${sh} shares</div>
              </div>
              <div style="display: flex; align-items: baseline; gap: 12px;">
                <div class="mono-val" style="font-size: 15px;">$${curP.toFixed(2)}</div>
                <button class="btn btn-outline btn-sm btn-buy-stock" data-t="${s.ticker}" type="button">Buy 10</button>
                <button class="btn btn-outline btn-sm btn-sell-stock" data-t="${s.ticker}" type="button" ${sh < 10 ? 'disabled' : ''}>Sell 10</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <h2 class="section-heading">Digital assets</h2>
      <div>
        <div class="list-row">
          <div style="font-family: var(--font-mono); font-size: 14px; min-width: 58px;">BTC</div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">Bitcoin</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">Owned: ${G.fin.crypto.BTC || 0} BTC</div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px;">
            <div class="mono-val" style="font-size: 15px;">$${(G.fin.cryptoPrices?.BTC || 65000).toLocaleString()}</div>
            <button class="btn btn-outline btn-sm" id="btnBuyBTC" type="button">Buy 0.1</button>
          </div>
        </div>

        <div class="list-row">
          <div style="font-family: var(--font-mono); font-size: 14px; min-width: 58px;">ETH</div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">Ethereum</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">Owned: ${G.fin.crypto.ETH || 0} ETH</div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px;">
            <div class="mono-val" style="font-size: 15px;">$${(G.fin.cryptoPrices?.ETH || 3400).toLocaleString()}</div>
            <button class="btn btn-outline btn-sm" id="btnBuyETH" type="button">Buy 1</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderREView() {
    return `
      <h2 class="section-heading first">Owned real estate (${G.assets.properties.length})</h2>
      <div>
        ${G.assets.properties.length === 0 ? `
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 20px;">
            No real estate assets currently held in portfolio.
          </p>
        ` : G.assets.properties.map((p, i) => `
          <div class="surface-box" style="padding: 16px 20px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
              <span style="font-size: 15px; font-weight: 500;">${p.name}</span>
              <span class="mono-val" style="font-size: 15px;">$${p.val.toLocaleString()}</span>
            </div>
            <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 10px;">
              Condition ${p.cond}% · Status: ${p.isRented ? 'Leased' : 'Vacant'}
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm btn-re-rent" data-idx="${i}" type="button">${p.isRented ? 'Evict tenant' : 'Lease out'}</button>
              <button class="btn btn-outline btn-sm btn-re-reno" data-idx="${i}" type="button">Renovate ($${Math.round(p.val * 0.12).toLocaleString()})</button>
              <button class="btn btn-outline btn-sm btn-re-flip" data-idx="${i}" type="button" style="color: var(--accent-rose);">Sell</button>
            </div>
          </div>
        `).join("")}
      </div>

      <h2 class="section-heading">Market listings</h2>
      <div>
        ${PROPERTY_TEMPLATES.map(p => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${p.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                Cap yield: ${(p.rentYield * 100).toFixed(1)}%
              </div>
            </div>
            <div style="display: flex; align-items: baseline; gap: 12px;">
              <div class="mono-val" style="font-size: 15px;">$${p.priceUSD.toLocaleString()}</div>
              <button class="btn btn-outline btn-sm btn-buy-prop" data-id="${p.id}" type="button">Acquire</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderForbesView() {
    calcNW();
    const titans = [...FORBES_TITANS, { name: `${G.char.firstName} ${G.char.lastName} (YOU)`, nw: G.fin.netWorth, source: G.biz.length > 0 ? G.biz[0].name : "Self-Made" }].sort((a, b) => b.nw - a.nw);

    return `
      <h2 class="section-heading first">Global billionaires leaderboard</h2>
      <div>
        ${titans.map((t, idx) => {
          const isUser = t.name.includes("(YOU)");
          return `
            <div class="list-row" style="${isUser ? 'font-weight: 500;' : ''}">
              <div class="mono-val" style="font-size: 14px; min-width: 32px; color: var(--text-tertiary);">#${idx + 1}</div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 15px;">${t.name}</div>
                <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${t.source}</div>
              </div>
              <div class="mono-val" style="font-size: 15px;">
                $${(t.nw >= 1000000000 ? (t.nw / 1000000000).toFixed(1) + 'B' : (t.nw / 1000000).toFixed(1) + 'M')}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function bindFinanceEvents() {
    document.getElementById("btnDepositSav")?.addEventListener("click", () => {
      const amt = Math.min(G.fin.cash, 10000);
      if (amt <= 0) { toast("No cash available to deposit.", "error"); return; }
      G.fin.cash -= amt;
      G.fin.savings += amt;
      toast(`Deposited $${amt.toLocaleString()} to high-yield savings.`, "celebrate");
      updateHeader();
      renderFinanceAssetsTab(document.getElementById("viewContent"));
    });

    document.getElementById("btnWithdrawSav")?.addEventListener("click", () => {
      const amt = Math.min(G.fin.savings, 10000);
      if (amt <= 0) { toast("No savings available to withdraw.", "error"); return; }
      G.fin.savings -= amt;
      G.fin.cash += amt;
      toast(`Withdrew $${amt.toLocaleString()} from savings.`, "info");
      updateHeader();
      renderFinanceAssetsTab(document.getElementById("viewContent"));
    });

    document.querySelectorAll(".btn-buy-stock").forEach(btn => {
      btn.addEventListener("click", () => {
        const t = btn.dataset.t;
        const s = STOCKS_CATALOG.find(x => x.ticker === t);
        if (!s) return;
        const p = G.fin.stockPrices[t] || s.price;
        const total = p * 10;
        if (G.fin.cash < total) { toast(`Insufficient cash ($${total.toFixed(0)} required).`, "error"); return; }
        G.fin.cash -= total;
        G.fin.stocks[t] = (G.fin.stocks[t] || 0) + 10;
        toast(`Purchased 10 shares of ${t}.`, "celebrate");
        updateHeader();
        renderFinanceAssetsTab(document.getElementById("viewContent"));
      });
    });

    document.querySelectorAll(".btn-sell-stock").forEach(btn => {
      btn.addEventListener("click", () => {
        const t = btn.dataset.t;
        const s = STOCKS_CATALOG.find(x => x.ticker === t);
        if (!s) return;
        const sh = G.fin.stocks[t] || 0;
        if (sh < 10) { toast("Insufficient shares to sell.", "error"); return; }
        const p = G.fin.stockPrices[t] || s.price;
        const total = p * 10;
        G.fin.stocks[t] -= 10;
        G.fin.cash += total;
        toast(`Sold 10 shares of ${t} for $${total.toFixed(0)}.`, "celebrate");
        updateHeader();
        renderFinanceAssetsTab(document.getElementById("viewContent"));
      });
    });

    document.getElementById("btnBuyBTC")?.addEventListener("click", () => {
      const p = G.fin.cryptoPrices?.BTC || 65000;
      const total = p * 0.1;
      if (G.fin.cash < total) { toast(`Requires $${total.toLocaleString()}.`, "error"); return; }
      G.fin.cash -= total;
      G.fin.crypto.BTC = Math.round(((G.fin.crypto.BTC || 0) + 0.1) * 100) / 100;
      toast("Purchased 0.1 BTC.", "celebrate");
      updateHeader();
      renderFinanceAssetsTab(document.getElementById("viewContent"));
    });

    document.getElementById("btnBuyETH")?.addEventListener("click", () => {
      const p = G.fin.cryptoPrices?.ETH || 3400;
      const total = p;
      if (G.fin.cash < total) { toast(`Requires $${total.toLocaleString()}.`, "error"); return; }
      G.fin.cash -= total;
      G.fin.crypto.ETH = (G.fin.crypto.ETH || 0) + 1;
      toast("Purchased 1 ETH.", "celebrate");
      updateHeader();
      renderFinanceAssetsTab(document.getElementById("viewContent"));
    });

    document.querySelectorAll(".btn-buy-prop").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const t = PROPERTY_TEMPLATES.find(x => x.id === id);
        if (!t) return;
        if (G.fin.cash < t.priceUSD) { toast(`Requires $${t.priceUSD.toLocaleString()} cash.`, "error"); return; }
        G.fin.cash -= t.priceUSD;
        G.assets.properties.push({
          id: t.id + "_" + Date.now(),
          name: t.name,
          val: t.priceUSD,
          rentYield: t.rentYield,
          cond: 90,
          isRented: true
        });
        toast(`Acquired ${t.name}.`, "celebrate");
        updateHeader();
        renderFinanceAssetsTab(document.getElementById("viewContent"));
      });
    });

    document.querySelectorAll(".btn-re-rent").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const p = G.assets.properties[idx];
        if (!p) return;
        p.isRented = !p.isRented;
        toast(p.isRented ? "Property leased to tenant." : "Tenant evicted.", "info");
        renderFinanceAssetsTab(document.getElementById("viewContent"));
      });
    });

    document.querySelectorAll(".btn-re-reno").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const p = G.assets.properties[idx];
        if (!p) return;
        const cost = Math.round(p.val * 0.12);
        if (G.fin.cash < cost) { toast(`Requires $${cost.toLocaleString()} cash.`, "error"); return; }
        G.fin.cash -= cost;
        p.cond = 100;
        p.val = Math.round(p.val * 1.25);
        toast(`Renovations complete. Asset appreciation +25%.`, "celebrate");
        updateHeader();
        renderFinanceAssetsTab(document.getElementById("viewContent"));
      });
    });

    document.querySelectorAll(".btn-re-flip").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const p = G.assets.properties[idx];
        if (!p) return;
        G.fin.cash += p.val;
        G.assets.properties.splice(idx, 1);
        toast(`Sold ${p.name} for $${p.val.toLocaleString()}.`, "celebrate");
        updateHeader();
        renderFinanceAssetsTab(document.getElementById("viewContent"));
      });
    });
  }

  // TAB 5: RELATIONSHIPS & SUCCESSION
  function renderRelationshipsTab(vc) {
    const age = G.char.age;
    const p = G.family.partner;
    const parents = G.family.parents || [];
    const children = G.family.children || [];

    vc.innerHTML = `
      <h2 class="section-heading first">Family</h2>
      <div>
        ${parents.map(parent => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${parent.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                ${parent.relation} · Age ${parent.age}
              </div>
            </div>
            <div style="text-align: right;">
              <div class="mono-val" style="font-size: 14px;">${parent.relationship || 85}</div>
              <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Closeness</div>
            </div>
          </div>
        `).join("")}
        ${children.map(ch => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${ch.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">Child · Age ${ch.age}</div>
            </div>
            <div style="text-align: right;">
              <div class="mono-val" style="font-size: 14px;">${ch.affection || 90}</div>
              <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Affection</div>
            </div>
          </div>
        `).join("")}
      </div>

      <h2 class="section-heading">Partner</h2>
      ${p ? `
        <div class="surface-box" style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
            <span style="font-size: 16px; font-weight: 500;">${p.name}</span>
            <span class="mono-val">${p.married ? 'Married' : 'Dating'}</span>
          </div>
          <div class="detail-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 16px;">
            <div>
              <div class="detail-label">Age</div>
              <div class="detail-val-mono">${p.age || age}</div>
            </div>
            <div>
              <div class="detail-label">Occupation</div>
              <div class="detail-val">${p.occupation || 'Professional'}</div>
            </div>
            <div>
              <div class="detail-label">Prenuptial</div>
              <div class="detail-val">${p.prenup ? 'Executed' : 'None'}</div>
            </div>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${!p.married ? `
              <button class="btn btn-outline btn-sm" id="btnMarry" type="button">Propose marriage</button>
            ` : `
              <button class="btn btn-outline btn-sm" id="btnBaby" type="button">Have child</button>
              <button class="btn btn-outline btn-sm" id="btnDivorce" type="button" style="color: var(--accent-rose);">Divorce</button>
            `}
            <button class="btn btn-outline btn-sm" id="btnDateNight" type="button">Date night ($300)</button>
          </div>
        </div>
      ` : `
        <div class="surface-box" style="padding: 24px; text-align: center;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 6px;">Single</div>
          <p style="font-size: 13px; color: var(--text-secondary); margin: 0 auto 16px; max-width: 360px;">
            Explore dating profiles and enter into romantic relationships.
          </p>
          <button class="btn btn-primary btn-sm" id="btnFindMatch" type="button">Find dating match</button>
        </div>
      `}

      <h2 class="section-heading">Estate planning & dynasty</h2>
      <div class="surface-box" style="padding: 20px;">
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
          Without a structured dynasty trust, the state levies a 28% estate transfer tax upon succession.
        </p>
        <button class="btn btn-outline btn-sm" id="btnDynastyTrust" type="button" ${G.family.will?.dynastyTrust ? 'disabled' : ''}>
          ${G.family.will?.dynastyTrust ? 'Dynasty trust active (0% estate tax)' : 'Establish dynasty trust ($50,000)'}
        </button>
      </div>
    `;

    document.getElementById("btnDateNight")?.addEventListener("click", () => {
      if (G.fin.cash < 300) { toast("Insufficient cash for date night.", "error"); return; }
      G.fin.cash -= 300;
      G.stats.happiness = Math.min(100, G.stats.happiness + 8);
      toast("Enjoyed an intimate dinner date (+Happiness).", "celebrate");
      updateHeader();
      renderRelationshipsTab(vc);
    });

    document.getElementById("btnMarry")?.addEventListener("click", () => {
      if (!p) return;
      p.married = true;
      p.prenup = true;
      G.stats.happiness = 100;
      toast(`Married ${p.name}. Prenuptial agreement executed.`, "celebrate");
      renderRelationshipsTab(vc);
    });

    document.getElementById("btnBaby")?.addEventListener("click", () => {
      const childNames = ["Aria", "Kabir", "Mira", "Reyan", "Ananya", "Rohan"];
      const cName = childNames[Math.floor(Math.random() * childNames.length)];
      G.family.children.push({ name: cName, age: 0, affection: 100 });
      G.stats.happiness = 100;
      toast(`Welcomed newborn child, ${cName}.`, "celebrate");
      renderRelationshipsTab(vc);
    });

    document.getElementById("btnDivorce")?.addEventListener("click", () => {
      G.family.partner = null;
      toast("Divorce finalized.", "info");
      renderRelationshipsTab(vc);
    });

    document.getElementById("btnFindMatch")?.addEventListener("click", () => {
      const matches = [
        { name: "Priya Sengupta", occupation: "Architect", age: age },
        { name: "David Chen", occupation: "Quant Researcher", age: age },
        { name: "Elena Rostova", occupation: "Venture Partner", age: age }
      ];
      const match = matches[Math.floor(Math.random() * matches.length)];
      G.family.partner = { name: match.name, occupation: match.occupation, age: match.age, married: false, prenup: false };
      toast(`Started dating ${match.name} (${match.occupation}).`, "celebrate");
      renderRelationshipsTab(vc);
    });

    document.getElementById("btnDynastyTrust")?.addEventListener("click", () => {
      if (G.fin.cash < 50000) { toast("Requires $50,000 legal fee.", "error"); return; }
      G.fin.cash -= 50000;
      if (!G.family.will) G.family.will = {};
      G.family.will.dynastyTrust = true;
      toast("Dynasty Trust established. 0% Estate Tax on multi-generational succession.", "celebrate");
      updateHeader();
      renderRelationshipsTab(vc);
    });
  }

  // TAB 6: LIFESTYLE, BIOHACKING & PRESTIGE
  function renderLifestyleTab(vc) {
    const age = G.char.age;
    if (age < 18) {
      vc.innerHTML = `
        <div class="surface-box" style="padding: 24px; text-align: center;">
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 6px;">Elite lifestyle locked</div>
          <p style="font-size: 13px; color: var(--text-secondary); margin: 0 auto; max-width: 360px;">
            Tax jurisdictions, private foundations, and longevity biohacking unlock in adulthood (Age 18+).
          </p>
        </div>
      `;
      return;
    }

    vc.innerHTML = `
      <h2 class="section-heading first">Societal standing</h2>
      <div class="detail-grid" style="margin-bottom: 24px;">
        <div>
          <div class="detail-label">Prestige score</div>
          <div class="detail-val-mono">${G.stats.prestige || 10}<span style="color: var(--text-tertiary);">/100</span></div>
        </div>
        <div>
          <div class="detail-label">Tax haven residency</div>
          <div class="detail-val">${G.char.taxHaven ? G.char.taxHaven : 'Standard'}</div>
        </div>
      </div>

      <h2 class="section-heading">Tax residency & sovereign havens</h2>
      <div style="display: flex; gap: 8px; margin-bottom: 24px;">
        <button class="btn btn-outline btn-sm" id="btnHavenMonaco" type="button">Monaco residency ($500k)</button>
        <button class="btn btn-outline btn-sm" id="btnHavenDubai" type="button">Dubai golden visa ($150k)</button>
      </div>

      <h2 class="section-heading">Longevity & rejuvenation protocols</h2>
      <div>
        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">Stem cell rejuvenation</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">+8 years lifespan · Cellular repair</div>
          </div>
          <button class="btn btn-outline btn-sm" id="btnBioStem" type="button">Undergo ($350k)</button>
        </div>

        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">Telomere epigenetic reprogramming</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">+15 years lifespan · Target 110+</div>
          </div>
          <button class="btn btn-outline btn-sm" id="btnBioTelo" type="button">Undergo ($1M)</button>
        </div>
      </div>
    `;

    document.getElementById("btnHavenMonaco")?.addEventListener("click", () => {
      if (G.fin.cash < 500000) { toast("Requires $500,000.", "error"); return; }
      G.fin.cash -= 500000;
      G.char.taxHaven = "Monaco";
      toast("Resident of Monaco. 0% personal tax.", "celebrate");
      updateHeader();
      renderLifestyleTab(vc);
    });

    document.getElementById("btnHavenDubai")?.addEventListener("click", () => {
      if (G.fin.cash < 150000) { toast("Requires $150,000.", "error"); return; }
      G.fin.cash -= 150000;
      G.char.taxHaven = "Dubai";
      toast("Dubai Golden Visa granted. 0% personal tax.", "celebrate");
      updateHeader();
      renderLifestyleTab(vc);
    });

    document.getElementById("btnBioStem")?.addEventListener("click", () => {
      if (G.fin.cash < 350000) { toast("Requires $350,000.", "error"); return; }
      G.fin.cash -= 350000;
      G.char.maxAge = (G.char.maxAge || 85) + 8;
      G.stats.health = 100;
      toast("Stem cell regeneration complete. Lifespan extended.", "celebrate");
      updateHeader();
      renderLifestyleTab(vc);
    });

    document.getElementById("btnBioTelo")?.addEventListener("click", () => {
      if (G.fin.cash < 1000000) { toast("Requires $1,000,000.", "error"); return; }
      G.fin.cash -= 1000000;
      G.char.maxAge = (G.char.maxAge || 85) + 15;
      G.stats.health = 100;
      toast("Epigenetic telomere reprogramming active.", "celebrate");
      updateHeader();
      renderLifestyleTab(vc);
    });
  }

  // --- 11. CHARACTER CREATION SCREEN (BEFORE BIRTH) ---
  function showCharacterCreation() {
    const cOpts = Object.values(COUNTRIES).map(c => `<option value="${c.id}">${c.name}</option>`).join("");

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
          <option value="prodigy">Genius IQ (+15 Smarts)</option>
          <option value="athlete">Natural Athlete (+15 Health)</option>
          <option value="star">Charismatic Star (+12 Looks, +10 Happiness)</option>
          <option value="hustler">Business Prodigy (+15 Commerce)</option>
        </select>
      </div>
      <button class="btn btn-primary btn-full" id="btnConfirmBirth" type="button" style="margin-top: 12px;">Take Birth into the World (Age 0)</button>
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
      G.char.age = 0;
      G.char.alive = true;
      G.char.generation = 1;

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
        { age: 0, headline: "Born into the World", text: `You were born in ${G.char.city}, ${COUNTRIES[c].name}. A full childhood and life lies ahead.` }
      ];

      closeModal();
      calcNW();
      updateHeader();
      switchTab("profile");
      toast(`Welcome to life, ${fn}. You are 0 years old.`, "celebrate");
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
