import React, { useState } from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FormCorreo from '../organisms/FormCorreo';
import Resultados from '../organisms/Resultados';
import InstructionsList from '../molecules/InstructionsList';

const instruccionesCorreo = [
  'Carga el archivo XLSX de reservas descargado de tu sistema de gestión',
  'El sistema filtrará automáticamente los huéspedes con llegada a partir de las 20:00h',
  'Se generará un texto personalizado con la información de cada huésped y apartamento',
  'Copia el texto generado y pégalo directamente en tu correo electrónico',
  'Usa el botón "Borrar todo" si necesitas limpiar y procesar un nuevo archivo'
];

const CorreoPage = () => {
  const [textoCorreo, setTextoCorreo] = useState('');
  const [total, setTotal] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleResultado = (texto, totalEntradas) => {
    console.log('handleResultado called with texto:', texto, 'total:', totalEntradas);
    setTextoCorreo(texto);
    setTotal(totalEntradas);
    setShowResults(true);
  };

  console.log('CorreoPage render - showResults:', showResults, 'textoCorreo:', textoCorreo, 'total:', total);

  return (
    <MainLayout>
      <HerramientaTemplate
        titulo="Generador de Texto para Correos de Llegadas Tardías"
        descripcion="Genera automáticamente textos personalizados para notificar a huéspedes con llegadas a partir de las 20:00h."
      >
        <InstructionsList steps={instruccionesCorreo} type="primary" />
        <FormCorreo onResultado={handleResultado} />
        {showResults && <Resultados output={textoCorreo} total={total} />}
      </HerramientaTemplate>
    </MainLayout>
  );
};

export default CorreoPage;