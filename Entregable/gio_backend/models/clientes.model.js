import conexion from "../config/conexion.js";

const ClienteModel = function(cliente) {
    this.nombre = cliente.nombre;
    this.correo = cliente.correo;
    this.telefono = cliente.telefono;
    this.direccion = cliente.direccion;
};

// Crear nuevo cliente
ClienteModel.create = (nuevoCliente, result) => {
    conexion.query("INSERT INTO clientes SET ?", nuevoCliente, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Cliente creado: ", { id_cliente: res.insertId, ...nuevoCliente });
        result(null, { id_cliente: res.insertId, ...nuevoCliente });
    });
};

// Obtener todos los clientes
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

// Obtener cliente por ID
ClienteModel.findById = (id, result) => {
    conexion.query("SELECT * FROM clientes WHERE id_cliente = ?", [id], (err, res) => {
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

// Actualizar cliente por ID
ClienteModel.updateById = (id, cliente, result) => {
    conexion.query(
        "UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id_cliente = ?",
        [cliente.nombre, cliente.correo, cliente.telefono, cliente.direccion, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id_cliente: id, ...cliente });
        }
    );
};

// Eliminar cliente por ID
ClienteModel.remove = (id, result) => {
    conexion.query("DELETE FROM clientes WHERE id_cliente = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

export default ClienteModel;
