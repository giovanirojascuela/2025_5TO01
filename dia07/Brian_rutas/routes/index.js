import { Router } from "express";
import paisesRouter from "./paises.rutas.js"
 const indexRouters=Router();
 const prefix="/api";
 indexRouters.get("/",(req,res)=>{
    res.send("Aplicando con rutas");

 });
 indexRouters.use(`${prefix}/paises`,paisesRouter);
 
 export default indexRouters;