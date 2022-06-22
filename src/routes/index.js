import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import SignIn from "../components/login/SignIn";
import RecordPage from "../pages/RecordPage";
import AdminSignIn from "../admin/components/login/AdminSignIn";
import AdminMain from "../admin/pages/AdminMain";
import Register from "../admin/components/register/Register";
import AdminUsers from "../admin/pages/AdminUsers";
import AdminWork from "../admin/pages/AdminWork";
import AdminLeave from "../admin/pages/AdminLeave";

import MyPage from "../pages/MyPage";
import PrivateRoute from "./PrivateRoute";

import axios from "axios";
import { AuthContextProvider } from "providers/AuthProvider";

import { useAuthContext } from "providers/AuthProvider";
import { isAuthorized } from "../utils/JwtUtils";

const Router = () => {
  // const [userName, setUserName] = useState("");
  // const [userId, setUserId] = useState("");
  // const token = localStorage.getItem("TOKEN");
  // const API_URL = "http://localhost:3003";

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       if (token) {
  //         const response = await axios.get(`${API_URL}/user/login`, {
  //           params: {
  //             token: token,
  //           },
  //         });
  //         // setTimeout(() => {
  //         //   setUserName(response.data.user_name);
  //         //   setUserId(response.data.user_id);
  //         // }, 1000);
  //         setUserName(response.data.user_name);
  //         setUserId(response.data.user_id);
  //         // console.log(userId);
  //         // console.log(userName);
  //       } else {
  //         return;
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // }, [token, userId, userName]);

  const { user } = useAuthContext();

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Login routes */}
          <Route path="/login" element={<SignIn />} />

          {user ? (
            <Route
              path=""
              element={
                <RequireAuth>
                  {/* Client routes */}
                  {/* <MyPage /> */}
                  <Main />
                </RequireAuth>
              }
            >
              <Route path="/" element={<MyPage />} />
              <Route path="/record" element={<RecordPage />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminMain />} />
              <Route path="/admin-work" element={<AdminWork />} />
              <Route path="/admin-users" element={<AdminUsers />} />
              <Route path="/admin-leave" element={<AdminLeave />} />
              <Route path="/admin-register" element={<Register />} />
            </Route>
          ) : (
            <Route path="" element={<h1>Loading</h1>} />
          )}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    // <BrowserRouter>
    //   <Switch>
    //     <PrivateRoute path="/admin-login" exact>
    //       <AdminSignIn />
    //     </PrivateRoute>
    //     <PrivateRoute path="/admin-register" exact>
    //       <Register />
    //     </PrivateRoute>

    //     <PrivateRoute path="/admin" exact>
    //       <AdminMain />
    //     </PrivateRoute>

    //     <PrivateRoute path="/admin-work" exact>
    //       <AdminWork />
    //     </PrivateRoute>

    //     <PrivateRoute path="/admin-users" exact>
    //       <AdminUsers />
    //     </PrivateRoute>

    //     <PrivateRoute path="/admin-leave" exact>
    //       <AdminLeave />
    //     </PrivateRoute>

    //     {/* <PublicRoute restricted={true} component={SignIn} path="/login" exact /> */}
    //     <PublicRoute restricted={true} path="/login" exact>
    //       <SignIn />
    //     </PublicRoute>

    //     <PrivateRoute title="MyPage" path="/" exact>
    //       <MyPage userName={userName} userId={userId} />
    //     </PrivateRoute>

    //     <PrivateRoute title="Record" path="/record" exact>
    //       <RecordPage userName={userName} userId={userId} />
    //     </PrivateRoute>

    //     {/* <Route title="Record" path="/record" exact component={RecordPage} /> */}
    //   </Switch>
    // </BrowserRouter>
  );
};

function RequireAuth({ children }) {
  let { token } = useAuthContext();
  let location = useLocation();
  console.log("TOKEN: ", token);
  console.log("isAuthorized", isAuthorized(token));
  if (!isAuthorized(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
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
