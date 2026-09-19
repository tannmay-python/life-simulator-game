// View: 15+ Advanced Wealth & Lifestyle Systems: Angel Investing, Philanthropy, Board Seats, Patents, Biohacking, Tax Havens, and Family Dynasty Visualizer

import { STARTUP_PITCHES, investInStartup, establishPhilanthropicFoundation, obtainBoardSeat, filePatent, upgradeBiohackingLongevity, relocateToTaxHaven } from "../systems/lifestyle_engine.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";

export function renderLifestyleView(state) {
  return `
    <!-- High Society & Prestige Card -->
    <div class="card" style="border-left: 3px solid var(--accent-purple);">
      <div class="card-title-row">
        <div class="card-title"><span>🌟</span> High Society & Global Status</div>
        <span class="pill-badge purple">Prestige: ${state.stats.prestige}/100</span>
      </div>
      <div style="font-size: 12px; margin-bottom: 12px; line-height: 1.5;">
        <div>Status Tier: <strong>${state.stats.prestige >= 80 ? 'Global Elite Titan' : (state.stats.prestige >= 50 ? 'High Society Prominence' : 'Notable Citizen')}</strong></div>
        <div>Black Card Concierge: <strong>${state.lifestyle.blackCardUnlocked ? '✅ Centurion Active' : 'Locked ($10M NW Req)'}</strong></div>
        <div>Tax Residency: <strong>${state.character.taxHaven ? state.character.taxHaven.toUpperCase() + ' (0% Tax Haven)' : 'Standard Domestic'}</strong></div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
        <button class="btn btn-sm" id="btnRelocateTaxHaven">🌴 Move to Tax Haven</button>
        <button class="btn btn-sm" id="btnBiohacking">⏳ Longevity & Biohacking</button>
      </div>
    </div>

    <!-- Angel Investing & Venture Capital -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🚀</span> Angel Syndicate & Frontier Startups</div>
        <span class="pill-badge">${state.lifestyle.angelInvestments.length} Investments</span>
      </div>
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
        Deploy seed checks into high-risk, 100x potential frontier tech startups.
      </p>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${STARTUP_PITCHES.map(pitch => `
          <div class="list-row">
            <div class="list-row-left">
              <div class="list-icon-box">🦄</div>
              <div class="list-row-text">
                <h4>${pitch.name}</h4>
                <p>${pitch.sector} • ${pitch.equityPct}% Equity • Target: ${pitch.targetExitMultiplier}x</p>
              </div>
            </div>
            <div class="list-row-right">
              <button class="btn btn-sm btn-primary btn-invest-startup" data-id="${pitch.id}">
                Invest $${pitch.checkUSD.toLocaleString()}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Philanthropy & Family Foundation -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🏛️</span> Philanthropic Foundation</div>
        ${state.lifestyle.foundation ? `<span class="pill-badge emerald">Endowed</span>` : `<span class="pill-badge">Not Established</span>`}
      </div>

      ${state.lifestyle.foundation ? `
        <div style="font-size: 12px; margin-bottom: 10px;">
          <h4>${state.lifestyle.foundation.name}</h4>
          <p>Endowment: <strong>$${state.lifestyle.foundation.endowmentUSD.toLocaleString()}</strong></p>
          <p>Annual Civic Grants: <strong>$${state.lifestyle.foundation.annualGrantsUSD.toLocaleString()}/yr</strong></p>
        </div>
      ` : `
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
          Endow a charitable foundation to establish family legacy, gain massive civic prestige, and fund medical research wings.
        </p>
        <button class="btn btn-primary btn-full" id="btnFoundFoundation">Establish Foundation ($500k)</button>
      `}
    </div>

    <!-- Patents & IP Royalties -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🔬</span> Patents & Intellectual Property (${state.lifestyle.patents.length})</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <p style="font-size: 11px; color: var(--text-secondary);">File frontier research patents to earn perpetual annual licensing royalties.</p>
        <button class="btn btn-sm btn-primary" id="btnFilePatent">File Patent ($75k)</button>
      </div>

      ${state.lifestyle.patents.length > 0 ? `
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${state.lifestyle.patents.map(pat => `
            <div style="font-size: 12px; padding: 6px 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between;">
              <div>
                <strong>${pat.title}</strong> (${pat.sector})
                <div style="font-size: 10px; color: var(--text-muted);">${pat.remainingYears} Years of Protection Remaining</div>
              </div>
              <div style="font-weight: 600; color: var(--accent-emerald);">+$${pat.annualRoyaltyUSD.toLocaleString()}/yr</div>
            </div>
          `).join("")}
        </div>
      ` : ''}
    </div>

    <!-- Corporate Board of Directors Seats -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🤝</span> Corporate Board Seats (${state.lifestyle.boardSeats.length})</div>
      </div>
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">
        Hold 65+ Prestige and $2,000,000+ in stock of a public firm to secure a prestigious Board of Directors seat ($350,000 annual retainer).
      </p>
      <div style="display: flex; gap: 6px;">
        <button class="btn btn-sm btn-board-seat" data-ticker="APEX">Board Seat: APEX AI</button>
        <button class="btn btn-sm btn-board-seat" data-ticker="MORG">Board Seat: MORG Bank</button>
        <button class="btn btn-sm btn-board-seat" data-ticker="VOLT">Board Seat: VOLT Motors</button>
      </div>
    </div>

    <!-- Generational Family Lineage Archive -->
    ${state.family.familyLineage.length > 0 ? `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>👑</span> Family Dynasty Tree & Patriarchs</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${state.family.familyLineage.map(lin => `
            <div class="list-row">
              <div class="list-row-left">
                <div class="list-icon-box">🏛️</div>
                <div class="list-row-text">
                  <h4>Gen ${lin.generation}: ${lin.name}</h4>
                  <p>${lin.notableCareer} • Lived to Age ${lin.ageAtSuccession}</p>
                </div>
              </div>
              <div class="list-row-right">
                <div style="font-weight: 700; color: var(--accent-emerald); font-size: 13px;">
                  $${lin.peakNetWorthUSD.toLocaleString()}
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ''}
  `;
}

export function bindLifestyleEvents(state, rerenderCallback) {
  // Invest in startup
  document.querySelectorAll(".btn-invest-startup").forEach(btn => {
    btn.addEventListener("click", () => {
      const res = investInStartup(state, btn.dataset.id);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });

  // Found Foundation
  const btnFoundFoundation = document.getElementById("btnFoundFoundation");
  if (btnFoundFoundation) {
    btnFoundFoundation.addEventListener("click", () => {
      const res = establishPhilanthropicFoundation(state, 500000);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  }

  // File Patent
  const btnFilePatent = document.getElementById("btnFilePatent");
  if (btnFilePatent) {
    btnFilePatent.addEventListener("click", () => {
      openModal("File Breakthrough Research Patent", `
        <div class="input-group">
          <label class="input-label">Patent Invention Title</label>
          <input type="text" id="inputPatentTitle" class="input-field" placeholder="e.g. Low-Latency Neural Tensor Core" value="Low-Latency Neural Accelerator">
        </div>
        <div class="input-group">
          <label class="input-label">Technology Sector</label>
          <select id="selectPatentSector" class="input-field">
            <option value="AI Hardware">Generative AI Hardware</option>
            <option value="Biotech">CRISPR Gene Editing Delivery</option>
            <option value="Clean Energy">Solid-State Battery Anode</option>
          </select>
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmPatent">File Patent ($75,000 Fee)</button>
      `);

      document.getElementById("btnConfirmPatent").addEventListener("click", () => {
        const title = document.getElementById("inputPatentTitle").value;
        const sector = document.getElementById("selectPatentSector").value;
        const res = filePatent(state, title, sector, 75000);
        closeModal();
        showToast(res.message, res.success ? "celebrate" : "error");
        rerenderCallback();
      });
    });
  }

  // Relocate to Tax Haven
  const btnTaxHaven = document.getElementById("btnRelocateTaxHaven");
  if (btnTaxHaven) {
    btnTaxHaven.addEventListener("click", () => {
      openModal("Relocate to Sovereign Tax Haven", `
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">
          Eliminate personal income and capital gains taxes legally by establishing golden visa tax residency.
        </p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="btn btn-primary btn-full btn-choose-haven" data-haven="monaco">Monaco ($500,000 Deposit)</button>
          <button class="btn btn-primary btn-full btn-choose-haven" data-haven="dubai">Dubai, UAE ($150,000 Golden Visa)</button>
          <button class="btn btn-primary btn-full btn-choose-haven" data-haven="singapore">Singapore ($250,000 Family Office)</button>
        </div>
      `);

      document.querySelectorAll(".btn-choose-haven").forEach(btn => {
        btn.addEventListener("click", () => {
          const res = relocateToTaxHaven(state, btn.dataset.haven);
          closeModal();
          showToast(res.message, res.success ? "celebrate" : "error");
          rerenderCallback();
        });
      });
    });
  }

  // Biohacking
  const btnBiohacking = document.getElementById("btnBiohacking");
  if (btnBiohacking) {
    btnBiohacking.addEventListener("click", () => {
      openModal("Concierge Longevity & Biohacking", `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div class="list-row">
            <div>
              <h4>Tier 1: Cryotherapy & Diagnostics</h4>
              <p>+3 Years Life Expectancy • $35,000</p>
            </div>
            <button class="btn btn-sm btn-primary btn-buy-bio" data-tier="1">Undergo</button>
          </div>
          <div class="list-row">
            <div>
              <h4>Tier 2: Concierge Genetics & Peptides</h4>
              <p>+5 Years Life Expectancy • $120,000</p>
            </div>
            <button class="btn btn-sm btn-primary btn-buy-bio" data-tier="2">Undergo</button>
          </div>
          <div class="list-row">
            <div>
              <h4>Tier 3: Autologous Stem Cell Therapy</h4>
              <p>+8 Years Life Expectancy • $350,000</p>
            </div>
            <button class="btn btn-sm btn-primary btn-buy-bio" data-tier="3">Undergo</button>
          </div>
          <div class="list-row">
            <div>
              <h4>Tier 4: Telomere Epigenetic Reprogramming</h4>
              <p>+12 Years Life Expectancy • $1,000,000</p>
            </div>
            <button class="btn btn-sm btn-primary btn-buy-bio" data-tier="4">Undergo</button>
          </div>
        </div>
      `);

      document.querySelectorAll(".btn-buy-bio").forEach(btn => {
        btn.addEventListener("click", () => {
          const res = upgradeBiohackingLongevity(state, parseInt(btn.dataset.tier));
          closeModal();
          showToast(res.message, res.success ? "celebrate" : "error");
          rerenderCallback();
        });
      });
    });
  }

  // Board Seats
  document.querySelectorAll(".btn-board-seat").forEach(btn => {
    btn.addEventListener("click", () => {
      const res = obtainBoardSeat(state, btn.dataset.ticker);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });
}
