import React from 'react';
import '../css/Card.css';

const Card = ({ children, title, style }) => (
  <div className="card" style={style}>
    {title && <div className="card-title">{title}</div>}
    <div className="card-content">{children}</div>
  </div>
);

export default Card;
