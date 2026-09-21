// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerClassName = '',
  bodyClassName = '',
  footer,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#fffdf7] border border-slate-200/90 rounded-[10px] shadow-xs transition-shadow hover:shadow-sm ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      } ${className}`}
    >
      {(title || subtitle || action) && (
        <div className={`px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4 ${headerClassName}`}>
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900 tracking-tight leading-snug">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
      {footer && <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 rounded-b-xl text-xs text-slate-600">{footer}</div>}
    </div>
  );
};
