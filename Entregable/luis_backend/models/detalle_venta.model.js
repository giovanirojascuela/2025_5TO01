import conexion from "./conexion.js";

const DetalleVentaModel = function(detalle) {
    this.venta_id = detalle.venta_id;
    this.producto_id = detalle.producto_id;
    this.cantidad = detalle.cantidad;
    this.precio_unitario = detalle.precio_unitario;
};

DetalleVentaModel.create = (nuevoDetalle, result) => {
    if (!nuevoDetalle.venta_id || !nuevoDetalle.producto_id || !nuevoDetalle.cantidad || !nuevoDetalle.precio_unitario) {
        return result(new Error("Faltan campos requeridos para detalle_venta."), null);
    }

    conexion.query("INSERT INTO detalle_venta SET ?", nuevoDetalle, (err, res) => {
        if (err) {
            console.error("[❌] Error al insertar detalle_venta:", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...nuevoDetalle });
    });
};

DetalleVentaModel.getAll = (result) => {
    conexion.query("SELECT * FROM detalle_venta", (err, res) => {
        if (err) {
            console.error("[❌] Error al obtener detalles:", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

DetalleVentaModel.findById = (id, result) => {
    conexion.query("SELECT * FROM detalle_venta WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.error(`[❌] Error al buscar detalle con ID ${id}:`, err);
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

DetalleVentaModel.update = (id, detalle, result) => {
    const { venta_id, producto_id, cantidad, precio_unitario } = detalle;

    conexion.query(
        `UPDATE detalle_venta 
         SET venta_id = ?, producto_id = ?, cantidad = ?, precio_unitario = ?
         WHERE id = ?`,
        [venta_id, producto_id, cantidad, precio_unitario, id],
        (err, res) => {
            if (err) {
                console.error(`[❌] Error al actualizar detalle con ID ${id}:`, err);
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            result(null, { id, ...detalle });
        }
    );
};

DetalleVentaModel.remove = (id, result) => {
    conexion.query("DELETE FROM detalle_venta WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.error(`[❌] Error al eliminar detalle con ID ${id}:`, err);
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
DetalleVentaModel.getByVentaId = (venta_id, result) => {
    const sql = `
        SELECT dv.id, dv.producto_id, p.nombre AS nombre_producto,
               dv.cantidad, dv.precio_unitario,
               (dv.cantidad * dv.precio_unitario) AS subtotal
        FROM detalle_venta dv
        JOIN productos p ON dv.producto_id = p.id
        WHERE dv.venta_id = ?
    `;

    conexion.query(sql, [venta_id], (err, res) => {
        if (err) {
            console.error(`[❌] Error al obtener detalles de venta_id ${venta_id}:`, err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

export default DetalleVentaModel;
