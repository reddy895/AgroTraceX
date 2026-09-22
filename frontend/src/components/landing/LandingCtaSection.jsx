// src/components/landing/LandingCtaSection.jsx
import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const LandingCtaSection = ({ onGetStarted }) => {
  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.08] relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="ag-glass rounded-3xl p-8 sm:p-14 lg:p-16 border border-white/15 text-center max-w-4xl mx-auto space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-3xs font-mono uppercase tracking-widest text-neutral-300">
            <Sparkles className="w-3 h-3 text-white" />
            <span>COMMERCIAL TRIAL ACCELERATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[0.98]">
            Build a More Transparent
            <br />
            Food System.
          </h2>

          <p className="text-xs sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Deploy AgroTraceX to eliminate trial fraud, streamline in-field phenotyping audits, and accelerate commercial seed release with absolute scientific confidence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onGetStarted}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] active:scale-[0.98] cursor-pointer"
            >
              <span>GET STARTED</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.04] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/15 hover:border-white/35 hover:bg-white/[0.08] transition-all active:scale-[0.98]"
            >
              SCHEDULE ENTERPRISE DEMO
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-3xs font-mono text-neutral-500">
            <span>SOC2 TYPE II CERTIFIED</span>
            <span>•</span>
            <span>GLP TRIAL AUDITED</span>
            <span>•</span>
            <span>REST API READY</span>
          </div>
        </div>
      </div>
    </section>
  );
};
