import React from 'react';
import Card from '../molecules/Card';

const HerramientaTemplate = ({ titulo, descripcion, children }) => (
  <div>
    <Card title={titulo}>
      <div className="herramienta-descripcion">{descripcion}</div>
    </Card>
    {children}
  </div>
);

export default HerramientaTemplate;
