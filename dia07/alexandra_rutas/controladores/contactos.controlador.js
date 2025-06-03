import ContactoModel from "../models/contactos.model.js";

export const crearContacto = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "vacio" });
  }
  const contacto = new ContactoModel({
    nombre: req.body.nombre,
    apellido: req.body.apellido,  // corregido apellidos → apellido
    profesion: req.body.profesion,
  });
  ContactoModel.crearNuevo(contacto, (err, data) => {  // cambiar create → crearNuevo
    if (err)
      res.status(500).send({
        message: err.message || "error",
      });
    else res.send(data);
  });
};

// Aquí pasamos null como primer argumento porque tu getAll espera un "titulo" (que no usas)
export const getContactos = (req, res) => {
  ContactoModel.getAll(null, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "error",
      });
      return;
    }
    res.status(200).send(data);
  });
};

// Por ahora getContacto hace lo mismo que getContactos
export const getContacto = (req, res) => {
  ContactoModel.getAll(null, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "error",
      });
      return;
    }
    res.status(200).send(data);
  });
};

// Igual que arriba, solo responde con todos (deberías cambiar luego)
export const modificarContacto = (req, res) => {
  ContactoModel.getAll(null, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "error",
      });
      return;
    }
    res.status(200).send(data);
  });
};

// Igual que arriba, solo responde con todos (deberías cambiar luego)
export const eliminarContacto = (req, res) => {
  ContactoModel.getAll(null, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "error",
      });
      return;
    }
    res.status(200).send(data);
  });
};
