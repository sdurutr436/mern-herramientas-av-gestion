import React from 'react';
import '../css/Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled }) => (
  <button
    className={`btn btn-${variant}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
