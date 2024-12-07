import React from 'react';
import { TaxPayer } from '../types/tax';
import { FormField } from './FormField';
import { User } from 'lucide-react';
import { validateSSN, formatSSN } from '../utils/validation';

interface TaxpayerInfoProps {
  taxpayer: TaxPayer;
  onUpdate: (data: TaxPayer) => void;
  errors: Record<string, string>;
}

export const TaxpayerInfo: React.FC<TaxpayerInfoProps> = ({ taxpayer, onUpdate, errors }) => {
  const handleSSNChange = (value: string) => {
    const formattedSSN = formatSSN(value);
    onUpdate({ ...taxpayer, ssn: formattedSSN });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Personal Information
      </h2>
      <div className="space-y-4">
        <FormField
          label="First Name"
          value={taxpayer.firstName}
          onChange={(value) => onUpdate({ ...taxpayer, firstName: value })}
          error={errors.firstName}
        />
        
        <FormField
          label="Last Name"
          value={taxpayer.lastName}
          onChange={(value) => onUpdate({ ...taxpayer, lastName: value })}
          error={errors.lastName}
        />
        
        <FormField
          label="Social Security Number"
          value={taxpayer.ssn}
          onChange={handleSSNChange}
          placeholder="XXX-XX-XXXX"
          error={errors.ssn}
        />
        
        <FormField
          label="Filing Status"
          type="select"
          value={taxpayer.filingStatus}
          onChange={(value) => onUpdate({ ...taxpayer, filingStatus: value })}
          options={[
            { value: 'single', label: 'Single' },
            { value: 'married', label: 'Married Filing Jointly' },
            { value: 'headOfHousehold', label: 'Head of Household' },
          ]}
          error={errors.filingStatus}
        />
        
        <FormField
          label="Age"
          type="number"
          value={taxpayer.age}
          onChange={(value) => onUpdate({ ...taxpayer, age: parseInt(value) || 0 })}
          min={0}
          max={120}
          error={errors.age}
        />
        
        <FormField
          label="Number of Dependents"
          type="number"
          value={taxpayer.dependents}
          onChange={(value) => onUpdate({ ...taxpayer, dependents: parseInt(value) || 0 })}
          min={0}
          error={errors.dependents}
        />
        
        <FormField
          label="Are you blind?"
          type="checkbox"
          value={taxpayer.isBlind}
          onChange={(value) => onUpdate({ ...taxpayer, isBlind: value })}
        />
      </div>
    </div>
  );
};