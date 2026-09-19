// Real estate property engine: Purchasing, Mortgage, Renting, Renovation, and Flipping

import { PROPERTY_TEMPLATES, LUXURY_VEHICLES, AVIATION_MARINE, FINE_ART_COLLECTIBLES } from "../data/assets_data.js";
import { calculateNetWorth } from "../state.js";

export function buyProperty(state, templateId, useMortgage = false) {
  const template = PROPERTY_TEMPLATES.find(p => p.id === templateId);
  if (!template) return { success: false, message: "Property type not found." };

  const downPayment = useMortgage ? Math.round(template.basePriceUSD * 0.20) : template.basePriceUSD;
  if (state.finances.cashUSD < downPayment) {
    return {
      success: false,
      message: `Insufficient funds. Required down payment is $${downPayment.toLocaleString()}.`
    };
  }

  if (useMortgage && state.stats.creditScore < 600) {
    return {
      success: false,
      message: `Mortgage rejected! Credit score too low (${state.stats.creditScore}/600 required).`
    };
  }

  state.finances.cashUSD -= downPayment;
  const mortgageBalance = useMortgage ? template.basePriceUSD - downPayment : 0;

  const propertyInstance = {
    instanceId: "prop_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
    templateId: template.id,
    name: template.name,
    type: template.type,
    icon: template.icon,
    purchasePriceUSD: template.basePriceUSD,
    marketValueUSD: template.basePriceUSD,
    conditionPct: Math.floor(65 + Math.random() * 20), // Initial condition
    renovatedLevel: 0, // 0 to 3
    renovationsTotalSpentUSD: 0,
    isRented: false,
    rentalStrategy: "standard", // standard, corporate_lease, luxury_airbnb
    annualRentUSD: 0,
    annualMaintenanceUSD: Math.round(template.basePriceUSD * template.annualMaintenancePct),
    mortgageBalanceUSD: mortgageBalance,
    yearsOwned: 0
  };

  state.assets.properties.push(propertyInstance);
  calculateNetWorth(state);

  return {
    success: true,
    message: `Purchased ${propertyInstance.name} ${propertyInstance.icon} for $${template.basePriceUSD.toLocaleString()}${useMortgage ? ` with $${mortgageBalance.toLocaleString()} mortgage` : ' (All Cash)'}!`
  };
}

export function renovateProperty(state, instanceId, tier = 1) {
  const prop = state.assets.properties.find(p => p.instanceId === instanceId);
  if (!prop) return { success: false, message: "Property not found." };

  const template = PROPERTY_TEMPLATES.find(t => t.id === prop.templateId);
  const baseRenoCost = template ? template.renovationCostUSD : 50000;
  const renoCost = Math.round(baseRenoCost * tier);

  if (state.finances.cashUSD < renoCost) {
    return { success: false, message: `Renovation costs $${renoCost.toLocaleString()}. Insufficient liquid cash.` };
  }

  state.finances.cashUSD -= renoCost;
  prop.renovationsTotalSpentUSD += renoCost;
  prop.conditionPct = 100;
  prop.renovatedLevel = Math.min(3, prop.renovatedLevel + tier);

  // Property value increases by 1.3x to 1.5x the renovation investment!
  const valueBoost = Math.round(renoCost * (1.35 + Math.random() * 0.20));
  prop.marketValueUSD += valueBoost;

  // If rented, recalculate higher rental yield
  if (prop.isRented) {
    updatePropertyRentRate(prop, template);
  }

  calculateNetWorth(state);

  return {
    success: true,
    message: `Renovation completed! Upgraded ${prop.name} for $${renoCost.toLocaleString()}. Market appraisal boosted by +$${valueBoost.toLocaleString()} to $${prop.marketValueUSD.toLocaleString()}!`
  };
}

export function toggleRentProperty(state, instanceId, strategy = "standard") {
  const prop = state.assets.properties.find(p => p.instanceId === instanceId);
  if (!prop) return { success: false, message: "Property not found." };

  const template = PROPERTY_TEMPLATES.find(t => t.id === prop.templateId);

  if (prop.isRented) {
    // Vacate
    prop.isRented = false;
    prop.annualRentUSD = 0;
    return { success: true, message: `Tenants moved out. ${prop.name} is now vacant.` };
  } else {
    // Rent out
    prop.isRented = true;
    prop.rentalStrategy = strategy;
    updatePropertyRentRate(prop, template);
    return {
      success: true,
      message: `Successfully leased ${prop.name} (${strategy}) generating $${prop.annualRentUSD.toLocaleString()}/year in gross rental income!`
    };
  }
}

function updatePropertyRentRate(prop, template) {
  const baseYield = template ? template.baseRentYieldPct : 0.06;
  let strategyMultiplier = 1.0;
  if (prop.rentalStrategy === "corporate_lease") strategyMultiplier = 1.15;
  if (prop.rentalStrategy === "luxury_airbnb") strategyMultiplier = 1.35;

  const conditionMultiplier = 0.6 + (prop.conditionPct / 100) * 0.5;
  const grossRent = Math.round(prop.marketValueUSD * baseYield * strategyMultiplier * conditionMultiplier);
  prop.annualRentUSD = grossRent;
}

export function flipProperty(state, instanceId) {
  const index = state.assets.properties.findIndex(p => p.instanceId === instanceId);
  if (index === -1) return { success: false, message: "Property not found." };

  const prop = state.assets.properties[index];
  const salePrice = prop.marketValueUSD;
  const brokerFee = Math.round(salePrice * 0.04); // 4% closing broker fee
  const mortgagePayoff = prop.mortgageBalanceUSD;

  const netCashProceeds = salePrice - brokerFee - mortgagePayoff;
  const totalInvested = prop.purchasePriceUSD + prop.renovationsTotalSpentUSD;
  const flipProfit = salePrice - totalInvested - brokerFee;

  state.finances.cashUSD += netCashProceeds;
  state.assets.properties.splice(index, 1);
  state.stats.prestige = Math.min(100, state.stats.prestige + 2);
  calculateNetWorth(state);

  return {
    success: true,
    message: `FLIP SUCCESSFUL! Sold ${prop.name} for $${salePrice.toLocaleString()}. Net cash received: $${netCashProceeds.toLocaleString()} | Flip Profit: $${flipProfit.toLocaleString()}!`
  };
}

// Purchase other luxury asset categories
export function buyLuxuryVehicle(state, vehicleId) {
  const item = LUXURY_VEHICLES.find(v => v.id === vehicleId);
  if (!item) return { success: false, message: "Vehicle not found." };
  if (state.finances.cashUSD < item.priceUSD) return { success: false, message: "Insufficient liquid cash." };

  state.finances.cashUSD -= item.priceUSD;
  state.assets.vehicles.push({ ...item, purchaseAge: state.character.age });
  state.stats.prestige = Math.min(100, state.stats.prestige + Math.round(item.prestige / 4));
  state.stats.happiness = Math.min(100, state.stats.happiness + 8);
  calculateNetWorth(state);

  return { success: true, message: `Acquired ${item.name} ${item.icon} for $${item.priceUSD.toLocaleString()}!` };
}

export function buyAviationMarine(state, itemId) {
  const item = AVIATION_MARINE.find(a => a.id === itemId);
  if (!item) return { success: false, message: "Asset not found." };
  if (state.finances.cashUSD < item.priceUSD) return { success: false, message: "Insufficient liquid cash." };

  state.finances.cashUSD -= item.priceUSD;
  state.assets.aviationMarine.push({ ...item, purchaseAge: state.character.age });
  state.stats.prestige = Math.min(100, state.stats.prestige + Math.round(item.prestige / 3));
  state.stats.happiness = Math.min(100, state.stats.happiness + 15);
  calculateNetWorth(state);

  return { success: true, message: `Acquired ${item.name} ${item.icon} for $${item.priceUSD.toLocaleString()}!` };
}

export function buyFineArt(state, artId) {
  const item = FINE_ART_COLLECTIBLES.find(a => a.id === artId);
  if (!item) return { success: false, message: "Collectible not found." };
  if (state.finances.cashUSD < item.priceUSD) return { success: false, message: "Insufficient liquid cash." };

  state.finances.cashUSD -= item.priceUSD;
  state.assets.fineArtCollectibles.push({ ...item, purchaseAge: state.character.age });
  state.stats.prestige = Math.min(100, state.stats.prestige + Math.round(item.prestige / 3));
  calculateNetWorth(state);

  return { success: true, message: `Acquired masterpiece ${item.name} ${item.icon} for $${item.priceUSD.toLocaleString()}!` };
}

// Annual Property & Luxury Step
export function stepPropertiesAndAssets(state) {
  const logs = [];
  let totalNetRentCollected = 0;

  // Real estate market trend (-0.02 to +0.07)
  const realEstateTrend = 0.02 + (Math.random() * 0.05);

  state.assets.properties.forEach(prop => {
    prop.yearsOwned += 1;

    // Market appreciation
    prop.marketValueUSD = Math.round(prop.marketValueUSD * (1 + realEstateTrend));

    // Rent collection & wear
    if (prop.isRented) {
      const grossRent = prop.annualRentUSD;
      const maintenance = prop.annualMaintenanceUSD;
      const netRent = grossRent - maintenance;
      totalNetRentCollected += netRent;

      // Condition wear
      prop.conditionPct = Math.max(20, prop.conditionPct - Math.floor(3 + Math.random() * 4));
    } else {
      // Vacant property maintenance
      totalNetRentCollected -= Math.round(prop.annualMaintenanceUSD * 0.5);
    }

    // Mortgage amortization (30-year schedule)
    if (prop.mortgageBalanceUSD > 0) {
      const annualMortgagePayment = Math.round(prop.mortgageBalanceUSD * 0.07);
      state.finances.cashUSD -= annualMortgagePayment;
      prop.mortgageBalanceUSD = Math.max(0, prop.mortgageBalanceUSD - Math.round(annualMortgagePayment * 0.6));
    }
  });

  if (totalNetRentCollected !== 0) {
    state.finances.cashUSD += totalNetRentCollected;
    logs.push(`Net real estate cash flow: ${totalNetRentCollected >= 0 ? '+' : ''}$${totalNetRentCollected.toLocaleString()}`);
  }

  // Aviation & Marine annual upkeep
  let yachtJetMaintenance = 0;
  state.assets.aviationMarine.forEach(am => {
    yachtJetMaintenance += am.annualMaintenanceUSD;
  });
  if (yachtJetMaintenance > 0) {
    state.finances.cashUSD -= yachtJetMaintenance;
    logs.push(`Paid $${yachtJetMaintenance.toLocaleString()} for private jet/yacht crew, fuel, and dockage.`);
  }

  // Fine art appreciation
  state.assets.fineArtCollectibles.forEach(art => {
    art.priceUSD = Math.round(art.priceUSD * (1 + art.appreciationRate));
  });

  return logs;
}
