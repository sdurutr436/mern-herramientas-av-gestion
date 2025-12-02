import React, { useState } from 'react';
import MainLayout from '../templates/MainLayout';
import HerramientaTemplate from '../templates/HerramientaTemplate';
import FileUpload from '../molecules/FileUpload';
import Button from '../atoms/Button';
import Loader from '../atoms/Loader';
import Alert from '../molecules/Alert';
import Card from '../molecules/Card';
import InstructionsList from '../molecules/InstructionsList';
import { useToast } from '../context/ToastContext';
import API_URL from '../config';

const instruccionesMapa = [
  'Carga el archivo XLSX de reservas descargado de tu sistema de gestión',
  'El sistema detectará automáticamente el rango de fechas del archivo',
  'Haz clic en "Generar Mapa de Calor" para visualizar la ocupación',
  'Los colores verdes indican entradas (check-ins) y los rojos salidas (check-outs)',
  'Pasa el cursor sobre cada celda para ver el detalle de reservas'
];

const MapaCalorPage = () => {
  const [reservas, setReservas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const [mapaData, setMapaData] = useState(null);
  const toast = useToast();

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
      const res = await fetch(`${API_URL}/api/mapa/obtener`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.mapa) {
        setMapaData(data.mapa);
        toast.success('Mapa de calor generado correctamente');
      } else {
        setAlerta({ message: data.message || 'Error desconocido', type: 'error' });
        toast.error(data.message || 'Error al generar el mapa');
      }
    } catch {
      setAlerta({ message: 'No se pudo conectar al servidor', type: 'error' });
      toast.error('No se pudo conectar al servidor');
    }
    setLoading(false);
  };

  const handleClear = () => {
    setReservas(null);
    setMapaData(null);
    setAlerta(null);
  };

  const sidebarContent = (
    <>
      <InstructionsList steps={instruccionesMapa} type="info" />
      <Card>
        <form onSubmit={handleSubmit}>
          <FileUpload
            label="Reservas (.xlsx)"
            accept=".xlsx"
            onFileChange={e => setReservas(e.target.files[0])}
            file={reservas}
            onRemove={() => setReservas(null)}
          />
          {alerta && <Alert message={alerta.message} type={alerta.type} onClose={() => setAlerta(null)}/>}
          <div className="btn-group">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Loader size={18}/> : 'Generar Mapa de Calor'}
            </Button>
            {mapaData && (
              <Button variant="secondary" type="button" onClick={handleClear}>
                Limpiar
              </Button>
            )}
          </div>
        </form>
      </Card>
      
      {mapaData && (
        <Card title="Estadísticas">
          <div className="heatmap__stats">
            <div className="heatmap__stat">
              <span className="heatmap__stat-label">Total Check-ins</span>
              <span className="heatmap__stat-value heatmap__stat-value--checkin">{mapaData.estadisticas.totalCheckins}</span>
            </div>
            <div className="heatmap__stat">
              <span className="heatmap__stat-label">Total Check-outs</span>
              <span className="heatmap__stat-value heatmap__stat-value--checkout">{mapaData.estadisticas.totalCheckouts}</span>
            </div>
            <div className="heatmap__stat">
              <span className="heatmap__stat-label">Máx. entradas/día</span>
              <span className="heatmap__stat-value">{mapaData.estadisticas.maxCheckinsDay}</span>
            </div>
            <div className="heatmap__stat">
              <span className="heatmap__stat-label">Máx. salidas/día</span>
              <span className="heatmap__stat-value">{mapaData.estadisticas.maxCheckoutsDay}</span>
            </div>
            <div className="heatmap__stat">
              <span className="heatmap__stat-label">Período</span>
              <span className="heatmap__stat-value">{mapaData.estadisticas.fechaInicio} — {mapaData.estadisticas.fechaFin}</span>
            </div>
          </div>
        </Card>
      )}
    </>
  );

  // Agrupar calendario por semanas para la visualización
  const getCalendarWeeks = () => {
    if (!mapaData) return [];
    
    const weeks = [];
    let currentWeek = [];
    
    mapaData.calendario.forEach((dia, index) => {
      // Añadir celdas vacías al inicio de la primera semana
      if (index === 0 && dia.diaSemana !== 1) {
        const emptyDays = dia.diaSemana === 0 ? 6 : dia.diaSemana - 1;
        for (let i = 0; i < emptyDays; i++) {
          currentWeek.push(null);
        }
      }
      
      currentWeek.push(dia);
      
      // Si es domingo (0) o es el último día, cerrar la semana
      if (dia.diaSemana === 0 || index === mapaData.calendario.length - 1) {
        // Rellenar con celdas vacías al final si es necesario
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  return (
    <MainLayout>
      <HerramientaTemplate
        titulo="Mapa de Calor de Ocupación"
        descripcion="Visualiza los check-ins y check-outs de tus apartamentos en un calendario interactivo."
        sidebar={sidebarContent}
      >
        {mapaData ? (
          <div className="heatmap">
            <div className="heatmap__legend">
              <div className="heatmap__legend-group">
                <span className="heatmap__legend-title">Entradas (Check-in)</span>
                <div className="heatmap__legend-scale">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(level => (
                    <div 
                      key={`checkin-${level}`} 
                      className="heatmap__legend-item"
                      data-checkin-level={level}
                      title={level === 1 ? '1-4' : level === 2 ? '5-9' : level === 3 ? '10-14' : level === 4 ? '15-19' : level === 5 ? '20-24' : level === 6 ? '25-29' : level === 7 ? '30-34' : '35+'}
                    />
                  ))}
                </div>
              </div>
              <div className="heatmap__legend-group">
                <span className="heatmap__legend-title">Salidas (Check-out)</span>
                <div className="heatmap__legend-scale">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(level => (
                    <div 
                      key={`checkout-${level}`} 
                      className="heatmap__legend-item"
                      data-checkout-level={level}
                      title={level === 1 ? '1-4' : level === 2 ? '5-9' : level === 3 ? '10-14' : level === 4 ? '15-19' : level === 5 ? '20-24' : level === 6 ? '25-29' : level === 7 ? '30-34' : '35+'}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="heatmap__calendar">
              <div className="heatmap__header">
                <div className="heatmap__day-name">Lun</div>
                <div className="heatmap__day-name">Mar</div>
                <div className="heatmap__day-name">Mié</div>
                <div className="heatmap__day-name">Jue</div>
                <div className="heatmap__day-name">Vie</div>
                <div className="heatmap__day-name heatmap__day-name--weekend">Sáb</div>
                <div className="heatmap__day-name heatmap__day-name--weekend">Dom</div>
              </div>
              
              <div className="heatmap__body">
                {getCalendarWeeks().map((week, weekIndex) => (
                  <div key={weekIndex} className="heatmap__week">
                    {week.map((dia, dayIndex) => (
                      <div 
                        key={dayIndex} 
                        className={`heatmap__cell ${dia ? '' : 'heatmap__cell--empty'} ${dia && (dia.diaSemana === 0 || dia.diaSemana === 6) ? 'heatmap__cell--weekend' : ''}`}
                        title={dia ? `${dia.label}: ${dia.checkins} entradas, ${dia.checkouts} salidas` : ''}
                      >
                        {dia && (
                          <>
                            <span className="heatmap__cell-date">{dia.label}</span>
                            <div className="heatmap__cell-bars">
                              <div 
                                className="heatmap__checkin" 
                                data-count={dia.checkinLevel}
                                title={`${dia.checkins} check-ins`}
                              >
                                {dia.checkins > 0 && <span>{dia.checkins}</span>}
                              </div>
                              <div 
                                className="heatmap__checkout" 
                                data-count={dia.checkoutLevel}
                                title={`${dia.checkouts} check-outs`}
                              >
                                {dia.checkouts > 0 && <span>{dia.checkouts}</span>}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="herramienta__placeholder">
            <svg className="herramienta__placeholder-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM9 10H7V12H9V10ZM13 10H11V12H13V10ZM17 10H15V12H17V10ZM9 14H7V16H9V14ZM13 14H11V16H13V14ZM17 14H15V16H17V14Z" fill="currentColor"/>
            </svg>
            <p>Sube un archivo de reservas para visualizar el mapa de calor con check-ins y check-outs</p>
          </div>
        )}
      </HerramientaTemplate>
    </MainLayout>
  );
};

export default MapaCalorPage;
