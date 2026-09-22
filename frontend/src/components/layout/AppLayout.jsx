// src/components/layout/AppLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Topbar } from './Topbar';
import { GlobalSearchModal } from './GlobalSearchModal';
import { Footer } from '../landing/Footer';

export const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Floating Sticky Glass Top Navigation Bar */}
      <Topbar />

      {/* Main Content Area: Full width, continuous scrollable */}
      <main className={`flex-1 w-full flex flex-col ${isHome ? '' : 'pt-24 sm:pt-28 pb-16 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12'}`}>
        <Outlet />
      </main>

      {/* Footer rendered globally on subpages if needed */}
      {!isHome && <Footer />}

      {/* Global Search Dialog (⌘K) */}
      <GlobalSearchModal />
    </div>
  );
};
