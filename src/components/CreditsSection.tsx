import React from 'react';
import { Credits } from '../types/tax';
import { CreditCard } from 'lucide-react';
import { FormField } from './FormField';

interface CreditsSectionProps {
  credits: Credits;
  onUpdate: (data: Credits) => void;
  errors: Record<string, string>;
}

export const CreditsSection: React.FC<CreditsSectionProps> = ({ credits, onUpdate, errors }) => {
  const handleChange = (field: keyof Credits, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    onUpdate({ ...credits, [field]: numValue });
  };

  const creditFields = [
    { key: 'childTaxCredit', label: 'Child Tax Credit' },
    { key: 'childCareCredit', label: 'Child Care Credit' },
    { key: 'educationCredit', label: 'Education Credit' },
    { key: 'energyCredit', label: 'Energy Credit' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <CreditCard className="w-5 h-5 mr-2" />
        Tax Credits
      </h2>
      <div className="space-y-4">
        {creditFields.map(({ key, label }) => (
          <FormField
            key={key}
            label={label}
            type="number"
            value={credits[key as keyof Credits]}
            onChange={(value) => handleChange(key as keyof Credits, value)}
            prefix="$"
            placeholder="0.00"
            error={errors[key]}
          />
        ))}
      </div>
    </div>
  );
};