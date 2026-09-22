// src/components/ui/Input.jsx
import React from 'react';

export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  className = '',
  id,
  required = false,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-3xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-white">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`block w-full rounded-xl border bg-white/[0.04] text-white text-xs sm:text-sm transition-all placeholder:text-neutral-500 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 backdrop-blur-md disabled:bg-neutral-900 disabled:text-neutral-500 ${
            Icon ? 'pl-9' : 'pl-3.5'
          } pr-3.5 py-2.5 ${
            error
              ? 'border-white/40 text-white focus:ring-white'
              : 'border-white/10 text-white hover:border-white/20'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-2xs text-neutral-300 font-medium">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-2xs text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};
