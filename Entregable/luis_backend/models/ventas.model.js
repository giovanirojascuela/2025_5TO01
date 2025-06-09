import conexion from "./conexion.js";

const VentaModel = function (venta) {
    this.cliente_id = venta.cliente_id;
    this.total = venta.total;
};

VentaModel.create = (nuevaVenta, result) => {
    if (!nuevaVenta.cliente_id) {
        return result(new Error("cliente_id es requerido"), null);
    }

    conexion.query("INSERT INTO ventas SET ?", nuevaVenta, (err, res) => {
        if (err) return result(err, null);
        result(null, { id: res.insertId, ...nuevaVenta });
    });
};

VentaModel.createAsync = (nuevaVenta) => {
    return new Promise((resolve, reject) => {
        if (!nuevaVenta.cliente_id) {
            return reject(new Error("cliente_id es requerido"));
        }

        conexion.query("INSERT INTO ventas SET ?", nuevaVenta, (err, res) => {
            if (err) return reject(err);
            resolve({ id: res.insertId, ...nuevaVenta });
        });
    });
};

VentaModel.getAll = (result) => {
    const sql = `
        SELECT v.id, v.cliente_id, v.fecha, 
               IFNULL(SUM(dv.cantidad * dv.precio_unitario), 0) AS total,
               c.nombre AS cliente_nombre
        FROM ventas v
        LEFT JOIN detalle_venta dv ON v.id = dv.venta_id
        LEFT JOIN clientes c ON v.cliente_id = c.id
        GROUP BY v.id, v.cliente_id, v.fecha, c.nombre
        ORDER BY v.id DESC
    `;

    conexion.query(sql, (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};
VentaModel.findById = (id, result) => {
    const sql = `
        SELECT v.*, c.nombre AS cliente_nombre
        FROM ventas v
        LEFT JOIN clientes c ON v.cliente_id = c.id
        WHERE v.id = ?
    `;

    conexion.query(sql, [id], (err, res) => {
        if (err) return result(err, null);
        if (res.length === 0) return result({ kind: "not_found" }, null);
        result(null, res[0]);
    });
};

VentaModel.update = (id, venta, result) => {
    conexion.query(
        "UPDATE ventas SET cliente_id = ?, total = ? WHERE id = ?",
        [venta.cliente_id, venta.total, id],
        (err, res) => {
            if (err) return result(err, null);
            if (res.affectedRows === 0) return result({ kind: "not_found" }, null);
            result(null, { id, ...venta });
        }
    );
};

VentaModel.remove = (id, result) => {
    conexion.query("DELETE FROM ventas WHERE id = ?", [id], (err, res) => {
        if (err) return result(err, null);
        if (res.affectedRows === 0) return result({ kind: "not_found" }, null);
        result(null, res);
    });
};

export default VentaModel;
