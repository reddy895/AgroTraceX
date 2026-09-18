// src/components/ui/StatusBadge.jsx
import React from 'react';

export const StatusBadge = ({ status, className = '' }) => {
  if (!status) return null;

  const normalized = String(status).trim().toLowerCase();

  let variant = 'gray';
  let dotColor = 'bg-slate-400';

  if (
    normalized.includes('completed') ||
    normalized.includes('verified') ||
    normalized.includes('healthy') ||
    normalized.includes('approved') ||
    normalized.includes('passed') ||
    normalized.includes('certified')
  ) {
    variant = 'green';
    dotColor = 'bg-emerald-500';
  } else if (
    normalized.includes('active') ||
    normalized.includes('in progress') ||
    normalized.includes('testing') ||
    normalized.includes('growing') ||
    normalized.includes('flowering') ||
    normalized.includes('sown')
  ) {
    variant = 'blue';
    dotColor = 'bg-blue-500';
  } else if (
    normalized.includes('pending') ||
    normalized.includes('warning') ||
    normalized.includes('planned') ||
    normalized.includes('assigned') ||
    normalized.includes('review')
  ) {
    variant = 'amber';
    dotColor = 'bg-amber-500';
  } else if (
    normalized.includes('delayed') ||
    normalized.includes('failed') ||
    normalized.includes('critical') ||
    normalized.includes('overdue') ||
    normalized.includes('deviation')
  ) {
    variant = 'red';
    dotColor = 'bg-red-500';
  }

  const variantStyles = {
    green: "bg-emerald-50 text-emerald-800 border-emerald-200",
    blue: "bg-blue-50 text-blue-800 border-blue-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    red: "bg-red-50 text-red-800 border-red-200",
    gray: "bg-slate-100 text-slate-700 border-slate-200"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border shadow-2xs whitespace-nowrap ${variantStyles[variant]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
};
