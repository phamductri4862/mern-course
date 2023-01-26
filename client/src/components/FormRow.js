import React from "react";

function FormRow({ type, name, value, onChange, labelText }) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className="form-input"
      />
    </div>
  );
}

export default FormRow;
