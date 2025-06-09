import conexion from "./conexion.js"; 

const ProductoModel = function(producto) {
    this.nombre = producto.nombre;
    this.descripcion = producto.descripcion;
    this.precio = producto.precio;
    this.stock = producto.stock;
};

ProductoModel.create = (nuevoProducto, result) => {
    conexion.query("INSERT INTO productos SET ?", nuevoProducto, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...nuevoProducto });
    });
};

ProductoModel.getAll = (result) => {
    conexion.query("SELECT * FROM productos", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

ProductoModel.updateById = (id, producto, result) => {
    conexion.query(
        "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?",
        [producto.nombre, producto.descripcion, producto.precio, producto.stock, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id, ...producto });
        }
    );
};

ProductoModel.remove = (id, result) => {
    conexion.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

export default ProductoModel;
