const Apartamento = require('../models/Apartamento');
const { parseApartamentosXLSX } = require('../utils/parseXLSX');
const path = require('path');
const fs = require('fs');

exports.importApartamentos = async (req, res) => {
  try {
    const filePath = req.file.path;
    const apartamentosArr = await parseApartamentosXLSX(filePath);

    // Opcional: elimina el archivo temporal después de procesarlo
    fs.unlinkSync(filePath);

    let nuevos = 0;
    let repetidos = 0;

    for (const apt of apartamentosArr) {
      const id = apt.id || apt.ID || apt.Id || apt.Código; // ajusta a la cabecera real
      if (!id) continue;

      const existente = await Apartamento.findOne({ id: id });
      if (!existente) {
        await Apartamento.create(apt);
        nuevos++;
      } else {
        repetidos++;
      }
    }

    res.json({ message: 'Importación finalizada', nuevos, repetidos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al importar apartamentos' });
  }
};

exports.getAllApartamentos = async (req, res) => {
  try {
    const apartamentos = await Apartamento.find({});
    res.json(apartamentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al consultar apartamentos' });
  }
};
