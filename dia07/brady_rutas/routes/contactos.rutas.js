import {Router} from "express";
import { getContactos, getContacto, crearContactos, modificarContacto, eliminarContacto } from "../controladores/contactos.controlador.js";
const contactosRouter=Router();

contactosRouter.get("/",getContactos);
contactosRouter.get("/:id",getContacto);
contactosRouter.post("/",crearContactos);
contactosRouter.put("/:id",modificarContacto);
contactosRouter.delete("/:id",eliminarContacto);
export default contactosRouter;