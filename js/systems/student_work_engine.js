// Legal, local student employment. Job income is credited to the student's
// account and hours consume the same 168-hour schedule as school and sleep.

import { STUDENT_JOBS_CATALOG } from "../data/education_data.js";
import { COUNTRIES } from "../data/countries.js";
import { setTimeAllocation } from "./academic_engine.js";
import { calculateLegacySmarts } from "./student_engine.js";

const EMPLOYMENT_RULES = {
  india: { minimumAge: 14, schoolWeekMax: 14, wageMultiplier: 0.48, parentConsentUnder: 16, restricted: ["nightclub", "hazardous"] },
  usa: { minimumAge: 14, schoolWeekMax: 18, wageMultiplier: 0.96, parentConsentUnder: 16, restricted: ["nightclub", "hazardous"] },
  uk: { minimumAge: 13, schoolWeekMax: 16, wageMultiplier: 0.92, parentConsentUnder: 16, restricted: ["nightclub", "hazardous"] },
  germany: { minimumAge: 15, schoolWeekMax: 15, wageMultiplier: 0.94, parentConsentUnder: 18, restricted: ["nightclub", "hazardous"] },
  singapore: { minimumAge: 15, schoolWeekMax: 16, wageMultiplier: 0.9, parentConsentUnder: 16, restricted: ["nightclub", "hazardous"] },
  default: { minimumAge: 14, schoolWeekMax: 14, wageMultiplier: 0.8, parentConsentUnder: 16, restricted: ["nightclub", "hazardous"] }
};

function ensureWorkState(state) {
  state.education = state.education || {};
  state.education.employment = state.education.employment || { applications: [], history: [], activeJob: null };
  state.education.employment.applications = state.education.employment.applications || [];
  state.education.employment.history = state.education.employment.history || [];
  state.finances = state.finances || {};
  state.finances.studentAccount = state.finances.studentAccount || { cashUSD: 0, lifetimeEarningsUSD: 0, ledger: [] };
  return state.education.employment;
}

function rulesFor(state) {
  return EMPLOYMENT_RULES[state.character?.currentCountry] || EMPLOYMENT_RULES.default;
}

function relevantSkillScore(state, job) {
  const skills = state.cognition?.learnedSkills || {};
  const traits = state.cognition?.traits || {};
  const skillValues = Object.values(job.gainedSkills || {}).map((_, index) => Object.values(skills)[index] || 35);
  const skillScore = skillValues.length ? skillValues.reduce((sum, value) => sum + value, 0) / skillValues.length : (state.stats?.smarts || 50);
  const traitScore = Object.keys(job.gainedTraits || {}).reduce((sum, trait) => sum + (traits[trait] || 50), 0) / Math.max(1, Object.keys(job.gainedTraits || {}).length);
  return skillScore * 0.54 + traitScore * 0.26 + (state.stats?.smarts || 50) * 0.20;
}

export function getLocalStudentWage(state, job) {
  const country = COUNTRIES[state.character?.currentCountry] || COUNTRIES.india;
  const rules = rulesFor(state);
  return Number((job.baseHourlyUSD * rules.wageMultiplier * Math.max(0.5, country.livingCostIndex || 1)).toFixed(2));
}

export function getAvailableStudentJobs(state) {
  const age = Number(state.character?.age) || 0;
  const rules = rulesFor(state);
  return STUDENT_JOBS_CATALOG.filter(job => {
    if (age < Math.max(job.minAge || 0, rules.minimumAge) || age > (job.maxAge || 99)) return false;
    const score = relevantSkillScore(state, job);
    return !job.minSmarts || score >= Math.max(35, job.minSmarts - 18);
  }).map(job => ({ ...job, localHourlyUSD: getLocalStudentWage(state, job), legalMaxHours: Math.min(job.weeklyHoursMax || 0, rules.schoolWeekMax) }));
}

export function applyForStudentJob(state, jobId) {
  const employment = ensureWorkState(state);
  const job = getAvailableStudentJobs(state).find(item => item.id === jobId);
  if (!job) return { success: false, message: "This job is not legally or academically available right now." };
  if (employment.activeJob) return { success: false, message: `You already work as a ${employment.activeJob.title}.` };
  const rules = rulesFor(state);
  if (state.character.age < rules.parentConsentUnder) {
    const parents = state.family?.household?.parents || [];
    const consent = parents.reduce((sum, parent) => sum + (parent.relationship || 50) + (parent.generosity || 50), 0) / Math.max(1, parents.length * 2);
    if (consent < 48) return { success: false, message: "Your household did not consent to this job at your age." };
  }
  const previousApplications = employment.applications.filter(item => item.jobId === job.id).length;
  const score = relevantSkillScore(state, job) + Math.min(12, previousApplications * 3) + Math.min(8, employment.history.length * 2) + (Math.random() * 20 - 10);
  const outcome = score >= 54;
  const application = { age: state.character.age, jobId: job.id, title: job.title, score: Math.round(score), outcome, wageUSD: job.localHourlyUSD };
  employment.applications.unshift(application);
  if (!outcome) return { success: false, application, message: `The ${job.title} interview did not work out this time.` };

  const hours = Math.min(job.legalMaxHours, state.character.age < 16 ? 8 : 12);
  const schedule = setTimeAllocation(state, "partTimeWork", hours);
  if (!schedule.success) return schedule;
  employment.activeJob = {
    id: job.id,
    title: job.title,
    hourlyWageUSD: job.localHourlyUSD,
    weeklyHours: hours,
    legalMaxHours: job.legalMaxHours,
    startAge: state.character.age,
    yearsWorked: 0,
    skills: job.gainedSkills || {},
    traits: job.gainedTraits || {},
    employerReference: 50
  };
  return { success: true, job: employment.activeJob, application, message: `Hired as ${job.title} at $${job.localHourlyUSD.toFixed(2)}/hour.` };
}

export function setStudentJobHours(state, hours) {
  const employment = ensureWorkState(state);
  if (!employment.activeJob) return { success: false, message: "You do not have a student job." };
  const next = Math.max(0, Math.min(employment.activeJob.legalMaxHours, Math.round(Number(hours) || 0)));
  const schedule = setTimeAllocation(state, "partTimeWork", next);
  employment.activeJob.weeklyHours = next;
  return { ...schedule, hours: next };
}

export function quitStudentJob(state) {
  const employment = ensureWorkState(state);
  if (!employment.activeJob) return { success: false, message: "You do not have a student job." };
  const former = employment.activeJob;
  employment.history.unshift({ ...former, endAge: state.character.age });
  employment.activeJob = null;
  setTimeAllocation(state, "partTimeWork", 0);
  return { success: true, message: `Resigned from ${former.title}.` };
}

export function stepStudentWorkYear(state) {
  const employment = ensureWorkState(state);
  const job = employment.activeJob;
  if (!job || state.character.age > 19) return { success: false, reason: "no_active_student_job" };
  const hours = Math.max(0, Math.min(job.weeklyHours, job.legalMaxHours));
  const gross = Math.round(job.hourlyWageUSD * hours * 52);
  const tax = state.character.age >= 18 ? Math.round(gross * 0.05) : 0;
  const net = gross - tax;
  state.finances.studentAccount.cashUSD += net;
  state.finances.studentAccount.lifetimeEarningsUSD += net;
  state.finances.studentAccount.ledger.unshift({ age: state.character.age, type: "student_job", title: job.title, hoursPerWeek: hours, grossUSD: gross, taxUSD: tax, netUSD: net });
  job.yearsWorked += 1;
  job.employerReference = Math.min(100, job.employerReference + 5);
  for (const [skill, amount] of Object.entries(job.skills || {})) {
    if (state.cognition?.learnedSkills && skill in state.cognition.learnedSkills) state.cognition.learnedSkills[skill] = Math.min(100, state.cognition.learnedSkills[skill] + amount);
  }
  for (const [trait, amount] of Object.entries(job.traits || {})) {
    if (state.cognition?.traits && trait in state.cognition.traits) state.cognition.traits[trait] = Math.min(100, state.cognition.traits[trait] + amount);
  }
  state.stats.smarts = calculateLegacySmarts(state.cognition?.innate, state.cognition?.learnedSkills, state.cognition?.traits);
  return { success: true, gross, tax, net, hours, job };
}

export { EMPLOYMENT_RULES };
