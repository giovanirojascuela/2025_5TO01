import { Router } from "express";
import { crearPais, eliminarPais, getPais, getPaises, modificarPais } from "../controladores/paises.controlador.js";
const paisesRouter=Router();

paisesRouter.get("/",getPaises);
paisesRouter.get("/:id",getPais);
paisesRouter.post("/",crearPais);
paisesRouter.put("/",modificarPais);
paisesRouter.delete("/",eliminarPais);
   

export default paisesRouter;