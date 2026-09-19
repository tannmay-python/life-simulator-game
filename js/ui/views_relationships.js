// View: Dating, Marriage, Prenuptials, Children, Will & Dynasty Trusts, and Generational Succession

import {
  generateDatingProfiles,
  startDating,
  spendTimeWithPartner,
  proposeMarriage,
  divorceSpouse,
  haveChild,
  enrollChildEducation
} from "../systems/relationships_engine.js";
import {
  updateWill,
  establishDynastyTrust,
  designateHeir,
  executeSuccessionToChild
} from "../systems/legacy_engine.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";

export function renderRelationshipsView(state) {
  const p = state.family.partner;

  return `
    <!-- Romantic Relationship & Marriage -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>❤️</span> Romantic Partner</div>
        ${p ? `<span class="pill-badge ${p.isMarried ? 'purple' : 'emerald'}">${p.isMarried ? 'Spouse' : 'Partner'}</span>` : `<span class="pill-badge">Single</span>`}
      </div>

      ${p ? `
        <div style="font-size: 13px; margin-bottom: 12px; line-height: 1.6;">
          <div style="font-size: 15px; font-weight: 600;">${p.name} (Age ${p.age})</div>
          <div>${p.occupation} • Net Worth: $${p.netWorthUSD.toLocaleString()}</div>
          <div style="margin-top: 6px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px;">
              <span>Relationship Strength:</span>
              <span>${p.relationship}%</span>
            </div>
            <div class="stat-bar-container">
              <div class="stat-bar-fill" style="width: ${p.relationship}%; background-color: #ec4899;"></div>
            </div>
          </div>
          ${p.isMarried ? `<div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Legal Status: ${p.hasPrenup ? 'Shielded by Ironclad Prenup' : 'Community Property (No Prenup)'}</div>` : ''}
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
          <button class="btn btn-sm" id="btnDatePartner">Spend Quality Time</button>
          ${!p.isMarried ? `
            <button class="btn btn-sm btn-primary" id="btnProposeMarriage">Propose Marriage 💍</button>
          ` : `
            <button class="btn btn-sm" id="btnHaveChild">Have Baby 👶</button>
            <button class="btn btn-sm" id="btnDivorce" style="color: var(--accent-rose);">File Divorce</button>
          `}
        </div>
      ` : `
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">
          You are currently single. Browse high-society circles and professionals to find your partner.
        </p>
        <button class="btn btn-primary btn-full" id="btnFindDatingMatches">Find Romance & Dating Matches</button>
      `}
    </div>

    <!-- Children & Lineage -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>👶</span> Children & Heirs (${state.family.children.length})</div>
      </div>
      ${state.family.children.length === 0 ? `
        <p style="font-size: 12px; color: var(--text-secondary);">No children yet.</p>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${state.family.children.map(c => `
            <div class="list-row">
              <div class="list-row-left">
                <div class="list-icon-box">${c.gender === 'male' ? '👦' : '👧'}</div>
                <div class="list-row-text">
                  <h4>${c.name} (Age ${c.age})</h4>
                  <p>Education: ${c.educationTier} • Heir Share: ${c.heirAllocPct}%</p>
                </div>
              </div>
              <div class="list-row-right">
                <button class="btn btn-sm btn-enroll-child" data-id="${c.id}">Elite School</button>
                <button class="btn btn-sm btn-primary btn-succession" data-id="${c.id}">Pass Torch</button>
              </div>
            </div>
          `).join("")}
        </div>
      `}
    </div>

    <!-- Last Will & Dynasty Trust -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🏛️</span> Estate Planning & Dynasty Trust</div>
        ${state.family.will.dynastyTrustEstablished ? `<span class="pill-badge emerald">Dynasty Trust Active (0% Estate Tax)</span>` : `<span class="pill-badge amber">Subject to 28% Estate Tax</span>`}
      </div>

      <div style="font-size: 12px; line-height: 1.6; margin-bottom: 12px;">
        <div>Spouse Share: <strong>${state.family.will.spousePct}%</strong></div>
        <div>Children Share: <strong>${state.family.will.childrenPct}%</strong></div>
        <div>Charity Endowment: <strong>${state.family.will.charityPct}%</strong></div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <button class="btn btn-sm" id="btnEditWill">Edit Last Will</button>
        ${!state.family.will.dynastyTrustEstablished ? `
          <button class="btn btn-sm btn-primary" id="btnDynastyTrust">Establish Dynasty Trust ($150k)</button>
        ` : `
          <button class="btn btn-sm btn-emerald" disabled>Trust Protected</button>
        `}
      </div>
    </div>
  `;
}

export function bindRelationshipsEvents(state, rerenderCallback) {
  // Find dating matches
  const btnFindMatches = document.getElementById("btnFindDatingMatches");
  if (btnFindMatches) {
    btnFindMatches.addEventListener("click", () => {
      const candidates = generateDatingProfiles(state);
      openModal("High-Society Matchmaking", `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${candidates.map((c, i) => `
            <div class="list-row">
              <div class="list-row-left">
                <div class="list-icon-box">${c.gender === 'male' ? '🤵' : '💃'}</div>
                <div class="list-row-text">
                  <h4>${c.name} (Age ${c.age})</h4>
                  <p>${c.occupation} • Net Worth: $${c.netWorthUSD.toLocaleString()}</p>
                </div>
              </div>
              <div class="list-row-right">
                <button class="btn btn-sm btn-primary btn-choose-date" data-index="${i}">Date</button>
              </div>
            </div>
          `).join("")}
        </div>
      `);

      document.querySelectorAll(".btn-choose-date").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.index);
          const chosen = candidates[idx];
          startDating(state, chosen);
          closeModal();
          showToast(`Started dating ${chosen.name}!`, "celebrate");
          rerenderCallback();
        });
      });
    });
  }

  // Spend time with partner
  const btnDatePartner = document.getElementById("btnDatePartner");
  if (btnDatePartner) {
    btnDatePartner.addEventListener("click", () => {
      const res = spendTimeWithPartner(state);
      showToast(res.message, res.success ? "success" : "error");
      rerenderCallback();
    });
  }

  // Propose marriage
  const btnPropose = document.getElementById("btnProposeMarriage");
  if (btnPropose) {
    btnPropose.addEventListener("click", () => {
      openModal("Marriage Proposal", `
        <div class="input-group">
          <label class="input-label">Prenuptial Agreement Option</label>
          <select id="selectPrenup" class="input-field">
            <option value="true">Demand Ironclad Prenuptial Agreement (Shields Assets)</option>
            <option value="false">Community Property (No Prenup, Share 50/50)</option>
          </select>
        </div>
        <div class="input-group">
          <label class="input-label">Wedding Reception Tier</label>
          <select id="selectWeddingCost" class="input-field">
            <option value="25000">Vineyard Estate Gala ($25,000)</option>
            <option value="150000">Royal Palace Destination Weekend ($150,000)</option>
            <option value="2000">Intimate City Hall ($2,000)</option>
          </select>
        </div>
        <button class="btn btn-emerald btn-full" id="btnConfirmPropose">Propose with Ring</button>
      `);

      document.getElementById("btnConfirmPropose").addEventListener("click", () => {
        const withPrenup = document.getElementById("selectPrenup").value === "true";
        const cost = parseInt(document.getElementById("selectWeddingCost").value);
        const res = proposeMarriage(state, withPrenup, cost);
        closeModal();
        showToast(res.message, res.success ? "celebrate" : "error");
        rerenderCallback();
      });
    });
  }

  // Divorce
  const btnDivorce = document.getElementById("btnDivorce");
  if (btnDivorce) {
    btnDivorce.addEventListener("click", () => {
      const res = divorceSpouse(state);
      showToast(res.message, "info");
      rerenderCallback();
    });
  }

  // Have Child
  const btnHaveChild = document.getElementById("btnHaveChild");
  if (btnHaveChild) {
    btnHaveChild.addEventListener("click", () => {
      const res = haveChild(state);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  }

  // Enroll Child in elite education
  document.querySelectorAll(".btn-enroll-child").forEach(btn => {
    btn.addEventListener("click", () => {
      const res = enrollChildEducation(state, btn.dataset.id, "elite_prep");
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });

  // Pass torch / Generational Succession
  document.querySelectorAll(".btn-succession").forEach(btn => {
    btn.addEventListener("click", () => {
      const childId = btn.dataset.id;
      const child = state.family.children.find(c => c.id === childId);
      if (!child) return;

      openModal("Pass Generational Torch", `
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
          Retire and assume full control playing as your heir, <strong>${child.name}</strong> (Age ${child.age})!
          All family real estate, operating businesses, luxury assets, and net worth will pass on to them.
        </p>
        <button class="btn btn-emerald btn-full" id="btnConfirmSuccession">Pass Torch & Continue Dynasty</button>
      `);

      document.getElementById("btnConfirmSuccession").addEventListener("click", () => {
        const res = executeSuccessionToChild(state, childId);
        closeModal();
        showToast(res.message, "celebrate");
        rerenderCallback();
      });
    });
  });

  // Edit Will
  const btnEditWill = document.getElementById("btnEditWill");
  if (btnEditWill) {
    btnEditWill.addEventListener("click", () => {
      openModal("Configure Last Will & Testament", `
        <div class="input-group">
          <label class="input-label">Spouse Share (%)</label>
          <input type="number" id="inputWillSpouse" class="input-field" value="${state.family.will.spousePct}">
        </div>
        <div class="input-group">
          <label class="input-label">Children Share (%)</label>
          <input type="number" id="inputWillChildren" class="input-field" value="${state.family.will.childrenPct}">
        </div>
        <div class="input-group">
          <label class="input-label">Charity Foundation Share (%)</label>
          <input type="number" id="inputWillCharity" class="input-field" value="${state.family.will.charityPct}">
        </div>
        <button class="btn btn-primary btn-full" id="btnSaveWill">Save Allocations</button>
      `);

      document.getElementById("btnSaveWill").addEventListener("click", () => {
        const spouse = parseInt(document.getElementById("inputWillSpouse").value) || 0;
        const children = parseInt(document.getElementById("inputWillChildren").value) || 0;
        const charity = parseInt(document.getElementById("inputWillCharity").value) || 0;

        const res = updateWill(state, { spousePct: spouse, childrenPct: children, charityPct: charity });
        closeModal();
        showToast(res.message, res.success ? "success" : "error");
        rerenderCallback();
      });
    });
  }

  // Establish Dynasty Trust
  const btnDynastyTrust = document.getElementById("btnDynastyTrust");
  if (btnDynastyTrust) {
    btnDynastyTrust.addEventListener("click", () => {
      const res = establishDynastyTrust(state);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  }
}
