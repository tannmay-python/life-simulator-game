// Term-based academic progression. Annual age-ups call this engine for the
// two school terms in a normal year; UI actions only change inputs to it.

import { STUDY_METHODS, StudentAcademicSimulator, TimeAllocationEngine, clamp } from "./student_engine.js";
import { ensureSchoolCohort } from "./school_engine.js";

const SUBJECT_META = {
  mathematics: { name: "Mathematics", skillKey: "algebra", innate: "quantitative" },
  physics: { name: "Physics", skillKey: "physics", innate: "quantitative" },
  chemistry: { name: "Chemistry", skillKey: "chemistry", innate: "longTermMemory" },
  biology: { name: "Biology", skillKey: "biology", innate: "longTermMemory" },
  english: { name: "English / writing", skillKey: "writing", innate: "verbal" },
  history: { name: "History & civics", skillKey: "history", innate: "verbal" },
  economics: { name: "Economics", skillKey: "economics", innate: "abstractReasoning" },
  computerScience: { name: "Computer science", skillKey: "coding", innate: "abstractReasoning" },
  research: { name: "Research seminar", skillKey: "research", innate: "creativity" },
  science: { name: "General science", skillKey: "biology", innate: "longTermMemory" }
};

function ensureAcademicState(state) {
  state.education = state.education || {};
  state.education.academic = state.education.academic || {
    subjects: [],
    assignments: [],
    termHistory: [],
    attendancePct: 100,
    classRankPercentile: null,
    currentTerm: 0,
    studyMethod: "practice_problems",
    lastAssessment: null
  };
  const academic = state.education.academic;
  academic.subjects = academic.subjects || [];
  academic.assignments = academic.assignments || [];
  academic.termHistory = academic.termHistory || [];
  return academic;
}

function subjectDefinition(id) {
  return SUBJECT_META[id] || { name: id.replaceAll("_", " "), skillKey: id, innate: "verbal" };
}

function getCurriculumSubjects(state) {
  const ids = state.education.currentInstitution?.curriculumProfile?.subjects
    || state.education.curriculumContext?.profile?.subjects
    || ["mathematics", "english", "science"];
  return [...new Set(ids)].map(id => ({ id, ...subjectDefinition(id) }));
}

export function ensureAcademicRecord(state) {
  const academic = ensureAcademicState(state);
  const school = state.education.currentInstitution;
  if (!school) return academic;
  ensureSchoolCohort(state);
  const subjects = getCurriculumSubjects(state);
  const existing = new Map(academic.subjects.map(subject => [subject.id, subject]));
  academic.subjects = subjects.map(subject => {
    const prior = existing.get(subject.id);
    const skill = Number(state.cognition?.learnedSkills?.[subject.skillKey]) || 0;
    const teacher = state.education.teachers?.find(item => item.subjectId === subject.id || item.subjectId === subject.skillKey);
    return {
      ...subject,
      mastery: prior?.mastery ?? Math.round(skill),
      teacherId: prior?.teacherId || teacher?.id || null,
      teacherStrictness: prior?.teacherStrictness ?? teacher?.gradingStrictness ?? school.gradingStrictness ?? 55,
      currentGrade: prior?.currentGrade ?? null,
      letterGrade: prior?.letterGrade ?? null,
      courseWeight: prior?.courseWeight ?? 1
    };
  });
  return academic;
}

export function normalizeTimeAllocation(allocation = {}) {
  const canonical = {
    sleep: Number(allocation.sleep ?? 56),
    schoolClasses: Number(allocation.schoolClasses ?? allocation.classes ?? 35),
    commute: Number(allocation.commute ?? 7),
    mealsBasicLife: Number(allocation.mealsBasicLife ?? allocation.basicLife ?? 14),
    homework: Number(allocation.homework ?? 10),
    examCoaching: Number(allocation.examCoaching ?? allocation.coaching ?? 0),
    activitiesClubs: Number(allocation.activitiesClubs ?? allocation.activities ?? 8),
    friendsSocial: Number(allocation.friendsSocial ?? allocation.social ?? 14),
    partTimeWork: Number(allocation.partTimeWork ?? allocation.work ?? 0),
    leisureGaming: Number(allocation.leisureGaming ?? allocation.leisure ?? 14),
    selfStudy: Number(allocation.selfStudy ?? allocation.study ?? 10)
  };
  Object.keys(canonical).forEach(key => { canonical[key] = Math.max(0, Math.round(canonical[key] || 0)); });
  return canonical;
}

export function setTimeAllocation(state, key, value) {
  const allocation = normalizeTimeAllocation(state.education?.timeAllocation);
  if (!(key in allocation)) return { success: false, message: `Unknown time category: ${key}.` };
  const nextValue = Math.max(0, Math.round(Number(value) || 0));
  const delta = nextValue - allocation[key];
  allocation[key] = nextValue;
  if (delta > 0) {
    const flexibleKeys = ["leisureGaming", "friendsSocial", "selfStudy", "activitiesClubs", "examCoaching"]
      .filter(item => item !== key)
      .sort((a, b) => allocation[b] - allocation[a]);
    let remaining = delta;
    for (const flexibleKey of flexibleKeys) {
      const reduction = Math.min(allocation[flexibleKey], remaining);
      allocation[flexibleKey] -= reduction;
      remaining -= reduction;
      if (!remaining) break;
    }
    if (remaining) allocation[key] -= remaining;
  } else if (delta < 0) {
    allocation.leisureGaming += Math.abs(delta);
  }
  state.education.timeAllocation = allocation;
  return { success: true, allocation, validation: TimeAllocationEngine.validateAllocation(allocation) };
}

function updateTeacherImpressions(state, subjectResults) {
  for (const teacher of state.education.teachers || []) {
    const result = subjectResults.find(item => item.teacherId === teacher.id);
    if (!result) continue;
    const impression = teacher.impression || (teacher.impression = {});
    impression.intellectScore = clamp(Math.round((impression.intellectScore || 50) * 0.7 + result.score * 0.3), 0, 100);
    impression.workEthicScore = clamp(Math.round((impression.workEthicScore || 50) * 0.72 + result.assignmentScore * 0.28), 0, 100);
    impression.reliabilityScore = clamp(Math.round((impression.reliabilityScore || 50) * 0.75 + state.education.academic.attendancePct * 0.25), 0, 100);
    impression.rapport = clamp(Math.round(impression.rapport || 50), 0, 100);
    impression.primaryTag = impression.intellectScore >= 80 && impression.workEthicScore >= 75 ? "brilliant" : impression.workEthicScore >= 75 ? "hardworking" : "average";
  }
}

function gradeLetter(gpa) {
  if (gpa >= 3.7) return "A";
  if (gpa >= 3.0) return "B";
  if (gpa >= 2.0) return "C";
  if (gpa >= 1.0) return "D";
  return "F";
}

export function stepAcademicTerm(state, { termLabel = "Term", age = state.character.age } = {}) {
  const academic = ensureAcademicRecord(state);
  const school = state.education.currentInstitution;
  if (!school || age < 6 || age > 18) return { success: false, reason: "not_in_school" };

  const allocation = normalizeTimeAllocation(state.education.timeAllocation);
  state.education.timeAllocation = allocation;
  const validation = TimeAllocationEngine.validateAllocation(allocation);
  if (!validation.isValid) return { success: false, reason: "invalid_schedule", validation };

  const traits = state.cognition?.traits || {};
  const condition = state.cognition?.condition || (state.cognition.condition = {});
  const sleepImpact = TimeAllocationEngine.calculateSleepImpact(allocation.sleep, condition.sleepDebtHours || 0);
  const workload = allocation.homework + allocation.selfStudy + allocation.examCoaching + allocation.activitiesClubs + allocation.partTimeWork;
  const stressLoad = Math.max(0, workload - 34) * 1.25 + Math.max(0, 49 - allocation.sleep) * 1.7;
  condition.sleepDebtHours = Number(Math.max(0, (condition.sleepDebtHours || 0) * 0.45 + Math.max(0, 56 - allocation.sleep) * 0.8).toFixed(1));
  condition.chronicStress = clamp(Math.round((condition.chronicStress || 15) * 0.68 + stressLoad * 0.32 + sleepImpact.stressDelta * 0.10), 0, 100);
  condition.burnoutLevel = clamp(Math.round(Math.max(0, condition.chronicStress - 58) * 1.4), 0, 100);
  condition.motivation = clamp(Math.round((condition.motivation || 75) - condition.burnoutLevel * 0.04 + (traits.curiosity || 50) * 0.02), 10, 100);

  academic.attendancePct = clamp(Math.round(84 + (allocation.schoolClasses / 35) * 11 + (state.stats.health || 70) * 0.05 - condition.chronicStress * 0.06), 55, 100);
  const activeMethod = STUDY_METHODS[academic.studyMethod] ? academic.studyMethod : "practice_problems";
  const subjectResults = [];
  const subjectStudyHours = (allocation.selfStudy + allocation.homework) / Math.max(1, academic.subjects.length);

  for (const subject of academic.subjects) {
    const skillBefore = Number(state.cognition?.learnedSkills?.[subject.skillKey]) || subject.mastery || 0;
    const learning = StudentAcademicSimulator.executeWeeklyStudySession({
      skillKey: subject.skillKey,
      currentSkillLevel: skillBefore,
      innateAttributes: state.cognition?.innate || {},
      traits: state.cognition?.traits || {},
      studyHours: subjectStudyHours * 8,
      methodId: activeMethod,
      teachingQuality: Math.max(0.6, (school.teacherQuality || 60) / 75),
      sleepHours: allocation.sleep,
      sleepDebt: condition.sleepDebtHours
    });
    if (state.cognition?.learnedSkills) state.cognition.learnedSkills[subject.skillKey] = learning.newSkillLevel;
    subject.mastery = Math.round(learning.newSkillLevel);

    const mastery = subject.mastery;
    // Primary and lower-secondary assessment is age-appropriate. A ten-year-
    // old is not being held to the same raw content bar as an A-level student.
    const ageSupport = age <= 10 ? 65 : age <= 13 ? 52 : 38;
    const assessmentKnowledge = clamp(mastery + ageSupport, 0, 100);
    const technique = Math.min(100, (traits.examTemperament || 50) + learning.examTechGain);
    const assessment = type => StudentAcademicSimulator.simulateAssessment({
      assessmentType: type,
      subjectKnowledge: assessmentKnowledge,
      examTechnique: technique,
      innateAttributes: state.cognition?.innate || {},
      traits: state.cognition?.traits || {},
      stressLevel: condition.chronicStress,
      sleepHours: allocation.sleep,
      sleepDebt: condition.sleepDebtHours
    });
    const homework = assessment("homework");
    const quiz = assessment("quiz");
    const midterm = assessment("midterm");
    const project = assessment("project");
    const finalExam = assessment("final_exam");
    const completionMultiplier = clamp(allocation.homework / 10, 0.45, 1.15);
    const assignmentScore = Math.round(homework.score * completionMultiplier);
    const grade = StudentAcademicSimulator.calculateCourseGrade({
      homework: assignmentScore,
      quizzes: quiz.score,
      midterm: midterm.score,
      project: project.score,
      finalExam: finalExam.score
    });
    subject.currentGrade = grade.percentage;
    subject.letterGrade = grade.letter;
    subject.lastTerm = termLabel;
    academic.assignments.unshift({ age, term: termLabel, subjectId: subject.id, due: `${age}-${termLabel}`, completedPct: Math.round(completionMultiplier * 100), score: assignmentScore });
    subjectResults.push({ subjectId: subject.id, teacherId: subject.teacherId, score: grade.percentage, assignmentScore });
  }

  const termGPA = academic.subjects.length
    ? Number((academic.subjects.reduce((sum, subject) => sum + (subject.currentGrade >= 93 ? 4 : subject.currentGrade >= 90 ? 3.7 : subject.currentGrade >= 87 ? 3.3 : subject.currentGrade >= 83 ? 3 : subject.currentGrade >= 80 ? 2.7 : subject.currentGrade >= 77 ? 2.3 : subject.currentGrade >= 73 ? 2 : subject.currentGrade >= 70 ? 1.7 : subject.currentGrade >= 60 ? 1 : 0), 0) / academic.subjects.length).toFixed(2))
    : 0;
  academic.currentTerm += 1;
  academic.lastAssessment = { age, term: termLabel, gpa: termGPA, attendancePct: academic.attendancePct, burnoutLevel: condition.burnoutLevel };
  academic.termHistory.unshift({ age, term: termLabel, gpa: termGPA, attendancePct: academic.attendancePct, stress: condition.chronicStress, subjects: academic.subjects.map(subject => ({ id: subject.id, grade: subject.currentGrade, letter: subject.letterGrade, mastery: subject.mastery })) });
  academic.termHistory = academic.termHistory.slice(0, 24);
  const gradedTerms = academic.termHistory.filter(term => term.age >= 14);
  state.education.gpa = gradedTerms.length ? Number((gradedTerms.reduce((sum, term) => sum + term.gpa, 0) / gradedTerms.length).toFixed(2)) : null;
  academic.classRankPercentile = clamp(Math.round(52 - termGPA * 8 + (school.peerAcademicStrength || 55) * 0.12 + condition.burnoutLevel * 0.08), 1, 99);
  updateTeacherImpressions(state, subjectResults);
  state.education.transcript.push({ age, term: termLabel, institution: school.name, curriculum: school.curriculum, gpa: termGPA, attendancePct: academic.attendancePct, subjects: academic.subjects.map(subject => ({ name: subject.name, grade: subject.currentGrade, letter: subject.letterGrade })) });
  state.education.transcript = state.education.transcript.slice(-24);
  return { success: true, gpa: termGPA, attendancePct: academic.attendancePct, burnoutLevel: condition.burnoutLevel, sleepImpact };
}

export function stepAcademicYear(state) {
  if (!state.education?.currentInstitution || state.character.age < 6 || state.character.age > 18) return { success: false, reason: "not_in_school" };
  const first = stepAcademicTerm(state, { termLabel: "Autumn" });
  const second = stepAcademicTerm(state, { termLabel: "Spring" });
  return { success: first.success || second.success, terms: [first, second], gpa: state.education.gpa };
}

export function setStudyMethod(state, methodId) {
  const academic = ensureAcademicState(state);
  if (!STUDY_METHODS[methodId]) return { success: false, message: "Unknown study method." };
  academic.studyMethod = methodId;
  return { success: true, method: STUDY_METHODS[methodId] };
}

export { SUBJECT_META };
