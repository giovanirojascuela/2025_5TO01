import {Router} from "express";
import { getContactos, getContacto, crearContacto, modificarContacto, eliminarContacto } from "../controladores/contactos.controlador.js";
const paisesRouter=Router();

paisesRouter.get("/",getContactos);
paisesRouter.get("/:id",getContacto);
paisesRouter.post("/",crearContacto);
paisesRouter.put("/:id",modificarContacto);
paisesRouter.delete("/:id",eliminarContacto);

export default paisesRouter;