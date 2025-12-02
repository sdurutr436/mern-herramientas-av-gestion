const express = require('express');
const router = express.Router();
const mapaController = require('../controllers/mapaController');
const multer = require('multer');

// Configuración de Multer con límites de seguridad
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB máximo por archivo
        files: 2 // máximo 2 archivos
    },
    fileFilter: (req, file, cb) => {
        // Solo aceptar archivos xlsx
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.originalname.endsWith('.xlsx')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos .xlsx'), false);
        }
    }
});

router.post(
  '/obtener',
  upload.fields([
    { name: 'apartamentos', maxCount: 1 },
    { name: 'reservas', maxCount: 1 }
  ]),
  (req, res, next) => {
    // Validar que al menos el archivo de reservas esté presente
    if (!req.files || !req.files['reservas'] || !req.files['reservas'][0]) {
      return res.status(400).json({ message: 'El archivo de reservas es requerido' });
    }
    next();
  },
  mapaController.obtenerMapaCalor
);

module.exports = router;
