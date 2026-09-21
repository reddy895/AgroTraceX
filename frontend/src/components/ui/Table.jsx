// src/components/ui/Table.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { EmptyState } from './EmptyState';

export const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = "No records found",
  emptyDescription = "There are no entries matching your filter criteria.",
  emptyAction,
  onRowClick,
  className = ''
}) => {
  return (
    <div className={`w-full overflow-hidden border border-slate-200/90 rounded-[10px] bg-[#fffdf7] shadow-xs ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-[0.08em]">
              {columns.map((col, idx) => (
                <th
                  key={col.key || idx}
                  className={`px-4 py-3.5 whitespace-nowrap ${col.headerClassName || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-500">
                  <div className="inline-flex items-center gap-2 text-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-[#556D3F]" />
                    <span>Loading data records...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10">
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    action={emptyAction}
                  />
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition-colors hover:bg-slate-50/70 ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={col.key || colIdx}
                      className={`px-4 py-3.5 whitespace-nowrap text-slate-800 ${col.className || ''}`}
                    >
                      {col.render ? col.render(row, rowIdx) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
