// models/ventas.model.js
import conexion from "../config/conexion.js";

const VentaModel = {};

// Crear nueva venta
VentaModel.create = (venta, result) => {
    const query = "INSERT INTO ventas SET ?";
    conexion.query(query, venta, (err, res) => {
        if (err) {
            console.error("Error al crear venta:", err);
            result(err, null);
            return;
        }
        result(null, { id_venta: res.insertId, ...venta });
    });
};

// Obtener todas las ventas
VentaModel.getAll = (result) => {
    conexion.query("SELECT * FROM ventas", (err, res) => {
        if (err) {
            console.error("Error al obtener ventas:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Obtener una venta por ID
VentaModel.findById = (id, result) => {
    conexion.query("SELECT * FROM ventas WHERE id_venta = ?", [id], (err, res) => {
        if (err) {
            console.error("Error al buscar venta:", err);
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

// Actualizar una venta por ID
VentaModel.updateById = (id, venta, result) => {
    const query = "UPDATE ventas SET id_cliente = ?, total = ? WHERE id_venta = ?";
    conexion.query(query, [venta.id_cliente, venta.total, id], (err, res) => {
        if (err) {
            console.error("Error al actualizar venta:", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id_venta: id, ...venta });
    });
};

// Eliminar una venta por ID
VentaModel.remove = (id, result) => {
    conexion.query("DELETE FROM ventas WHERE id_venta = ?", [id], (err, res) => {
        if (err) {
            console.error("Error al eliminar venta:", err);
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

export default VentaModel;
