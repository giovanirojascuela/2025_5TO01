// models/productos.model.js
import conexion from "./conexion.js"; // Asegúrate de que el camino está correcto

const ProductoModel = function(producto) {
    this.nombre_producto = producto.nombre_producto;
    this.descripcion = producto.descripcion;
    this.precio_venta = producto.precio_venta;
    this.stock = producto.stock;
    // Eliminado: this.fecha_vencimiento = producto.fecha_vencimiento;
    this.marca = producto.marca;
    this.codigo_barras = producto.codigo_barras; // Asegurado para la nueva tabla
};

// --- MÉTODO PARA CREAR UN NUEVO PRODUCTO ---
ProductoModel.create = (nuevoProducto, result) => {
    // Inserta un nuevo producto en la tabla 'productos'
    conexion.query("INSERT INTO productos SET ?", nuevoProducto, (err, res) => {
        if (err) {
            console.log("error al crear producto: ", err);
            result(err, null);
            return;
        }
        // Retorna el ID del producto insertado junto con los datos del producto
        console.log("Producto creado: ", { id_producto: res.insertId, ...nuevoProducto });
        result(null, { id_producto: res.insertId, ...nuevoProducto });
    });
};

// --- MÉTODO PARA OBTENER TODOS LOS PRODUCTOS ---
ProductoModel.getAll = (result) => {
    // Selecciona todos los productos de la tabla 'productos'
    let query = "SELECT * FROM productos";
    conexion.query(query, (err, res) => {
        if (err) {
            console.log("error al obtener productos: ", err);
            result(err, null);
            return;
        }
        console.log("Productos: ", res);
        result(null, res);
    });
};

// --- MÉTODO PARA OBTENER UN PRODUCTO POR ID ---
ProductoModel.findById = (id, result) => {
    // Busca un producto específico por su 'id_producto'
    conexion.query(`SELECT * FROM productos WHERE id_producto = ${id}`, (err, res) => {
        if (err) {
            console.log("error al buscar producto por ID: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            // Si el producto es encontrado, lo retorna
            console.log("Producto encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Si no se encuentra el producto por ID 
        result({ kind: "not_found" }, null);
    });
};

// --- MÉTODO PARA ACTUALIZAR UN PRODUCTO POR ID ---
ProductoModel.updateById = (id, producto, result) => {
    // Actualiza los campos de un producto específico por su 'id_producto'
    conexion.query(
        // Consulta SQL para actualizar los campos, excluyendo fecha_vencimiento y asegurando codigo_barras
        "UPDATE productos SET nombre_producto = ?, descripcion = ?, precio_venta = ?, stock = ?, marca = ?, codigo_barras = ? WHERE id_producto = ?",
        [
            producto.nombre_producto,
            producto.descripcion,
            producto.precio_venta,
            producto.stock,
            producto.marca,
            producto.codigo_barras, // Asegurado aquí
            id
        ],
        (err, res) => {
            if (err) {
                console.log("error al actualizar producto: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                // Si ningún registro fue afectado, significa que el producto no fue encontrado
                result({ kind: "not_found" }, null);
                return;
            }
            // Retorna el producto actualizado
            console.log("Producto actualizado: ", { id_producto: id, ...producto });
            result(null, { id_producto: id, ...producto });
        }
    );
};

// --- MÉTODO PARA REMOVER UN PRODUCTO POR ID ---
ProductoModel.remove = (id, result) => {
    // Elimina el producto de la tabla 'productos' por su 'id_producto'
    conexion.query("DELETE FROM productos WHERE id_producto = ?", id, (err, res) => {
        if (err) {
            console.log("error al eliminar producto: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // Si ningún registro fue afectado, significa que el producto no fue encontrado
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Producto eliminado con id: ", id);
        result(null, res);
    });
};

export default ProductoModel;
