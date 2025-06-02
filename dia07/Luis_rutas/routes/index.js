import { Router } from "express";
import paisesRouter from "./paises.rutas.js";
import contactos from "../controladores/contactos.controlador.js";

const indexRouter = Router();
const prefix = "/api";

indexRouter.get(`${prefix}/contactos`, contactos.buscarAll);
indexRouter.use(`${prefix}/paises`, paisesRouter);

export default indexRouter;
