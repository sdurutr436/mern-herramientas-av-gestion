const { parseXLSXHuesped } = require('../utils/parseXLSXHuesped');
const fs = require('fs');

// Formatea la fecha tipo 31/10/2025 a 251031
function formatearFecha(fechaStr) {
  if (!fechaStr) return '';
  const soloFecha = fechaStr.split(' ')[0];
  const match = soloFecha.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!match) return '';
  const dia = match[1].padStart(2, '0');
  const mes = match[2].padStart(2, '0');
  let anio = match[3];
  if (anio.length === 4) anio = anio.slice(-2);
  return anio + mes + dia;
}

exports.exportarGoogleContacts = async (req, res) => {
  try {
    const reservasPath = req.file.path;
    const reservasArr = await parseXLSXHuesped(reservasPath);
    fs.unlinkSync(reservasPath);

    // Puedes quitar este log cuando verifiques
    console.log(reservasArr.slice(0, 3));

    // Filtra huéspedes válidos utilizando las claves reales del Excel
    const huespedesValidos = reservasArr.filter(h => {
      const telefono = (h.telefono || h.Telfono || h['Teléfono'] || '').toString().trim();
      const nombre = (h.nombre || h.Referencia || '').toString().trim();
      return telefono && telefono !== "+" && telefono !== "0" && !telefono.startsWith('+0') && telefono.length > 5 &&
             nombre && nombre !== "Huésped" && !nombre.startsWith('{') && nombre.length > 2;
    });

    // Agrupa reservas por huésped (nombre-teléfono)
    const reservasAgrupadas = {};
    huespedesValidos.forEach(h => {
      const telefono = (h.telefono || h.Telfono || h['Teléfono'] || '').toString().trim();
      const nombre = (h.nombre || h.Referencia || '').toString().trim();
      const fechaCheckIn = formatearFecha(h['Check in'] || h.checkin);
      const apartamento = (h['Habitaciones'] || h.habitaciones || h.apartamento || '').toString().trim();
      const clave = `${nombre}-${telefono}`;
      if (!reservasAgrupadas[clave]) {
        reservasAgrupadas[clave] = {
          nombre,
          telefono,
          fechaCheckIn,
          apartamentos: [apartamento]
        };
      } else {
        if (!reservasAgrupadas[clave].apartamentos.includes(apartamento)) 
          reservasAgrupadas[clave].apartamentos.push(apartamento);
        if (fechaCheckIn < reservasAgrupadas[clave].fechaCheckIn) 
          reservasAgrupadas[clave].fechaCheckIn = fechaCheckIn;
      }
    });

    // Cabecera estándar de Google Contacts
    const cabecera = "First Name,Middle Name,Last Name,Phonetic First Name,Phonetic Middle Name,Phonetic Last Name,Name Prefix,Name Suffix,Nickname,File As,Organization Name,Organization Title,Organization Department,Birthday,Notes,Photo,Labels,E-mail 1 - Label,E-mail 1 - Value,E-mail 2 - Label,E-mail 2 - Value,Phone 1 - Label,Phone 1 - Value";
    const filas = [cabecera];

    // Genera cada línea de contacto
    for (const clave in reservasAgrupadas) {
      const { nombre, telefono, fechaCheckIn, apartamentos } = reservasAgrupadas[clave];
      const nombreFormateado = nombre.split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
      // El campo especial como lo quieres:
      const nombreContacto = `${fechaCheckIn} - ${apartamentos.join(', ')} - ${nombreFormateado}`.replace(/"/g, '""');
      filas.push(`"${nombreContacto}",,,,,,,,,,,,,,,,* myContacts,,,,,,${telefono}`);
    }

    // NOMBRE DE ARCHIVO DINÁMICO
    const fechasCheckin = Object.values(reservasAgrupadas)
      .map(r => r.fechaCheckIn)
      .filter(f => f && /^\d{6}$/.test(f))
      .sort();

    const fechaIni = fechasCheckin[0] || '';
    const fechaFin = fechasCheckin[fechasCheckin.length - 1] || '';
    const nombreArchivo = fechaIni && fechaFin
      ? `${fechaIni}_contactos_${fechaFin}.csv`
      : 'contactos_google.csv';

    // BOM para compatibilidad y envío
    const csv = "\uFEFF" + filas.join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${nombreArchivo}`);
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al exportar contactos Google' });
  }
};
