import { Router     } from "express";
import { crearPais, eliminarPais, getPaises, modificarPais } from "../controladores/paises.controladores.js";
const paisesRouter=Router();

paisesRouter.get("/",getPaises);
paisesRouter.get("/",getPaises);
paisesRouter.get("/",crearPais);
paisesRouter.get("/",modificarPais);
paisesRouter.get("/",eliminarPais);

paisesRouter.get("/:id",(req,res)=>{
    res.send("paises nnnnnnnn");

});
paisesRouter.get("/:id",(req,res)=>{
    res.send("Creo pais");

});
paisesRouter.get("/:id",(req,res)=>{
    res.send("Modifico pais nn");

});
paisesRouter.get("/:id",(req,res)=>{
    res.send("Elimino pais nn");

});


export default paisesRouter;