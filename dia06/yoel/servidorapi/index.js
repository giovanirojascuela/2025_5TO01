import express from 'express';
import fs from'fs';
const app=express();
const leerArchivo=()=>{
    try{
        const datos=fs.readFileSync("./db.json","utf-8");
        //console.log(JSON.parse(datos));
        return JSON.parse(datos)
    }catch(error){
        console.log(error);
    }
};
//funcion de escriyura de archivo de datos

//leerArchivo();
const escribirArchivo=(datos)=>{
    try{
        fs.writeFileSync("./db.json",JSON.stringify(data));
        }catch(error){
            console.log(error);
        }
};
/** Crear estados */
app.get("/",(req,res)=>{
    res.send("Bienvenido a mi API Yoel.desarrollo");
});

app.get("/libros",(req,res)=>{
    const data=leerArchivo();
    res.json(data.libros);
});
//lectura por ID
app.get("/libros/:id",(req,res)=>{
    const data=leerArchivo();
    const id=parseInt(req.params.id);
    const libro=data.libros.find((libro)=>libro.id===id)
    res.json(libro);
})
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
})
app.put("/libros/:id",(req,res)=>{
    const data=leerArchivo();
    const dody=req.body;
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libros)=>libros.id===id);
    data.libros[libroId]={
        ...data.libros[libroId],
        ...body
    }
})
/** Mostrar estado en consola */
app.listen(3000,()=>{
    console.log('Escuchando servidor en puerto 3000')
});