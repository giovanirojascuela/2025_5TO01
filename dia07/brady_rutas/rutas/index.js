import { Router } from "express";

const indexRouter=Router();
indexRouter.get("/",(req,res)=>{
    res.send("Aplicacion con rutas");
});
indexRouter.get("/paises",(req,res)=>{
    res.send("paises");
});
export default indexRouter;