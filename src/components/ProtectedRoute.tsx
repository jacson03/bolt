// src/components/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth: boolean;
  userType: "user" | "admin";
}

const ProtectedRoute = ({
  children,
  requireAuth,
  userType,
}: ProtectedRouteProps) => {
  const { userToken, adminToken, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // defer until token check completes

    const hasAuth = userType === "user" ? !!userToken : !!adminToken;

    if (requireAuth && !hasAuth) {
      // block unauthenticated access
      navigate(userType === "user" ? "/login" : "/admin/login");
    } else if (!requireAuth && hasAuth) {
      // prevent logged‑in users from hitting auth pages
      navigate(userType === "user" ? "/user/dashboard" : "/admin/dashboard");
    }
  }, [isLoading, userToken, adminToken, requireAuth, userType, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
