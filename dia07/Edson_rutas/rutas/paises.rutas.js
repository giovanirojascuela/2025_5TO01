import { Router} from "express";
import { crearpais, eliminarpais, getpais, getpaises, modificarpais } from "../controladores/paises.controlador.js";
const paisesRouter=Router();
paisesRouter.get("/",getpaises);
paisesRouter.get("/:id",getpais);
paisesRouter.post("/",crearpais);
paisesRouter.put("/:id",modificarpais);
paisesRouter.delete("/:id",eliminarpais);

export default paisesRouter;