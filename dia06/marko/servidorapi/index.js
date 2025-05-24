import express from 'express';
import fs from 'fs';
const app=express();
//Funcion de lectura de archivos de datos
const leerArchivo=()=>{
    try{
        const datos=fs.readFileSync("./bd.json");
        //console.log(JSON.parse(datos));
        return JSON.parse(datos)
    } catch(error){
        console.log(error);
    }
};
//Funcion de escritura de archivos de datos
//leerArchivo();
const escribirArchivos=(datos)=>{
    try{
        fs.writeFileSync("./bd.json",JSON.stringify(data));
    } catch(error){
        console.log(error);
    }
};
/*Crear rutas*/
app.get("/",(req,res)=>{
    res.send("bienvenido a mi API Marko - Desarrollo");
});
//Vmos creando un CRUD API
app.get("/libros",(req,res)=>{
    const data=leerArchivo();
    res.json(data.libros);
});
//Lectura por ID
app.get("/libros/:id",(req,res)=>{
    const data=leerArchivo();
    const id=parseInt(req.params.id);
    const libro=data.libros.find
    ((libro)=>libro.id==id);
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
    const libroId=data.libros.findIndex((libros)=>libro.id===id);
    data.libros[libroId]={
        ...data.libros[libroId],
        ...body
    }
})
/*Mostrar estado en console*/
app.listen(3000,()=>{
    console.log('Escuchando servidor en puerto 3000')
});