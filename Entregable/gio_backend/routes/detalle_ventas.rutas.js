// routes/detalleVentas.routes.js
import express from "express";
import {
  crearDetalle,
  getDetalles,
  getDetalle,
  modificarDetalle,
  eliminarDetalle
} from "../controladores/detalle_ventas.controlador.js";

const router = express.Router();

router.post("/", crearDetalle);
router.get("/", getDetalles);
router.get("/:id", getDetalle);
router.put("/:id", modificarDetalle);
router.delete("/:id", eliminarDetalle);

export default router;
