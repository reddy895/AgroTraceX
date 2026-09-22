// src/pages/ClientSignUpPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AgroTraceXLogo } from '../components/shared/AgroTraceXLogo';
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  FileText,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

export const ClientSignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    reason: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerClient } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await registerClient(formData);
      if (res && res.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit registration request.');
    } finally {
      setLoading(false);
    }
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

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="max-w-xl w-full ag-glass rounded-3xl p-8 sm:p-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-left">
          {submitted ? (
            /* Post-Registration Success View: ACCESS REQUEST SUBMITTED */
            <div className="text-center space-y-6 py-4">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-wider text-white">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>STATUS: PENDING</span>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 mx-auto flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Access Request Submitted
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md mx-auto">
                  Your AgroTraceX workspace request has been received. Our team will review your organization details and activate your workspace.
                </p>
              </div>

              {/* Summary Dossier */}
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5 text-left space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Applicant:</span>
                  <span className="text-white font-semibold">{formData.name}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Organization:</span>
                  <span className="text-white font-semibold">{formData.organization}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Designation:</span>
                  <span className="text-white font-semibold">{formData.designation}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Work Email:</span>
                  <span className="text-white font-semibold">{formData.email}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono">
                <button
                  onClick={() => navigate('/platform')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <span>Go to Workspace Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] text-neutral-300 hover:text-white border border-white/10 text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <span>Return to Homepage</span>
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form View */
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-3xs font-mono uppercase tracking-widest text-neutral-500 block">
                  CLIENT ONBOARDING
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Request Workspace Access
                </h1>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  All client registrations are reviewed and verified before workspace activation.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-700 flex items-start gap-2.5 text-xs text-neutral-200">
                  <AlertCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Dr. Elena Rostova"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                      />
                      <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                      Work Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="elena@novisagro.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40 font-mono"
                      />
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Organization */}
                  <div>
                    <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                      Organization / Company *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => handleChange('organization', e.target.value)}
                        placeholder="Novis AgroSciences Global"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                      />
                      <Building className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                      Designation / Role *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => handleChange('designation', e.target.value)}
                        placeholder="Lead Agronomist & Phenotyper"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                      />
                      <Briefcase className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+1 (555) 234-5678"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40 font-mono"
                      />
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40 font-mono"
                      />
                      <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Reason for requesting access */}
                <div>
                  <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                    Reason for Requesting Platform Access *
                  </label>
                  <div className="relative">
                    <textarea
                      rows={3}
                      required
                      value={formData.reason}
                      onChange={(e) => handleChange('reason', e.target.value)}
                      placeholder="Describe your planned field trials, seed lot numbers, or research objectives..."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-white/40"
                    />
                    <FileText className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-mono font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)] disabled:opacity-60"
                  >
                    <span>{loading ? 'Submitting Request...' : 'Submit Access Request'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              <div className="pt-4 border-t border-white/[0.08] text-center">
                <p className="text-xs text-neutral-400">
                  Already have an authorized account?{' '}
                  <Link to="/signin" className="text-white font-semibold underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-white/[0.08] text-center text-3xs font-mono text-neutral-500">
        AgroTraceX Secure Access Governance • Zero-Trust Compliance
      </footer>
    </div>
  );
};
