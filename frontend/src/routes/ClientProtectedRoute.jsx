// src/routes/ClientProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, STATUSES, ROLES } from '../context/AuthContext';
import { ClientStatusScreen } from '../components/client/ClientStatusScreens';
import { Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClientProtectedRoute = () => {
  const { currentUser, token, sessionVerified } = useAuth();
  const location = useLocation();

  if (!sessionVerified) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
          <span className="text-xs font-mono text-neutral-400">Verifying security credentials...</span>
        </div>
      </div>
    );
  }

  // Not signed in -> redirect to Client Sign In
  if (!token || !currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Admin isolation: If an admin tries to access client workspace, provide clear notice
  if (currentUser.role === ROLES.ADMIN) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full ag-glass rounded-3xl p-8 border border-white/20 text-center space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">Administrator Session Active</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            You are currently signed in as System Administrator. The Client Workspace is reserved for approved commercial clients. Please navigate to the Admin Portal.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/admin"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider"
            >
              <span>Go to Admin Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Non-approved states
  if (currentUser.status === STATUSES.PENDING) {
    return <ClientStatusScreen status={STATUSES.PENDING} />;
  }

  if (currentUser.status === STATUSES.REJECTED) {
    return <ClientStatusScreen status={STATUSES.REJECTED} />;
  }

  if (currentUser.status === STATUSES.REVOKED) {
    return <ClientStatusScreen status={STATUSES.REVOKED} />;
  }

  // Status === APPROVED -> allow access to complete Client Workspace
  return <Outlet />;
};
