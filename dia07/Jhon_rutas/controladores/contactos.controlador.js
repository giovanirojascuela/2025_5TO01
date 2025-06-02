import Contacto from "../models/contactos.model.js"

exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"vacio"});
    }
    const contacto=new Contacto({
        nombre:req.body.nombre,
        apelliudo:req.body.apelliudo,
        profesion:req.body.profesion
    });
    Contacto.create(contacto,(err,data)=>{
        if(err){res.status(500).send({message:err.message||"eror"});
        }else {res.send(data);}
    });
};
exprots.buscarAll=(req,res)=>{
    Contacto.getAll(titulo,(err,data)=>{
        if(err){res.status(500).send({message:err.message||"error"});
        }else {res.send(data);}
        
    });
};
