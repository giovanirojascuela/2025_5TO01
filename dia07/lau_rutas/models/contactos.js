import sql from "./conexion.js";

const Contacto=function(contacto){
    this.nombre=contacto.nombre;
    this.apellido=contacto.apellido;
    this.profesion=contacto.profesion;
};
Contacto.crearNuevo=(nuevoContacto,result)=>{
    sql.query("INSERT INTO contactos SET ?",
    nuevoContacto,(err,res)=>{
        if (err) {
            console.log("error",err);
            result(err,null);
            return;
            
        }
        console.log("creando contacto:",{id:res.
        insertId, ...nuevoContacto});
        result(null,{id:res.insertId, ...
        nuevoContacto
    }); 

    });
};
module.export=Contacto;