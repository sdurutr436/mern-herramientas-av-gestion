const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post(
  '/google',
  upload.single('reservas'),
  contactoController.exportarGoogleContacts
);

module.exports = router;
