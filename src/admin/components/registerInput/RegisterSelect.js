import React from "react";

const RegisterSelect = ({ title, value, onChange, selectList }) => {
  return (
    <section className="section">
      <h4 className="title">{title}</h4>
      <select className="input" onChange={onChange} value={value}>
        {selectList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </section>
  );
};

export default RegisterSelect;
