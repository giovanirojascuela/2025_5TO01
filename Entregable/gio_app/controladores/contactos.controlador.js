import ContactoModel from  "../models/contactos.model.js";
//const Contacto=require("../models/contactos.model");
export const create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"vacio"});
    }
    const contacto=new Contacto({
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        profesion:req.body.profesion
    });
    ContactoModel.create(contacto,(err,data)=>{
        if(err)
            res.status(500).send({message:
                err.message||"error"
        });
        else res.send(data);
    });
};
export const buscarAll=(req,res)=>{
    const titulo="";
    ContactoModel.getAll(titulo,(err,data)=>{
        if(err) res.status(500).send({
            message:
                err.message||"error"
            });
        else res.send(data);
    });
};
