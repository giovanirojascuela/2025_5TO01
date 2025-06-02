import {Router} from "express";
import paisesRouter from "./paises.rutas.js"
import {buscarAll} from "../controladores/contactos.controlador.js"
const indexRouter=Router();
const prefix ="/api"
indexRouter.get(prefix,buscalAll);
indexRouter.use(`${prefix}/paises`,paisesRouter);
export default indexRouter;