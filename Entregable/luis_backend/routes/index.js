import { Router } from "express";
import clientesRouter from "./clientes.rutas.js";
import productosRouter from "./productos.rutas.js";
import ventasRouter from "./ventas.rutas.js";
import detalleVentaRouter from "./detalle_venta.rutas.js";

const indexRouter = Router();
const prefix = "/api";

indexRouter.use(`${prefix}/clientes`, clientesRouter);
indexRouter.use(`${prefix}/productos`, productosRouter);
indexRouter.use(`${prefix}/ventas`, ventasRouter);
indexRouter.use(`${prefix}/detalle-venta`, detalleVentaRouter);

indexRouter.get(prefix, (req, res) => {
  res.status(200).send({ message: "API de botica funcionando correctamente 🚀" });
});

export default indexRouter;
