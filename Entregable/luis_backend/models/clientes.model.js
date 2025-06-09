import conexion from "./conexion.js"; 

const ClienteModel = function(cliente) {
    this.nombre = cliente.nombre;
    this.direccion = cliente.direccion;
    this.telefono = cliente.telefono;
    this.email = cliente.email;
};

ClienteModel.create = (nuevoCliente, result) => { 
    conexion.query("INSERT INTO clientes SET ?", nuevoCliente, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Cliente creado: ", { id: res.insertId, ...nuevoCliente });
        result(null, { id: res.insertId, ...nuevoCliente });
    });
};

ClienteModel.getAll = (result) => { 
    conexion.query("SELECT * FROM clientes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

ClienteModel.findById = (id, result) => {
    conexion.query("SELECT * FROM clientes WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

ClienteModel.updateById = (id, cliente, result) => {
    conexion.query(
        "UPDATE clientes SET nombre = ?, direccion = ?, telefono = ?, email = ? WHERE id = ?",
        [cliente.nombre, cliente.direccion, cliente.telefono, cliente.email, id],
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
            result(null, { id: id, ...cliente });
        }
    );
};

ClienteModel.remove = (id, result) => {
    conexion.query("DELETE FROM clientes WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

export default ClienteModel;
