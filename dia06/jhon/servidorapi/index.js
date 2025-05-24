import express from 'express';
import fs from 'fs';
const app=express();
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
const escrivirArchivo=(data)=>{
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
app.get("/libros:id" ,(req,res)=>{
    const data=leerArchivos();
    const body=req.body;
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libros)=>libros.id===id);
    data.libros[libroId]={
        ...data.libros[libroId],
        ...body

    };
    
});
//actualizacion
app.listen(3000,()=>{
    console.log('Escuchando servidor emn puerto 3000')
});