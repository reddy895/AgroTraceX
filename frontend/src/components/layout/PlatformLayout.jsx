// src/components/layout/PlatformLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PlatformNavbar } from './PlatformNavbar';
import { GlobalSearchModal } from './GlobalSearchModal';

export const PlatformLayout = () => {
  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Platform Topbar: NO left sidebar! Clean top navigation bar */}
      <PlatformNavbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* Global Search Dialog (⌘K) */}
      <GlobalSearchModal />
    </div>
  );
};
