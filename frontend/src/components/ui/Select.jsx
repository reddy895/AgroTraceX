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
        <label
          htmlFor={selectId}
          className="block text-3xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-white">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-xs">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`block w-full appearance-none rounded-xl border text-xs sm:text-sm transition-all pr-9 pl-3.5 py-2.5 bg-[#0d0d0d] text-white border-white/10 hover:border-white/20 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 backdrop-blur-md disabled:bg-neutral-900 disabled:text-neutral-500 cursor-pointer ${
            error ? 'border-white/40 text-white' : ''
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-[#0d0d0d] text-neutral-400">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const isObj = typeof opt === 'object' && opt !== null;
            const val = isObj ? opt.value : opt;
            const lbl = isObj ? opt.label : opt;
            return (
              <option key={val} value={val} className="bg-[#0d0d0d] text-white">
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-2xs text-neutral-300 font-medium">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-2xs text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};
