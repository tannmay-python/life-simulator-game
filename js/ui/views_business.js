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
      <div class="childhood-lock-box">
        <div class="childhood-lock-icon">💼</div>
        <div class="childhood-lock-title">Commercial Enterprise Locked (Age 18+)</div>
        <div class="childhood-lock-desc">
          Under commercial corporate law, founding a registered company, managing corporate treasury, and executing legal contracts requires adulthood (Age 18+).<br><br>
          <strong>Current Age: ${age}</strong> (${18 - age} years until legal incorporation eligibility).<br>
          During childhood, focus on school, building high Smarts, and saving your pocket money!
        </div>
        <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; font-size: 11px; text-align: left; margin-top: 10px;">
          <div style="font-weight: 700; margin-bottom: 4px; color: var(--accent-emerald);">💰 Childhood Piggy Bank:</div>
          <div>Wallet Cash: <strong>$${G.fin.cash.toLocaleString()}</strong></div>
          <div>Family Wealth Tier: <strong>${G.char.familyWealth.replace("_", " ").toUpperCase()}</strong></div>
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
    <div class="subtabs-bar" style="margin-bottom: 12px;">
      <button class="subtab-btn ${currentSubTab === 'enterprises' ? 'active' : ''} btn-biz-subtab" data-tab="enterprises">🏢 Companies (${G.biz.length})</button>
      <button class="subtab-btn ${currentSubTab === 'catalog' ? 'active' : ''} btn-biz-subtab" data-tab="catalog">🌐 Catalog (120)</button>
      ${currentBiz ? `
        <button class="subtab-btn ${currentSubTab === 'financials' ? 'active' : ''} btn-biz-subtab" data-tab="financials">📊 Financials</button>
        <button class="subtab-btn ${currentSubTab === 'fundraising' ? 'active' : ''} btn-biz-subtab" data-tab="fundraising">🚀 Funding</button>
        <button class="subtab-btn ${currentSubTab === 'boardroom' ? 'active' : ''} btn-biz-subtab" data-tab="boardroom">🏛️ Board</button>
        <button class="subtab-btn ${currentSubTab === 'org' ? 'active' : ''} btn-biz-subtab" data-tab="org">👥 Org & AU</button>
      ` : ''}
    </div>
  `;

  let bodyHtml = "";

  // 1. ENTERPRISES SUBTAB
  if (currentSubTab === "enterprises") {
    if (G.biz.length === 0) {
      bodyHtml = `
        <div class="card" style="text-align: center; padding: 24px;">
          <div style="font-size: 36px; margin-bottom: 8px;">🏭</div>
          <h3 style="font-size: 15px; margin-bottom: 6px;">No Active Operating Companies</h3>
          <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 16px;">
            Incorporate a venture from the 120-business catalog spanning 12 sectors and capital tiers A ($500) to G ($1B+).
          </p>
          <button class="btn btn-primary btn-sm btn-go-catalog">Browse 120 Businesses ➔</button>
        </div>
      `;
    } else {
      bodyHtml = `
        <!-- Enterprise Switcher -->
        ${G.biz.length > 1 ? `
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px;">
            ${G.biz.map((b, i) => `
              <button class="btn btn-sm ${i === activeBizIndex ? 'btn-primary' : ''} btn-switch-biz" data-idx="${i}" style="white-space: nowrap; font-size: 11px;">
                ${b.icon} ${b.name}
              </button>
            `).join("")}
          </div>
        ` : ''}

        <!-- Active Enterprise Cockpit -->
        <div class="card" style="border-left: 3px solid var(--accent-emerald);">
          <div class="card-title-row">
            <div class="card-title">
              <span>${currentBiz.icon}</span> ${currentBiz.name}
              <span class="pill-badge blue" style="font-size: 8px; margin-left: 6px;">Tier ${currentBiz.capitalTier}</span>
              <span class="pill-badge emerald" style="font-size: 8px;">${(currentBiz.org?.scaleTier || 'micro').toUpperCase()}</span>
            </div>
            <div style="font-size: 13px; font-weight: 800; color: var(--accent-emerald);">
              $${currentBiz.valuationUSD.toLocaleString()}
            </div>
          </div>

          <!-- Restructuring Alert if Insolvent -->
          ${currentBiz.inRestructuring ? `
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid var(--accent-rose); border-radius: 8px; padding: 8px; font-size: 10px; color: #fca5a5; margin-bottom: 10px;">
              🚨 <strong>Chapter 11 Restructuring Notice:</strong> Operating cash exhausted. Liquidate assets, raise rescue debt, or inject personal cash to avert liquidation!
            </div>
          ` : ''}

          <!-- Coup Threat Alert -->
          ${currentBiz.board?.coupThreat ? `
            <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid var(--accent-amber); border-radius: 8px; padding: 8px; font-size: 10px; color: #fde68a; margin-bottom: 10px;">
              ⚠️ <strong>Boardroom Coup Imminent!</strong> ${currentBiz.board.coupReason}
              <div style="margin-top: 6px;">
                <button class="btn btn-sm btn-primary btn-goto-board" style="background: var(--accent-amber); color: #000; font-weight: 700;">Open Boardroom Chamber ➔</button>
              </div>
            </div>
          ` : ''}

          <!-- Headline Financial Metrics Strip -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 10px; text-align: center;">
            <div>
              <div style="color: var(--text-secondary);">Revenue</div>
              <div style="font-weight: 700;">$${currentBiz.annualRevenueUSD.toLocaleString()}</div>
            </div>
            <div>
              <div style="color: var(--text-secondary);">Net Profit</div>
              <div style="font-weight: 700; color: ${currentBiz.netProfitUSD >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                $${currentBiz.netProfitUSD.toLocaleString()}
              </div>
            </div>
            <div>
              <div style="color: var(--text-secondary);">Treasury Cash</div>
              <div style="font-weight: 700; color: ${currentBiz.treasuryUSD >= 0 ? '#60a5fa' : 'var(--accent-rose)'};">
                $${currentBiz.treasuryUSD.toLocaleString()}
              </div>
            </div>
          </div>

          <!-- Dynamic Economic Engine KPI Ribbon -->
          <div style="margin-bottom: 12px;">
            <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 4px;">
              ⚡ Live Economic Engine Telemetry (${(currentBiz.boundEngines || []).length} Sub-Engines)
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
              ${Object.entries(currentBiz.kpis || {}).map(([key, val]) => `
                <div style="background: var(--bg-subtle); padding: 6px 8px; border-radius: 6px; font-size: 10px; display: flex; justify-content: space-between;">
                  <span style="color: var(--text-secondary);">${key}:</span>
                  <strong style="color: #fff;">${val}</strong>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Operational Levers Bar -->
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button class="btn btn-sm btn-biz-expand" data-idx="${activeBizIndex}">
              📈 Expand Scale ($${Math.round(currentBiz.valuationUSD * 0.08).toLocaleString()})
            </button>
            <button class="btn btn-sm btn-biz-dividend" data-idx="${activeBizIndex}">
              💰 Dividend ($${Math.round(Math.max(0, currentBiz.treasuryUSD) * 0.3).toLocaleString()})
            </button>
            <button class="btn btn-sm btn-biz-inject" data-idx="${activeBizIndex}">
              💵 Inject Cash
            </button>
            <button class="btn btn-sm btn-biz-sell" data-idx="${activeBizIndex}" style="color: var(--accent-rose);">
              🤝 M&A Exit
            </button>
          </div>
        </div>
      `;
    }
  }

  // 2. CATALOG SUBTAB (120 Businesses)
  else if (currentSubTab === "catalog") {
    const sectors = ["all", ...BUSINESS_SECTORS.map(s => s.name)];
    const tiers = ["all", "A", "B", "C", "D", "E", "F", "G"];

    const filteredCatalog = BUSINESS_CATALOG.filter(b => {
      const matchSec = catalogSectorFilter === "all" || b.sector === catalogSectorFilter;
      const matchTier = catalogTierFilter === "all" || b.capitalTier === catalogTierFilter;
      return matchSec && matchTier;
    });

    bodyHtml = `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🌐</span> 120-Business Catalog</div>
          <span style="font-size: 11px; color: var(--text-secondary);">${filteredCatalog.length} Matching</span>
        </div>

        <!-- Sector Filter Pills -->
        <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 6px;">
          ${sectors.map(s => `
            <button class="subtab-btn ${catalogSectorFilter === s ? 'active' : ''} btn-sec-filter" data-sec="${s}" style="font-size: 9px; padding: 4px 6px; white-space: nowrap;">
              ${s === 'all' ? 'All Sectors' : s.split(" ")[0]}
            </button>
          `).join("")}
        </div>

        <!-- Capital Tier Filter Pills -->
        <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 10px;">
          ${tiers.map(t => `
            <button class="subtab-btn ${catalogTierFilter === t ? 'active' : ''} btn-tier-filter" data-tier="${t}" style="font-size: 9px; padding: 4px 8px;">
              ${t === 'all' ? 'All Tiers (A-G)' : `Tier ${t}`}
            </button>
          `).join("")}
        </div>

        <!-- Catalog List Container -->
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 480px; overflow-y: auto;">
          ${filteredCatalog.map(b => `
            <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 4px; background: var(--bg-subtle); padding: 8px; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 18px;">${b.icon}</span>
                  <div>
                    <h4 style="font-size: 12px; margin: 0;">${b.name}</h4>
                    <div style="display: flex; gap: 4px; align-items: center; margin-top: 2px;">
                      <span class="pill-badge blue" style="font-size: 8px;">${b.sector}</span>
                      <span class="pill-badge purple" style="font-size: 8px;">Tier ${b.capitalTier}</span>
                    </div>
                  </div>
                </div>
                <button class="btn btn-sm btn-primary btn-found-biz" data-id="${b.id}" style="font-size: 10px; padding: 4px 8px;">
                  Found ($${b.startupCost.toLocaleString()})
                </button>
              </div>
              <p style="font-size: 10px; color: var(--text-secondary); margin: 4px 0 0 0;">
                ${b.desc}
              </p>
              <div style="font-size: 9px; color: var(--accent-emerald); display: flex; gap: 8px; margin-top: 2px;">
                <span>Margin: ${Math.round(b.margin * 100)}%</span>
                <span>Exit: ${b.multiple}x EBITDA</span>
                <span>Min Smarts: ${b.minSmarts}</span>
                <span>Engines: ${b.boundEngines.length}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // 3. FINANCIALS SUBTAB (GAAP 3-Statement Explorer)
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

    const cf = fin.cashFlow || { cfo: currentBiz.netProfitUSD, cfi: -50000, cff: 0, capex: 50000, netCashFlow: currentBiz.netProfitUSD - 50000 };
    const wc = fin.workingCapital || { dso: 30, dio: 30, dpo: 30, ccc: 30 };

    bodyHtml = `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>📊</span> GAAP Financial Statements</div>
          <span style="font-size: 11px; color: var(--accent-emerald);">Fiscal Year ${currentBiz.yearsActive}</span>
        </div>

        <!-- Working Capital & Cash Conversion Cycle Strip -->
        <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
          <div style="font-weight: 700; margin-bottom: 4px; color: #60a5fa;">⏱️ Cash Conversion Cycle (CCC): ${wc.ccc} Days</div>
          <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
            <span>DIO: ${wc.dio}d (Inventory)</span>
            <span>+ DSO: ${wc.dso}d (Receivables)</span>
            <span>- DPO: ${wc.dpo}d (Payables)</span>
          </div>
        </div>

        <!-- 1. P&L Statement -->
        <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">1. Income Statement (P&L)</div>
        <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between;"><span>Gross Revenue:</span><span>$${pnl.grossRevenue.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Less: Returns & Discounts:</span><span>-$${pnl.returnsAndDiscounts.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>Net Revenue:</span><span>$${pnl.netRevenue.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; color: var(--accent-rose);"><span>Cost of Goods Sold (COGS):</span><span>-$${pnl.cogs.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--accent-emerald);"><span>Gross Profit:</span><span>$${pnl.grossProfit.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Operating Expenses (OPEX):</span><span>-$${pnl.totalOpex.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>EBITDA:</span><span>$${pnl.ebitda.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Depreciation & Amortization:</span><span>-$${pnl.depreciation.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 700;"><span>Operating EBIT:</span><span>$${pnl.ebit.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; color: var(--text-secondary);"><span>Interest & Taxes:</span><span>-$${(pnl.interestExpense + pnl.taxExpense).toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 4px; color: ${pnl.netIncome >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
            <span>Net Income:</span><span>$${pnl.netIncome.toLocaleString()}</span>
          </div>
        </div>

        <!-- 2. Balance Sheet Identity -->
        <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">2. Balance Sheet Identity (Assets ≡ Liabilities + Equity)</div>
        <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
          <div style="font-weight: 700; color: #60a5fa;">Assets:</div>
          <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Cash & Equivalents:</span><span>$${bs.cash.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Accounts Receivable (AR):</span><span>$${bs.ar.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Inventory:</span><span>$${bs.inventory.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>PP&E + IP:</span><span>$${(bs.fixedAssets + bs.ipAssets).toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 700; border-top: 1px solid var(--border-color); padding-top: 2px;">
            <span>Total Assets:</span><span>$${bs.totalAssets.toLocaleString()}</span>
          </div>

          <div style="font-weight: 700; color: #f472b6; margin-top: 4px;">Liabilities & Equity:</div>
          <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Accounts Payable (AP):</span><span>$${bs.ap.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Debt Obligations:</span><span>$${(bs.shortTermDebt + bs.longTermDebt).toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; padding-left: 8px;"><span>Stockholders' Equity:</span><span>$${bs.stockholdersEquity.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 700; border-top: 1px solid var(--border-color); padding-top: 2px;">
            <span>Total Liabilities & Equity:</span><span>$${(bs.totalLiabilities + bs.stockholdersEquity).toLocaleString()}</span>
          </div>
        </div>

        <!-- 3. Cash Flow Statement -->
        <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px; color: #fff;">3. Statement of Cash Flows</div>
        <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between;"><span>Operating Cash Flow (CFO):</span><span style="color: ${cf.cfo >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">$${cf.cfo.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Investing Cash Flow (CFI - CapEx):</span><span style="color: var(--accent-rose);">$${cf.cfi.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Financing Cash Flow (CFF):</span><span>$${cf.cff.toLocaleString()}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; border-top: 1px solid var(--border-color); padding-top: 4px;">
            <span>Net Change in Liquid Cash:</span><span>$${cf.netCashFlow.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `;
  }

  // 4. FUNDRAISING SUBTAB
  else if (currentSubTab === "fundraising" && currentBiz) {
    const pitchScore = calculateFounderPitchScore(G, currentBiz);

    bodyHtml = `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🚀</span> Capital Markets & Pitch Desk</div>
          <span class="pill-badge emerald">Pitch Score: ${pitchScore}</span>
        </div>

        <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
          <div style="font-weight: 700; margin-bottom: 2px;">Founder Pedigree Breakdown:</div>
          <div style="color: var(--text-secondary);">
            Degree: ${G.education?.college?.name || "Self-Taught"} | 
            Smarts: ${G.stats.smarts} | 
            Prestige: ${G.stats.prestige} | 
            Current Equity: ${currentBiz.founderEquityPct}%
          </div>
        </div>

        <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Select Funding Tier to Solicit Term Sheets:</div>
        <div style="display: flex; flex-direction: column; gap: 6px; max-height: 380px; overflow-y: auto;">
          ${FUNDING_SOURCES.map(s => `
            <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 2px;">
                <span>${s.name} (${s.tier})</span>
                <button class="btn btn-sm btn-primary btn-solicit-terms" data-sid="${s.id}" style="font-size: 9px; padding: 2px 6px;">
                  Solicit Terms ➔
                </button>
              </div>
              <p style="margin: 0; color: var(--text-secondary);">${s.desc}</p>
              <div style="color: #60a5fa; margin-top: 2px;">Check Size: $${s.minCheck.toLocaleString()} – $${s.maxCheck.toLocaleString()}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // 5. BOARDROOM SUBTAB
  else if (currentSubTab === "boardroom" && currentBiz) {
    const seats = currentBiz.board?.seats || [
      { id: "founder", title: "Founder & CEO (YOU)", votes: 1, type: "founder", loyalty: 100, agenda: "growth" }
    ];

    bodyHtml = `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>🏛️</span> Board of Directors Chamber</div>
          <span style="font-size: 11px; color: var(--text-secondary);">${seats.length} Seated Directors</span>
        </div>

        <!-- Coup Status Banner -->
        ${currentBiz.board?.coupThreat ? `
          <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid var(--accent-rose); border-radius: 8px; padding: 10px; font-size: 10px; color: #fca5a5; margin-bottom: 12px;">
            <div style="font-weight: 700; font-size: 11px; margin-bottom: 4px;">🚨 BOARDROOM COUP IN PROGRESS!</div>
            <div>${currentBiz.board.coupReason}</div>
            <div style="margin-top: 8px; font-weight: 700; color: #fff;">Activate a Tactical Defense Lever:</div>
            <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 6px;">
              <button class="btn btn-sm btn-coup-def" data-lever="lobby_swing_vote" style="background: #3b82f6; text-align: left;">
                🎯 Lobby Independent Swing Vote (25 Energy + 15 Prestige)
              </button>
              <button class="btn btn-sm btn-coup-def" data-lever="dual_class_defense" style="background: #8b5cf6; text-align: left;">
                ⚖️ Invoke Class-B Super-Voting Defense (10:1 Voting Rights)
              </button>
              <button class="btn btn-sm btn-coup-def" data-lever="personal_cash_injection" style="background: #10b981; text-align: left;">
                💵 Personal Cash Injection (Guarantees 12 Months Runway)
              </button>
              <button class="btn btn-sm btn-coup-def" data-lever="step_down_to_chairman" style="background: #f59e0b; color: #000; text-align: left; font-weight: 700;">
                👑 Step Down to Chairman & CPO (Keep 100% Equity)
              </button>
            </div>
          </div>
        ` : `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--accent-emerald); border-radius: 8px; padding: 8px; font-size: 10px; color: #6ee7b7; margin-bottom: 12px;">
            ✅ <strong>Board Relations Stable:</strong> Founder maintains confidence of the board and statutory direction.
          </div>
        `}

        <!-- Board Seats Roster -->
        <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Director Seat Roster:</div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${seats.map(s => `
            <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 700;">${s.title}</div>
                <div style="color: var(--text-secondary); font-size: 9px;">Agenda: ${s.agenda.toUpperCase()} | Votes: ${s.votes}</div>
              </div>
              <div style="text-align: right;">
                <div style="color: ${s.loyalty >= 70 ? 'var(--accent-emerald)' : (s.loyalty >= 40 ? 'var(--accent-amber)' : 'var(--accent-rose)')}; font-weight: 700;">
                  Loyalty: ${s.loyalty}%
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // 6. ORG & AU SUBTAB
  else if (currentSubTab === "org" && currentBiz) {
    const org = currentBiz.org || { scaleTier: "micro", allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 }, techDebt: 5, qaDeficit: 5, regulatoryExposure: 5, morale: 90 };
    const au = org.allocatedAU;

    bodyHtml = `
      <div class="card">
        <div class="card-title-row">
          <div class="card-title"><span>👥</span> Organizational Scale & Attention Units</div>
          <span class="pill-badge purple">${(org.scaleTier || 'micro').toUpperCase()} TIER</span>
        </div>

        <!-- Latent Crisis Detonation Queue -->
        <div style="background: var(--bg-subtle); padding: 8px; border-radius: 8px; font-size: 10px; margin-bottom: 12px;">
          <div style="font-weight: 700; margin-bottom: 4px; color: var(--accent-rose);">⚠️ Latent Crisis Detonation Queue:</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; justify-content: space-between;">
              <span>Tech Debt:</span>
              <strong style="color: ${org.techDebt > 70 ? 'var(--accent-rose)' : '#fff'};">${org.techDebt}%</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>QA & Defect Deficit:</span>
              <strong style="color: ${org.qaDeficit > 70 ? 'var(--accent-rose)' : '#fff'};">${org.qaDeficit}%</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Regulatory Exposure:</span>
              <strong style="color: ${org.regulatoryExposure > 70 ? 'var(--accent-rose)' : '#fff'};">${org.regulatoryExposure}%</strong>
            </div>
          </div>
        </div>

        <!-- 100 AU Allocator Form -->
        <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Allocate Founder's 100 Annual Attention Units (AU):</div>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Vision & Strategy:</span>
            <input type="number" class="inp-au" data-k="strategy" value="${au.strategy}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Key Executive Hiring:</span>
            <input type="number" class="inp-au" data-k="hiring" value="${au.hiring}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Investor Relations & Board:</span>
            <input type="number" class="inp-au" data-k="investorRel" value="${au.investorRel}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Product & R&D Review:</span>
            <input type="number" class="inp-au" data-k="product" value="${au.product}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Operational Firefighting:</span>
            <input type="number" class="inp-au" data-k="fires" value="${au.fires}" min="0" max="60" style="width: 50px; background: #000; color: #fff; border: 1px solid var(--border-color); border-radius: 4px; padding: 2px 4px; text-align: center;">
          </div>
          <button class="btn btn-primary btn-sm btn-save-au" style="margin-top: 8px;">Save 100 AU Allocation</button>
        </div>
      </div>
    `;
  }

  vc.innerHTML = subNavHtml + bodyHtml;

  // EVENT LISTENERS
  document.querySelectorAll(".btn-biz-subtab").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSubTab = btn.dataset.tab;
      renderCurrentTab();
    });
  });

  document.querySelectorAll(".btn-switch-biz").forEach(btn => {
    btn.addEventListener("click", () => {
      activeBizIndex = parseInt(btn.dataset.idx);
      renderCurrentTab();
    });
  });

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

  document.querySelectorAll(".btn-go-catalog").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSubTab = "catalog";
      renderCurrentTab();
    });
  });

  document.querySelectorAll(".btn-goto-board").forEach(btn => {
    btn.addEventListener("click", () => {
      currentSubTab = "boardroom";
      renderCurrentTab();
    });
  });

  // Found Business Button
  document.querySelectorAll(".btn-found-biz").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const t = BUSINESS_CATALOG.find(x => x.id === id);
      if (!t) return;

      if (G.stats.smarts < t.minSmarts) {
        toast(`Requires at least ${t.minSmarts} Smarts to establish ${t.name}!`, "error");
        return;
      }
      if (G.fin.cash < t.startupCost) {
        toast(`Requires $${t.startupCost.toLocaleString()} wallet cash!`, "error");
        return;
      }

      G.fin.cash -= t.startupCost;
      const initialFixedAssets = Math.round(t.startupCost * (t.workingCapital?.capexIntensity || 0.25));
      const initialTreasury = t.startupCost - initialFixedAssets;

      G.biz.push({
        instanceId: `biz_${Date.now()}`,
        catalogId: t.id,
        name: t.name,
        sector: t.sector,
        icon: t.icon,
        capitalTier: t.capitalTier,
        scaleUnits: 1,
        yearsActive: 0,
        founderEquityPct: 100,
        founderClassBSharesPct: 100,
        headcount: t.capitalTier === "A" ? 1 : (t.capitalTier === "B" ? 2 : (t.capitalTier === "C" ? 6 : (t.capitalTier === "D" ? 20 : (t.capitalTier === "E" ? 60 : (t.capitalTier === "F" ? 150 : 500))))),
        annualRevenueUSD: t.baseRev,
        ebitdaUSD: Math.round(t.baseRev * 0.25),
        netProfitUSD: Math.round(t.baseRev * 0.18),
        treasuryUSD: initialTreasury,
        accountsReceivableUSD: Math.round(t.baseRev * (t.workingCapital.dso / 365)),
        inventoryUSD: Math.round(t.baseRev * (1 - t.margin) * (t.workingCapital.dio / 365)),
        fixedAssetsUSD: initialFixedAssets,
        ipAssetsUSD: t.boundEngines.includes("research_ip") ? Math.round(t.startupCost * 0.3) : 0,
        accountsPayableUSD: Math.round(t.baseRev * (1 - t.margin) * (t.workingCapital.dpo / 365)),
        shortTermDebtUSD: 0,
        longTermDebtUSD: 0,
        retainedEarningsUSD: 0,
        paidInCapitalUSD: t.startupCost,
        valuationUSD: Math.round(t.baseRev * t.multiple * 0.3),
        marketingBudgetUSD: Math.round(t.baseRev * 0.05),
        workingCapitalDays: { ...t.workingCapital },
        boundEngines: [...t.boundEngines],
        kpis: {},
        inRestructuring: false,
        board: {
          seats: [
            { id: "founder", title: "Founder & CEO (YOU)", votes: 1, type: "founder", loyalty: 100, agenda: "growth" }
          ],
          coupThreat: false,
          coupReason: null
        },
        org: {
          scaleTier: "micro",
          allocatedAU: { strategy: 30, hiring: 25, investorRel: 15, product: 20, fires: 10 },
          techDebt: 5,
          qaDeficit: 5,
          regulatoryExposure: 5,
          morale: 90
        }
      });

      toast(`🎉 Incorporated ${t.name}!`, "celebrate");
      activeBizIndex = G.biz.length - 1;
      currentSubTab = "enterprises";
      updateHeader();
      renderCurrentTab();
    });
  });

  // Expand Scale
  document.querySelectorAll(".btn-biz-expand").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      const b = G.biz[idx];
      const cost = Math.round(b.valuationUSD * 0.08);

      if (b.treasuryUSD >= cost) {
        b.treasuryUSD -= cost;
      } else if (G.fin.cash >= cost) {
        G.fin.cash -= cost;
      } else {
        toast("Insufficient funds for expansion.", "error");
        return;
      }

      b.scaleUnits = (b.scaleUnits || 1) + 1;
      b.headcount = (b.headcount || 4) + 6;
      toast(`Expanded scale of ${b.name}! (Now Scale Units: ${b.scaleUnits})`, "celebrate");
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
        toast("No liquid treasury cash available for dividends.", "error");
        return;
      }

      b.treasuryUSD -= div;
      G.fin.cash += div;
      toast(`Withdrew $${div.toLocaleString()} founder dividend!`, "celebrate");
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
        toast(`Insufficient personal cash ($${injectAmt.toLocaleString()} required).`, "error");
        return;
      }

      G.fin.cash -= injectAmt;
      b.treasuryUSD += injectAmt;
      b.paidInCapitalUSD = (b.paidInCapitalUSD || 0) + injectAmt;
      if (b.inRestructuring && b.treasuryUSD > 0) b.inRestructuring = false;

      toast(`Injected $${injectAmt.toLocaleString()} personal cash into ${b.name} treasury!`, "celebrate");
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

      if (confirm(`Accept institutional M&A buyout offer for ${b.name} at valuation $${b.valuationUSD.toLocaleString()}?\n\nYour ${b.founderEquityPct}% equity yields: $${founderProceeds.toLocaleString()} personal cash.`)) {
        G.fin.cash += founderProceeds;
        if (!G.pastExits) G.pastExits = [];
        G.pastExits.push({ name: b.name, valuation: b.valuationUSD, proceeds: founderProceeds, year: G.char.age });
        G.biz.splice(idx, 1);
        toast(`🏆 Sold ${b.name} for $${founderProceeds.toLocaleString()}!`, "celebrate");
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
    <div style="font-size: 11px;">
      <p style="color: var(--text-secondary); margin-bottom: 12px;">
        Review competing investor term sheets for <strong>${biz.name}</strong>. Negotiate valuation counter-offers or accept standard terms.
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${sheets.map((s, i) => `
          <div style="background: var(--bg-subtle); padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 4px;">
              <span>${s.investorName}</span>
              <span class="pill-badge blue" style="font-size: 9px;">${s.investorType}</span>
            </div>
            <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 6px;">
              Check: <strong style="color: #fff;">$${s.investmentCheckUSD.toLocaleString()}</strong> | 
              Pre-Money: <strong>$${s.preMoneyValuationUSD.toLocaleString()}</strong> | 
              Dilution: <strong style="color: var(--accent-amber);">${s.postMoneyEquityPct}%</strong>
            </div>
            <div style="font-size: 9px; color: var(--text-secondary); margin-bottom: 8px;">
              Liquidation Pref: <strong>${s.liquidationPreference}</strong> | 
              Option Pool: <strong>${s.optionPoolPct}%</strong> | 
              Board Seats: <strong>${s.boardSeatsRequested}</strong>
            </div>

            <!-- Negotiation Controls -->
            <div style="display: flex; gap: 6px; align-items: center;">
              <button class="btn btn-sm btn-primary btn-accept-sheet" data-idx="${i}" style="font-size: 10px; padding: 4px 8px;">
                Accept Deal
              </button>
              <button class="btn btn-sm btn-counter-sheet" data-idx="${i}" style="font-size: 10px; padding: 4px 8px;">
                Counter-Offer (+20% Val)
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  openModal("Term Sheet Negotiations", modalHtml);

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
      const res = negotiateTermSheet(G, biz, sheet, 20); // 20% valuation bump
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
