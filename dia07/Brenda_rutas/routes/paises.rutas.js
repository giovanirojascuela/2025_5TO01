import { Router } from "express";
import { crearPais, eliminarPais, getPais, getPaises, modificarPais } from "../controladores/paises.controlador.js";
const paisesRouter = Router();
// Obtener todos los países
paisesRouter.get("/", getPaises);
// Obtener un país por ID (ruta dinámica)
paisesRouter.get("/:id", getPais);
// Crear un país (POST, no GET)
paisesRouter.post("/", crearPais);
// Modificar un país (PUT o PATCH)
paisesRouter.put("/:id", modificarPais); // o .patch("/:id", modificarPais)
// Eliminar un país
paisesRouter.delete("/:id", eliminarPais);
export default paisesRouter;
