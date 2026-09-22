// src/components/layout/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from './PublicNavbar';
import { GlobalSearchModal } from './GlobalSearchModal';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Centered Floating Sticky Glass Public Topbar */}
      <PublicNavbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>

      {/* Global Search Dialog (⌘K) */}
      <GlobalSearchModal />
    </div>
  );
};
