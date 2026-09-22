// src/pages/Admin/AdminSettingsPage.jsx
import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';
import {
  Settings,
  ShieldCheck,
  Lock,
  Database,
  CheckCircle2,
  Server,
  KeyRound,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const [autoApprove, setAutoApprove] = useState(false);
  const [sessionTimeoutDays, setSessionTimeoutDays] = useState('7');
  const [requirePhone, setRequirePhone] = useState(true);
  const { showToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Platform security settings saved successfully', 'success');
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-3xs font-mono font-bold uppercase text-white mb-2">
          <Settings className="w-3 h-3" />
          <span>CONFIGURATION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
          System Administration Settings
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
          Configure security governance, single admin credentials, and onboarding review parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Onboarding Governance */}
        <Card
          title="Onboarding & Authorization Rules"
          subtitle="Define how new client registration requests are processed"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">Manual Admin Approval Enforcement</div>
                <div className="text-3xs text-neutral-400">
                  When enabled, all newly registered clients remain in PENDING state until explicitly approved by the administrator.
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xs font-mono text-white bg-white/15 px-2.5 py-1 rounded-full border border-white/20">
                  ENFORCED (MANDATORY)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white">Require Institutional Phone Verification</div>
                <div className="text-3xs text-neutral-400">
                  Require valid corporate contact number during workspace application.
                </div>
              </div>
              <input
                type="checkbox"
                checked={requirePhone}
                onChange={(e) => setRequirePhone(e.target.checked)}
                className="w-4 h-4 rounded accent-white cursor-pointer"
              />
            </div>
          </div>
        </Card>

        {/* Master Admin Identity */}
        <Card
          title="Single Administrator Account"
          subtitle="AgroTraceX operates strictly under one platform master security administrator"
        >
          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <span className="text-neutral-400">Master Email:</span>
                <span className="text-white font-bold">admin@agrotracex.com</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <span className="text-neutral-400">Account Type:</span>
                <span className="text-white">Single Master Admin (No Public Sign-up)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <span className="text-neutral-400">Cryptographic Signing:</span>
                <span className="text-white">HMAC-SHA256 Token Engine</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">Token Session Expiry:</span>
                <span className="text-white">7 Days Rolling</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Persistence & Database Engine */}
        <Card
          title="Persistence & Database Engine"
          subtitle="File-backed immutable store details"
        >
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-300">Database Store:</span>
              </div>
              <span className="text-white font-bold">server/db.json</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-300">API Gateway:</span>
              </div>
              <span className="text-white font-bold">/api/* Native Vite Middleware</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span className="text-neutral-300">Compliance Standard:</span>
              </div>
              <span className="text-white font-bold">ISO 9001:2015 & GLP Protocols</span>
            </div>
          </div>
        </Card>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            Save Administrative Policies
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
