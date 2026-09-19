// View: Profile, Core Stats, Personal Life Actions, and Annual Ledger

import { COUNTRIES } from "../data/countries.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";
import { calculateNetWorth } from "../state.js";

export function renderProfileView(state) {
  const country = COUNTRIES[state.character.currentCountry] || COUNTRIES.india;
  const birthCountry = COUNTRIES[state.character.birthCountry] || COUNTRIES.india;

  const ledgerHtml = state.ledger.slice().reverse().map(item => {
    const cleanHeadline = (item.headline || "").replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[!！]+$/, '').trim();
    return `
      <div class="ledger-row">
        <div class="ledger-age">Age ${item.age}</div>
        <div class="ledger-body">
          <div class="ledger-headline">${cleanHeadline}</div>
          ${(item.logs || []).map(log => {
            const cleanLog = log.replace(/^[•·\s]+/, '').replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[!！]+$/, '').trim();
            return `<div class="ledger-logs">${cleanLog}</div>`;
          }).join("")}
        </div>
        <div class="ledger-cash">
          ${item.cashChangeUSD ? `${item.cashChangeUSD >= 0 ? '+' : ''}$${Math.round(item.cashChangeUSD).toLocaleString()}` : ''}
        </div>
      </div>
    `;
  }).join("");

  return `
    <section style="padding-top: 8px;">
      <!-- Identity Section -->
      <h2 class="section-heading first">Identity</h2>
      <div class="detail-grid">
        <div>
          <div class="detail-label">Birthplace</div>
          <div class="detail-val">${birthCountry.name}</div>
        </div>
        <div>
          <div class="detail-label">Tax residency</div>
          <div class="detail-val">${state.character.taxHaven ? `${state.character.taxHaven.toUpperCase()} (0% tax)` : country.name}</div>
        </div>
        <div>
          <div class="detail-label">Credit score</div>
          <div class="detail-val-mono">${state.stats.creditScore !== null ? state.stats.creditScore : '—'}</div>
        </div>
        <div>
          <div class="detail-label">Societal standing</div>
          <div class="detail-val-mono">${state.stats.prestige || 10}<span style="color: var(--text-tertiary);">/100</span></div>
        </div>
      </div>

      <!-- Actions Section -->
      <h2 class="section-heading">Actions</h2>
      <div class="actions-grid">
        <button class="action-btn" id="btnWorkout" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">fitness_center</span>
            <span class="action-btn-label">Gym and fitness</span>
          </div>
          <span class="action-btn-meta">+4 health</span>
        </button>

        <button class="action-btn" id="btnStudySelf" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">menu_book</span>
            <span class="action-btn-label">Read and study</span>
          </div>
          <span class="action-btn-meta">+3 smarts</span>
        </button>

        <button class="action-btn" id="btnMeditate" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">self_improvement</span>
            <span class="action-btn-label">Meditate</span>
          </div>
          <span class="action-btn-meta">+6 happy</span>
        </button>

        <button class="action-btn" id="btnGrooming" type="button">
          <div class="action-btn-left">
            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--text-tertiary);">content_cut</span>
            <span class="action-btn-label">Styling and salon</span>
          </div>
          <span class="action-btn-meta">$250</span>
        </button>
      </div>

      <!-- Ledger Section -->
      <h2 class="section-heading">Ledger</h2>
      <div>
        ${ledgerHtml}
      </div>
    </section>
  `;
}

export function bindProfileEvents(state, rerenderCallback) {
  const btnWorkout = document.getElementById("btnWorkout");
  if (btnWorkout) {
    btnWorkout.addEventListener("click", () => {
      state.stats.health = Math.min(100, state.stats.health + 4);
      state.stats.looks = Math.min(100, state.stats.looks + 2);
      state.stats.happiness = Math.min(100, state.stats.happiness + 3);
      showToast("Completed an intense weight training session (+Health, +Looks)", "success");
      rerenderCallback();
    });
  }

  const btnStudySelf = document.getElementById("btnStudySelf");
  if (btnStudySelf) {
    btnStudySelf.addEventListener("click", () => {
      state.stats.smarts = Math.min(100, state.stats.smarts + 3);
      state.stats.happiness = Math.max(10, state.stats.happiness - 1);
      showToast("Studied deep science and finance papers (+Smarts)", "success");
      rerenderCallback();
    });
  }

  const btnMeditate = document.getElementById("btnMeditate");
  if (btnMeditate) {
    btnMeditate.addEventListener("click", () => {
      state.stats.happiness = Math.min(100, state.stats.happiness + 6);
      state.stats.health = Math.min(100, state.stats.health + 2);
      showToast("Mindfulness meditation session completed (+Happiness)", "success");
      rerenderCallback();
    });
  }

  const btnGrooming = document.getElementById("btnGrooming");
  if (btnGrooming) {
    btnGrooming.addEventListener("click", () => {
      if (state.finances.cashUSD < 250) {
        showToast("Insufficient cash for styling salon ($250)", "error");
        return;
      }
      state.finances.cashUSD -= 250;
      state.stats.looks = Math.min(100, state.stats.looks + 5);
      state.stats.happiness = Math.min(100, state.stats.happiness + 4);
      calculateNetWorth(state);
      showToast("Styling session complete (+5 Looks)", "success");
      rerenderCallback();
    });
  }
}
