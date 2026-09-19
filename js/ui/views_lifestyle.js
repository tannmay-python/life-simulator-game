// View: 15+ Advanced Wealth & Lifestyle Systems: Angel Investing, Philanthropy, Board Seats, Patents, Biohacking, Tax Havens, and Family Dynasty Visualizer

import { STARTUP_PITCHES, investInStartup, establishPhilanthropicFoundation, obtainBoardSeat, filePatent, upgradeBiohackingLongevity, relocateToTaxHaven } from "../systems/lifestyle_engine.js";
import { establishDynastyTrust } from "../systems/legacy_engine.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";

export function renderLifestyleView(state) {
  const prestige = state.stats?.prestige || 10;
  const tierIndex = prestige >= 90 ? 6 : (prestige >= 75 ? 5 : (prestige >= 55 ? 4 : (prestige >= 35 ? 3 : (prestige >= 20 ? 2 : 1))));
  const tierNames = {
    1: "Unremarkable",
    2: "Notable citizen",
    3: "Prominent figure",
    4: "High society",
    5: "Global titan",
    6: "Dynastic ruler"
  };

  const wealthSystems = [
    {
      id: "angel",
      name: "Angel syndicate",
      desc: "Seed cheques into frontier startups",
      status: state.lifestyle?.angelInvestments?.length ? `${state.lifestyle.angelInvestments.length} Active` : "Available",
      actionLabel: "Invest"
    },
    {
      id: "foundation",
      name: "Family foundation",
      desc: "Endow universities and hospitals",
      status: state.lifestyle?.foundation ? "Endowed" : (state.finances?.netWorth >= 500000 ? "Available" : "Locked ($500K NW)"),
      actionLabel: state.lifestyle?.foundation ? "View" : "Endow ($500K)"
    },
    {
      id: "board_seats",
      name: "Corporate board seats",
      desc: "$350K annual retainers",
      status: prestige >= 50 ? "Available" : "Locked (50 Prestige)",
      actionLabel: "Browse"
    },
    {
      id: "patents",
      name: "Patents and IP licensing",
      desc: "Royalty streams for 20 years",
      status: state.lifestyle?.patents?.length ? `${state.lifestyle.patents.length} Patents` : "Available",
      actionLabel: "File ($75K)"
    },
    {
      id: "tax_havens",
      name: "Sovereign tax havens",
      desc: "Monaco, Dubai, Singapore",
      status: state.character?.taxHaven ? state.character.taxHaven.toUpperCase() : "Available",
      actionLabel: state.character?.taxHaven ? "Relocate" : "Establish"
    },
    {
      id: "centurion",
      name: "Centurion concierge",
      desc: "Unlocks at $10M net worth",
      status: (state.finances?.netWorth || 0) >= 10000000 ? "Unlocked" : "Locked",
      actionLabel: (state.finances?.netWorth || 0) >= 10000000 ? "Active" : "Locked"
    },
    {
      id: "biohacking",
      name: "Longevity and biohacking",
      desc: "Stem cells, telomere extension",
      status: "Available",
      actionLabel: "Upgrade"
    },
    {
      id: "dynasty_trust",
      name: "Dynasty trust",
      desc: "Estate tax shielding",
      status: state.family?.will?.dynastyTrustEstablished || state.family?.will?.dynastyTrust ? "Active" : "Not established",
      actionLabel: state.family?.will?.dynastyTrustEstablished || state.family?.will?.dynastyTrust ? "Active" : "Establish"
    }
  ];

  return `
    <section style="padding-top: 8px;">
      <!-- Societal Standing Surface Box -->
      <div class="surface-box" style="padding: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div style="font-size: 16px;">Societal standing</div>
          <div class="mono-val" style="font-size: 16px;">
            ${prestige}<span style="color: var(--text-tertiary);">/100</span>
          </div>
        </div>
        <div style="height: 2px; background: rgba(22, 21, 15, 0.10); margin-top: 16px;">
          <div style="height: 2px; width: ${Math.min(100, prestige)}%; background: var(--ink);"></div>
        </div>
        <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 10px;">
          Tier ${tierIndex} of 6 · ${tierNames[tierIndex]}
        </div>
      </div>

      <!-- Wealth Systems -->
      <h2 class="section-heading">Wealth systems</h2>
      <div>
        ${wealthSystems.map(item => `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${item.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 3px;">
                ${item.desc}
              </div>
            </div>
            <div style="display: flex; align-items: baseline; gap: 12px;">
              <div style="font-size: 13px; color: var(--text-tertiary); white-space: nowrap;">
                ${item.status}
              </div>
              <button class="btn btn-outline btn-sm btn-wealth-sys" data-sys="${item.id}" type="button">
                ${item.actionLabel}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

export function bindLifestyleEvents(state, rerenderCallback) {
  document.querySelectorAll(".btn-wealth-sys").forEach(btn => {
    btn.addEventListener("click", () => {
      const sysId = btn.dataset.sys;
      if (sysId === "angel") {
        openModal("Angel syndicate investments", `
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
            Deploy seed cheques into high-growth frontier tech startups.
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${STARTUP_PITCHES.map(pitch => `
              <div class="surface-box" style="padding: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <div style="font-size: 15px; font-weight: 500;">${pitch.name}</div>
                  <div class="mono-val" style="font-size: 13px;">$${pitch.checkUSD.toLocaleString()}</div>
                </div>
                <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                  ${pitch.sector} · ${pitch.equityPct}% equity · Target ${pitch.targetExitMultiplier}x
                </div>
                <button class="btn btn-primary btn-sm btn-invest-deal" data-id="${pitch.id}" type="button" style="margin-top: 10px;">
                  Invest $${pitch.checkUSD.toLocaleString()}
                </button>
              </div>
            `).join("")}
          </div>
        `);

        document.querySelectorAll(".btn-invest-deal").forEach(b => {
          b.addEventListener("click", () => {
            const res = investInStartup(state, b.dataset.id);
            closeModal();
            showToast(res.message, res.success ? "celebrate" : "error");
            rerenderCallback();
          });
        });
      } else if (sysId === "foundation") {
        if (state.lifestyle?.foundation) {
          openModal("Family foundation", `
            <div class="detail-grid">
              <div><div class="detail-label">Foundation</div><div class="detail-val">${state.lifestyle.foundation.name}</div></div>
              <div><div class="detail-label">Endowment</div><div class="detail-val-mono">$${state.lifestyle.foundation.endowmentUSD.toLocaleString()}</div></div>
              <div><div class="detail-label">Annual grants</div><div class="detail-val-mono">$${state.lifestyle.foundation.annualGrantsUSD.toLocaleString()}/yr</div></div>
            </div>
          `);
        } else {
          openModal("Establish family foundation", `
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
              Endow a charitable trust to establish lasting civic prestige ($500,000 endowment).
            </p>
            <button class="btn btn-primary btn-full" id="btnConfirmFoundation" type="button">Endow foundation ($500K)</button>
          `);
          document.getElementById("btnConfirmFoundation")?.addEventListener("click", () => {
            const res = establishPhilanthropicFoundation(state, "Global Heritage Foundation", 500000);
            closeModal();
            showToast(res.message, res.success ? "celebrate" : "error");
            rerenderCallback();
          });
        }
      } else if (sysId === "board_seats") {
        openModal("Independent board directorships", `
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
            Join corporate boards to collect $350,000 annual retainers.
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="surface-box" style="padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <div style="font-size: 15px;">Apex Silicon Systems</div>
                <div class="mono-val" style="font-size: 13px;">$350,000/yr</div>
              </div>
              <button class="btn btn-primary btn-sm btn-join-board" data-ticker="APEX" type="button" style="margin-top: 8px;">
                Accept seat
              </button>
            </div>
            <div class="surface-box" style="padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <div style="font-size: 15px;">Morgan Global Capital</div>
                <div class="mono-val" style="font-size: 13px;">$350,000/yr</div>
              </div>
              <button class="btn btn-primary btn-sm btn-join-board" data-ticker="MORG" type="button" style="margin-top: 8px;">
                Accept seat
              </button>
            </div>
          </div>
        `);
        document.querySelectorAll(".btn-join-board").forEach(b => {
          b.addEventListener("click", () => {
            const res = obtainBoardSeat(state, b.dataset.ticker);
            closeModal();
            showToast(res.message, res.success ? "celebrate" : "error");
            rerenderCallback();
          });
        });
      } else if (sysId === "patents") {
        openModal("File frontier research patent", `
          <div class="input-group">
            <label class="input-label">Patent title</label>
            <input type="text" id="inputPatentTitle" class="input-field" value="Quantum Annealing Architecture">
          </div>
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
            Filing and examination costs $75,000. Generates annual royalties for 20 years.
          </p>
          <button class="btn btn-primary btn-full" id="btnConfirmPatent" type="button">File patent ($75K)</button>
        `);
        document.getElementById("btnConfirmPatent")?.addEventListener("click", () => {
          const title = document.getElementById("inputPatentTitle").value || "Patent";
          const res = filePatent(state, title, "Deep Tech");
          closeModal();
          showToast(res.message, res.success ? "celebrate" : "error");
          rerenderCallback();
        });
      } else if (sysId === "tax_havens") {
        openModal("Relocate to sovereign tax haven", `
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">
            Eliminate personal income and capital gains taxes legally.
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn btn-outline btn-full btn-haven-select" data-h="monaco" type="button">Monaco ($500,000 deposit)</button>
            <button class="btn btn-outline btn-full btn-haven-select" data-h="dubai" type="button">Dubai, UAE ($150,000 golden visa)</button>
            <button class="btn btn-outline btn-full btn-haven-select" data-h="singapore" type="button">Singapore ($250,000 family office)</button>
          </div>
        `);
        document.querySelectorAll(".btn-haven-select").forEach(b => {
          b.addEventListener("click", () => {
            const res = relocateToTaxHaven(state, b.dataset.h);
            closeModal();
            showToast(res.message, res.success ? "celebrate" : "error");
            rerenderCallback();
          });
        });
      } else if (sysId === "biohacking") {
        openModal("Longevity and biohacking", `
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div class="list-row">
              <div>
                <div style="font-size: 15px;">Cryotherapy & diagnostics</div>
                <div style="font-size: 13px; color: var(--text-tertiary);">+3 years life expectancy · $35,000</div>
              </div>
              <button class="btn btn-outline btn-sm btn-bio-step" data-tier="1" type="button">Undergo</button>
            </div>
            <div class="list-row">
              <div>
                <div style="font-size: 15px;">Concierge peptides</div>
                <div style="font-size: 13px; color: var(--text-tertiary);">+5 years life expectancy · $120,000</div>
              </div>
              <button class="btn btn-outline btn-sm btn-bio-step" data-tier="2" type="button">Undergo</button>
            </div>
            <div class="list-row">
              <div>
                <div style="font-size: 15px;">Stem cell therapy</div>
                <div style="font-size: 13px; color: var(--text-tertiary);">+8 years life expectancy · $350,000</div>
              </div>
              <button class="btn btn-outline btn-sm btn-bio-step" data-tier="3" type="button">Undergo</button>
            </div>
            <div class="list-row">
              <div>
                <div style="font-size: 15px;">Telomere reprogramming</div>
                <div style="font-size: 13px; color: var(--text-tertiary);">+12 years life expectancy · $1,000,000</div>
              </div>
              <button class="btn btn-outline btn-sm btn-bio-step" data-tier="4" type="button">Undergo</button>
            </div>
          </div>
        `);
        document.querySelectorAll(".btn-bio-step").forEach(b => {
          b.addEventListener("click", () => {
            const res = upgradeBiohackingLongevity(state, parseInt(b.dataset.tier));
            closeModal();
            showToast(res.message, res.success ? "celebrate" : "error");
            rerenderCallback();
          });
        });
      } else if (sysId === "dynasty_trust") {
        const res = establishDynastyTrust(state);
        showToast(res.message, res.success ? "celebrate" : "error");
        rerenderCallback();
      }
    });
  });
}
