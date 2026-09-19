// ============================================================================
// File: js/ui/views_school_cockpit.js
// Description: Sleek 9:16 Mobile Cockpit with 8 Folding Subtabs for School & Education
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

  return `
    <div class="school-cockpit">
      <!-- Cockpit Header Banner -->
      <div class="card" style="margin-bottom: 10px; background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border: 1px solid #4338ca;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #a5b4fc; font-weight: 700;">
              🎓 ${G.character?.birthCountry === "india" ? "Delhi Public School (CBSE)" : "Oakridge High School (AP / Honors)"}
            </div>
            <h3 style="margin: 2px 0 0 0; font-size: 15px; font-weight: 800; color: #ffffff;">
              Grade ${Math.max(9, age - 5)} • Term GPA: <span style="color: #38bdf8;">${(hs.currentTermGPA || 3.85).toFixed(2)}</span>
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

// 1. OVERVIEW: 168-Hour Time Allocator & Live Stress Gauges
function renderOverviewSubtab(G, hs) {
  const alloc = hs.timeAllocation;
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
      <p style="font-size: 11px; color: #94a3b8; margin-bottom: 12px;">
        Every hour spent on JEE/SAT coaching, part-time jobs, or varsity sports must be carved out of sleep, leisure, or socializing.
      </p>

      ${renderSliderRow("sleep", "😴 Sleep (Rec: 56h)", alloc.sleep, 28, 70, hs)}
      ${renderSliderRow("selfStudy", "📖 Self Study", alloc.selfStudy, 0, 35, hs)}
      ${renderSliderRow("examCoaching", "🎯 Coaching / Mocks", alloc.examCoaching, 0, 25, hs)}
      ${renderSliderRow("activitiesClubs", "🎭 Clubs & Sports", alloc.activitiesClubs, 0, 25, hs)}
      ${renderSliderRow("partTimeWork", "💼 Student Job", alloc.partTimeWork, 0, 25, hs)}
      ${renderSliderRow("friendsSocial", "🎉 Friends & Dating", alloc.friendsSocial, 0, 25, hs)}
      ${renderSliderRow("leisureGaming", "🎮 Gaming / Rest", alloc.leisureGaming, 0, 35, hs)}

      ${isBurnout ? `
        <div style="margin-top: 10px; padding: 8px 12px; background: rgba(244,63,94,0.15); border: 1px solid #f43f5e; border-radius: 8px; font-size: 11px; color: #fecdd3;">
          ⚠️ <strong>Chronic Sleep Deprivation!</strong> Working memory will degrade by -35%, test performance will choke, and weekly illness risk surges to 45%.
        </div>
      ` : ''}
    </div>

    <!-- Physiological Status Matrix -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🧠</span> Mental Condition & Vigor</div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 6px;">
        <div style="background: #1e293b; padding: 8px; border-radius: 6px; font-size: 11px;">
          <span style="color: #94a3b8;">Sleep Debt:</span> <strong style="color: ${alloc.sleep < 49 ? '#f43f5e' : '#34d399'};">${Math.max(0, 56 - alloc.sleep)}h / wk</strong>
        </div>
        <div style="background: #1e293b; padding: 8px; border-radius: 6px; font-size: 11px;">
          <span style="color: #94a3b8;">Study Focus:</span> <strong>${G.cognition?.traits?.focus || 70}%</strong>
        </div>
        <div style="background: #1e293b; padding: 8px; border-radius: 6px; font-size: 11px;">
          <span style="color: #94a3b8;">Exam Temperament:</span> <strong>${G.cognition?.traits?.examTemperament || 65}%</strong>
        </div>
        <div style="background: #1e293b; padding: 8px; border-radius: 6px; font-size: 11px;">
          <span style="color: #94a3b8;">Burnout Risk:</span> <strong style="color: ${isBurnout ? '#f43f5e' : '#38bdf8'};">${isBurnout ? 'CRITICAL' : 'Minimal'}</strong>
        </div>
      </div>
    </div>
  `;
}

function renderSliderRow(key, label, val, min, max, hs) {
  return `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
      <span style="font-size: 11px; color: #cbd5e1; width: 130px;">${label}</span>
      <input type="range" class="slider-alloc" data-key="${key}" min="${min}" max="${max}" value="${val}" style="flex: 1; accent-color: #6366f1; cursor: pointer;" />
      <span style="font-size: 11px; font-weight: 700; color: #ffffff; width: 35px; text-align: right;">${val}h</span>
    </div>
  `;
}

// 2. ACADEMICS: Subjects, Knowledge Bars, Study Methods, Mocks
function renderAcademicsSubtab(G, hs) {
  const subjects = hs.enrolledSubjects || [];
  const activeMethod = hs.activeStudyMethod || "practice_problems";

  return `
    <!-- Study Method Selector -->
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
      <div style="font-size: 10px; color: #94a3b8; margin-top: 6px;">
        ${STUDY_METHODS[activeMethod]?.desc || ''} (Eff: ${STUDY_METHODS[activeMethod]?.knowledgeEff}x)
      </div>
    </div>

    <!-- Enrolled Subjects List -->
    <div class="card" style="margin-bottom: 12px;">
      <div class="card-title-row">
        <div class="card-title"><span>📚</span> Coursework & Term Grades</div>
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
      <p style="font-size: 11px; color: #94a3b8;">
        Simulate high-stakes exams against 1.5M+ candidates to discover your true percentile band and weak subtopics.
      </p>
      <div style="display: flex; gap: 8px; margin-top: 8px;">
        <button class="btn btn-sm btn-primary btn-run-mock" data-exam="${G.character?.birthCountry === 'india' ? 'jee_main' : 'sat'}">
          Take ${G.character?.birthCountry === 'india' ? 'JEE Main' : 'SAT'} Mock
        </button>
      </div>
      ${hs.mockResults ? `
        <div style="margin-top: 10px; padding: 8px; background: #1e293b; border-radius: 6px; font-size: 11px;">
          ${hs.mockResults.formattedReport}
        </div>
      ` : ''}
    </div>
  `;
}

// 3. PEOPLE: Faculty Directory, LoRs & Classmate Cliques
function renderPeopleSubtab(G, hs) {
  const teachers = hs.teachers || [];
  const classmates = hs.classmates || [];

  return `
    <!-- Teachers Directory & LoRs -->
    <div class="card" style="margin-bottom: 12px;">
      <div class="card-title-row">
        <div class="card-title"><span>👨‍🏫</span> Faculty & Recommendation Letters</div>
      </div>
      ${teachers.map(t => `
        <div class="list-row" style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <div class="list-row-left">
            <div class="list-row-text">
              <h4>${t.name} <span style="font-size: 10px; color: #94a3b8;">(${t.subjectName})</span></h4>
              <p>Perception: <strong style="color: #a855f7;">${t.impression?.primaryTag?.toUpperCase()}</strong> • Strictness: ${t.gradingStrictness}%</p>
            </div>
          </div>
          <div class="list-row-right">
            ${t.lor?.submitted ? `
              <span class="pill-badge emerald" title="Confidential LoR filed under FERPA waiver">🔒 Sealed LoR</span>
            ` : `
              <button class="btn btn-sm btn-outline btn-request-lor" data-tid="${t.id}" style="font-size: 10px; padding: 4px 6px;">
                Request LoR
              </button>
            `}
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Classmate Cohort & Cliques -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>👥</span> Classmates & Study Partners</div>
      </div>
      ${classmates.slice(0, 6).map(c => `
        <div class="list-row" style="padding: 6px 0;">
          <div class="list-row-left">
            <div class="list-row-text">
              <h4>${c.name} <span class="pill-badge gray" style="font-size: 9px;">${c.archetype}</span></h4>
              <p>Friendship: ${c.friendship}% • Smarts: ${c.smarts}</p>
            </div>
          </div>
          <div class="list-row-right">
            <button class="btn btn-sm ${c.isStudyPartner ? 'btn-success' : 'btn-outline'} btn-toggle-study-partner" data-pid="${c.id}" style="font-size: 9px; padding: 3px 6px;">
              ${c.isStudyPartner ? 'Partner ✓' : 'Study Pact'}
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// 4. ACTIVITIES: 7 Clubs & Tournament Brackets
function renderActivitiesSubtab(G, hs) {
  const clubs = hs.clubs || [];

  return `
    <div class="card" style="margin-bottom: 12px;">
      <div class="card-title-row">
        <div class="card-title"><span>🏆</span> Extracurricular Clubs & Tournaments</div>
      </div>
      <p style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">
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

// 5. CAREER: Part-time Jobs & Apprenticeships
function renderCareerSubtab(G, hs) {
  const jobs = STUDENT_JOBS_CATALOG.filter(j => G.character?.age >= j.minAge && G.character?.age <= j.maxAge);
  const activeJob = hs.activeJob;

  return `
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>💼</span> Student Employment & Internships</div>
        ${activeJob ? `<span class="pill-badge emerald">Employed</span>` : ''}
      </div>
      ${activeJob ? `
        <div style="background: #1e293b; padding: 10px; border-radius: 8px; margin-bottom: 12px;">
          <h4 style="margin: 0 0 4px 0; font-size: 13px; color: #38bdf8;">${activeJob.title}</h4>
          <p style="font-size: 11px; color: #94a3b8; margin: 0;">
            Wage: $${activeJob.baseHourlyUSD}/hr • Scheduled: ${hs.timeAllocation.partTimeWork}h/week
          </p>
          <button class="btn btn-sm btn-outline btn-quit-job" style="margin-top: 8px; color: #f43f5e; border-color: #f43f5e;">
            Quit Job
          </button>
        </div>
      ` : ''}

      <div style="font-size: 11px; font-weight: 700; color: #cbd5e1; margin-bottom: 6px;">Available Openings</div>
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

// 6. APPLICATIONS: College List, Essays & Admissions
function renderApplicationsSubtab(G, hs) {
  const essay = hs.activeEssay || { title: "Common App Personal Statement", draftStage: 1, polish: 45, authenticity: 85 };

  return `
    <!-- Multi-Draft Essay Studio -->
    <div class="card" style="margin-bottom: 12px;">
      <div class="card-title-row">
        <div class="card-title"><span>✍️</span> Multi-Draft Essay Studio</div>
        <span class="pill-badge purple">Draft ${essay.draftStage}/4</span>
      </div>
      <p style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">
        Balance technical polish with raw authenticity. Beware: private consultants over-polish essays and destroy authenticity!
      </p>
      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px;">
        <span>Polish: <strong style="color: #38bdf8;">${essay.polish}%</strong></span>
        <span>Authenticity: <strong style="color: #34d399;">${essay.authenticity}%</strong></span>
      </div>
      <div style="display: flex; gap: 6px;">
        <button class="btn btn-sm btn-outline btn-revise-essay" data-reviewer="self">Self-Edit (+8 Polish)</button>
        <button class="btn btn-sm btn-primary btn-revise-essay" data-reviewer="teacher">Ask Teacher (+14 Polish)</button>
        <button class="btn btn-sm btn-outline btn-revise-essay" data-reviewer="consultant" style="color: #fbbf24;">Consultant ($500)</button>
      </div>
    </div>

    <!-- College Admissions Simulation Launcher -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🏛️</span> Target University Applications</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div class="list-row">
          <div class="list-row-left">
            <div class="list-row-text">
              <h4>Harvard / Stanford / MIT</h4>
              <p>Dual-Reader Committee Holistic Review</p>
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
              <p>Mandatory JEE Advanced Rank Cutoff</p>
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

// 7. FAMILY: Household Economy & "Who Pays?" Negotiations
function renderFamilySubtab(G, hs) {
  const fam = hs.familyEconomy || { disposableCashUSD: 5500, father: { generosity: 60, academicExpectations: 75 } };

  return `
    <div class="card" style="margin-bottom: 12px;">
      <div class="card-title-row">
        <div class="card-title"><span>👨‍👩‍👦</span> Household Finances & Generosity</div>
      </div>
      <div style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">
        As a minor, major expenses default to parents. They evaluate affordability, generosity, and academic performance.
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
        <div style="background: #1e293b; padding: 8px; border-radius: 6px; font-size: 11px;">
          <span style="color: #94a3b8;">Disposable Cash:</span> <strong>$${(fam.disposableCashUSD || 5000).toLocaleString()}</strong>
        </div>
        <div style="background: #1e293b; padding: 8px; border-radius: 6px; font-size: 11px;">
          <span style="color: #94a3b8;">Academic Expectation:</span> <strong>${fam.father?.academicExpectations || 70}%</strong>
        </div>
      </div>

      <div style="font-size: 11px; font-weight: 700; color: #cbd5e1; margin-bottom: 6px;">Request Educational Funding</div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <button class="btn btn-sm btn-outline btn-ask-parents-pay" data-item="sat_coaching">
          Ask to Fund National Coaching ($1,500)
        </button>
        <button class="btn btn-sm btn-outline btn-ask-parents-pay" data-item="laptop_coding">
          Ask to Buy Coding Laptop ($1,200)
        </button>
        <button class="btn btn-sm btn-outline btn-ask-parents-pay" data-item="college_tuition">
          Ask to Fund College Tuition ($15,000)
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
          <div style="font-size: 11px; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #cbd5e1;">
            🎖️ ${a}
          </div>
        `).join("")}
      </div>
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
      { id: "math", name: "AP Calculus / Advanced Math", mastery: 74, teacherStrictness: 65, currentGrade: 88, letterGrade: "B+", icon: "📐" },
      { id: "physics", name: "Physics & Mechanics", mastery: 70, teacherStrictness: 60, currentGrade: 86, letterGrade: "B", icon: "⚛️" },
      { id: "chemistry", name: "Chemistry", mastery: 68, teacherStrictness: 70, currentGrade: 82, letterGrade: "B-", icon: "🧪" },
      { id: "english", name: "English Literature & Composition", mastery: 82, teacherStrictness: 50, currentGrade: 94, letterGrade: "A", icon: "📖" },
      { id: "cs", name: "Computer Science & Logic", mastery: 78, teacherStrictness: 45, currentGrade: 92, letterGrade: "A-", icon: "💻" }
    ],
    teachers: [
      { id: "t_math", name: "Dr. Alistair Vance", subjectName: "AP Calculus", gradingStrictness: 75, impression: { primaryTag: "curious", intellectScore: 78, workEthicScore: 72, reliabilityScore: 80 }, lor: { submitted: false } },
      { id: "t_chem", name: "Mrs. Davenport", subjectName: "Chemistry", gradingStrictness: 68, impression: { primaryTag: "hardworking", intellectScore: 65, workEthicScore: 84, reliabilityScore: 85 }, lor: { submitted: false } },
      { id: "t_eng", name: "Mr. Harrison", subjectName: "English Lit", gradingStrictness: 55, impression: { primaryTag: "brilliant", intellectScore: 88, workEthicScore: 80, reliabilityScore: 90 }, lor: { submitted: false } }
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
        showToast(`Switched study strategy to ${STUDY_METHODS[btn.dataset.method]?.name}!`, "info");
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
      showToast(`Completed ${mockResult.formattedReport}!`, "celebrate");
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
        openModal("Recommendation Request Outcome", `
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

  // 6. Club Tournament Match
  document.querySelectorAll(".btn-club-match").forEach(btn => {
    btn.addEventListener("click", () => {
      const cid = btn.dataset.cid;
      const club = G.highSchool?.clubs?.find(c => c.id === cid);
      if (club) {
        const result = resolveClubTournamentMatch(club, G.stats, "state");
        openModal(`${club.name} Match Result`, `
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
        showToast("Requires $500 cash to hire private consultant!", "error");
        return;
      }
      if (reviewer === "consultant") G.fin.cash -= 500;

      G.highSchool.activeEssay = iterateEssayDraft(G.highSchool.activeEssay, 4, reviewer);
      showToast(`Revised essay draft (Draft ${G.highSchool.activeEssay.draftStage}/4)!`, "success");
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

      openModal(`Parental Response: ${exp.name}`, `
        <p style="font-size: 13px; font-style: italic; color: #cbd5e1; margin-bottom: 12px;">
          ${outcome.quote}
        </p>
        <div style="padding: 8px; background: rgba(56, 189, 248, 0.15); border-radius: 8px; font-size: 11px; color: #bae6fd;">
          Outcome: <strong>${outcome.verdict.toUpperCase()}</strong> (Parents pay ${outcome.parentContributionPct}%)
        </div>
      `);
      renderCallback();
    });
  });
}
