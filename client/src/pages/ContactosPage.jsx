import React from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FormContactos from '../organisms/FormContactos';
import InstructionsList from '../molecules/InstructionsList';

const instruccionesContactos = [
  'Carga el archivo XLSX de reservas descargado de tu sistema de gestión o channel manager',
  'Haz clic en el botón "Exportar CSV" para generar el archivo optimizado',
  'El navegador descargará automáticamente un archivo .csv con todos los contactos formateados',
  'Importa el archivo en Google Contacts seleccionando la categoría "myContacts"',
  'Los contactos quedarán organizados con nombre, teléfono, fecha y apartamento'
];

const ContactosPage = () => {
  const sidebarContent = (
    <>
      <InstructionsList steps={instruccionesContactos} type="success" />
      <FormContactos />
    </>
  );

  return (
    <MainLayout>
      <HerramientaTemplate
        titulo="Exportador de Contactos para Google Contacts"
        descripcion="Convierte tus reservas XLSX en un archivo CSV profesional listo para importar en Google Contacts."
        sidebar={sidebarContent}
      >
        <div className="herramienta__placeholder">
          <svg className="herramienta__placeholder-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM19 19H5V18.67C5 16.67 9 15.5 12 15.5C15 15.5 19 16.67 19 18.67V19Z" fill="currentColor"/>
          </svg>
          <p>Sube el archivo XLSX y exporta los contactos. El archivo CSV se descargará automáticamente.</p>
        </div>
      </HerramientaTemplate>
    </MainLayout>
  );
};

export default ContactosPage;
