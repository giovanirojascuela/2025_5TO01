import { Router } from "express";
import { getPaises } from "../controladores/paises.controladores";
const paisesRouter=Router();

paisesRouter.get("/",(req,res)=>{
    res.send("paises");
});
paisesRouter.get("/.id",(req,res)=>{
    res.send("paises no");
});
export default  paisesRouter;