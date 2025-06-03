import conexion from "./conexion.js";

const ContactoModel = function(contacto) {
  this.nombre = contacto.nombre;
  this.apellidos = contacto.apellidos;  // fijate que coincida con el campo correcto
  this.profesion = contacto.profesion;
};

ContactoModel.crearNuevo = (nuevoContacto, result) => {
  conexion.query("INSERT INTO contactos SET ?", nuevoContacto, (err, res) => {
    if (err) {
      console.error("Error al crear contacto:", err);
      return result(err, null);
    }
    console.log("Contacto creado:", { id: res.insertId, ...nuevoContacto });
    result(null, { id: res.insertId, ...nuevoContacto });
  });
};

ContactoModel.getAll = (result) => {
  const query = "SELECT * FROM contactos";
  conexion.query(query, (err, res) => {
    if (err) {
      console.error("Error al obtener contactos:", err);
      return result(err, null);
    }
    console.log("Contactos obtenidos:", res);
    result(null, res);
  });
};

ContactoModel.getById = (id, result) => {
  const query = "SELECT * FROM contactos WHERE id = ?";
  conexion.query(query, id, (err, res) => {
    if (err) {
      console.error("Error al obtener contacto por ID:", err);
      return result(err, null);
    }
    if (res.length) {
      result(null, res[0]);
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

ContactoModel.updateById = (id, contacto, result) => {
  const query = "UPDATE contactos SET nombre = ?, apellidos = ?, profesion = ? WHERE id = ?";
  conexion.query(query, [contacto.nombre, contacto.apellidos, contacto.profesion, id], (err, res) => {
    if (err) {
      console.error("Error al actualizar contacto:", err);
      return result(err, null);
    }
    if (res.affectedRows === 0) {
      // no se encontró el contacto
      return result({ kind: "not_found" }, null);
    }
    result(null, { id, ...contacto });
  });
};

ContactoModel.remove = (id, result) => {
  const query = "DELETE FROM contactos WHERE id = ?";
  conexion.query(query, id, (err, res) => {
    if (err) {
      console.error("Error al eliminar contacto:", err);
      return result(err, null);
    }
    if (res.affectedRows === 0) {
      // no se encontró el contacto
      return result({ kind: "not_found" }, null);
    }
    result(null, res);
  });
};

export default ContactoModel;
