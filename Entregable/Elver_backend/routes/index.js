import { Router } from "express";
import clientesRouter from "./clientes.rutas.js";

const indexRouter = Router();

// Ruta base de prueba para verificar conexión
indexRouter.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Rutas de clientes
indexRouter.use("/clientes", clientesRouter);

export default indexRouter;