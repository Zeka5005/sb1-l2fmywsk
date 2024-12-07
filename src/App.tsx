import React, { useState, useEffect } from 'react';
import { TaxpayerInfo } from './components/TaxpayerInfo';
import { IncomeSection } from './components/IncomeSection';
import { DeductionsSection } from './components/DeductionsSection';
import { CreditsSection } from './components/CreditsSection';
import { TaxSummary } from './components/TaxSummary';
import { calculateTax } from './utils/taxCalculator';
import { validateTaxpayer, validateAmount } from './utils/validation';
import { TaxPayer, Income, Deductions, Credits, TaxCalculation } from './types/tax';
import { FileText } from 'lucide-react';

function App() {
  const [taxpayer, setTaxpayer] = useState<TaxPayer>({
    firstName: '',
    lastName: '',
    ssn: '',
    filingStatus: 'single',
    dependents: 0,
    age: 0,
    isBlind: false,
  });

  const [income, setIncome] = useState<Income>({
    wages: 0,
    selfEmployment: 0,
    investments: 0,
    dividends: 0,
    rentalIncome: 0,
    retirement: 0,
    socialSecurity: 0,
    other: 0,
    withholdingAmount: 0,
    estimatedTaxPayments: 0,
  });

  const [deductions, setDeductions] = useState<Deductions>({
    mortgage: 0,
    studentLoanInterest: 0,
    charitable: 0,
    medical: 0,
    stateLocalTax: 0,
    propertyTax: 0,
    educationExpenses: 0,
    retirementContributions: 0,
    healthSavings: 0,
  });

  const [credits, setCredits] = useState<Credits>({
    childTaxCredit: 0,
    childCareCredit: 0,
    educationCredit: 0,
    energyCredit: 0,
    earnedIncomeCredit: 0,
    foreignTaxCredit: 0,
    retirementSavingsCredit: 0,
  });

  const [calculation, setCalculation] = useState<TaxCalculation>({
    totalIncome: 0,
    totalDeductions: 0,
    taxableIncome: 0,
    standardDeduction: 0,
    itemizedDeductions: 0,
    effectiveDeductions: 0,
    estimatedTax: 0,
    totalCredits: 0,
    finalTax: 0,
    effectiveTaxRate: 0,
    selfEmploymentTax: 0,
    totalTaxLiability: 0,
    totalPayments: 0,
    refundAmount: 0,
    amountDue: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const validationErrors = validateTaxpayer(taxpayer);
    const newErrors: Record<string, string> = {};
    
    validationErrors.forEach(error => {
      const [field, message] = error.split(':');
      newErrors[field] = message;
    });

    Object.entries(income).forEach(([key, value]) => {
      if (!validateAmount(value)) {
        newErrors[key] = 'Invalid amount';
      }
    });

    Object.entries(deductions).forEach(([key, value]) => {
      if (!validateAmount(value)) {
        newErrors[key] = 'Invalid amount';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newCalculation = calculateTax(
        income,
        deductions,
        credits,
        taxpayer.filingStatus,
        taxpayer.age,
        taxpayer.isBlind
      );
      setCalculation(newCalculation);
    }
  }, [taxpayer, income, deductions, credits]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            Tax Preparation Assistant
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <TaxpayerInfo
              taxpayer={taxpayer}
              onUpdate={setTaxpayer}
              errors={errors}
            />
            <IncomeSection
              income={income}
              onUpdate={setIncome}
              errors={errors}
            />
          </div>
          <div className="space-y-6">
            <DeductionsSection
              deductions={deductions}
              onUpdate={setDeductions}
              errors={errors}
            />
            <CreditsSection
              credits={credits}
              onUpdate={setCredits}
              errors={errors}
            />
            <TaxSummary calculation={calculation} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;