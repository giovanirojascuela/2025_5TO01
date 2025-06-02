import {Contacto} from "../models/contactos.model.js"

exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"vacio"});
    }
    const contacto=new Contacto({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        profesion:req.body.profesion
    });
    Contacto.create(contacto,(err,data)=>{
        if(err){res.status(500).send({message:err.message||"error"});
        }else {res.send(data);}
    });
    
};
exports.buscarAll=(req,res)=>{
    Contacto.getAll(titulo,(err,data)=>{
        if(err){res.status(500).send({message:err.message||"error"});
        }else {res.send(data);}
    });
};

//module.exports=contacto;
