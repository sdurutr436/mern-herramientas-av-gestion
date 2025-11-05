import React, { useState } from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FormMapaCalor from '../organisms/FormMapaCalor';
import Resultados from '../organisms/Resultados';
import InstructionsList from '../molecules/InstructionsList';

const instruccionesMapa = [
  'Carga el archivo XLSX de reservas de tu sistema de gestión',
  'Carga el archivo XLSX de apartamentos con la información de tus propiedades',
  'Selecciona una fecha específica para consultar la ocupación',
  'Haz clic en "Ver datos para mapa" para generar el análisis',
  'Se mostrará un JSON con la ocupación y detalles de cada apartamento para visualización'
];

const MapaCalorPage = () => {
  const [datosMapa, setDatosMapa] = useState(null);

  return (
    <MainLayout>
      <HerramientaTemplate
        titulo="Generador de Datos de Mapa de Calor"
        descripcion="Visualiza la ocupación de apartamentos por fecha con datos estructurados para crear mapas de calor interactivos."
      >
        <InstructionsList steps={instruccionesMapa} type="info" />
        <FormMapaCalor onResultado={setDatosMapa} />
        {datosMapa && (
          <Resultados texto={JSON.stringify(datosMapa, null, 2)} />
        )}
      </HerramientaTemplate>
    </MainLayout>
  );
};

export default MapaCalorPage;
