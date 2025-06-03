import ContactoModel from "../models/contactos.model.js";

// --- CRIAR CONTATO ---
export const crearContacto = (req, res) => {
    // Validação se o corpo da requisição está vazio ou incompleto
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "O corpo da requisição não pode ser vazio!" });
    }

    // Crie uma instância do ContactoModel com os dados do corpo da requisição
    // As chaves do objeto devem corresponder às propriedades do seu ContactoModel
    const contacto = new ContactoModel({ // <-- Corrigido aqui: use ContactoModel
        nombre: req.body.nombre,
        apellido: req.body.apellido || null, // Inclua 'apellido' se for parte do seu modelo, pode ser opcional
        profesion: req.body.profesion
    });

    // Chama o método 'create' do modelo
    ContactoModel.create(contacto, (err, data) => {
        if (err) {
            // Se houver um erro, envia um status 500 com a mensagem de erro
            return res.status(500).send({
                message: err.message || "Ocorreu algum erro ao criar o contato."
            });
        }
        // Se sucesso, envia o novo contato com status 201 Created
        res.status(201).send(data);
    });
};

// --- OBTER TODOS OS CONTATOS ---
export const getContactos = (req, res) => {
    // Não é necessário passar 'titulo' se getAll não usa para filtrar
    ContactoModel.getAll((err, data) => { // <-- Removido 'titulo' daqui
        if (err) {
            // Se houver um erro, envia um status 500
            return res.status(500).send({
                message: err.message || "Ocorreu algum erro ao buscar os contatos."
            });
        }
        // Se sucesso, envia a lista de contatos
        res.status(200).send(data);
    });
};

// --- OBTER UM CONTATO POR ID ---
export const getContacto = (req, res) => {
    // <-- CORRIGIDO: Agora usa req.params.id e ContactoModel.findById
    ContactoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                // Se o contato não for encontrado, envia um status 404
                return res.status(404).send({
                    message: `Não encontrado contato com id ${req.params.id}.`
                });
            }
            // Se houver outro tipo de erro, envia um status 500
            return res.status(500).send({
                message: "Erro ao buscar contato com id " + req.params.id
            });
        }
        // Se sucesso, envia o contato encontrado
        res.status(200).send(data);
    });
};

// --- MODIFICAR (ATUALIZAR) CONTATO ---
export const modificarContacto = (req, res) => {
    // Validação se o corpo da requisição está vazio
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Dados para atualização não podem ser vazios!" });
    }

    // Chama o método 'updateById' do modelo
    ContactoModel.updateById(
        req.params.id, // <-- Pega o ID da URL
        new ContactoModel(req.body), // <-- Cria uma nova instância com os dados do corpo
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    // Se o contato não for encontrado, envia um status 404
                    return res.status(404).send({
                        message: `Não encontrado contato com id ${req.params.id}.`
                    });
                }
                // Se houver outro tipo de erro, envia um status 500
                return res.status(500).send({
                    message: "Erro ao atualizar contato com id " + req.params.id
                });
            }
            // Se sucesso, envia o contato atualizado
            res.status(200).send(data);
        }
    );
};

// --- ELIMINAR (DELETAR) CONTATO ---
export const eliminarContacto = (req, res) => {
    // <-- CORRIGIDO: Agora usa req.params.id
    ContactoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                // Se o contato não for encontrado, envia um status 404
                return res.status(404).send({
                    message: `Não encontrado contato com id ${req.params.id}.`
                });
            }
            // Se houver outro tipo de erro, envia um status 500
            return res.status(500).send({
                message: "Não foi possível deletar o contato com id " + req.params.id
            });
        }
        // Se sucesso, envia uma mensagem de sucesso
        res.status(200).send({ message: `Contato deletado com sucesso!` });
    });
};