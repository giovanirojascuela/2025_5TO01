import {Router} from "express";
import contactosRouter from "./contacto.rutas.js";
import {getContactos} from "../controladores/contactos.controlador.js";
const indexRouter=Router();
const prefix="/api";
indexRouter.get(prefix,getContactos);
indexRouter.use(`${prefix}/contactos`,contactosRouter);
export default indexRouter;