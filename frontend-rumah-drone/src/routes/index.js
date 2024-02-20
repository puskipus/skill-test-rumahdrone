import { Route, Routes } from "react-router-dom";
import GuestOnlyRoute from "../components/GuestOnlyRoute";
import Login from "../pages/Login";
import Forbidden from "../pages/Forbidden";
import GuardRoute from "../components/GuardRoute";
import Dashboard from "../pages/Dashboard";
import Inventaris from "../pages/Inventaris/Inventaris";
import InventarisAdd from "../pages/Inventaris/InventarisAdd";
import InventarisUpdate from "../pages/Inventaris/InventarisUpdate";

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
            <InventarisAdd />
          </GuardRoute>
        }
      />

      <Route
        path="/inventaris/edit/:id"
        element={
          <GuardRoute>
            <InventarisUpdate />
          </GuardRoute>
        }
      />

      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}
