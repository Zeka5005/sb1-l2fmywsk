export const TAX_BRACKETS_2023: Array<{
  rate: number;
  single: number;
  married: number;
  hoh: number;
}> = [
  { rate: 0.10, single: 11000, married: 22000, hoh: 15700 },
  { rate: 0.12, single: 44725, married: 89450, hoh: 59850 },
  { rate: 0.22, single: 95375, married: 190750, hoh: 95350 },
  { rate: 0.24, single: 182100, married: 364200, hoh: 182100 },
  { rate: 0.32, single: 231250, married: 462500, hoh: 231250 },
  { rate: 0.35, single: 578125, married: 693750, hoh: 578100 },
  { rate: 0.37, single: Infinity, married: Infinity, hoh: Infinity },
];

export const STANDARD_DEDUCTION_2023 = {
  single: 13850,
  married: 27700,
  headOfHousehold: 20800,
  blindOrElderly: 1500,
};

export const SELF_EMPLOYMENT = {
  taxRate: 0.153, // 15.3% (12.4% Social Security + 2.9% Medicare)
  threshold: 400, // Self-employment income must be at least $400
  socialSecurityWageBase: 160200, // 2023 Social Security wage base
  additionalMedicareTaxRate: 0.009, // 0.9% Additional Medicare Tax
  medicareThreshold: {
    single: 200000,
    married: 250000,
    headOfHousehold: 200000,
  },
};

export const SOCIAL_SECURITY = {
  maxTaxableEarnings: 160200, // 2023 maximum taxable earnings
  benefitTaxationThresholds: {
    // Combined income thresholds for Social Security benefit taxation
    single: {
      fifty: 25000, // 50% taxable above this
      eighty_five: 34000, // 85% taxable above this
    },
    married: {
      fifty: 32000,
      eighty_five: 44000,
    },
  },
};

export const CHILD_TAX_CREDIT = {
  maxCredit: 2000, // Per qualifying child
  refundableLimit: 1600, // Maximum refundable amount per child
  phaseoutStart: {
    single: 200000,
    married: 400000,
  },
  phaseoutRate: 0.05, // $50 reduction per $1,000 above threshold
};

export const EARNED_INCOME_CREDIT = {
  maxAmounts: {
    0: 560, // No qualifying children
    1: 3995, // One qualifying child
    2: 6604, // Two qualifying children
    3: 7430, // Three or more qualifying children
  },
  incomeThresholds: {
    single: {
      0: 17640,
      1: 46560,
      2: 52918,
      3: 56838,
    },
    married: {
      0: 24210,
      1: 53120,
      2: 59478,
      3: 63398,
    },
  },
};