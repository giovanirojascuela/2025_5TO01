import conexion from "./conexion.js"; 

const ContactoModel = function(contacto) {
    this.nombre = contacto.nombre;
    this.apellido = contacto.apellido; 
    this.profesion = contacto.profesion;
};

ContactoModel.create = (nuevoContacto, result) => { 
    conexion.query("INSERT INTO contactos SET ?", nuevoContacto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Contato criado: ", { id: res.insertId, ...nuevoContacto });
        result(null, { id: res.insertId, ...nuevoContacto });
    });
};

ContactoModel.getAll = (result) => { 
    let query = "SELECT * FROM contactos";
    conexion.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Contatos: ", res);
        result(null, res);
    });
};

ContactoModel.findById = (id, result) => {
    conexion.query(`SELECT * FROM contactos WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Contato encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

ContactoModel.updateById = (id, contacto, result) => {
    conexion.query(
        "UPDATE contactos SET nombre = ?, apellido = ?, profesion = ? WHERE id = ?",
        [contacto.nombre, contacto.apellido, contacto.profesion, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Contato atualizado: ", { id: id, ...contacto });
            result(null, { id: id, ...contacto });
        }
    );
};

ContactoModel.remove = (id, result) => {
    conexion.query("DELETE FROM contactos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Contato deletado com id: ", id);
        result(null, res);
    });
};

export default ContactoModel;