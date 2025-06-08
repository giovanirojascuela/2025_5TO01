import { Router } from "express";
import {
  crearCliente,
  eliminarCliente,
  getClientes,
  getCliente,
  modificarCliente
} from "../controladores/clientes.controlador.js";

const clientesRouter = Router();

clientesRouter.get("/", getClientes);         // Obtener todos los clientes
clientesRouter.get("/:id", getCliente);       // Obtener cliente por ID
clientesRouter.post("/", crearCliente);       // Crear nuevo cliente
clientesRouter.put("/:id", modificarCliente); // Modificar cliente
clientesRouter.delete("/:id", eliminarCliente); // Eliminar cliente

export default clientesRouter;