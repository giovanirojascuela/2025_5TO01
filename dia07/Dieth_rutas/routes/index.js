import { Router } from "express";
import paisesRouter from "./paises.rutas.js"

const indexRouter = Router();
const prefix="/api"

indexRouter.get("/", (req, res) => {
    res.send("Aplicación con rutas"); 
});
indexRouter.use(`${prefix}/paises`, paisesRouter)


export default indexRouter;
