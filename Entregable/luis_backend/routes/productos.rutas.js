import { Router } from "express";
import {
  crearProducto,
  getProductos,
  getProducto,
  modificarProducto,
  eliminarProducto,
} from "../controladores/productos.controlador.js";

const productosRouter = Router();

// Rutas
productosRouter.get("/", getProductos);
productosRouter.get("/:id", getProducto);
productosRouter.post("/", crearProducto);
productosRouter.put("/:id", modificarProducto);
productosRouter.delete("/:id", eliminarProducto);

export default productosRouter;
