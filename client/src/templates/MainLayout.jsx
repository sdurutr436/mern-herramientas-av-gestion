import React from 'react';
import '../css/MainLayout.css';
import Button from '../atoms/Button';

const navItems = [
  { label: 'Correo', path: '/correo' },
  { label: 'Contactos', path: '/contactos' },
  { label: 'Mapa de Calor', path: '/mapa' },
  { label: 'Apartamentos', path: '/apartamentos' }
];

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <header className="main-header">
      <div className="main-logo">Herramientas AV Gestión</div>
      <nav>
        {navItems.map(item => (
          <Button
            key={item.path}
            variant="secondary"
            onClick={() => window.location.pathname = item.path}
          >
            {item.label}
          </Button>
        ))}
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

export default MainLayout;
