// View: Regional Schooling, Entrance Exams, College Admissions Abroad & Domestic, Corporate Ladders, and Special Careers

import { COUNTRIES } from "../data/countries.js";
import { EXAMS, STUDY_ACTIONS } from "../data/education.js";
import { CAREER_TRACKS, WORK_ACTIONS } from "../data/careers.js";
import { SPECIAL_CAREERS } from "../data/special_careers.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";
import { EDUCATION_STAGES, applyAcademicAction, calculateNetWorth, stageLabel } from "../state.js";
import { requestEducationPayment } from "../systems/family_finance_engine.js";
import { EducationExamEngine } from "../systems/education_exam_engine.js";
import { STUDY_METHODS } from "../systems/student_engine.js";
import { ensureAcademicRecord, setStudyMethod, setTimeAllocation } from "../systems/academic_engine.js";
import { enrollInSchool } from "../systems/school_engine.js";
import { attendParty, competeInActivity, getAvailableActivities, joinActivity, socialAction } from "../systems/student_life_engine.js";
import { applyForStudentJob, getAvailableStudentJobs, quitStudentJob, setStudentJobHours } from "../systems/student_work_engine.js";
import { enrollAdmission, getUniversityCatalog, submitAdmissionApplication, transferUniversity } from "../systems/admissions_engine.js";
import { generateRecommendationLetter, iterateEssayDraft } from "../systems/social_school_engine.js";

let eduSubtab = "education"; // "education", "corporate", "special"

function getRawExamScore(score) {
  return typeof score === "object" && score !== null ? score.rawScore : score;
}

function money(amount) {
  return `$${Math.round(Number(amount) || 0).toLocaleString()}`;
}

function renderSchoolChoices(state) {
  const choices = state.education.schoolChoices?.length ? state.education.schoolChoices : (state.education.preschoolCandidates || []);
  if (!choices.length) return "";
  return `
    <h2 class="section-heading">School decisions</h2>
    <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 10px;">Your household is comparing actual institutions. Curriculum is not the same thing as the school, peer group, or cost.</p>
    <div>
      ${choices.map(school => `
        <div class="list-row">
          <div class="list-row-left">
            <div style="font-size: 15px;">${school.name}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 3px; line-height: 1.45;">
              ${school.curriculum || "Early learning"} · ${school.type || "local"} · ${money(school.totalAnnualCostUSD || school.annualTuitionUSD || school.costUSD || 0)}/yr · Teacher quality ${school.teacherQuality || Math.round((school.quality || 0.8) * 80)}%
            </div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 3px;">Class size ${school.classSize || "small group"} · Peer strength ${school.peerAcademicStrength || "developing"} · Counselor ${school.counselorQuality || "family-led"}</div>
          </div>
          <div class="list-row-right">
            <button class="btn btn-outline btn-sm btn-enroll-school" data-school-id="${school.id}" type="button">${state.education.currentInstitution ? "Transfer" : "Choose"}</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderFamilyEducationContext(state) {
  const household = state.family?.household || {};
  const siblings = state.family?.siblings || [];
  const parents = household.parents || state.family?.parents || [];
  return `
    <h2 class="section-heading">Family context</h2>
    <div class="detail-grid">
      <div><div class="detail-label">Household income</div><div class="detail-val-mono">${money(household.annualIncomeUSD)}/yr</div></div>
      <div><div class="detail-label">Household savings</div><div class="detail-val-mono">${money(household.savingsUSD)}</div></div>
      <div><div class="detail-label">Education budget</div><div class="detail-val-mono">${money(household.educationBudgetUSD)}/yr</div></div>
      <div><div class="detail-label">Parents</div><div class="detail-val">${parents.filter(parent => parent.alive !== false).length} active</div></div>
      <div><div class="detail-label">Siblings</div><div class="detail-val">${siblings.length}</div></div>
    </div>
    ${siblings.length ? `<div style="font-size: 13px; color: var(--text-secondary); margin-top: 10px;">${siblings.map(sibling => `${sibling.name} · age ${sibling.age ?? "—"}`).join(" · ")}</div>` : ""}
  `;
}

function renderAcademicDashboard(state) {
  const school = state.education.currentInstitution;
  if (!school || (school.enrolledAtAge || 0) < 6 || state.character.age < 6 || state.character.age > 18) return "";
  const academic = ensureAcademicRecord(state);
  const allocation = state.education.timeAllocation || {};
  const condition = state.cognition?.condition || {};
  const allocRows = [
    ["sleep", "Sleep", 28, 70], ["selfStudy", "Self-study", 0, 35], ["homework", "Homework", 0, 30], ["examCoaching", "Exam coaching", 0, 25], ["activitiesClubs", "Clubs / sports", 0, 30], ["friendsSocial", "Friends / social", 0, 30], ["partTimeWork", "Student work", 0, 25], ["leisureGaming", "Leisure", 0, 35]
  ];
  return `
    <h2 class="section-heading">Academic engine</h2>
    <div class="detail-grid">
      <div><div class="detail-label">Term GPA</div><div class="detail-val-mono">${state.education.gpa == null ? "—" : Number(state.education.gpa).toFixed(2)}</div></div>
      <div><div class="detail-label">Attendance</div><div class="detail-val-mono">${academic.attendancePct ?? 100}%</div></div>
      <div><div class="detail-label">Chronic stress</div><div class="detail-val-mono">${condition.chronicStress || 0}%</div></div>
      <div><div class="detail-label">Burnout</div><div class="detail-val">${condition.burnoutLevel >= 60 ? "High" : condition.burnoutLevel >= 30 ? "Rising" : "Low"}</div></div>
    </div>
    <div style="display:flex; gap:6px; overflow:auto; margin: 14px 0 6px; padding-bottom: 5px;">
      ${Object.values(STUDY_METHODS).slice(0, 5).map(method => `<button class="subtab-btn ${academic.studyMethod === method.id ? "active" : ""} btn-study-method" data-method="${method.id}" type="button" style="white-space:nowrap; font-size:12px;">${method.name}</button>`).join("")}
    </div>
    <div style="font-size:12px; color:var(--text-tertiary); margin-bottom:10px;">Study method changes the balance between mastery, exam technique, and fatigue.</div>
    ${allocRows.map(([key, label, min, max]) => `<div style="display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid var(--hairline);"><span style="width:108px; font-size:13px;">${label}</span><input type="range" class="education-alloc" data-key="${key}" min="${min}" max="${max}" value="${allocation[key] ?? 0}" style="flex:1; accent-color:var(--ink);"><span class="mono-val" style="width:38px; text-align:right; font-size:12px;">${allocation[key] ?? 0}h</span></div>`).join("")}
    <h3 style="font-size:14px; margin:18px 0 8px;">Courses & mastery</h3>
    <div>${academic.subjects.map(subject => `<div class="list-row"><div class="list-row-left"><div style="font-size:14px;">${subject.name}</div><div style="font-size:12px; color:var(--text-tertiary);">Mastery ${subject.mastery}% · ${subject.letterGrade || "in progress"}</div></div><div class="list-row-right"><span class="mono-val">${subject.currentGrade == null ? "—" : `${subject.currentGrade}%`}</span></div></div>`).join("")}</div>
    <h3 style="font-size:14px; margin:18px 0 8px;">Teachers & recommendations</h3>
    <div>${(state.education.teachers || []).slice(0, 6).map(teacher => `<div class="list-row"><div class="list-row-left"><div style="font-size:14px;">${teacher.name}</div><div style="font-size:12px; color:var(--text-tertiary);">${teacher.subjectName} · ${teacher.impression?.primaryTag || "developing impression"}</div></div><div class="list-row-right">${teacher.lor?.submitted ? `<span class="mono-sm">Sealed LoR</span>` : `<button class="btn btn-outline btn-sm btn-request-lor" data-teacher-id="${teacher.id}" type="button">Request</button>`}</div></div>`).join("")}</div>
  `;
}

function renderSchoolLifeDashboard(state) {
  if (!state.education.currentInstitution || (state.education.currentInstitution.enrolledAtAge || 0) < 6 || state.character.age < 10 || state.character.age > 19) return "";
  const peers = state.education.social?.classmates || [];
  const clubs = state.education.social?.clubs || [];
  const activities = getAvailableActivities(state).filter(activity => !clubs.some(club => club.id === activity.id && club.active !== false)).slice(0, 12);
  return `
    <h2 class="section-heading">School life</h2>
    <div class="detail-grid"><div><div class="detail-label">Classmates</div><div class="detail-val-mono">${peers.length}</div></div><div><div class="detail-label">Active activities</div><div class="detail-val-mono">${clubs.filter(club => club.active !== false).length}</div></div><div><div class="detail-label">Discipline standing</div><div class="detail-val-mono">${state.education.social?.discipline?.standing ?? 70}%</div></div><div><div class="detail-label">Social events</div><div class="detail-val-mono">${state.education.social?.parties?.length || 0}</div></div></div>
    <h3 style="font-size:14px; margin:18px 0 8px;">People</h3>
    <div>${peers.slice(0, 6).map(peer => `<div class="list-row"><div class="list-row-left"><div style="font-size:14px;">${peer.name}</div><div style="font-size:12px; color:var(--text-tertiary);">${peer.archetype} · Friendship ${peer.friendship}%</div></div><div class="list-row-right"><button class="btn btn-outline btn-sm btn-social-action" data-peer-id="${peer.id}" data-action="talk" type="button">Talk</button><button class="btn btn-outline btn-sm btn-social-action" data-peer-id="${peer.id}" data-action="study" type="button">Study</button></div></div>`).join("")}</div>
    ${clubs.length ? `<h3 style="font-size:14px; margin:18px 0 8px;">Your activities</h3><div>${clubs.filter(club => club.active !== false).map(club => `<div class="list-row"><div class="list-row-left"><div style="font-size:14px;">${club.name}</div><div style="font-size:12px; color:var(--text-tertiary);">${club.role} · Level ${club.level} · ${club.wins}W / ${club.losses}L</div></div><div class="list-row-right"><button class="btn btn-outline btn-sm btn-compete-activity" data-activity-id="${club.id}" type="button">Compete</button></div></div>`).join("")}</div>` : ""}
    <h3 style="font-size:14px; margin:18px 0 8px;">Join something</h3>
    <div style="display:flex; gap:6px; flex-wrap:wrap;">${activities.map(activity => `<button class="btn btn-outline btn-sm btn-join-activity" data-activity-id="${activity.id}" type="button">${activity.name}</button>`).join("")}</div>
    <div style="display:flex; gap:8px; margin-top:14px;"><button class="btn btn-outline btn-sm btn-attend-party" data-party="cafe" type="button">Café hangout</button><button class="btn btn-outline btn-sm btn-attend-party" data-party="school_dance" type="button">School dance</button><button class="btn btn-outline btn-sm btn-attend-party" data-party="house_party" type="button">House party</button></div>
  `;
}

function renderStudentWorkDashboard(state) {
  if (state.character.age < 12 || state.character.age > 19) return "";
  const employment = state.education.employment || { activeJob: null };
  const jobs = getAvailableStudentJobs(state).slice(0, 10);
  const active = employment.activeJob;
  return `
    <h2 class="section-heading">Student work</h2>
    ${active ? `<div class="surface-box" style="padding:14px; margin-bottom:12px;"><div style="font-size:14px;">${active.title}</div><div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${money(active.hourlyWageUSD)}/hr · ${active.weeklyHours}h/week · Student account ${money(state.finances.studentAccount?.cashUSD || 0)}</div><div style="display:flex; align-items:center; gap:10px; margin-top:10px;"><input type="range" class="student-job-hours" min="0" max="${active.legalMaxHours}" value="${active.weeklyHours}" style="flex:1; accent-color:var(--ink);"><span class="mono-val">${active.weeklyHours}h</span><button class="btn btn-outline btn-sm btn-quit-student-job" type="button">Quit</button></div></div>` : ""}
    ${!active ? `<div>${jobs.map(job => `<div class="list-row"><div class="list-row-left"><div style="font-size:14px;">${job.title}</div><div style="font-size:12px; color:var(--text-tertiary);">${money(job.localHourlyUSD)}/hr · max ${job.legalMaxHours}h/week · ${job.desc}</div></div><div class="list-row-right"><button class="btn btn-outline btn-sm btn-apply-student-job" data-job-id="${job.id}" type="button">Apply</button></div></div>`).join("")}</div>` : ""}
  `;
}

export function renderEducationCareerView(state) {
  const country = COUNTRIES[state.character.currentCountry] || COUNTRIES.india;
  const birthCountry = COUNTRIES[state.character.birthCountry] || COUNTRIES.india;

  return `
    <!-- Subtabs -->
    <div class="subtabs-bar">
      <button class="subtab-btn ${eduSubtab === 'education' ? 'active' : ''}" data-sub="education" type="button">Schooling</button>
      <button class="subtab-btn ${eduSubtab === 'corporate' ? 'active' : ''}" data-sub="corporate" type="button">Corporate</button>
      <button class="subtab-btn ${eduSubtab === 'special' ? 'active' : ''}" data-sub="special" type="button">Special</button>
    </div>

    ${eduSubtab === 'education' ? renderEducationSubtab(state, country, birthCountry) : ''}
    ${eduSubtab === 'corporate' ? renderCorporateSubtab(state) : ''}
    ${eduSubtab === 'special' ? renderSpecialCareersSubtab(state) : ''}
  `;
}

// 1. Education Subtab
function renderEducationSubtab(state, country, birthCountry) {
  const stage = state.education.stage;
  const age = state.character.age;
  const canApplyForUniversity = ([EDUCATION_STAGES.UPPER_SECONDARY, EDUCATION_STAGES.GAP_YEAR, EDUCATION_STAGES.GRADUATED].includes(stage) && age >= 16)
    || (stage === EDUCATION_STAGES.UNIVERSITY && age >= 18);
  const hasPostsecondaryRecord = [EDUCATION_STAGES.UNIVERSITY, EDUCATION_STAGES.GRADUATED, EDUCATION_STAGES.VOCATIONAL].includes(stage);

  if (![EDUCATION_STAGES.UPPER_SECONDARY, EDUCATION_STAGES.GAP_YEAR, EDUCATION_STAGES.UNIVERSITY, EDUCATION_STAGES.GRADUATED, EDUCATION_STAGES.VOCATIONAL].includes(stage)) {
    return renderStageOverview(state, country);
  }

  const currentBoard = country.schoolBoards ? country.schoolBoards.find(b => b.id === state.education.schoolBoard) : null;
  const boardName = currentBoard ? currentBoard.name : "High school curriculum";

  const cohortsMap = {
    jee_main: "1.45M",
    jee_advanced: "180K",
    neet: "2.4M",
    sat: "1.9M",
    cat: "330K",
    ielts: "3.5M",
    act: "1.4M",
    uk_admissions: "180K",
    uk_mat: "180K",
    uk_pat: "180K",
    uk_tmua: "180K",
    upsc: "1.1M"
  };

  const examDefinitions = new Map();
  for (const exam of [...(birthCountry.entranceExams || []), EXAMS.sat, EXAMS.act, EXAMS.ielts, EXAMS.cat, EXAMS.uk_admissions, EXAMS.uk_mat, EXAMS.uk_pat, EXAMS.uk_tmua]) {
    const canonical = EXAMS[exam.id] || {};
    const merged = { ...canonical, ...exam };
    if (merged.id === "jee") {
      examDefinitions.set("jee_main", { ...merged, id: "jee_main", name: "JEE Main", examKey: "jee_main", description: "First-stage engineering entrance exam. Your result is reported as a raw score, percentile, and estimated rank." });
      examDefinitions.set("jee_advanced", { ...merged, id: "jee_advanced", name: "JEE Advanced", examKey: "jee_advanced", costUSD: 40, requiresMainQualification: true, description: "Second-stage IIT selection exam. Only JEE Main qualifiers can register." });
    } else if (merged.id === "oxbridge_admissions") {
      examDefinitions.set("uk_admissions", { ...merged, id: "uk_admissions", name: "UK course admissions test", examKey: "uk_admissions", costUSD: 95, description: "Course-specific test for selective UK programs. SAT is not a substitute." });
    } else {
      examDefinitions.set(exam.id, merged);
    }
  }
  const availableExams = canApplyForUniversity ? [...examDefinitions.values()].filter(exam => {
    const withinAge = (exam.minAge == null || age >= exam.minAge) && (exam.maxAge == null || age <= exam.maxAge);
    const hasDegree = !exam.requiresDegree || state.education.degrees.length > 0;
    return withinAge && hasDegree;
  }) : [];

  const examsHtml = availableExams.map(ex => {
    const score = state.education.examScores[ex.id];
    const mainResult = state.education.examScores.jee_main;
    const advancedLocked = ex.requiresMainQualification && !(mainResult && mainResult.percentile >= 90);
    const cohort = cohortsMap[ex.id] || (ex.cohort || null);
    return `
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">${ex.name}</div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
            ${ex.description || ex.desc || ''}${cohort ? ` · Cohort <span style="font-family: var(--font-mono);">${cohort}</span>` : ''}
          </div>
        </div>
        <div class="list-row-right">
          ${score !== undefined ? `
            <span class="mono-val">${typeof score === "object" ? `${score.rawScore} · ${score.percentile}%ile` : score}</span>
          ` : `
            <button class="btn btn-outline btn-sm btn-take-exam" data-exam="${ex.id}" type="button" ${advancedLocked ? "disabled" : ""}>
              ${advancedLocked ? "Requires JEE Main" : `Take exam ($${ex.costUSD || 50})`}
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");

  const universities = getUniversityCatalog(state);
  const universitiesHtml = canApplyForUniversity ? universities.map(uni => {
    const isEnrolled = state.education.currentUniversity && state.education.currentUniversity.id === uni.id;
    const isAbroad = uni.country !== birthCountry.id;
    const application = state.education.applications?.find(item => item.universityId === uni.id);

    return `
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">
            ${uni.name} ${isAbroad ? '<span style="font-size: 12px; color: var(--text-tertiary); margin-left: 4px;">· Abroad</span>' : ''}
          </div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
            ${uni.city} · Tuition <span style="font-family: var(--font-mono);">$${uni.tuitionPerYearUSD.toLocaleString()}</span>/yr · ${uni.durationYears}-year program · ${uni.admissionModel.replaceAll("_", " ")}
          </div>
        </div>
        <div class="list-row-right">
          ${isEnrolled ? `
            <span class="mono-val">Enrolled (Yr ${state.education.currentUniversity.year}/${state.education.currentUniversity.totalYears || uni.durationYears})</span>
          ` : application?.status === "admitted" ? `
            <button class="btn btn-primary btn-sm btn-enroll-admission" data-application-id="${application.id}" type="button">${state.education.currentUniversity ? "Transfer" : "Enroll"}</button>
          ` : application ? `
            <span class="mono-sm" style="text-transform:capitalize;">${application.status}</span>
          ` : `
            <button class="btn btn-outline btn-sm btn-apply-uni" data-uni="${uni.id}" type="button">
              Apply
            </button>
          `}
        </div>
      </div>
    `;
  }).join("") : "";

  return `
    <!-- Academic Status -->
    <h2 class="section-heading first">Academic status</h2>
    <div class="detail-grid">
      <div>
        <div class="detail-label">Curriculum / Institution</div>
        <div class="detail-val">${state.education.currentInstitution?.name || state.education.currentUniversity?.name || boardName || "Not selected yet"}</div>
      </div>
      <div>
        <div class="detail-label">Stage</div>
        <div class="detail-val">${state.education.currentUniversity ? `Year ${state.education.currentUniversity.year} of ${state.education.currentUniversity.totalYears || 4}` : stageLabel(stage)}</div>
      </div>
      <div>
        <div class="detail-label">GPA</div>
        <div class="detail-val-mono">${state.education.gpa == null ? "Not yet graded" : `${state.education.gpa.toFixed(2)}<span style="color: var(--text-tertiary);">/4.0</span>`}</div>
      </div>
      <div>
        <div class="detail-label">Annual tuition</div>
        <div class="detail-val-mono">${state.education.currentUniversity ? `$${state.education.currentUniversity.tuitionUSD.toLocaleString()}` : '$0'}</div>
      </div>
    </div>
    <div style="display: flex; gap: 8px; margin-top: 14px;">
      ${canApplyForUniversity || stage === EDUCATION_STAGES.UPPER_SECONDARY ? `<button class="btn btn-outline btn-sm" id="btnStudyRigorous" type="button">Study coursework</button>` : ''}
      ${canApplyForUniversity ? `<button class="btn btn-outline btn-sm" id="btnPrivateCoaching" type="button">Coaching ($1,500)</button>` : ''}
    </div>

    ${renderSchoolChoices(state)}
    ${renderAcademicDashboard(state)}
    ${renderSchoolLifeDashboard(state)}
    ${renderStudentWorkDashboard(state)}

    <!-- Entrance Exams -->
    ${canApplyForUniversity ? `
      <h2 class="section-heading">Examinations</h2>
      <div>${examsHtml}</div>
    ` : ''}

    <!-- Global Admissions -->
    ${canApplyForUniversity ? `
      <h2 class="section-heading">Application studio</h2>
      <div class="surface-box" style="padding:14px; margin-bottom:14px;">
        <div style="font-size:14px;">${state.education.essay?.title || "Personal statement"} · Draft ${state.education.essay?.draftStage || 1}/4</div>
        <div style="font-size:12px; color:var(--text-tertiary); margin-top:4px;">Polish ${state.education.essay?.polish || 35}% · Authenticity ${state.education.essay?.authenticity || 82}%</div>
        <button class="btn btn-outline btn-sm btn-revise-essay" type="button" style="margin-top:10px;">Revise with teacher feedback</button>
      </div>
      <h2 class="section-heading">Global admissions</h2>
      <div>${universitiesHtml}</div>
    ` : hasPostsecondaryRecord ? `<h2 class="section-heading">Admissions history</h2><p style="font-size: 13px; color: var(--text-secondary);">Undergraduate applications are closed for this life stage.</p>` : ''}

    <!-- Completed Degrees -->
    ${state.education.degrees.length > 0 ? `
      <h2 class="section-heading">Degrees</h2>
      <div>
        ${state.education.degrees.map(deg => `
          <div class="list-row">
            <div class="list-row-left">
              <div style="font-size: 15px;">${deg.title}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${deg.university}</div>
            </div>
            <div class="list-row-right">
              <span class="mono-sm">Age ${deg.graduationAge}</span>
            </div>
          </div>
        `).join("")}
      </div>
    ` : ''}
  `;
}

function renderStageOverview(state, country) {
  const stage = state.education.stage;
  const age = state.character.age;
  const detail = {
    [EDUCATION_STAGES.INFANCY]: "Early development is shaped by health, play, language, sleep, and family attention. No school résumé exists yet.",
    [EDUCATION_STAGES.PRESCHOOL]: "Your household is evaluating age-appropriate early-learning options. Academic credentials and university exams are not available at this stage.",
    [EDUCATION_STAGES.PRIMARY]: "Primary school builds foundational literacy, numeracy, curiosity, and friendships. Formal transcripts will arrive later.",
    [EDUCATION_STAGES.LOWER_SECONDARY]: "Lower secondary expands subjects and habits. The future curriculum is not yet a university application.",
  }[stage] || "This stage is still being prepared.";
  return `
    <h2 class="section-heading first">${stageLabel(stage)}</h2>
    <div class="detail-grid">
      <div><div class="detail-label">Age</div><div class="detail-val-mono">${age}</div></div>
      <div><div class="detail-label">Country</div><div class="detail-val">${country.flag} ${country.name}</div></div>
      <div><div class="detail-label">Curriculum</div><div class="detail-val">${state.education.schoolBoard || "Not selected"}</div></div>
      <div><div class="detail-label">Record</div><div class="detail-val">${state.education.transcript.length ? `${state.education.transcript.length} entries` : "No transcript yet"}</div></div>
    </div>
    <div class="surface-box" style="margin-top: 18px; padding: 16px;">
      <div style="font-size: 14px; line-height: 1.6; color: var(--text-secondary);">${detail}</div>
    </div>
    ${renderSchoolChoices(state)}
    ${renderFamilyEducationContext(state)}
    ${renderAcademicDashboard(state)}
    ${renderSchoolLifeDashboard(state)}
    ${renderStudentWorkDashboard(state)}
  `;
}

// 2. Corporate Careers Subtab
function renderCorporateSubtab(state) {
  const job = state.career.currentJob;

  return `
    <!-- Current Corporate Position -->
    <h2 class="section-heading first">Current employment</h2>
    ${job ? `
      <div class="detail-grid">
        <div>
          <div class="detail-label">Title</div>
          <div class="detail-val">${job.title}</div>
        </div>
        <div>
          <div class="detail-label">Base salary</div>
          <div class="detail-val-mono">$${job.baseSalaryUSD.toLocaleString()}/yr</div>
        </div>
        <div>
          <div class="detail-label">Annual bonus</div>
          <div class="detail-val-mono">${Math.round(job.bonusPct * 100)}%</div>
        </div>
        <div>
          <div class="detail-label">Stock (RSU)</div>
          <div class="detail-val-mono">$${job.stockUSD.toLocaleString()}/yr</div>
        </div>
      </div>
      <div style="margin-top: 14px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-tertiary);">
          <span>Performance</span>
          <span style="font-family: var(--font-mono); color: var(--ink);">${job.performance}%</span>
        </div>
        <div style="height: 2px; background: rgba(22, 21, 15, 0.10); margin-top: 6px;">
          <div style="height: 2px; width: ${job.performance}%; background: var(--ink);"></div>
        </div>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 16px;">
        <button class="btn btn-outline btn-sm" id="btnWorkOvertime" type="button">Work hard</button>
        <button class="btn btn-outline btn-sm" id="btnNetworkExecs" type="button">Network</button>
        <button class="btn btn-outline btn-sm" id="btnQuitJob" type="button" style="color: var(--text-tertiary);">Resign</button>
      </div>
    ` : `
      <div class="surface-box" style="text-align: center; padding: 28px;">
        <div style="font-size: 15px;">No corporate position held</div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 6px;">
          Apply to an entry-level track below to begin climbing the professional ladder.
        </p>
      </div>
    `}

    <!-- Career Ladders -->
    <h2 class="section-heading">Career ladders</h2>
    <div>
      ${CAREER_TRACKS.map(track => {
        const ladderPath = track.ladder.map(l => l.title.replace(/ \(.*\)/, '')).join(" → ");
        return `
          <div class="list-row">
            <div class="list-row-left">
              <div style="font-size: 15px;">${track.name.replace(/ & .*/, '')}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px; line-height: 1.4;">
                ${ladderPath}
              </div>
            </div>
            <div class="list-row-right">
              <div style="font-family: var(--font-mono); font-size: 13px; color: var(--text-tertiary); margin-bottom: 4px;">
                $${track.ladder[0].baseSalaryUSD.toLocaleString()}
              </div>
              <button class="btn btn-outline btn-sm btn-apply-job" data-track="${track.id}" type="button" ${state.character.age < 18 ? "disabled" : ""}>
                ${state.character.age < 18 ? "Age 18+" : "Apply"}
              </button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// 3. Special Careers Subtab
function renderSpecialCareersSubtab(state) {
  const sc = state.career.specialCareer;

  const specialList = [
    { id: "indie_dev", name: "Indie game developer", desc: "Pick genre and platform, publish on Steam, earn sales royalties" },
    { id: "content_creator", name: "Content creator", desc: "YouTube and Twitch niches, viral algorithm, sponsorships" },
    { id: "model", name: "Fashion model", desc: "Agency contracts, fashion weeks, Vogue covers" },
    { id: "musician", name: "Music artist and producer", desc: "Singles, albums, Billboard charting, stadium tours" },
    { id: "athlete", name: "Professional athlete", desc: "Football, basketball, F1, tennis; club contracts and trophies" },
    { id: "author", name: "Author and novelist", desc: "Book advances, bestseller lists, adaptation rights" }
  ];

  return `
    <!-- Active Special Career Studio -->
    <h2 class="section-heading first">Active venture</h2>
    ${sc ? `
      <div class="detail-grid">
        <div>
          <div class="detail-label">Venture</div>
          <div class="detail-val">${sc.name}</div>
        </div>
        <div>
          <div class="detail-label">Type</div>
          <div class="detail-val" style="text-transform: capitalize;">${sc.type || 'Creative'}</div>
        </div>
        <div>
          <div class="detail-label">Annual royalties / revenue</div>
          <div class="detail-val-mono">$${Math.round(sc.annualRoyaltiesUSD || sc.annualStreamingUSD || sc.annualSalesUSD || 0).toLocaleString()}</div>
        </div>
      </div>
    ` : `
      <div class="surface-box" style="text-align: center; padding: 28px;">
        <div style="font-size: 15px;">No active venture</div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 6px;">
          Select an unconventional career path below to build an independent audience and royalty streams.
        </p>
      </div>
    `}

    <!-- Special Careers Catalog -->
    <h2 class="section-heading">Special careers</h2>
    <div>
      ${specialList.map(s => `
        <div class="list-row">
          <div class="list-row-left">
            <div style="font-size: 15px;">${s.name}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${s.desc}</div>
          </div>
          <div class="list-row-right">
            <button class="btn btn-outline btn-sm btn-launch-special" data-special="${s.id}" type="button">
              Pursue
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

export function bindEducationCareerEvents(state, rerenderCallback) {
  // Subtab navigation
  document.querySelectorAll(".subtab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      eduSubtab = btn.dataset.sub;
      rerenderCallback();
    });
  });

  // School and preschool enrollment. The household pays dependent fees via
  // the finance engine; the UI never deducts a child's cash directly.
  document.querySelectorAll(".btn-enroll-school").forEach(btn => {
    btn.addEventListener("click", () => {
      const choices = [...(state.education.schoolChoices || []), ...(state.education.preschoolCandidates || [])];
      const school = choices.find(item => item.id === btn.dataset.schoolId);
      if (!school) return;
      const outcome = enrollInSchool(state, school);
      showToast(outcome.message, outcome.success ? "success" : "error");
      if (outcome.success) {
        state.education.preschoolCandidates = [];
        rerenderCallback();
      }
    });
  });

  document.querySelectorAll(".btn-study-method").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = setStudyMethod(state, btn.dataset.method);
      if (result.success) showToast(`Study method: ${result.method.name}`, "info");
      rerenderCallback();
    });
  });

  document.querySelectorAll(".education-alloc").forEach(input => {
    input.addEventListener("change", () => {
      const result = setTimeAllocation(state, input.dataset.key, input.value);
      if (!result.success) showToast(result.message, "error");
      rerenderCallback();
    });
  });

  document.querySelectorAll(".btn-social-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = socialAction(state, btn.dataset.peerId, btn.dataset.action);
      showToast(result.message, result.success ? "success" : "error");
      if (result.success) rerenderCallback();
    });
  });

  document.querySelectorAll(".btn-join-activity").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = joinActivity(state, btn.dataset.activityId);
      showToast(result.message, result.success ? "success" : "error");
      if (result.success) rerenderCallback();
    });
  });

  document.querySelectorAll(".btn-compete-activity").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = competeInActivity(state, btn.dataset.activityId, "state");
      if (result.success) showToast(`${result.result.victory ? "Won" : "Lost"} against ${result.result.opponentName}.`, result.result.victory ? "celebrate" : "info");
      else showToast(result.message, "error");
      rerenderCallback();
    });
  });

  document.querySelectorAll(".btn-attend-party").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = attendParty(state, btn.dataset.party);
      showToast(result.message, result.success ? "success" : "error");
      if (result.success) rerenderCallback();
    });
  });

  document.querySelectorAll(".btn-apply-student-job").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = applyForStudentJob(state, btn.dataset.jobId);
      showToast(result.message, result.success ? "success" : "error");
      if (result.success) rerenderCallback();
    });
  });

  const studentJobHours = document.querySelector(".student-job-hours");
  if (studentJobHours) {
    studentJobHours.addEventListener("change", () => {
      const result = setStudentJobHours(state, studentJobHours.value);
      showToast(result.message || `Schedule updated to ${result.hours}h/week.`, result.success ? "success" : "error");
      rerenderCallback();
    });
  }

  const quitStudentJobButton = document.querySelector(".btn-quit-student-job");
  if (quitStudentJobButton) {
    quitStudentJobButton.addEventListener("click", () => {
      const result = quitStudentJob(state);
      showToast(result.message, result.success ? "info" : "error");
      rerenderCallback();
    });
  }

  // Study Hard
  const btnStudyRigorous = document.getElementById("btnStudyRigorous");
  if (btnStudyRigorous) {
    btnStudyRigorous.addEventListener("click", () => {
      const result = applyAcademicAction(state, { skillKey: "algebra", hours: 4, teachingQuality: 1.0 });
      state.education.gpa = state.education.gpa == null ? 2.5 : Math.min(4.0, state.education.gpa + Math.min(0.05, result.knowledgeGain / 100));
      showToast(`Completed coursework (+${result.knowledgeGain} algebra mastery)`, "success");
      rerenderCallback();
    });
  }

  // Elite Coaching
  const btnPrivateCoaching = document.getElementById("btnPrivateCoaching");
  if (btnPrivateCoaching) {
    btnPrivateCoaching.addEventListener("click", () => {
      const payment = requestEducationPayment(state, {
        amountUSD: 1500,
        type: "coaching",
        description: "entrance-exam coaching",
        mandatory: false
      });
      if (!payment.success) {
        showToast(payment.message, "error");
        return;
      }
      const result = applyAcademicAction(state, { skillKey: "algebra", hours: 8, teachingQuality: 1.15 });
      state.education.coachingEfficacy = Math.min(2, (state.education.coachingEfficacy || 1) + 0.12);
      state.education.gpa = state.education.gpa == null ? 2.7 : Math.min(4.0, state.education.gpa + Math.min(0.12, result.knowledgeGain / 80));
      calculateNetWorth(state);
      showToast(`${payment.message} Coaching added (+${result.knowledgeGain} algebra mastery)`, "success");
      rerenderCallback();
    });
  }

  document.querySelectorAll(".btn-revise-essay").forEach(btn => {
    btn.addEventListener("click", () => {
      state.education.essay = iterateEssayDraft(state.education.essay || { draftStage: 1, polish: 35, authenticity: 82 }, 4, "teacher");
      showToast(`Personal statement revised to draft ${state.education.essay.draftStage}/4.`, "success");
      rerenderCallback();
    });
  });

  document.querySelectorAll(".btn-request-lor").forEach(btn => {
    btn.addEventListener("click", () => {
      const teacher = (state.education.teachers || []).find(item => item.id === btn.dataset.teacherId);
      if (!teacher) return;
      teacher.lor = generateRecommendationLetter(teacher, state.character.firstName);
      showToast(teacher.lor.agreed ? "Teacher agreed to submit a sealed recommendation." : "Teacher declined to recommend you.", teacher.lor.agreed ? "success" : "error");
      rerenderCallback();
    });
  });

  // Take Exam
  document.querySelectorAll(".btn-take-exam").forEach(btn => {
    btn.addEventListener("click", () => {
      const examId = btn.dataset.exam;
      const examDefaults = {
        jee_main: { name: "JEE Main", costUSD: 35, examKey: "jee_main" },
        jee_advanced: { name: "JEE Advanced", costUSD: 40, examKey: "jee_advanced" },
        neet: { name: "NEET UG", costUSD: 25, examKey: "neet_ug" },
        sat: EXAMS.sat,
        act: EXAMS.act,
        uk_admissions: EXAMS.uk_admissions,
        uk_mat: EXAMS.uk_mat,
        uk_pat: EXAMS.uk_pat,
        uk_tmua: EXAMS.uk_tmua,
        ielts: EXAMS.ielts,
        cat: EXAMS.cat,
        upsc: EXAMS.upsc
      };
      const ex = examDefaults[examId] || EXAMS[examId] || (COUNTRIES[state.character.birthCountry]?.entranceExams?.find(e => e.id === examId));
      if (!ex) return;

      if (examId === "jee_advanced") {
        const mainResult = state.education.examScores.jee_main;
        if (!mainResult || mainResult.percentile < 90) {
          showToast("JEE Advanced requires a qualifying JEE Main result.", "error");
          return;
        }
      }

      const fee = ex.costUSD || 50;
      const payment = requestEducationPayment(state, {
        amountUSD: fee,
        type: "exam_fee",
        description: ex.name,
        mandatory: false
      });
      if (!payment.success) {
        showToast(payment.message, "error");
        return;
      }

      let scoreText = "";
      const cohortExamKey = ex.examKey || ({ sat: "sat", act: "act", neet: "neet_ug", uk_admissions: "uk_admissions", uk_mat: "uk_admissions", uk_pat: "uk_admissions", uk_tmua: "uk_admissions" }[examId]);
      if (cohortExamKey) {
        state.education.examBayesianStates = state.education.examBayesianStates || {};
        const attempt = (state.education.examAttempts?.[examId] || 0) + 1;
        const previousBayesianState = state.education.examBayesianStates[examId] || null;
        const result = EducationExamEngine.runMockExam(state, cohortExamKey, attempt, previousBayesianState);
        state.education.examAttempts = state.education.examAttempts || {};
        state.education.examAttempts[examId] = attempt;
        state.education.examBayesianStates[examId] = result.bayesianState;
        state.education.examScores[examId] = {
          rawScore: result.observedScore,
          percentile: result.currentPercentile,
          estimatedRank: result.currentRank,
          examKey: cohortExamKey
        };
        scoreText = `${ex.name}: ${result.observedScore}/${EducationExamEngine.getMaximumScore(cohortExamKey)} · ${result.currentPercentile}%ile · estimated rank ${result.currentRank.toLocaleString()}`;
      } else if (examId === "ielts") {
        const verbal = state.cognition?.learnedSkills?.writing || 0;
        const band = Math.min(9.0, Math.max(4.0, Math.round((4.5 + verbal / 25) * 2) / 2));
        state.education.examScores.ielts = band;
        scoreText = `IELTS: ${band} / 9.0`;
      } else if (examId === "cat") {
        const quant = state.cognition?.learnedSkills?.algebra || 0;
        const verbal = state.cognition?.learnedSkills?.writing || 0;
        const catPct = Math.min(99.9, Math.round((45 + (quant * 0.32) + (verbal * 0.20)) * 10) / 10);
        state.education.examScores.cat = catPct;
        scoreText = `CAT: ${catPct}%ile`;
      } else {
        state.education.examScores[examId] = 95;
        scoreText = `Exam completed`;
      }

      calculateNetWorth(state);
      showToast(`${payment.message} ${scoreText}`, "celebrate");
      rerenderCallback();
    });
  });

  // Apply to University
  document.querySelectorAll(".btn-apply-uni").forEach(btn => {
    btn.addEventListener("click", () => {
      const uniId = btn.dataset.uni;
      const uni = getUniversityCatalog(state).find(u => u.id === uniId);
      if (!uni) return;

      const majorsOptions = uni.majors.map(m => `<option value="${m}">${m}</option>`).join("");
      const isUKTop = uni.country === "uk" && ["university of oxford", "university of cambridge"].includes(String(uni.name).toLowerCase());
      const testScore = state.education.examScores.uk_admissions || state.education.examScores.uk_mat;

      openModal(`Apply to ${uni.name}`, `
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
          ${uni.city}, ${uni.country.toUpperCase()} · ${uni.durationYears}-year program · ${uni.admissionModel.replaceAll("_", " ")}
        </p>
        <div class="input-group">
          <label class="input-label">Degree major</label>
          <select id="selectUniMajor" class="input-field">
            ${majorsOptions}
          </select>
        </div>
        <div style="font-size: 13px; margin-bottom: 14px; border: 1px solid var(--hairline-strong); padding: 10px; border-radius: 4px; background: var(--surface);">
          <div>Annual tuition: <strong style="font-family: var(--font-mono);">$${uni.tuitionPerYearUSD.toLocaleString()}</strong></div>
          <div>Program duration: <strong style="font-family: var(--font-mono);">${uni.durationYears} years</strong></div>
          ${uni.minSAT ? `<div>Minimum SAT: <strong style="font-family: var(--font-mono);">${uni.minSAT}</strong> (Current: ${getRawExamScore(state.education.examScores.sat) || 'Not taken'})</div>` : ''}
          ${isUKTop ? `<div>UK admissions test: <strong style="font-family: var(--font-mono);">${testScore ? `${getRawExamScore(testScore)} / 100` : 'Required'}</strong> · SAT is not a substitute</div>` : ''}
          ${uni.examReq ? `<div>Required pathway: <strong style="font-family: var(--font-mono);">${uni.examReq.toUpperCase()}</strong></div>` : ''}
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmUniApply" type="button">${state.education.currentUniversity ? "Submit transfer application" : "Submit application"}</button>
      `);

      document.getElementById("btnConfirmUniApply")?.addEventListener("click", () => {
        const major = document.getElementById("selectUniMajor").value;
        const outcome = submitAdmissionApplication(state, uni, major);
        closeModal();
        showToast(outcome.message || "Application submitted.", outcome.success && outcome.application?.decision === "admitted" ? "celebrate" : outcome.success ? "info" : "error");
        rerenderCallback();
      });
    });
  });

  document.querySelectorAll(".btn-enroll-admission").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = state.education.currentUniversity
        ? transferUniversity(state, btn.dataset.applicationId)
        : enrollAdmission(state, btn.dataset.applicationId);
      showToast(result.message, result.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });

  // Apply to Corporate Job
  document.querySelectorAll(".btn-apply-job").forEach(btn => {
    btn.addEventListener("click", () => {
      if (state.character.age < 18) {
        showToast("Corporate employment opens at legal adulthood. Student jobs use the school-life panel.", "error");
        return;
      }
      const trackId = btn.dataset.track;
      const track = CAREER_TRACKS.find(t => t.id === trackId);
      if (!track) return;

      const entry = track.ladder[0];
      const hasReqDegree = track.requiredDegrees.length === 0 || state.education.degrees.some(d => track.requiredDegrees.includes(d.major));

      if (!hasReqDegree && track.id !== "civil_service" && state.education.stage !== EDUCATION_STAGES.GRADUATED) {
        showToast(`Requires a degree in ${track.requiredDegrees[0]} or related field`, "error");
        return;
      }

      if (state.stats.smarts < track.minSmarts - 10) {
        showToast(`Interview unsuccessful (requires ~${track.minSmarts} smarts)`, "error");
        return;
      }

      state.career.currentJob = {
        trackId: track.id,
        level: 1,
        title: entry.title,
        baseSalaryUSD: entry.baseSalaryUSD,
        bonusPct: entry.bonusPct,
        stockUSD: entry.stockUSD,
        experienceYears: 0,
        performance: 80
      };

      state.stats.happiness = Math.min(100, state.stats.happiness + 15);
      showToast(`Hired as ${entry.title} at $${entry.baseSalaryUSD.toLocaleString()}/yr`, "celebrate");
      rerenderCallback();
    });
  });

  // Workplace actions
  const btnWorkOvertime = document.getElementById("btnWorkOvertime");
  if (btnWorkOvertime) {
    btnWorkOvertime.addEventListener("click", () => {
      if (state.career.currentJob) {
        state.career.currentJob.performance = Math.min(100, state.career.currentJob.performance + 10);
        state.stats.happiness = Math.max(10, state.stats.happiness - 3);
        showToast("Overtime logged (+10 performance)", "success");
        rerenderCallback();
      }
    });
  }

  const btnNetworkExecs = document.getElementById("btnNetworkExecs");
  if (btnNetworkExecs) {
    btnNetworkExecs.addEventListener("click", () => {
      state.stats.prestige = Math.min(100, state.stats.prestige + 3);
      if (state.career.currentJob) {
        state.career.currentJob.performance = Math.min(100, state.career.currentJob.performance + 5);
      }
      showToast("Executive dinners attended (+3 prestige)", "success");
      rerenderCallback();
    });
  }

  const btnQuitJob = document.getElementById("btnQuitJob");
  if (btnQuitJob) {
    btnQuitJob.addEventListener("click", () => {
      state.career.currentJob = null;
      showToast("Resigned from position", "info");
      rerenderCallback();
    });
  }

  // Special Careers Launch Handlers
  document.querySelectorAll(".btn-launch-special").forEach(btn => {
    btn.addEventListener("click", () => {
      const specialId = btn.dataset.special;
      if (specialId === "indie_dev") {
        openModal("Launch indie game project", `
          <div class="input-group">
            <label class="input-label">Game title</label>
            <input type="text" id="inputGameTitle" class="input-field" placeholder="e.g. Neon Horizon" value="Cyberfall Roguelike">
          </div>
          <div class="input-group">
            <label class="input-label">Genre</label>
            <select id="selectGameGenre" class="input-field">
              <option value="roguelike">Action roguelike</option>
              <option value="cozy_sim">Cozy simulation</option>
              <option value="cyberpunk_rpg">Sci-fi RPG</option>
              <option value="psychological_horror">Psychological horror</option>
            </select>
          </div>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
            Publishing on Steam costs $100. Royalties scale with smarts and reviews.
          </p>
          <button class="btn btn-primary btn-full" id="btnConfirmLaunchGame" type="button">Develop & publish ($100)</button>
        `);

        document.getElementById("btnConfirmLaunchGame")?.addEventListener("click", () => {
          const title = document.getElementById("inputGameTitle").value || "Untitled indie game";
          if (state.finances.cashUSD < 100) {
            showToast("Requires $100 for submission fee", "error");
            return;
          }
          state.finances.cashUSD -= 100;
          const sales = Math.round(15000 + (state.stats.smarts * 350));
          state.finances.cashUSD += sales;
          state.career.specialCareer = {
            type: "indie_dev",
            name: title,
            annualRoyaltiesUSD: sales
          };
          closeModal();
          showToast(`Game published on Steam. Earned $${sales.toLocaleString()} in royalties`, "celebrate");
          rerenderCallback();
        });
      } else if (specialId === "content_creator") {
        const followers = Math.round(20000 + (state.stats.looks * 400));
        const rev = Math.round(followers * 0.45);
        state.finances.cashUSD += rev;
        state.career.specialCareer = {
          type: "content_creator",
          name: "Digital Creator Studio",
          followers: followers,
          annualRoyaltiesUSD: rev
        };
        showToast(`Channel reached ${followers.toLocaleString()} subscribers. Earned $${rev.toLocaleString()}`, "celebrate");
        rerenderCallback();
      } else if (specialId === "model") {
        if (state.stats.looks < 75) {
          showToast("High-fashion agency requires at least 75 looks", "error");
          return;
        }
        const gigPay = Math.round(state.stats.looks * 350);
        state.finances.cashUSD += gigPay;
        state.stats.fame = Math.min(100, state.stats.fame + 8);
        state.stats.prestige = Math.min(100, state.stats.prestige + 6);
        state.career.specialCareer = {
          type: "model",
          name: "High-Fashion Agency Contract",
          annualRoyaltiesUSD: gigPay
        };
        calculateNetWorth(state);
        showToast(`Walked Paris runway. Earned $${gigPay.toLocaleString()}`, "celebrate");
        rerenderCallback();
      } else if (specialId === "musician") {
        const royalties = Math.round(25000 + Math.random() * 60000);
        state.finances.cashUSD += royalties;
        state.stats.fame = Math.min(100, state.stats.fame + 12);
        state.career.specialCareer = {
          type: "musician",
          name: "Music Artist & Producer",
          annualStreamingUSD: royalties
        };
        calculateNetWorth(state);
        showToast(`Single charted. Collected $${royalties.toLocaleString()} in streaming royalties`, "celebrate");
        rerenderCallback();
      } else if (specialId === "athlete") {
        if (state.stats.health < 75) {
          showToast("Pro draft requires at least 75 health", "error");
          return;
        }
        const salary = 120000;
        state.finances.cashUSD += salary;
        state.stats.fame = Math.min(100, state.stats.fame + 10);
        state.career.specialCareer = {
          type: "athlete",
          name: "Professional Athlete Contract",
          annualRoyaltiesUSD: salary
        };
        calculateNetWorth(state);
        showToast(`Signed pro club contract. Earned $${salary.toLocaleString()} starting salary`, "celebrate");
        rerenderCallback();
      } else if (specialId === "author") {
        const advance = Math.round(15000 + (state.stats.smarts * 400));
        state.finances.cashUSD += advance;
        state.stats.prestige = Math.min(100, state.stats.prestige + 8);
        state.career.specialCareer = {
          type: "author",
          name: "Published Novelist",
          annualRoyaltiesUSD: advance
        };
        calculateNetWorth(state);
        showToast(`Book published and hit bestseller list. Earned $${advance.toLocaleString()} advance`, "celebrate");
        rerenderCallback();
      }
    });
  });
}
