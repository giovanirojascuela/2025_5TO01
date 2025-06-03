import conexion from "./conexion.js";

const ContactoModel = function (contacto) {
  this.nombre = contacto.nombre;
  this.apellido = contacto.apellido;
  this.profesion = contacto.profesion;
};

ContactoModel.crearNuevo = (nuevoContacto, callback) => {
  conexion.query("INSERT INTO contactos SET ?", nuevoContacto, (err, res) => {
    if (err) {
      console.log("Error al insertar:", err);
      callback(err, null);
      return;
    }

    console.log("Contacto creado:", { id: res.insertId, ...nuevoContacto });
    callback(null, { id: res.insertId, ...nuevoContacto });
  });
};

ContactoModel.getAll = (titulo, callback) => {
  conexion.query("SELECT * FROM contactos", (err, res) => {
    if (err) {
      console.error("Error en la consulta:", err);
      callback(err, null);
      return;
    }

    console.log("Contactos:", res);
    callback(null, res);
  });
};

export default ContactoModel;
