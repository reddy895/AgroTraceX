// src/components/ui/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | ghost | danger | success
  size = 'md', // sm | md | lg
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none rounded-xl";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 font-medium",
    md: "text-xs sm:text-sm px-4 py-2 gap-2 font-semibold",
    lg: "text-sm sm:text-base px-6 py-3 gap-2.5 font-semibold"
  };

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-neutral-200 active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] border border-white",
    secondary:
      "bg-white/[0.06] text-white hover:bg-white/[0.12] border border-white/15 hover:border-white/30 backdrop-blur-md active:scale-[0.98]",
    outline:
      "bg-transparent text-neutral-300 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98]",
    ghost:
      "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.06]",
    danger:
      "bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800",
    success:
      "bg-white/10 text-white hover:bg-white/20 border border-white/20"
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
};
