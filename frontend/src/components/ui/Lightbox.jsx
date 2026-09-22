// src/components/ui/Lightbox.jsx
import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';

export const Lightbox = ({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  onIndexChange
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onIndexChange(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onIndexChange(currentIndex + 1);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation buttons */}
      {images.length > 1 && currentIndex > 0 && (
        <button
          onClick={() => onIndexChange(currentIndex - 1)}
          className="absolute left-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {images.length > 1 && currentIndex < images.length - 1 && (
        <button
          onClick={() => onIndexChange(currentIndex + 1)}
          className="absolute right-5 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Center Image Container */}
      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
        <div className="relative overflow-hidden rounded-2xl bg-black border border-white/15 max-h-[70vh] flex items-center justify-center shadow-2xl">
          <img
            src={currentImg.url}
            alt={currentImg.caption || 'Trial photo'}
            className="max-h-[70vh] max-w-full object-contain rounded-xl"
          />
        </div>

        {/* Metadata Caption Bar */}
        <div className="mt-4 bg-neutral-900/95 text-white px-5 py-3 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs w-full max-w-2xl backdrop-blur-md">
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-sm text-white">{currentImg.caption}</h4>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-1 text-neutral-400">
              {currentImg.stage && (
                <span className="flex items-center gap-1 font-mono text-3xs">
                  <Tag className="w-3 h-3 text-neutral-400" />
                  Stage: {currentImg.stage}
                </span>
              )}
              {currentImg.timestamp && (
                <span className="flex items-center gap-1 font-mono text-3xs">
                  <Calendar className="w-3 h-3 text-neutral-400" />
                  {currentImg.timestamp}
                </span>
              )}
            </div>
          </div>
          {images.length > 1 && (
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-neutral-300 font-mono text-3xs">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
