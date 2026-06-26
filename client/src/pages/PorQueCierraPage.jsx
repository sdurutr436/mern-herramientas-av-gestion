import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import Card from '../molecules/Card';
import Button from '../atoms/Button';

const motivos = [
  {
    titulo: 'Incumplimiento de normativa RGPD',
    detalle: 'El tratamiento de datos personales de huéspedes no cumple con las garantías exigidas por el Reglamento General de Protección de Datos.'
  },
  {
    titulo: 'Datos hardcodeados',
    detalle: 'Configuración, credenciales y lógica de negocio están escritas directamente en el código, lo que impide un mantenimiento y despliegue seguros.'
  },
  {
    titulo: 'Falta de seguridad en formularios y subida de archivos',
    detalle: 'Los formularios y la carga de ficheros no aplican validación ni saneamiento suficientes, exponiendo la aplicación a entradas maliciosas.'
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
