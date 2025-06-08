// productos.controlador.js

import ProductoModel from "../models/productos.model.js";  // <- Importación corregida

// Obtener todos los productos
export const getProductos = (req, res) => {
    ProductoModel.getAll((err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Error al obtener los productos."
            });
        }
        res.status(200).send(data);
    });
};

// Obtener un producto por ID
export const getProducto = (req, res) => {
    ProductoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `No se encontró el producto con ID ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: `Error al obtener el producto con ID ${req.params.id}`
            });
        }
        res.status(200).send(data);
    });
};

// Crear un nuevo producto
export const crearProducto = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "El cuerpo de la solicitud no puede estar vacío." });
    }

    const producto = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion || null,
        precio: req.body.precio,
        stock: req.body.stock || 0
    };

    ProductoModel.create(producto, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Error al crear el producto."
            });
        }
        res.status(201).send(data);
    });
};

// Modificar un producto
export const modificarProducto = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Los datos de actualización no pueden estar vacíos." });
    }

    ProductoModel.updateById(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `No se encontró el producto con ID ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: `Error al actualizar el producto con ID ${req.params.id}`
            });
        }
        res.status(200).send(data);
    });
};

// Eliminar un producto
export const eliminarProducto = (req, res) => {
    ProductoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `No se encontró el producto con ID ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: `No se pudo eliminar el producto con ID ${req.params.id}`
            });
        }
        res.status(200).send({ message: "Producto eliminado exitosamente." });
    });
};
