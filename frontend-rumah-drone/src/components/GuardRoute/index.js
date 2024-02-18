import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function GuardRoute({ children }) {
  let authenticated = localStorage.getItem("token");
  if (authenticated === null) return <Navigate to="/" replace={true} />;

  return children || <Outlet />;
}
