const { parseApartamentosXLSX } = require('../utils/parseXLSX');
const { parseXLSXHuesped } = require('../utils/parseXLSXHuesped');
const fs = require('fs');

exports.obtenerMapaCalor = async (req, res) => {
  try {
    // Recibe los archivos subidos desde el frontend
    const apartamentosPath = req.files['apartamentos'][0].path;
    const reservasPath = req.files['reservas'][0].path;

    // Procesa ambos archivos en memoria
    const apartamentosArr = await parseApartamentosXLSX(apartamentosPath);
    const reservasArr = await parseXLSXHuesped(reservasPath);

    // Borra archivos temporales
    fs.unlinkSync(apartamentosPath);
    fs.unlinkSync(reservasPath);

    // Lógica de agrupación para mapa: por fecha, apartamento, nº reservas/ocupación
    // Puedes enviar como array de "puntos" para mapa
    // Ejemplo básico: obtener ocupación por apartamento en una fecha (puedes adaptar)
    const fechaMapa = req.body.fecha; // Recibe la fecha solicitada por el frontend

    const ocupacion = {};
    reservasArr.forEach(r => {
      const fechaIn = r.checkin || r['Check in'];
      const idApt = r.apartamento || r['Apartamento'] || r.habitaciones || r['Habitaciones'];
      if (fechaIn === fechaMapa && idApt) {
        if (!ocupacion[idApt]) ocupacion[idApt] = 0;
        ocupacion[idApt] += 1;
      }
    });

    // Arma respuesta con info geográfica del apartamento y ocupación
    const mapa = apartamentosArr.map(a => ({
      id: a.id,
      nombre: a.tipologia,
      direccion: a.direccion,
      city: a.city,
      ocupacion: ocupacion[a.id] || 0
      // Puedes añadir lat/lon si tienes esos datos para mapa real
    }));

    res.json({ mapa });
  } catch (err) {
    res.status(500).json({ message: 'Error al generar datos de mapa de calor' });
  }
};
