import { Router } from "express"; 
import contactosRouter from "./contactos.rutas.js";
import { getContactos } from "../controladores/contactos.controlador.js";
const indexRouter = Router(); 
const prefix = "/api";
// Corrige: Usamos getContactos en lugar de buscarAll
indexRouter.get(prefix, getContactos); 
// Corrige: Usamos contactosRouter en lugar de paisesRouter
indexRouter.use(`${prefix}/contactos`, contactosRouter); 

export default indexRouter;
