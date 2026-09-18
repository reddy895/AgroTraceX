// src/components/ui/Badge.jsx
import React from 'react';

export const Badge = ({
  children,
  variant = 'gray', // green | blue | amber | red | gray
  size = 'sm', // sm | md
  className = ''
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs"
  };

  const variantStyles = {
    green: "bg-emerald-50 text-emerald-800 border-emerald-200",
    blue: "bg-blue-50 text-blue-800 border-blue-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    red: "bg-red-50 text-red-800 border-red-200",
    gray: "bg-slate-100 text-slate-700 border-slate-200"
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.gray} ${className}`}
    >
      {children}
    </span>
  );
};
