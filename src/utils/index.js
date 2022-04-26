import React, { useEffect, useState } from "react";

// const token_key = localStorage.getItem("TOKEN");

// export const login = () => {
//   localStorage.setItem(TOKEN_KEY, "TestLogin");
// };

// export const logout = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };

// export const isLogin = () => {
//   if (localStorage.getItem(token_key)) {
//     return true;
//   }

//   return false;
// };

export const isLogin = () => !!localStorage.getItem("TOKEN");
//  default isLogin;
