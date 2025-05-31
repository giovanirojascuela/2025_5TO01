import { Router } from "express";
import paiseaRouter from ",/paises.rutas.js"

const indexRouter=Router();
const prefix = "./api"
indexRouter.get("/",(req,res)=>{
    res.send("Aplicacion con rutas");
});
indexRouter.use('${prefix}/paises',paisesRouter);
export default indexRouter;
