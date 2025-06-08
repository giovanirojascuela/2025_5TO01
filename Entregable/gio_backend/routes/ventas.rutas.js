// routes/ventas.routes.js
import express from "express";
import {
  crearVenta,
  getVentas,
  getVenta,
  modificarVenta,
  eliminarVenta
} from "../controladores/ventas.controlador.js";

const router = express.Router();

// Crear una venta
router.post("/", crearVenta);

// Obtener todas las ventas
router.get("/", getVentas);

// Obtener una venta por ID
router.get("/:id", getVenta);

// Modificar una venta
router.put("/:id", modificarVenta);

// Eliminar una venta
router.delete("/:id", eliminarVenta);

export default router;
