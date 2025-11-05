const express = require('express');
const router = express.Router();
const mapaController = require('../controllers/mapaController');
const multer = require('multer');
const { validarMultiplesArchivos } = require('../middleware/validarArchivos');

// Configuración de Multer con límites de seguridad
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB máximo por archivo
        files: 2 // máximo 2 archivos
    }
});

router.post(
  '/obtener',
  upload.fields([
    { name: 'apartamentos', maxCount: 1 },
    { name: 'reservas', maxCount: 1 }
  ]),
  validarMultiplesArchivos,
  mapaController.obtenerMapaCalor
);

module.exports = router;
