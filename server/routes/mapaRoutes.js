const express = require('express');
const router = express.Router();
const mapaController = require('../controllers/mapaController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post(
  '/obtener',
  upload.fields([
    { name: 'apartamentos', maxCount: 1 },
    { name: 'reservas', maxCount: 1 }
  ]),
  mapaController.obtenerMapaCalor
);

module.exports = router;
