import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";
const app=express();

const leerArchivo=()=>{
    try{
        const datos=fs.readFileSync("./bd.json");

        return JSON.parse(datos)
    } catch(error){
        console.log(error);
    } 
};
//leerArchivo();
const escribirArchivo=(data)=>{
    try{
        fs.writeFileSync("./bd.json",JSON.stringify(data));
    } catch(error){
        console.log(error);
    } 
};
/*crear estados*/
app.get("/",(req,res)=>{
    res.send("Bienvenido a mi API Rena -desarrollo");
});
app.get("/libros",(req,res)=>{
    const data=leerArchivo();
    res.json(data.libros);
});
app.get("/libros:id",(req,res)=>{
    const data=leerArchivo();
    const id=parseInt(req.params.id);
    const book=data.libros.find((libro)=>libro.id===id);
    res.json(libro);
});
app.put("/libros/:id",(req,res)=>{
    const data=leerArchivo();
    const body=req.body;
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libro)=>libros.id===id);
    data.libros[libroId]={
        ...data.libros[libroId],
        ...body
    }
});
app.delete("/libros/:id",(req,res)=>{
    const data =leerArchivo();
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libro)
    =>libro.id===id);
    data.libros.splice(libroId,1);
    escribirArchivo(data);
    res.json({message: "libro eliminado"});
});
app.listen(3000,()=>{
    console.log('escuchando servidor en puertp 3000')
});