import React from 'react';
import MainLayout from '../templates/MainLayout';
import Card from '../molecules/Card';
import Button from '../atoms/Button';

const herramientas = [
  { label: "Correo CSV", path: "/correo", descripcion: "Genera el texto de correo para huéspedes con llegada tarde." },
  { label: "Contactos Google", path: "/contactos", descripcion: "Exporta CSV de teléfonos para Google Contacts." },
  { label: "Mapa de Calor", path: "/mapa", descripcion: "Visualiza ocupación de apartamentos por fecha." },
  { label: "Importar Apartamentos", path: "/apartamentos", descripcion: "Sube el CSV de apartamentos para almacenamiento permanente." }
];

const HomePage = () => (
  <MainLayout>
    <h1 className="home-titulo">Herramientas de Gestión - Índice</h1>
    <div className="home-grid">
      {herramientas.map(h => (
        <Card key={h.path} title={h.label}>
          <p>{h.descripcion}</p>
          <Button variant="primary" onClick={() => window.location.pathname = h.path}>
            Acceder
          </Button>
        </Card>
      ))}
    </div>
  </MainLayout>
);

export default HomePage;
