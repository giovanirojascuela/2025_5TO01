import contactoModel from "../models/contactos.model.js";

export const crearContacto = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Datos vacíos" });
  }

  const contacto = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    profesion: req.body.profesion,
  };

  contactoModel.create(contacto, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error al crear contacto",
      });
    }
    res.send(data);
  });
};

export const getContactos = (req, res) => {
  contactoModel.getAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error al obtener contactos",
      });
    }
    res.send(data);
  });
};

export const getContacto = (req, res) => {
  const id = req.params.id;
  contactoModel.getById(id, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error al obtener contacto",
      });
    }
    if (!data) {
      return res.status(404).send({ message: "Contacto no encontrado" });
    }
    res.send(data);
  });
};

export const modificarContacto = (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).send({ message: "Datos vacíos" });
  }

  contactoModel.updateById(id, req.body, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error al modificar contacto",
      });
    }
    res.send(data);
  });
};

export const eliminarContacto = (req, res) => {
  const id = req.params.id;
  contactoModel.remove(id, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Error al eliminar contacto",
      });
    }
    res.send({ message: "Contacto eliminado correctamente" });
  });
};
