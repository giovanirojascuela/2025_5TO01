import Contacto from '../models/contacto.js';

exports.create = (req, res) => {
    // Validar la solicitud
    if (!req.body) {
        res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    // Crear un nuevo contacto
    const contacto = new Contacto({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        profesion: req.body.profesion
    });

    // Guardar el contacto en la base de datos
    contacto.create(contacto, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error al crear el contacto."
            });
        } else {
            res.send(data);
        }
    });
};