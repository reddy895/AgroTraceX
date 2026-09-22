// src/components/layout/AdminNavbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Clock,
  Activity,
  Settings,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { AgroTraceXLogo } from '../shared/AgroTraceXLogo';
import { useAuth } from '../../context/AuthContext';

export const ADMIN_NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/admin/requests', label: 'Client Requests', icon: Clock, showBadge: true },
  { to: '/admin/clients', label: 'Client Directory', icon: Users },
  { to: '/admin/activity', label: 'Audit Activity', icon: Activity },
  { to: '/admin/settings', label: 'System Settings', icon: Settings }
];

export const AdminNavbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchOverview = async () => {
    try {
      const token = localStorage.getItem('agrotracex_token');
      const res = await fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.metrics) {
          setPendingCount(data.metrics.pendingCount || 0);
        }
      }
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    fetchOverview();
    const interval = setInterval(fetchOverview, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#050505]/95 border-b border-white/15 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          {/* Left: AgroTraceX logo + Admin Tag */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/admin" className="flex items-center">
              <AgroTraceXLogo size="md" showTagline={false} />
            </Link>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-3xs font-mono font-bold uppercase bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <ShieldCheck className="w-3 h-3" />
              <span>ADMIN PORTAL</span>
            </div>
          </div>

          {/* Center: Admin Modules Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-neutral-400">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.to
                : location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all font-mono text-xs ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                      : 'hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {item.showBadge && pendingCount > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-3xs font-mono font-bold ${
                        isActive ? 'bg-black text-white' : 'bg-white text-black'
                      }`}
                    >
                      {pendingCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right: Refresh, Admin Profile & Logout */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOverview}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
              title="Refresh Telemetry"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            {/* Admin Info */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10 text-left">
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-3xs font-bold font-mono">
                AD
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">
                  {currentUser?.name || 'Administrator'}
                </div>
                <div className="text-3xs text-neutral-400 font-mono">
                  Master Security Lead
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-3xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Admin Logout</span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#070707] border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl">
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

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-left">
                <div className="text-xs font-bold text-white">System Administrator</div>
                <div className="text-3xs text-neutral-400 font-mono mt-0.5">
                  Single Platform Master
                </div>
              </div>

              <nav className="space-y-1 font-mono text-xs">
                {ADMIN_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? location.pathname === item.to
                    : location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-white text-black font-bold'
                          : 'text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.showBadge && pendingCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-3xs font-mono font-bold bg-white text-black">
                          {pendingCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-xl bg-white/10 border border-white/15 text-center font-mono text-xs uppercase text-white hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Admin Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
