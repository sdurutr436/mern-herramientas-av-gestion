import React from 'react';

const Alert = ({ message, type = 'info', onClose }) => (
  <div className={`alert alert-${type}`}>
    {message}
    {onClose && (
      <button className="alert-close" onClick={onClose} aria-label="Cerrar">&times;</button>
    )}
  </div>
);

export default Alert;
