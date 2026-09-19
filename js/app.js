// Master Application Bootstrap, View Orchestrator, and Age-Up Event Loop

import { getGameState, setGameState, resetGame, saveGameState, calculateNetWorth } from "./state.js";
import { updateHeaderAndStats, openModal, closeModal, showToast, setActiveTab, getActiveTab } from "./ui_manager.js";
import { renderProfileView, bindProfileEvents } from "./ui/views_profile.js";
import { renderEducationCareerView, bindEducationCareerEvents } from "./ui/views_education_career.js";
import { renderBusinessView, bindBusinessEvents } from "./ui/views_business.js";
import { renderFinanceAssetsView, bindFinanceAssetsEvents } from "./ui/views_finance_assets.js";
import { renderRelationshipsView, bindRelationshipsEvents } from "./ui/views_relationships.js";
import { renderLifestyleView, bindLifestyleEvents } from "./ui/views_lifestyle.js";
import { ageUpOneYear } from "./systems/aging.js";
import { COUNTRIES } from "./data/countries.js";

function renderCurrentView() {
  const state = getGameState();
  calculateNetWorth(state);
  updateHeaderAndStats(state);

  const container = document.getElementById("viewContent");
  if (!container) return;

  const tab = getActiveTab();
  let html = "";

  if (tab === "profile") {
    html = renderProfileView(state);
  } else if (tab === "education_career") {
    html = renderEducationCareerView(state);
  } else if (tab === "business") {
    html = renderBusinessView(state);
  } else if (tab === "finance_assets") {
    html = renderFinanceAssetsView(state);
  } else if (tab === "relationships") {
    html = renderRelationshipsView(state);
  } else if (tab === "lifestyle") {
    html = renderLifestyleView(state);
  }

  container.innerHTML = html;

  // Bind event listeners for the rendered view
  if (tab === "profile") {
    bindProfileEvents(state, renderCurrentView);
  } else if (tab === "education_career") {
    bindEducationCareerEvents(state, renderCurrentView);
  } else if (tab === "business") {
    bindBusinessEvents(state, renderCurrentView);
  } else if (tab === "finance_assets") {
    bindFinanceAssetsEvents(state, renderCurrentView);
  } else if (tab === "relationships") {
    bindRelationshipsEvents(state, renderCurrentView);
  } else if (tab === "lifestyle") {
    bindLifestyleEvents(state, renderCurrentView);
  }

  saveGameState(state);
}

function handleAgeUp() {
  const state = getGameState();
  const res = ageUpOneYear(state);

  if (res.passedAway) {
    // Show End-of-Life Succession Modal
    const children = state.family.children;
    const childrenOptions = children.length > 0 ? children.map(c => `
      <div class="list-row">
        <div>
          <h4>${c.name} (Age ${c.age})</h4>
          <p>Heir Allocation: ${c.heirAllocPct}%</p>
        </div>
        <button class="btn btn-sm btn-primary btn-choose-heir" data-id="${c.id}">Play as ${c.name}</button>
      </div>
    `).join("") : `<p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">You did not have children to inherit your estate.</p>`;

    openModal("🕊️ A Life Well Lived", `
      <div style="text-align: center; margin-bottom: 14px;">
        <h3 style="font-size: 16px; font-weight: 700;">${state.character.firstName} ${state.character.lastName}</h3>
        <p style="font-size: 12px; color: var(--text-secondary);">Age ${state.character.age} • Generation ${state.character.generation}</p>
      </div>
      <div style="background: var(--bg-card); padding: 12px; border-radius: 8px; font-size: 13px; line-height: 1.6; margin-bottom: 14px;">
        <div>Final Net Worth: <strong style="color: var(--accent-emerald);">$${state.finances.netWorthUSD.toLocaleString()}</strong></div>
        <div>Lifetime Earnings: <strong>$${state.career.lifetimeEarningsUSD.toLocaleString()}</strong></div>
        <div>Companies Founded: <strong>${state.businesses.length}</strong></div>
        <div>Cause: <strong>${state.character.causeOfDeath}</strong></div>
      </div>
      <h4 style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Select Heir to Continue Family Dynasty:</h4>
      ${childrenOptions}
      <button class="btn btn-primary btn-full" id="btnStartFreshGame" style="margin-top: 12px;">Start a New Life</button>
    `);

    document.querySelectorAll(".btn-choose-heir").forEach(btn => {
      btn.addEventListener("click", () => {
        import("./systems/legacy_engine.js").then(module => {
          module.executeSuccessionToChild(state, btn.dataset.id);
          closeModal();
          renderCurrentView();
        });
      });
    });

    document.getElementById("btnStartFreshGame").addEventListener("click", () => {
      closeModal();
      showNewCharacterModal();
    });

    renderCurrentView();
    return;
  }

  showToast(`Aged up to ${res.newAge}! Net Worth: $${res.netWorthUSD.toLocaleString()}`, "celebrate");
  renderCurrentView();
}

function showNewCharacterModal() {
  const countryOptions = Object.values(COUNTRIES).map(c => `
    <option value="${c.id}">${c.name} ${c.flag} (${c.currency})</option>
  `).join("");

  openModal("Create New Character", `
    <div class="input-group">
      <label class="input-label">First Name</label>
      <input type="text" id="inputNewFirstName" class="input-field" value="Aarav">
    </div>
    <div class="input-group">
      <label class="input-label">Last Name</label>
      <input type="text" id="inputNewLastName" class="input-field" value="Sharma">
    </div>
    <div class="input-group">
      <label class="input-label">Gender</label>
      <select id="selectNewGender" class="input-field">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div class="input-group">
      <label class="input-label">Birth Country & Schooling System</label>
      <select id="selectNewCountry" class="input-field">
        ${countryOptions}
      </select>
    </div>
    <div class="input-group">
      <label class="input-label">Family Background</label>
      <select id="selectFamilyWealth" class="input-field">
        <option value="middle_class">Middle Class ($1,500 Starting Cash)</option>
        <option value="affluent">Affluent Professionals ($15,000 Starting Cash)</option>
        <option value="wealthy">Old Money Dynasty ($100,000 Starting Cash)</option>
      </select>
    </div>
    <button class="btn btn-emerald btn-full" id="btnConfirmNewCharacter">Begin New Life</button>
  `);

  document.getElementById("btnConfirmNewCharacter").addEventListener("click", () => {
    const fn = document.getElementById("inputNewFirstName").value || "Aarav";
    const ln = document.getElementById("inputNewLastName").value || "Sharma";
    const gender = document.getElementById("selectNewGender").value;
    const countryId = document.getElementById("selectNewCountry").value;
    const wealth = document.getElementById("selectFamilyWealth").value;

    resetGame({
      firstName: fn,
      lastName: ln,
      gender,
      countryId,
      familyWealthTier: wealth
    });

    closeModal();
    showToast(`Welcome to life, ${fn}! Your journey starts in ${COUNTRIES[countryId].name}!`, "celebrate");
    setActiveTab("profile");
    renderCurrentView();
  });
}

// Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  // Tab Bar navigation
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      setActiveTab(tab.dataset.tab);
      renderCurrentView();
    });
  });

  // Age-up button
  const ageUpBtn = document.getElementById("btnAgeUp");
  if (ageUpBtn) {
    ageUpBtn.addEventListener("click", handleAgeUp);
  }

  // New Game reset button in header
  const btnReset = document.getElementById("btnNewLife");
  if (btnReset) {
    btnReset.addEventListener("click", showNewCharacterModal);
  }

  // Modal close buttons
  const modalClose = document.getElementById("modalClose");
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Initial render
  renderCurrentView();
});
