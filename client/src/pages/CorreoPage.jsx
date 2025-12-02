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
    setTextoCorreo(texto);
    setTotal(totalEntradas);
    setShowResults(true);
  };

  const sidebarContent = (
    <>
      <InstructionsList steps={instruccionesCorreo} type="primary" />
      <FormCorreo onResultado={handleResultado} />
    </>
  );

  return (
    <MainLayout>
      <HerramientaTemplate
        titulo="Generador de Texto para Correos de Llegadas Tardías"
        descripcion="Genera automáticamente textos personalizados para notificar a huéspedes con llegadas a partir de las 20:00h."
        sidebar={sidebarContent}
      >
        {showResults ? (
          <Resultados output={textoCorreo} total={total} />
        ) : (
          <div className="herramienta__placeholder">
            <svg className="herramienta__placeholder-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
            </svg>
            <p>Sube un archivo y genera el texto para visualizar los resultados aquí</p>
          </div>
        )}
      </HerramientaTemplate>
    </MainLayout>
  );
};

export default CorreoPage;