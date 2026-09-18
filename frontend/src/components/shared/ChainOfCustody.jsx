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
  ShieldCheck
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
    <div className={`bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Chain of Custody & Sample Provenance
            </h3>
            <span className="text-2xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {sample.id}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-evident tracking for {sample.sampleType} ({sample.quantity})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={sample.testingStatus} />
        </div>
      </div>

      {/* Visual Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
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
                    ? 'bg-[#0F4A2A] text-white shadow-xs'
                    : isInProgress
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isInProgress ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Step Card */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-lg p-3.5 hover:border-slate-300 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{step.stage}</span>
                    <span
                      className={`text-3xs font-semibold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{step.timestamp}</span>
                </div>

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Handler: {step.person}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Location: {step.location}</span>
                  </div>
                </div>

                {step.notes && (
                  <p className="mt-2 text-xs text-slate-500 bg-white p-2 rounded border border-slate-100 italic">
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
