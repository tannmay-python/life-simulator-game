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
  const p = state.family?.partner;
  const parents = state.family?.parents || [];
  const children = state.family?.children || [];
  const will = state.family?.will || { spousePct: 50, childrenPct: 40, charityPct: 10, dynastyTrustEstablished: false };
  const age = state.character?.age || 18;

  return `
    <!-- Family -->
    <h2 class="section-heading first">Family</h2>
    <div>
      ${parents.map(parent => `
        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">${parent.name}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 3px;">
              ${parent.relation} · Age ${parent.age}
            </div>
          </div>
          <div style="text-align: right;">
            <div class="mono-val" style="font-size: 14px;">${parent.relationship || 88}</div>
            <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 2px;">Closeness</div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Partner -->
    <h2 class="section-heading">Partner</h2>
    ${p ? `
      <div class="surface-box" style="padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <div style="font-size: 16px; font-weight: 500;">${p.name}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
              ${p.occupation} · Net worth <span style="font-family: var(--font-mono);">$${p.netWorthUSD.toLocaleString()}</span>
            </div>
          </div>
          <div style="text-align: right;">
            <div class="mono-val" style="font-size: 14px;">${p.relationship}%</div>
            <div style="font-size: 12px; color: var(--text-tertiary);">${p.isMarried ? 'Spouse' : 'Partner'}</div>
          </div>
        </div>

        <div style="height: 2px; background: rgba(22, 21, 15, 0.10); margin-top: 14px;">
          <div style="height: 2px; width: ${p.relationship}%; background: var(--ink);"></div>
        </div>

        <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 10px;">
          ${p.isMarried ? (p.hasPrenup ? 'Shielded by ironclad prenuptial agreement' : 'Community property estate (no prenup)') : 'Dating partner'}
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px;">
          <button class="btn btn-outline btn-sm" id="btnDatePartner" type="button">Spend time</button>
          ${!p.isMarried ? `
            <button class="btn btn-primary btn-sm" id="btnProposeMarriage" type="button">Propose marriage</button>
          ` : `
            <button class="btn btn-primary btn-sm" id="btnHaveChild" type="button">Have child</button>
            <button class="btn btn-outline btn-sm" id="btnDivorce" type="button" style="color: var(--text-tertiary);">File divorce</button>
          `}
        </div>
      </div>
    ` : `
      <div class="surface-box" style="text-align: center; padding: 32px 28px;">
        <div style="font-size: 16px;">Single</div>
        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.55; margin: 8px auto 16px; max-width: 340px;">
          Dating unlocks at 18. Prenuptial agreements protect the estate from a 50% division.
        </p>
        ${age >= 18 ? `
          <button class="btn btn-primary btn-sm" id="btnFindDatingMatches" type="button">Find matches</button>
        ` : ''}
      </div>
    `}

    <!-- Children -->
    ${children.length > 0 ? `
      <h2 class="section-heading">Children (${children.length})</h2>
      <div>
        ${children.map(c => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${c.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                Age ${c.age} · Education: ${c.educationTier || 'Standard'} · Heir alloc: <span style="font-family: var(--font-mono);">${c.heirAllocPct}%</span>
              </div>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm btn-enroll-child" data-id="${c.id}" type="button">Elite school</button>
              <button class="btn btn-outline btn-sm btn-succession" data-id="${c.id}" type="button">Pass torch</button>
            </div>
          </div>
        `).join("")}
      </div>
    ` : ''}

    <!-- Estate Plan -->
    <h2 class="section-heading">Estate plan</h2>
    <div>
      <div class="list-row" style="display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 15px;">Spouse</span>
        <span class="mono-val" style="font-size: 14px;">${will.spousePct || will.spouse || 50}%</span>
      </div>
      <div class="list-row" style="display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 15px;">Children</span>
        <span class="mono-val" style="font-size: 14px;">${will.childrenPct || will.kids || 40}%</span>
      </div>
      <div class="list-row" style="display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 15px;">Charity</span>
        <span class="mono-val" style="font-size: 14px;">${will.charityPct || will.charity || 10}%</span>
      </div>
      <div class="list-row" style="display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 15px;">Dynasty trust</span>
        <span style="font-size: 14px; color: var(--text-tertiary);">${will.dynastyTrustEstablished || will.dynastyTrust ? 'Established (0% estate tax)' : 'Not established'}</span>
      </div>
    </div>

    <div style="display: flex; gap: 8px; margin-top: 16px;">
      <button class="btn btn-outline btn-sm" id="btnEditWill" type="button">Configure allocations</button>
      ${!(will.dynastyTrustEstablished || will.dynastyTrust) ? `
        <button class="btn btn-outline btn-sm" id="btnDynastyTrust" type="button">Establish dynasty trust</button>
      ` : ''}
    </div>
  `;
}

export function bindRelationshipsEvents(state, rerenderCallback) {
  // Dating Match Browser
  const btnFindMatches = document.getElementById("btnFindDatingMatches");
  if (btnFindMatches) {
    btnFindMatches.addEventListener("click", () => {
      const matches = generateDatingProfiles(state);
      openModal("Prospective partners", `
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
          Select a partner to begin dating.
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${matches.map((m, i) => `
            <div class="surface-box" style="padding: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <div style="font-size: 15px; font-weight: 500;">${m.name} (Age ${m.age})</div>
                <div class="mono-val" style="font-size: 13px;">$${m.netWorthUSD.toLocaleString()}</div>
              </div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                ${m.occupation} · Compatibility ${m.compatibility}%
              </div>
              <button class="btn btn-primary btn-sm btn-start-dating" data-idx="${i}" type="button" style="margin-top: 10px;">
                Start dating
              </button>
            </div>
          `).join("")}
        </div>
      `);

      document.querySelectorAll(".btn-start-dating").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.idx);
          const chosen = matches[idx];
          startDating(state, chosen);
          closeModal();
          showToast(`Now dating ${chosen.name}`, "celebrate");
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
      showToast(res.message, res.success ? "celebrate" : "info");
      rerenderCallback();
    });
  }

  // Propose marriage
  const btnProposeMarriage = document.getElementById("btnProposeMarriage");
  if (btnProposeMarriage) {
    btnProposeMarriage.addEventListener("click", () => {
      openModal("Marriage proposal & prenuptial agreement", `
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
          An ironclad prenuptial agreement shields your businesses, real estate, and financial assets in the event of divorce.
        </p>
        <div class="input-group">
          <label class="input-label">Prenuptial terms</label>
          <select id="selectPrenup" class="input-field">
            <option value="true">Require ironclad prenuptial agreement</option>
            <option value="false">Community property (no prenup)</option>
          </select>
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmPropose" type="button">Propose marriage</button>
      `);

      document.getElementById("btnConfirmPropose")?.addEventListener("click", () => {
        const reqPrenup = document.getElementById("selectPrenup").value === "true";
        const res = proposeMarriage(state, reqPrenup);
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

  // Generational Succession
  document.querySelectorAll(".btn-succession").forEach(btn => {
    btn.addEventListener("click", () => {
      const childId = btn.dataset.id;
      const child = state.family?.children?.find(c => c.id === childId);
      if (!child) return;

      openModal("Generational succession", `
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.55;">
          Retire and assume full control playing as your heir, <strong>${child.name}</strong> (Age ${child.age}).
          All estate holdings and family legacy will transfer to them.
        </p>
        <button class="btn btn-primary btn-full" id="btnConfirmSuccession" type="button">Pass torch & continue dynasty</button>
      `);

      document.getElementById("btnConfirmSuccession")?.addEventListener("click", () => {
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
      const currentWill = state.family?.will || { spousePct: 50, childrenPct: 40, charityPct: 10 };
      openModal("Configure estate allocations", `
        <div class="input-group">
          <label class="input-label">Spouse share (%)</label>
          <input type="number" id="inputWillSpouse" class="input-field" value="${currentWill.spousePct || 50}">
        </div>
        <div class="input-group">
          <label class="input-label">Children share (%)</label>
          <input type="number" id="inputWillChildren" class="input-field" value="${currentWill.childrenPct || 40}">
        </div>
        <div class="input-group">
          <label class="input-label">Charity share (%)</label>
          <input type="number" id="inputWillCharity" class="input-field" value="${currentWill.charityPct || 10}">
        </div>
        <button class="btn btn-primary btn-full" id="btnSaveWill" type="button">Save allocations</button>
      `);

      document.getElementById("btnSaveWill")?.addEventListener("click", () => {
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
