// View: Regional Schooling, Entrance Exams, College Admissions Abroad & Domestic, Corporate Ladders, and Special Careers

import { COUNTRIES } from "../data/countries.js";
import { EXAMS, GLOBAL_UNIVERSITIES, STUDY_ACTIONS } from "../data/education.js";
import { CAREER_TRACKS, WORK_ACTIONS } from "../data/careers.js";
import { SPECIAL_CAREERS } from "../data/special_careers.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";
import { calculateNetWorth } from "../state.js";

let eduSubtab = "education"; // "education", "corporate", "special"

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
  const currentBoard = birthCountry.schoolBoards ? birthCountry.schoolBoards.find(b => b.id === state.education.schoolBoard) : null;
  const boardName = currentBoard ? currentBoard.name : "High school curriculum";

  const cohortsMap = {
    jee: "1.45M",
    neet: "2.4M",
    sat: "1.9M",
    cat: "330K",
    ielts: "3.5M",
    upsc: "1.1M"
  };

  const availableExams = [
    ...(birthCountry.entranceExams || []),
    EXAMS.sat,
    EXAMS.ielts,
    EXAMS.cat
  ];

  const examsHtml = availableExams.map(ex => {
    const score = state.education.examScores[ex.id];
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
            <span class="mono-val">${score}</span>
          ` : `
            <button class="btn btn-outline btn-sm btn-take-exam" data-exam="${ex.id}" type="button">
              Take exam ($${ex.costUSD || 50})
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");

  const universitiesHtml = GLOBAL_UNIVERSITIES.map(uni => {
    const isEnrolled = state.education.currentUniversity && state.education.currentUniversity.id === uni.id;
    const isAbroad = uni.country !== birthCountry.id;

    return `
      <div class="list-row">
        <div class="list-row-left">
          <div style="font-size: 15px;">
            ${uni.name} ${isAbroad ? '<span style="font-size: 12px; color: var(--text-tertiary); margin-left: 4px;">· Abroad</span>' : ''}
          </div>
          <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
            ${uni.city} · Tuition <span style="font-family: var(--font-mono);">$${uni.tuitionPerYearUSD.toLocaleString()}</span>/yr · Prestige ${uni.prestige}/100
          </div>
        </div>
        <div class="list-row-right">
          ${isEnrolled ? `
            <span class="mono-val">Enrolled (Yr ${state.education.currentUniversity.year}/${uni.totalYears || 4})</span>
          ` : `
            <button class="btn btn-outline btn-sm btn-apply-uni" data-uni="${uni.id}" type="button">
              Apply
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");

  return `
    <!-- Academic Status -->
    <h2 class="section-heading first">Academic status</h2>
    <div class="detail-grid">
      <div>
        <div class="detail-label">Curriculum / Institution</div>
        <div class="detail-val">${state.education.currentUniversity ? state.education.currentUniversity.name : boardName}</div>
      </div>
      <div>
        <div class="detail-label">Stage</div>
        <div class="detail-val">${state.education.currentUniversity ? `Year ${state.education.currentUniversity.year} of ${state.education.currentUniversity.totalYears || 4}` : state.education.stage}</div>
      </div>
      <div>
        <div class="detail-label">GPA</div>
        <div class="detail-val-mono">${(state.education.gpa || 3.8).toFixed(2)}<span style="color: var(--text-tertiary);">/4.0</span></div>
      </div>
      <div>
        <div class="detail-label">Annual tuition</div>
        <div class="detail-val-mono">${state.education.currentUniversity ? `$${state.education.currentUniversity.tuitionUSD.toLocaleString()}` : '$0'}</div>
      </div>
    </div>
    <div style="display: flex; gap: 8px; margin-top: 14px;">
      <button class="btn btn-outline btn-sm" id="btnStudyRigorous" type="button">Study (+smarts)</button>
      <button class="btn btn-outline btn-sm" id="btnPrivateCoaching" type="button">Coaching ($1,500)</button>
    </div>

    <!-- Entrance Exams -->
    <h2 class="section-heading">Examinations</h2>
    <div>
      ${examsHtml}
    </div>

    <!-- Global Admissions -->
    <h2 class="section-heading">Global admissions</h2>
    <div>
      ${universitiesHtml}
    </div>

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
              <button class="btn btn-outline btn-sm btn-apply-job" data-track="${track.id}" type="button">
                Apply
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

  // Study Hard
  const btnStudyRigorous = document.getElementById("btnStudyRigorous");
  if (btnStudyRigorous) {
    btnStudyRigorous.addEventListener("click", () => {
      state.stats.smarts = Math.min(100, state.stats.smarts + 4);
      state.education.gpa = Math.min(4.0, state.education.gpa + 0.05);
      showToast("Completed intensive coursework (+4 smarts, GPA up)", "success");
      rerenderCallback();
    });
  }

  // Elite Coaching
  const btnPrivateCoaching = document.getElementById("btnPrivateCoaching");
  if (btnPrivateCoaching) {
    btnPrivateCoaching.addEventListener("click", () => {
      if (state.finances.cashUSD < 1500) {
        showToast("Insufficient cash for coaching ($1,500)", "error");
        return;
      }
      state.finances.cashUSD -= 1500;
      state.stats.smarts = Math.min(100, state.stats.smarts + 8);
      state.education.gpa = Math.min(4.0, state.education.gpa + 0.12);
      calculateNetWorth(state);
      showToast("Completed entrance exam coaching (+8 smarts)", "success");
      rerenderCallback();
    });
  }

  // Take Exam
  document.querySelectorAll(".btn-take-exam").forEach(btn => {
    btn.addEventListener("click", () => {
      const examId = btn.dataset.exam;
      const ex = EXAMS[examId] || (COUNTRIES[state.character.birthCountry]?.entranceExams?.find(e => e.id === examId));
      if (!ex) return;

      const fee = ex.costUSD || 50;
      if (state.finances.cashUSD < fee) {
        showToast(`Exam fee is $${fee}. Insufficient funds`, "error");
        return;
      }

      state.finances.cashUSD -= fee;

      let scoreText = "";
      if (examId === "sat") {
        const satScore = Math.min(1600, Math.round(900 + (state.stats.smarts / 100) * 700 + (Math.random() * 80 - 40)));
        state.education.examScores.sat = satScore;
        scoreText = `SAT: ${satScore} / 1600`;
      } else if (examId === "jee") {
        const jeePercentile = Math.min(99.98, Math.round((70 + (state.stats.smarts / 100) * 29.8) * 100) / 100);
        state.education.examScores.jee = jeePercentile;
        scoreText = `JEE: ${jeePercentile}%ile`;
      } else if (examId === "neet") {
        const neetScore = Math.min(720, Math.round(400 + (state.stats.smarts / 100) * 315));
        state.education.examScores.neet = neetScore;
        scoreText = `NEET: ${neetScore} / 720`;
      } else if (examId === "ielts") {
        const band = Math.min(9.0, Math.round((5.5 + (state.stats.smarts / 100) * 3.5) * 2) / 2);
        state.education.examScores.ielts = band;
        scoreText = `IELTS: ${band} / 9.0`;
      } else if (examId === "cat") {
        const catPct = Math.min(99.9, Math.round((60 + (state.stats.smarts / 100) * 39.8) * 10) / 10);
        state.education.examScores.cat = catPct;
        scoreText = `CAT: ${catPct}%ile`;
      } else {
        state.education.examScores[examId] = 95;
        scoreText = `Exam completed`;
      }

      calculateNetWorth(state);
      showToast(`Exam completed: ${scoreText}`, "celebrate");
      rerenderCallback();
    });
  });

  // Apply to University
  document.querySelectorAll(".btn-apply-uni").forEach(btn => {
    btn.addEventListener("click", () => {
      const uniId = btn.dataset.uni;
      const uni = GLOBAL_UNIVERSITIES.find(u => u.id === uniId);
      if (!uni) return;

      const majorsOptions = uni.majors.map(m => `<option value="${m}">${m}</option>`).join("");

      openModal(`Apply to ${uni.name}`, `
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
          ${uni.city}, ${uni.country.toUpperCase()} · Acceptance rate: ${(uni.acceptanceRate * 100).toFixed(1)}%
        </p>
        <div class="input-group">
          <label class="input-label">Degree major</label>
          <select id="selectUniMajor" class="input-field">
            ${majorsOptions}
          </select>
        </div>
        <div style="font-size: 13px; margin-bottom: 14px; border: 1px solid var(--hairline-strong); padding: 10px; border-radius: 4px; background: var(--surface);">
          <div>Annual tuition: <strong style="font-family: var(--font-mono);">$${uni.tuitionPerYearUSD.toLocaleString()}</strong></div>
          <div>Minimum smarts: <strong style="font-family: var(--font-mono);">${uni.minSmarts}</strong> (Current: ${state.stats.smarts})</div>
          ${uni.minSAT ? `<div>Minimum SAT: <strong style="font-family: var(--font-mono);">${uni.minSAT}</strong> (Current: ${state.education.examScores.sat || 'Not taken'})</div>` : ''}
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmUniApply" type="button">Submit application</button>
      `);

      document.getElementById("btnConfirmUniApply")?.addEventListener("click", () => {
        const major = document.getElementById("selectUniMajor").value;

        let score = (state.stats.smarts - uni.minSmarts) * 3;
        if (state.education.gpa >= uni.minGPA) score += 20;
        if (uni.minSAT && state.education.examScores.sat >= uni.minSAT) score += 30;

        const accepted = score >= 0 || (Math.random() < uni.acceptanceRate);

        closeModal();

        if (accepted) {
          state.education.currentUniversity = {
            id: uni.id,
            name: uni.name,
            major: major,
            tier: uni.tier,
            prestige: uni.prestige,
            tuitionUSD: uni.tuitionPerYearUSD,
            year: 1,
            totalYears: 4
          };
          state.stats.happiness = Math.min(100, state.stats.happiness + 25);
          state.stats.prestige = Math.min(100, state.stats.prestige + 10);
          showToast(`Admitted to ${uni.name} for ${major}`, "celebrate");
        } else {
          state.stats.happiness = Math.max(10, state.stats.happiness - 10);
          showToast(`Application not accepted by ${uni.name}`, "error");
        }
        rerenderCallback();
      });
    });
  });

  // Apply to Corporate Job
  document.querySelectorAll(".btn-apply-job").forEach(btn => {
    btn.addEventListener("click", () => {
      const trackId = btn.dataset.track;
      const track = CAREER_TRACKS.find(t => t.id === trackId);
      if (!track) return;

      const entry = track.ladder[0];
      const hasReqDegree = track.requiredDegrees.length === 0 || state.education.degrees.some(d => track.requiredDegrees.includes(d.major));

      if (!hasReqDegree && track.id !== "civil_service" && state.education.stage !== "University Graduate") {
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
