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
      <button class="subtab-btn ${eduSubtab === 'education' ? 'active' : ''}" data-sub="education">🎓 Schooling & Colleges</button>
      <button class="subtab-btn ${eduSubtab === 'corporate' ? 'active' : ''}" data-sub="corporate">💼 Corporate Careers</button>
      <button class="subtab-btn ${eduSubtab === 'special' ? 'active' : ''}" data-sub="special">✨ Special Careers</button>
    </div>

    ${eduSubtab === 'education' ? renderEducationSubtab(state, country, birthCountry) : ''}
    ${eduSubtab === 'corporate' ? renderCorporateSubtab(state) : ''}
    ${eduSubtab === 'special' ? renderSpecialCareersSubtab(state) : ''}
  `;
}

// 1. Education Subtab
function renderEducationSubtab(state, country, birthCountry) {
  const currentBoard = birthCountry.schoolBoards ? birthCountry.schoolBoards.find(b => b.id === state.education.schoolBoard) : null;
  const boardName = currentBoard ? currentBoard.name : "High School Curriculum";

  // Check domestic vs abroad exams
  const availableExams = [
    ...(birthCountry.entranceExams || []),
    EXAMS.sat,
    EXAMS.ielts,
    EXAMS.cat
  ];

  const examsHtml = availableExams.map(ex => {
    const score = state.education.examScores[ex.id];
    return `
      <div class="list-row">
        <div class="list-row-left">
          <div class="list-icon-box">📝</div>
          <div class="list-row-text">
            <h4>${ex.name}</h4>
            <p>${ex.description}</p>
          </div>
        </div>
        <div class="list-row-right">
          ${score !== undefined ? `
            <span class="pill-badge emerald">Score: ${score}</span>
          ` : `
            <button class="btn btn-sm btn-primary btn-take-exam" data-exam="${ex.id}">
              Take Exam ($${ex.costUSD || 50})
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");

  // Universities list
  const universitiesHtml = GLOBAL_UNIVERSITIES.map(uni => {
    const isEnrolled = state.education.currentUniversity && state.education.currentUniversity.id === uni.id;
    const isAbroad = uni.country !== birthCountry.id;

    return `
      <div class="list-row">
        <div class="list-row-left">
          <div class="list-icon-box">${isAbroad ? '✈️' : '🏛️'}</div>
          <div class="list-row-text">
            <h4>${uni.name} ${isAbroad ? '<span class="pill-badge purple" style="font-size: 9px;">Study Abroad</span>' : '<span class="pill-badge blue" style="font-size: 9px;">Domestic</span>'}</h4>
            <p>${uni.city} • Prestige: ${uni.prestige}/100 • $${uni.tuitionPerYearUSD.toLocaleString()}/yr</p>
          </div>
        </div>
        <div class="list-row-right">
          ${isEnrolled ? `
            <span class="pill-badge emerald">Enrolled (Yr ${state.education.currentUniversity.year}/${uni.totalYears || 4})</span>
          ` : `
            <button class="btn btn-sm btn-apply-uni" data-uni="${uni.id}">
              Apply
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");

  return `
    <!-- Current Academic Status -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title">
          <span>📖</span> Academic Progress
        </div>
        <span class="pill-badge emerald">${state.education.currentUniversity ? `University (Year ${state.education.currentUniversity.year})` : state.education.stage}</span>
      </div>

      <div style="font-size: 13px; margin-bottom: 12px; line-height: 1.5;">
        ${state.education.currentUniversity ? `
          <div><strong>Institution:</strong> ${state.education.currentUniversity.name}</div>
          <div><strong>Major:</strong> ${state.education.currentUniversity.major}</div>
          <div><strong>Annual Tuition:</strong> $${state.education.currentUniversity.tuitionUSD.toLocaleString()}</div>
        ` : `
          <div><strong>Current System:</strong> ${boardName}</div>
          <div><strong>Academic Rigor:</strong> ${currentBoard ? currentBoard.rigor : 'High'} (GPA: ${state.education.gpa.toFixed(2)}/4.0)</div>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">${currentBoard ? currentBoard.desc : ''}</div>
        `}
      </div>

      <!-- Study Actions -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <button class="btn btn-sm" id="btnStudyRigorous">
          <span>📖</span> Study Hard (+Smarts)
        </button>
        <button class="btn btn-sm" id="btnPrivateCoaching">
          <span>👨‍🏫</span> Elite Coaching ($1.5k)
        </button>
      </div>
    </div>

    <!-- Entrance Exams -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title">
          <span>✍️</span> Competitive Entrance Exams
        </div>
      </div>
      <div>
        ${examsHtml}
      </div>
    </div>

    <!-- World Universities & Study Abroad -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title">
          <span>🌍</span> University Admissions (Domestic & Abroad)
        </div>
      </div>
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
        Apply to world-class institutions like Harvard, Stanford, Oxford, and IIT Bombay. Acceptance requires high Smarts, GPA, and entrance exam scores.
      </p>
      <div>
        ${universitiesHtml}
      </div>
    </div>

    <!-- Completed Degrees -->
    ${state.education.degrees.length > 0 ? `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>📜</span> Completed Degrees</div>
        </div>
        ${state.education.degrees.map(deg => `
          <div style="padding: 6px 0; font-size: 12px; border-bottom: 1px solid var(--border-color);">
            <strong>${deg.title}</strong> — ${deg.university} (Age ${deg.graduationAge})
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
    <div class="card">
      <div class="card-title-row">
        <div class="card-title">
          <span>💼</span> Current Employment
        </div>
        ${job ? `<span class="pill-badge emerald">Level ${job.level}</span>` : `<span class="pill-badge">Unemployed</span>`}
      </div>

      ${job ? `
        <div style="margin-bottom: 14px; font-size: 13px; line-height: 1.6;">
          <h3 style="font-size: 15px; font-weight: 600; color: var(--accent-primary);">${job.title}</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 6px;">
            <div><strong>Base Salary:</strong> $${job.baseSalaryUSD.toLocaleString()}/yr</div>
            <div><strong>Annual Bonus:</strong> ${(job.bonusPct * 100)}% target</div>
            <div><strong>Annual Stock (RSU):</strong> $${job.stockUSD.toLocaleString()}</div>
            <div><strong>Tenure:</strong> ${job.experienceYears} Years</div>
          </div>
          <div style="margin-top: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
              <span>Performance Rating:</span>
              <span>${job.performance}%</span>
            </div>
            <div class="stat-bar-container">
              <div class="stat-bar-fill" style="width: ${job.performance}%; background-color: var(--accent-emerald);"></div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
          <button class="btn btn-sm" id="btnWorkOvertime">Work Hard</button>
          <button class="btn btn-sm" id="btnNetworkExecs">Network</button>
          <button class="btn btn-sm" id="btnQuitJob" style="color: var(--accent-rose);">Resign</button>
        </div>
      ` : `
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">
          You do not have corporate employment. Browse available career tracks below to enter high-paying corporate, legal, tech, and finance roles.
        </p>
      `}
    </div>

    <!-- Career Opportunities Catalog -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title">
          <span>🏢</span> Corporate & Professional Ladders
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${CAREER_TRACKS.map(track => `
          <div class="list-row">
            <div class="list-row-left">
              <div class="list-icon-box">${track.icon}</div>
              <div class="list-row-text">
                <h4>${track.name}</h4>
                <p>${track.ladder[0].title} ($${track.ladder[0].baseSalaryUSD.toLocaleString()}) → ${track.ladder[track.ladder.length - 1].title} ($${track.ladder[track.ladder.length - 1].baseSalaryUSD.toLocaleString()})</p>
              </div>
            </div>
            <div class="list-row-right">
              <button class="btn btn-sm btn-primary btn-apply-job" data-track="${track.id}">
                Apply
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// 3. Special Careers Subtab
function renderSpecialCareersSubtab(state) {
  const sc = state.career.specialCareer;

  return `
    <!-- Active Special Career Studio -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title">
          <span>✨</span> Special Career Status
        </div>
        ${sc ? `<span class="pill-badge purple">${sc.name}</span>` : `<span class="pill-badge">None Active</span>`}
      </div>

      ${sc ? `
        <div style="font-size: 13px; line-height: 1.5; margin-bottom: 12px;">
          <h4>${sc.name}</h4>
          ${sc.type === 'indie_dev' ? `
            <p>Total Games Released: ${sc.gamesReleased || 0}</p>
            <p>Annual Digital Steam Royalties: $${(sc.annualRoyaltiesUSD || 0).toLocaleString()}</p>
          ` : ''}
          ${sc.type === 'content_creator' ? `
            <p>Subscribers: ${(sc.subscribers || 0).toLocaleString()}</p>
            <p>Channel RPM: $${sc.rpmUSD || 15}/1k views</p>
          ` : ''}
        </div>
      ` : `
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">
          Special careers allow you to build independent skill-based empires outside traditional corporate ladders.
        </p>
      `}

      <!-- Special Career Launch Buttons -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <button class="btn btn-sm" id="btnLaunchIndieDev">
          <span>🎮</span> Indie Game Studio
        </button>
        <button class="btn btn-sm" id="btnLaunchCreator">
          <span>📹</span> Content Creator
        </button>
        <button class="btn btn-sm" id="btnLaunchModel">
          <span>👠</span> Fashion Model
        </button>
        <button class="btn btn-sm" id="btnLaunchMusician">
          <span>🎵</span> Music Artist
        </button>
        <button class="btn btn-sm" id="btnLaunchAthlete">
          <span>🏆</span> Pro Athlete
        </button>
        <button class="btn btn-sm" id="btnLaunchAuthor">
          <span>📖</span> Author / Novelist
        </button>
      </div>
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
      showToast("Mastered advanced equations and critical analysis! (+4 Smarts, GPA up)", "success");
      rerenderCallback();
    });
  }

  // Elite Coaching
  const btnPrivateCoaching = document.getElementById("btnPrivateCoaching");
  if (btnPrivateCoaching) {
    btnPrivateCoaching.addEventListener("click", () => {
      if (state.finances.cashUSD < 1500) {
        showToast("Insufficient cash for elite coaching ($1,500).", "error");
        return;
      }
      state.finances.cashUSD -= 1500;
      state.stats.smarts = Math.min(100, state.stats.smarts + 8);
      state.education.gpa = Math.min(4.0, state.education.gpa + 0.12);
      calculateNetWorth(state);
      showToast("Attended intensive Olympiad & Entrance Exam coaching! (+8 Smarts)", "success");
      rerenderCallback();
    });
  }

  // Take Exam
  document.querySelectorAll(".btn-take-exam").forEach(btn => {
    btn.addEventListener("click", () => {
      const examId = btn.dataset.exam;
      const ex = EXAMS[examId] || (COUNTRIES[state.character.birthCountry].entranceExams.find(e => e.id === examId));
      if (!ex) return;

      const fee = ex.costUSD || 50;
      if (state.finances.cashUSD < fee) {
        showToast(`Exam fee is $${fee}. Insufficient funds.`, "error");
        return;
      }

      state.finances.cashUSD -= fee;

      // Scoring formula based on smarts
      let scoreText = "";
      if (examId === "sat") {
        const satScore = Math.min(1600, Math.round(900 + (state.stats.smarts / 100) * 700 + (Math.random() * 80 - 40)));
        state.education.examScores.sat = satScore;
        scoreText = `SAT Score: ${satScore} / 1600`;
      } else if (examId === "jee") {
        const jeePercentile = Math.min(99.98, Math.round((70 + (state.stats.smarts / 100) * 29.8) * 100) / 100);
        state.education.examScores.jee = jeePercentile;
        scoreText = `JEE Percentile: ${jeePercentile}%ile`;
      } else if (examId === "neet") {
        const neetScore = Math.min(720, Math.round(400 + (state.stats.smarts / 100) * 315));
        state.education.examScores.neet = neetScore;
        scoreText = `NEET Score: ${neetScore} / 720`;
      } else if (examId === "ielts") {
        const band = Math.min(9.0, Math.round((5.5 + (state.stats.smarts / 100) * 3.5) * 2) / 2);
        state.education.examScores.ielts = band;
        scoreText = `IELTS Band: ${band} / 9.0`;
      } else if (examId === "cat") {
        const catPct = Math.min(99.9, Math.round((60 + (state.stats.smarts / 100) * 39.8) * 10) / 10);
        state.education.examScores.cat = catPct;
        scoreText = `CAT Percentile: ${catPct}%ile`;
      } else {
        state.education.examScores[examId] = 95;
        scoreText = `Exam passed successfully!`;
      }

      calculateNetWorth(state);
      showToast(`Exam Completed! Result: ${scoreText}`, "celebrate");
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
          ${uni.city}, ${uni.country.toUpperCase()} • Acceptance Rate: ${(uni.acceptanceRate * 100).toFixed(1)}%
        </p>
        <div class="input-group">
          <label class="input-label">Select Degree Major</label>
          <select id="selectUniMajor" class="input-field">
            ${majorsOptions}
          </select>
        </div>
        <div style="font-size: 12px; margin-bottom: 14px; background: var(--bg-card); padding: 10px; border-radius: 8px;">
          <div>Annual Tuition: <strong>$${uni.tuitionPerYearUSD.toLocaleString()}</strong></div>
          <div>Minimum Smarts Req: <strong>${uni.minSmarts}</strong> (Yours: ${state.stats.smarts})</div>
          ${uni.minSAT ? `<div>Minimum SAT Score: <strong>${uni.minSAT}</strong> (Yours: ${state.education.examScores.sat || 'Not taken'})</div>` : ''}
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmUniApply">Submit Application</button>
      `);

      document.getElementById("btnConfirmUniApply").addEventListener("click", () => {
        const major = document.getElementById("selectUniMajor").value;

        // Acceptance formula
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
          showToast(`🎉 ACCEPTED! Congratulations, you have been admitted to ${uni.name} studying ${major}!`, "celebrate");
        } else {
          state.stats.happiness = Math.max(10, state.stats.happiness - 10);
          showToast(`Application rejected by ${uni.name}. Strengthen your test scores and GPA!`, "error");
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

      // Degree requirement check
      const hasReqDegree = track.requiredDegrees.length === 0 || state.education.degrees.some(d => track.requiredDegrees.includes(d.major));

      if (!hasReqDegree && track.id !== "civil_service" && state.education.stage !== "University Graduate") {
        showToast(`Requires a degree in ${track.requiredDegrees[0]} or related field!`, "error");
        return;
      }

      if (state.stats.smarts < track.minSmarts - 10) {
        showToast(`You did not pass the technical interviews (Requires ~${track.minSmarts} Smarts).`, "error");
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
      showToast(`Hired! You are now a ${entry.title} at $${entry.baseSalaryUSD.toLocaleString()}/year + ${entry.bonusPct * 100}% bonus & stock!`, "celebrate");
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
        showToast("Delivered exceptional project milestones! (+10 Job Performance)", "success");
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
      showToast("Attended corporate dinners and built executive alliances.", "success");
      rerenderCallback();
    });
  }

  const btnQuitJob = document.getElementById("btnQuitJob");
  if (btnQuitJob) {
    btnQuitJob.addEventListener("click", () => {
      state.career.currentJob = null;
      showToast("Resigned from corporate position.", "info");
      rerenderCallback();
    });
  }

  // Indie Game Studio Launch
  const btnLaunchIndieDev = document.getElementById("btnLaunchIndieDev");
  if (btnLaunchIndieDev) {
    btnLaunchIndieDev.addEventListener("click", () => {
      openModal("Launch Indie Game Project", `
        <div class="input-group">
          <label class="input-label">Game Title</label>
          <input type="text" id="inputGameTitle" class="input-field" placeholder="e.g. Neon Horizon RPG" value="Cyberfall Roguelike">
        </div>
        <div class="input-group">
          <label class="input-label">Genre</label>
          <select id="selectGameGenre" class="input-field">
            <option value="roguelike">Action Roguelike (High Skill)</option>
            <option value="cozy_sim">Cozy Farming & Life Sim</option>
            <option value="cyberpunk_rpg">Sci-Fi Cyberpunk RPG</option>
            <option value="psychological_horror">Psychological Horror</option>
          </select>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
          Publishing on Steam costs $100 and takes 1 year of active development. Revenue scales with Smarts and game reviews.
        </p>
        <button class="btn btn-primary btn-full" id="btnConfirmLaunchGame">Develop & Publish Game ($100)</button>
      `);

      document.getElementById("btnConfirmLaunchGame").addEventListener("click", () => {
        const title = document.getElementById("inputGameTitle").value || "Untitled Indie Game";
        if (state.finances.cashUSD < 100) {
          showToast("Requires $100 for Steam Direct submission fee.", "error");
          return;
        }
        state.finances.cashUSD -= 100;

        const rating = Math.min(98, Math.max(65, Math.round(55 + (state.stats.smarts / 100) * 40 + Math.random() * 8)));
        const firstYearSales = Math.round((rating / 100) * 150000 * (0.6 + Math.random() * 0.8));

        state.career.specialCareer = {
          type: "indie_dev",
          name: "Indie Game Studio",
          gamesReleased: (state.career.specialCareer?.gamesReleased || 0) + 1,
          annualRoyaltiesUSD: firstYearSales
        };

        state.finances.cashUSD += firstYearSales;
        state.stats.fame = Math.min(100, state.stats.fame + 10);
        state.stats.prestige = Math.min(100, state.stats.prestige + 5);
        calculateNetWorth(state);
        closeModal();

        showToast(`🎮 '${title}' released on Steam! Review Score: ${rating}% ("Overwhelmingly Positive")! Earned $${firstYearSales.toLocaleString()}!`, "celebrate");
        rerenderCallback();
      });
    });
  }

  // Content Creator Launch
  const btnLaunchCreator = document.getElementById("btnLaunchCreator");
  if (btnLaunchCreator) {
    btnLaunchCreator.addEventListener("click", () => {
      openModal("Start YouTube & Streaming Empire", `
        <div class="input-group">
          <label class="input-label">Channel Name</label>
          <input type="text" id="inputChannelName" class="input-field" placeholder="e.g. Apex Tech Lab" value="${state.character.firstName} Media">
        </div>
        <div class="input-group">
          <label class="input-label">Niche</label>
          <select id="selectNiche" class="input-field">
            <option value="tech_ai">Tech, AI & High-End Gadgets ($18 RPM)</option>
            <option value="finance_wealth">Personal Finance & Investing ($32 RPM)</option>
            <option value="gaming_esports">Gaming & Esports ($6 RPM)</option>
          </select>
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmCreator">Launch Channel ($500 Gear)</button>
      `);

      document.getElementById("btnConfirmCreator").addEventListener("click", () => {
        if (state.finances.cashUSD < 500) {
          showToast("Requires $500 for camera & mic gear.", "error");
          return;
        }
        state.finances.cashUSD -= 500;
        const newSubs = Math.round(5000 + Math.random() * 25000 + (state.stats.looks * 100));
        const adRevenue = Math.round(newSubs * 0.85);

        state.career.specialCareer = {
          type: "content_creator",
          name: "Digital Media Empire",
          subscribers: (state.career.specialCareer?.subscribers || 0) + newSubs,
          annualAdSenseUSD: adRevenue,
          sponsorshipsUSD: Math.round(adRevenue * 0.6)
        };

        state.finances.cashUSD += adRevenue;
        state.stats.fame = Math.min(100, state.stats.fame + 15);
        calculateNetWorth(state);
        closeModal();

        showToast(`📹 Video went viral! Gained ${newSubs.toLocaleString()} subscribers and earned $${adRevenue.toLocaleString()} in AdSense!`, "celebrate");
        rerenderCallback();
      });
    });
  }

  // Model, Musician, Athlete, Author quick hooks
  const btnLaunchModel = document.getElementById("btnLaunchModel");
  if (btnLaunchModel) {
    btnLaunchModel.addEventListener("click", () => {
      if (state.stats.looks < 70) {
        showToast("High fashion modeling requires at least 70 Looks! Hit the gym or visit the styling salon.", "error");
        return;
      }
      const gigPay = Math.round(state.stats.looks * 350);
      state.finances.cashUSD += gigPay;
      state.stats.fame = Math.min(100, state.stats.fame + 8);
      state.stats.prestige = Math.min(100, state.stats.prestige + 6);
      calculateNetWorth(state);
      showToast(`👠 Walked Paris Fashion Week runway! Earned $${gigPay.toLocaleString()}!`, "celebrate");
      rerenderCallback();
    });
  }

  const btnLaunchMusician = document.getElementById("btnLaunchMusician");
  if (btnLaunchMusician) {
    btnLaunchMusician.addEventListener("click", () => {
      const royalties = Math.round(25000 + Math.random() * 60000);
      state.finances.cashUSD += royalties;
      state.stats.fame = Math.min(100, state.stats.fame + 12);
      state.career.specialCareer = {
        type: "musician",
        name: "Chart-Topping Music Artist",
        annualStreamingUSD: royalties
      };
      calculateNetWorth(state);
      showToast(`🎵 Hit single charted on Billboard Hot 100! Collected $${royalties.toLocaleString()} in streaming royalties!`, "celebrate");
      rerenderCallback();
    });
  }

  const btnLaunchAthlete = document.getElementById("btnLaunchAthlete");
  if (btnLaunchAthlete) {
    btnLaunchAthlete.addEventListener("click", () => {
      if (state.stats.health < 75) {
        showToast("Pro athletic draft requires at least 75 Health!", "error");
        return;
      }
      const salary = 120000;
      state.finances.cashUSD += salary;
      state.stats.fame = Math.min(100, state.stats.fame + 10);
      calculateNetWorth(state);
      showToast(`🏆 Signed pro club contract! Earned $${salary.toLocaleString()} starting salary!`, "celebrate");
      rerenderCallback();
    });
  }

  const btnLaunchAuthor = document.getElementById("btnLaunchAuthor");
  if (btnLaunchAuthor) {
    btnLaunchAuthor.addEventListener("click", () => {
      const advance = Math.round(15000 + (state.stats.smarts * 400));
      state.finances.cashUSD += advance;
      state.stats.prestige = Math.min(100, state.stats.prestige + 8);
      calculateNetWorth(state);
      showToast(`📖 Book published and hit the Bestseller List! Received $${advance.toLocaleString()} advance & royalties!`, "celebrate");
      rerenderCallback();
    });
  }
}
