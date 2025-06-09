import { Router } from "express";
import {
  crearDetalleVenta,
  getDetallesVenta,
  getDetalleVenta,
  modificarDetalleVenta,
  eliminarDetalleVenta,
} from "../controladores/detalle_venta.controlador.js";

const detalleVentaRouter = Router();

// Rutas
detalleVentaRouter.get("/", getDetallesVenta);
detalleVentaRouter.get("/:id", getDetalleVenta);
detalleVentaRouter.post("/", crearDetalleVenta);
detalleVentaRouter.put("/:id", modificarDetalleVenta);
detalleVentaRouter.delete("/:id", eliminarDetalleVenta);

export default detalleVentaRouter;  