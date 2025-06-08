// models/detalleVentas.model.js
import conexion from "../config/conexion.js";

const DetalleVentaModel = {};

// Crear un nuevo detalle de venta
DetalleVentaModel.create = (detalle, result) => {
  const query = "INSERT INTO detalle_ventas SET ?";
  conexion.query(query, detalle, (err, res) => {
    if (err) {
      console.log("Error al insertar detalle:", err);
      result(err, null);
      return;
    }
    result(null, { id_detalle: res.insertId, ...detalle });
  });
};

// Obtener todos los detalles de venta
DetalleVentaModel.getAll = (result) => {
  conexion.query("SELECT * FROM detalle_ventas", (err, res) => {
    if (err) {
      console.log("Error al obtener detalles:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Obtener detalle por ID
DetalleVentaModel.findById = (id, result) => {
  conexion.query("SELECT * FROM detalle_ventas WHERE id_detalle = ?", [id], (err, res) => {
    if (err) {
      console.log("Error al buscar detalle:", err);
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

// Actualizar detalle por ID
DetalleVentaModel.updateById = (id, detalle, result) => {
  const query = "UPDATE detalle_ventas SET id_venta = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?";
  conexion.query(query, [detalle.id_venta, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, id], (err, res) => {
    if (err) {
      console.log("Error al actualizar:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, { id_detalle: id, ...detalle });
    }
  });
};

// Eliminar detalle por ID
DetalleVentaModel.remove = (id, result) => {
  conexion.query("DELETE FROM detalle_ventas WHERE id_detalle = ?", [id], (err, res) => {
    if (err) {
      console.log("Error al eliminar:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, res);
    }
  });
};

export default DetalleVentaModel;
