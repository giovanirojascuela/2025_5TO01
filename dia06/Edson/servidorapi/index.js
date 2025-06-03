import express from 'express';
import fs, { link } from 'fs';
import bodyParser from "body-parser";
const app=express();
app.use(bodyParser.json());
app.use(express.json());
//funcion de lectura de archivo
const leerArchivo=()=>{
    try{
        const datos=fs.readFileSync('./base_datos.json');
        //console.log(JSON.parse(datos));
        return JSON.parse(datos)
    }catch(error){
        console.log(error)
    }
};
//leerArchivo();
//funcion de escritura de archivo
const escribirArchivo=(data)=>{
    try{
        fs.writeFileSync('./base_datos.json',JSON.stringify(data));
    }catch(error){
        console.log(error)
    }
}
/*Crear rutas*/
app.get("/",(req,res)=>{
    res.send("Bienvenido a mi API Edson - Desarrollo");
});
//Vamos creando un crud api
app.get("/libros",(req,res)=>{
    const data=leerArchivo();
    res.json(data.libros);
});
//Lectura por id
app.get("/libros/:id",(req,res)=>{
    const data=leerArchivo();
    const id=parseInt(req.params.id);
    const libro=data.libros.find((libro)=>libro.id===id);
    res.json(libro);
});
app.post("/libros",(req,res)=>{
    const data=leerArchivo();
    const body=req.body;
    const nuevoLibro={
        id: data.libros.length+1,
        ...body,
    };
    data.libros.push(nuevoLibro);
    escribirArchivo(data);
    res.json(nuevoLibro);
});
//Actualizacion
app.put("/libros/:id",(req,res)=>{
    const data=leerArchivo();
    const body=req.body;
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libro)=>libro.id===id);
    data.libros[libroId]={
        ...data.libros[libroId],
        ...body
    }
});
app.delete("/libros/:id",(req,res)=>{
    const data =leerArchivo();
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libro)=>libro.id===id);
    data.libros.splice(libroId,1);
    escribirArchivo(data);
    res.json({message: "Libro eliminado"});
});
app.listen(3000,()=>{
    console.log('Escuchando servidor en puerto 3000')
    
});