// src/components/ui/Select.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  label,
  options = [],
  error,
  helperText,
  className = '',
  id,
  required = false,
  placeholder = 'Select option...',
  value,
  onChange,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-lg shadow-2xs">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`block w-full appearance-none rounded-lg border text-sm transition-colors pr-9 pl-3 py-2 bg-[#fffdf7] focus:outline-none focus:ring-2 focus:ring-[#556D3F]/25 focus:border-[#556D3F] disabled:bg-slate-50 disabled:text-slate-500 ${
            error
              ? 'border-red-300 text-red-900 focus:ring-red-200 focus:border-red-500'
              : 'border-slate-300 text-slate-900 hover:border-slate-400'
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const isObj = typeof opt === 'object' && opt !== null;
            const val = isObj ? opt.value : opt;
            const lbl = isObj ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
