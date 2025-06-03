import ContactoModel from "../models/contactos.model.js";

export const crearContacto= (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "vacio" });
    }
    const contacto = new ContactoModel({
        nombre: req.body.nombre,
        apellido: req.body.apellidos,
        profesion: req.body.profesion
    });
    ContactoModel.create(contacto, (err, data) => {
        if (err)
            res.status(500).send({message:
                err.message || "error"
        });
        else res.send(data);
    });
};

export const getContactos=(req,res)=>{
    ContactoModel.getAll((err,data)=>{
        if(err){
            return res.status(500).send({
                message: err.message||"error"
                });
        }
        res.status(200).send(data);
    });
};
//getContactos, getContacto, crearcontacto, modificarContacto, eliminarContacto
export const getContacto=(req,res)=>{
    ContactoModel.getAll((err,data)=>{
        if(err){
            return res.status(500).send({
                message: err.message||"error"
                });
        }
        res.status(200).send(data);
    });
};
export const crearcontactos=(req,res)=>{
    ContactoModel.getAll((err,data)=>{
        if(err){
            return res.status(500).send({
                message: err.message||"error"
                });
        }
        res.status(200).send(data);
    });
};
export const modificarContactos=(req,res)=>{
    ContactoModel.getAll((err,data)=>{
        if(err){
            return res.status(500).send({
                message: err.message||"error"
                });
        }
        res.status(200).send(data);
    });
};
export const eliminarContactos=(req,res)=>{
    ContactoModel.getAll((err,data)=>{
        if(err){
            return res.status(500).send({
                message: err.message||"error"
                });
        }
        res.status(200).send(data);
    });
};
