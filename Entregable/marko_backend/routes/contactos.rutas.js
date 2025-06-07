import {Router} from "express";
import { crearContacto, eliminarContacto, getContactos, getContacto, modificarContacto } from "../controladores/contactos.controlador.js";
const contactosRouter=Router();

contactosRouter.get("/",getContactos);
contactosRouter.get("/:id",getContacto);
contactosRouter.post("/",crearContacto);
contactosRouter.put("/:id",modificarContacto);
contactosRouter.delete("/:id",eliminarContacto);

export default contactosRouter;