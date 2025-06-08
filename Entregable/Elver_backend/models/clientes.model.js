import conexion from "../config/conexion.js";  // Aquí se debe importar la conexión

const ClienteModel = {};

// Crear cliente
ClienteModel.create = (cliente, result) => {
  const query = "INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)";
  conexion.query(query, [cliente.nombre, cliente.correo, cliente.telefono, cliente.direccion], (err, res) => {
    if (err) {
      console.error("Error al crear el cliente:", err);
      result(err, null);
      return;
    }
    result(null, { id_cliente: res.insertId, ...cliente });
  });
};

// Obtener todos los clientes
ClienteModel.getAll = (result) => {
  const query = "SELECT * FROM clientes";  // Asegúrate de que `nombre` esté correctamente referenciado
  conexion.query(query, (err, res) => {
    if (err) {
      console.error("Error al obtener los clientes:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Obtener un cliente por ID
ClienteModel.findById = (id, result) => {
  const query = "SELECT * FROM clientes WHERE id_cliente = ?";
  conexion.query(query, [id], (err, res) => {
    if (err) {
      console.error("Error al buscar cliente:", err);
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

// Modificar cliente por ID
ClienteModel.updateById = (id, cliente, result) => {
  const query = "UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id_cliente = ?";
  conexion.query(query, [cliente.nombre, cliente.correo, cliente.telefono, cliente.direccion, id], (err, res) => {
    if (err) {
      console.error("Error al actualizar el cliente:", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
    } else {
      result(null, { id_cliente: id, ...cliente });
    }
  });
};

// Eliminar cliente por ID
ClienteModel.remove = (id, result) => {
  const query = "DELETE FROM clientes WHERE id_cliente = ?";
  conexion.query(query, [id], (err, res) => {
    if (err) {
      console.error("Error al eliminar el cliente:", err);
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

export default ClienteModel;
