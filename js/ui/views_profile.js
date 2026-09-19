// View: Profile, Core Stats, Personal Life Actions, and Annual Ledger

import { COUNTRIES } from "../data/countries.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";
import { calculateNetWorth } from "../state.js";

export function renderProfileView(state) {
  const country = COUNTRIES[state.character.currentCountry] || COUNTRIES.india;
  const birthCountry = COUNTRIES[state.character.birthCountry] || COUNTRIES.india;

  const ledgerHtml = state.ledger.map(item => `
    <div class="ledger-item">
      <div class="ledger-headline">
        <span>Age ${item.age}: ${item.headline}</span>
        <span style="font-size: 11px; float: right; color: ${item.cashChangeUSD >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
          ${item.cashChangeUSD >= 0 ? '+' : ''}$${Math.round(item.cashChangeUSD).toLocaleString()}
        </span>
      </div>
      ${item.logs.map(log => `<p class="ledger-log-text">• ${log}</p>`).join("")}
    </div>
  `).join("");

  return `
    <!-- Identity Overview Card -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title">
          <span>👤</span> Personal Identity
        </div>
        <span class="pill-badge blue">Generation ${state.character.generation}</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px; margin-bottom: 12px;">
        <div>
          <span style="color: var(--text-muted);">Birthplace:</span>
          <div>${birthCountry.name} ${birthCountry.flag}</div>
        </div>
        <div>
          <span style="color: var(--text-muted);">Tax Residency:</span>
          <div>${state.character.taxHaven ? `<span style="color: var(--accent-emerald); font-weight:600;">${state.character.taxHaven.toUpperCase()} (0% Tax)</span>` : `${country.name} ${country.flag}`}</div>
        </div>
        <div>
          <span style="color: var(--text-muted);">Credit Score:</span>
          <div style="font-weight: 600; color: ${state.stats.creditScore >= 720 ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">${state.stats.creditScore} (FICO / CIBIL)</div>
        </div>
        <div>
          <span style="color: var(--text-muted);">Societal Prestige:</span>
          <div style="font-weight: 600; color: var(--accent-purple);">${state.stats.prestige}/100</div>
        </div>
      </div>

      <!-- Quick Self-Improvement Actions -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        <button class="btn btn-sm" id="btnWorkout">
          <span>💪</span> Gym & Fitness
        </button>
        <button class="btn btn-sm" id="btnStudySelf">
          <span>📚</span> Read & Study
        </button>
        <button class="btn btn-sm" id="btnMeditate">
          <span>🧘</span> Meditate & Relax
        </button>
        <button class="btn btn-sm" id="btnGrooming">
          <span>✨</span> Styling & Salon ($250)
        </button>
      </div>
    </div>

    <!-- Annual Life Ledger Feed -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title">
          <span>📜</span> Life Chronicles & Ledger
        </div>
        <span class="pill-badge">${state.ledger.length} Milestones</span>
      </div>
      <div style="max-height: 460px; overflow-y: auto; padding-right: 4px;">
        ${ledgerHtml}
      </div>
    </div>
  `;
}

export function bindProfileEvents(state, rerenderCallback) {
  const btnWorkout = document.getElementById("btnWorkout");
  if (btnWorkout) {
    btnWorkout.addEventListener("click", () => {
      state.stats.health = Math.min(100, state.stats.health + 4);
      state.stats.looks = Math.min(100, state.stats.looks + 2);
      state.stats.happiness = Math.min(100, state.stats.happiness + 3);
      showToast("Completed an intense weight training session! (+Health, +Looks)", "success");
      rerenderCallback();
    });
  }

  const btnStudySelf = document.getElementById("btnStudySelf");
  if (btnStudySelf) {
    btnStudySelf.addEventListener("click", () => {
      state.stats.smarts = Math.min(100, state.stats.smarts + 3);
      state.stats.happiness = Math.max(10, state.stats.happiness - 1);
      showToast("Studied deep science and finance papers. (+Smarts)", "success");
      rerenderCallback();
    });
  }

  const btnMeditate = document.getElementById("btnMeditate");
  if (btnMeditate) {
    btnMeditate.addEventListener("click", () => {
      state.stats.happiness = Math.min(100, state.stats.happiness + 6);
      state.stats.health = Math.min(100, state.stats.health + 2);
      showToast("Mindfulness meditation session completed. (+Happiness)", "success");
      rerenderCallback();
    });
  }

  const btnGrooming = document.getElementById("btnGrooming");
  if (btnGrooming) {
    btnGrooming.addEventListener("click", () => {
      if (state.finances.cashUSD < 250) {
        showToast("Insufficient cash for luxury salon visit ($250).", "error");
        return;
      }
      state.finances.cashUSD -= 250;
      state.stats.looks = Math.min(100, state.stats.looks + 5);
      state.stats.happiness = Math.min(100, state.stats.happiness + 4);
      calculateNetWorth(state);
      showToast("Luxury styling session complete! (+5 Looks)", "success");
      rerenderCallback();
    });
  }
}
