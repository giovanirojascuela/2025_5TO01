import {Router} from "express";
import { crearContacto, eliminarContacto, 
getContacto, getContactos, modificarContacto } from "../controladores/contactos.controlador.js";
const paisesRouter=Router();

paisesRouter.get("/",getContactos);
paisesRouter.get("/:id",getContacto);
paisesRouter.post("/",crearContacto);
paisesRouter.put("/:id",modificarContacto);
paisesRouter.delete("/:id",eliminarContacto);

export default paisesRouter;