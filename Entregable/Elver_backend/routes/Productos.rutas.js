// productos.rutas.js
import express from "express";
import {
  getProductos,
  getProducto,
  crearProducto,
  modificarProducto,
  eliminarProducto
} from "../controladores/productos.controlador.js";

const router = express.Router();

router.get("/", getProductos);
router.get("/:id", getProducto);
router.post("/", crearProducto);
router.put("/:id", modificarProducto);
router.delete("/:id", eliminarProducto);

export default router;