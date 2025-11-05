import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/MainLayout.css';
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
      <header className="main-header">
        <Link to="/" className="main-logo">
          <h1 className="main-logo-text">Herramientas AV Gestión</h1>
        </Link>
        <nav className="main-nav">
          {navItems.map(item => (
            <Button
              key={item.path}
              variant="secondary"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
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
