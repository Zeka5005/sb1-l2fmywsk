import React from 'react';
import { Deductions } from '../types/tax';
import { Receipt } from 'lucide-react';
import { FormField } from './FormField';

interface DeductionsSectionProps {
  deductions: Deductions;
  onUpdate: (data: Deductions) => void;
  errors: Record<string, string>;
}

export const DeductionsSection: React.FC<DeductionsSectionProps> = ({ deductions, onUpdate, errors }) => {
  const handleChange = (field: keyof Deductions, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...deductions, [field]: numValue });
  };

  const deductionFields = [
    { key: 'mortgage', label: 'Mortgage Interest' },
    { key: 'studentLoanInterest', label: 'Student Loan Interest' },
    { key: 'charitable', label: 'Charitable Contributions' },
    { key: 'medical', label: 'Medical Expenses' },
    { key: 'stateLocalTax', label: 'State & Local Taxes' },
    { key: 'propertyTax', label: 'Property Taxes' },
    { key: 'educationExpenses', label: 'Education Expenses' },
    { key: 'retirementContributions', label: 'Retirement Contributions' },
    { key: 'healthSavings', label: 'Health Savings' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Receipt className="w-5 h-5 mr-2" />
        Deductions
      </h2>
      <div className="space-y-4">
        {deductionFields.map(({ key, label }) => (
          <FormField
            key={key}
            label={label}
            type="number"
            value={deductions[key as keyof Deductions]}
            onChange={(value) => handleChange(key as keyof Deductions, value)}
            prefix="$"
            placeholder="0.00"
            error={errors[key]}
          />
        ))}
      </div>
    </div>
  );
};