import React, { useState } from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FormCorreo from '../organisms/FormCorreo';
import Resultados from '../organisms/Resultados';

const instruccionCorreo = `
1. Carga los archivos XLSX de reservas y de apartamentos.
2. El sistema filtrará los huéspedes con llegada a partir de las 20:00.
3. Se generará un texto personalizado para enviar por correo.
4. Copia el texto generado para pegarlo en tu correo.
5. Usa el botón "Borrar todo" para limpiar y cargar nuevos archivos.
`;

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
        titulo="Generador de texto para correo - CSV a Texto"
        descripcion={instruccionCorreo}
      >
        <FormCorreo onResultado={handleResultado} />
        {showResults && <Resultados output={textoCorreo} total={total} />}
      </HerramientaTemplate>
    </MainLayout>
  );
};

export default CorreoPage;