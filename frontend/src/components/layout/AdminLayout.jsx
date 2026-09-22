// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Admin Dedicated Navbar */}
      <AdminNavbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Admin Operational Footer */}
      <footer className="border-t border-white/[0.08] py-4 px-6 text-center text-3xs font-mono text-neutral-500">
        AgroTraceX Platform Governance Console • Single Administrator Authorized Instance
      </footer>
    </div>
  );
};
