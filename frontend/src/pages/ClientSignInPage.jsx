// src/pages/ClientSignInPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, STATUSES } from '../context/AuthContext';
import { AgroTraceXLogo } from '../components/shared/AgroTraceXLogo';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const ClientSignInPage = () => {
  const [email, setEmail] = useState('ananya.sen@novisagro.com');
  const [password, setPassword] = useState('client123');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginClient } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await loginClient(email, password);
      if (res && res.user) {
        // Direct to platform; ClientProtectedRoute will handle PENDING/REJECTED/APPROVED view accordingly
        navigate('/platform');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('client123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col justify-between font-sans selection:bg-white selection:text-black">
      {/* Top Header */}
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

      {/* Main Sign In Form */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="max-w-md w-full ag-glass rounded-3xl p-8 sm:p-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] space-y-7 text-left">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-3xs font-mono uppercase tracking-widest text-neutral-500 block">
              AUTHENTICATED WORKSPACE
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Client Sign In
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Enter your credentials to access your verified trial workspace.
            </p>
          </div>

          {/* Quick Demo Selector */}
          <div className="bg-white/[0.02] border border-white/[0.08] p-3 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xs font-mono uppercase tracking-wider text-neutral-400">
                Demo Accounts
              </span>
              <span className="text-3xs font-mono text-neutral-400 bg-white/10 px-2 py-0.5 rounded">
                One-Click
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('ananya.sen@novisagro.com')}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <UserCheck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Approved Client</span>
                </div>
                <div className="text-3xs font-mono text-neutral-400 truncate mt-0.5">
                  Dr. Ananya Sen
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('marcus.v@ceresgenetics.io')}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Pending Client</span>
                </div>
                <div className="text-3xs font-mono text-neutral-400 truncate mt-0.5">
                  Marcus Vance
                </div>
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-700 flex items-start gap-2.5 text-xs text-neutral-200">
              <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40 font-mono"
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-3xs font-mono uppercase text-neutral-400">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40 font-mono"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-white text-black font-mono font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)] disabled:opacity-60"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Bottom Links */}
          <div className="pt-4 border-t border-white/[0.08] space-y-3 text-center">
            <p className="text-xs text-neutral-400">
              Don't have an approved workspace yet?{' '}
              <Link to="/signup" className="text-white font-semibold underline">
                Request Access
              </Link>
            </p>

            <div className="pt-2">
              <Link
                to="/admin/login"
                className="text-3xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors uppercase tracking-wider"
              >
                System Administrator? Access Admin Portal →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/[0.08] text-center text-3xs font-mono text-neutral-500">
        AgroTraceX Secure Authentication • GLP Protocol Compliance
      </footer>
    </div>
  );
};
