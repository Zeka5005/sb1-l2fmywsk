import { Income, Deductions, Credits, TaxCalculation } from '../types/tax';
import {
  TAX_BRACKETS_2023,
  STANDARD_DEDUCTION_2023,
  SELF_EMPLOYMENT,
  SOCIAL_SECURITY,
  CHILD_TAX_CREDIT,
  EARNED_INCOME_CREDIT,
} from './taxConstants';

export const calculateTotalIncome = (income: Income): number => {
  return Object.entries(income).reduce((sum, [key, value]) => {
    if (key !== 'withholdingAmount' && key !== 'estimatedTaxPayments') {
      return sum + (value || 0);
    }
    return sum;
  }, 0);
};

export const calculateItemizedDeductions = (deductions: Deductions): number => {
  return Object.values(deductions).reduce((sum, value) => sum + (value || 0), 0);
};

export const calculateTotalCredits = (credits: Credits): number => {
  return Object.values(credits).reduce((sum, value) => sum + (value || 0), 0);
};

export const calculateSelfEmploymentTax = (selfEmploymentIncome: number): number => {
  if (selfEmploymentIncome < SELF_EMPLOYMENT.threshold) {
    return 0;
  }

  const taxableIncome = selfEmploymentIncome * 0.9235; // 92.35% of self-employment income is taxable
  let socialSecurityTax = Math.min(taxableIncome, SELF_EMPLOYMENT.socialSecurityWageBase) * 0.124;
  let medicareTax = taxableIncome * 0.029;

  return socialSecurityTax + medicareTax;
};

export const calculateSocialSecurityBenefitTaxation = (
  benefits: number,
  otherIncome: number,
  filingStatus: string
): number => {
  const combinedIncome = otherIncome + benefits * 0.5;
  const thresholds = SOCIAL_SECURITY.benefitTaxationThresholds[filingStatus as keyof typeof SOCIAL_SECURITY.benefitTaxationThresholds];

  if (combinedIncome <= thresholds.fifty) {
    return 0;
  } else if (combinedIncome <= thresholds.eighty_five) {
    return benefits * 0.5;
  } else {
    return benefits * 0.85;
  }
};

export const calculateChildTaxCredit = (
  numChildren: number,
  income: number,
  filingStatus: string
): number => {
  const threshold = CHILD_TAX_CREDIT.phaseoutStart[filingStatus as keyof typeof CHILD_TAX_CREDIT.phaseoutStart];
  const maxCredit = numChildren * CHILD_TAX_CREDIT.maxCredit;

  if (income <= threshold) {
    return maxCredit;
  }

  const reduction = Math.floor((income - threshold) / 1000) * 50 * numChildren;
  return Math.max(0, maxCredit - reduction);
};

export const calculateEarnedIncomeCredit = (
  earnedIncome: number,
  numChildren: number,
  filingStatus: string
): number => {
  const maxAmount = EARNED_INCOME_CREDIT.maxAmounts[numChildren as keyof typeof EARNED_INCOME_CREDIT.maxAmounts] || 0;
  const threshold = EARNED_INCOME_CREDIT.incomeThresholds[filingStatus as keyof typeof EARNED_INCOME_CREDIT.incomeThresholds][
    numChildren as keyof typeof EARNED_INCOME_CREDIT.incomeThresholds.single
  ];

  if (earnedIncome > threshold) {
    return 0;
  }

  // Simplified calculation - actual EIC calculation involves phase-in and phase-out rates
  return Math.min(maxAmount, (earnedIncome / threshold) * maxAmount);
};

export const calculateTax = (
  income: Income,
  deductions: Deductions,
  credits: Credits,
  filingStatus: string,
  age: number,
  isBlind: boolean
): TaxCalculation => {
  const totalIncome = calculateTotalIncome(income);
  const itemizedDeductions = calculateItemizedDeductions(deductions);
  
  let standardDeduction = STANDARD_DEDUCTION_2023[filingStatus as keyof typeof STANDARD_DEDUCTION_2023];
  if (age >= 65 || isBlind) {
    standardDeduction += STANDARD_DEDUCTION_2023.blindOrElderly;
  }
  
  const effectiveDeductions = Math.max(standardDeduction, itemizedDeductions);
  const taxableIncome = Math.max(0, totalIncome - effectiveDeductions);
  
  let remainingIncome = taxableIncome;
  let estimatedTax = 0;
  let previousBracket = 0;
  
  TAX_BRACKETS_2023.forEach(bracket => {
    const limit = bracket[filingStatus as keyof typeof bracket];
    const taxableInThisBracket = Math.min(
      Math.max(0, remainingIncome),
      limit - previousBracket
    );
    
    estimatedTax += taxableInThisBracket * bracket.rate;
    remainingIncome -= taxableInThisBracket;
    previousBracket = limit;
  });

  const selfEmploymentTax = calculateSelfEmploymentTax(income.selfEmployment);
  const totalCredits = calculateTotalCredits(credits);
  const totalTaxLiability = estimatedTax + selfEmploymentTax;
  const finalTax = Math.max(0, totalTaxLiability - totalCredits);
  
  const totalPayments = (income.withholdingAmount || 0) + (income.estimatedTaxPayments || 0);
  const refundAmount = totalPayments > finalTax ? totalPayments - finalTax : 0;
  const amountDue = finalTax > totalPayments ? finalTax - totalPayments : 0;
  
  const effectiveTaxRate = totalIncome > 0 ? (finalTax / totalIncome) * 100 : 0;

  return {
    totalIncome,
    totalDeductions: effectiveDeductions,
    taxableIncome,
    standardDeduction,
    itemizedDeductions,
    effectiveDeductions,
    estimatedTax,
    totalCredits,
    finalTax,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    selfEmploymentTax,
    totalTaxLiability,
    totalPayments,
    refundAmount,
    amountDue,
  };
};