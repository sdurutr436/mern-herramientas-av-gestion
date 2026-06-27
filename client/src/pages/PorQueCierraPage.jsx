import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import Card from '../molecules/Card';
import Button from '../atoms/Button';
import '../css/HomePage.css';

const motivos = [
  {
    titulo: 'Incumplimiento de normativa RGPD',
    detalle: 'La aplicación procesa datos personales de huéspedes (nombres, teléfonos y fechas de estancia) sin base legal, consentimiento ni política de retención documentados, como exige el Reglamento General de Protección de Datos.'
  },
  {
    titulo: 'Datos hardcodeados',
    detalle: 'Hay valores de infraestructura embebidos como fallback en el código —cadena de conexión a MongoDB y orígenes CORS apuntando a localhost— en lugar de depender solo de variables de entorno, lo que dificulta un despliegue seguro y reproducible.'
  },
  {
    titulo: 'Falta de seguridad en formularios y subida de archivos',
    detalle: 'El procesado de ficheros depende de xlsx@0.18.5, con vulnerabilidades de alta severidad sin parche (Prototype Pollution y ReDoS); la migración pendiente a ExcelJS nunca se completó.'
  },
  {
    titulo: 'Subida de costes en el mantenimiento',
    detalle: 'El coste de mantener y operar la aplicación ha crecido por encima de lo sostenible para el proyecto.'
  }
];

const PorQueCierraPage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="home-page">
        <h1 className="home-titulo">¿Por qué cierra el proyecto?</h1>
        <p className="home-subtitulo">
          El 1 de agosto este proyecto se cerrará. Estos son los motivos:
        </p>
        <div className="home-grid">
          {motivos.map(m => (
            <Card key={m.titulo} title={m.titulo}>
              <p>{m.detalle}</p>
            </Card>
          ))}
        </div>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          ← Volver atrás
        </Button>
      </div>
    </MainLayout>
  );
};

export default PorQueCierraPage;
