const express = require('express');
const router = express.Router();
const correoController = require('../controllers/correoController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post(
  '/generar',
  upload.single('reservas'), // solo el archivo de reservas
  correoController.generarCorreo
);

module.exports = router;
