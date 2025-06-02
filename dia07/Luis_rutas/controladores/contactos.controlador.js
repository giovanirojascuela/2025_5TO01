import database from "../config/database.js";
import Contacto from "../models/contactos.models.js"; 

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "vacio" });
    return;
  }

  const nuevoContacto = new Contacto({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    profesion: req.body.profesion
  });

  Contacto.create(nuevoContacto, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "error" });
    } else {
      res.send(data);
    }
  });
};


exports.buscarAll = (req, res) => {
  Contacto.getAll((err, data) => { 
    if (err) {
      res.status(500).send({ message: err.message || "error" });
    } else {
      res.send(data);
    }
  });
};

