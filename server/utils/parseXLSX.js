// utils/parseXLSX.js
const ExcelJS = require('exceljs');

async function parseApartamentosXLSX(path) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path);
  const worksheet = workbook.worksheets[0];

  // Extrae cabeceras de la primera fila
  const header = [];
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    header.push(cell.value);
  });

  const apartamentos = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // Saltar cabecera

    const aptOrigen = {};
    row.eachCell((cell, colNumber) => {
      const key = header[colNumber - 1];
      aptOrigen[key] = cell.value;
    });

    // Mapeo de campos para tu modelo
    const apartamento = {
      id: aptOrigen.id || aptOrigen.ID || aptOrigen.Id || aptOrigen.Código || aptOrigen.codigo || aptOrigen.CODIGO,
      tipologia: aptOrigen.tipologia || aptOrigen.Tipología || aptOrigen['Tipología'] || aptOrigen.TIPOLOGIA,
      grupo: aptOrigen.grupo || aptOrigen.Grupo || aptOrigen['Grupo'],
      direccion: aptOrigen.direccion || aptOrigen.Dirección || aptOrigen['Dirección'] || aptOrigen.DIRECCION,
      codigo: aptOrigen.codigo || aptOrigen.Código || aptOrigen['Código'] || aptOrigen.CODIGO,
      huespedesMin: aptOrigen.huespedesMin || aptOrigen['Mn Huspedes'] || aptOrigen['Huéspedes Mn'],
      huespedesMax: aptOrigen.huespedesMax || aptOrigen['Mx Huspedes'] || aptOrigen['Huéspedes Mx'],
      numUnidades: aptOrigen.numUnidades || aptOrigen['N. unidades asociadas'] || aptOrigen['Num. Unidades'],
      ranking: aptOrigen.ranking || aptOrigen.Ranking || aptOrigen['Ranking'],
      city: aptOrigen.city || aptOrigen.City || aptOrigen['Ciudad'] || aptOrigen.Ciudad,
      canc: aptOrigen.canc || aptOrigen.Canc || aptOrigen['Canc']
    };

    // Guarda solo si existe el id
    if (apartamento.id !== undefined && apartamento.id !== null && apartamento.id !== '') {
      apartamentos.push(apartamento);
    }
  });

  return apartamentos;
}

module.exports = { parseApartamentosXLSX };


// ---- Ejemplo de uso en tu controlador ----

// const Apartamento = require('../models/Apartamento');
// const { parseApartamentosXLSX } = require('../utils/parseXLSX');
// const fs = require('fs');

exports.importApartamentos = async (req, res) => {
  try {
    const filePath = req.file.path;
    const apartamentosArr = await parseApartamentosXLSX(filePath);
    fs.unlinkSync(filePath);

    let nuevos = 0;
    let actualizados = 0;

    for (const apartamento of apartamentosArr) {
      const id = apartamento.id;
      if (!id) continue;

      // Actualiza si existe, inserta si no (upsert)
      const result = await Apartamento.updateOne(
        { id: id },
        { $set: apartamento },
        { upsert: true }
      );
      if (result.upsertedCount > 0 || result.upserted) {
        nuevos++;
      } else if (result.modifiedCount > 0) {
        actualizados++;
      }
    }

    res.json({
      message: 'Importación finalizada',
      nuevos,
      actualizados
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al importar apartamentos' });
  }
};
