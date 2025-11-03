const express = require('express');
const router = express.Router();
const apartamentoController = require('../controllers/apartamentoController');
const multer = require('multer');

// Carpeta temporal para archivos subidos
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), apartamentoController.importApartamentos);
router.get('/', apartamentoController.getAllApartamentos);

module.exports = router;
