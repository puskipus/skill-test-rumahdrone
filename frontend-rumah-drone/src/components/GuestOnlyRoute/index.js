import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestOnlyRoute({ children }) {
  let token = localStorage.getItem("token");
  if (token) return <Navigate to="/dashboard" replace={true} />;
  return children || <Outlet />;
}
