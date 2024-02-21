import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function GuardRoleRoute({ children, role }) {
  let roleStorage = JSON.parse(localStorage.getItem("role"));
  if (roleStorage !== role) return <Navigate to="/forbidden" replace={true} />;
  return children || <Outlet />;
}
