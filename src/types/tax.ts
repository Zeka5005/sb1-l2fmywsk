export interface TaxPayer {
  firstName: string;
  lastName: string;
  ssn: string;
  filingStatus: 'single' | 'married' | 'headOfHousehold';
  dependents: number;
  age: number;
  isBlind: boolean;
}

export interface Income {
  wages: number;
  selfEmployment: number;
  investments: number;
  dividends: number;
  rentalIncome: number;
  retirement: number;
  socialSecurity: number;
  other: number;
  withholdingAmount: number;
  estimatedTaxPayments: number;
}

export interface Deductions {
  mortgage: number;
  studentLoanInterest: number;
  charitable: number;
  medical: number;
  stateLocalTax: number;
  propertyTax: number;
  educationExpenses: number;
  retirementContributions: number;
  healthSavings: number;
}

export interface Credits {
  childTaxCredit: number;
  childCareCredit: number;
  educationCredit: number;
  energyCredit: number;
  earnedIncomeCredit: number;
  foreignTaxCredit: number;
  retirementSavingsCredit: number;
}

export interface TaxCalculation {
  totalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  standardDeduction: number;
  itemizedDeductions: number;
  effectiveDeductions: number;
  estimatedTax: number;
  totalCredits: number;
  finalTax: number;
  effectiveTaxRate: number;
  selfEmploymentTax: number;
  totalTaxLiability: number;
  totalPayments: number;
  refundAmount: number;
  amountDue: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface TaxBracket {
  rate: number;
  single: number;
  married: number;
  hoh: number;
}