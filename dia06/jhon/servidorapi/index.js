import express from 'express';
import fs, {readFileSync} from 'fs';
import bodyParser from "body-parser";
const app=express();
app.use(bodyParser.json());
//funcion de lectura de archivo
const leerArchivos=()=>{
    try{
        const datos=fs.readFileSync('./bd_datos.json');
        //console.log(JSON.parse(datos));
        return JSON.parse(datos)
    } catch(error){
        console.log(error);
    }
};
//fucnion dev escritura de datos 
//leer archivos().
const escribirArchivos=(data)=>{
    try{
        fs.writeFileSync("./bd_datos.json",JSON.stringify(data));
    } catch(error){
        console.log(error);
    }
}
/*crear rutas*/
app.get("/" ,(req,res)=>{
    res,send("bienvenido a mi API jhon - Desarrollo");
});
//vamos creand un crup api
app.get("/libros",(req,res)=>{
    const data=leerArchivos();
    res.json(data.libros);
});
//lectura por id
app.get("/libros/:id",(req,res)=>{
    const data=leerArchivos();
    const id=parseInt(req.params.id);
    const libro=data.libros.find((libro)=>libro.id===id);
    res.json(libro);
});
app.post("/libros" ,(req,res)=>{
    const data=leerArchivos();
    const body=req.body;
    const nuevoLibro={
        id: data.libros.length+1,
        ...body,
        
    };
    data.libros.push(nuevoLibro);
    escribirArchivos(data);
    res.json(nuevoLibro);
})
app.get("/libros:id" ,(req,res)=>{
    const data=leerArchivos();
    const body=req.body;
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libros)=>libros.id===id);
    data.libros[libroId]={
        ...data.libros[libroId],
        ...body
    }
    });
app.delete("/libros:id",(req,res)=>{
    const data=leerArchivos();
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libro)=>libro.id===id);
    data.libros.splice(libroId,1);
    escribirArchivo(data);
    res.json({message: "Libro eliminado"});
});
//actualizacion
app.listen(3000,()=>{
    console.log('Escuchando servidor emn puerto 3000')
});