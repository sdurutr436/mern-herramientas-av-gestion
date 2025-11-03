import React, { useState } from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FileUpload from '../molecules/FileUpload';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';
import Alert from '../molecules/Alert';
import Card from '../molecules/Card';

const instruccionAptos = `
1. Carga el archivo CSV de apartamentos.
2. Haz clic en "Importar" para almacenar los datos en la base de datos.
3. El sistema te indicará la cantidad de apartamentos nuevos.
`;

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
      const res = await fetch('/api/apartamentos/import', {
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
        titulo="Importar Apartamentos CSV"
        descripcion={instruccionAptos}
      >
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
