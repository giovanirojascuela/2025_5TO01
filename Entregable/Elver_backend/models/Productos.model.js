// models/productos.model.js
import conexion from "../config/conexion.js";

const ProductoModel = function(producto) {
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.precio = producto.precio;
    this.stock = producto.stock;
};

// Crear producto
ProductoModel.create = (nuevoProducto, result) => {
    conexion.query("INSERT INTO productos SET ?", nuevoProducto, (err, res) => {
        if (err) {
            console.log("Error al insertar producto:", err);
            result(err, null);
            return;
        }
        result(null, { id_producto: res.insertId, ...nuevoProducto });
    });
};

// Obtener todos los productos
ProductoModel.getAll = (result) => {
    conexion.query("SELECT * FROM productos", (err, res) => {
        if (err) {
            console.log("Error al obtener productos:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Obtener producto por ID
ProductoModel.findById = (id, result) => {
    conexion.query("SELECT * FROM productos WHERE id_producto = ?", [id], (err, res) => {
        if (err) {
            console.log("Error al buscar producto:", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};

// Actualizar producto por ID
ProductoModel.updateById = (id, producto, result) => {
    conexion.query(
        "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?",
        [producto.nombre, producto.descripcion, producto.precio, producto.stock, id],
        (err, res) => {
            if (err) {
                console.log("Error al actualizar producto:", err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id_producto: id, ...producto });
        }
    );
};

// Eliminar producto por ID
ProductoModel.remove = (id, result) => {
    conexion.query("DELETE FROM productos WHERE id_producto = ?", [id], (err, res) => {
        if (err) {
            console.log("Error al eliminar producto:", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

export default ProductoModel;