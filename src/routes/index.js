import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import SignIn from "../components/login/SignIn";
import RecordPage from "../pages/RecordPage";
import AdminSignIn from "../admin/components/login/AdminSignIn";
import AdminMain from "../admin/pages/AdminMain";
import Register from "../admin/components/register/Register";
import AdminUsers from "../admin/pages/AdminUsers";
import AdminWork from "../admin/pages/AdminWork";
import AdminLeave from "../admin/pages/AdminLeave";

import MyPage from "../pages/MyPage";
import { AuthContextProvider, useAuthContext } from "providers/AuthProvider";
import { isAuthorized } from "../utils/JwtUtils";

const Router = () => {
  // console.log("Router");
  // console.log("user", user);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/admin-login" element={<AdminSignIn />} />

          <Route
            path=""
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          >
            {/* <Route path="/admin" element={<AdminMain />}> */}
            {/* <Route index element={<AdminMain />} /> */}
            <Route path="admin" element={<AdminMain />} />
            <Route path="work" element={<AdminWork />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="leave" element={<AdminLeave />} />
            <Route path="register" element={<Register />} />
            {/* </Route> */}

            <Route
              path=""
              element={
                <RequireAdmin>
                  <Main />
                </RequireAdmin>
              }
            >
              <Route index element={<MyPage />} />
              <Route path="record" element={<RecordPage />} />
            </Route>
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
  if (!isAuthorized(token)) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }
  return children;
}

function RequireAdmin({ children }) {
  let { user } = useAuthContext();
  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);
  if (user.type === "ADMIN") {
    return <Navigate replace to="admin" state={{ from: location }} />;
  }
  return children;
}

const Main = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Router;
