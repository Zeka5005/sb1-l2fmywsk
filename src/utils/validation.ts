import { TaxPayer, Income, Deductions } from '../types/tax';

export const validateSSN = (ssn: string): boolean => {
  const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
  return ssnRegex.test(ssn.replace(/\D/g, ''));
};

export const formatSSN = (ssn: string): string => {
  const cleaned = ssn.replace(/\D/g, '');
  if (cleaned.length === 9) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5)}`;
  }
  return ssn;
};

export const validateTaxpayer = (taxpayer: TaxPayer): string[] => {
  const errors: string[] = [];
  
  if (!taxpayer.firstName.trim()) errors.push('First name is required');
  if (!taxpayer.lastName.trim()) errors.push('Last name is required');
  if (!validateSSN(taxpayer.ssn)) errors.push('Invalid SSN format');
  if (taxpayer.age < 0 || taxpayer.age > 120) errors.push('Invalid age');
  if (taxpayer.dependents < 0) errors.push('Invalid number of dependents');
  
  return errors;
};

export const validateAmount = (amount: number): boolean => {
  return !isNaN(amount) && amount >= 0 && amount <= 999999999;
};