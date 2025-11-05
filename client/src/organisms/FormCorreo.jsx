import React, { useState } from 'react';
import FileUpload from '../molecules/FileUpload';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';
import Alert from '../molecules/Alert';
import Card from '../molecules/Card';
import API_URL from '../config';

const FormCorreo = ({ onResultado }) => {
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
      const res = await fetch(`${API_URL}/api/correo/generar`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('Response from API:', data);
      
      if (res.ok) {
        console.log('Calling onResultado with correo:', data.correo, 'total:', data.total);
        // Call the parent callback with the result
        if (onResultado) {
          onResultado(data.correo || '', data.total || 0);
        }
        setAlerta({ message: 'Texto generado correctamente', type: 'success' });
      } else {
        setAlerta({ message: data.message || 'Error desconocido', type: 'error' });
        if (onResultado) {
          onResultado('', 0);
        }
      }
    } catch (error) {
      console.error('Error fetching:', error);
      setAlerta({ message: 'No se pudo conectar al servidor', type: 'error' });
      if (onResultado) {
        onResultado('', 0);
      }
    }
    setLoading(false);
  };

  return (
    <Card title="Generar cuerpo de correo para llegadas tarde">
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
          {loading ? <Loader size={18}/> : 'Generar texto para correo'}
        </Button>
      </form>
    </Card>
  );
};

export default FormCorreo;