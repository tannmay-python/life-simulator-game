// Central UI Manager: Navigation routing, modal handling, toast alerts, and header bindings

import { getGameState, saveGameState } from "../state.js";
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
    nameEl.innerHTML = `${state.character.firstName} ${state.character.lastName} <span style="font-size: 13px;">${country.flag}</span>`;
  }

  const subEl = document.getElementById("headerSubtitle");
  if (subEl) {
    const jobTitle = state.career.currentJob ? state.career.currentJob.title : (state.education.currentUniversity ? `Student at ${state.education.currentUniversity.name}` : state.education.stage);
    subEl.innerText = `Age ${state.character.age} • Gen ${state.character.generation} • ${jobTitle}`;
  }

  const nwEl = document.getElementById("headerNetWorth");
  if (nwEl) {
    nwEl.innerText = `$${state.finances.netWorthUSD.toLocaleString()}`;
  }

  // Stats Bars
  updateStatBar("statHealth", state.stats.health, "#10b981");
  updateStatBar("statHappiness", state.stats.happiness, "#f59e0b");
  updateStatBar("statSmarts", state.stats.smarts, "#3b82f6");
  updateStatBar("statLooks", state.stats.looks, "#ec4899");
}

function updateStatBar(elementId, value, color) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const bar = container.querySelector(".stat-bar-fill");
  const text = container.querySelector(".stat-val-text");
  if (bar) {
    bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
    bar.style.backgroundColor = color;
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

  modalTitle.innerText = title;
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

  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "⚠️";
  if (type === "celebrate") icon = "🎉";

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}
