import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ShutdownBanner.css';

// ponytail: banner permanente, no se cierra (sin estado ni cookies)
const ShutdownBanner = () => (
  <div className="shutdown-banner" role="region" aria-label="Aviso de cierre">
    <span>
      ⚠️ El próximo <strong>1 de agosto</strong> este proyecto se cerrará. Únete a{' '}
      <a href="https://Stay-Sidekick.com" target="_blank" rel="noopener noreferrer">
        Stay-Sidekick.com
      </a>{' '}
      para continuar.{' '}
      <Link to="/por-que-cierra">¿Por qué cierra?</Link>
    </span>
  </div>
);

export default ShutdownBanner;
