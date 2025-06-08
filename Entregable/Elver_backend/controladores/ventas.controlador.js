// controllers/ventas.controlador.js
import VentaModel from "../models/ventas.model.js";

// Crear venta
export const crearVenta = (req, res) => {
    const { id_cliente, total } = req.body;

    if (!id_cliente || !total) {
        return res.status(400).json({ message: "id_cliente y total son obligatorios." });
    }

    const nuevaVenta = { id_cliente, total };

    VentaModel.create(nuevaVenta, (err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Error al crear la venta." });
        }
        res.status(201).json(data);
    });
};

// Obtener todas las ventas
export const getVentas = (req, res) => {
    VentaModel.getAll((err, data) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Error al obtener las ventas." });
        }
        res.status(200).json(data);
    });
};

// Obtener venta por ID
export const getVenta = (req, res) => {
    const id = req.params.id;
    VentaModel.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({ message: `Venta con ID ${id} no encontrada.` });
            }
            return res.status(500).json({ message: "Error al obtener la venta." });
        }
        res.status(200).json(data);
    });
};

// Modificar venta
export const modificarVenta = (req, res) => {
    const id = req.params.id;
    const venta = req.body;

    if (!venta || !venta.id_cliente || !venta.total) {
        return res.status(400).json({ message: "Datos incompletos para la modificación." });
    }

    VentaModel.updateById(id, venta, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({ message: `Venta con ID ${id} no encontrada.` });
            }
            return res.status(500).json({ message: "Error al actualizar la venta." });
        }
        res.status(200).json(data);
    });
};

// Eliminar venta
export const eliminarVenta = (req, res) => {
    const id = req.params.id;
    VentaModel.remove(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({ message: `Venta con ID ${id} no encontrada.` });
            }
            return res.status(500).json({ message: "Error al eliminar la venta." });
        }
        res.status(200).json({ message: `Venta con ID ${id} eliminada correctamente.` });
    });
};
