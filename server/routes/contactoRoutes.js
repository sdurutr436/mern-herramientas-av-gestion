const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');
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
  '/google',
  upload.single('reservas'),
  validarArchivoXLSX,
  contactoController.exportarGoogleContacts
);

module.exports = router;
