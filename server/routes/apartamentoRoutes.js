const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamentoController');
const multer = require('multer');
const { validarArchivoXLSX } = require('../middleware/validarArchivos');

// Configuración de Multer con límites de seguridad
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB máximo
        files: 1 // solo 1 archivo a la vez
    }
});

router.post('/import', upload.single('file'), validarArchivoXLSX, apartamentoController.importApartamentos);
router.get('/', apartamentoController.getAllApartamentos);

module.exports = router;
