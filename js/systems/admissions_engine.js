// Admissions are deliberately separate from enrollment. An application is a
// decision record; only an admitted record can become an enrolled program.

import { COUNTRIES } from "../data/countries.js";
import { GLOBAL_UNIVERSITIES } from "../data/education.js";
import { EducationExamEngine } from "./education_exam_engine.js";
import { requestEducationPayment } from "./family_finance_engine.js";

const COUNTRY_DURATION = { india: 4, usa: 4, uk: 3, singapore: 4, germany: 3, canada: 4, switzerland: 3, japan: 4, australia: 3, uae: 4 };
const UK_TOP_NAMES = ["university of oxford", "university of cambridge"];

function normalizeName(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function normalizeUniversity(university, sourceCountry = null) {
  const country = university.country || sourceCountry || "usa";
  const tuition = university.tuitionPerYearUSD ?? university.tuitionUSD ?? 0;
  const nameKey = normalizeName(university.name);
  const isUKTop = country === "uk" && UK_TOP_NAMES.includes(nameKey);
  const inferredExamReq = university.examReq || (country === "india" && /iit|bits/.test(nameKey) ? "jee" : country === "india" && /aiims|medical|cmc/.test(nameKey) ? "neet" : null);
  const admissionModel = country === "usa" ? "us_holistic" : country === "uk" ? "uk_course" : country === "india" && inferredExamReq ? "national_exam" : "academic_record";
  return {
    ...university,
    id: university.id,
    country,
    city: university.city || COUNTRIES[country]?.name || "Local",
    tuitionPerYearUSD: tuition,
    durationYears: university.durationYears || COUNTRY_DURATION[country] || 4,
    livingCostPerYearUSD: university.livingCostPerYearUSD ?? Math.round(tuition * (country === "india" || country === "germany" ? 0.42 : 0.62)),
    applicationFeeUSD: university.applicationFeeUSD ?? (university.tier === 1 ? 85 : 45),
    acceptanceRate: university.acceptanceRate ?? (university.tier === 1 ? 0.22 : 0.58),
    admissionModel,
    isUKTop,
    examReq: inferredExamReq,
    majors: university.majors || ["General studies"]
  };
}

export function getUniversityCatalog(state = null) {
  const source = [...GLOBAL_UNIVERSITIES];
  const currentCountry = state?.character?.currentCountry;
  if (currentCountry && COUNTRIES[currentCountry]?.domesticUniversities) {
    source.push(...COUNTRIES[currentCountry].domesticUniversities.map(university => ({ ...university, country: currentCountry })));
  }
  const seen = new Set();
  return source.map(university => normalizeUniversity(university)).filter(university => {
    const key = `${university.country}:${normalizeName(university.name)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function scoreValue(record) {
  if (record == null) return null;
  if (typeof record === "object") return Number(record.rawScore ?? record.score ?? null);
  return Number(record);
}

function percentileValue(record) {
  if (!record || typeof record !== "object") return null;
  return Number(record.percentile ?? null);
}

function activityProfile(state) {
  const clubs = state.education?.social?.clubs || [];
  const awards = clubs.reduce((sum, club) => sum + (club.awards?.length || 0), 0);
  const leadership = clubs.reduce((sum, club) => sum + (club.role?.toLowerCase().includes("captain") || club.role?.toLowerCase().includes("president") ? 1 : 0), 0);
  const depth = clubs.reduce((sum, club) => sum + Math.min(5, club.level || 1), 0);
  return { clubs: clubs.length, awards, leadership, depth, ecTier: Math.min(5, Math.max(1, Math.ceil((depth + awards * 2 + leadership * 3 + clubs.length) / 3))) };
}

export function buildApplicantProfile(state) {
  const academic = state.education?.academic || {};
  const institution = state.education?.currentInstitution || {};
  const teachers = state.education?.teachers || [];
  const letters = teachers.map(teacher => teacher.lor?.hiddenScore || ((teacher.impression?.intellectScore || 50) + (teacher.impression?.workEthicScore || 50)) / 2);
  const activities = activityProfile(state);
  const essay = state.education?.essay || { draftStage: 1, polish: 35, authenticity: 82 };
  const gpa = Number(state.education?.gpa) || 0;
  const rigor = Math.min(1, Math.max(0.2, (institution.quality || 0.8) * 0.55 + (institution.curriculumProfile?.examOrientation || 0.55) * 0.45));
  const aLevelSubjects = institution.curriculumProfile?.subjects || [];
  return {
    gpa,
    gpaWeighted: Math.max(0.1, (gpa / 4) * 5),
    rigorIndex: rigor,
    satScore: scoreValue(state.education?.examScores?.sat) ?? (scoreValue(state.education?.examScores?.act) != null ? Math.round(scoreValue(state.education.examScores.act) * 40 + 480) : null),
    actScore: scoreValue(state.education?.examScores?.act),
    examScores: state.education?.examScores || {},
    ecTier: activities.ecTier,
    hasSpike: activities.awards >= 2 || activities.leadership >= 1,
    lorScore: letters.length ? letters.reduce((sum, score) => sum + score, 0) / letters.length : 42,
    essayDrafts: essay.draftStage || 1,
    essayPolish: essay.polish,
    essayAuthenticity: essay.authenticity,
    aLevelSubjects,
    activities,
    firstGen: Boolean(state.family?.firstGenerationStudent),
    isFirstGen: Boolean(state.family?.firstGenerationStudent)
  };
}

function academicFallback(profile, university) {
  const gpaRatio = Math.max(0, Math.min(1, profile.gpa / Math.max(1, university.minGPA || 4)));
  const rigor = profile.rigorIndex || 0.55;
  const activity = (profile.activities?.ecTier || 0) / 5;
  const probability = Math.max(0.02, Math.min(0.96, university.acceptanceRate * (0.55 + gpaRatio * 0.55 + rigor * 0.25 + activity * 0.2)));
  const roll = Math.random();
  return { decision: roll < probability * 0.72 ? "admitted" : roll < probability ? "waitlisted" : "rejected", probability };
}

function evaluateNationalExam(profile, university) {
  const scores = profile.examScores || {};
  if (university.examReq === "jee") {
    const result = scores.jee_advanced;
    const percentile = percentileValue(result);
    if (percentile == null) return { decision: "rejected", reason: "JEE Advanced result required for this program." };
    const cutoff = university.tier === 1 ? 99.2 : university.tier === 2 ? 96 : 88;
    return { decision: percentile >= cutoff ? "admitted" : percentile >= cutoff - 1.5 ? "waitlisted" : "rejected", reason: `JEE Advanced cutoff modeled at ${cutoff}%ile.`, cutoff };
  }
  if (university.examReq === "neet") {
    const score = scoreValue(scores.neet);
    const cutoff = university.tier === 1 ? 690 : university.tier === 2 ? 620 : 520;
    if (score == null) return { decision: "rejected", reason: "NEET UG result required for this program." };
    return { decision: score >= cutoff ? "admitted" : score >= cutoff - 45 ? "waitlisted" : "rejected", reason: `NEET score cutoff modeled at ${cutoff}.`, cutoff };
  }
  if (university.examReq === "cat") {
    const percentile = scoreValue(scores.cat);
    const cutoff = university.tier === 1 ? 98 : 85;
    if (percentile == null) return { decision: "rejected", reason: "CAT percentile required for this program." };
    return { decision: percentile >= cutoff ? "admitted" : percentile >= cutoff - 5 ? "waitlisted" : "rejected", reason: `CAT cutoff modeled at ${cutoff}%ile.`, cutoff };
  }
  return academicFallback(profile, university);
}

export function evaluateAdmission(state, universityInput, major = null) {
  const university = normalizeUniversity(universityInput, universityInput.country);
  const profile = buildApplicantProfile(state);
  const result = { universityId: university.id, universityName: university.name, major: major || university.majors[0], model: university.admissionModel, requirements: [], decision: "rejected" };

  if (university.country === "india" && university.examReq) {
    Object.assign(result, evaluateNationalExam(profile, university));
    return { ...result, profile: { gpa: profile.gpa, activities: profile.activities } };
  }

  if (university.admissionModel === "us_holistic") {
    if (university.minSAT && profile.satScore == null && profile.actScore == null) {
      return { ...result, decision: "rejected", reason: `SAT ${university.minSAT}+ or an ACT result is required.` };
    }
    if (university.minSAT && profile.satScore != null && profile.satScore < university.minSAT - 80 && profile.actScore == null) {
      result.requirements.push(`SAT target ${university.minSAT}`);
    }
    const committee = EducationExamEngine.evaluateUSHolisticAdmissions(profile, university);
    const decision = committee.decision === "ADMIT" ? "admitted" : committee.decision === "WAITLIST" ? "waitlisted" : "rejected";
    return { ...result, decision, committee, reason: "Two-reader holistic committee review." };
  }

  if (university.admissionModel === "uk_course") {
    const test = percentileValue(profile.examScores.uk_admissions) ?? percentileValue(profile.examScores.uk_mat) ?? percentileValue(profile.examScores.uk_pat) ?? percentileValue(profile.examScores.uk_tmua);
    if (university.isUKTop && test == null) return { ...result, decision: "rejected", reason: "Course-specific UK admissions test result required; SAT is not substituted." };
    const gradeBase = profile.gpa >= 3.7 ? ["A*", "A", "A"] : profile.gpa >= 3.2 ? ["A", "A", "B"] : profile.gpa >= 2.7 ? ["B", "B", "C"] : ["C", "C", "C"];
    const ucas = EducationExamEngine.evaluateUCASApplication({ aLevelSubjects: profile.aLevelSubjects, predictedGrades: gradeBase }, { mandatorySubjects: [], conditionalOffer: { aLevelGrades: university.isUKTop ? ["A*", "A", "A"] : ["A", "B", "B"] } });
    if (ucas.decision === "CONDITIONAL_OFFER" && (!university.isUKTop || test >= 70)) return { ...result, decision: "admitted", reason: "Course-based UCAS review with conditional offer.", conditions: ucas.conditions };
    return { ...result, decision: profile.gpa >= 3.0 ? "waitlisted" : "rejected", reason: "Predicted grades or admissions-test strength below the course offer." };
  }

  const fallback = academicFallback(profile, university);
  return { ...result, ...fallback, reason: "Transcript, curriculum rigor, and institutional context review." };
}

function ensureApplicationState(state) {
  state.education.applications = state.education.applications || [];
  return state.education.applications;
}

export function submitAdmissionApplication(state, universityInput, major = null) {
  const applications = ensureApplicationState(state);
  const university = normalizeUniversity(universityInput, universityInput.country);
  const isTransfer = Boolean(state.education.currentUniversity);
  const existing = applications.find(application => application.universityId === university.id && application.major === (major || university.majors[0]));
  if (existing) return { success: false, application: existing, message: `Application already recorded: ${existing.decision}.` };
  const payment = requestEducationPayment(state, { amountUSD: university.applicationFeeUSD, type: "application_fee", description: `${university.name} application`, mandatory: false });
  if (!payment.success) return payment;
  const evaluation = evaluateAdmission(state, university, major);
  const application = {
    id: `application_${university.id}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    universityId: university.id,
    universityName: university.name,
    universityCountry: university.country,
    major: evaluation.major,
    submittedAge: state.character.age,
    applicationFeeUSD: university.applicationFeeUSD,
    isTransfer,
    ...evaluation,
    status: evaluation.decision
  };
  applications.unshift(application);
  return { success: true, application, payment, message: `${university.name}: ${evaluation.decision}.` };
}

export function enrollAdmission(state, applicationId) {
  const applications = ensureApplicationState(state);
  const application = applications.find(item => item.id === applicationId);
  if (!application) return { success: false, message: "Application not found." };
  if (application.decision !== "admitted") return { success: false, message: "Only admitted applications can be enrolled." };
  if (state.education.currentUniversity) return { success: false, message: "You are already enrolled at a university." };
  const university = getUniversityCatalog(state).find(item => item.id === application.universityId) || normalizeUniversity(application, application.universityCountry);
  const profile = buildApplicantProfile(state);
  const annualCost = university.tuitionPerYearUSD + university.livingCostPerYearUSD;
  const aid = EducationExamEngine.calculateFinancialAid(annualCost, state.family?.household || {}, profile.gpa * 25, { needMetRatio: university.hasFinancialAid === false ? 0.15 : 0.72, noMeritAid: university.hasFinancialAid === false });
  const firstYearPayment = requestEducationPayment(state, {
    amountUSD: aid.netPricePerYear,
    type: "tuition",
    description: `${university.name} first-year tuition and attendance costs`,
    mandatory: true
  });
  application.status = "enrolled";
  application.aid = aid;
  state.education.currentUniversity = {
    id: university.id,
    name: university.name,
    country: university.country,
    major: application.major,
    tier: university.tier,
    prestige: university.prestige,
    tuitionUSD: aid.netPricePerYear,
    listTuitionUSD: university.tuitionPerYearUSD,
    livingCostUSD: university.livingCostPerYearUSD,
    annualCostUSD: aid.netPricePerYear,
    financialAid: aid,
    year: 1,
    totalYears: university.durationYears,
    attendancePct: 100,
    creditsCompleted: 0,
    transferHistory: []
  };
  state.education.stage = "university";
  state.education.enrollmentHistory = state.education.enrollmentHistory || [];
  state.education.enrollmentHistory.push({ age: state.character.age, action: "university_enrollment", institutionId: university.id, institutionName: university.name, major: application.major, annualCostUSD: aid.netPricePerYear, projectedDebtUSD: aid.projectedTotalDebt });
  state.stats.happiness = Math.min(100, state.stats.happiness + 20);
  state.stats.prestige = Math.min(100, state.stats.prestige + 8);
  return { success: true, university: state.education.currentUniversity, aid, firstYearPayment, message: `Enrolled at ${university.name}. ${firstYearPayment.message}` };
}

export function transferUniversity(state, applicationId) {
  if (!state.education.currentUniversity) return { success: false, message: "You are not currently enrolled." };
  const app = (state.education.applications || []).find(item => item.id === applicationId && item.decision === "admitted");
  if (!app) return { success: false, message: "An admitted transfer application is required." };
  const old = state.education.currentUniversity;
  state.education.currentUniversity = null;
  const result = enrollAdmission(state, applicationId);
  if (!result.success) state.education.currentUniversity = old;
  if (result.success) {
    result.university.transferHistory = [...(old.transferHistory || []), { from: old.name, age: state.character.age }];
  }
  return result;
}

export { normalizeUniversity };
