import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-6xl font-black text-[#e10032] mb-4">403</h1>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Forbidden</h2>
        <p className="text-slate-500 dark:text-neutral-400">You do not have permission to access this page.</p>
      </div>
    );
  }

  return children;
}
