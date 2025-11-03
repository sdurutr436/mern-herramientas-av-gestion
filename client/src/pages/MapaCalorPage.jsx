import React, { useState } from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FormMapaCalor from '../organisms/FormMapaCalor';
import Resultados from '../organisms/Resultados';

const instruccionMapa = `
1. Carga los archivos XLSX de reservas y de apartamentos.
2. Selecciona una fecha de consulta.
3. Haz clic en "Ver datos para mapa".
4. Se mostrará la ocupación y detalle para cada apartamento (puede usarse para pintar un mapa de calor en el frontend).
`;

const MapaCalorPage = () => {
  const [datosMapa, setDatosMapa] = useState(null);

  return (
    <MainLayout>
      <HerramientaTemplate
        titulo="Generar datos mapa de calor desde reservas y apartamentos"
        descripcion={instruccionMapa}
      >
        <FormMapaCalor onResultado={setDatosMapa} />
        {datosMapa && (
          <Resultados texto={JSON.stringify(datosMapa, null, 2)} />
        )}
      </HerramientaTemplate>
    </MainLayout>
  );
};

export default MapaCalorPage;
