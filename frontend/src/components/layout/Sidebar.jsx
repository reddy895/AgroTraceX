// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
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
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AgroTraceXLogo } from '../shared/AgroTraceXLogo';
import { useAuth, ROLES } from '../../context/AuthContext';

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/trials', label: 'Trials', icon: FlaskConical },
  { to: '/seed-lots', label: 'Seed Lots', icon: Package },
  { to: '/fields', label: 'Fields', icon: MapPin },
  { to: '/farmers', label: 'Farmers', icon: Users },
  { to: '/agronomists', label: 'Agronomists', icon: Stethoscope },
  { to: '/field-officer', label: 'Field Officer Flow', icon: Smartphone, highlight: true },
  { to: '/observations', label: 'Observations', icon: Eye },
  { to: '/samples', label: 'Samples', icon: TestTube },
  { to: '/reports', label: 'Reports', icon: FileCheck2 },
  { to: '/companies', label: 'Companies', icon: Building2, adminOnly: true },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export const Sidebar = ({
  collapsed = false,
  onToggleCollapse,
  isMobile = false,
  onCloseMobile
}) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const filteredNavItems = NAV_ITEMS.filter((item) => {
    if (item.adminOnly && currentUser.role !== ROLES.ADMIN) {
      return false;
    }
    return true;
  });

  return (
    <aside
      className={`bg-[#fffdf7] border-r border-slate-200/90 flex flex-col transition-all duration-200 z-30 ${
        isMobile
          ? 'w-72 h-full'
          : collapsed
          ? 'w-18'
          : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className={`h-16 px-4 flex items-center justify-between border-b border-slate-100 ${collapsed && !isMobile ? 'justify-center px-2' : ''}`}>
        {!collapsed || isMobile ? (
          <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-2">
            <AgroTraceXLogo size="md" showTagline={false} />
          </NavLink>
        ) : (
          <NavLink to="/" className="flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-[#556D3F] text-white flex items-center justify-center font-bold text-sm">
              X
            </div>
          </NavLink>
        )}

        {!isMobile && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors hidden lg:flex cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                isActive
                  ? 'bg-[#556D3F] text-white shadow-xs'
                  : item.highlight
                  ? 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              } ${collapsed && !isMobile ? 'justify-center px-2 py-3' : ''}`}
              title={collapsed && !isMobile ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive
                    ? 'text-white'
                    : item.highlight
                    ? 'text-[#556D3F]'
                    : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />

              {(!collapsed || isMobile) && (
                <span className="truncate flex-1">{item.label}</span>
              )}

              {item.highlight && (!collapsed || isMobile) && (
                <span className={`text-3xs font-bold uppercase px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-emerald-200/70 text-emerald-900'
                }`}>
                  Outdoor
                </span>
              )}

              {/* Tooltip for collapsed desktop view */}
              {collapsed && !isMobile && (
                <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Status / Protocol Badge */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/70">
        {!collapsed || isMobile ? (
          <div className="p-3 rounded-lg bg-white border border-slate-200/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-800">Seed-to-Result Live</span>
            </div>
            <p className="text-3xs text-slate-500 mt-1">
              Field telemetry & R&D protocol compliance 98.4%
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title="Platform Status: Operational">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
        )}
      </div>
    </aside>
  );
};
