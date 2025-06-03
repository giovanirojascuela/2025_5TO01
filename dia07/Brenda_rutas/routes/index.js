import { Router } from "express";
import contactosRouter from "./contactos.rutas.js"
import { getContactos } from "../controladores/contactos.controlador.js";

const indexRouter=Router();
const prefix="/api"
indexRouter.get(prefix,getContactos);
indexRouter.use(`${prefix}/contacto`,contactosRouter);
export default indexRouter;
