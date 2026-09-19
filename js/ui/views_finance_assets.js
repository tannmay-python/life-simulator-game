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

const formatMoney = n => n >= 1e9 ? "$" + (n / 1e9).toFixed(0) + "B" : "$" + Math.round(n).toLocaleString();

export function renderFinanceAssetsView(state) {
  const totalStockEquity = Object.entries(state.finances?.stockPortfolio || {}).reduce((sum, [ticker, holding]) => {
    return sum + ((holding?.shares || 0) * (state.finances.stockPrices[ticker] || 0));
  }, 0);

  const totalCryptoEquity = Object.entries(state.finances?.cryptoPortfolio || {}).reduce((sum, [symbol, holding]) => {
    return sum + ((holding?.coins || 0) * (state.finances.cryptoPrices[symbol] || 0));
  }, 0);

  return `
    <!-- Top 3-Column Balance Grid -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--hairline); margin-bottom: 24px;">
      <div>
        <div style="font-size: 12px; color: var(--text-tertiary);">Cash</div>
        <div class="mono-val" style="font-size: 18px; margin-top: 3px;">$${Math.round(state.finances?.cashUSD || 0).toLocaleString()}</div>
      </div>
      ${state.character.age < 18 ? `<div><div style="font-size: 12px; color: var(--text-tertiary);">Student account</div><div class="mono-val" style="font-size: 18px; margin-top: 3px;">$${Math.round(state.finances?.studentAccount?.cashUSD || 0).toLocaleString()}</div></div>` : ''}
      <div>
        <div style="font-size: 12px; color: var(--text-tertiary);">Equities</div>
        <div class="mono-val" style="font-size: 18px; margin-top: 3px;">$${Math.round(totalStockEquity + totalCryptoEquity).toLocaleString()}</div>
      </div>
      <div>
        <div style="font-size: 12px; color: var(--text-tertiary);">Margin used</div>
        <div class="mono-val" style="font-size: 18px; margin-top: 3px;">$${Math.round(state.finances?.debt?.marginLoanUSD || 0).toLocaleString()}</div>
      </div>
    </div>

    <!-- Subtabs -->
    <div class="subtabs-bar">
      <button class="subtab-btn ${financeSubtab === 'stocks' ? 'active' : ''}" data-sub="stocks" type="button">Markets</button>
      <button class="subtab-btn ${financeSubtab === 'real_estate' ? 'active' : ''}" data-sub="real_estate" type="button">Real estate</button>
      <button class="subtab-btn ${financeSubtab === 'luxury' ? 'active' : ''}" data-sub="luxury" type="button">Luxury</button>
      <button class="subtab-btn ${financeSubtab === 'forbes' ? 'active' : ''}" data-sub="forbes" type="button">Forbes</button>
    </div>

    ${financeSubtab === 'stocks' ? renderStocksCryptoSubtab(state) : ''}
    ${financeSubtab === 'real_estate' ? renderRealEstateSubtab(state) : ''}
    ${financeSubtab === 'luxury' ? renderLuxuryAssetsSubtab(state) : ''}
    ${financeSubtab === 'forbes' ? renderForbesSubtab(state) : ''}
  `;
}

// 1. Stocks & Crypto Subtab (Markets)
function renderStocksCryptoSubtab(state) {
  return `
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
      <button class="btn btn-outline btn-sm" id="btnDepositSavings" type="button">Deposit savings</button>
      <button class="btn btn-outline btn-sm" id="btnWithdrawSavings" type="button">Withdraw savings</button>
      <button class="btn btn-outline btn-sm" id="btnBorrowMargin" type="button">Borrow margin</button>
      <button class="btn btn-outline btn-sm" id="btnRepayMargin" type="button">Repay margin</button>
    </div>

    <!-- Public Equities -->
    <h2 class="section-heading first">Public equities</h2>
    <div>
      ${STOCKS_DATA.map(s => {
        const currentPrice = state.finances?.stockPrices[s.ticker] || s.initialPriceUSD;
        const pe = s.pe || (Math.round(currentPrice / 4));
        return `
          <div class="list-row">
            <div style="font-family: var(--font-mono); font-size: 14px; min-width: 58px;">${s.ticker}</div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${s.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                ${s.sector} · P/E <span style="font-family: var(--font-mono);">${pe}</span>
              </div>
            </div>
            <div style="display: flex; align-items: baseline; gap: 12px;">
              <div class="mono-val" style="font-size: 15px; white-space: nowrap;">
                $${currentPrice.toFixed(2)}
              </div>
              <button class="btn btn-outline btn-sm btn-trade-stock" data-ticker="${s.ticker}" type="button">
                Trade
              </button>
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <!-- Digital Assets -->
    <h2 class="section-heading">Digital assets</h2>
    <div>
      ${CRYPTO_DATA.map(c => {
        const currentPrice = state.finances?.cryptoPrices[c.symbol] || c.initialPriceUSD;
        return `
          <div class="list-row">
            <div style="font-family: var(--font-mono); font-size: 14px; min-width: 58px;">${c.symbol}</div>
            <div style="flex: 1; font-size: 15px;">${c.name}</div>
            <div style="display: flex; align-items: baseline; gap: 12px;">
              <div class="mono-val" style="font-size: 15px; white-space: nowrap;">
                $${Math.round(currentPrice).toLocaleString()}
              </div>
              <button class="btn btn-outline btn-sm btn-trade-crypto" data-symbol="${c.symbol}" type="button">
                Trade
              </button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// 2. Real Estate Subtab
function renderRealEstateSubtab(state) {
  const properties = PROPERTY_TEMPLATES || [];
  const ownedProps = state.assets?.properties || [];

  return `
    ${ownedProps.length > 0 ? `
      <h2 class="section-heading first">Holdings</h2>
      <div>
        ${ownedProps.map(p => `
          <div class="list-row">
            <div class="list-row-left">
              <div style="font-size: 15px;">${p.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">
                Value: <span style="font-family: var(--font-mono);">$${p.marketValueUSD.toLocaleString()}</span> · Rent: <span style="font-family: var(--font-mono);">$${p.annualRentUSD.toLocaleString()}/yr</span>
              </div>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-outline btn-sm btn-renovate-prop" data-id="${p.id}" type="button">Renovate</button>
              <button class="btn btn-outline btn-sm btn-rent-prop" data-id="${p.id}" type="button">${p.isRented ? 'Leased' : 'Lease'}</button>
              <button class="btn btn-outline btn-sm btn-flip-prop" data-id="${p.id}" type="button">Flip</button>
            </div>
          </div>
        `).join("")}
      </div>
    ` : ''}

    <h2 class="section-heading ${ownedProps.length === 0 ? 'first' : ''}">Marketplace</h2>
    <div>
      ${properties.map(p => {
        const strategy = p.type === 'commercial' ? 'Corporate lease' : (p.type === 'luxury' ? 'Luxury Airbnb' : (p.baseCostUSD > 5000000 ? 'Hold' : 'Standard rent'));
        return `
          <div class="list-row">
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 15px;">${p.name}</div>
              <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${strategy}</div>
            </div>
            <div style="display: flex; align-items: baseline; gap: 12px;">
              <div class="mono-val" style="font-size: 15px; white-space: nowrap;">
                $${p.baseCostUSD.toLocaleString()}
              </div>
              <button class="btn btn-outline btn-sm btn-buy-property" data-template="${p.id}" data-mortgage="false" type="button">
                Acquire
              </button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// 3. Luxury Subtab
function renderLuxuryAssetsSubtab(state) {
  const luxuryList = [
    { id: "porsche_911", name: "Porsche 911 GT3", cat: "Automobile", price: 225000 },
    { id: "ferrari_sp3", name: "Ferrari Daytona SP3", cat: "Automobile", price: 2250000 },
    { id: "bugatti_chiron", name: "Bugatti Chiron", cat: "Automobile", price: 3800000 },
    { id: "ferrari_250gto", name: "1962 Ferrari 250 GTO", cat: "Classic", price: 48000000 },
    { id: "gulfstream_g700", name: "Gulfstream G700", cat: "Aviation", price: 78000000 },
    { id: "benetti_yacht", name: "Benetti superyacht", cat: "Marine", price: 95000000 },
    { id: "lurssen_yacht", name: "Lürssen superyacht", cat: "Marine", price: 250000000 },
    { id: "monet_waterlilies", name: "Monet masterpiece", cat: "Fine art", price: 65000000 },
    { id: "basquiat_canvas", name: "Basquiat masterpiece", cat: "Fine art", price: 85000000 }
  ];

  return `
    <h2 class="section-heading first">Collections</h2>
    <div>
      ${luxuryList.map(l => `
        <div class="list-row">
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">${l.name}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${l.cat}</div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 12px;">
            <div class="mono-val" style="font-size: 15px; white-space: nowrap;">
              $${l.price.toLocaleString()}
            </div>
            <button class="btn btn-outline btn-sm btn-buy-luxury-item" data-id="${l.id}" data-price="${l.price}" data-name="${l.name}" type="button">
              Acquire
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// 4. Forbes Subtab
function renderForbesSubtab(state) {
  const billionaires = [
    [1, "Elon Musk", "Tesla, SpaceX, xAI", 245e9],
    [2, "Bernard Arnault & Family", "LVMH Moët Hennessy", 215e9],
    [3, "Jeff Bezos", "Amazon, Blue Origin", 205e9],
    [4, "Mark Zuckerberg", "Meta Platforms", 185e9],
    [5, "Larry Ellison", "Oracle Corporation", 165e9],
    [6, "Warren Buffett", "Berkshire Hathaway", 140e9],
    [7, "Bill Gates", "Microsoft, Breakthrough Energy", 130e9],
    [8, "Jensen Huang", "Nvidia", 120e9],
    [9, "Mukesh Ambani", "Reliance Industries, Jio, Retail", 118e9],
    [10, "Michael Bloomberg", "Bloomberg LP", 105e9]
  ];

  const charName = `${state.character.firstName} ${state.character.lastName}`;
  const charWorth = state.finances?.netWorth || 0;

  return `
    <h2 class="section-heading first">World's billionaires</h2>
    <div>
      ${billionaires.map(([rank, name, source, w]) => `
        <div class="list-row">
          <div style="font-family: var(--font-mono); font-size: 13px; color: var(--text-tertiary); min-width: 28px;">${rank}</div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 15px;">${name}</div>
            <div style="font-size: 13px; color: var(--text-tertiary); margin-top: 2px;">${source}</div>
          </div>
          <div class="mono-val" style="font-size: 15px; white-space: nowrap;">${formatMoney(w)}</div>
        </div>
      `).join("")}

      <div class="list-row" style="border-top: 1px solid rgba(22,21,15,0.20); margin-top: -1px;">
        <div style="font-family: var(--font-mono); font-size: 13px; color: var(--text-tertiary); min-width: 28px;">—</div>
        <div style="flex: 1; font-size: 15px;">${charName}</div>
        <div class="mono-val" style="font-size: 15px;">$${Math.round(charWorth).toLocaleString()}</div>
      </div>
    </div>
  `;
}

export function bindFinanceAssetsEvents(state, rerenderCallback) {
  // Subtab navigation
  document.querySelectorAll(".subtab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      financeSubtab = btn.dataset.sub;
      rerenderCallback();
    });
  });

  // Banking Actions
  const btnDepositSavings = document.getElementById("btnDepositSavings");
  if (btnDepositSavings) {
    btnDepositSavings.addEventListener("click", () => {
      openModal("Deposit to high-yield savings", `
        <div class="input-group">
          <label class="input-label">Deposit amount ($)</label>
          <input type="number" id="inputDepositSavingsAmt" class="input-field" value="5000">
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmDepositSavings" type="button">Deposit</button>
      `);

      document.getElementById("btnConfirmDepositSavings")?.addEventListener("click", () => {
        const amt = parseFloat(document.getElementById("inputDepositSavingsAmt").value);
        const res = depositSavings(state, amt);
        closeModal();
        showToast(res.message, res.success ? "success" : "error");
        rerenderCallback();
      });
    });
  }

  const btnWithdrawSavings = document.getElementById("btnWithdrawSavings");
  if (btnWithdrawSavings) {
    btnWithdrawSavings.addEventListener("click", () => {
      openModal("Withdraw from savings", `
        <div class="input-group">
          <label class="input-label">Withdraw amount ($)</label>
          <input type="number" id="inputWithdrawSavingsAmt" class="input-field" value="5000">
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmWithdrawSavings" type="button">Withdraw</button>
      `);

      document.getElementById("btnConfirmWithdrawSavings")?.addEventListener("click", () => {
        const amt = parseFloat(document.getElementById("inputWithdrawSavingsAmt").value);
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
      openModal("Borrow margin credit", `
        <div class="input-group">
          <label class="input-label">Margin loan amount ($)</label>
          <input type="number" id="inputBorrowMarginAmt" class="input-field" value="25000">
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmBorrowMargin" type="button">Borrow</button>
      `);

      document.getElementById("btnConfirmBorrowMargin")?.addEventListener("click", () => {
        const amt = parseFloat(document.getElementById("inputBorrowMarginAmt").value);
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
      openModal("Repay margin debt", `
        <div class="input-group">
          <label class="input-label">Repay amount ($)</label>
          <input type="number" id="inputRepayMarginAmt" class="input-field" value="25000">
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmRepayMargin" type="button">Repay</button>
      `);

      document.getElementById("btnConfirmRepayMargin")?.addEventListener("click", () => {
        const amt = parseFloat(document.getElementById("inputRepayMarginAmt").value);
        const res = repayMargin(state, amt);
        closeModal();
        showToast(res.message, res.success ? "success" : "error");
        rerenderCallback();
      });
    });
  }

  // Stock Trading
  document.querySelectorAll(".btn-trade-stock").forEach(btn => {
    btn.addEventListener("click", () => {
      const ticker = btn.dataset.ticker;
      const stock = STOCKS_DATA.find(s => s.ticker === ticker);
      const price = state.finances?.stockPrices[ticker] || stock.initialPriceUSD;
      const holding = state.finances?.stockPortfolio[ticker] || { shares: 0 };

      openModal(`Trade ${ticker} (${stock.name})`, `
        <div class="detail-grid" style="padding-top: 0; margin-bottom: 14px;">
          <div><div class="detail-label">Price</div><div class="detail-val-mono">$${price.toFixed(2)}</div></div>
          <div><div class="detail-label">Owned</div><div class="detail-val-mono">${holding.shares} shares</div></div>
        </div>
        <div class="input-group">
          <label class="input-label">Action</label>
          <select id="selectStockAction" class="input-field">
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div class="input-group">
          <label class="input-label">Number of shares</label>
          <input type="number" id="inputStockShares" class="input-field" value="50">
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmStockTrade" type="button">Execute trade</button>
      `);

      document.getElementById("btnConfirmStockTrade")?.addEventListener("click", () => {
        const action = document.getElementById("selectStockAction").value;
        const shares = parseInt(document.getElementById("inputStockShares").value);
        const res = action === "buy" ? buyStock(state, ticker, shares) : sellStock(state, ticker, shares);
        closeModal();
        showToast(res.message, res.success ? "celebrate" : "error");
        rerenderCallback();
      });
    });
  });

  // Crypto Trading
  document.querySelectorAll(".btn-trade-crypto").forEach(btn => {
    btn.addEventListener("click", () => {
      const symbol = btn.dataset.symbol;
      const crypto = CRYPTO_DATA.find(c => c.symbol === symbol);
      const price = state.finances?.cryptoPrices[symbol] || crypto.initialPriceUSD;
      const holding = state.finances?.cryptoPortfolio[symbol] || { coins: 0 };

      openModal(`Trade ${symbol}`, `
        <div class="detail-grid" style="padding-top: 0; margin-bottom: 14px;">
          <div><div class="detail-label">Price</div><div class="detail-val-mono">$${price.toLocaleString()}</div></div>
          <div><div class="detail-label">Owned</div><div class="detail-val-mono">${holding.coins.toFixed(4)} ${symbol}</div></div>
        </div>
        <div class="input-group">
          <label class="input-label">Action</label>
          <select id="selectCryptoAction" class="input-field">
            <option value="buy">Buy (USD amount)</option>
            <option value="sell">Sell (coins)</option>
          </select>
        </div>
        <div class="input-group">
          <label class="input-label">Amount</label>
          <input type="number" id="inputCryptoAmt" class="input-field" value="5000">
        </div>
        <button class="btn btn-primary btn-full" id="btnConfirmCryptoTrade" type="button">Execute trade</button>
      `);

      document.getElementById("btnConfirmCryptoTrade")?.addEventListener("click", () => {
        const action = document.getElementById("selectCryptoAction").value;
        const val = parseFloat(document.getElementById("inputCryptoAmt").value);
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

  // Luxury Acquisition
  document.querySelectorAll(".btn-buy-luxury-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const price = parseFloat(btn.dataset.price);
      const name = btn.dataset.name;
      if (state.finances.cashUSD < price) {
        showToast(`Insufficient cash for ${name}`, "error");
        return;
      }
      state.finances.cashUSD -= price;
      if (!state.assets.luxury) state.assets.luxury = [];
      state.assets.luxury.push({ name, priceUSD: price });
      showToast(`Acquired ${name}`, "celebrate");
      rerenderCallback();
    });
  });
}
