import React, { useState } from 'react';
import '../css/ShutdownBanner.css';

const COOKIE = 'av_shutdown_dismissed';

// ponytail: cookie de sesión = sin Max-Age/Expires, se borra al cerrar el navegador
const isDismissed = () => document.cookie.split('; ').includes(`${COOKIE}=1`);

const ShutdownBanner = () => {
  const [visible, setVisible] = useState(() => !isDismissed());

  if (!visible) return null;

  const dismiss = () => {
    document.cookie = `${COOKIE}=1; path=/`;
    setVisible(false);
  };

  return (
    <div className="shutdown-banner" role="alert">
      <span>
        ⚠️ El próximo <strong>1 de agosto</strong> este proyecto se cerrará. Únete a{' '}
        <a href="https://Stay-Sidekick.com" target="_blank" rel="noopener noreferrer">
          Stay-Sidekick.com
        </a>{' '}
        para continuar.
      </span>
      <button className="shutdown-banner-close" onClick={dismiss} aria-label="Cerrar">
        &times;
      </button>
    </div>
  );
};

export default ShutdownBanner;
