import ClienteModel from "../models/clientes.model.js";

export const crearCliente = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "El cuerpo de la solicitud no puede estar vacío." });
    }

    const cliente = new ClienteModel({ 
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    email: req.body.email
});
    ClienteModel.create(cliente, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Ocurrió un error al crear el cliente."
            });
        }
        res.status(201).send(data);
    });
};

export const getClientes = (req, res) => {
    ClienteModel.getAll((err, data) => { 
        if (err) {
            return res.status(500).send({
                message: err.message || "Ocurrió un error al obtener los clientes."
            });
        }
        res.status(200).send(data);
    });
};

export const getCliente = (req, res) => {
    ClienteModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `No se encontró el cliente con ID ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: "Error al obtener cliente con ID " + req.params.id
            });
        }
        res.status(200).send(data);
    });
};

export const modificarCliente = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Los datos para actualizar no pueden estar vacíos." });
    }

    ClienteModel.updateById(
        req.params.id, 
        new ClienteModel(req.body), 
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `No se encontró el cliente con ID ${req.params.id}.`
                    });
                }
                return res.status(500).send({
                    message: "Error al actualizar cliente con ID " + req.params.id
                });
            }
            res.status(200).send(data);
        }
    );
};

export const eliminarCliente = (req, res) => {
    ClienteModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `No se encontró el cliente con ID ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: "No se pudo eliminar el cliente con ID " + req.params.id
            });
        }
        res.status(200).send({ message: `¡Cliente eliminado con éxito!` });
    });
};
