// Financial markets engine: Stock trading, Margin lending, Crypto, Savings APY, and Credit Scoring

import { STOCKS_DATA, CRYPTO_DATA, BANKING_PRODUCTS } from "../data/stocks_data.js";
import { calculateNetWorth } from "../state.js";

export function buyStock(state, ticker, shares) {
  shares = parseInt(shares);
  if (isNaN(shares) || shares <= 0) return { success: false, message: "Invalid share quantity." };

  const price = state.finances.stockPrices[ticker];
  if (!price) return { success: false, message: "Asset not found." };

  const totalCost = shares * price;
  if (state.finances.cashUSD < totalCost) {
    return { success: false, message: `Insufficient cash. Requires $${Math.round(totalCost).toLocaleString()}.` };
  }

  state.finances.cashUSD -= totalCost;
  if (!state.finances.stockPortfolio[ticker]) {
    state.finances.stockPortfolio[ticker] = { shares: 0, avgCostUSD: 0 };
  }

  const currentHolding = state.finances.stockPortfolio[ticker];
  const newTotalCost = (currentHolding.shares * currentHolding.avgCostUSD) + totalCost;
  currentHolding.shares += shares;
  currentHolding.avgCostUSD = Math.round((newTotalCost / currentHolding.shares) * 100) / 100;

  calculateNetWorth(state);
  return { success: true, message: `Successfully purchased ${shares.toLocaleString()} shares of ${ticker} for $${Math.round(totalCost).toLocaleString()}.` };
}

export function sellStock(state, ticker, shares) {
  shares = parseInt(shares);
  if (isNaN(shares) || shares <= 0) return { success: false, message: "Invalid share quantity." };

  const holding = state.finances.stockPortfolio[ticker];
  if (!holding || holding.shares < shares) {
    return { success: false, message: "You do not own enough shares to sell." };
  }

  const price = state.finances.stockPrices[ticker];
  const totalProceeds = shares * price;

  holding.shares -= shares;
  if (holding.shares === 0) {
    delete state.finances.stockPortfolio[ticker];
  }

  state.finances.cashUSD += totalProceeds;
  calculateNetWorth(state);
  return { success: true, message: `Sold ${shares.toLocaleString()} shares of ${ticker} for $${Math.round(totalProceeds).toLocaleString()}.` };
}

export function buyCrypto(state, symbol, amountUSD) {
  amountUSD = parseFloat(amountUSD);
  if (isNaN(amountUSD) || amountUSD <= 0) return { success: false, message: "Invalid amount." };
  if (state.finances.cashUSD < amountUSD) return { success: false, message: "Insufficient liquid cash." };

  const price = state.finances.cryptoPrices[symbol];
  if (!price) return { success: false, message: "Crypto symbol not found." };

  const coins = amountUSD / price;
  state.finances.cashUSD -= amountUSD;

  if (!state.finances.cryptoPortfolio[symbol]) {
    state.finances.cryptoPortfolio[symbol] = { coins: 0, avgCostUSD: 0 };
  }

  const current = state.finances.cryptoPortfolio[symbol];
  const prevTotal = current.coins * current.avgCostUSD;
  current.coins += coins;
  current.avgCostUSD = (prevTotal + amountUSD) / current.coins;

  calculateNetWorth(state);
  return { success: true, message: `Purchased ${coins.toFixed(4)} ${symbol} for $${Math.round(amountUSD).toLocaleString()}.` };
}

export function sellCrypto(state, symbol, coins) {
  coins = parseFloat(coins);
  if (isNaN(coins) || coins <= 0) return { success: false, message: "Invalid coin amount." };

  const holding = state.finances.cryptoPortfolio[symbol];
  if (!holding || holding.coins < coins) {
    return { success: false, message: `Insufficient ${symbol} holdings.` };
  }

  const price = state.finances.cryptoPrices[symbol];
  const proceeds = coins * price;

  holding.coins -= coins;
  if (holding.coins <= 0.000001) {
    delete state.finances.cryptoPortfolio[symbol];
  }

  state.finances.cashUSD += proceeds;
  calculateNetWorth(state);
  return { success: true, message: `Sold ${coins.toFixed(4)} ${symbol} for $${Math.round(proceeds).toLocaleString()}.` };
}

export function depositSavings(state, amountUSD) {
  amountUSD = parseFloat(amountUSD);
  if (isNaN(amountUSD) || amountUSD <= 0) return { success: false, message: "Invalid deposit amount." };
  if (state.finances.cashUSD < amountUSD) return { success: false, message: "Insufficient cash." };

  state.finances.cashUSD -= amountUSD;
  state.finances.savingsUSD += amountUSD;
  return { success: true, message: `Deposited $${Math.round(amountUSD).toLocaleString()} into High-Yield Savings.` };
}

export function withdrawSavings(state, amountUSD) {
  amountUSD = parseFloat(amountUSD);
  if (isNaN(amountUSD) || amountUSD <= 0) return { success: false, message: "Invalid withdrawal amount." };
  if (state.finances.savingsUSD < amountUSD) return { success: false, message: "Insufficient savings balance." };

  state.finances.savingsUSD -= amountUSD;
  state.finances.cashUSD += amountUSD;
  return { success: true, message: `Withdrew $${Math.round(amountUSD).toLocaleString()} to liquid cash.` };
}

export function borrowMargin(state, amountUSD) {
  amountUSD = parseFloat(amountUSD);
  if (isNaN(amountUSD) || amountUSD <= 0) return { success: false, message: "Invalid borrowing amount." };

  // Calculate stock equity
  let stockValue = 0;
  for (const [ticker, holding] of Object.entries(state.finances.stockPortfolio)) {
    const price = state.finances.stockPrices[ticker] || 0;
    stockValue += holding.shares * price;
  }

  const maxBorrow = stockValue * BANKING_PRODUCTS.maxMarginLTV;
  const currentLoan = state.finances.debt.marginLoanUSD || 0;
  const availableBorrow = Math.max(0, maxBorrow - currentLoan);

  if (amountUSD > availableBorrow) {
    return { success: false, message: `Maximum available margin loan is $${Math.round(availableBorrow).toLocaleString()} (50% portfolio LTV).` };
  }

  state.finances.debt.marginLoanUSD = currentLoan + amountUSD;
  state.finances.cashUSD += amountUSD;
  calculateNetWorth(state);
  return { success: true, message: `Borrowed $${Math.round(amountUSD).toLocaleString()} collateralized by your stock portfolio at 6.5% APR.` };
}

export function repayMargin(state, amountUSD) {
  amountUSD = parseFloat(amountUSD);
  if (isNaN(amountUSD) || amountUSD <= 0) return { success: false, message: "Invalid repayment amount." };

  const currentLoan = state.finances.debt.marginLoanUSD || 0;
  if (currentLoan <= 0) return { success: false, message: "You have no outstanding margin debt." };

  const actualPayment = Math.min(amountUSD, currentLoan);
  if (state.finances.cashUSD < actualPayment) return { success: false, message: "Insufficient cash for loan repayment." };

  state.finances.cashUSD -= actualPayment;
  state.finances.debt.marginLoanUSD -= actualPayment;
  calculateNetWorth(state);
  return { success: true, message: `Repaid $${Math.round(actualPayment).toLocaleString()} of margin debt.` };
}

// Annual Market Progression
export function stepFinancialMarkets(state) {
  const logs = [];
  let dividendIncome = 0;

  // Macro market cycle: Random economic factor (-0.08 to +0.12)
  const macroTrend = (Math.random() * 0.20) - 0.08;

  // Stocks
  STOCKS_DATA.forEach(stockDef => {
    const ticker = stockDef.ticker;
    const currentPrice = state.finances.stockPrices[ticker] || stockDef.initialPriceUSD;

    // Normal distribution approximation
    const noise = ((Math.random() + Math.random() + Math.random()) - 1.5) * stockDef.volatility;
    const returnRate = stockDef.growthBias + macroTrend + noise;
    const newPrice = Math.max(1.0, Math.round(currentPrice * (1 + returnRate) * 100) / 100);

    state.finances.stockPrices[ticker] = newPrice;
    if (!state.finances.stockHistory[ticker]) state.finances.stockHistory[ticker] = [];
    state.finances.stockHistory[ticker].push(newPrice);
    if (state.finances.stockHistory[ticker].length > 20) state.finances.stockHistory[ticker].shift();

    // Check dividends
    const holding = state.finances.stockPortfolio[ticker];
    if (holding && holding.shares > 0 && stockDef.dividendYieldPct > 0) {
      const payout = Math.round(holding.shares * newPrice * stockDef.dividendYieldPct);
      dividendIncome += payout;
    }
  });

  if (dividendIncome > 0) {
    state.finances.cashUSD += dividendIncome;
    logs.push(`Collected $${dividendIncome.toLocaleString()} in annual stock dividend payouts.`);
  }

  // Cryptos
  CRYPTO_DATA.forEach(cryptoDef => {
    const symbol = cryptoDef.symbol;
    const currentPrice = state.finances.cryptoPrices[symbol] || cryptoDef.initialPriceUSD;
    const noise = ((Math.random() + Math.random() + Math.random()) - 1.5) * cryptoDef.volatility;
    const returnRate = cryptoDef.growthBias + (macroTrend * 1.5) + noise;
    const newPrice = Math.max(0.1, Math.round(currentPrice * (1 + returnRate) * 100) / 100);

    state.finances.cryptoPrices[symbol] = newPrice;
    if (!state.finances.cryptoHistory[symbol]) state.finances.cryptoHistory[symbol] = [];
    state.finances.cryptoHistory[symbol].push(newPrice);
    if (state.finances.cryptoHistory[symbol].length > 20) state.finances.cryptoHistory[symbol].shift();
  });

  // High Yield Savings Interest (4.5% APY)
  if (state.finances.savingsUSD > 0) {
    const interest = Math.round(state.finances.savingsUSD * BANKING_PRODUCTS.highYieldSavingsAPY);
    state.finances.savingsUSD += interest;
    logs.push(`Earned $${interest.toLocaleString()} in interest from High-Yield Savings (4.5% APY).`);
  }

  // Margin Loan Interest (6.5% APR)
  if (state.finances.debt.marginLoanUSD > 0) {
    const interest = Math.round(state.finances.debt.marginLoanUSD * BANKING_PRODUCTS.marginLoanInterestRate);
    state.finances.debt.marginLoanUSD += interest;
    logs.push(`Accrued $${interest.toLocaleString()} in interest on outstanding margin loans.`);
  }

  // Credit Score calculation
  let score = 680;
  const netWorth = calculateNetWorth(state);
  if (netWorth > 50000) score += 30;
  if (netWorth > 250000) score += 40;
  if (netWorth > 1000000) score += 50;
  if (state.finances.savingsUSD > 10000) score += 20;

  const totalDebt = (state.finances.debt.marginLoanUSD || 0) + (state.finances.debt.studentLoansUSD || 0) + (state.finances.debt.businessLoansUSD || 0);
  if (totalDebt > netWorth * 0.7 && netWorth > 0) score -= 60;
  state.stats.creditScore = Math.min(850, Math.max(300, score));

  return logs;
}
