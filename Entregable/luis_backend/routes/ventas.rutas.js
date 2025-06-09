import { Router } from "express";
import {
  crearVenta,
  getVentas,
  getVenta,
  modificarVenta,
  eliminarVenta,
} from "../controladores/ventas.controlador.js";

const ventasRouter = Router();

// Rutas de ventas
ventasRouter.get("/", getVentas);
ventasRouter.get("/:id", getVenta);
ventasRouter.post("/", crearVenta);
ventasRouter.put("/:id", modificarVenta);
ventasRouter.delete("/:id", eliminarVenta);

export default ventasRouter;
