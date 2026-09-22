// src/components/ui/Drawer.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  position = 'right', // right | left
  width = 'max-w-md',
  className = ''
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = position === 'right' ? 'right-0 top-0' : 'left-0 top-0';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      <div className={`fixed inset-y-0 ${positionClasses} flex max-w-full ${position === 'right' ? 'pl-10' : 'pr-10'}`}>
        <div
          className={`w-screen ${width} bg-[#0a0a0a]/98 shadow-[0_0_50px_rgba(0,0,0,0.9)] ${
            position === 'right' ? 'border-l border-white/10' : 'border-r border-white/10'
          } backdrop-blur-2xl flex flex-col text-neutral-200 ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              {title && <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>

          {/* Drawer Footer */}
          {footer && (
            <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.08] flex items-center justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
