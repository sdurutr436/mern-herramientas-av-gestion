import React, { useState } from 'react';
import FileUpload from '../molecules/FileUpload';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';
import Alert from '../molecules/Alert';
import Card from '../molecules/Card';
import API_URL from '../config';

const FormContactos = () => {
  const [reservas, setReservas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!reservas) {
      setAlerta({ message: 'Debes subir el archivo de reservas.', type: 'error' });
      return;
    }
    setAlerta(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('reservas', reservas);

    try {
      const res = await fetch(`${API_URL}/api/contactos/google`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contactos_google.csv';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setAlerta({ message: 'CSV generado correctamente', type: 'success' });
      } else {
        const data = await res.json();
        setAlerta({ message: data.message || 'Error desconocido', type: 'error' });
      }
    } catch {
      setAlerta({ message: 'No se pudo conectar al servidor', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <Card title="Generar CSV para Google Contacts">
      <form onSubmit={handleSubmit}>
        <FileUpload
          label="Reservas (.xlsx)"
          accept=".xlsx"
          onFileChange={e => setReservas(e.target.files[0])}
          file={reservas}
          onRemove={() => setReservas(null)}
        />
        {alerta && <Alert message={alerta.message} type={alerta.type} onClose={() => setAlerta(null)}/>}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Loader size={18}/> : 'Exportar CSV'}
        </Button>
      </form>
    </Card>
  );
};

export default FormContactos;
