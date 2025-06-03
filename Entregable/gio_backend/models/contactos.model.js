// models/contactos.model.js
import conexion from "./conexion.js"; // Certifique-se de que o caminho está correto

const ContactoModel = function(contacto) {
    this.nombre = contacto.nombre;
    this.apellido = contacto.apellido; // Assumindo que você tem 'apellido' no seu modelo
    this.profesion = contacto.profesion;
};

// Método para criar um novo contato
ContactoModel.create = (nuevoContacto, result) => { // Renomeado de 'crearNuevo' para 'create'
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

// Método para obter todos os contatos (ajustado para não usar 'titulo' se não for necessário)
ContactoModel.getAll = (result) => { // Removeu 'titulo' se ele não for usado para filtrar
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

// --- NOVOS MÉTODOS NECESSÁRIOS ---

// Método para obter um contato por ID
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
        // Não encontrou contato com o ID
        result({ kind: "not_found" }, null);
    });
};

// Método para atualizar um contato por ID
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
                // Não encontrou contato com o ID
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Contato atualizado: ", { id: id, ...contacto });
            result(null, { id: id, ...contacto });
        }
    );
};

// Método para remover um contato por ID
ContactoModel.remove = (id, result) => {
    conexion.query("DELETE FROM contactos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // Não encontrou contato com o ID
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Contato deletado com id: ", id);
        result(null, res);
    });
};

export default ContactoModel;