const { parseXLSXHuesped } = require('../utils/parseXLSXHuesped');
const XLSX = require('xlsx');
const Apartamento = require('../models/Apartamento');

exports.generarCorreo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Falta el archivo de reservas' });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log('Total rows in Excel:', data.length);

    // Filter late arrivals (>= 20:00)
    const items = data.filter(row => {
      const hora = row['Hora estimada de llegada'];
      
      if (!hora) return false;
      const [h] = hora.toString().split(':');
      const horaNum = parseInt(h, 10);
      return horaNum >= 20;
    });

    console.log('Total late arrivals found:', items.length);

    // Build the email text for each guest
    const correoPromises = items.map(async (r) => {
      // Extract ID from ID Tipologie (remove curly braces and convert to number)
      const idTipologieRaw = r['ID Tipologie'] || '';
      const idTipologie = parseInt(idTipologieRaw.toString().replace(/[{}]/g, ''), 10);
      
      // Find apartment in database by id
      let apartamento = null;
      if (idTipologie) {
        apartamento = await Apartamento.findOne({ id: idTipologie });
        console.log('Looking for apartamento with id:', idTipologie, 'Found:', apartamento ? 'Yes' : 'No');
      }

      const nombreApartamento = apartamento ? apartamento.tipologia : (r['Habitaciones'] || 'Desconocido');
      const direccionApartamento = apartamento ? apartamento.direccion : 'Desconocido';

      return `Nombre del huésped: ${r['Referencia'] || 'Desconocido'}
Teléfono del huésped: ${r['Teléfono'] || 'Desconocido'}
Nombre del apartamento: ${nombreApartamento}
Dirección del apartamento: ${direccionApartamento}
Modo de transporte: Desconocido
Día de llegada: ${r['Check in'] || 'Desconocido'}
Hora estimada de llegada al apartamento: ${r['Hora estimada de llegada'] || 'Desconocido'}`;
    });

    const correoArray = await Promise.all(correoPromises);
    const correo = correoArray.join('\n\n---\n\n');

    const total = items.length;

    res.json({ correo, total });
  } catch (err) {
    console.error('Error in generarCorreo:', err);
    res.status(500).json({ message: 'Error al procesar el archivo' });
  }
};
