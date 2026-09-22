// src/components/ui/StatusBadge.jsx
import React from 'react';

export const StatusBadge = ({ status, className = '' }) => {
  if (!status) return null;

  const normalized = String(status).trim().toLowerCase();

  // Pure monochrome grayscale status mapping
  let variantStyles = 'bg-white/[0.06] text-neutral-300 border-white/10';
  let dotColor = 'bg-neutral-400';

  if (
    normalized.includes('completed') ||
    normalized.includes('verified') ||
    normalized.includes('healthy') ||
    normalized.includes('approved') ||
    normalized.includes('passed') ||
    normalized.includes('certified')
  ) {
    variantStyles = 'bg-white/15 text-white border-white/25 shadow-[0_0_12px_rgba(255,255,255,0.08)]';
    dotColor = 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]';
  } else if (
    normalized.includes('active') ||
    normalized.includes('in progress') ||
    normalized.includes('testing') ||
    normalized.includes('growing') ||
    normalized.includes('flowering') ||
    normalized.includes('sown')
  ) {
    variantStyles = 'bg-white/10 text-neutral-100 border-white/20';
    dotColor = 'bg-neutral-200 animate-pulse';
  } else if (
    normalized.includes('pending') ||
    normalized.includes('warning') ||
    normalized.includes('planned') ||
    normalized.includes('assigned') ||
    normalized.includes('review')
  ) {
    variantStyles = 'bg-neutral-900 text-neutral-300 border-neutral-700';
    dotColor = 'bg-neutral-400';
  } else if (
    normalized.includes('delayed') ||
    normalized.includes('failed') ||
    normalized.includes('critical') ||
    normalized.includes('overdue') ||
    normalized.includes('deviation')
  ) {
    variantStyles = 'bg-neutral-900 text-neutral-200 border-neutral-600';
    dotColor = 'bg-neutral-300';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-2xs font-mono font-medium rounded-full border whitespace-nowrap transition-colors backdrop-blur-xs ${variantStyles} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
};
