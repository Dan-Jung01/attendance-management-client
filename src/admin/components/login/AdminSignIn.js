import React, { useState } from "react";
import "../../css/signIn.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AdminMain from "../../pages/AdminMain";

const AdminSignIn = () => {
  const API_URL = "http://localhost:3003";
  const [idValue, setIDValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  async function loginUser() {
    const url = `${API_URL}/user/admin-login`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: idValue,
        user_pwd: pwdValue,
      }),
    });
    const res_1 = await res.json();
    // if its an error
    if (res_1.error) {
      setError(res_1.message);
    } else {
      setError(null);
      history.push("/admin");
    }
    console.log(res_1);
    if (res_1.token !== undefined) {
      localStorage.setItem("TOKEN_KEY", res_1.token);
      // window.location.reload();
    }
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-wrapper">
        <header className="header">관리자 로그인</header>
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
        <button className="btn-login" onClick={loginUser}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default AdminSignIn;
