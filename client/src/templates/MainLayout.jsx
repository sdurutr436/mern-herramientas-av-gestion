import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import ThemeToggle from '../atoms/ThemeToggle';

const navItems = [
  { label: 'Correo', path: '/correo' },
  { label: 'Contactos', path: '/contactos' },
  { label: 'Mapa de Calor', path: '/mapa' },
  { label: 'Apartamentos', path: '/apartamentos' }
];

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="main-layout">
      {/* Header con título centrado */}
      <header className="main-header">
        <div className="header-top">
          <Link to="/" className="main-logo">
            <h1 className="main-logo-text">Herramientas AV Gestión</h1>
          </Link>
        </div>
        
        {/* Barra de navegación debajo */}
        <nav className="header-nav">
          <div className="nav-links">
            {navItems.map(item => (
              <Button
                key={item.path}
                variant="nav"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <ThemeToggle />
        </nav>
      </header>
      
      <main className="main-body">
        {children}
      </main>
      
      <footer className="main-footer">
        <span>© {new Date().getFullYear()} Herramientas AV - Gestión</span>
      </footer>
    </div>
  );
};

export default MainLayout;
