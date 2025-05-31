import Contacto from "../models/contactos.js";

exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"vacio"});

    }
    const contacto=new Contacto({
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        profesion:req.body.profesion
    });
    Contacto.create(contacto,(err,data)=>{
        if(err)
            res.status(500).send({message:
        err.message||"error"
    });
    else res.send(data);
    });
};