const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

// Ruta para registrar una venta
router.post('/', ventasController.registrarVenta);

module.exports = router;
