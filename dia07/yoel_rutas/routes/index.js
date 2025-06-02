import { Router } from "express";
import paisesRouter from "./paises.rutas.js"
import contactos from "../controladores/contactos.controlador.js"
 const indexRouters=Router();
 const prefix="/api";
 indexRouters.get(prefix,contactos.ver);
 indexRouters.use(`${prefix}/paises`,paisesRouter);
 export default indexRouters;