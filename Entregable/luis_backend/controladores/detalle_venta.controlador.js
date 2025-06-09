import DetalleVentaModel from "../models/detalle_venta.model.js";

// Crear detalle de venta
export const crearDetalleVenta = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "El cuerpo de la solicitud no puede estar vacío." });
    }

    const detalle = {
        venta_id: req.body.venta_id,
        producto_id: req.body.producto_id,
        cantidad: req.body.cantidad,
        precio_unitario: req.body.precio_unitario
    };

    DetalleVentaModel.create(detalle, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Ocurrió un error al registrar el detalle de la venta."
            });
        }
        res.status(201).send(data);
    });
};

// Obtener todos los detalles
export const getDetallesVenta = (req, res) => {
    DetalleVentaModel.getAll((err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Error al obtener los detalles de venta."
            });
        }
        res.status(200).send(data);
    });
};

// Obtener un detalle por ID
export const getDetalleVenta = (req, res) => {
    DetalleVentaModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `No se encontró el detalle con ID ${req.params.id}` });
            }
            return res.status(500).send({ message: `Error al buscar el detalle con ID ${req.params.id}` });
        }
        res.status(200).send(data);
    });
};

// Modificar un detalle
export const modificarDetalleVenta = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "La solicitud está vacía." });
    }

    const detalle = {
        venta_id: req.body.venta_id,
        producto_id: req.body.producto_id,
        cantidad: req.body.cantidad,
        precio_unitario: req.body.precio_unitario
    };

    DetalleVentaModel.update(req.params.id, detalle, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `No se encontró el detalle con ID ${req.params.id}` });
            }
            return res.status(500).send({ message: `Error al actualizar el detalle con ID ${req.params.id}` });
        }
        res.status(200).send(data);
    });
};

// Eliminar un detalle
export const eliminarDetalleVenta = (req, res) => {
    DetalleVentaModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `No se encontró el detalle con ID ${req.params.id}` });
            }
            return res.status(500).send({ message: `No se pudo eliminar el detalle con ID ${req.params.id}` });
        }
        res.status(200).send({ message: "Detalle de venta eliminado exitosamente." });
    });
};
