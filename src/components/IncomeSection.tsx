import React from 'react';
import { Income } from '../types/tax';
import { DollarSign } from 'lucide-react';
import { FormField } from './FormField';

interface IncomeSectionProps {
  income: Income;
  onUpdate: (data: Income) => void;
  errors: Record<string, string>;
}

export const IncomeSection: React.FC<IncomeSectionProps> = ({ income, onUpdate, errors }) => {
  const handleChange = (field: keyof Income, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...income, [field]: numValue });
  };

  const incomeFields = [
    { key: 'wages', label: 'Wages & Salary' },
    { key: 'withholdingAmount', label: 'Tax Withholdings' },
    { key: 'estimatedTaxPayments', label: 'Estimated Tax Payments' },
    { key: 'selfEmployment', label: 'Self Employment' },
    { key: 'investments', label: 'Investment Income' },
    { key: 'dividends', label: 'Dividends' },
    { key: 'rentalIncome', label: 'Rental Income' },
    { key: 'retirement', label: 'Retirement Income' },
    { key: 'socialSecurity', label: 'Social Security Benefits' },
    { key: 'other', label: 'Other Income' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <DollarSign className="w-5 h-5 mr-2" />
        Income & Payments
      </h2>
      <div className="space-y-4">
        {incomeFields.map(({ key, label }) => (
          <FormField
            key={key}
            label={label}
            type="number"
            value={income[key as keyof Income]}
            onChange={(value) => handleChange(key as keyof Income, value)}
            prefix="$"
            placeholder="0.00"
            error={errors[key]}
          />
        ))}
      </div>
    </div>
  );
};