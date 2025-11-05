import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import Card from '../molecules/Card';
import Button from '../atoms/Button';
import '../css/HomePage.css';

const herramientas = [
  { 
    label: "Correo CSV", 
    path: "/correo", 
    descripcion: "Genera el texto de correo personalizado para huéspedes con llegada tarde (>= 20:00h)." 
  },
  { 
    label: "Contactos Google", 
    path: "/contactos", 
    descripcion: "Exporta CSV de contactos optimizado para importación directa en Google Contacts." 
  },
  { 
    label: "Mapa de Calor", 
    path: "/mapa", 
    descripcion: "Visualiza la ocupación de apartamentos por fecha con datos estructurados en JSON." 
  },
  { 
    label: "Importar Apartamentos", 
    path: "/apartamentos", 
    descripcion: "Importa masivamente apartamentos desde XLSX para almacenamiento permanente en la base de datos." 
  }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="home-page">
        <h1 className="home-titulo">Herramientas de Gestión</h1>
        <p className="home-subtitulo">
          Sistema integral para la gestión de apartamentos turísticos
        </p>
        <div className="home-grid">
          {herramientas.map(h => (
            <Card key={h.path} title={h.label}>
              <p>{h.descripcion}</p>
              <Button variant="primary" onClick={() => navigate(h.path)}>
                Acceder →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
