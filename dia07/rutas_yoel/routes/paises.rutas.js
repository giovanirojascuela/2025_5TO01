import indexRouter, { Router } from "express";
import { getPaises } from "../controladores/paises.controlador.js";
const paisesRouter=Router();

paisesRouter.get("/",getPaises);
paisesRouter.get("/:id",getPaises);
paisesRouter.post("/",crearPais);
paisesRouter.get("/:is",modificarPais);
paisesRouter.get("/:id",eliminarPais);

export default paisesRouter;