// src/components/layout/Topbar.jsx
import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  FlaskConical,
  Package,
  MapPin,
  Users,
  Stethoscope,
  Smartphone,
  Eye,
  TestTube,
  FileCheck2,
  Building2,
  BarChart3,
  Settings,
  Sparkles
} from 'lucide-react';
import { AgroTraceXLogo } from '../shared/AgroTraceXLogo';
import { RoleSwitcher } from './RoleSwitcher';
import { NotificationDropdown } from './NotificationDropdown';
import { useSearch } from '../../context/SearchContext';
import { useAuth, ROLES } from '../../context/AuthContext';

export const PLATFORM_MODULES = [
  { to: '/trials', label: 'Field Trials', icon: FlaskConical, desc: 'Multi-location protocol trials' },
  { to: '/seed-lots', label: 'Seed Lots', icon: Package, desc: 'Genetic germplasm tracking' },
  { to: '/fields', label: 'Field Plots', icon: MapPin, desc: 'Geofenced plot perimeters' },
  { to: '/farmers', label: 'Verified Farmers', icon: Users, desc: 'KYC verified growers' },
  { to: '/agronomists', label: 'Agronomists', icon: Stethoscope, desc: 'Scientific phenotyping audit' },
  { to: '/field-officer', label: 'Field Officer Flow', icon: Smartphone, desc: 'Outdoor mobile logging' },
  { to: '/observations', label: 'Observations', icon: Eye, desc: 'In-situ visual data & NDVI' },
  { to: '/samples', label: 'Lab Samples', icon: TestTube, desc: 'NIR spectroscopy testing' },
  { to: '/reports', label: 'ANOVA Reports', icon: FileCheck2, desc: 'Certified statistical dossiers' },
  { to: '/companies', label: 'Agri Companies', icon: Building2, desc: 'Commercial breeding clients' },
  { to: '/analytics', label: 'Analytics Terminal', icon: BarChart3, desc: 'Velocity & compliance KPIs' },
  { to: '/settings', label: 'Settings', icon: Settings, desc: 'Platform security & GLP rules' }
];

export const Topbar = () => {
  const { openSearch } = useSearch();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location.pathname === '/';

  const handleNavScroll = (id) => {
    setMobileMenuOpen(false);
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

  return (
    <>
      {/* Floating Sticky Top Navigation Bar (Section 3 & 4) */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
        <div className="max-w-[1360px] mx-auto pointer-events-auto">
          <nav className="ag-glass-nav rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.03)] border border-white/15">
            {/* Left: AgroTraceX logo with hover tooltip */}
            <div className="flex items-center gap-3">
              <Link to="/" className="shrink-0 flex items-center">
                <AgroTraceXLogo size="md" showTagline={false} showTooltip={true} />
              </Link>
            </div>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-mono tracking-wider uppercase text-neutral-300">
              {/* Product */}
              <button
                onClick={() => handleNavScroll('platform')}
                className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
              >
                Product
              </button>

              {/* Solutions */}
              <button
                onClick={() => handleNavScroll('how-it-works')}
                className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
              >
                Solutions
              </button>

              {/* Platform Modules Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPlatformDropdownOpen(true)}
                onMouseLeave={() => setPlatformDropdownOpen(false)}
              >
                <button
                  onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                    platformDropdownOpen || location.pathname !== '/'
                      ? 'text-white bg-white/15 border border-white/20'
                      : 'hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>Platform</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${platformDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {platformDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[520px] z-50">
                    <div className="bg-[#0a0a0a]/95 border border-white/15 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.04)] backdrop-blur-2xl grid grid-cols-2 gap-2 text-left">
                      {PLATFORM_MODULES.map((mod) => {
                        const Icon = mod.icon;
                        const isModActive = location.pathname === mod.to;
                        return (
                          <Link
                            key={mod.to}
                            to={mod.to}
                            onClick={() => setPlatformDropdownOpen(false)}
                            className={`p-2.5 rounded-xl border transition-all flex items-start gap-2.5 group ${
                              isModActive
                                ? 'bg-white text-black border-white'
                                : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.08] hover:border-white/20 text-neutral-300 hover:text-white'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 ${isModActive ? 'bg-black text-white' : 'bg-white/10 text-neutral-300 group-hover:text-white'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className={`block font-bold text-xs tracking-tight ${isModActive ? 'text-black' : 'text-white'}`}>
                                {mod.label}
                              </span>
                              <span className={`block text-3xs truncate ${isModActive ? 'text-neutral-700' : 'text-neutral-500'}`}>
                                {mod.desc}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Impact */}
              <button
                onClick={() => handleNavScroll('impact')}
                className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
              >
                Impact
              </button>

              {/* Pricing */}
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavScroll('pricing');
                }}
                className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
              >
                Pricing
              </a>

              {/* About */}
              <button
                onClick={() => handleNavScroll('about')}
                className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
              >
                About
              </button>
            </div>

            {/* Right: Search, Role, Notifications, Sign In, Get Started */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search trigger icon */}
              <button
                onClick={openSearch}
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 text-neutral-300 hover:text-white transition-all cursor-pointer text-3xs font-mono"
                title="Search platform (⌘K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-neutral-400">Search</span>
                <kbd className="hidden sm:inline-flex px-1.5 py-0.2 bg-white/10 rounded border border-white/15 text-3xs">
                  ⌘K
                </kbd>
              </button>

              {/* Role Switcher */}
              <RoleSwitcher />

              {/* Notifications */}
              <NotificationDropdown />

              <div className="h-5 w-px bg-white/15 mx-1 hidden sm:block" />

              {/* Sign In Button */}
              <Link
                to="/login"
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-3xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                Sign In
              </Link>

              {/* Get Started Button */}
              <button
                onClick={() => {
                  if (!isHome) {
                    navigate('/');
                  } else {
                    const el = document.getElementById('platform');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-1.5 rounded-full bg-white text-black font-bold text-3xs sm:text-2xs font-mono uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              {/* Mobile menu toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Slide-Over Glass Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
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

              {/* Quick Links */}
              <div className="space-y-1 font-mono text-xs uppercase tracking-wider">
                <button
                  onClick={() => handleNavScroll('platform')}
                  className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  Product / Dashboard
                </button>
                <button
                  onClick={() => handleNavScroll('how-it-works')}
                  className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleNavScroll('impact')}
                  className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  Impact
                </button>
                <button
                  onClick={() => handleNavScroll('about')}
                  className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10"
                >
                  About
                </button>
              </div>

              {/* Platform Modules list */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-3xs font-mono uppercase tracking-widest text-neutral-500 block mb-2 px-3">
                  All Platform Modules
                </span>
                <div className="max-h-[40vh] overflow-y-auto space-y-1 pr-1 no-scrollbar">
                  {PLATFORM_MODULES.map((mod) => {
                    const Icon = mod.icon;
                    return (
                      <Link
                        key={mod.to}
                        to={mod.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-neutral-400" />
                        <span>{mod.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl border border-white/20 text-center font-mono text-xs uppercase text-white block hover:bg-white/10"
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
