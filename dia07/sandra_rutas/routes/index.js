import {Router} from "express";
import contactoRouter from "./contactos.rutas.js"
import {getContactos} from "../controladores/contactos.controlador.js"
const indexRouter=Router();
const prefix ="/api"
indexRouter.get(prefix,getContactos);
indexRouter.use(`${prefix}/contactos`,contactoRouter);
export default indexRouter;
