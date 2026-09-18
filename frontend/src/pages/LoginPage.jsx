// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { AgroTraceXLogo } from '../components/shared/AgroTraceXLogo';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  Lock,
  Mail,
  ShieldCheck,
  Building2,
  Stethoscope,
  Smartphone,
  ArrowRight,
  Sprout,
  CheckCircle2
} from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('admin@agrotracex.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e, role = ROLES.ADMIN) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password, role);
      setLoading(false);
      showToast(`Signed in successfully as ${role}`, 'success');
      navigate('/');
    }, 400);
  };

  const handleQuickRole = (role, demoEmail) => {
    setEmail(demoEmail);
    handleLogin(null, role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
      <div className="flex min-h-screen">
        {/* Left Side: Brand Value Proposition & Agri-Tech Visual (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0F4A2A] text-white flex-col justify-between p-12 relative overflow-hidden">
          {/* Subtle geometric agricultural grid overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="leafGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="1" />
                  <circle cx="30" cy="30" r="2" fill="#ffffff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#leafGrid)" />
            </svg>
          </div>

          {/* Top Logo */}
          <div className="relative z-10">
            <AgroTraceXLogo size="lg" inverted={true} showTagline={true} />
          </div>

          {/* Center Value Proposition */}
          <div className="relative z-10 max-w-lg space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-600/40 text-xs font-semibold text-emerald-200">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              Enterprise Field-Trial Verification Platform
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Connecting Seed R&D, Farmers, and Science in the Field.
            </h1>

            <p className="text-sm text-emerald-100/90 leading-relaxed">
              AgroTraceX provides scientific field-trial management from registered seed lots through verified farmer plots, agronomist phenotyping, and tamper-evident lab certification.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Immutable chain of custody from seed packet to final yield report",
                "Sub-meter geofenced field plots & automated GPS observation audits",
                "Built for harsh outdoor environments with offline mobile logging"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Security / Trust indicator */}
          <div className="relative z-10 pt-6 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-200/80 font-mono">
            <span>ISO 9001:2015 & GLP Trial Standards</span>
            <span>Version 2.4-Production</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-6">
              <AgroTraceXLogo size="md" showTagline={true} className="mx-auto" />
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Sign in to your account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your authorized credentials to access trial management.
              </p>
            </div>

            {/* Role Demo Quick-Select Buttons */}
            <div className="bg-slate-100/80 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-500">
                  Quick Demo Access (Select Persona)
                </span>
                <span className="text-3xs text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded">
                  One-Click
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickRole(ROLES.ADMIN, 'admin@agrotracex.com')}
                  className="px-2.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#0F4A2A] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    Admin
                  </div>
                  <div className="text-3xs text-slate-500 truncate">Platform Manager</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickRole(ROLES.COMPANY, 'ananya.sen@novisagro.com')}
                  className="px-2.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#0F4A2A] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    Seed Company
                  </div>
                  <div className="text-3xs text-slate-500 truncate">Novis AgroSciences R&D</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickRole(ROLES.AGRONOMIST, 'arvind.s@agrotracex-demo.com')}
                  className="px-2.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#0F4A2A] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                    Agronomist
                  </div>
                  <div className="text-3xs text-slate-500 truncate">Scientific Validator</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickRole(ROLES.FIELD_OFFICER, 'vikas.s@agrotracex-demo.com')}
                  className="px-2.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#0F4A2A] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                    Field Officer
                  </div>
                  <div className="text-3xs text-slate-500 truncate">Outdoor Mobile Logging</div>
                </button>
              </div>
            </div>

            {/* Standard Login Form */}
            <form onSubmit={(e) => handleLogin(e, ROLES.ADMIN)} className="space-y-4">
              <Input
                label="Corporate Email Address"
                type="email"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@company.com"
              />

              <Input
                label="Password"
                type="password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#0F4A2A] focus:ring-[#0F4A2A]"
                  />
                  <span>Remember this terminal</span>
                </label>

                <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast("Password reset link dispatched to authorized admin email", "info"); }} className="font-semibold text-[#0F4A2A] hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
              >
                Sign In to Platform
              </Button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-2xs text-slate-500">
                Protected by multi-factor cryptographic trial authentication. Authorized agricultural enterprise personnel only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
