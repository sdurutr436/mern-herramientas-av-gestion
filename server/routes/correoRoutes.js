const express = require('express');
const router = express.Router();
const correoController = require('../controllers/correoController');
const multer = require('multer');
const { validarArchivoXLSX } = require('../middleware/validarArchivos');

// Configuración de Multer con límites de seguridad
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB máximo
        files: 1
    }
});

router.post(
  '/generar',
  upload.single('reservas'),
  validarArchivoXLSX,
  correoController.generarCorreo
);

module.exports = router;
