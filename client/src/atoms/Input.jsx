import React from 'react';

const Input = ({ label, value, onChange, type = 'text', placeholder, ...rest }) => (
  <div className="input-group">
    {label && <label className="input-label">{label}</label>}
    <input 
      type={type}
      className="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  </div>
);

export default Input;
