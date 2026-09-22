// src/components/layout/RoleSwitcher.jsx
import React, { useState } from 'react';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Shield, ChevronDown, Check } from 'lucide-react';

export const RoleSwitcher = () => {
  const { currentUser, switchRole } = useAuth();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const roleConfigs = {
    [ROLES.ADMIN]: {
      label: 'Admin',
      description: 'Full ecosystem management & company billing'
    },
    [ROLES.COMPANY]: {
      label: 'Seed Company',
      description: 'Novis AgroSciences R&D trial dashboard'
    },
    [ROLES.AGRONOMIST]: {
      label: 'Agronomist',
      description: 'Scientific validation & observation review'
    },
    [ROLES.FIELD_OFFICER]: {
      label: 'Field Officer',
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
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all text-3xs sm:text-2xs font-mono font-medium text-neutral-300 hover:text-white cursor-pointer"
        title="Switch perspective role"
      >
        <Shield className="w-3.5 h-3.5 text-neutral-400" />
        <span className="hidden md:inline text-neutral-500">Role:</span>
        <span className="font-bold text-white">{roleConfigs[currentUser.role]?.label || currentUser.role}</span>
        <ChevronDown className="w-3 h-3 text-neutral-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#0a0a0a]/98 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-50 p-2 divide-y divide-white/[0.08] backdrop-blur-2xl text-white animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 text-3xs font-mono font-bold uppercase tracking-wider text-neutral-500">
              Simulate Role Perspective
            </div>
            <div className="py-1.5 space-y-1">
              {Object.keys(ROLES).map((key) => {
                const role = ROLES[key];
                const config = roleConfigs[role];
                const isCurrent = currentUser.role === role;

                return (
                  <button
                    key={role}
                    onClick={() => handleSelectRole(role)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-start justify-between gap-2 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-white text-black font-semibold shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                        : 'text-neutral-300 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">{config.label}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                      </div>
                      <p className={`text-3xs font-normal mt-0.5 ${isCurrent ? 'text-neutral-800' : 'text-neutral-400'}`}>
                        {config.description}
                      </p>
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
