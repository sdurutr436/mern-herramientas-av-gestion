import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
    >
      {isDark ? (
        // Icono de Sol Neobrutalista (Modo Claro)
        <svg 
          className="theme-icon sun-icon" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        >
          <rect x="9" y="9" width="6" height="6" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
          <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
          <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
        </svg>
      ) : (
        // Icono de Luna Neobrutalista (Modo Oscuro)
        <svg 
          className="theme-icon moon-icon" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        >
          <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
