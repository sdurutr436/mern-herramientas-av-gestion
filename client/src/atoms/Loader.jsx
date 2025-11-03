import React from 'react';
import '../css/Loader.css';

const Loader = ({ size = 24 }) => (
  <div
    className="loader"
    style={{
      width: size,
      height: size,
      borderWidth: size / 8
    }}
    aria-label="Cargando..."
  />
);

export default Loader;
