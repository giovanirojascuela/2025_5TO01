import database from "../config/database.js";
import contactoModel from "../models/contactos.models.js"; 

export const crearContacto = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "vacio" });
  }

  const nuevoContacto = new contactoModel({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    profesion: req.body.profesion
  });

  contactoModel.create(contacto, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "error" });
    } else {
      res.send(data);
    }
  });
};

export const getContactos = (req, res) => {
  contactoModel.getAll((err, data) => { 
    if (err) {
      return res.status(500).send({ message: err.message || "error" });
    } 
      res.status(200).send(data); 
  });
};
export const getContacto = (req, res) => {
  contactoModel.getAll((err, data) => { 
    if (err) {
      return res.status(500).send({ message: err.message || "error" });
    } 
      res.status(200).send(data); 
  });
};
export const modificarContacto = (req, res) => {
  contactoModel.getAll((err, data) => { 
    if (err) {
      return res.status(500).send({ message: err.message || "error" });
    } 
      res.status(200).send(data); 
  });
};
export const eliminarContacto = (req, res) => {
  contactoModel.getAll((err, data) => { 
    if (err) {
      return res.status(500).send({ message: err.message || "error" });
    } 
      res.status(200).send(data); 
  });
};

