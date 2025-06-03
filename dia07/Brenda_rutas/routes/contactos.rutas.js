import { Router } from "express";
import { getContactos, getContacto, crearContacto, modificarContacto, eliminarContacto } from "../controladores/contactos.controlador.js";

const contactosRouter = Router();

// Obtener todos los contactos
contactosRouter.get("/", getContactos);

// Obtener un contacto por ID
contactosRouter.get("/:id", getContacto);

// Crear un contacto
contactosRouter.post("/", crearContacto);

// Modificar un contacto
contactosRouter.put("/:id", modificarContacto);

// Eliminar un contacto
contactosRouter.delete("/:id", eliminarContacto);

export default contactosRouter;
