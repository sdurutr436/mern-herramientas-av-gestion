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

const ContactosPage = () => (
  <MainLayout>
    <HerramientaTemplate
      titulo="Exportador de Contactos para Google Contacts"
      descripcion="Convierte tus reservas XLSX en un archivo CSV profesional listo para importar en Google Contacts."
    >
      <InstructionsList steps={instruccionesContactos} type="success" />
      <FormContactos />
    </HerramientaTemplate>
  </MainLayout>
);

export default ContactosPage;
