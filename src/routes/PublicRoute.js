import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ comp: Component, restricted, ...rest }) => {
  const isAuthenticated = () => {
    return localStorage.getItem("TOKEN");
  };
};

export default PublicRoute;
