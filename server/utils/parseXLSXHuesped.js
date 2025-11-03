// utils/parseXLSXHuesped.js
const ExcelJS = require('exceljs');

async function parseXLSXHuesped(path) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path);
  const worksheet = workbook.worksheets[0];

  // Extrae la cabecera de la primera fila (todos los nombres de columna)
  const header = [];
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    header.push(cell.value);
  });

  const reservas = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // Saltar cabecera

    const reserva = {};
    row.eachCell((cell, colNumber) => {
      const key = header[colNumber - 1];
      reserva[key] = cell.value;
    });
    reservas.push(reserva);
  });

  return reservas; // Array de objetos reserva/huésped por columna
}

module.exports = { parseXLSXHuesped };
