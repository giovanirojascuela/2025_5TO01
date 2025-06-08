// controllers/atencion.controlador.js
import AtencionModel from "../models/atencion.model.js";

// Crear atención
export const crearAtencion = (req, res) => {
  const { id_cliente, motivo, respuesta, estado } = req.body;

  if (!id_cliente || !motivo) {
    return res.status(400).json({ message: "El ID del cliente y el motivo son obligatorios." });
  }

  const nuevaAtencion = {
    id_cliente,
    motivo,
    respuesta: respuesta || null,
    estado: estado || "Pendiente",
  };

  AtencionModel.create(nuevaAtencion, (err, data) => {
    if (err) return res.status(500).json({ message: "Error al crear la atención." });
    res.status(201).json(data);
  });
};

// Obtener todas las atenciones
export const getAtenciones = (req, res) => {
  AtencionModel.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Error al obtener las atenciones." });
    res.status(200).json(data);
  });
};

// Obtener atención por ID
export const getAtencion = (req, res) => {
  AtencionModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Atención no encontrada." });
      return res.status(500).json({ message: "Error al obtener la atención." });
    }
    res.status(200).json(data);
  });
};

// Modificar atención
export const modificarAtencion = (req, res) => {
  AtencionModel.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Atención no encontrada." });
      return res.status(500).json({ message: "Error al actualizar la atención." });
    }
    res.status(200).json(data);
  });
};

// Eliminar atención
export const eliminarAtencion = (req, res) => {
  AtencionModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Atención no encontrada." });
      return res.status(500).json({ message: "Error al eliminar la atención." });
    }
    res.status(200).json({ message: "Atención eliminada correctamente." });
  });
};
