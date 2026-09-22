// src/components/landing/VideoModal.jsx
import React from 'react';
import { X, Play, Shield, Activity, Database, CheckCircle2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export const VideoModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-4xl"
      className="p-0 overflow-hidden"
    >
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-8 border border-white/15">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vidGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vidGrid)" />
          </svg>
        </div>

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-3xs font-mono uppercase tracking-widest text-neutral-300">
              PLATFORM OVERVIEW • 4K TELEMETRY STREAM
            </span>
          </div>
          <span className="text-3xs font-mono text-neutral-500">GLP / ISO-9001 VERIFIED</span>
        </div>

        {/* Center interactive visual representation */}
        <div className="relative z-10 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 backdrop-blur-md flex items-center justify-center mx-auto text-white shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <Play className="w-7 h-7 fill-white ml-1" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Architecting the Future of Field Trials
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Watch how AgroTraceX tracks every single phenotype observation, GPS plot coordinate, and certified lab dossier with zero data tampering.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-3xs font-mono text-neutral-400 text-center">
          <div>Sub-Meter GPS Boundaries</div>
          <div>NIR Spectroscopy Audit</div>
          <div>Automated ANOVA Reports</div>
        </div>
      </div>
    </Modal>
  );
};
