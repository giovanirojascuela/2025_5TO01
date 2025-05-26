import express, { json } from 'express';
import fs from 'fs';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const leerArchivos=()=>{
    try{
        const datos=fs.readFileSync("./bd.json", "utf-8");
        //console.log(JSON.parse(datos));
        return JSON.parse(datos)
    }catch(error){
        console.log(error);
    }
};
/**Funcion de Escritura de archivo de datos */
//leer archivos();
const escribirArchivos=(data)=>{
    try{
        fs.writeFileSync("./bd.json",JSON.stringify(data));
    }catch(error){
        console.log(error);
    }
};
/** Crear estado */
app.get("/", (req, res) => {
    res.send("Bienvenido a mi API LuisDevInger");
});
//Vamos a crear un CRUD API
app.get("/libros", (req, res) => {
    const data=leerArchivos();
    res.json(data.libros);
});
//Lectura por ID
app.get("/libros/:id", (req, res) => {
    const data=leerArchivos();
    const id=parseInt(req.params.id);
    const libro=data.libros.find((libro)=>libro.id===id);
    res.json(libro);
});
app.post("/libros",(req,res)=>{
    const data=leerArchivos();
    const body=req.body;
    const nuevoLibro={
        id: data.libros.lenght+1,
        ...body,
    };
    data.libros.push(nuevoLibro);
    escribirArchivos(data);
    res.json(nuevoLibro);
});
//Actualizacion
app.put("/libros/:id",(req,res)=>{
    const data=leerArchivos();
    const body=req.body;
    const id=parseInt(req.params.id);
    const libroId=data.libros.findIndex((libros)=>libros.id===id);
    data.libros[libroId]={
        ...data.libros[libroId],
        ...body
    } 
});

app.delete("/libro/:id", (req,res)=>{
    const data = leerArchivos();
    const id = parseInt(req.params.id);
    const libroId=data.libros.findIndex((libros)=>libros.id===id);
    data.libros.aplice(libroId,1);
    escribirArchivos(data);
    res.json({message: "Libro Eliminado"});
});

/** Mostrar estado en consola */
app.listen(3000, () => {
    console.log('Escuchando servidor en puerto 3000');
});