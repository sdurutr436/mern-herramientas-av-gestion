import React from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FormContactos from '../organisms/FormContactos';

const instruccionContactos = `
1. Carga el archivo XLSX de reservas (descargado del sistema o channel).
2. Haz clic en "Exportar CSV" para generar el fichero profesional para Google Contacts.
3. El navegador descargará el .csv listo para importar todos los teléfonos y nombres.
4. Importa el archivo en Google Contacts, categoría "myContacts".
`;

const ContactosPage = () => (
  <MainLayout>
    <HerramientaTemplate
      titulo="Generar Contactos Google desde el XLSX de reservas"
      descripcion={instruccionContactos}
    >
      <FormContactos />
    </HerramientaTemplate>
  </MainLayout>
);

export default ContactosPage;
