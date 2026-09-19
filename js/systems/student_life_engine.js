// Social school life: peers, friendships, activities, competition, and
// discipline. These records are inputs to academics and later admissions;
// they are not one-click prestige bonuses.

import { HIGH_SCHOOL_CLUBS } from "../data/education_data.js";
import { ensureSchoolCohort } from "./school_engine.js";
import { resolveClubTournamentMatch } from "./social_school_engine.js";
import { setTimeAllocation } from "./academic_engine.js";
import { requestEducationPayment } from "./family_finance_engine.js";
import { calculateLegacySmarts } from "./student_engine.js";

const EXTRA_ACTIVITIES = [
  { id: "science_fair", name: "Science fair & research lab", category: "research", weeklyHours: 5, trainedSkills: ["research", "writing"], trainedTraits: ["curiosity", "conscientiousness"] },
  { id: "coding_club", name: "Coding & hackathon club", category: "technology", weeklyHours: 6, trainedSkills: ["coding", "research"], trainedTraits: ["creativity", "discipline"] },
  { id: "theatre", name: "Theatre & performance", category: "arts", weeklyHours: 7, trainedSkills: ["presentation", "writing"], trainedTraits: ["confidence", "creativity"] },
  { id: "visual_arts", name: "Visual arts studio", category: "arts", weeklyHours: 5, trainedSkills: ["presentation"], trainedTraits: ["creativity", "focus"] },
  { id: "choir", name: "Choir & vocal ensemble", category: "arts", weeklyHours: 6, trainedSkills: ["presentation"], trainedTraits: ["confidence", "consistency"] },
  { id: "photography", name: "Photography & media lab", category: "media", weeklyHours: 4, trainedSkills: ["research", "presentation"], trainedTraits: ["creativity", "curiosity"] },
  { id: "chess", name: "Chess & strategy club", category: "strategy", weeklyHours: 4, trainedSkills: ["algebra", "research"], trainedTraits: ["focus", "examTemperament"] },
  { id: "football", name: "Football / soccer squad", category: "sports", weeklyHours: 9, trainedSkills: ["presentation"], trainedTraits: ["discipline", "endurance"] },
  { id: "cricket", name: "Cricket squad", category: "sports", weeklyHours: 8, trainedSkills: ["presentation"], trainedTraits: ["discipline", "consistency"] },
  { id: "swimming", name: "Swimming team", category: "sports", weeklyHours: 8, trainedSkills: ["presentation"], trainedTraits: ["discipline", "stressTolerance"] },
  { id: "badminton", name: "Badminton club", category: "sports", weeklyHours: 6, trainedSkills: ["presentation"], trainedTraits: ["focus", "consistency"] },
  { id: "volunteering", name: "Community service collective", category: "community", weeklyHours: 4, trainedSkills: ["presentation", "writing"], trainedTraits: ["empathy", "reliability"] },
  { id: "peer_tutoring", name: "Peer tutoring", category: "community", weeklyHours: 3, trainedSkills: ["writing", "presentation"], trainedTraits: ["confidence", "curiosity"] },
  { id: "student_council", name: "Student council", category: "leadership", weeklyHours: 5, trainedSkills: ["presentation", "economics"], trainedTraits: ["leadership", "confidence"] },
  { id: "literary_magazine", name: "Literary magazine", category: "media", weeklyHours: 4, trainedSkills: ["writing", "grammar"], trainedTraits: ["creativity", "conscientiousness"] },
  { id: "podcast", name: "Student podcast", category: "media", weeklyHours: 4, trainedSkills: ["presentation", "research"], trainedTraits: ["confidence", "curiosity"] }
];

export const ACTIVITIES_CATALOG = [
  ...HIGH_SCHOOL_CLUBS.map(activity => ({ ...activity, category: activity.category || "school" })),
  ...EXTRA_ACTIVITIES
];

function ensureLifeState(state) {
  ensureSchoolCohort(state);
  state.education.social = state.education.social || {};
  const social = state.education.social;
  social.classmates = social.classmates || [];
  social.friendships = social.friendships || [];
  social.clubs = social.clubs || [];
  social.parties = social.parties || [];
  social.discipline = social.discipline || { incidents: [], merits: [], standing: 70 };
  return social;
}

function getPeer(state, peerId) {
  return ensureLifeState(state).classmates.find(peer => peer.id === peerId);
}

function traitGain(state, trait, amount) {
  if (state.cognition?.traits && trait in state.cognition.traits) {
    state.cognition.traits[trait] = Math.min(100, Math.max(0, (state.cognition.traits[trait] || 0) + amount));
  }
}

function skillGain(state, skill, amount) {
  if (state.cognition?.learnedSkills && skill in state.cognition.learnedSkills) {
    state.cognition.learnedSkills[skill] = Math.min(100, Math.max(0, (state.cognition.learnedSkills[skill] || 0) + amount));
  }
}

export function getAvailableActivities(state) {
  const school = state.education?.currentInstitution;
  const availableNames = school?.activities || [];
  return ACTIVITIES_CATALOG.filter(activity => !availableNames.length || availableNames.some(name => String(name).toLowerCase().includes(activity.category) || String(name).toLowerCase().includes(activity.id.split("_")[0])));
}

export function joinActivity(state, activityId) {
  const social = ensureLifeState(state);
  if (state.character.age < 10) return { success: false, message: "Organized activities begin in later primary or secondary school." };
  const activity = ACTIVITIES_CATALOG.find(item => item.id === activityId);
  if (!activity) return { success: false, message: "Activity not found." };
  if (social.clubs.some(item => item.id === activityId && item.active !== false)) return { success: false, message: "You already participate in this activity." };

  const fee = Math.round((state.education.currentInstitution?.activityFeesUSD || 0) * 0.08 + (activity.baseBudgetUSD || 0) * 0.015);
  const payment = fee > 0 ? requestEducationPayment(state, { amountUSD: fee, type: "activity_fee", description: `${activity.name} participation`, mandatory: false }) : { success: true, payer: "none", message: "No additional fee." };
  if (!payment.success) return payment;

  const schedule = setTimeAllocation(state, "activitiesClubs", Math.max(Number(state.education.timeAllocation?.activitiesClubs || 0), activity.weeklyHours));
  if (!schedule.success) return schedule;
  const record = {
    id: activity.id,
    name: activity.name,
    category: activity.category,
    role: activity.category === "leadership" ? "Representative" : "Member",
    level: 1,
    weeklyHours: activity.weeklyHours,
    coachQuality: activity.coachQuality || Math.round((state.education.currentInstitution?.teacherQuality || 65) * 0.9),
    trainedSkills: activity.trainedSkills || [],
    trainedTraits: activity.trainedTraits || [],
    wins: 0,
    losses: 0,
    awards: [],
    joinedAge: state.character.age,
    active: true
  };
  social.clubs.push(record);
  state.stats.happiness = Math.min(100, state.stats.happiness + 2);
  return { success: true, activity: record, payment, message: `Joined ${activity.name}.` };
}

export function leaveActivity(state, activityId) {
  const social = ensureLifeState(state);
  const club = social.clubs.find(item => item.id === activityId);
  if (!club) return { success: false, message: "You are not participating in that activity." };
  club.active = false;
  return { success: true, message: `Left ${club.name}.` };
}

export function competeInActivity(state, activityId, tier = "state") {
  const social = ensureLifeState(state);
  const club = social.clubs.find(item => item.id === activityId && item.active !== false);
  if (!club) return { success: false, message: "Join the activity before competing." };
  const academicPower = Number(state.education?.gpa || state.stats?.smarts || 50);
  const result = resolveClubTournamentMatch(club, { ...state.stats, smarts: academicPower }, tier);
  if (result.victory) {
    club.wins += 1;
    club.level = Math.min(5, club.level + 1);
    if (club.level >= 3 && club.role === "Member") club.role = "Senior member";
    if (club.level >= 5) club.role = "Captain";
    club.awards.push(`${tier} finalist at age ${state.character.age}`);
    state.stats.prestige = Math.min(100, state.stats.prestige + 2);
  } else {
    club.losses += 1;
  }
  const activity = ACTIVITIES_CATALOG.find(item => item.id === activityId);
  (activity?.trainedSkills || []).forEach(skill => skillGain(state, skill, result.victory ? 1.5 : 0.5));
  (activity?.trainedTraits || []).forEach(trait => traitGain(state, trait, result.victory ? 1.2 : 0.4));
  state.stats.smarts = calculateLegacySmarts(state.cognition?.innate, state.cognition?.learnedSkills, state.cognition?.traits);
  return { success: true, result, club };
}

export function socialAction(state, peerId, action = "talk") {
  const social = ensureLifeState(state);
  const peer = getPeer(state, peerId);
  if (!peer) return { success: false, message: "Classmate not found." };
  const effects = {
    talk: { friendship: 6, happiness: 2, hours: 1 },
    lunch: { friendship: 9, happiness: 4, hours: 2 },
    study: { friendship: 5, happiness: 1, hours: 3, skill: 1.5 },
    invite: { friendship: 12, happiness: 5, hours: 3, cost: 18 },
    compete: { friendship: -2, happiness: 0, hours: 2, trait: "competitiveness" }
  }[action] || { friendship: 4, happiness: 1, hours: 1 };
  if ((state.education.timeAllocation?.friendsSocial || 0) < effects.hours) return { success: false, message: `You need ${effects.hours} weekly social hours available.` };
  if (effects.cost) {
    const payment = requestEducationPayment(state, { amountUSD: effects.cost, type: "social", description: `${action} with ${peer.name}`, mandatory: false });
    if (!payment.success) return payment;
  }
  peer.friendship = Math.min(100, Math.max(0, peer.friendship + effects.friendship));
  peer.respect = Math.min(100, peer.respect + (action === "study" ? 3 : 1));
  social.friendships.push({ age: state.character.age, peerId, action, friendshipDelta: effects.friendship });
  state.stats.happiness = Math.min(100, state.stats.happiness + effects.happiness);
  if (effects.skill) skillGain(state, "writing", effects.skill);
  if (effects.trait) traitGain(state, effects.trait, 1);
  state.stats.smarts = calculateLegacySmarts(state.cognition?.innate, state.cognition?.learnedSkills, state.cognition?.traits);
  return { success: true, peer, message: `${action[0].toUpperCase()}${action.slice(1)} with ${peer.name}.` };
}

export function attendParty(state, type = "school_dance") {
  const costs = { birthday: 10, cafe: 15, school_dance: 35, prom: 90, concert: 120, house_party: 25 };
  const hours = { birthday: 3, cafe: 2, school_dance: 5, prom: 6, concert: 6, house_party: 4 };
  const cost = costs[type] || 20;
  const duration = hours[type] || 3;
  if ((state.education.timeAllocation?.friendsSocial || 0) < duration) return { success: false, message: `You need ${duration} weekly social hours for this event.` };
  const payment = requestEducationPayment(state, { amountUSD: cost, type: "social", description: type.replaceAll("_", " "), mandatory: false });
  if (!payment.success) return payment;
  const social = ensureLifeState(state);
  social.parties.push({ age: state.character.age, type, costUSD: cost, hours: duration });
  state.stats.happiness = Math.min(100, state.stats.happiness + 8);
  traitGain(state, "confidence", 2);
  return { success: true, payment, message: `Attended a ${type.replaceAll("_", " ")}.` };
}

export function recordDisciplineEvent(state, kind = "merit", note = "") {
  const social = ensureLifeState(state);
  const discipline = social.discipline;
  if (kind === "incident") {
    discipline.incidents.push({ age: state.character.age, note });
    discipline.standing = Math.max(0, discipline.standing - 8);
    state.stats.happiness = Math.max(0, state.stats.happiness - 2);
  } else {
    discipline.merits.push({ age: state.character.age, note });
    discipline.standing = Math.min(100, discipline.standing + 5);
  }
  return discipline;
}

export function requestSchoolTransfer(state) {
  const school = state.education.currentInstitution;
  const choices = state.education.schoolChoices || [];
  if (!school || !choices.length) return { success: false, message: "No transfer options are currently open." };
  return { success: true, choices };
}

export function stepStudentLifeYear(state) {
  const social = ensureLifeState(state);
  const attendance = state.education?.academic?.attendancePct ?? 100;
  if (attendance < 75) {
    recordDisciplineEvent(state, "incident", `Attendance fell to ${attendance}%`);
  } else if (attendance >= 95 && (state.cognition?.condition?.burnoutLevel || 0) < 45) {
    recordDisciplineEvent(state, "merit", "Reliable attendance and coursework completion");
  }
  const activeClubs = social.clubs.filter(club => club.active !== false);
  const leadershipClub = activeClubs.find(club => club.category === "leadership" || club.id === "student_gov");
  if (leadershipClub && leadershipClub.level >= 3) leadershipClub.role = leadershipClub.level >= 5 ? "Student body president" : "Council officer";
  const closeFriends = social.classmates.filter(peer => peer.friendship >= 65);
  if (closeFriends.length) state.stats.happiness = Math.min(100, state.stats.happiness + Math.min(3, closeFriends.length));
  return { attendance, activeClubs: activeClubs.length, closeFriends: closeFriends.length, standing: social.discipline.standing };
}

export { ensureLifeState };
