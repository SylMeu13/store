import { Navigate, Outlet } from "react-router";

export default function AdminRoute() {
  return sessionStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/admin" />
  );
}
