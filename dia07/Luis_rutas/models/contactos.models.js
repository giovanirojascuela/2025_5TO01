import conexion from "./conexion.js";

const contactoModel = function(contacto) {
  this.nombre = contacto.nombre;
  this.apellido = contacto.apellido;
  this.profesion = contacto.profesion;
};

contactoModel.crearNuevo = (nuevoContacto, result) => {
  conexion.query("INSERT INTO CONTACTOS SET ?", nuevoContacto, (err, res) => {
    if (err) {
      console.log("Error al crear contacto:", err);
      result(err, null);
      return;
    }
    console.log("Contacto creado:", { id: res.insertId, ...nuevoContacto });
    result(null, { id: res.insertId, ...nuevoContacto });
  });
};

contactoModel.getAll = (result) => {
  conexion.query("SELECT * FROM CONTACTOS", (err, res) => {
    if (err) {
      console.log("Error al obtener contactos:", err);
      result(err, null);
      return;
    }
    console.log("Contactos:", res);
    result(null, res);
  });
};

export default contactoModel;

