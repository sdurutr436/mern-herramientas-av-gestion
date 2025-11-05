import React from 'react';
import '../css/HerramientasTemplate.css';

const HerramientaTemplate = ({ titulo, descripcion, children }) => (
  <div className="herramienta-page">
    <h1 className="herramienta-titulo">{titulo}</h1>
    <p className="herramienta-descripcion">{descripcion}</p>
    <div className="herramienta-contenido">
      {children}
    </div>
  </div>
);

export default HerramientaTemplate;
