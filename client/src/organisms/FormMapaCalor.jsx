import React, { useState } from 'react';
import FileUpload from '../molecules/FileUpload';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';
import Alert from '../molecules/Alert';
import Card from '../molecules/Card';
import Input from '../atoms/Input';
import API_URL from '../config';

const FormMapaCalor = ({ onResultado }) => {
  const [reservas, setReservas] = useState(null);
  const [apartamentos, setApartamentos] = useState(null);
  const [fecha, setFecha] = useState('');
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!reservas || !apartamentos || !fecha) {
      setAlerta({ message: 'Debes subir ambos archivos y elegir fecha.', type: 'error' });
      return;
    }
    setAlerta(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('reservas', reservas);
    formData.append('apartamentos', apartamentos);
    formData.append('fecha', fecha);

    try {
      const res = await fetch(`${API_URL}/api/mapa/obtener`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.mapa) {
        onResultado(data.mapa);
      } else {
        setAlerta({ message: data.message || 'Error desconocido', type: 'error' });
      }
    } catch {
      setAlerta({ message: 'No se pudo conectar al servidor', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <Card title="Generar datos para mapa de calor">
      <form onSubmit={handleSubmit}>
        <FileUpload
          label="Reservas (.xlsx)"
          accept=".xlsx"
          onFileChange={e => setReservas(e.target.files[0])}
          file={reservas}
          onRemove={() => setReservas(null)}
        />
        <FileUpload
          label="Apartamentos (.xlsx)"
          accept=".xlsx"
          onFileChange={e => setApartamentos(e.target.files[0])}
          file={apartamentos}
          onRemove={() => setApartamentos(null)}
        />
        <Input
          label="Fecha"
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
        />
        {alerta && <Alert message={alerta.message} type={alerta.type} onClose={() => setAlerta(null)}/>}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Loader size={18}/> : 'Ver datos para mapa'}
        </Button>
      </form>
    </Card>
  );
};

export default FormMapaCalor;
