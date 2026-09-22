// src/pages/PublicPages.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Globe2,
  Users2,
  Mail,
  Building,
  Phone,
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Package,
  Smartphone,
  Users,
  Stethoscope,
  TestTube,
  FileCheck2,
  BarChart3
} from 'lucide-react';
import { Footer } from '../components/landing/Footer';

// -------------------------------------------------------------
// ABOUT PAGE (/about)
// -------------------------------------------------------------
export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex flex-col justify-between font-sans pt-28 sm:pt-32">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 space-y-16 pb-20">
        {/* Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-3xs font-mono tracking-widest uppercase text-neutral-400">
            <span>ABOUT AGROTRACEX</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            Scientific Integrity from Seed to Harvest.
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            AgroTraceX was founded to solve agricultural research's most urgent operational challenge: lack of tamper-evident verification between experimental germplasm breeding, remote farmer plots, and laboratory release dossiers.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ag-glass rounded-2xl p-7 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Zero Fraud Tolerance</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every field observation requires sub-meter GPS verification, automated sensor telemetry, and blind agronomist corroboration.
            </p>
          </div>

          <div className="ag-glass rounded-2xl p-7 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Multi-Zonal Scalability</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Designed for harsh rural environments with offline-first mobile synchronizations across hundreds of decentralized agricultural test zones.
            </p>
          </div>

          <div className="ag-glass rounded-2xl p-7 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">GLP & ISO Standards</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Standardized RCBD statistical modeling and cryptographic chain-of-custody acceptable by global seed regulatory agencies.
            </p>
          </div>
        </div>

        {/* Callout */}
        <div className="ag-glass rounded-3xl p-8 sm:p-12 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Partner with AgroTraceX</h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Join leading seed genetics firms, research universities, and agritech leaders modernizing agricultural trial operations.
            </p>
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-mono font-semibold text-xs uppercase tracking-wider shrink-0"
          >
            <span>Request Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// -------------------------------------------------------------
// PLATFORM INFO PAGE (/platform-info)
// -------------------------------------------------------------
export const PlatformInfoPage = () => {
  const capabilities = [
    { title: 'Field Trials Management', icon: FlaskConical, desc: 'Randomized Complete Block Designs (RCBD), replication plots, phenological scheduling.' },
    { title: 'Seed Lot Traceability', icon: Package, desc: 'Cultivar germplasm registration, barcode chain of custody, germination certification.' },
    { title: 'Field Operations Flow', icon: Smartphone, desc: 'Offline mobile phenotyping, sub-meter GPS parcel audits, automated sync.' },
    { title: 'Farmer Network', icon: Users, desc: 'KYC verified grower directory, parcel lease management, grower compensation ledgers.' },
    { title: 'Agronomist Scientific Review', icon: Stethoscope, desc: 'In-situ phenotyping audits, disease scoring, protocol compliance verification.' },
    { title: 'Samples & Spectroscopy', icon: TestTube, desc: 'Tamper-evident chain of custody, NIR spectroscopy laboratory screening.' },
    { title: 'Certified Reports', icon: FileCheck2, desc: 'Automated ANOVA variance analysis, statistical dossiers, multi-sign-off clearance.' },
    { title: 'Executive Analytics', icon: BarChart3, desc: 'Zonal trial velocity, protocol compliance rates, cross-season cultivar comparisons.' }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex flex-col justify-between font-sans pt-28 sm:pt-32">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 space-y-14 pb-20">
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-3xs font-mono tracking-widest uppercase text-neutral-400">
            <span>PLATFORM SPECIFICATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            Integrated Agricultural Trial Architecture.
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            AgroTraceX combines rigorous biometric field protocols with an enterprise-grade SaaS intelligence terminal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="ag-glass rounded-2xl p-6 border border-white/10 space-y-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Icon className="w-5 h-5 text-neutral-200" />
                </div>
                <h3 className="text-lg font-bold text-white">{c.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-black font-mono font-semibold text-xs uppercase tracking-wider"
          >
            <span>Apply for Client Access</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// -------------------------------------------------------------
// CONTACT PAGE (/contact)
// -------------------------------------------------------------
export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex flex-col justify-between font-sans pt-28 sm:pt-32">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 space-y-12 pb-20">
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-3xs font-mono tracking-widest uppercase text-neutral-400">
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            Connect with AgroTraceX.
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Inquire about enterprise deployment, API integrations, or field trial operational support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="ag-glass rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white">Operations Headquarters</h3>
              <div className="space-y-3 text-xs text-neutral-300 font-mono">
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-neutral-400" />
                  <span>AgroTraceX Technologies, Inc.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>contact@agrotracex.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>+1 (800) 555-0199</span>
                </div>
              </div>
            </div>

            <div className="ag-glass rounded-2xl p-6 border border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase text-neutral-400">Ready to join?</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                If your organization is conducting field trials, register directly to request your authenticated workspace.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 text-xs font-mono text-white underline pt-1"
              >
                <span>Request Client Workspace →</span>
              </Link>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="ag-glass rounded-2xl p-8 border border-white/15 text-left">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                  <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Thank you for reaching out. Our agricultural operations team will contact you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-white/40"
                        placeholder="Dr. Jordan Hayes"
                      />
                    </div>
                    <div>
                      <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                        Work Email
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-white/40"
                        placeholder="jordan@agri-corp.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                      Organization / Institution
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-white/40"
                      placeholder="Apex Seed Genetics"
                    />
                  </div>

                  <div>
                    <label className="block text-3xs font-mono uppercase text-neutral-400 mb-1.5">
                      Inquiry Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-white/40"
                      placeholder="Tell us about your trial program or inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white text-black font-mono font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
