import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ comp: Component, ...rest }) => {
  const isAuthenticated = () => {
    return localStorage.getItem("TOKEN");
  };
};

export default PrivateRoute;
