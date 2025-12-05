import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuth();

  if (user) return <Navigate to="/todos" replace />;
  return children;
};

export default PublicRoute;
