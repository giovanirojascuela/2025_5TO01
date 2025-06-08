// controllers/detalleVentas.controlador.js
import DetalleVentaModel from "../models/detalle_ventas.model.js";

// Crear detalle
export const crearDetalle = (req, res) => {
  const detalle = req.body;

  if (!detalle || !detalle.id_venta || !detalle.id_producto || !detalle.cantidad || !detalle.precio_unitario) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  DetalleVentaModel.create(detalle, (err, data) => {
    if (err) return res.status(500).json({ message: "Error al crear el detalle." });
    res.status(201).json(data);
  });
};

// Obtener todos los detalles
export const getDetalles = (req, res) => {
  DetalleVentaModel.getAll((err, data) => {
    if (err) return res.status(500).json({ message: "Error al obtener los detalles." });
    res.status(200).json(data);
  });
};

// Obtener detalle por ID
export const getDetalle = (req, res) => {
  DetalleVentaModel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Detalle no encontrado." });
      return res.status(500).json({ message: "Error al obtener el detalle." });
    }
    res.status(200).json(data);
  });
};

// Modificar detalle
export const modificarDetalle = (req, res) => {
  DetalleVentaModel.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Detalle no encontrado." });
      return res.status(500).json({ message: "Error al actualizar el detalle." });
    }
    res.status(200).json(data);
  });
};

// Eliminar detalle
export const eliminarDetalle = (req, res) => {
  DetalleVentaModel.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") return res.status(404).json({ message: "Detalle no encontrado." });
      return res.status(500).json({ message: "Error al eliminar el detalle." });
    }
    res.status(200).json({ message: "Detalle eliminado correctamente." });
  });
};
