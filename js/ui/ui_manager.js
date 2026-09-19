// Central UI Manager: Navigation routing, modal handling, toast alerts, and header bindings

import { getGameState, saveGameState, stageLabel } from "../state.js";
import { COUNTRIES } from "../data/countries.js";

let currentActiveTab = "profile";

export function getActiveTab() {
  return currentActiveTab;
}

export function setActiveTab(tabKey) {
  currentActiveTab = tabKey;
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === tabKey);
  });
  window.dispatchEvent(new CustomEvent("tabChanged", { detail: { tab: tabKey } }));
}

export function updateHeaderAndStats(state) {
  const country = COUNTRIES[state.character.currentCountry] || COUNTRIES.india;

  const nameEl = document.getElementById("headerName");
  if (nameEl) {
    nameEl.innerText = `${state.character.firstName} ${state.character.lastName}`;
  }

  const subEl = document.getElementById("headerSubtitle");
  if (subEl) {
    const jobTitle = state.career.currentJob ? state.career.currentJob.title : (state.education.currentUniversity ? `Student at ${state.education.currentUniversity.name}` : state.education.stage);
    subEl.innerText = `Age ${state.character.age} · Gen ${state.character.generation} · ${jobTitle === state.education.stage ? stageLabel(state.education.stage) : jobTitle} · ${country.name}`;
  }

  const nwEl = document.getElementById("headerNetWorth");
  if (nwEl) {
    nwEl.innerText = `$${state.finances.netWorthUSD.toLocaleString()}`;
  }

  const nextAgeEl = document.getElementById("ageUpNext");
  if (nextAgeEl) {
    nextAgeEl.innerText = `Age ${state.character.age + 1}`;
  }

  // Stats Bars (Vitals: Health, Happiness, Smarts, Looks, Energy)
  updateStatBar("statHealth", state.stats.health);
  updateStatBar("statHappiness", state.stats.happiness);
  updateStatBar("statSmarts", state.stats.smarts);
  updateStatBar("statLooks", state.stats.looks);
  updateStatBar("statEnergy", state.stats.energy !== undefined ? state.stats.energy : 100);
}

function updateStatBar(elementId, value) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const bar = container.querySelector(".stat-bar-fill");
  const text = container.querySelector(".stat-val-text");
  if (bar) {
    bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
  }
  if (text) {
    text.innerText = `${Math.round(value)}%`;
  }
}

// Modal System
export function openModal(title, innerHTML) {
  const overlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  if (!overlay || !modalTitle || !modalBody) return;

  modalTitle.innerText = title.replace(/[!！]+$/, '').replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
  modalBody.innerHTML = innerHTML;
  overlay.classList.add("open");
}

export function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  if (overlay) overlay.classList.remove("open");
}

// Toast Notifications
export function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  const cleanMsg = message.replace(/[!！]+$/, '').replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
  toast.innerText = cleanMsg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-6px)";
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}
