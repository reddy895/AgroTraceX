// src/components/layout/PlatformNavbar.jsx
import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FlaskConical,
  Package,
  MapPin,
  Users,
  Stethoscope,
  Smartphone,
  Eye,
  TestTube,
  FileCheck2,
  BarChart3,
  Search,
  Menu,
  X,
  Settings,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { AgroTraceXLogo } from '../shared/AgroTraceXLogo';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';

export const PLATFORM_NAV_ITEMS = [
  { to: '/platform', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/platform/trials', label: 'Trials', icon: FlaskConical },
  { to: '/platform/seed-lots', label: 'Seed Lots', icon: Package },
  { to: '/platform/fields', label: 'Fields', icon: MapPin },
  { to: '/platform/farmers', label: 'Farmers', icon: Users },
  { to: '/platform/agronomists', label: 'Agronomists', icon: Stethoscope },
  { to: '/platform/field-officer', label: 'Field Flow', icon: Smartphone },
  { to: '/platform/observations', label: 'Observations', icon: Eye },
  { to: '/platform/samples', label: 'Samples', icon: TestTube },
  { to: '/platform/reports', label: 'Reports', icon: FileCheck2 },
  { to: '/platform/analytics', label: 'Analytics', icon: BarChart3 }
];

export const PlatformNavbar = () => {
  const { openSearch } = useSearch();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#030303]/95 border-b border-white/[0.08] backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Left: AgroTraceX logo + badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/platform" className="flex items-center">
              <AgroTraceXLogo size="md" showTagline={false} showTooltip={true} />
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-3xs font-mono font-bold uppercase bg-white/10 text-white border border-white/15">
              WORKSPACE
            </span>
          </div>

          {/* Center: Internal Platform Modules Navigation */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-neutral-400 overflow-x-auto no-scrollbar py-1">
            {PLATFORM_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname === item.to || (item.to !== '/platform' && location.pathname.startsWith(item.to));

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap text-xs font-mono ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                      : 'hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Search, Settings, Profile & Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search (⌘K) */}
            <button
              onClick={openSearch}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white transition-all text-xs font-mono cursor-pointer"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <kbd className="hidden sm:inline-flex px-1.5 py-0.2 bg-white/10 rounded text-3xs text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Settings */}
            <Link
              to="/platform/settings"
              className={`p-2 rounded-xl transition-colors ${
                location.pathname === '/platform/settings'
                  ? 'bg-white/15 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {/* User Profile Info */}
            {currentUser && (
              <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10">
                <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-3xs font-bold font-mono">
                  {currentUser.avatar || currentUser.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-3xs text-neutral-400 font-mono truncate max-w-[140px]">
                    {currentUser.organization || 'Client Workspace'}
                  </div>
                </div>
              </div>
            )}

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-3xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-white/10 text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Platform Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0a0a0a]/98 border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <AgroTraceXLogo size="md" showTagline={false} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {currentUser && (
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-left">
                  <div className="text-xs font-bold text-white">{currentUser.name}</div>
                  <div className="text-3xs text-neutral-400 mt-0.5">{currentUser.organization}</div>
                  <div className="text-3xs font-mono text-white mt-1 uppercase">Status: APPROVED</div>
                </div>
              )}

              <nav className="space-y-1 font-mono text-xs">
                {PLATFORM_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? location.pathname === item.to
                    : location.pathname === item.to || (item.to !== '/platform' && location.pathname.startsWith(item.to));

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-white text-black font-bold'
                          : 'text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-xl bg-white/10 border border-white/15 text-center font-mono text-xs uppercase text-white hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
