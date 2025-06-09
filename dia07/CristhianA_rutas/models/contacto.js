import sql from "./conexion.js"

const Contacto = function (contacto) { 
    this.nombre = contacto.nombre;
    this.apellido = contacto.apellido;
    this.profesion = contacto.profesion;
 }
 contacto.crearNuevo = (nuevoContacto, result) => {
    sql.query("INSERT INTO contactos SET ?", nuevoContacto, (err, res) => {
        if (err) {
            console.log("Error al insertar el contacto: ", err);
            result(err, null);
            return;
        }
        console.log("Creando contacto:",{});
        result(null, { id: res.insertId, ...nuevoContacto });
    });
};
module.exports = Contacto;