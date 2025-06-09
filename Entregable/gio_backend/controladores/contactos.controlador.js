import ContactoModel from "../models/contactos.model.js";

export const crearContacto = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "O corpo da requisição não pode ser vazio!" });
    }

    const contacto = new ContactoModel({ 
        nombre: req.body.nombre,
        apellido: req.body.apellido || null,
        profesion: req.body.profesion
    });

    ContactoModel.create(contacto, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Ocorreu algum erro ao criar o contato."
            });
        }
        res.status(201).send(data);
    });
};

export const getContactos = (req, res) => {
    ContactoModel.getAll((err, data) => { 
        if (err) {
            return res.status(500).send({
                message: err.message || "Ocorreu algum erro ao buscar os contatos."
            });
        }
        res.status(200).send(data);
    });
};

export const getContacto = (req, res) => {
    ContactoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Não encontrado contato com id ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: "Erro ao buscar contato com id " + req.params.id
            });
        }
        res.status(200).send(data);
    });
};

export const modificarContacto = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Dados para atualização não podem ser vazios!" });
    }

    ContactoModel.updateById(
        req.params.id, 
        new ContactoModel(req.body), 
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Não encontrado contato com id ${req.params.id}.`
                    });
                }
                return res.status(500).send({
                    message: "Erro ao atualizar contato com id " + req.params.id
                });
            }
            res.status(200).send(data);
        }
    );
};

export const eliminarContacto = (req, res) => {
    ContactoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Não encontrado contato com id ${req.params.id}.`
                });
            }
            return res.status(500).send({
                message: "Não foi possível deletar o contato com id " + req.params.id
            });
        }
        res.status(200).send({ message: `Contato deletado com sucesso!` });
    });
};