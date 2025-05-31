import Contacto from "../models/contactos.model";

exports.create=(res,res)=>{
    if(!req,body){
        res.status(400).send({message:"vacio"});
    }
    const contacto=new Contacto({
        nombre: req.body.nombre,
        apellido:req.body.nombre,
        prefesion:req.body.profesion,
    });
    Contacto.create(contacto,(err,data)=>{
        if(err)
            res.status(500).send({message:
                err.message||"error"
                
        });
        else res.send(data);
    });
};