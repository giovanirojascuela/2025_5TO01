import database from "../config/database.js";
import contacto from "../models/contactos.models.js";

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "vacio" });
    return;
  }

  const contacto = new Contacto({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    profesion: req.body.profesion
  });

  Contacto.create(contacto, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "error" });
    } else {
      res.send(data);
    }
  });
};
