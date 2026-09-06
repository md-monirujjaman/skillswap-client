import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#e10032] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const normalizedRole = String(user.role).toLowerCase();
  const allowedRole = allowedRoles.some((role) => role.toLowerCase() === normalizedRole);

  if (!allowedRole) {
    const dashboardByRole: Record<string, string> = {
      Admin: "/dashboard/admin",
      Freelancer: "/dashboard/freelancer",
      Client: "/dashboard/client",
    };
    return <Navigate to={dashboardByRole[user.role] || "/"} replace />;
  }

  return children;
}
