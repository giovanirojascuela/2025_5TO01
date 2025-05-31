import Contacto from "../models/contactos.model";

exports.create=(req,res)=>{
    if (!req.body) {
        res.status(400).send({messages:"vaciio"});
        
    }
    const contacto=new Contacto({
        nombre:req.body.nombre,
        apellidos:req.body.apellidos,
        profesion:req.body.profesion
    });
    Contacto.create(contacto,(err,data)=>{
        if (err) 
            res.status(500).send({messages:
                err.messages||"error"
            });
            else res.send(data);
            
        
    });
};

