// Household and student education-payment routing.
// Amounts are stored in normalized USD; the UI can format them in local currency.

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function ensureHousehold(state) {
  state.family = state.family || {};
  state.family.household = state.family.household || {
    savingsUSD: 0,
    educationBudgetUSD: 0,
    annualIncomeUSD: 0,
    parents: [],
    pendingExpenses: []
  };
  const household = state.family.household;
  household.parents = household.parents || state.family.parents || [];
  household.pendingExpenses = household.pendingExpenses || [];
  household.savingsUSD = Number(household.savingsUSD) || 0;
  household.educationBudgetUSD = Number(household.educationBudgetUSD) || 0;
  state.finances = state.finances || {};
  state.finances.studentAccount = state.finances.studentAccount || { cashUSD: 0, lifetimeEarningsUSD: 0, ledger: [] };
  return household;
}

function parentDecisionScore(household, amountUSD, mandatory) {
  const parents = household.parents || [];
  if (!parents.length) return mandatory ? 1 : 0;
  const average = parents.reduce((sum, parent) => {
    return sum + ((Number(parent.generosity) || 50) * 0.45) + ((Number(parent.academicExpectations) || 50) * 0.35) + ((Number(parent.relationship) || 50) * 0.20);
  }, 0) / parents.length;
  const budgetPressure = household.educationBudgetUSD > 0
    ? clamp(amountUSD / household.educationBudgetUSD, 0, 2)
    : 1;
  const score = average - (budgetPressure > 1 ? (budgetPressure - 1) * 35 : 0);
  return clamp((score / 100) + (mandatory ? 0.18 : 0), 0, 1);
}

export function requestEducationPayment(state, {
  amountUSD,
  type = "education",
  description = "Education expense",
  mandatory = false
} = {}) {
  const amount = Math.max(0, Math.round(Number(amountUSD) || 0));
  if (!amount) return { success: true, payer: "none", amountUSD: 0, message: "No payment required." };

  const age = Number(state.character?.age) || 0;
  const household = ensureHousehold(state);
  const isDependent = age < 18 || (age < 23 && type === "tuition");
  const canHouseholdPay = household.savingsUSD >= amount;

  if (isDependent && canHouseholdPay) {
    const approval = parentDecisionScore(household, amount, mandatory);
    if (approval >= 0.48) {
      household.savingsUSD -= amount;
      household.pendingExpenses.push({ age, type, description, amountUSD: amount, payer: "household", approved: true });
      return { success: true, payer: "household", amountUSD: amount, message: `Household paid $${amount.toLocaleString()} for ${description}.` };
    }
    if (mandatory) {
      state.finances.debt.studentLoansUSD = (state.finances.debt.studentLoansUSD || 0) + amount;
      household.pendingExpenses.push({ age, type, description, amountUSD: amount, payer: "student_loan", approved: true });
      return { success: true, payer: "student_loan", amountUSD: amount, message: `Your parents declined, so $${amount.toLocaleString()} for ${description} was financed through student debt.` };
    }
    return { success: false, payer: "household", amountUSD: amount, reason: "parent_declined", message: `Your parents declined the $${amount.toLocaleString()} request for ${description}.` };
  }

  const personalAccount = age < 18 ? state.finances.studentAccount : state.finances;
  if ((personalAccount.cashUSD || 0) >= amount) {
    personalAccount.cashUSD -= amount;
    household.pendingExpenses.push({ age, type, description, amountUSD: amount, payer: "student", approved: true });
    return { success: true, payer: "student", amountUSD: amount, message: `You paid $${amount.toLocaleString()} for ${description}.` };
  }

  if (type === "tuition" || mandatory) {
    state.finances.debt.studentLoansUSD = (state.finances.debt.studentLoansUSD || 0) + amount;
    household.pendingExpenses.push({ age, type, description, amountUSD: amount, payer: "student_loan", approved: true });
    return { success: true, payer: "student_loan", amountUSD: amount, message: `Financed $${amount.toLocaleString()} for ${description} through student debt.` };
  }

  return { success: false, payer: "none", amountUSD: amount, reason: "insufficient_funds", message: `No eligible payer could cover $${amount.toLocaleString()} for ${description}.` };
}
