const Huesped = require('../models/Huesped');
const { parseXLSXHuesped } = require('../utils/parseXLSXHuesped'); // Adaptar nombre de parser
const path = require('path');
const fs = require('fs');

// Importar XLSX de huéspedes/reservas
exports.importHuespedes = async (req, res) => {
  try {
    const filePath = req.file.path;
    const huespedesArr = await parseXLSXHuesped(filePath); // ✅ Correcto

    fs.unlinkSync(filePath);

    let nuevos = 0, repetidos = 0, sinTelefono = 0;

    for (const h of huespedesArr) {
      const reservaId = h.reservaId || h.ID || h['ID reserva'];
      const telefono = h.telefono || h['Teléfono'] || h.Telfono;
      if (!telefono) {
        sinTelefono++;
        continue;
      }
      const existente = await Huesped.findOne({ reservaId: reservaId });
      if (!existente) {
        await Huesped.create(h);
        nuevos++;
      } else {
        repetidos++;
      }
    }
    res.json({ message: 'Importación huéspedes completa', nuevos, repetidos, sinTelefono });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al importar huéspedes' });
  }
};

// Consultar todos los huéspedes
exports.getAllHuespedes = async (req, res) => {
  try {
    const huespedes = await Huesped.find({});
    res.json(huespedes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al consultar huéspedes' });
  }
};
