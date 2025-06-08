// routes/atencion.routes.js
import express from "express";
import {
  crearAtencion,
  getAtenciones,
  getAtencion,
  modificarAtencion,
  eliminarAtencion
} from "../controladores/atencion.controlador.js";

const router = express.Router();

router.post("/", crearAtencion);
router.get("/", getAtenciones);
router.get("/:id", getAtencion);
router.put("/:id", modificarAtencion);
router.delete("/:id", eliminarAtencion);

export default router;