// School, curriculum, and institution generation for the canonical runtime.
// A board describes the academic context; an institution describes the actual
// school the character attends. Keeping these separate prevents a curriculum
// label from pretending to be a school, a peer group, or a budget.

import { generateClassmatesCohort, generateSchoolFaculty } from "./social_school_engine.js";
import { requestEducationPayment } from "./family_finance_engine.js";
import { COUNTRIES } from "../data/countries.js";

const SCHOOL_TYPES = {
  government: { name: "Government school", feeBand: [0, 180], quality: [0.68, 0.88], classSize: [32, 58], peerStrength: [34, 62], counselor: [28, 52], activities: ["debate", "athletics"] },
  public: { name: "Neighborhood public school", feeBand: [250, 1800], quality: [0.76, 0.98], classSize: [24, 42], peerStrength: [42, 72], counselor: [38, 66], activities: ["debate", "athletics", "newspaper"] },
  private: { name: "Mainstream private school", feeBand: [1800, 7800], quality: [0.84, 1.08], classSize: [18, 34], peerStrength: [52, 82], counselor: [48, 76], activities: ["debate", "athletics", "newspaper", "coding"] },
  elite: { name: "Selective independent school", feeBand: [9000, 28000], quality: [1.0, 1.22], classSize: [10, 22], peerStrength: [72, 96], counselor: [72, 96], activities: ["debate", "robotics", "research", "sports", "arts"] },
  international: { name: "International school", feeBand: [14000, 42000], quality: [1.02, 1.25], classSize: [12, 24], peerStrength: [68, 94], counselor: [74, 98], activities: ["debate", "robotics", "research", "sports", "arts", "model_un"] },
  boarding: { name: "Boarding school", feeBand: [22000, 65000], quality: [1.05, 1.28], classSize: [12, 22], peerStrength: [70, 98], counselor: [70, 94], activities: ["debate", "robotics", "sports", "arts", "student_gov"] }
};

const CURRICULUM_PROFILES = {
  cbse: { name: "CBSE", family: "india", gradingScale: "percentage", examOrientation: 0.88, courseBreadth: 0.58, projectLoad: 0.38, writingDemand: 0.52, researchDemand: 0.34, entranceAlignment: 0.88, subjects: ["mathematics", "physics", "chemistry", "english", "biology"] },
  icse: { name: "ICSE / ISC", family: "india", gradingScale: "percentage", examOrientation: 0.72, courseBreadth: 0.82, projectLoad: 0.62, writingDemand: 0.82, researchDemand: 0.56, entranceAlignment: 0.66, subjects: ["mathematics", "physics", "chemistry", "english", "history", "biology"] },
  state_board: { name: "State board", family: "india", gradingScale: "percentage", examOrientation: 0.68, courseBreadth: 0.62, projectLoad: 0.34, writingDemand: 0.56, researchDemand: 0.28, entranceAlignment: 0.52, subjects: ["mathematics", "english", "physics", "chemistry", "history"] },
  ib_india: { name: "IB Diploma", family: "international", gradingScale: "ib_45", examOrientation: 0.58, courseBreadth: 0.78, projectLoad: 0.92, writingDemand: 0.86, researchDemand: 0.92, entranceAlignment: 0.76, subjects: ["mathematics", "physics", "chemistry", "english", "economics", "research"] },
  us_public_ap: { name: "US AP / Honors", family: "usa", gradingScale: "gpa_5", examOrientation: 0.62, courseBreadth: 0.88, projectLoad: 0.66, writingDemand: 0.72, researchDemand: 0.58, entranceAlignment: 0.74, subjects: ["mathematics", "english", "biology", "history", "economics", "computerScience"] },
  us_prep_school: { name: "US independent prep", family: "usa", gradingScale: "gpa_5", examOrientation: 0.64, courseBreadth: 0.92, projectLoad: 0.72, writingDemand: 0.82, researchDemand: 0.78, entranceAlignment: 0.84, subjects: ["mathematics", "english", "biology", "history", "economics", "computerScience"] },
  us_standard: { name: "Standard US high school", family: "usa", gradingScale: "gpa_4", examOrientation: 0.52, courseBreadth: 0.72, projectLoad: 0.52, writingDemand: 0.58, researchDemand: 0.36, entranceAlignment: 0.54, subjects: ["mathematics", "english", "biology", "history"] },
  uk_alevels: { name: "A-Levels", family: "uk", gradingScale: "a_level", examOrientation: 0.82, courseBreadth: 0.38, projectLoad: 0.42, writingDemand: 0.68, researchDemand: 0.60, entranceAlignment: 0.86, subjects: ["mathematics", "physics", "chemistry", "english", "economics", "history"] },
  uk_comprehensive: { name: "UK comprehensive / GCSE", family: "uk", gradingScale: "gcse_9", examOrientation: 0.74, courseBreadth: 0.82, projectLoad: 0.46, writingDemand: 0.64, researchDemand: 0.46, entranceAlignment: 0.64, subjects: ["mathematics", "english", "physics", "chemistry", "biology", "history"] },
  de_gymnasium: { name: "Gymnasium / Abitur", family: "germany", gradingScale: "german_1", examOrientation: 0.76, courseBreadth: 0.76, projectLoad: 0.44, writingDemand: 0.62, researchDemand: 0.50, entranceAlignment: 0.76, subjects: ["mathematics", "physics", "chemistry", "english", "history"] },
  de_realschule: { name: "Realschule / vocational track", family: "germany", gradingScale: "german_1", examOrientation: 0.58, courseBreadth: 0.56, projectLoad: 0.60, writingDemand: 0.48, researchDemand: 0.32, entranceAlignment: 0.48, subjects: ["mathematics", "english", "physics", "computerScience"] },
  gaokao_curriculum: { name: "Gaokao curriculum", family: "china", gradingScale: "percentage", examOrientation: 0.94, courseBreadth: 0.66, projectLoad: 0.28, writingDemand: 0.58, researchDemand: 0.24, entranceAlignment: 0.92, subjects: ["mathematics", "physics", "chemistry", "english", "history"] }
};

const COUNTRY_DEFAULTS = {
  india: ["government", "private", "elite", "international"],
  usa: ["public", "private", "elite", "boarding"],
  uk: ["public", "private", "elite", "boarding"],
  germany: ["public", "private", "elite"],
  china: ["public", "private", "elite"],
  singapore: ["public", "private", "international"],
  default: ["public", "private", "international"]
};

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function integerBetween(min, max) {
  return Math.round(randomBetween(min, max));
}

function chooseCurriculum(country, schoolType, preferredBoard = null) {
  const boards = country.schoolBoards || [];
  const board = boards.find(item => item.id === preferredBoard) || boards.find(item => {
    if (schoolType === "international") return ["ib_india", "us_prep_school", "uk_alevels"].includes(item.id);
    if (schoolType === "elite") return !["state_board", "us_standard", "uk_comprehensive", "de_realschule"].includes(item.id);
    return true;
  }) || boards[0];
  return board ? (CURRICULUM_PROFILES[board.id] ? { ...board, ...CURRICULUM_PROFILES[board.id] } : board) : {
    id: "general",
    name: "General national curriculum",
    family: country.id,
    gradingScale: "percentage",
    examOrientation: 0.6,
    courseBreadth: 0.65,
    projectLoad: 0.45,
    writingDemand: 0.55,
    researchDemand: 0.35,
    entranceAlignment: 0.5,
    subjects: ["mathematics", "english", "science", "history"]
  };
}

export function createSchoolCandidate({ country, schoolType = "public", age = 6, household = {}, preferredBoard = null } = {}) {
  const profile = SCHOOL_TYPES[schoolType] || SCHOOL_TYPES.public;
  const curriculum = chooseCurriculum(country, schoolType, preferredBoard);
  const incomePercentile = Number(household.incomePercentile) || 50;
  const affordability = Math.max(0.55, Math.min(1.35, 0.78 + incomePercentile / 240));
  const quality = Number(randomBetween(profile.quality[0], profile.quality[1]).toFixed(2));
  const annualTuitionUSD = Math.round(randomBetween(profile.feeBand[0], profile.feeBand[1]) * (0.76 + quality * 0.24));
  const namePrefix = country.id === "india" ? ["Delhi Public", "National", "Vidya", "Bengaluru"] : country.id === "usa" ? ["Northside", "Riverside", "Oakridge", "St. Catherine's"] : ["Central", "Riverside", "Northbridge", "St. Edmund's"];
  const prefix = namePrefix[integerBetween(0, namePrefix.length - 1)];
  const id = `${country.id}_${schoolType}_${age}_${Math.random().toString(36).slice(2, 8)}`;
  return {
    id,
    name: `${prefix} ${profile.name}`,
    country: country.id,
    city: country.name,
    type: schoolType,
    curriculumId: curriculum.id || "general",
    curriculum: curriculum.name,
    annualTuitionUSD,
    applicationFeeUSD: Math.round(Math.min(annualTuitionUSD * 0.08, 750)),
    transportUSD: Math.round(Math.max(0, annualTuitionUSD * 0.06)),
    booksUniformsUSD: Math.round(Math.max(120, annualTuitionUSD * 0.08)),
    activityFeesUSD: Math.round(Math.max(0, annualTuitionUSD * 0.04)),
    totalAnnualCostUSD: Math.round((annualTuitionUSD + Math.max(0, annualTuitionUSD * 0.06) + Math.max(120, annualTuitionUSD * 0.08) + Math.max(0, annualTuitionUSD * 0.04)) / affordability),
    quality,
    teacherQuality: Math.round(quality * 82),
    workload: Math.round(38 + quality * 34 + (curriculum.projectLoad || 0) * 20),
    gradingStrictness: Math.round(42 + quality * 28 + (curriculum.examOrientation || 0) * 18),
    classSize: integerBetween(profile.classSize[0], profile.classSize[1]),
    peerAcademicStrength: integerBetween(profile.peerStrength[0], profile.peerStrength[1]),
    counselorQuality: integerBetween(profile.counselor[0], profile.counselor[1]),
    activities: profile.activities,
    curriculumProfile: curriculum,
    selectedAtAge: age,
    availability: "available"
  };
}

export function generateSchoolCandidates({ country, age = 6, household = {}, preferredBoard = null } = {}) {
  const types = COUNTRY_DEFAULTS[country.id] || COUNTRY_DEFAULTS.default;
  return types.map(type => createSchoolCandidate({ country, schoolType: type, age, household, preferredBoard }));
}

function ensureEducationCollections(state) {
  state.education = state.education || {};
  state.education.schoolChoices = state.education.schoolChoices || [];
  state.education.enrollmentHistory = state.education.enrollmentHistory || [];
  state.education.academic = state.education.academic || null;
  state.education.social = state.education.social || null;
}

export function enrollInSchool(state, school) {
  ensureEducationCollections(state);
  const payment = requestEducationPayment(state, {
    amountUSD: school.totalAnnualCostUSD,
    type: "school_fees",
    description: `${school.name} annual education costs`,
    mandatory: true
  });
  if (!payment.success) return payment;

  const previous = state.education.currentInstitution;
  state.education.currentInstitution = { ...school, enrolledAtAge: state.character.age };
  state.education.schoolBoard = school.curriculumId;
  state.education.curriculumContext = {
    country: school.country,
    representation: school.curriculum,
    gradingScale: school.curriculumProfile?.gradingScale || "percentage",
    profile: school.curriculumProfile || null
  };
  state.education.enrollmentHistory.push({
    age: state.character.age,
    action: previous ? "transfer" : "enrollment",
    institutionId: school.id,
    institutionName: school.name,
    curriculum: school.curriculum,
    annualCostUSD: school.totalAnnualCostUSD,
    payer: payment.payer
  });
  state.education.schoolChoices = [];
  state.education.stage = state.character.age >= 14 ? "upper_secondary" : state.education.stage;
  return { ...payment, school };
}

export function ensureSchoolCohort(state) {
  ensureEducationCollections(state);
  const school = state.education.currentInstitution;
  if (!school) return null;
  if (!state.education.teachers?.length) state.education.teachers = generateSchoolFaculty(state.character.currentCountry);
  if (!state.education.social?.classmates?.length) {
    state.education.social = {
      classmates: generateClassmatesCohort(Math.max(10, Math.min(24, Math.round(42 - school.classSize / 2)))),
      friendships: [],
      clubs: [],
      parties: [],
      discipline: { incidents: [], merits: [], standing: 70 }
    };
  }
  return state.education.social;
}

export function generateAndSetSchoolChoices(state, age = state.character.age, preferredBoard = null) {
  const country = COUNTRIES[state.character.currentCountry] || COUNTRIES.india;
  const choices = generateSchoolCandidates({ country, age, household: state.family?.household, preferredBoard });
  ensureEducationCollections(state);
  state.education.schoolChoices = choices;
  return choices;
}

export { CURRICULUM_PROFILES, SCHOOL_TYPES };
