import { Router } from "express";
import { crearPais, eliminarPais, getPais, getPaises, modificarPais } from "../controladores/paises.controladores.js";

const paisesRouter=Router();

paisesRouter.get("/",getPaises);
paisesRouter.get("/:id",getPais);
paisesRouter.get("/",crearPais);
paisesRouter.get("/",modificarPais);
paisesRouter.get("/",eliminarPais);

export default paisesRouter;
