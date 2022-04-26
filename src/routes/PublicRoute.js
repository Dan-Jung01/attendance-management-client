import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ comp: Component, restricted, ...rest }) => {
  const isAuthenticated = () => {
    return localStorage.getItem("TOKEN");
  };
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) => (isAuthenticated() && restricted ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export default PublicRoute;
