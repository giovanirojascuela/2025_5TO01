// models/atencion.model.js
import conexion from "../config/conexion.js";

const AtencionModel = {};

// Crear nueva atención
AtencionModel.create = (data, result) => {
  conexion.query("INSERT INTO atencion_cliente SET ?", data, (err, res) => {
    if (err) {
      console.error("Error al insertar atención:", err);
      result(err, null);
      return;
    }
    result(null, { id_atencion: res.insertId, ...data });
  });
};

// Obtener todas las atenciones
AtencionModel.getAll = (result) => {
  conexion.query("SELECT * FROM atencion_cliente", (err, res) => {
    if (err) {
      console.error("Error al obtener atenciones:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Obtener atención por ID
AtencionModel.findById = (id, result) => {
  conexion.query("SELECT * FROM atencion_cliente WHERE id_atencion = ?", [id], (err, res) => {
    if (err) {
      console.error("Error al buscar atención:", err);
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

// Actualizar atención por ID
AtencionModel.updateById = (id, data, result) => {
  const query = "UPDATE atencion_cliente SET id_cliente = ?, motivo = ?, respuesta = ?, estado = ? WHERE id_atencion = ?";
  conexion.query(query, [data.id_cliente, data.motivo, data.respuesta, data.estado, id], (err, res) => {
    if (err) {
      console.error("Error al actualizar atención:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, { id_atencion: id, ...data });
    }
  });
};

// Eliminar atención por ID
AtencionModel.remove = (id, result) => {
  conexion.query("DELETE FROM atencion_cliente WHERE id_atencion = ?", [id], (err, res) => {
    if (err) {
      console.error("Error al eliminar atención:", err);
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

export default AtencionModel;