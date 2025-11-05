import React, { useState } from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FileUpload from '../molecules/FileUpload';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';
import Alert from '../molecules/Alert';
import Card from '../molecules/Card';
import InstructionsList from '../molecules/InstructionsList';
import API_URL from '../config';

const instruccionesAptos = [
  'Prepara el archivo XLSX con la información completa de tus apartamentos',
  'Carga el archivo usando el selector de archivos',
  'Haz clic en el botón "Importar" para iniciar el proceso de almacenamiento',
  'El sistema procesará los datos y te mostrará cuántos apartamentos se han importado',
  'Los apartamentos quedarán almacenados permanentemente en la base de datos MongoDB'
];

const ApartamentosPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) {
      setAlerta({ message: 'Debes subir el archivo de apartamentos.', type: 'error' });
      return;
    }
    setAlerta(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/api/apartamentos/import`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setAlerta({ message: `${data.nuevos} nuevos, ${data.repetidos} repetidos.`, type: 'success' });
      } else {
        setAlerta({ message: data.message || 'Error desconocido', type: 'error' });
      }
    } catch {
      setAlerta({ message: 'No se pudo conectar al servidor', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <MainLayout>
      <HerramientaTemplate
        titulo="Importador de Apartamentos a Base de Datos"
        descripcion="Importa y almacena permanentemente la información de tus apartamentos en MongoDB para uso en otras herramientas."
      >
        <InstructionsList steps={instruccionesAptos} type="primary" />
        <Card>
          <form onSubmit={handleSubmit}>
            <FileUpload
              label="Apartamentos (.xlsx)"
              accept=".xlsx"
              onFileChange={e => setFile(e.target.files[0])}
              file={file}
              onRemove={() => setFile(null)}
            />
            {alerta && <Alert message={alerta.message} type={alerta.type} onClose={() => setAlerta(null)}/>}
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Loader size={18}/> : 'Importar'}
            </Button>
          </form>
        </Card>
      </HerramientaTemplate>
    </MainLayout>
  );
};

export default ApartamentosPage;
