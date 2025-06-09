import VentaModel from "../models/ventas.model.js";
import DetalleVentaModel from "../models/detalle_venta.model.js";
import conexion from "../models/conexion.js";

export const crearVenta = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ message: "La solicitud no puede estar vacía." });
        }

        const { cliente_id, detalles } = req.body;
        const venta = { cliente_id, total: 0 };

        VentaModel.create(venta, async (err, ventaData) => {
            if (err) {
                return res.status(500).send({ message: err.message || "Error al registrar la venta." });
            }

            const ventaId = ventaData.id;
            let totalCalculado = 0;
            const detallesProcesados = [];

            try {
                for (const detalle of detalles) {
                    const subtotal = detalle.cantidad * detalle.precio_unitario;
                    totalCalculado += subtotal;

                    // Verificar stock actual
                    const [producto] = await new Promise((resolve, reject) => {
                        conexion.query("SELECT stock FROM productos WHERE id = ?", [detalle.producto_id], (err, res) => {
                            if (err) reject(err);
                            else resolve(res);
                        });
                    });

                    if (!producto) {
                        throw new Error(`Producto con ID ${detalle.producto_id} no existe.`);
                    }

                    if (producto.stock < detalle.cantidad) {
                        throw new Error(`Stock insuficiente para producto ID ${detalle.producto_id}.`);
                    }

                    await new Promise((resolve, reject) => {
                        conexion.query(
                            "UPDATE productos SET stock = stock - ? WHERE id = ?",
                            [detalle.cantidad, detalle.producto_id],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });

                    const detalleVenta = {
                        venta_id: ventaId,
                        producto_id: detalle.producto_id,
                        cantidad: detalle.cantidad,
                        precio_unitario: detalle.precio_unitario,
                    };

                    const detalleGuardado = await new Promise((resolve, reject) => {
                        DetalleVentaModel.create(detalleVenta, (err, data) => {
                            if (err) reject(err);
                            else resolve(data);
                        });
                    });

                    detallesProcesados.push(detalleGuardado);
                }

                VentaModel.update(ventaId, { total: totalCalculado }, (err3) => {
                    if (err3) {
                        return res.status(500).send({ message: "Error al actualizar el total de la venta." });
                    }

                    res.status(201).send({
                        id: ventaId,
                        cliente_id,
                        total: totalCalculado,
                        detalles: detallesProcesados
                    });
                });
            } catch (detalleError) {
                return res.status(500).send({ message: "Error en detalle de venta.", error: detalleError.message });
            }
        });
    } catch (error) {
        return res.status(500).send({ message: "Error interno al registrar la venta.", error: error.message });
    }
};

export const getVentas = (req, res) => {
    VentaModel.getAll((err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Error al obtener las ventas." });
        }
        res.status(200).send(data);
    });
};

export const getVenta = (req, res) => {
    const id = req.params.id;

    VentaModel.findById(id, (err, venta) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `No se encontró la venta con ID ${id}` });
            }
            return res.status(500).send({ message: `Error al buscar la venta con ID ${id}` });
        }

        DetalleVentaModel.getByVentaId(id, (err2, detalles) => {
            if (err2) {
                return res.status(500).send({ message: "Error al obtener los detalles de la venta." });
            }

            if (venta.total == null && detalles && detalles.length > 0) {
                venta.total = detalles.reduce((sum, d) => sum + d.cantidad * d.precio_unitario, 0);
            }

            res.status(200).send({
                ...venta,
                detalles: detalles || []
            });
        });
    });
};

export const modificarVenta = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "La solicitud está vacía." });
    }

    const venta = {
        cliente_id: req.body.cliente_id,
        total: req.body.total
    };

    VentaModel.update(req.params.id, venta, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `No se encontró la venta con ID ${req.params.id}` });
            }
            return res.status(500).send({ message: `Error al actualizar la venta con ID ${req.params.id}` });
        }

        res.status(200).send(data);
    });
};

export const eliminarVenta = (req, res) => {
    VentaModel.remove(req.params.id, (err) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `No se encontró la venta con ID ${req.params.id}` });
            }
            return res.status(500).send({ message: `No se pudo eliminar la venta con ID ${req.params.id}` });
        }

        res.status(200).send({ message: "Venta eliminada con éxito." });
    });
};
