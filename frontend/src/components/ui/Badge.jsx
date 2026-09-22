// src/components/ui/Badge.jsx
import React from 'react';

export const Badge = ({
  children,
  variant = 'gray', // green | blue | amber | red | gray
  size = 'sm', // sm | md
  className = ''
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-3xs",
    md: "px-2.5 py-1 text-2xs"
  };

  const variantStyles = {
    green: "bg-white/10 text-white border-white/20",
    blue: "bg-white/[0.08] text-neutral-200 border-white/15",
    amber: "bg-neutral-800 text-neutral-300 border-neutral-700",
    red: "bg-neutral-900 text-neutral-200 border-neutral-700",
    gray: "bg-white/[0.05] text-neutral-300 border-white/10"
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-full border backdrop-blur-xs ${
        sizeStyles[size] || sizeStyles.sm
      } ${variantStyles[variant] || variantStyles.gray} ${className}`}
    >
      {children}
    </span>
  );
};
