const { parseApartamentosXLSX } = require('../utils/parseXLSX');
const { parseXLSXHuesped } = require('../utils/parseXLSXHuesped');
const fs = require('fs');

/**
 * Convierte una fecha Excel (serial number) o string a objeto Date
 */
function parseExcelDate(value) {
  if (!value) return null;
  
  // Si ya es un objeto Date
  if (value instanceof Date) {
    return value;
  }
  
  // Si es un número (Excel serial date)
  if (typeof value === 'number') {
    // Excel usa 1/1/1900 como día 1, pero tiene un bug con 1900 como año bisiesto
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + value * 24 * 60 * 60 * 1000);
  }
  
  // Si es un string, intentar parsear
  if (typeof value === 'string') {
    // Formato DD/MM/YYYY o DD-MM-YYYY
    const parts = value.split(/[\/\-]/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return new Date(value);
  }
  
  return null;
}

/**
 * Formatea una fecha como "DD-XX" donde XX son las 2 primeras letras del mes en español
 */
function formatDateLabel(date) {
  const meses = ['En', 'Fe', 'Ma', 'Ab', 'My', 'Jn', 'Jl', 'Ag', 'Se', 'Oc', 'No', 'Di'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = meses[date.getMonth()];
  return `${day}-${month}`;
}

/**
 * Genera un array de fechas entre startDate y endDate (inclusive)
 */
function generateDateRange(startDate, endDate) {
  const dates = [];
  const current = new Date(startDate);
  current.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
}

/**
 * Determina el nivel de gradiente basado en el conteo
 * Rangos: 1-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35+
 */
function getGradientLevel(count) {
  if (count === 0) return 0;
  if (count <= 4) return 1;
  if (count <= 9) return 2;
  if (count <= 14) return 3;
  if (count <= 19) return 4;
  if (count <= 24) return 5;
  if (count <= 29) return 6;
  if (count <= 34) return 7;
  return 8; // 35+
}

exports.obtenerMapaCalor = async (req, res) => {
  try {
    // Recibe los archivos subidos desde el frontend
    const reservasPath = req.files['reservas'][0].path;
    
    // Procesa el archivo de reservas
    const reservasArr = await parseXLSXHuesped(reservasPath);
    
    // Borra archivo temporal
    fs.unlinkSync(reservasPath);
    
    // Si hay archivo de apartamentos, también lo procesa (opcional)
    let apartamentosPath = null;
    if (req.files['apartamentos'] && req.files['apartamentos'][0]) {
      apartamentosPath = req.files['apartamentos'][0].path;
      fs.unlinkSync(apartamentosPath);
    }

    // Encontrar el rango de fechas de los check-ins
    let minDate = null;
    let maxDate = null;
    
    // Mapas para contar check-ins y check-outs por fecha
    const checkinsPerDay = {};
    const checkoutsPerDay = {};
    
    reservasArr.forEach(r => {
      // Obtener fechas de check-in y check-out
      const checkinRaw = r.checkin || r['Check in'] || r['Check-in'] || r['Checkin'] || r['CHECKIN'];
      const checkoutRaw = r.checkout || r['Check out'] || r['Check-out'] || r['Checkout'] || r['CHECKOUT'];
      
      const checkinDate = parseExcelDate(checkinRaw);
      const checkoutDate = parseExcelDate(checkoutRaw);
      
      // Procesar check-in
      if (checkinDate && !isNaN(checkinDate.getTime())) {
        const dateKey = checkinDate.toISOString().split('T')[0];
        checkinsPerDay[dateKey] = (checkinsPerDay[dateKey] || 0) + 1;
        
        // Actualizar rango de fechas
        if (!minDate || checkinDate < minDate) minDate = new Date(checkinDate);
        if (!maxDate || checkinDate > maxDate) maxDate = new Date(checkinDate);
      }
      
      // Procesar check-out
      if (checkoutDate && !isNaN(checkoutDate.getTime())) {
        const dateKey = checkoutDate.toISOString().split('T')[0];
        checkoutsPerDay[dateKey] = (checkoutsPerDay[dateKey] || 0) + 1;
        
        // Extender rango si el checkout está fuera
        if (!minDate || checkoutDate < minDate) minDate = new Date(checkoutDate);
        if (!maxDate || checkoutDate > maxDate) maxDate = new Date(checkoutDate);
      }
    });

    if (!minDate || !maxDate) {
      return res.status(400).json({ message: 'No se encontraron fechas válidas en el archivo' });
    }

    // Generar todas las fechas del rango
    const allDates = generateDateRange(minDate, maxDate);
    
    // Construir el calendario
    const calendario = allDates.map(date => {
      const dateKey = date.toISOString().split('T')[0];
      const checkins = checkinsPerDay[dateKey] || 0;
      const checkouts = checkoutsPerDay[dateKey] || 0;
      
      return {
        fecha: dateKey,
        label: formatDateLabel(date),
        diaSemana: date.getDay(), // 0=Domingo, 6=Sábado
        checkins,
        checkouts,
        checkinLevel: getGradientLevel(checkins),
        checkoutLevel: getGradientLevel(checkouts)
      };
    });

    // Estadísticas generales
    const totalCheckins = Object.values(checkinsPerDay).reduce((a, b) => a + b, 0);
    const totalCheckouts = Object.values(checkoutsPerDay).reduce((a, b) => a + b, 0);
    const maxCheckinsDay = Math.max(...Object.values(checkinsPerDay), 0);
    const maxCheckoutsDay = Math.max(...Object.values(checkoutsPerDay), 0);

    res.json({ 
      mapa: {
        calendario,
        estadisticas: {
          totalCheckins,
          totalCheckouts,
          maxCheckinsDay,
          maxCheckoutsDay,
          totalDias: allDates.length,
          fechaInicio: formatDateLabel(minDate),
          fechaFin: formatDateLabel(maxDate)
        }
      }
    });
  } catch (err) {
    console.error('Error en obtenerMapaCalor:', err);
    res.status(500).json({ message: 'Error al generar datos de mapa de calor' });
  }
};
