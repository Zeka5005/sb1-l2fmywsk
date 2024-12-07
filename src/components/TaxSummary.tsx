import React from 'react';
import { TaxCalculation } from '../types/tax';
import { Calculator, ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';

interface TaxSummaryProps {
  calculation: TaxCalculation;
}

export const TaxSummary: React.FC<TaxSummaryProps> = ({ calculation }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2" />
        Tax Summary
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-600">Total Income</span>
          <span className="font-medium">{formatCurrency(calculation.totalIncome)}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Standard Deduction</span>
            <span>{formatCurrency(calculation.standardDeduction)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Itemized Deductions</span>
            <span>{formatCurrency(calculation.itemizedDeductions)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Effective Deductions</span>
            <span className="font-medium text-green-600">
              -{formatCurrency(calculation.effectiveDeductions)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-600">Taxable Income</span>
          <span className="font-medium">{formatCurrency(calculation.taxableIncome)}</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Income Tax</span>
            <span>{formatCurrency(calculation.estimatedTax)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Self-Employment Tax</span>
            <span>{formatCurrency(calculation.selfEmploymentTax)}</span>
          </div>
          <div className="flex justify-between items-center text-green-600">
            <span>Tax Credits</span>
            <span>-{formatCurrency(calculation.totalCredits)}</span>
          </div>
          <div className="flex justify-between items-center font-medium border-t pt-2">
            <span>Total Tax Liability</span>
            <span>{formatCurrency(calculation.totalTaxLiability)}</span>
          </div>
        </div>

        <div className="space-y-2 border-t pt-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax Withholdings & Payments</span>
            <span className="text-green-600">-{formatCurrency(calculation.totalPayments)}</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          {calculation.refundAmount > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-600 flex items-center">
                  <ArrowDown className="w-5 h-5 mr-2" />
                  Tax Refund
                </span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(calculation.refundAmount)}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-red-600 flex items-center">
                  <ArrowUp className="w-5 h-5 mr-2" />
                  Tax Due
                </span>
                <span className="text-lg font-bold text-red-600">
                  {formatCurrency(calculation.amountDue)}
                </span>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>Effective Tax Rate</span>
            <span>{formatPercent(calculation.effectiveTaxRate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};