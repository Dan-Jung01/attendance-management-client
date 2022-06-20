import React, { useState } from "react";
import "../../css/signIn.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const API_URL = "http://localhost:3003";
  const [idValue, setIDValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuthContext();

  // async function loginUser() {
  //   const url = `${API_URL}/user/login`;

  //   try {
  //     const response = await axios.post(url, {
  //       user_id: idValue,
  //       user_pwd: pwdValue,
  //     });

  //     if (response.status === 200 && response.data.token !== undefined) {
  //       setError(null);

  //       history("/");
  //       localStorage.setItem("TOKEN", response.data.token);
  //       window.location.reload();
  //     }
  //   } catch (err) {
  //     console.log("Error >>", err);
  //   }
  // }

  const onLogin = () => {
    if (!idValue) return;
    if (!pwdValue) return;

    login(idValue, pwdValue, () => navigate("/"));
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-wrapper">
        <header className="header">로그인</header>
        <section className="section">
          <h4 className="title">아이디</h4>
          <input
            className="input"
            type="text"
            placeholder="아이디"
            value={idValue}
            onChange={(e) => {
              setIDValue(e.target.value);
            }}
          />
        </section>
        <section className="section">
          <h4 className="title">비밀번호</h4>
          <input
            className="input"
            type="password"
            placeholder="비밀번호"
            value={pwdValue}
            onChange={(e) => {
              setPwdValue(e.target.value);
            }}
          />
        </section>
        <button className="btn-login" onClick={onLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignIn;
