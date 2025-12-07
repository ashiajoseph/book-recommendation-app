import type { ReactNode } from "react";
import { isAuthenticated } from "../utils/authentication";
import { Navigate } from "react-router-dom";

interface WithAuthProps {
  children: ReactNode;
}

const WithAuth = ({ children }: WithAuthProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default WithAuth;
