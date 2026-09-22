// src/components/client/ClientStatusScreens.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, STATUSES } from '../../context/AuthContext';
import { AgroTraceXLogo } from '../shared/AgroTraceXLogo';
import {
  Clock,
  ShieldAlert,
  Ban,
  RefreshCw,
  LogOut,
  Building,
  Mail,
  User,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const ClientStatusScreen = ({ status }) => {
  const { currentUser, refreshSession, logout } = useAuth();
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = async () => {
    setChecking(true);
    try {
      const updated = await refreshSession();
      if (updated && updated.status === STATUSES.APPROVED) {
        navigate('/platform');
      }
    } finally {
      setTimeout(() => setChecking(false), 500);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 1. PENDING STATE
  if (status === STATUSES.PENDING) {
    return (
      <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col justify-between font-sans selection:bg-white selection:text-black">
        {/* Top Minimal Bar */}
        <header className="px-6 py-6 border-b border-white/[0.08] flex items-center justify-between max-w-[1440px] w-full mx-auto">
          <AgroTraceXLogo size="md" showTagline={false} />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </header>

        {/* Center Pending Message */}
        <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="max-w-xl w-full ag-glass rounded-3xl p-8 sm:p-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center space-y-7">
            {/* Status Pulse Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-wider text-white">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>STATUS: PENDING</span>
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 mx-auto flex items-center justify-center">
              <Clock className="w-8 h-8 text-neutral-300" />
            </div>

            {/* Headline & Description */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Your AgroTraceX workspace is being reviewed.
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
                Your request has been submitted successfully. Our team will review your organization details and activate your workspace.
              </p>
            </div>

            {/* Submission Metadata Summary */}
            {currentUser && (
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-4 text-left space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Applicant:</span>
                  </span>
                  <span className="text-white font-semibold">{currentUser.name}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Organization:</span>
                  </span>
                  <span className="text-white font-semibold">{currentUser.organization}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Work Email:</span>
                  </span>
                  <span className="text-white font-semibold">{currentUser.email}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={checking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
                <span>{checking ? 'Checking Status...' : 'Check Approval Status'}</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Back to Homepage</span>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-white/[0.08] text-center text-3xs font-mono text-neutral-500">
          AgroTraceX Secure Authentication • GLP & ISO 9001:2015 Compliant
        </footer>
      </div>
    );
  }

  // 2. REJECTED STATE
  if (status === STATUSES.REJECTED) {
    return (
      <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col justify-between font-sans selection:bg-white selection:text-black">
        <header className="px-6 py-6 border-b border-white/[0.08] flex items-center justify-between max-w-[1440px] w-full mx-auto">
          <AgroTraceXLogo size="md" showTagline={false} />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="max-w-xl w-full ag-glass rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl text-center space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-mono font-bold tracking-wider text-neutral-300">
              <span>STATUS: REJECTED</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 mx-auto flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-neutral-300" />
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Access request not approved.
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
                Your request to access AgroTraceX has been reviewed and was not approved at this time. We require verified institutional research credentials to access field trials.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
              >
                <span>Sign In With Different Account</span>
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Contact Operations</span>
              </button>
            </div>
          </div>
        </main>

        <footer className="px-6 py-4 border-t border-white/[0.08] text-center text-3xs font-mono text-neutral-500">
          AgroTraceX Access Governance • Zero-Trust Compliance
        </footer>
      </div>
    );
  }

  // 3. REVOKED STATE
  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col justify-between font-sans selection:bg-white selection:text-black">
      <header className="px-6 py-6 border-b border-white/[0.08] flex items-center justify-between max-w-[1440px] w-full mx-auto">
        <AgroTraceXLogo size="md" showTagline={false} />
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="max-w-xl w-full ag-glass rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-mono font-bold tracking-wider text-neutral-400">
            <span>STATUS: ACCESS REVOKED</span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 mx-auto flex items-center justify-center">
            <Ban className="w-8 h-8 text-neutral-400" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Platform Access Revoked.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
              Your institutional access to AgroTraceX has been suspended or revoked by the platform administrator.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
            >
              <span>Sign Out</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 border-t border-white/[0.08] text-center text-3xs font-mono text-neutral-500">
        AgroTraceX Platform Governance
      </footer>
    </div>
  );
};
