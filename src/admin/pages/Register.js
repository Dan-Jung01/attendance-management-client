import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "admin/css/register.css";
import axios from "axios";
import RegisterInput from "admin/components/registerInput/RegisterInput";
import RegisterSelect from "admin/components/registerInput/RegisterSelect";

const Register = () => {
  const [idValue, setIDValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [breakValue, setBreakValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:3003";
  const selectList = ["NORMAL", "ADMIN"];

  const registerUser = async () => {
    const url = `${API_URL}/v1/auth/sign-up`;

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
        phone: phoneValue,
        start_date: startDateValue,
        break_cnt: breakValue,
        type: typeValue,
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
        })
        .then(alert("생성이 완료되었습니다"))
        .then(navigate("/admin/users"));
    }
    console.log(res_1);
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="sign-up-wrapper">
          <header className="header">사용자 추가</header>
          <div className="input-wrapper">
            <div>
              <RegisterInput
                title={"아이디"}
                type={"text"}
                placeholder="아이디"
                value={idValue}
                onChange={(e) => {
                  setIDValue(e.target.value);
                }}
              />
              <RegisterInput
                title={"비밀번호"}
                type={"password"}
                placeholder="비밀번호"
                value={pwdValue}
                onChange={(e) => {
                  setPwdValue(e.target.value);
                }}
              />
              <RegisterInput
                title={"이름"}
                type={"text"}
                placeholder="이름"
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                }}
              />
              <RegisterInput
                title={"전화번호"}
                type={"tel"}
                placeholder="전화번호"
                value={phoneValue}
                onChange={(e) => {
                  setPhoneValue(e.target.value);
                }}
              />
            </div>
            <div>
              <RegisterInput
                title={"입사일"}
                type={"date"}
                placeholder="입사일"
                value={startDateValue}
                onChange={(e) => {
                  setStartDateValue(e.target.value);
                }}
              />

              <RegisterInput
                title={"연차"}
                type={"number"}
                placeholder="연차"
                value={breakValue}
                onChange={(e) => {
                  setBreakValue(e.target.value);
                }}
              />

              <RegisterSelect
                title="권한"
                onChange={(e) => setTypeValue(e.target.value)}
                value={typeValue}
                selectList={selectList}
              />
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="btn-regi" onClick={registerUser}>
              추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
