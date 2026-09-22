// src/components/shared/ChainOfCustody.jsx
import React from 'react';
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Building,
  Microscope,
  Award,
  MapPin,
  User,
  ShieldCheck,
  Check
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

const STAGE_ICONS = {
  Collected: Package,
  Packed: ShieldCheck,
  Dispatched: Truck,
  'Received by Lab': Building,
  Testing: Microscope,
  'Result Available': Award
};

export const ChainOfCustody = ({ sample, className = '' }) => {
  if (!sample || !sample.custodyChain) return null;

  return (
    <div className={`ag-glass rounded-2xl p-6 sm:p-7 border border-white/10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-bold text-white tracking-tight">
              Chain of Custody & Sample Provenance
            </h3>
            <span className="text-3xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
              {sample.id}
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Tamper-evident tracking for {sample.sampleType} ({sample.quantity})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={sample.testingStatus} />
        </div>
      </div>

      {/* Visual Timeline Steps in Monochrome */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-white/15">
        {sample.custodyChain.map((step, idx) => {
          const isCompleted = step.status === 'Completed';
          const isInProgress = step.status === 'In Progress';
          const Icon = STAGE_ICONS[step.stage] || Package;

          return (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                    : isInProgress
                    ? 'bg-white/20 text-white ring-4 ring-white/20 border border-white/40'
                    : 'bg-black border border-neutral-700 text-neutral-500'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                ) : isInProgress ? (
                  <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-spin" />
                ) : (
                  <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                )}
              </div>

              {/* Step Card */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 hover:border-white/20 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white tracking-wide">{step.stage}</span>
                    <span
                      className={`text-3xs font-mono px-2 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-white/10 text-white border-white/20'
                          : isInProgress
                          ? 'bg-white text-black font-semibold border-white shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <span className="text-3xs font-mono text-neutral-400">{step.timestamp}</span>
                </div>

                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 font-mono">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>Handler: {step.person}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>Location: {step.location}</span>
                  </div>
                </div>

                {step.notes && (
                  <p className="mt-2.5 text-xs text-neutral-400 bg-black/40 p-2.5 rounded-lg border border-white/[0.05] italic">
                    "{step.notes}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
