import React from "react";

const RegisterInput = ({ title, type, placeholder, value, onChange }) => {
  return (
    <section className="section">
      <h4 className="title">{title}</h4>
      <input className="input" type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </section>
  );
};

export default RegisterInput;
