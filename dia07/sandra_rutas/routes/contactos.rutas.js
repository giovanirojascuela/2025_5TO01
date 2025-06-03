import {Router} from "express";
import {getContactos, getContacto, crearContacto, modificarContacto,
     eliminarContacto  } from "../controladores/contactos.controlador.js";
const contactoRouter=Router();

contactoRouter.get("/",getContactos);
contactoRouter.get("/:id",getContacto);
contactoRouter.post("/",crearContacto);
contactoRouter.put("/:id",modificarContacto);
contactoRouter.delete("/:id",eliminarContacto);

export default contactoRouter;