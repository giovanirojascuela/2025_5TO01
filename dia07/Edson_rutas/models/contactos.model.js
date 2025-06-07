import sql from "./conexion.js";
export const Contacto=function(contacto){
    this.nombre=contacto.nombre;
    this.apellido=contacto.apellido;
    this.profesion=contacto.profesion;
};
Contacto.crearNuevo=(nuevoContacto,result)=>{
    sql.query("INSERT INTO contactos SET ?",
    nuevoContacto,(err,res)=>{
        if(err){
            console.log("error",err);
            result(err,null);
            return;
        }
        console.log("creando contacto",{id:res.insertId, ...nuevoContacto});
        result(null,{id:res.insertId, ...nuevoContacto});
    });
};
Contacto.getAll=(result)=>{
    let query="SELECT * FROM contactos";
    sql.query(query,(err,res)=>{
        if(err){
            console.log("error",err);
            result(err,null);
            return;
        }
        console.log("Contactos:",res);
        result(null,res);
    });
};
//export default Contacto;
//module.exports=Contacto;