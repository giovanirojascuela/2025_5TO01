import {Router} from "express";
import productosRouter from "./productos.rutas.js"
import {getProductos} from "../controladores/productos.controlador.js"
const indexRouter=Router();
const prefix ="/api"
indexRouter.get(prefix,getProductos);
indexRouter.use(`${prefix}/productos`,productosRouter);
export default indexRouter;
