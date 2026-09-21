// src/components/layout/RoleSwitcher.jsx
import React, { useState } from 'react';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Shield, ChevronDown, Check, UserCircle2 } from 'lucide-react';

export const RoleSwitcher = () => {
  const { currentUser, switchRole } = useAuth();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const roleConfigs = {
    [ROLES.ADMIN]: {
      label: 'Admin',
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
      description: 'Full ecosystem management & company billing'
    },
    [ROLES.COMPANY]: {
      label: 'Seed Company',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'Novis AgroSciences R&D trial dashboard'
    },
    [ROLES.AGRONOMIST]: {
      label: 'Agronomist',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      description: 'Scientific validation & observation review'
    },
    [ROLES.FIELD_OFFICER]: {
      label: 'Field Officer',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      description: 'Outdoor mobile visit & GPS recording'
    }
  };

  const handleSelectRole = (role) => {
    switchRole(role);
    setIsOpen(false);
    showToast(`Switched view to ${roleConfigs[role].label} role`, 'info');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-2xs text-xs font-medium text-slate-700 cursor-pointer"
        title="Switch perspective role"
      >
        <Shield className="w-3.5 h-3.5 text-[#556D3F]" />
        <span className="hidden md:inline text-slate-500">Role:</span>
        <span className="font-bold text-slate-900">{roleConfigs[currentUser.role]?.label || currentUser.role}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl z-50 p-1.5 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 text-2xs font-semibold uppercase tracking-wider text-slate-400">
              Simulate Role Perspective
            </div>
            <div className="py-1 space-y-1">
              {Object.keys(ROLES).map((key) => {
                const role = ROLES[key];
                const config = roleConfigs[role];
                const isCurrent = currentUser.role === role;

                return (
                  <button
                    key={role}
                    onClick={() => handleSelectRole(role)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-start justify-between gap-2 transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-slate-100 font-semibold text-slate-900'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{config.label}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <p className="text-3xs text-slate-500 font-normal mt-0.5">{config.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
