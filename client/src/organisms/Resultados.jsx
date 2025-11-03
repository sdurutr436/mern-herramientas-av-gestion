import React, { useState } from 'react';
import Card from '../molecules/Card';
import Button from '../atoms/Button';
import Alert from '../molecules/Alert';

const Resultados = ({ output, total, children }) => {
  const [alerta, setAlerta] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setAlerta({ message: 'Texto copiado al portapapeles', type: 'success' });
  };

  return (
    <Card title="Resultado">
      {output && (
        <>
          <div style={{ marginBottom: '10px' }}>Total de entradas: {total}</div>
          <textarea
            readOnly
            value={output}
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '10px',
              fontFamily: 'monospace',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '10px',
              resize: 'vertical'
            }}
          />
          {alerta && <Alert message={alerta.message} type={alerta.type} onClose={() => setAlerta(null)} />}
          <Button variant="secondary" onClick={handleCopy}>
            Copiar al portapapeles
          </Button>
        </>
      )}
      {children}
    </Card>
  );
};

export default Resultados;
