import { Router } from "express";
import { 
  crearCliente, 
  eliminarCliente, 
  getClientes, 
  getCliente, 
  modificarCliente 
} from "../controladores/clientes.controlador.js";

const clientesRouter = Router();

clientesRouter.get("/", getClientes);     
clientesRouter.get("/:id", getCliente);      
clientesRouter.post("/", crearCliente);       
clientesRouter.put("/:id", modificarCliente); 
clientesRouter.delete("/:id", eliminarCliente); 

export default clientesRouter;
