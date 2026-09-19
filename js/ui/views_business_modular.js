// Canonical modular business view. The older views_business.js is retained as
// migration reference for the monolith and is intentionally not imported here.

import { BUSINESS_CATALOG } from "../data/businesses_data.js";
import { incorporateBusiness } from "../systems/business_engine.js";
import { showToast } from "./ui_manager.js";

export function renderBusinessView(state) {
  const age = state.character.age;
  if (age < 18) {
    return `
      <div class="surface-box" style="text-align: center; padding: 36px 24px;">
        <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">Commercial enterprise locked</div>
        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.55; max-width: 440px; margin: 0 auto;">
          Registered companies, corporate treasury, and commercial contracts unlock at age 18.
        </p>
        <div class="detail-grid" style="max-width: 340px; margin: 20px auto 0; text-align: left;">
          <div><div class="detail-label">Current age</div><div class="detail-val-mono">${age}</div></div>
          <div><div class="detail-label">Years to incorporation</div><div class="detail-val-mono">${18 - age}</div></div>
        </div>
      </div>
    `;
  }

  const businesses = state.businesses || [];
  const catalog = BUSINESS_CATALOG.slice(0, 12);
  return `
    <h2 class="section-heading first">Business portfolio</h2>
    <div class="detail-grid">
      <div><div class="detail-label">Operating companies</div><div class="detail-val-mono">${businesses.length}</div></div>
      <div><div class="detail-label">Liquid cash</div><div class="detail-val-mono">$${Math.round(state.finances.cashUSD || 0).toLocaleString()}</div></div>
      <div><div class="detail-label">Current stage</div><div class="detail-val">Adult enterprise</div></div>
      <div><div class="detail-label">Catalog</div><div class="detail-val-mono">${BUSINESS_CATALOG.length} options</div></div>
    </div>
    ${businesses.length ? `
      <h2 class="section-heading">Active companies</h2>
      <div>${businesses.map(b => `<div class="list-row"><div class="list-row-left"><div style="font-size: 15px;">${b.name}</div><div style="font-size: 13px; color: var(--text-tertiary);">${b.sector || "General enterprise"}</div></div><div class="list-row-right"><span class="mono-val">$${Math.round(b.valuationUSD || b.currentValuationUSD || 0).toLocaleString()}</span></div></div>`).join("")}</div>
    ` : ''}
    <h2 class="section-heading">Start an enterprise</h2>
    <div>${catalog.map(b => `<div class="list-row"><div class="list-row-left"><div style="font-size: 15px;">${b.name}</div><div style="font-size: 13px; color: var(--text-tertiary);">${b.sector || "Enterprise"} · starting cost $${Math.round(b.startupCost || 0).toLocaleString()}</div></div><div class="list-row-right"><button class="btn btn-outline btn-sm btn-found-modular-biz" data-id="${b.id}" type="button">Found</button></div></div>`).join("")}</div>
  `;
}

export function bindBusinessEvents(state, rerenderCallback) {
  document.querySelectorAll(".btn-found-modular-biz").forEach(button => {
    button.addEventListener("click", () => {
      const result = incorporateBusiness(state, button.dataset.id, "bootstrap");
      if (!result.success) {
        showToast(result.message, "error");
        return;
      }
      if (state.biz?.length) {
        state.businesses = state.businesses || [];
        state.businesses.push(state.biz.pop());
      }
      showToast(result.message, "success");
      rerenderCallback();
    });
  });
}
