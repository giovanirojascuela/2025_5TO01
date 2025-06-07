import {Router} from "express";
// Importa los controladores para productos en lugar de contactos
import { crearProducto, eliminarProducto, getProductos, getProducto, modificarProducto } from "../controladores/productos.controlador.js";
// Crea una instancia del router para manejar las rutas de productos
const productosRouter = Router();
// Define las rutas para las operaciones CRUD de productos
productosRouter.get("/", getProductos);
productosRouter.get("/:id", getProducto);
productosRouter.post("/", crearProducto);
productosRouter.put("/:id", modificarProducto);
productosRouter.delete("/:id", eliminarProducto);
export default productosRouter;