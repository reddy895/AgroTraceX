// src/components/layout/Topbar.jsx
import React from 'react';
import { Menu, Search, Command } from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';
import { NotificationDropdown } from './NotificationDropdown';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';

export const Topbar = ({ onOpenMobileMenu }) => {
  const { openSearch } = useSearch();
  const { currentUser } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left side: Mobile menu toggle + Global Search trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search trigger bar */}
        <button
          onClick={openSearch}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-400 text-xs transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Search trials, seed lots, farmers...</span>
            <span className="sm:hidden">Search...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-3xs font-mono font-semibold text-slate-500 bg-white border border-slate-200 rounded">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right side: Role Switcher + Notifications + User profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Notifications */}
        <NotificationDropdown />

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User Profile info */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-[#0F4A2A] text-white flex items-center justify-center text-xs font-bold shadow-xs">
            {currentUser.avatar}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-tight">
              {currentUser.name}
            </div>
            <div className="text-3xs text-slate-500 truncate max-w-[140px]">
              {currentUser.title}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
