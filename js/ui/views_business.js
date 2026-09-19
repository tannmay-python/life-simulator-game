// Business UI View: 120-Catalog, Enterprise Cockpit, 3-Statement Financials, Fundraising & Boardroom

import { BUSINESS_SECTORS, CAPITAL_TIERS, BUSINESS_CATALOG, ECONOMIC_ENGINES } from "../data/businesses_data.js";
import { FUNDING_SOURCES, calculateFounderPitchScore, generateTermSheets, negotiateTermSheet, executeFinancingRound } from "../systems/fundraising_engine.js";
import { executeCoupDefense } from "../systems/governance_engine.js";
import { reallocateAttentionUnits, SCALE_TIERS } from "../systems/org_engine.js";

let currentSubTab = "enterprises"; // enterprises, catalog, financials, fundraising, boardroom, org
let catalogSectorFilter = "all";
let catalogTierFilter = "all";
let activeBizIndex = 0;

export function renderBusinessTab(vc, G, helpers) {
  const age = G.char.age;
  const { toast, updateHeader, renderCurrentTab } = helpers;

  if (age < 18) {
    vc.innerHTML = `
      <div class="surface-box" style="text-align: center; padding: 36px 24px;">
        <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">Commercial enterprise locked</div>
        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.55; max-width: 440px; margin: 0 auto 20px;">
          Under commercial corporate law, founding a registered company, managing corporate treasury, and executing legal contracts requires adulthood (Age 18+).
        </p>
        <div class="detail-grid" style="max-width: 340px; margin: 0 auto; text-align: left;">
          <div>
            <div class="detail-label">Current age</div>
            <div class="detail-val-mono">${age}</div>
          </div>
          <div>
            <div class="detail-label">Years to incorporation</div>
            <div class="detail-val-mono">${18 - age}</div>
          </div>
          <div>
            <div class="detail-label">Childhood cash</div>
            <div class="detail-val-mono">$${G.fin.cash.toLocaleString()}</div>
          </div>
          <div>
            <div class="detail-label">Family wealth</div>
            <div class="detail-val" style="text-transform: capitalize;">${G.char.familyWealth.replace("_", " ")}</div>
          </div>
        </div>
      </div>
    `;
    return;
  }

  if (!G.biz) G.biz = [];
  if (activeBizIndex >= G.biz.length) activeBizIndex = 0;
  const currentBiz = G.biz[activeBizIndex];

  // Sub-Navigation Bar
  const subNavHtml = `
    <div class="subtabs-bar">
      <button class="subtab-btn ${currentSubTab === 'enterprises' ? 'active' : ''} btn-biz-subtab" data-tab="enterprises" type="button">Portfolio (${G.biz.length})</button>
      <button class="subtab-btn ${currentSubTab === 'catalog' ? 'active' : ''} btn-biz-subtab" data-tab="catalog" type="button">Catalog (120)</button>
      ${currentBiz ? `
        <button class="subtab-btn ${currentSubTab === 'financials' ? 'active' : ''} btn-biz-subtab" data-tab="financials" type="button">Financials</button>
        <button class="subtab-btn ${currentSubTab === 'fundraising' ? 'active' : ''} btn-biz-subtab" data-tab="fundraising" type="button">Funding</button>
        <button class="subtab-btn ${currentSubTab === 'boardroom' ? 'active' : ''} btn-biz-subtab" data-tab="boardroom" type="button">Board</button>
        <button class="subtab-btn ${currentSubTab === 'org' ? 'active' : ''} btn-biz-subtab" data-tab="org" type="button">Org</button>
      ` : ''}
    </div>
  `;

  let bodyHtml = "";

  // 1. ENTERPRISES / PORTFOLIO SUBTAB
  if (currentSubTab === "enterprises") {
    if (G.biz.length === 0) {
      bodyHtml = `
        <div class="surface-box" style="text-align: center; padding: 36px 24px;">
          <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">No operating companies</div>
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.55; max-width: 420px; margin: 0 auto 20px;">
            Incorporate a venture from the 120-business catalog spanning 12 sectors and capital tiers from $500 to $2B+.
          </p>
          <button class="btn btn-primary btn-go-catalog" type="button">Browse catalog</button>
        </div>
      `;
    } else {
      bodyHtml = `
        <!-- Enterprise Switcher -->
        ${G.biz.length > 1 ? `
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 12px;">
            ${G.biz.map((b, i) => `
              <button class="subtab-btn ${i === activeBizIndex ? 'active' : ''} btn-switch-biz" data-idx="${i}" type="button" style="font-size: 12px; padding: 4px 10px;">
                ${b.name}
              </button>
            `).join("")}
          </div>
        ` : ''}

        <!-- Active Enterprise Overview -->
        <h2 class="section-heading first">${currentBiz.name}</h2>
        <div class="detail-grid">
          <div>
            <div class="detail-label">Valuation</div>
            <div class="detail-val-mono">$${currentBiz.valuationUSD.toLocaleString()}</div>
          </div>
          <div>
            <div class="detail-label">Annual revenue</div>
            <div class="detail-val-mono">$${currentBiz.annualRevenueUSD.toLocaleString()}</div>
          </div>
          <div>
            <div class="detail-label">Net income</div>
            <div class="detail-val-mono">$${currentBiz.netProfitUSD.toLocaleString()}</div>
          </div>
          <div>
            <div class="detail-label">Treasury cash</div>
            <div class="detail-val-mono">$${currentBiz.treasuryUSD.toLocaleString()}</div>
          </div>
          <div>
            <div class="detail-label">Founder equity</div>
            <div class="detail-val-mono">${currentBiz.founderEquityPct}%</div>
          </div>
          <div>
            <div class="detail-label">Scale tier</div>
            <div class="detail-val" style="text-transform: capitalize;">Tier ${currentBiz.capitalTier} · ${currentBiz.org?.scaleTier || 'micro'}</div>
          </div>
        </div>

        ${currentBiz.inRestructuring ? `
          <div class="surface-box" style="margin-top: 16px; padding: 14px;">
            <div style="font-size: 13px; font-weight: 500;">Restructuring notice</div>
            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">
              Treasury cash exhausted. Liquidate assets, raise rescue financing, or inject personal cash to avert liquidation.
            </p>
          </div>
        ` : ''}

        <!-- Operational Actions -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px;">
          <button class="btn btn-outline btn-sm btn-biz-expand" data-idx="${activeBizIndex}" type="button">
            Expand scale ($${Math.round(currentBiz.valuationUSD * 0.08).toLocaleString()})
          </button>
          <button class="btn btn-outline btn-sm btn-biz-dividend" data-idx="${activeBizIndex}" type="button">
            Distribute dividend ($${Math.round(Math.max(0, currentBiz.treasuryUSD) * 0.3).toLocaleString()})
          </button>
          <button class="btn btn-outline btn-sm btn-biz-inject" data-idx="${activeBizIndex}" type="button">
            Inject personal cash
          </button>
          <button class="btn btn-outline btn-sm btn-biz-sell" data-idx="${activeBizIndex}" type="button" style="color: var(--text-tertiary);">
            M&A exit
          </button>
        </div>
      `;
    }
  }

  // 2. CATALOG SUBTAB (120 Businesses)
  else if (currentSubTab === "catalog") {
    const sectors = [
      "all",
      "Software & Deep Tech",
      "Consumer Internet & Marketplaces",
      "Food, Hospitality & Franchising",
      "High-End Professional Services",
      "Media, Creator & Entertainment",
      "Industrial & Advanced Manufacturing",
      "BioTech & Healthcare Systems",
      "Financial Institutions & Asset Mgmt",
      "Supply Chain, Freight & Maritime",
      "Real Estate Development & REITS",
      "Energy Transition & Natural Resources",
      "Sovereign Scale & Frontier Mega-Projects"
    ];

    const tiers = ["all", "A", "B", "C", "D", "E", "F", "G"];

    const filteredCatalog = BUSINESS_CATALOG.filter(b => {
      const matchSec = catalogSectorFilter === "all" || b.sector === catalogSectorFilter;
      const matchTier = catalogTierFilter === "all" || b.capitalTier === catalogTierFilter;
      return matchSec && matchTier;
    });

    bodyHtml = `
      <h2 class="section-heading first">Sector filter</h2>
      <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 12px;">
        ${sectors.map(s => {
          const shortName = s === 'all' ? 'All sectors' : s.split("&")[0].trim();
          return `
            <button class="subtab-btn ${catalogSectorFilter === s ? 'active' : ''} btn-sec-filter" data-sec="${s}" type="button" style="font-size: 12px; padding: 4px 10px;">
              ${shortName}
            </button>
          `;
        }).join("")}
      </div>

      <h2 class="section-heading">Capital tier</h2>
      <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 16px;">
        ${tiers.map(t => `
          <button class="subtab-btn ${catalogTierFilter === t ? 'active' : ''} btn-tier-filter" data-tier="${t}" type="button" style="font-size: 12px; padding: 4px 10px;">
            ${t === 'all' ? 'All tiers' : `Tier ${t}`}
          </button>
        `).join("")}
      </div>

      <h2 class="section-heading">Catalog (${filteredCatalog.length})</h2>
      <div>
        ${filteredCatalog.map(b => `
          <div class="list-row">
            <div class="list-row-left">
              <div style="font-size: 15px;">${b.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                ${b.sector.split("&")[0].trim()} · Tier ${b.capitalTier} · Margin <span style="font-family: var(--font-mono);">${Math.round(b.margin * 100)}%</span>
              </div>
              <div style="font-size: 13px; color: var(--text-secondary); margin-top: 3px;">
                ${b.desc}
              </div>
            </div>
            <div class="list-row-right">
              <div class="mono-val" style="font-size: 14px; margin-bottom: 4px;">
                $${b.startupCost.toLocaleString()}
              </div>
              <button class="btn btn-outline btn-sm btn-found-biz" data-id="${b.id}" type="button">
                Found
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 3. FINANCIALS SUBTAB
  else if (currentSubTab === "financials" && currentBiz) {
    const fin = currentBiz.lastFinancials || {};
    const pnl = fin.pnl || {
      grossRevenue: currentBiz.annualRevenueUSD,
      returnsAndDiscounts: Math.round(currentBiz.annualRevenueUSD * 0.02),
      netRevenue: Math.round(currentBiz.annualRevenueUSD * 0.98),
      cogs: Math.round(currentBiz.annualRevenueUSD * 0.4),
      grossProfit: Math.round(currentBiz.annualRevenueUSD * 0.58),
      totalOpex: Math.round(currentBiz.annualRevenueUSD * 0.35),
      ebitda: currentBiz.ebitdaUSD,
      depreciation: Math.round(currentBiz.ebitdaUSD * 0.15),
      ebit: Math.round(currentBiz.ebitdaUSD * 0.85),
      interestExpense: 0,
      ebt: Math.round(currentBiz.ebitdaUSD * 0.85),
      taxExpense: Math.round(currentBiz.ebitdaUSD * 0.18),
      netIncome: currentBiz.netProfitUSD
    };

    const bs = fin.balanceSheet || {
      cash: currentBiz.treasuryUSD,
      ar: currentBiz.accountsReceivableUSD,
      inventory: currentBiz.inventoryUSD,
      fixedAssets: currentBiz.fixedAssetsUSD,
      ipAssets: currentBiz.ipAssetsUSD,
      totalAssets: currentBiz.treasuryUSD + currentBiz.accountsReceivableUSD + currentBiz.inventoryUSD + currentBiz.fixedAssetsUSD + currentBiz.ipAssetsUSD,
      ap: currentBiz.accountsPayableUSD,
      shortTermDebt: currentBiz.shortTermDebtUSD,
      longTermDebt: currentBiz.longTermDebtUSD,
      totalLiabilities: currentBiz.accountsPayableUSD + currentBiz.shortTermDebtUSD + currentBiz.longTermDebtUSD,
      paidInCapital: currentBiz.paidInCapitalUSD,
      retainedEarnings: currentBiz.retainedEarningsUSD,
      stockholdersEquity: (currentBiz.paidInCapitalUSD || 0) + (currentBiz.retainedEarningsUSD || 0)
    };

    bodyHtml = `
      <h2 class="section-heading first">Income statement</h2>
      <div style="display: flex; flex-direction: column;">
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px;">Gross revenue</span></div><div class="mono-val">$${pnl.grossRevenue.toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px; color: var(--text-secondary);">Cost of goods sold (COGS)</span></div><div class="mono-val">-$${pnl.cogs.toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px;">Gross profit</span></div><div class="mono-val">$${pnl.grossProfit.toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px; color: var(--text-secondary);">Operating expenses (OPEX)</span></div><div class="mono-val">-$${pnl.totalOpex.toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px;">EBITDA</span></div><div class="mono-val">$${pnl.ebitda.toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px; color: var(--text-secondary);">Depreciation & taxes</span></div><div class="mono-val">-$${(pnl.depreciation + pnl.taxExpense).toLocaleString()}</div></div>
        <div class="list-row" style="border-top: 1px solid rgba(22,21,15,0.20);"><div class="list-row-left"><span style="font-size: 15px; font-weight: 500;">Net income</span></div><div class="mono-val" style="font-weight: 500;">$${pnl.netIncome.toLocaleString()}</div></div>
      </div>

      <h2 class="section-heading">Balance sheet</h2>
      <div style="display: flex; flex-direction: column;">
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px;">Cash & treasury</span></div><div class="mono-val">$${bs.cash.toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px;">Accounts receivable & inventory</span></div><div class="mono-val">$${(bs.ar + bs.inventory).toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px;">PP&E & IP assets</span></div><div class="mono-val">$${(bs.fixedAssets + bs.ipAssets).toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px; font-weight: 500;">Total assets</span></div><div class="mono-val" style="font-weight: 500;">$${bs.totalAssets.toLocaleString()}</div></div>
        <div class="list-row"><div class="list-row-left"><span style="font-size: 15px; color: var(--text-secondary);">Total liabilities (debt & payables)</span></div><div class="mono-val">-$${bs.totalLiabilities.toLocaleString()}</div></div>
        <div class="list-row" style="border-top: 1px solid rgba(22,21,15,0.20);"><div class="list-row-left"><span style="font-size: 15px; font-weight: 500;">Stockholders' equity</span></div><div class="mono-val" style="font-weight: 500;">$${bs.stockholdersEquity.toLocaleString()}</div></div>
      </div>
    `;
  }

  // 4. FUNDRAISING SUBTAB
  else if (currentSubTab === "fundraising" && currentBiz) {
    const pitchScore = calculateFounderPitchScore(G, currentBiz);

    bodyHtml = `
      <h2 class="section-heading first">Founder pitch readiness</h2>
      <div class="detail-grid">
        <div>
          <div class="detail-label">Pitch score</div>
          <div class="detail-val-mono">${pitchScore}</div>
        </div>
        <div>
          <div class="detail-label">Current equity</div>
          <div class="detail-val-mono">${currentBiz.founderEquityPct}%</div>
        </div>
        <div>
          <div class="detail-label">Founder smarts</div>
          <div class="detail-val-mono">${G.stats.smarts}</div>
        </div>
        <div>
          <div class="detail-label">Prestige</div>
          <div class="detail-val-mono">${G.stats.prestige}</div>
        </div>
      </div>

      <h2 class="section-heading">Capital sources</h2>
      <div>
        ${FUNDING_SOURCES.map(s => `
          <div class="list-row">
            <div class="list-row-left">
              <div style="font-size: 15px;">${s.name} <span style="font-size: 12px; color: var(--text-tertiary);">· ${s.tier}</span></div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${s.desc}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                Check: <span style="font-family: var(--font-mono);">$${s.minCheck.toLocaleString()} – $${s.maxCheck.toLocaleString()}</span>
              </div>
            </div>
            <div class="list-row-right">
              <button class="btn btn-outline btn-sm btn-solicit-terms" data-sid="${s.id}" type="button">
                Solicit terms
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 5. BOARDROOM SUBTAB
  else if (currentSubTab === "boardroom" && currentBiz) {
    const seats = currentBiz.board?.seats || [
      { id: "founder", title: "Founder & CEO", votes: 1, type: "founder", loyalty: 100, agenda: "growth" }
    ];

    bodyHtml = `
      <h2 class="section-heading first">Board of directors</h2>
      ${currentBiz.board?.coupThreat ? `
        <div class="surface-box" style="margin-bottom: 20px; padding: 16px;">
          <div style="font-size: 15px; font-weight: 500;">Hostile boardroom challenge</div>
          <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${currentBiz.board.coupReason}</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px;">
            <button class="btn btn-outline btn-sm btn-coup-def" data-lever="lobby_swing_vote" type="button">Lobby swing vote</button>
            <button class="btn btn-outline btn-sm btn-coup-def" data-lever="dual_class_defense" type="button">Invoke class-B defense</button>
            <button class="btn btn-outline btn-sm btn-coup-def" data-lever="personal_cash_injection" type="button">Inject cash</button>
          </div>
        </div>
      ` : ''}

      <div>
        ${seats.map(s => `
          <div class="list-row">
            <div class="list-row-left">
              <div style="font-size: 15px;">${s.title}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                Agenda: ${s.agenda} · Votes: ${s.votes}
              </div>
            </div>
            <div class="list-row-right">
              <div class="mono-val" style="font-size: 14px;">${s.loyalty}%</div>
              <div style="font-size: 12px; color: var(--text-tertiary);">Loyalty</div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 6. ORG & ATTENTION UNITS SUBTAB
  else if (currentSubTab === "org" && currentBiz) {
    const org = currentBiz.org || { scaleTier: "micro", allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 }, techDebt: 5, qaDeficit: 5, regulatoryExposure: 5, morale: 90 };

    bodyHtml = `
      <h2 class="section-heading first">Attention allocation (100 AU)</h2>
      <div style="display: flex; flex-direction: column;">
        ${Object.entries(org.allocatedAU || {}).map(([k, v]) => `
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 0; border-bottom: 1px solid var(--hairline);">
            <span style="font-size: 14px; width: 140px; text-transform: capitalize;">${k}</span>
            <input type="range" class="inp-au" data-k="${k}" min="0" max="60" value="${v}" style="flex: 1; accent-color: var(--ink); cursor: pointer;" />
            <span class="mono-val" style="width: 45px; text-align: right; font-size: 13px;">${v} AU</span>
          </div>
        `).join("")}
      </div>
      <div style="margin-top: 16px;">
        <button class="btn btn-primary btn-save-au" type="button">Save allocation</button>
      </div>
    `;
  }

  vc.innerHTML = `
    <div class="business-view">
      ${subNavHtml}
      ${bodyHtml}
    </div>
  `;

  // Attach Listeners
  // 1. Subtab Switching
  document.querySelectorAll(".btn-biz-subtab").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSubTab = btn.dataset.tab;
      renderCurrentTab();
    });
  });

  // Switch Active Enterprise
  document.querySelectorAll(".btn-switch-biz").forEach(btn => {
    btn.addEventListener("click", () => {
      activeBizIndex = parseInt(btn.dataset.idx);
      renderCurrentTab();
    });
  });

  // Go to Catalog Button
  const btnGoCat = document.querySelector(".btn-go-catalog");
  if (btnGoCat) {
    btnGoCat.addEventListener("click", () => {
      currentSubTab = "catalog";
      renderCurrentTab();
    });
  }

  // Filter Buttons
  document.querySelectorAll(".btn-sec-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      catalogSectorFilter = btn.dataset.sec;
      renderCurrentTab();
    });
  });

  document.querySelectorAll(".btn-tier-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      catalogTierFilter = btn.dataset.tier;
      renderCurrentTab();
    });
  });

  // Found Business
  document.querySelectorAll(".btn-found-biz").forEach(btn => {
    btn.addEventListener("click", () => {
      const bid = btn.dataset.id;
      const bizTemplate = BUSINESS_CATALOG.find(b => b.id === bid);
      if (!bizTemplate) return;

      if (G.fin.cash < bizTemplate.startupCost) {
        toast(`Insufficient cash ($${bizTemplate.startupCost.toLocaleString()} required)`, "error");
        return;
      }

      G.fin.cash -= bizTemplate.startupCost;
      const newVenture = {
        id: "biz_" + Date.now(),
        templateId: bizTemplate.id,
        name: bizTemplate.name,
        sector: bizTemplate.sector,
        capitalTier: bizTemplate.capitalTier,
        yearsActive: 1,
        valuationUSD: Math.round(bizTemplate.startupCost * 2.5),
        annualRevenueUSD: Math.round(bizTemplate.startupCost * 0.8),
        netProfitUSD: Math.round(bizTemplate.startupCost * 0.8 * bizTemplate.margin),
        ebitdaUSD: Math.round(bizTemplate.startupCost * 0.8 * (bizTemplate.margin + 0.05)),
        treasuryUSD: Math.round(bizTemplate.startupCost * 0.25),
        founderEquityPct: 100,
        board: {
          seats: [
            { id: "founder", title: "Founder & CEO", votes: 1, type: "founder", loyalty: 100, agenda: "growth" }
          ],
          coupThreat: false
        },
        org: {
          scaleTier: "micro",
          allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 }
        }
      };

      G.biz.push(newVenture);
      activeBizIndex = G.biz.length - 1;
      currentSubTab = "enterprises";
      toast(`Incorporated ${newVenture.name}`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });
  });

  // Business Expand
  document.querySelectorAll(".btn-biz-expand").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      const b = G.biz[idx];
      const cost = Math.round(b.valuationUSD * 0.08);

      if (b.treasuryUSD < cost) {
        toast(`Insufficient treasury cash ($${cost.toLocaleString()} required)`, "error");
        return;
      }

      b.treasuryUSD -= cost;
      b.annualRevenueUSD = Math.round(b.annualRevenueUSD * 1.35);
      b.netProfitUSD = Math.round(b.netProfitUSD * 1.35);
      b.valuationUSD = Math.round(b.valuationUSD * 1.35);
      toast(`Scale expanded. Valuation increased to $${b.valuationUSD.toLocaleString()}`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });
  });

  // Dividends
  document.querySelectorAll(".btn-biz-dividend").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      const b = G.biz[idx];
      const div = Math.round(Math.max(0, b.treasuryUSD) * 0.3 * (b.founderEquityPct / 100));

      if (div <= 0) {
        toast("No liquid treasury cash available for dividends", "error");
        return;
      }

      b.treasuryUSD -= div;
      G.fin.cash += div;
      toast(`Distributed $${div.toLocaleString()} dividend`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });
  });

  // Inject Personal Cash
  document.querySelectorAll(".btn-biz-inject").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      const b = G.biz[idx];
      const injectAmt = 50000;

      if (G.fin.cash < injectAmt) {
        toast(`Insufficient personal cash ($${injectAmt.toLocaleString()} required)`, "error");
        return;
      }

      G.fin.cash -= injectAmt;
      b.treasuryUSD += injectAmt;
      b.paidInCapitalUSD = (b.paidInCapitalUSD || 0) + injectAmt;
      if (b.inRestructuring && b.treasuryUSD > 0) b.inRestructuring = false;

      toast(`Injected $${injectAmt.toLocaleString()} personal cash into ${b.name}`, "celebrate");
      updateHeader();
      renderCurrentTab();
    });
  });

  // M&A Exit
  document.querySelectorAll(".btn-biz-sell").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      const b = G.biz[idx];
      const founderProceeds = Math.round(b.valuationUSD * (b.founderEquityPct / 100));

      if (confirm(`Accept buyout offer for ${b.name} at valuation $${b.valuationUSD.toLocaleString()}?\n\nProceeds: $${founderProceeds.toLocaleString()} personal cash.`)) {
        G.fin.cash += founderProceeds;
        if (!G.pastExits) G.pastExits = [];
        G.pastExits.push({ name: b.name, valuation: b.valuationUSD, proceeds: founderProceeds, year: G.char.age });
        G.biz.splice(idx, 1);
        toast(`Acquisition completed for $${founderProceeds.toLocaleString()}`, "celebrate");
        activeBizIndex = 0;
        updateHeader();
        renderCurrentTab();
      }
    });
  });

  // Coup Defense Levers
  document.querySelectorAll(".btn-coup-def").forEach(btn => {
    btn.addEventListener("click", () => {
      const lever = btn.dataset.lever;
      const res = executeCoupDefense(G, currentBiz, lever);
      if (res.success) {
        toast(res.message, "celebrate");
      } else {
        toast(res.message, "error");
      }
      updateHeader();
      renderCurrentTab();
    });
  });

  // Solicit Term Sheets Modal
  document.querySelectorAll(".btn-solicit-terms").forEach(btn => {
    btn.addEventListener("click", () => {
      const sid = btn.dataset.sid;
      const sheets = generateTermSheets(G, currentBiz, sid);
      showTermSheetsModal(sheets, currentBiz, G, helpers);
    });
  });

  // Save AU
  const btnSaveAU = document.querySelector(".btn-save-au");
  if (btnSaveAU) {
    btnSaveAU.addEventListener("click", () => {
      const newAU = {};
      document.querySelectorAll(".inp-au").forEach(inp => {
        newAU[inp.dataset.k] = parseInt(inp.value) || 0;
      });
      const res = reallocateAttentionUnits(currentBiz, newAU);
      if (res.success) {
        toast(res.message, "celebrate");
      } else {
        toast(res.message, "error");
      }
      renderCurrentTab();
    });
  }
}

/**
 * Interactive Term Sheet Negotiation Modal
 */
function showTermSheetsModal(sheets, biz, G, helpers) {
  const { openModal, closeModal, toast, updateHeader, renderCurrentTab } = helpers;

  let modalHtml = `
    <div style="font-size: 13px;">
      <p style="color: var(--text-secondary); margin-bottom: 16px;">
        Review competing investor term sheets for <strong>${biz.name}</strong>.
      </p>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${sheets.map((s, i) => `
          <div class="surface-box" style="padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
              <span style="font-weight: 500;">${s.investorName}</span>
              <span style="font-size: 12px; color: var(--text-tertiary);">${s.investorType}</span>
            </div>
            <div class="detail-grid" style="padding: 8px 0; margin-bottom: 12px;">
              <div>
                <div class="detail-label">Investment check</div>
                <div class="detail-val-mono">$${s.investmentCheckUSD.toLocaleString()}</div>
              </div>
              <div>
                <div class="detail-label">Pre-money valuation</div>
                <div class="detail-val-mono">$${s.preMoneyValuationUSD.toLocaleString()}</div>
              </div>
              <div>
                <div class="detail-label">Dilution</div>
                <div class="detail-val-mono">${s.postMoneyEquityPct}%</div>
              </div>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn btn-primary btn-sm btn-accept-sheet" data-idx="${i}" type="button">
                Accept deal
              </button>
              <button class="btn btn-outline btn-sm btn-counter-sheet" data-idx="${i}" type="button">
                Counter (+20% val)
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  openModal("Term sheet negotiations", modalHtml);

  document.querySelectorAll(".btn-accept-sheet").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      const accepted = sheets[idx];
      const res = executeFinancingRound(G, biz, accepted);
      closeModal();
      toast(res.message, "celebrate");
      updateHeader();
      renderCurrentTab();
    });
  });

  document.querySelectorAll(".btn-counter-sheet").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      const sheet = sheets[idx];
      const res = negotiateTermSheet(G, biz, sheet, 20);
      if (res.accepted) {
        sheets[idx] = res.revisedSheet;
        toast(res.message, "celebrate");
        showTermSheetsModal(sheets, biz, G, helpers);
      } else {
        toast(res.message, "error");
      }
    });
  });
}
