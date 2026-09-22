// src/routes/AdminProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const AdminProtectedRoute = () => {
  const { currentUser, token, sessionVerified } = useAuth();
  const location = useLocation();

  if (!sessionVerified) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
          <span className="text-xs font-mono text-neutral-400">Verifying administrative privileges...</span>
        </div>
      </div>
    );
  }

  // Not signed in or not an ADMIN -> redirect to dedicated Admin Login
  if (!token || !currentUser || currentUser.role !== ROLES.ADMIN) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Authenticated Admin -> render Admin Portal
  return <Outlet />;
};
