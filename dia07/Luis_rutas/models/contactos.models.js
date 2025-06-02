import sql from "./conexion.js";

const Contacto = function(contacto) {
  this.nombre = contacto.nombre;
  this.apellido = contacto.apellido;
  this.profesion = contacto.profesion;
};

Contacto.create = (nuevoContacto, result) => {
  sql.query("INSERT INTO CONTACTOS SET ?", nuevoContacto, (err, res) => {
    if (err) {
      console.log("Error al crear contacto:", err);
      result(err, null);
      return;
    }
    console.log("Contacto creado:", { id: res.insertId, ...nuevoContacto });
    result(null, { id: res.insertId, ...nuevoContacto });
  });
};

Contacto.getAll = (result) => {
  sql.query("SELECT * FROM contactos", (err, res) => {
    if (err) {
      console.log("Error al obtener contactos:", err);
      result(err, null);
      return;
    }
    console.log("Contactos:", res);
    result(null, res);
  });
};

export default Contacto;
