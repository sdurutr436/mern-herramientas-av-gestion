// server/models/Apartamento.js
const mongoose = require('mongoose');

const apartamentoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },      // ID único de apartamento
  tipologia: String,                                       // Tipología del apartamento
  grupo: String,                                           // Grupo/categoría (opcional)
  direccion: String,                                       // Dirección completa
  codigo: String,                                          // Código interno
  huespedesMin: Number,                                    // Mínimo huéspedes
  huespedesMax: Number,                                    // Máximo huéspedes
  numUnidades: Number,                                     // Número de unidades asociadas
  ranking: Number,                                         // Ranking/orden
  city: String,                                            // Ciudad
  canc: String                                             // Campo adicional (ver utilidad, texto normalmente)
}, { collection: 'apartamentos' });

module.exports = mongoose.model('Apartamento', apartamentoSchema);
