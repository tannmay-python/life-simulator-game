// View: Stock Market, Crypto, Real Estate (Rent/Renovate/Flip), Luxury Assets, and Forbes Richest Leaderboard

import { STOCKS_DATA, CRYPTO_DATA } from "../data/stocks_data.js";
import { PROPERTY_TEMPLATES, LUXURY_VEHICLES, AVIATION_MARINE, FINE_ART_COLLECTIBLES } from "../data/assets_data.js";
import { FORBES_TITANS } from "../data/forbes_data.js";
import {
  buyStock,
  sellStock,
  buyCrypto,
  sellCrypto,
  depositSavings,
  withdrawSavings,
  borrowMargin,
  repayMargin
} from "../systems/finance_engine.js";
import {
  buyProperty,
  renovateProperty,
  toggleRentProperty,
  flipProperty,
  buyLuxuryVehicle,
  buyAviationMarine,
  buyFineArt
} from "../systems/property_engine.js";
import { showToast, openModal, closeModal } from "./ui_manager.js";

let financeSubtab = "stocks"; // "stocks", "real_estate", "luxury", "forbes"

export function renderFinanceAssetsView(state) {
  return `
    <!-- Subtabs -->
    <div class="subtabs-bar">
      <button class="subtab-btn ${financeSubtab === 'stocks' ? 'active' : ''}" data-sub="stocks">📈 Stocks & Crypto</button>
      <button class="subtab-btn ${financeSubtab === 'real_estate' ? 'active' : ''}" data-sub="real_estate">🏠 Real Estate</button>
      <button class="subtab-btn ${financeSubtab === 'luxury' ? 'active' : ''}" data-sub="luxury">💎 Luxury Assets</button>
      <button class="subtab-btn ${financeSubtab === 'forbes' ? 'active' : ''}" data-sub="forbes">🏆 Forbes Richest</button>
    </div>

    ${financeSubtab === 'stocks' ? renderStocksCryptoSubtab(state) : ''}
    ${financeSubtab === 'real_estate' ? renderRealEstateSubtab(state) : ''}
    ${financeSubtab === 'luxury' ? renderLuxuryAssetsSubtab(state) : ''}
    ${financeSubtab === 'forbes' ? renderForbesSubtab(state) : ''}
  `;
}

// 1. Stocks & Crypto Subtab
function renderStocksCryptoSubtab(state) {
  // Banking Overview Card
  const totalStockEquity = Object.entries(state.finances.stockPortfolio).reduce((sum, [ticker, holding]) => {
    return sum + (holding.shares * (state.finances.stockPrices[ticker] || 0));
  }, 0);

  const totalCryptoEquity = Object.entries(state.finances.cryptoPortfolio).reduce((sum, [symbol, holding]) => {
    return sum + (holding.coins * (state.finances.cryptoPrices[symbol] || 0));
  }, 0);

  return `
    <!-- Banking & Liquidity Card -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🏦</span> Private Banking & Portfolio</div>
        <span class="pill-badge emerald">4.5% APY</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 12px;">
        <div>Cash Checking: <strong>$${Math.round(state.finances.cashUSD).toLocaleString()}</strong></div>
        <div>High-Yield Savings: <strong>$${Math.round(state.finances.savingsUSD).toLocaleString()}</strong></div>
        <div>Stock Holdings: <strong>$${Math.round(totalStockEquity).toLocaleString()}</strong></div>
        <div>Crypto Holdings: <strong>$${Math.round(totalCryptoEquity).toLocaleString()}</strong></div>
        ${state.finances.debt.marginLoanUSD > 0 ? `
          <div style="grid-column: span 2; color: var(--accent-rose);">Margin Debt: <strong>$${state.finances.debt.marginLoanUSD.toLocaleString()} (6.5% APR)</strong></div>
        ` : ''}
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
        <button class="btn btn-sm" id="btnDepositSavings">Deposit Savings</button>
        <button class="btn btn-sm" id="btnWithdrawSavings">Withdraw Savings</button>
        <button class="btn btn-sm" id="btnBorrowMargin">Borrow Margin</button>
        <button class="btn btn-sm" id="btnRepayMargin">Repay Margin</button>
      </div>
    </div>

    <!-- Equities Market -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>📊</span> Public Equities & Indices</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${STOCKS_DATA.map(stock => {
          const currentPrice = state.finances.stockPrices[stock.ticker] || stock.initialPriceUSD;
          const holding = state.finances.stockPortfolio[stock.ticker];
          const history = state.finances.stockHistory[stock.ticker] || [currentPrice];
          const prevPrice = history.length > 1 ? history[history.length - 2] : currentPrice;
          const changePct = ((currentPrice - prevPrice) / prevPrice) * 100;

          return `
            <div class="list-row">
              <div class="list-row-left">
                <div class="list-icon-box" style="font-weight: 700; font-size: 11px;">${stock.ticker}</div>
                <div class="list-row-text">
                  <h4>${stock.name}</h4>
                  <p>P/E: ${stock.peRatio} • Div: ${(stock.dividendYieldPct * 100).toFixed(1)}%</p>
                  ${holding ? `<span class="pill-badge emerald" style="font-size: 9px;">Own ${holding.shares} shares ($${Math.round(holding.shares * currentPrice).toLocaleString()})</span>` : ''}
                </div>
              </div>
              <div class="list-row-right">
                <div style="font-weight: 700; font-size: 13px;">$${currentPrice.toFixed(2)}</div>
                <div style="font-size: 11px; color: ${changePct >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">
                  ${changePct >= 0 ? '+' : ''}${changePct.toFixed(1)}%
                </div>
                <div style="display: flex; gap: 4px; margin-top: 4px;">
                  <button class="btn btn-sm btn-primary btn-trade-stock" data-ticker="${stock.ticker}" data-action="buy">Buy</button>
                  ${holding ? `<button class="btn btn-sm btn-trade-stock" data-ticker="${stock.ticker}" data-action="sell">Sell</button>` : ''}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- Cryptocurrencies -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🪙</span> Digital Assets & Crypto</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${CRYPTO_DATA.map(crypto => {
          const currentPrice = state.finances.cryptoPrices[crypto.symbol] || crypto.initialPriceUSD;
          const holding = state.finances.cryptoPortfolio[crypto.symbol];

          return `
            <div class="list-row">
              <div class="list-row-left">
                <div class="list-icon-box">🪙</div>
                <div class="list-row-text">
                  <h4>${crypto.name} (${crypto.symbol})</h4>
                  <p>${crypto.description.substring(0, 38)}...</p>
                  ${holding ? `<span class="pill-badge purple" style="font-size: 9px;">Own ${holding.coins.toFixed(3)} ${crypto.symbol} ($${Math.round(holding.coins * currentPrice).toLocaleString()})</span>` : ''}
                </div>
              </div>
              <div class="list-row-right">
                <div style="font-weight: 700; font-size: 13px;">$${currentPrice.toLocaleString()}</div>
                <div style="display: flex; gap: 4px; margin-top: 4px;">
                  <button class="btn btn-sm btn-primary btn-trade-crypto" data-symbol="${crypto.symbol}" data-action="buy">Buy</button>
                  ${holding ? `<button class="btn btn-sm btn-trade-crypto" data-symbol="${crypto.symbol}" data-action="sell">Sell</button>` : ''}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// 2. Real Estate Subtab (Flip, Rent, Renovate)
function renderRealEstateSubtab(state) {
  const ownedPropertiesHtml = state.assets.properties.length === 0 ? `
    <div style="padding: 14px; text-align: center; color: var(--text-secondary); font-size: 12px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color); margin-bottom: 14px;">
      You do not own any real estate properties. Acquire land or residential estates below to rent or flip for profit.
    </div>
  ` : state.assets.properties.map(prop => `
    <div class="card" style="border-left: 3px solid var(--accent-blue);">
      <div class="card-title-row">
        <div class="card-title">
          <span>${prop.icon}</span> ${prop.name}
        </div>
        <span class="pill-badge emerald">Market: $${prop.marketValueUSD.toLocaleString()}</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12px; margin-bottom: 12px; background: var(--bg-subtle); padding: 8px; border-radius: 8px;">
        <div>Status: <strong>${prop.isRented ? `Rented ($${prop.annualRentUSD.toLocaleString()}/yr)` : 'Vacant'}</strong></div>
        <div>Condition: <strong>${prop.conditionPct}%</strong></div>
        <div>Renovation Tier: <strong>Level ${prop.renovatedLevel}/3</strong></div>
        ${prop.mortgageBalanceUSD > 0 ? `<div>Mortgage: <strong>$${prop.mortgageBalanceUSD.toLocaleString()}</strong></div>` : '<div>Debt: <strong>None (Free & Clear)</strong></div>'}
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
        <button class="btn btn-sm btn-renovate-prop" data-id="${prop.instanceId}">
          🛠️ Renovate
        </button>
        <button class="btn btn-sm btn-rent-prop" data-id="${prop.instanceId}">
          ${prop.isRented ? '🚪 Evict' : '🔑 Lease Out'}
        </button>
        <button class="btn btn-sm btn-flip-prop" data-id="${prop.instanceId}" style="color: var(--accent-emerald);">
          🔄 Flip & Sell
        </button>
      </div>
    </div>
  `).join("");

  return `
    <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 10px;">Owned Real Estate Portfolio (${state.assets.properties.length})</h3>
    ${ownedPropertiesHtml}

    <!-- Property Acquisition Catalog -->
    <div class="card" style="margin-top: 10px;">
      <div class="card-title-row">
        <div class="card-title"><span>🏛️</span> Global Real Estate Marketplace</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${PROPERTY_TEMPLATES.map(p => `
          <div class="list-row" style="flex-direction: column; align-items: flex-start; gap: 6px;">
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div class="list-icon-box">${p.icon}</div>
                <div>
                  <h4 style="font-size: 13px; font-weight: 600;">${p.name}</h4>
                  <span class="pill-badge blue" style="font-size: 9px;">${p.type}</span>
                </div>
              </div>
              <div style="font-weight: 700; font-size: 13px;">$${p.basePriceUSD.toLocaleString()}</div>
            </div>
            <p style="font-size: 11px; color: var(--text-secondary);">${p.description}</p>
            <div style="display: flex; gap: 6px; width: 100%;">
              <button class="btn btn-sm btn-primary btn-buy-property" data-template="${p.id}" data-mortgage="false" style="flex: 1;">
                Buy All-Cash ($${p.basePriceUSD.toLocaleString()})
              </button>
              <button class="btn btn-sm btn-buy-property" data-template="${p.id}" data-mortgage="true" style="flex: 1;">
                20% Mortgage Down ($${Math.round(p.basePriceUSD * 0.20).toLocaleString()})
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// 3. Luxury Assets Subtab
function renderLuxuryAssetsSubtab(state) {
  return `
    <!-- Supercars & Hypercars -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🏎️</span> Exotic Hypercars & Classic Automobilia</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${LUXURY_VEHICLES.map(v => {
          const owned = state.assets.vehicles.some(item => item.id === v.id);
          return `
            <div class="list-row">
              <div class="list-row-left">
                <div class="list-icon-box">${v.icon}</div>
                <div class="list-row-text">
                  <h4>${v.name}</h4>
                  <p>${v.category} • Prestige +${v.prestige}</p>
                </div>
              </div>
              <div class="list-row-right">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">$${v.priceUSD.toLocaleString()}</div>
                ${owned ? `<span class="pill-badge emerald">In Garage</span>` : `
                  <button class="btn btn-sm btn-primary btn-buy-vehicle" data-id="${v.id}">Acquire</button>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- Private Aviation & Superyachts -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>✈️</span> Private Aviation & Mega-Yachts</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${AVIATION_MARINE.map(am => {
          const owned = state.assets.aviationMarine.some(item => item.id === am.id);
          return `
            <div class="list-row">
              <div class="list-row-left">
                <div class="list-icon-box">${am.icon}</div>
                <div class="list-row-text">
                  <h4>${am.name}</h4>
                  <p>Upkeep: $${am.annualMaintenanceUSD.toLocaleString()}/yr • Prestige +${am.prestige}</p>
                </div>
              </div>
              <div class="list-row-right">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">$${am.priceUSD.toLocaleString()}</div>
                ${owned ? `<span class="pill-badge emerald">Chartered</span>` : `
                  <button class="btn btn-sm btn-primary btn-buy-am" data-id="${am.id}">Acquire</button>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- Fine Art & Museum Masterpieces -->
    <div class="card">
      <div class="card-title-row">
        <div class="card-title"><span>🎨</span> Fine Art & Sotheby's Masterpieces</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${FINE_ART_COLLECTIBLES.map(art => {
          const owned = state.assets.fineArtCollectibles.some(item => item.id === art.id);
          return `
            <div class="list-row">
              <div class="list-row-left">
                <div class="list-icon-box">${art.icon}</div>
                <div class="list-row-text">
                  <h4>${art.name}</h4>
                  <p>Appreciation: +${(art.appreciationRate * 100).toFixed(0)}%/yr • Prestige +${art.prestige}</p>
                </div>
              </div>
              <div class="list-row-right">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 4px;">$${art.priceUSD.toLocaleString()}</div>
                ${owned ? `<span class="pill-badge emerald">In Private Vault</span>` : `
                  <button class="btn btn-sm btn-primary btn-buy-art" data-id="${art.id}">Acquire</button>
                `}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// 4. Forbes Richest Subtab
function renderForbesSubtab(state) {
  // Merge player into leaderboard
  const playerEntry = {
    isPlayer: true,
    name: `${state.character.firstName} ${state.character.lastName}`,
    netWorthUSD: state.finances.netWorthUSD,
    country: state.character.currentCountry.toUpperCase(),
    flag: "👑",
    source: state.businesses.length > 0 ? state.businesses[0].name : (state.career.currentJob ? state.career.currentJob.title : "Diversified Portfolio"),
    industry: "Conglomerate & Tech",
    age: state.character.age
  };

  const combined = [...FORBES_TITANS, playerEntry].sort((a, b) => b.netWorthUSD - a.netWorthUSD);
  const playerRank = combined.findIndex(item => item.isPlayer) + 1;

  return `
    <div class="card" style="background: linear-gradient(135deg, #181822, #101018); border-color: rgba(245, 158, 11, 0.3);">
      <div class="card-title-row">
        <div class="card-title" style="color: var(--accent-amber);">
          <span>🏆</span> Forbes Real-Time Billionaires
        </div>
        <span class="pill-badge amber">Your World Rank: #${playerRank}</span>
      </div>
      <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
        Tracking the fortunes of global captains of industry, tech moguls, and self-made titans.
      </p>

      <div style="display: flex; flex-direction: column; gap: 8px; max-height: 520px; overflow-y: auto; padding-right: 4px;">
        ${combined.map((titan, index) => {
          const rank = index + 1;
          const isMe = titan.isPlayer;

          return `
            <div class="list-row" style="${isMe ? 'background: rgba(99, 102, 241, 0.15); border-radius: 8px; padding: 10px 8px; border: 1px solid var(--accent-primary);' : ''}">
              <div class="list-row-left">
                <div style="font-size: 13px; font-weight: 700; color: ${rank <= 3 ? 'var(--accent-amber)' : 'var(--text-secondary)'}; width: 24px;">
                  #${rank}
                </div>
                <div>
                  <h4 style="font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px;">
                    ${titan.name} ${titan.flag || ''} ${isMe ? '<span class="pill-badge blue" style="font-size: 9px;">YOU</span>' : ''}
                  </h4>
                  <p style="font-size: 11px; color: var(--text-secondary);">${titan.source} (${titan.country})</p>
                </div>
              </div>
              <div class="list-row-right">
                <div style="font-weight: 700; font-size: 13px; color: var(--accent-emerald);">
                  $${(titan.netWorthUSD >= 1000000000 ? (titan.netWorthUSD / 1000000000).toFixed(1) + ' B' : (titan.netWorthUSD / 1000000).toFixed(1) + ' M')}
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

export function bindFinanceAssetsEvents(state, rerenderCallback) {
  // Subtabs
  document.querySelectorAll(".subtab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      financeSubtab = btn.dataset.sub;
      rerenderCallback();
    });
  });

  // Banking
  const btnDeposit = document.getElementById("btnDepositSavings");
  if (btnDeposit) {
    btnDeposit.addEventListener("click", () => {
      openModal("Deposit to High-Yield Savings", `
        <div class="input-group">
          <label class="input-label">Deposit Amount ($)</label>
          <input type="number" id="inputDeposit" class="input-field" value="${Math.min(state.finances.cashUSD, 10000)}">
        </div>
        <button class="btn btn-emerald btn-full" id="btnConfirmDeposit">Confirm Deposit (4.5% APY)</button>
      `);
      document.getElementById("btnConfirmDeposit").addEventListener("click", () => {
        const amt = document.getElementById("inputDeposit").value;
        const res = depositSavings(state, amt);
        closeModal();
        showToast(res.message, res.success ? "success" : "error");
        rerenderCallback();
      });
    });
  }

  const btnWithdraw = document.getElementById("btnWithdrawSavings");
  if (btnWithdraw) {
    btnWithdraw.addEventListener("click", () => {
      openModal("Withdraw from High-Yield Savings", `
        <div class="input-group">
          <label class="input-label">Withdraw Amount ($)</label>
          <input type="number" id="inputWithdraw" class="input-field" value="${state.finances.savingsUSD}">
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmWithdraw">Confirm Withdrawal</button>
      `);
      document.getElementById("btnConfirmWithdraw").addEventListener("click", () => {
        const amt = document.getElementById("inputWithdraw").value;
        const res = withdrawSavings(state, amt);
        closeModal();
        showToast(res.message, res.success ? "success" : "error");
        rerenderCallback();
      });
    });
  }

  const btnBorrowMargin = document.getElementById("btnBorrowMargin");
  if (btnBorrowMargin) {
    btnBorrowMargin.addEventListener("click", () => {
      openModal("Borrow Margin Loan", `
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">
          Borrow liquidity against your equities portfolio without selling shares or triggering capital gains tax (6.5% APR).
        </p>
        <div class="input-group">
          <label class="input-label">Loan Amount ($)</label>
          <input type="number" id="inputMargin" class="input-field" placeholder="Enter amount">
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmMargin">Borrow Cash</button>
      `);
      document.getElementById("btnConfirmMargin").addEventListener("click", () => {
        const amt = document.getElementById("inputMargin").value;
        const res = borrowMargin(state, amt);
        closeModal();
        showToast(res.message, res.success ? "success" : "error");
        rerenderCallback();
      });
    });
  }

  const btnRepayMargin = document.getElementById("btnRepayMargin");
  if (btnRepayMargin) {
    btnRepayMargin.addEventListener("click", () => {
      const res = repayMargin(state, state.finances.debt.marginLoanUSD);
      showToast(res.message, res.success ? "success" : "error");
      rerenderCallback();
    });
  }

  // Stock trading
  document.querySelectorAll(".btn-trade-stock").forEach(btn => {
    btn.addEventListener("click", () => {
      const ticker = btn.dataset.ticker;
      const action = btn.dataset.action;
      const price = state.finances.stockPrices[ticker];

      openModal(`${action.toUpperCase()} ${ticker} ($${price.toFixed(2)}/share)`, `
        <div class="input-group">
          <label class="input-label">Share Quantity</label>
          <input type="number" id="inputStockShares" class="input-field" value="10">
        </div>
        <button class="btn ${action === 'buy' ? 'btn-emerald' : 'btn-primary'} btn-full" id="btnConfirmStockTrade">
          Confirm ${action.toUpperCase()}
        </button>
      `);

      document.getElementById("btnConfirmStockTrade").addEventListener("click", () => {
        const shares = document.getElementById("inputStockShares").value;
        const res = action === "buy" ? buyStock(state, ticker, shares) : sellStock(state, ticker, shares);
        closeModal();
        showToast(res.message, res.success ? "celebrate" : "error");
        rerenderCallback();
      });
    });
  });

  // Crypto trading
  document.querySelectorAll(".btn-trade-crypto").forEach(btn => {
    btn.addEventListener("click", () => {
      const symbol = btn.dataset.symbol;
      const action = btn.dataset.action;
      const price = state.finances.cryptoPrices[symbol];

      openModal(`${action.toUpperCase()} ${symbol} ($${price.toLocaleString()})`, `
        <div class="input-group">
          <label class="input-label">${action === 'buy' ? 'Amount in USD ($)' : 'Coins to Sell'}</label>
          <input type="number" id="inputCryptoAmt" class="input-field" value="${action === 'buy' ? '5000' : '0.1'}">
        </div>
        <button class="btn ${action === 'buy' ? 'btn-emerald' : 'btn-primary'} btn-full" id="btnConfirmCryptoTrade">
          Confirm ${action.toUpperCase()}
        </button>
      `);

      document.getElementById("btnConfirmCryptoTrade").addEventListener("click", () => {
        const val = document.getElementById("inputCryptoAmt").value;
        const res = action === "buy" ? buyCrypto(state, symbol, val) : sellCrypto(state, symbol, val);
        closeModal();
        showToast(res.message, res.success ? "celebrate" : "error");
        rerenderCallback();
      });
    });
  });

  // Buy Property
  document.querySelectorAll(".btn-buy-property").forEach(btn => {
    btn.addEventListener("click", () => {
      const templateId = btn.dataset.template;
      const useMortgage = btn.dataset.mortgage === "true";
      const res = buyProperty(state, templateId, useMortgage);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });

  // Renovate Property
  document.querySelectorAll(".btn-renovate-prop").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const res = renovateProperty(state, id, 1);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });

  // Lease / Rent Property
  document.querySelectorAll(".btn-rent-prop").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const res = toggleRentProperty(state, id, "corporate_lease");
      showToast(res.message, res.success ? "success" : "error");
      rerenderCallback();
    });
  });

  // Flip Property
  document.querySelectorAll(".btn-flip-prop").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const res = flipProperty(state, id);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });

  // Luxury buys
  document.querySelectorAll(".btn-buy-vehicle").forEach(btn => {
    btn.addEventListener("click", () => {
      const res = buyLuxuryVehicle(state, btn.dataset.id);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });

  document.querySelectorAll(".btn-buy-am").forEach(btn => {
    btn.addEventListener("click", () => {
      const res = buyAviationMarine(state, btn.dataset.id);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });

  document.querySelectorAll(".btn-buy-art").forEach(btn => {
    btn.addEventListener("click", () => {
      const res = buyFineArt(state, btn.dataset.id);
      showToast(res.message, res.success ? "celebrate" : "error");
      rerenderCallback();
    });
  });
}
