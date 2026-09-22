// src/components/layout/PublicNavbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  FlaskConical,
  Package,
  Smartphone,
  Users,
  Stethoscope,
  TestTube,
  FileCheck2,
  BarChart3
} from 'lucide-react';
import { AgroTraceXLogo } from '../shared/AgroTraceXLogo';
import { useSearch } from '../../context/SearchContext';

export const PublicNavbar = () => {
  const { openSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === '/';

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setPlatformDropdownOpen(false);
    if (!isHome) {
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const platformsList = [
    { title: 'Field Trials', desc: 'Multi-location RCBD experimental designs & replication plots', icon: FlaskConical },
    { title: 'Seed Traceability', desc: 'Cultivar germplasm, lineage & tamper-evident barcode batches', icon: Package },
    { title: 'Field Operations', desc: 'In-situ offline mobile capture & GPS boundary audits', icon: Smartphone },
    { title: 'Farmers', desc: 'KYC grower profiles, parcel lease tenure & direct telemetry', icon: Users },
    { title: 'Agronomists', desc: 'Scientific review, phenotyping validation & protocol sign-off', icon: Stethoscope },
    { title: 'Samples & Laboratory', desc: 'NIR spectroscopy, grain quality assays & chain of custody', icon: TestTube },
    { title: 'Reports', desc: 'Automated ANOVA variance dossiers & release certificates', icon: FileCheck2 },
    { title: 'Analytics', desc: 'Zonal trial velocity, compliance metrics & yield telemetry', icon: BarChart3 }
  ];

  return (
    <>
      {/* Floating Centered Glass Public Navigation Bar */}
      <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
        <div className="max-w-[1280px] mx-auto pointer-events-auto">
          <nav className="ag-glass-nav rounded-2xl sm:rounded-full px-5 sm:px-7 py-3 flex items-center justify-between gap-4 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,255,255,0.03)]">
            {/* Left: AgroTraceX logo */}
            <Link to="/" className="shrink-0 flex items-center">
              <AgroTraceXLogo size="md" showTagline={false} showTooltip={true} />
            </Link>

            {/* Center: Public Navigation Links ONLY */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-mono tracking-wider uppercase text-neutral-300">
              {/* Platforms Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPlatformDropdownOpen(true)}
                onMouseLeave={() => setPlatformDropdownOpen(false)}
              >
                <button
                  onClick={() => scrollToSection('platforms')}
                  className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                    platformDropdownOpen
                      ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                      : 'hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span>Platforms</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      platformDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Platforms Dropdown Panel */}
                {platformDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-[420px] z-50">
                    <div className="bg-[#0a0a0a]/98 border border-white/15 rounded-2xl p-3 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(255,255,255,0.05)] backdrop-blur-2xl grid grid-cols-2 gap-1 text-left">
                      {platformsList.map((p) => {
                        const Icon = p.icon;
                        return (
                          <button
                            key={p.title}
                            onClick={() => scrollToSection('platforms')}
                            className="p-2.5 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/15 transition-all flex items-start gap-2.5 text-left group cursor-pointer"
                          >
                            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 group-hover:text-white group-hover:border-white/30 transition-all shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="block font-bold text-xs text-white tracking-tight">
                                {p.title}
                              </span>
                              <span className="block text-3xs text-neutral-400 truncate mt-0.5">
                                {p.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                      <div className="col-span-2 pt-2 border-t border-white/10 mt-1 px-2">
                        <Link
                          to="/platform-info"
                          onClick={() => setPlatformDropdownOpen(false)}
                          className="text-3xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white flex items-center justify-between py-1"
                        >
                          <span>Explore Full Platform Architecture</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions */}
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                Solutions
              </button>

              {/* Impact */}
              <button
                onClick={() => scrollToSection('impact')}
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                Impact
              </button>

              {/* About */}
              <Link
                to="/about"
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
              >
                About
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
              >
                Contact
              </Link>
            </div>

            {/* Right: Search, Sign In, Get Started */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Search button */}
              <button
                onClick={openSearch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white transition-all cursor-pointer text-3xs font-mono"
                title="Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-neutral-400">Search</span>
              </button>

              {/* Sign In */}
              <Link
                to="/signin"
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-3xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                Sign In
              </Link>

              {/* Get Started */}
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-white text-black font-bold text-3xs sm:text-2xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile menu toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0a0a0a]/98 border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <AgroTraceXLogo size="md" showTagline={false} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Public Links */}
              <div className="space-y-2 font-mono text-xs uppercase tracking-wider">
                <button
                  onClick={() => scrollToSection('platforms')}
                  className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  Platforms
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  Solutions
                </button>
                <button
                  onClick={() => scrollToSection('impact')}
                  className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  Impact
                </button>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2 font-mono">
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white text-black text-center font-bold text-xs uppercase block shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Get Started →
              </Link>
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl border border-white/15 text-center text-xs uppercase text-neutral-300 block hover:text-white hover:bg-white/5"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
