import React from "react";
import Header from "./header/Header";
import Navigation from "./navi/Nav";

const Container = ({ children }) => {
  return (
    <div>
      <Header />
      <Navigation />
      {children}
    </div>
  );
};

export default Container;
