import React, { useState } from "react";
import "../../css/register.css";
import AdminContainer from "../AdminContainer";
import axios from "axios";

const Register = () => {
  const [idValue, setIDValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_URL = "http://localhost:3003";

  const registerUser = async () => {
    const url = `${API_URL}/user/register`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: idValue,
        user_pwd: pwdValue,
        user_name: nameValue,
        start_date: startDateValue,
        phone: phoneValue,
      }),
    });

    const res_1 = await res.json();
    // if its an error
    if (res_1.error) {
      setError(res_1.message);
      setSuccess(null);
    } else {
      axios
        .post(`${API_URL}/status-init`, {
          user_id: idValue,
          // state_late: 0,
          // state_absence: 0,
          // state_miss_check: 0,
          // state_early_check: 0,
        })
        .then(alert("생성이 완료되었습니다"));

      // setSuccess("User successfully registered");
      // setError(null);
    }
    console.log(res_1);
  };

  return (
    <AdminContainer>
      <div className="sign-up-container">
        <div className="sign-up-wrapper">
          <header className="header">사용자 추가</header>
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

          <section className="section">
            <h4 className="title">이름</h4>
            <input
              className="input"
              type="text"
              placeholder="이름"
              value={nameValue}
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
            />
          </section>

          <section className="section">
            <h4 className="title">전화번호</h4>
            <input
              className="input"
              type="tel"
              placeholder="전화번호"
              value={phoneValue}
              onChange={(e) => {
                setPhoneValue(e.target.value);
              }}
            />
          </section>

          <section className="section">
            <h4 className="title">시작일</h4>
            <input
              className="input"
              type="date"
              placeholder="시작일"
              value={startDateValue}
              onChange={(e) => {
                setStartDateValue(e.target.value);
              }}
            />
          </section>

          <button className="btn-regi" onClick={registerUser}>
            추가
          </button>
        </div>
      </div>
    </AdminContainer>
  );
};

export default Register;
