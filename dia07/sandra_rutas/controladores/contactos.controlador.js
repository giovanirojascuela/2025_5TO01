import ContactoModel from "../models/contactos.model.js";

export const crearContacto = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "vacio" });
  }

  const contacto = new ContactoModel({
    nombre: req.body.nombre,
    apellido: req.body.apellidos, // corrige nombre de campo
    profesion: req.body.profesion,
  });

  ContactoModel.crearNuevo(contacto, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "error" });
    } else {
      res.send(data);
    }
  });
};

export const getContactos = (req, res) => {
  ContactoModel.getAll(null, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "error",
      });
    }
    res.status(200).send(data);
  });
};

// Métodos por implementar correctamente:
export const getContacto = (req, res) => {
  res.status(501).send({ message: "No implementado aún" });
};

export const modificarContacto = (req, res) => {
  res.status(501).send({ message: "No implementado aún" });
};

export const eliminarContacto = (req, res) => {
  res.status(501).send({ message: "No implementado aún" });
};
