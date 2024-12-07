import React from 'react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'number' | 'select' | 'checkbox';
  value: string | number | boolean;
  onChange: (value: any) => void;
  error?: string;
  options?: { value: string; label: string }[];
  prefix?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  options,
  prefix,
  placeholder,
  min,
  max,
}) => {
  const baseInputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500";
  const errorClasses = error ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500" : "";

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseInputClasses} ${errorClasses}`}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        );

      case 'number':
        return (
          <div className="relative rounded-md shadow-sm">
            {prefix && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">{prefix}</span>
              </div>
            )}
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`${baseInputClasses} ${errorClasses} ${prefix ? 'pl-7' : ''}`}
              placeholder={placeholder}
              min={min}
              max={max}
            />
          </div>
        );

      default:
        return (
          <input
            type={type}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseInputClasses} ${errorClasses}`}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {renderInput()}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};