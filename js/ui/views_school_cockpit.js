// ============================================================================
// File: js/ui/views_school_cockpit.js
// Description: Minimalist Editorial Cockpit with 8 Subtabs for School & Education
// ============================================================================

import { HIGH_SCHOOL_CLUBS, STUDENT_JOBS_CATALOG, SUBJECT_SUBTOPICS } from "../data/education_data.js";
import { STUDY_METHODS, TimeAllocationEngine } from "../systems/student_engine.js";
import { EducationExamEngine } from "../systems/education_exam_engine.js";
import { convertCurrency, evaluateParentalExpenseNegotiation, generateRecommendationLetter, iterateEssayDraft, resolveClubTournamentMatch } from "../systems/social_school_engine.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";

let schoolSubTab = "overview"; // "overview" | "academics" | "people" | "activities" | "career" | "applications" | "family" | "records"

export function renderHighSchoolCockpit(G) {
  const hs = G.highSchool || initHighSchoolState(G);
  const curr = G.character?.currentCurrency || "USD";
  const age = G.character?.age || 16;
  const birthCountry = G.character?.birthCountry || "india";
  const schoolName = birthCountry === "india" 
    ? "Delhi Public School (CBSE)" 
    : (birthCountry === "china" ? "Tsinghua High School" : "Oakridge High School (AP / Honors)");

  return `
    <div class="school-cockpit">
      <!-- Cockpit Header Banner -->
      <div class="surface-box" style="padding: 18px 20px; margin-bottom: 24px;">
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

// 1. OVERVIEW: 168-Hour Time Allocator & Live Stress Gauges
function renderOverviewSubtab(G, hs) {
  const alloc = hs.timeAllocation;
  const total = Object.values(alloc).reduce((acc, h) => acc + (Number(h) || 0), 0);
  const free = 168 - total;
  const isBurnout = free < 0;

  return `
    <h2 class="section-heading first">Weekly 168-hour resource budget</h2>
    <div style="display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 12px; border-bottom: 1px solid var(--hairline); margin-bottom: 16px;">
      <span style="font-size: 13px; color: var(--text-tertiary);">Budget status</span>
      <span class="mono-val" style="font-size: 13px;">${isBurnout ? `Deficit: ${Math.abs(free)}h / week` : `Free: ${free}h / week`}</span>
    </div>

    ${renderSliderRow("sleep", "Sleep (rec. 56h)", alloc.sleep, 28, 70, hs)}
    ${renderSliderRow("selfStudy", "Self study", alloc.selfStudy, 0, 35, hs)}
    ${renderSliderRow("examCoaching", "Coaching / mocks", alloc.examCoaching, 0, 25, hs)}
    ${renderSliderRow("activitiesClubs", "Clubs & sports", alloc.activitiesClubs, 0, 25, hs)}
    ${renderSliderRow("partTimeWork", "Student job", alloc.partTimeWork, 0, 25, hs)}
    ${renderSliderRow("friendsSocial", "Friends & social", alloc.friendsSocial, 0, 25, hs)}
    ${renderSliderRow("leisureGaming", "Rest & leisure", alloc.leisureGaming, 0, 35, hs)}

    ${isBurnout ? `
      <div class="surface-box" style="margin-top: 20px; padding: 16px;">
        <div style="font-size: 13px; color: var(--ink);">Chronic sleep deficit</div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Working memory degrades and test performance drops under severe sleep deprivation.</p>
      </div>
    ` : ''}

    <!-- Physiological Status Matrix -->
    <h2 class="section-heading">Mental condition & vigor</h2>
    <div class="detail-grid">
      <div>
        <div class="detail-label">Sleep debt</div>
        <div class="detail-val-mono">${Math.max(0, 56 - alloc.sleep)}h / wk</div>
      </div>
      <div>
        <div class="detail-label">Study focus</div>
        <div class="detail-val-mono">${G.cognition?.traits?.focus || 70}%</div>
      </div>
      <div>
        <div class="detail-label">Exam temperament</div>
        <div class="detail-val-mono">${G.cognition?.traits?.examTemperament || 65}%</div>
      </div>
      <div>
        <div class="detail-label">Burnout risk</div>
        <div class="detail-val">${isBurnout ? 'Critical' : 'Minimal'}</div>
      </div>
    </div>
  `;
}

function renderSliderRow(key, label, val, min, max, hs) {
  return `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 0; border-bottom: 1px solid var(--hairline);">
      <span style="font-size: 14px; width: 140px; color: var(--ink);">${label}</span>
      <input type="range" class="slider-alloc" data-key="${key}" min="${min}" max="${max}" value="${val}" style="flex: 1; accent-color: var(--ink); cursor: pointer;" />
      <span class="mono-val" style="width: 45px; text-align: right; font-size: 13px;">${val}h</span>
    </div>
  `;
}

// 2. ACADEMICS: Subjects, Knowledge Bars, Study Methods, Mocks
function renderAcademicsSubtab(G, hs) {
  const subjects = hs.enrolledSubjects || [];
  const activeMethod = hs.activeStudyMethod || "practice_problems";

  return `
    <!-- Study Method Selector -->
    <h2 class="section-heading first">Study strategy</h2>
    <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px;">
      ${Object.values(STUDY_METHODS).map(m => `
        <button class="subtab-btn ${activeMethod === m.id ? 'active' : ''} btn-set-study-method" data-method="${m.id}" type="button" style="font-size: 12px; padding: 4px 10px;">
          ${m.name}
        </button>
      `).join("")}
    </div>
    <div style="font-size: 13px; color: var(--text-tertiary); margin-bottom: 24px;">
      ${STUDY_METHODS[activeMethod]?.desc || ''} · Efficiency ${STUDY_METHODS[activeMethod]?.knowledgeEff}x
    </div>

    <!-- Enrolled Subjects List -->
    <h2 class="section-heading">Coursework & term grades</h2>
    <div>
      ${subjects.map(s => `
        <div class="list-row">
          <div class="list-row-left">
            <div style="font-size: 15px;">${s.name}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              Mastery <span style="font-family: var(--font-mono);">${s.mastery}%</span> · Strictness ${s.teacherStrictness}%
            </div>
            <div style="height: 2px; background: rgba(22, 21, 15, 0.10); margin-top: 6px; width: 100%;">
              <div style="height: 2px; width: ${s.mastery}%; background: var(--ink);"></div>
            </div>
          </div>
          <div class="list-row-right">
            <span class="mono-val">${s.currentGrade}%</span>
            <div style="font-size: 12px; color: var(--text-tertiary);">${s.letterGrade}</div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Entrance Exam Preparation Modules -->
    <h2 class="section-heading">Exam preparation modules</h2>
    <div>
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">National entrance mock test</div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">Full-length timed simulation under exam hall conditions</div>
        </div>
        <div class="list-row-right">
          <button class="btn btn-outline btn-sm btn-run-mock" data-exam="national" type="button">Run mock</button>
        </div>
      </div>
    </div>
    ${hs.mockResults ? `
      <div class="surface-box" style="margin-top: 14px; padding: 14px;">
        <div style="font-size: 12px; color: var(--text-tertiary); text-transform: uppercase;">Latest mock diagnostic</div>
        <div class="mono-val" style="font-size: 14px; margin-top: 4px;">${hs.mockResults.formattedReport}</div>
      </div>
    ` : ''}
  `;
}

// 3. PEOPLE: Faculty Directory, LoRs & Classmate Cliques
function renderPeopleSubtab(G, hs) {
  const teachers = hs.teachers || [];
  const classmates = hs.classmates || [];

  return `
    <!-- Teachers Directory & LoRs -->
    <h2 class="section-heading first">Faculty & recommendations</h2>
    <div>
      ${teachers.map(t => `
        <div class="list-row">
          <div class="list-row-left">
            <div style="font-size: 15px;">${t.name} <span style="font-size: 13px; color: var(--text-tertiary);">· ${t.subjectName}</span></div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              Perception: ${t.impression?.primaryTag || 'Neutral'} · Strictness ${t.gradingStrictness}%
            </div>
          </div>
          <div class="list-row-right">
            ${t.lor?.submitted ? `
              <span class="mono-sm">Sealed LoR</span>
            ` : `
              <button class="btn btn-outline btn-sm btn-request-lor" data-tid="${t.id}" type="button">
                Request LoR
              </button>
            `}
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Classmates -->
    <h2 class="section-heading">Classmates & study partners</h2>
    <div>
      ${classmates.slice(0, 6).map(c => `
        <div class="list-row">
          <div class="list-row-left">
            <div style="font-size: 15px;">${c.name} <span style="font-size: 12px; color: var(--text-tertiary);">· ${c.archetype}</span></div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              Friendship <span style="font-family: var(--font-mono);">${c.friendship}%</span> · Smarts <span style="font-family: var(--font-mono);">${c.smarts}</span>
            </div>
          </div>
          <div class="list-row-right">
            <button class="btn btn-outline btn-sm btn-toggle-study-partner" data-pid="${c.id}" type="button">
              ${c.isStudyPartner ? 'Partner' : 'Study pact'}
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// 4. ACTIVITIES: Clubs & Tournaments
function renderActivitiesSubtab(G, hs) {
  const clubs = hs.clubs || [];

  return `
    <h2 class="section-heading first">Clubs & competitions</h2>
    <div>
      ${clubs.map(c => `
        <div class="list-row">
          <div class="list-row-left">
            <div style="font-size: 15px;">${c.name}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              Role: ${c.role} · Coach quality: ${c.coachQuality}%
            </div>
          </div>
          <div class="list-row-right">
            <button class="btn btn-outline btn-sm btn-club-match" data-cid="${c.id}" type="button">
              Compete
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// 5. CAREER: Part-time Jobs & Apprenticeships
function renderCareerSubtab(G, hs) {
  const jobs = STUDENT_JOBS_CATALOG.filter(j => (G.character?.age || 16) >= j.minAge && (G.character?.age || 16) <= j.maxAge);
  const activeJob = hs.activeJob;

  return `
    <h2 class="section-heading first">Student employment</h2>
    ${activeJob ? `
      <div class="surface-box" style="margin-bottom: 20px; padding: 18px;">
        <div style="font-size: 15px;">${activeJob.title}</div>
        <div style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">
          Wage: <span style="font-family: var(--font-mono);">$${activeJob.baseHourlyUSD}/hr</span> · Schedule: <span style="font-family: var(--font-mono);">${hs.timeAllocation.partTimeWork}h/wk</span>
        </div>
        <button class="btn btn-outline btn-sm btn-quit-job" type="button" style="margin-top: 12px; color: var(--text-tertiary);">
          Quit job
        </button>
      </div>
    ` : ''}

    <h2 class="section-heading">Available openings</h2>
    <div>
      ${jobs.map(j => `
        <div class="list-row">
          <div class="list-row-left">
            <div style="font-size: 15px;">${j.title}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              <span style="font-family: var(--font-mono);">$${j.baseHourlyUSD}/hr</span> · Max ${j.weeklyHoursMax}h/wk
            </div>
          </div>
          <div class="list-row-right">
            <button class="btn btn-outline btn-sm btn-apply-job" data-jid="${j.id}" type="button">
              Apply
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// 6. APPLICATIONS: College List, Essays & Admissions
function renderApplicationsSubtab(G, hs) {
  const essay = hs.activeEssay || { title: "Personal statement", draftStage: 1, polish: 45, authenticity: 85 };

  return `
    <!-- Essay Studio -->
    <h2 class="section-heading first">Admissions essay drafts</h2>
    <div class="surface-box" style="padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <div style="font-size: 15px;">${essay.title}</div>
        <div class="mono-sm">Draft ${essay.draftStage}/4</div>
      </div>
      <div class="detail-grid" style="padding-top: 12px; margin-top: 8px;">
        <div>
          <div class="detail-label">Polish</div>
          <div class="detail-val-mono">${essay.polish}%</div>
        </div>
        <div>
          <div class="detail-label">Authenticity</div>
          <div class="detail-val-mono">${essay.authenticity}%</div>
        </div>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 16px;">
        <button class="btn btn-outline btn-sm btn-revise-essay" data-reviewer="self" type="button">Self-edit (+8)</button>
        <button class="btn btn-outline btn-sm btn-revise-essay" data-reviewer="teacher" type="button">Teacher review (+14)</button>
        <button class="btn btn-outline btn-sm btn-revise-essay" data-reviewer="consultant" type="button">Consultant ($500)</button>
      </div>
    </div>

    <!-- College Admissions Simulation Launcher -->
    <h2 class="section-heading">Target admissions</h2>
    <div>
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">Harvard / Stanford / MIT</div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">Holistic committee review</div>
        </div>
        <div class="list-row-right">
          <button class="btn btn-outline btn-sm btn-submit-college-app" data-uni="stanford" type="button">Submit</button>
        </div>
      </div>
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">IIT Bombay / IIT Delhi</div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">JEE Advanced rank cutoff</div>
        </div>
        <div class="list-row-right">
          <button class="btn btn-outline btn-sm btn-submit-college-app" data-uni="iit_bombay" type="button">Counseling</button>
        </div>
      </div>
    </div>
  `;
}

// 7. FAMILY: Household Economy
function renderFamilySubtab(G, hs) {
  const fam = hs.familyEconomy || { disposableCashUSD: 5500, father: { generosity: 60, academicExpectations: 75 } };

  return `
    <h2 class="section-heading first">Household economy</h2>
    <div class="detail-grid">
      <div>
        <div class="detail-label">Disposable cash</div>
        <div class="detail-val-mono">$${(fam.disposableCashUSD || 5000).toLocaleString()}</div>
      </div>
      <div>
        <div class="detail-label">Parent expectations</div>
        <div class="detail-val-mono">${fam.father?.academicExpectations || 70}%</div>
      </div>
    </div>

    <h2 class="section-heading">Educational funding requests</h2>
    <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">National exam coaching</div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">$1,500 tuition</div>
        </div>
        <div class="list-row-right">
          <button class="btn btn-outline btn-sm btn-ask-parents-pay" data-item="sat_coaching" type="button">Request</button>
        </div>
      </div>
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">Coding laptop</div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">$1,200 hardware</div>
        </div>
        <div class="list-row-right">
          <button class="btn btn-outline btn-sm btn-ask-parents-pay" data-item="laptop_coding" type="button">Request</button>
        </div>
      </div>
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">University tuition</div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">$15,000 undergraduate fund</div>
        </div>
        <div class="list-row-right">
          <button class="btn btn-outline btn-sm btn-ask-parents-pay" data-item="college_tuition" type="button">Request</button>
        </div>
      </div>
    </div>
  `;
}

// 8. RECORDS: Transcripts & Awards
function renderRecordsSubtab(G, hs) {
  const awards = hs.awards || ["State Debate Championship Quarterfinalist", "High Honor Roll (Term 1)"];

  return `
    <h2 class="section-heading first">Verified honors & awards</h2>
    <div>
      ${awards.map(a => `
        <div class="list-row">
          <div class="list-row-left">
            <div style="font-size: 15px;">${a}</div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// Helper: Initialize High School State if not present
export function initHighSchoolState(G) {
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
      { id: "math", name: "Advanced Math & Calculus", mastery: 74, teacherStrictness: 65, currentGrade: 88, letterGrade: "B+" },
      { id: "physics", name: "Physics & Mechanics", mastery: 70, teacherStrictness: 60, currentGrade: 86, letterGrade: "B" },
      { id: "chemistry", name: "Chemistry", mastery: 68, teacherStrictness: 70, currentGrade: 82, letterGrade: "B-" },
      { id: "english", name: "English Literature & Composition", mastery: 82, teacherStrictness: 50, currentGrade: 94, letterGrade: "A" },
      { id: "cs", name: "Computer Science & Logic", mastery: 78, teacherStrictness: 45, currentGrade: 92, letterGrade: "A-" }
    ],
    teachers: [
      { id: "t_math", name: "Dr. Alistair Vance", subjectName: "Calculus", gradingStrictness: 75, impression: { primaryTag: "curious", intellectScore: 78, workEthicScore: 72, reliabilityScore: 80 }, lor: { submitted: false } },
      { id: "t_chem", name: "Mrs. Davenport", subjectName: "Chemistry", gradingStrictness: 68, impression: { primaryTag: "hardworking", intellectScore: 65, workEthicScore: 84, reliabilityScore: 85 }, lor: { submitted: false } },
      { id: "t_eng", name: "Mr. Harrison", subjectName: "English Lit", gradingStrictness: 55, impression: { primaryTag: "brilliant", intellectScore: 88, workEthicScore: 80, reliabilityScore: 90 }, lor: { submitted: false } }
    ],
    classmates: [
      { id: "p1", name: "Neha Patel", archetype: "Grindset Gunner", smarts: 88, friendship: 45, isStudyPartner: true },
      { id: "p2", name: "Julian Sterling", archetype: "Varsity Athlete", smarts: 58, friendship: 60, isStudyPartner: false },
      { id: "p3", name: "Chloe Chen", archetype: "Artsy Rebel", smarts: 72, friendship: 50, isStudyPartner: false }
    ],
    clubs: [
      { id: "debate_society", name: "Varsity Debate Society", role: "Lead Rebuttalist", coachQuality: 80, weeklyHours: 6 },
      { id: "robotics_vex", name: "VEX Robotics Squad", role: "CAD Modeler", coachQuality: 82, weeklyHours: 6 }
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

// Attach Event Listeners to School Cockpit UI
export function attachSchoolCockpitListeners(G, renderCallback) {
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
      if (G.highSchool?.timeAllocation) {
        G.highSchool.timeAllocation[key] = val;
        renderCallback();
      }
    });
  });

  // 3. Study Method Setter
  document.querySelectorAll(".btn-set-study-method").forEach(btn => {
    btn.addEventListener("click", () => {
      if (G.highSchool) {
        G.highSchool.activeStudyMethod = btn.dataset.method;
        showToast(`Study strategy set to ${STUDY_METHODS[btn.dataset.method]?.name}`, "info");
        renderCallback();
      }
    });
  });

  // 4. Mock Exam Run
  document.querySelectorAll(".btn-run-mock").forEach(btn => {
    btn.addEventListener("click", () => {
      const examKey = btn.dataset.exam;
      const mockResult = EducationExamEngine.runMockExam(G, examKey, 1);
      G.highSchool.mockResults = mockResult;
      showToast(`Completed ${mockResult.formattedReport}`, "celebrate");
      renderCallback();
    });
  });

  // 5. Request LoR
  document.querySelectorAll(".btn-request-lor").forEach(btn => {
    btn.addEventListener("click", () => {
      const tid = btn.dataset.tid;
      const teacher = G.highSchool?.teachers?.find(t => t.id === tid);
      if (teacher) {
        const lor = generateRecommendationLetter(teacher, G.character?.firstName || "Student");
        teacher.lor = lor;
        openModal("Recommendation letter", `
          <p style="font-size: 14px; font-style: italic; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.5;">
            ${lor.verbalResponse}
          </p>
          <div class="surface-box" style="padding: 12px; font-size: 13px; color: var(--text-secondary);">
            Confidential recommendation filed directly to admissions portal under FERPA waiver.
          </div>
        `);
        renderCallback();
      }
    });
  });

  // 6. Club Tournament Match
  document.querySelectorAll(".btn-club-match").forEach(btn => {
    btn.addEventListener("click", () => {
      const cid = btn.dataset.cid;
      const club = G.highSchool?.clubs?.find(c => c.id === cid);
      if (club) {
        const result = resolveClubTournamentMatch(club, G.stats, "state");
        openModal(`${club.name} match`, `
          <div style="text-align: center; padding: 12px 0;">
            <div style="font-size: 18px; font-weight: 500; margin-bottom: 6px;">
              ${result.victory ? 'Match won' : 'Match conceded'}
            </div>
            <p style="font-size: 13px; color: var(--text-secondary);">
              Score: <span style="font-family: var(--font-mono);">${result.playerScore} pts</span> vs ${result.opponentName} <span style="font-family: var(--font-mono);">${result.opponentScore} pts</span>
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
        showToast("Requires $500 cash for consultant", "error");
        return;
      }
      if (reviewer === "consultant") G.fin.cash -= 500;

      G.highSchool.activeEssay = iterateEssayDraft(G.highSchool.activeEssay, 4, reviewer);
      showToast(`Essay draft ${G.highSchool.activeEssay.draftStage}/4 revised`, "success");
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
      const outcome = evaluateParentalExpenseNegotiation(G.highSchool.familyEconomy, exp, "invest_in_future", G.highSchool.currentTermGPA);

      openModal(`Parental response: ${exp.name}`, `
        <p style="font-size: 14px; font-style: italic; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.5;">
          ${outcome.quote}
        </p>
        <div class="surface-box" style="padding: 12px; font-size: 13px;">
          Outcome: <strong style="text-transform: capitalize;">${outcome.verdict}</strong> · Contribution <span style="font-family: var(--font-mono);">${outcome.parentContributionPct}%</span>
        </div>
      `);
      renderCallback();
    });
  });
}
