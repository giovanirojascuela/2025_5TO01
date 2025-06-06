import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";
const app=express();
app.use(bodyParser.json());
//Funcion de Lectura de archivo de datos
const leerArchivo=()=>{
    try{
        const datos=fs.readFileSync("./bd.json");
        //console.log(JSON.parse(datos));
        return JSON.parse(datos)
    } catch(error){
        console.log(error);
    } 
};
//Funcion de Escritura de archivo de datos
//leerArchivo();
const escribirArchivo=(data)=>{
    try{
        fs.writeFileSync("./bd.json",JSON.stringify(data));
    } catch(error){
        console.log(error);
    } 
};
/*Crear rutas*/
app.get("/",(req,res)=>{
    res.send("Bienvenido a mi API Jheny - Desarrollo");
});
//Vamos creando un CRUD API
app.get("/libros",(req,res)=>{
    const data=leerArchivo();
    res.json(data.libros);
});
//Lectura por ID
app.get("/libros/:id",(req,res)=>{
    const data=leerArchivo();
    const id=parseInt(req.params.id);
    const libro=data.libros.find((libro)=>libro.id===id);
    res.json(libro);
});
app.post("/libros",(req,res)=>{
    const data=leerArchivo();
    const body=req.body;
    console.log("--------------->")
    console.log(body)
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
    res.json({message: "Libro eleminado"});
});
/*Mostrar estado en consola*/
app.listen(3000,()=>{
    console.log('Escuchando servidor en puerto 3000')
});