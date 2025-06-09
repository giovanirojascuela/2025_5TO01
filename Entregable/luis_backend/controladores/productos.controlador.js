import ProductoModel from "../models/productos.model.js";

export const crearProducto = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Los datos del producto no pueden estar vacíos." });
    }

    const producto = new ProductoModel({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion || null,
        precio: req.body.precio,
        stock: req.body.stock
    });

    ProductoModel.create(producto, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Error al crear el producto." });
        }
        res.status(201).send(data);
    });
};

export const getProductos = (req, res) => {
    ProductoModel.getAll((err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message || "Error al obtener los productos." });
        }
        res.status(200).send(data);
    });
};

export const getProducto = (req, res) => {
    ProductoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Producto con id ${req.params.id} no encontrado.` });
            }
            return res.status(500).send({ message: `Error al buscar el producto con id ${req.params.id}` });
        }
        res.status(200).send(data);
    });
};

export const modificarProducto = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Los datos de actualización no pueden estar vacíos." });
    }

    ProductoModel.updateById(req.params.id, new ProductoModel(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Producto con id ${req.params.id} no encontrado.` });
            }
            return res.status(500).send({ message: `Error al actualizar el producto con id ${req.params.id}` });
        }
        res.status(200).send(data);
    });
};

export const eliminarProducto = (req, res) => {
    ProductoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({ message: `Producto con id ${req.params.id} no encontrado.` });
            }
            return res.status(500).send({ message: `No se pudo eliminar el producto con id ${req.params.id}` });
        }
        res.status(200).send({ message: "Producto eliminado correctamente." });
    });
};