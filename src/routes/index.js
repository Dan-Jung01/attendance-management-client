import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import Nav from "components/navi/Nav";
import Header from "components/header/Header";
import SideNav from "admin/components/SideNav";
import SignIn from "../components/login/SignIn";
import MyPage from "../pages/MyPage";
import RecordPage from "../pages/RecordPage";
import AdminSignIn from "../admin/components/login/AdminSignIn";
import AdminMain from "../admin/pages/AdminMain";
import Register from "../admin/pages/Register";
import AdminUsers from "../admin/pages/AdminUsers";
import AdminWork from "../admin/pages/AdminWork";
import AdminLeave from "../admin/pages/AdminLeave";

import { AuthContextProvider, useAuthContext } from "providers/AuthProvider";
import { isAuthorized } from "../utils/JwtUtils";

const Router = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/admin-login" element={<AdminSignIn />} />

          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminRoutes />
              </RequireAuth>
            }
          >
            <Route index element={<AdminMain />} />
            <Route path="work" element={<AdminWork />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="leave" element={<AdminLeave />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route
            path="/"
            element={
              <RequireAdmin>
                <UserRoutes />
              </RequireAdmin>
            }
          >
            <Route index element={<MyPage />} />
            <Route path="record" element={<RecordPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

function RequireAuth({ children }) {
  let { token, user } = useAuthContext();
  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  if (user.type === "NORMAL") {
    return <Navigate replace to="/" state={{ from: location }} />;
  }
  if (!isAuthorized(token)) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }
  return children;
}

function RequireAdmin({ children }) {
  let { user, token } = useAuthContext();
  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  if (user.type === "ADMIN") {
    return <Navigate replace to="admin" state={{ from: location }} />;
  }
  if (!isAuthorized(token)) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }
  return children;
}

const AdminRoutes = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "calc(100% - 250px)" }}>
        <Outlet />
      </div>
    </div>
  );
};

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
    </>
  );
};

export default Router;
