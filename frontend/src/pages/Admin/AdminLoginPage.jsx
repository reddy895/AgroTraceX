// src/pages/Admin/AdminLoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AgroTraceXLogo } from '../../components/shared/AgroTraceXLogo';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  KeyRound
} from 'lucide-react';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@agrotracex.com');
  const [password, setPassword] = useState('admin123');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await loginAdmin(email, password);
      if (res && res.success) {
        navigate('/admin');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Administrative authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-neutral-100 flex flex-col justify-between font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/[0.08] flex items-center justify-between max-w-[1440px] w-full mx-auto">
        <Link to="/">
          <AgroTraceXLogo size="md" showTagline={false} />
        </Link>
        <Link
          to="/"
          className="text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors"
        >
          ← Public Website
        </Link>
      </header>

      {/* Main Form */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="max-w-md w-full bg-[#090909] rounded-3xl p-8 sm:p-10 border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.95)] space-y-7 text-left">
          {/* Security Badge */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black font-mono font-bold text-3xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SINGLE ADMIN GATEWAY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Authorized access only. Dedicated to platform onboarding and client permissions governance.
            </p>
          </div>

          {/* Quick Credential Hint */}
          <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl space-y-1 font-mono text-3xs text-neutral-400">
            <div className="flex items-center justify-between text-neutral-300">
              <span className="font-bold uppercase tracking-wider text-white">Default Master Account:</span>
              <span className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">1 Account Only</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span>Email:</span>
              <span className="text-white">admin@agrotracex.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Password:</span>
              <span className="text-white">admin123</span>
            </div>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-700 flex items-start gap-2.5 text-xs text-neutral-200">
              <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4 font-mono">
            <div>
              <label className="block text-3xs uppercase text-neutral-400 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@agrotracex.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/50"
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-3xs uppercase text-neutral-400 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/50"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-60"
            >
              <span>{loading ? 'Verifying...' : 'Authenticate as Admin'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-white/[0.08] text-center">
            <p className="text-3xs font-mono text-neutral-500 leading-relaxed">
              Public registration is disabled for administrator roles. If you are a commercial client, please use the{' '}
              <Link to="/signin" className="text-neutral-300 underline">
                Client Sign In
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/[0.08] text-center text-3xs font-mono text-neutral-500">
        AgroTraceX Governance Protocol • Restricted Administrative Terminal
      </footer>
    </div>
  );
};
