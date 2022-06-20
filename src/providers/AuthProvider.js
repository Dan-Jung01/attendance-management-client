import { useEffect, useState, createContext, useContext } from "react";
import jwtDecode from "jwt-decode";
import api from "api/api";
import { StorageUtils } from "utils/StorageUtils";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(StorageUtils.getAuthorization());
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return setUser(null);
    console.log("DECODED_TOKEN: ", jwtDecode(token));
    // setTimeout(() => {
    setUser(jwtDecode(token));
    // }, 2000);
  }, [token]);

  const login = async (user_id, user_pwd, callback) => {
    const res = await api.post("/user/login", {
      user_id,
      user_pwd,
    });

    if (!res.ok) return console.error(res.originalError);

    const { token, token_type } = res.data;
    setToken(token);
    api.setHeader("Authorization", `${token_type} ${token}`);
    StorageUtils.setAuthorization(token, true);
    callback();
  };

  const logout = (callback) => {
    setToken(null);
    StorageUtils.setAuthorization("", true);
    api.deleteHeader("Authorization");
    callback();
  };

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
