import conexion from "./conexion.js";

const ContactoModel=function(contacto){
    this.nombre=contacto.nombre;
    this.apellido=contacto.apellido;
    this.profesion=contacto.profesion;
};
ContactoModel.crearNuevo=(nuevoContacto,result)=>{
    conexion.query("INSERT INTO contactos SET ?",nuevoContacto,(err,res)=>{
        if(err){
            console.log("error",err);
            result(err,null);
            return;
        }
        console.log("creando contacto:",{id:res.insertId, ...nuevoContacto});
        result(null,{id:res.insertId, ...nuevoContacto
        });
    });
};
ContactoModel.getAll=(titulo,result)=>{
    let query="SELECT *FROM contactos";
    conexion.query(query,(err,res)=>{
    if(err){
        console.log("error",err);
        result(err,null);
        return;
    }
    console.log("Contactos:",res);
    result(null,res);
    });
};
export default ContactoModel;