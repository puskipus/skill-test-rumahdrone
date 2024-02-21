import { Route, Routes } from "react-router-dom";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import Login from "../pages/Login";
import Forbidden from "../pages/Forbidden";
import GuardRoute from "../components/GuardRoute";
import Dashboard from "../pages/Dashboard";
import Inventaris from "../pages/Inventaris/Inventaris";
import InventarisAdd from "../pages/Inventaris/InventarisAdd";
import InventarisUpdate from "../pages/Inventaris/InventarisUpdate";
import ManajemenStok from "../pages/ManajemenStok/ManajemenStok";
import GuardRoleRoute from "../components/GuardRoleRoute";
import ManajemenStokAdd from "../pages/ManajemenStok/ManajemenStokAdd";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <GuardRoute>
            <Dashboard />
          </GuardRoute>
        }
      />

      <Route
        path="/inventaris"
        element={
          <GuardRoute>
            <Inventaris />
          </GuardRoute>
        }
      />

      <Route
        path="/inventaris/add"
        element={
          <GuardRoute>
            <GuardRoleRoute role={"admin"}>
              <InventarisAdd />
            </GuardRoleRoute>
          </GuardRoute>
        }
      />

      <Route
        path="/inventaris/edit/:id"
        element={
          <GuardRoute>
            <GuardRoleRoute role={"admin"}>
              <InventarisUpdate />
            </GuardRoleRoute>
          </GuardRoute>
        }
      />

      <Route
        path="/stok"
        element={
          <GuardRoute>
            <ManajemenStok />
          </GuardRoute>
        }
      />

      <Route
        path="/stok/add"
        element={
          <GuardRoute>
            <GuardRoleRoute role={"staff"}>
              <ManajemenStokAdd />
            </GuardRoleRoute>
          </GuardRoute>
        }
      />

      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}
