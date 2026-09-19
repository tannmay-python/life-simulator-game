// Country profiles, regional schooling boards, top domestic universities, and economic parameters
export const COUNTRIES = {
  india: {
    id: "india",
    name: "India",
    currency: "INR",
    symbol: "₹",
    exchangeRateToUSD: 85, // 1 USD = 85 INR
    flag: "🇮🇳",
    livingCostIndex: 0.35, // 35% of US living cost
    taxBrackets: [
      { max: 300000, rate: 0 },
      { max: 600000, rate: 0.05 },
      { max: 900000, rate: 0.10 },
      { max: 1200000, rate: 0.15 },
      { max: 1500000, rate: 0.20 },
      { max: Infinity, rate: 0.30 }
    ],
    schoolBoards: [
      { id: "cbse", name: "CBSE (Central Board of Secondary Education)", rigor: "High", prestige: 85, desc: "NCERT curriculum focused on science, math, and national competitive entrance exams." },
      { id: "icse", name: "ICSE / ISC (Council for the Indian School Certificate)", rigor: "Very High", prestige: 90, desc: "Rigorous English literature and comprehensive syllabus with deep humanities & sciences." },
      { id: "state_board", name: "State Board", rigor: "Moderate", prestige: 65, desc: "Affordable regional curriculum with localized focus." },
      { id: "ib_india", name: "International Baccalaureate (IB World School)", rigor: "Extensive", prestige: 95, desc: "Elite private international education ideal for Ivy League and Oxbridge applications." }
    ],
    entranceExams: [
      {
        id: "jee",
        name: "JEE (Main & Advanced)",
        targetMajor: "engineering",
        description: "Notoriously competitive entrance exam for the prestigious Indian Institutes of Technology (IITs).",
        minSmarts: 75,
        targetColleges: ["iit_bombay", "iit_delhi", "bits_pilani"]
      },
      {
        id: "neet",
        name: "NEET UG",
        targetMajor: "medicine",
        description: "National Eligibility cum Entrance Test for elite medical institutes like AIIMS Delhi.",
        minSmarts: 70,
        targetColleges: ["aiims_delhi", "cmc_vellore"]
      },
      {
        id: "cat",
        name: "CAT (Common Admission Test)",
        targetMajor: "business",
        description: "Premier post-grad entrance exam for Indian Institutes of Management (IIMs).",
        minSmarts: 72,
        targetColleges: ["iim_ahmedabad", "iim_bangalore"]
      },
      {
        id: "upsc",
        name: "UPSC Civil Services Examination",
        targetMajor: "civil_service",
        description: "One of the toughest exams on Earth to become an Indian Administrative Service (IAS) or IPS Officer.",
        minSmarts: 80,
        targetColleges: ["lbsnaa"]
      }
    ],
    domesticUniversities: [
      { id: "iit_bombay", name: "IIT Bombay", tier: 1, prestige: 98, tuitionUSD: 3000, majors: ["Computer Science & AI", "Aerospace Engineering", "Electrical Eng"], examReq: "jee" },
      { id: "iit_delhi", name: "IIT Delhi", tier: 1, prestige: 96, tuitionUSD: 3000, majors: ["Computer Science & AI", "Mechanical Eng", "Data Science"], examReq: "jee" },
      { id: "bits_pilani", name: "BITS Pilani", tier: 2, prestige: 90, tuitionUSD: 6000, majors: ["Computer Science & AI", "Economics & Finance", "Electronics"], examReq: "jee" },
      { id: "aiims_delhi", name: "AIIMS New Delhi", tier: 1, prestige: 99, tuitionUSD: 500, majors: ["Medicine (MBBS)", "Surgery"], examReq: "neet" },
      { id: "iim_ahmedabad", name: "IIM Ahmedabad", tier: 1, prestige: 98, tuitionUSD: 14000, majors: ["MBA Business Strategy", "Private Equity & Finance"], examReq: "cat" },
      { id: "srcc_delhi", name: "SRCC (Delhi University)", tier: 2, prestige: 92, tuitionUSD: 1000, majors: ["Commerce & Finance", "Economics (Hons)"], examReq: null },
      { id: "nlsiu_bangalore", name: "NLSIU Bangalore (National Law School)", tier: 1, prestige: 95, tuitionUSD: 4500, majors: ["Corporate Law (BA LLB)", "Constitutional Law"], examReq: null },
      { id: "mumbai_univ", name: "University of Mumbai", tier: 4, prestige: 60, tuitionUSD: 800, majors: ["Commerce", "Arts", "Science"], examReq: null }
    ]
  },

  usa: {
    id: "usa",
    name: "United States",
    currency: "USD",
    symbol: "$",
    exchangeRateToUSD: 1,
    flag: "🇺🇸",
    livingCostIndex: 1.0,
    taxBrackets: [
      { max: 11600, rate: 0.10 },
      { max: 47150, rate: 0.12 },
      { max: 100525, rate: 0.22 },
      { max: 191950, rate: 0.24 },
      { max: 243725, rate: 0.32 },
      { max: 609350, rate: 0.35 },
      { max: Infinity, rate: 0.37 }
    ],
    schoolBoards: [
      { id: "us_public_ap", name: "US Public High School (AP / Honors Track)", rigor: "High", prestige: 85, desc: "Competitive American curriculum with Advanced Placement courses and college prep." },
      { id: "us_prep_school", name: "Elite New England Prep Academy (Exeter / Andover)", rigor: "Very High", prestige: 98, desc: "Feeder school for Ivy League, Wall Street legacy networks, and tech founders." },
      { id: "us_standard", name: "Standard US High School", rigor: "Moderate", prestige: 70, desc: "Standard American high school diploma with sports and basic electives." }
    ],
    entranceExams: [
      {
        id: "sat",
        name: "SAT / ACT Examination",
        targetMajor: "general",
        description: "Standardized exam scored out of 1600. 1520+ required for Ivy League & Stanford admissions.",
        minSmarts: 70,
        targetColleges: ["harvard", "stanford", "mit", "uchicago", "yale", "columbia"]
      },
      {
        id: "gmat_gre",
        name: "GMAT / GRE",
        targetMajor: "grad_business",
        description: "Graduate business school test for Harvard Business School and Wharton.",
        minSmarts: 75,
        targetColleges: ["harvard", "wharton"]
      },
      {
        id: "lsat",
        name: "LSAT (Law School Admission Test)",
        targetMajor: "law",
        description: "Rigorous logical reasoning examination for Yale Law, Harvard Law, and Stanford Law.",
        minSmarts: 80,
        targetColleges: ["yale_law", "harvard_law"]
      },
      {
        id: "mcat",
        name: "MCAT (Medical College Admission Test)",
        targetMajor: "medicine",
        description: "Comprehensive medical exam for Johns Hopkins, Harvard Medical, and Stanford Med.",
        minSmarts: 82,
        targetColleges: ["johns_hopkins", "harvard_med"]
      }
    ],
    domesticUniversities: [
      { id: "harvard", name: "Harvard University", tier: 1, prestige: 100, tuitionUSD: 58000, majors: ["Economics & Finance", "Computer Science", "Government & Law", "Biomedical Sciences"], examReq: "sat" },
      { id: "stanford", name: "Stanford University", tier: 1, prestige: 100, tuitionUSD: 60000, majors: ["Computer Science & AI", "Venture & Tech Entrepreneurship", "Electrical Eng"], examReq: "sat" },
      { id: "mit", name: "MIT (Massachusetts Institute of Technology)", tier: 1, prestige: 100, tuitionUSD: 59000, majors: ["Computer Science & AI", "Physics & Quantum Eng", "Robotics"], examReq: "sat" },
      { id: "uchicago", name: "University of Chicago", tier: 1, prestige: 96, tuitionUSD: 62000, majors: ["Quantitative Economics", "Mathematics", "Law & Society"], examReq: "sat" },
      { id: "yale", name: "Yale University", tier: 1, prestige: 98, tuitionUSD: 61000, majors: ["Law & Political Science", "History", "Literature"], examReq: "sat" },
      { id: "uc_berkeley", name: "UC Berkeley", tier: 2, prestige: 94, tuitionUSD: 32000, majors: ["Computer Science", "EECS", "Business Administration (Haas)"], examReq: "sat" },
      { id: "umich", name: "University of Michigan (Ann Arbor)", tier: 2, prestige: 90, tuitionUSD: 34000, majors: ["Ross Business", "Mechanical Engineering", "Computer Science"], examReq: "sat" },
      { id: "ut_austin", name: "UT Austin", tier: 3, prestige: 86, tuitionUSD: 24000, majors: ["Computer Science", "Finance", "Petroleum & Energy Eng"], examReq: "sat" },
      { id: "state_college", name: "Regional State University", tier: 4, prestige: 65, tuitionUSD: 14000, majors: ["General Business", "Information Tech", "Communications"], examReq: null },
      { id: "community_college", name: "Community College", tier: 5, prestige: 45, tuitionUSD: 4000, majors: ["Associate of Arts", "Vocational Tech"], examReq: null }
    ]
  },

  uk: {
    id: "uk",
    name: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    exchangeRateToUSD: 0.79,
    flag: "🇬🇧",
    livingCostIndex: 0.90,
    taxBrackets: [
      { max: 12570, rate: 0 },
      { max: 50270, rate: 0.20 },
      { max: 125140, rate: 0.40 },
      { max: Infinity, rate: 0.45 }
    ],
    schoolBoards: [
      { id: "uk_alevels", name: "A-Levels (Sixth Form)", rigor: "Very High", prestige: 92, desc: "Specialized in 3-4 subjects with deep academic focus required for Oxbridge and Russell Group." },
      { id: "uk_public_school", name: "Historic Public School (Eton / Harrow / Winchester)", rigor: "Extreme", prestige: 99, desc: "Centuries-old aristocracy academies producing prime ministers and global leaders." },
      { id: "uk_comprehensive", name: "UK Comprehensive High School", rigor: "Moderate", prestige: 70, desc: "Standard British secondary education with GCSE qualifications." }
    ],
    entranceExams: [
      {
        id: "oxbridge_admissions",
        name: "Oxbridge Admissions Test & Interview",
        targetMajor: "general",
        description: "Subject tests (MAT/PAT/TSA) followed by legendary tutorial interviews.",
        minSmarts: 85,
        targetColleges: ["oxford", "cambridge"]
      }
    ],
    domesticUniversities: [
      { id: "oxford", name: "University of Oxford", tier: 1, prestige: 100, tuitionUSD: 36000, majors: ["Philosophy, Politics & Economics (PPE)", "Law", "Computer Science", "Medicine"], examReq: "oxbridge_admissions" },
      { id: "cambridge", name: "University of Cambridge", tier: 1, prestige: 100, tuitionUSD: 37000, majors: ["Natural Sciences", "Mathematics & Computing", "Engineering"], examReq: "oxbridge_admissions" },
      { id: "imperial", name: "Imperial College London", tier: 1, prestige: 96, tuitionUSD: 38000, majors: ["Computing & AI", "Biomedical Eng", "Finance & Fintech"], examReq: null },
      { id: "lse", name: "London School of Economics (LSE)", tier: 1, prestige: 95, tuitionUSD: 34000, majors: ["Economics", "Investment Finance", "International Law"], examReq: null },
      { id: "ucl", name: "University College London (UCL)", tier: 2, prestige: 91, tuitionUSD: 32000, majors: ["Computer Science", "Architecture", "Medicine"], examReq: null },
      { id: "edinburgh", name: "University of Edinburgh", tier: 2, prestige: 88, tuitionUSD: 28000, majors: ["Informatics & AI", "Literature", "Law"], examReq: null }
    ]
  },

  singapore: {
    id: "singapore",
    name: "Singapore",
    currency: "SGD",
    symbol: "S$",
    exchangeRateToUSD: 1.34,
    flag: "🇸🇬",
    livingCostIndex: 0.95,
    taxBrackets: [
      { max: 20000, rate: 0 },
      { max: 30000, rate: 0.02 },
      { max: 40000, rate: 0.035 },
      { max: 80000, rate: 0.07 },
      { max: 120000, rate: 0.115 },
      { max: 160000, rate: 0.15 },
      { max: 200000, rate: 0.19 },
      { max: 320000, rate: 0.22 },
      { max: Infinity, rate: 0.24 }
    ],
    schoolBoards: [
      { id: "sg_junior_college", name: "Singapore Junior College (Raffles / Hwa Chong)", rigor: "Extreme", prestige: 97, desc: "Globally recognized math and science pressure-cooker preparing for top world unis." },
      { id: "sg_polytechnic", name: "Singapore Polytechnic", rigor: "Practical", prestige: 75, desc: "Hands-on applied diploma pathways." }
    ],
    entranceExams: [],
    domesticUniversities: [
      { id: "nus", name: "National University of Singapore (NUS)", tier: 1, prestige: 97, tuitionUSD: 22000, majors: ["Computer Science", "Business Analytics", "Law", "Medicine"], examReq: null },
      { id: "ntu", name: "Nanyang Technological University (NTU)", tier: 1, prestige: 95, tuitionUSD: 21000, majors: ["AI & Data Engineering", "Materials Science", "Aerospace"], examReq: null },
      { id: "smu", name: "Singapore Management University (SMU)", tier: 2, prestige: 89, tuitionUSD: 24000, majors: ["Quantitative Finance", "Corporate Law", "Information Systems"], examReq: null }
    ]
  },

  germany: {
    id: "germany",
    name: "Germany",
    currency: "EUR",
    symbol: "€",
    exchangeRateToUSD: 0.92,
    flag: "🇩🇪",
    livingCostIndex: 0.82,
    taxBrackets: [
      { max: 11604, rate: 0 },
      { max: 66760, rate: 0.24 },
      { max: 277825, rate: 0.42 },
      { max: Infinity, rate: 0.45 }
    ],
    schoolBoards: [
      { id: "de_gymnasium", name: "Gymnasium (Abitur)", rigor: "High", prestige: 90, desc: "University-preparatory high school track awarding the rigorous Abitur qualification." },
      { id: "de_realschule", name: "Realschule / Vocational Track", rigor: "Moderate", prestige: 70, desc: "Dual education system connecting classroom study with industrial apprenticeships." }
    ],
    entranceExams: [],
    domesticUniversities: [
      { id: "tum", name: "Technical University of Munich (TUM)", tier: 1, prestige: 95, tuitionUSD: 1500, majors: ["Automotive & Robotics", "Informatics AI", "Aerospace"], examReq: null },
      { id: "lmu_munich", name: "LMU Munich", tier: 2, prestige: 91, tuitionUSD: 1200, majors: ["Medicine", "Physics", "Law"], examReq: null },
      { id: "heidelberg", name: "Heidelberg University", tier: 2, prestige: 92, tuitionUSD: 1400, majors: ["Medicine & Surgery", "Biochemistry", "Philosophy"], examReq: null }
    ]
  },

  canada: {
    id: "canada",
    name: "Canada",
    currency: "CAD",
    symbol: "C$",
    exchangeRateToUSD: 1.36,
    flag: "🇨🇦",
    livingCostIndex: 0.85,
    taxBrackets: [
      { max: 55867, rate: 0.15 },
      { max: 111733, rate: 0.205 },
      { max: 173205, rate: 0.26 },
      { max: 246752, rate: 0.29 },
      { max: Infinity, rate: 0.33 }
    ],
    schoolBoards: [
      { id: "ca_highschool", name: "Canadian Provincial High School (OSSD / BC)", rigor: "High", prestige: 85, desc: "Credit-based curriculum with high academic standards and extracurriculars." }
    ],
    entranceExams: [],
    domesticUniversities: [
      { id: "utoronto", name: "University of Toronto", tier: 1, prestige: 95, tuitionUSD: 28000, majors: ["Computer Science & Deep Learning", "Rotman Finance", "Medicine"], examReq: null },
      { id: "mcgill", name: "McGill University", tier: 1, prestige: 93, tuitionUSD: 26000, majors: ["Neuroscience & Medicine", "Desautels Management", "Law"], examReq: null },
      { id: "ubc", name: "University of British Columbia (UBC)", tier: 2, prestige: 90, tuitionUSD: 27000, majors: ["Data Science", "Forestry & Clean Energy", "Sauder Business"], examReq: null },
      { id: "waterloo", name: "University of Waterloo", tier: 1, prestige: 94, tuitionUSD: 30000, majors: ["Software Engineering (Co-op)", "Quantum Computing", "Actuarial Science"], examReq: null }
    ]
  },

  switzerland: {
    id: "switzerland",
    name: "Switzerland",
    currency: "CHF",
    symbol: "CHF",
    exchangeRateToUSD: 0.89,
    flag: "🇨🇭",
    livingCostIndex: 1.35,
    taxBrackets: [
      { max: 35000, rate: 0.05 },
      { max: 80000, rate: 0.12 },
      { max: 150000, rate: 0.18 },
      { max: 300000, rate: 0.22 },
      { max: Infinity, rate: 0.28 }
    ],
    schoolBoards: [
      { id: "ch_matura", name: "Swiss Matura Gymnasium", rigor: "Very High", prestige: 94, desc: "High academic excellence in multilingual sciences and humanities." }
    ],
    entranceExams: [],
    domesticUniversities: [
      { id: "eth_zurich", name: "ETH Zurich (Swiss Federal Institute of Technology)", tier: 1, prestige: 99, tuitionUSD: 2000, majors: ["Computer Science & Robotics", "Quantum Physics", "Mechanical Eng"], examReq: null },
      { id: "epfl", name: "EPFL Lausanne", tier: 1, prestige: 96, tuitionUSD: 2000, majors: ["Microengineering", "Computer Science", "Life Sciences"], examReq: null },
      { id: "univ_zurich", name: "University of Zurich", tier: 2, prestige: 90, tuitionUSD: 2200, majors: ["Banking & Wealth Management", "Law", "Medicine"], examReq: null }
    ]
  },

  japan: {
    id: "japan",
    name: "Japan",
    currency: "JPY",
    symbol: "¥",
    exchangeRateToUSD: 155,
    flag: "🇯🇵",
    livingCostIndex: 0.75,
    taxBrackets: [
      { max: 1950000, rate: 0.05 },
      { max: 3300000, rate: 0.10 },
      { max: 6950000, rate: 0.20 },
      { max: 9000000, rate: 0.23 },
      { max: 18000000, rate: 0.33 },
      { max: Infinity, rate: 0.45 }
    ],
    schoolBoards: [
      { id: "jp_highschool", name: "Japanese Academic High School (Kotogakko)", rigor: "Extreme", prestige: 92, desc: "Intense entrance exam culture with juku cram schools and strict discipline." }
    ],
    entranceExams: [
      {
        id: "todai_exam",
        name: "National Common Test & Todai Second Exam",
        targetMajor: "general",
        description: "Legendary entrance gauntlet for the University of Tokyo.",
        minSmarts: 85,
        targetColleges: ["tokyo_univ"]
      }
    ],
    domesticUniversities: [
      { id: "tokyo_univ", name: "University of Tokyo (Todai)", tier: 1, prestige: 98, tuitionUSD: 4500, majors: ["Law & Bureaucracy", "Precision Robotics", "Physics"], examReq: "todai_exam" },
      { id: "kyoto_univ", name: "Kyoto University", tier: 1, prestige: 96, tuitionUSD: 4500, majors: ["Theoretical Physics", "Biomedical Research", "Philosophy"], examReq: null },
      { id: "waseda", name: "Waseda University", tier: 2, prestige: 89, tuitionUSD: 9000, majors: ["Political Science & Economics", "Commerce"], examReq: null }
    ]
  },

  australia: {
    id: "australia",
    name: "Australia",
    currency: "AUD",
    symbol: "A$",
    exchangeRateToUSD: 1.52,
    flag: "🇦🇺",
    livingCostIndex: 0.90,
    taxBrackets: [
      { max: 18200, rate: 0 },
      { max: 45000, rate: 0.19 },
      { max: 120000, rate: 0.325 },
      { max: 180000, rate: 0.37 },
      { max: Infinity, rate: 0.45 }
    ],
    schoolBoards: [
      { id: "au_atar", name: "Australian ATAR High School System", rigor: "High", prestige: 86, desc: "Senior secondary certificate ranked by Australian Tertiary Admission Rank." }
    ],
    entranceExams: [],
    domesticUniversities: [
      { id: "unimelb", name: "University of Melbourne", tier: 1, prestige: 95, tuitionUSD: 29000, majors: ["BioMedicine", "Commerce", "Software Systems"], examReq: null },
      { id: "unisyd", name: "University of Sydney", tier: 1, prestige: 93, tuitionUSD: 30000, majors: ["Law", "Medicine", "Financial Economics"], examReq: null },
      { id: "anu", name: "Australian National University (ANU)", tier: 2, prestige: 91, tuitionUSD: 28000, majors: ["Strategic Studies", "Astrophysics", "Computing"], examReq: null }
    ]
  },

  uae: {
    id: "uae",
    name: "United Arab Emirates",
    currency: "AED",
    symbol: "AED",
    exchangeRateToUSD: 3.67,
    flag: "🇦🇪",
    livingCostIndex: 0.88,
    taxBrackets: [
      { max: Infinity, rate: 0 }
    ],
    schoolBoards: [
      { id: "uae_intl_ib", name: "Dubai International Academy (IB / British)", rigor: "High", prestige: 92, desc: "Cosmopolitan international school with high expat network." },
      { id: "uae_cbse_school", name: "Indian International School (CBSE)", rigor: "High", prestige: 85, desc: "Popular CBSE curriculum for Indian diaspora in Dubai/Abu Dhabi." }
    ],
    entranceExams: [],
    domesticUniversities: [
      { id: "khalifa_univ", name: "Khalifa University", tier: 2, prestige: 88, tuitionUSD: 18000, majors: ["Petroleum & Clean Energy Eng", "Robotics", "AI"], examReq: null },
      { id: "nyu_abudhabi", name: "NYU Abu Dhabi", tier: 1, prestige: 95, tuitionUSD: 52000, majors: ["Global Economics", "Computer Science", "Middle Eastern Politics"], examReq: null }
    ]
  }
};
