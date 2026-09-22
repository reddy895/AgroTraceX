// src/pages/ClientSignInPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AgroTraceXLogo } from '../components/shared/AgroTraceXLogo';
import {
  Lock,
  Mail,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const ClientSignInPage = () => {
  const [email, setEmail] = useState('ananya.sen@novisagro.com');
  const [password, setPassword] = useState('client123');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginClient } = useAuth();
  const navigate = useNavigate();

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
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Client Sign In
            </h1>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Enter your credentials to access your verified trial workspace.
            </p>
          </div>

          {/* Quick Demo Selector */}
          <div className="bg-white/[0.02] border border-white/[0.08] p-3 rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-xs font-medium text-neutral-300">
                Demo Accounts
              </span>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                One-Click
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('ananya.sen@novisagro.com')}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Approved Client</span>
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-mono truncate">
                  Dr. Ananya Sen
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('marcus.v@ceresgenetics.io')}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Pending Client</span>
                </div>
                <div className="text-xs text-neutral-400 mt-1 font-mono truncate">
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
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
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
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Password
              </label>
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
              className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)] disabled:opacity-60"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Bottom Links */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2.5 text-center">
            <p className="text-xs text-neutral-400">
              Don't have an approved workspace yet?{' '}
              <Link to="/signup" className="text-white font-medium hover:underline">
                Request Access
              </Link>
            </p>

            <div>
              <Link
                to="/admin/login"
                className="text-xs text-neutral-500 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <span>Admin Portal Access</span>
                <ArrowRight className="w-3 h-3" />
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
