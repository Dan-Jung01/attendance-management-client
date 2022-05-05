import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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

const Router = () => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("TOKEN");
  const API_URL = "http://localhost:3003";

  useEffect(() => {
    async function fetchData() {
      try {
        if (token) {
          const response = await axios.get(`${API_URL}/user/login`, {
            params: {
              token: token,
            },
          });
          // setTimeout(() => {
          //   setUserName(response.data.user_name);
          //   setUserId(response.data.user_id);
          // }, 1000);
          setUserName(response.data.user_name);
          setUserId(response.data.user_id);
          // console.log(userId);
          // console.log(userName);
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [token, userId, userName]);

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/admin-login" exact>
          <AdminSignIn />
        </PrivateRoute>
        <PrivateRoute path="/admin-register" exact>
          <Register />
        </PrivateRoute>

        <PrivateRoute path="/admin" exact>
          <AdminMain />
        </PrivateRoute>

        <PrivateRoute path="/admin-work" exact>
          <AdminWork />
        </PrivateRoute>

        <PrivateRoute path="/admin-users" exact>
          <AdminUsers />
        </PrivateRoute>

        <PrivateRoute path="/admin-leave" exact>
          <AdminLeave />
        </PrivateRoute>

        {/* <PublicRoute restricted={true} component={SignIn} path="/login" exact /> */}
        <PublicRoute restricted={true} path="/login" exact>
          <SignIn />
        </PublicRoute>

        <PrivateRoute title="MyPage" path="/" exact>
          <MyPage userName={userName} userId={userId} />
        </PrivateRoute>

        <PrivateRoute title="Record" path="/record" exact>
          <RecordPage userName={userName} userId={userId} />
        </PrivateRoute>

        {/* <Route title="Record" path="/record" exact component={RecordPage} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
