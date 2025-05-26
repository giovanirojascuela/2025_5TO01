import express from 'express';
import fs from 'fs';
import bodyParse from "body-parser";

const app=express();
app.use(bodyParse.json());
//Funcion de lectura de archivo de datoss
const leerArchivo=()=>{
  try{
    const datos=fs.readFileSync("./bd.json");
    return JSON.parse(datos)
  } catch(error){
    console.log(error);
  }
};
//Funcion de Escritura de archivo de datos
//leerArchivo();
const escribirArchivo=(data)=>{
  try{
    fs.writeFileSync("./bd.json","utf-8",JSON.stringify(data));
    console.log(JSON.parse(datos))
  } catch(error){
    console.log(error);
  }
};
/*Crear rutas*/
app.get("/",(req,res)=>{
  res.send("Bienvenido a mi API Alainn - Desarrollo");
});
//vamos creando un CRUD API
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
    const nuevoLibro={
        id: data.libros.length+1,
        ...body
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
  const data = leerArchivo();
  const id=parseInt(req.params.id);
  const libroId=data.libros.findIndex((libro)=>libro.id===id);
  data.libro.splice(libroId,1);
  escribirArchivo(data);
  res.json({massage: "libro eliminado"});
});
/*Mostrar estado en consola*/

app.listen(3000,()=>{

  console.log('Escuchando servido en perto 3000')

});
