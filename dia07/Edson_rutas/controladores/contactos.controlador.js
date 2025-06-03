import {Contacto} from "../models/contactos.model.js"
export const crearContacto=(req,res)=>{
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
export const getContactos=(req,res)=>{
    //const titulo = req.query.titulo; 
    Contacto.getAll((err,data)=>{
        if(err){
            return res.status(500).send({
                message:err.message||"error"});
        }
        res.status(200).send(data);
    });
};
export const eliminarContacto=(req,res)=>{
    res.send("sdfsfsdafsdaf se ellimino");
};
export const getContacto=(req,res)=>{
    res.send("ver contacto");
};

export const modificarContacto=(req,res)=>{
    res.send("se modifico contacto");
};

