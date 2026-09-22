// src/components/ui/LoadingSkeleton.jsx
import React from 'react';

export const SkeletonBox = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/[0.06] rounded-xl ${className}`} />
);

export const CardSkeleton = () => (
  <div className="ag-glass rounded-2xl p-5 shadow-xs space-y-3">
    <div className="flex justify-between items-center">
      <SkeletonBox className="h-3.5 w-24" />
      <SkeletonBox className="h-8 w-8 rounded-xl" />
    </div>
    <SkeletonBox className="h-7 w-20" />
    <SkeletonBox className="h-3 w-36" />
  </div>
);

export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="w-full ag-glass rounded-2xl p-4 shadow-xs space-y-3">
    <div className="flex gap-4 pb-3 border-b border-white/[0.08]">
      {Array.from({ length: cols }).map((_, i) => (
        <SkeletonBox key={i} className="h-4 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="flex gap-4 py-2 border-b border-white/[0.04]">
        {Array.from({ length: cols }).map((_, c) => (
          <SkeletonBox key={c} className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export const DetailSkeleton = () => (
  <div className="space-y-6">
    <div className="ag-glass rounded-2xl p-6 space-y-4">
      <div className="flex justify-between">
        <SkeletonBox className="h-6 w-48" />
        <SkeletonBox className="h-8 w-24 rounded-full" />
      </div>
      <SkeletonBox className="h-10 w-full" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);
