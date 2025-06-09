import express from 'express';
import fs from 'fs';
const app = express();
const leerArchivo = () => {
    try {
        const datos = fs.readFileSync("./bd.json");
        //console.log(JSON.parse(datos));
        return JSON.parse(datos);
    } catch (error) {
        console.log(error);
    }

};
const escribirArchivo = () => {
    try {
        const datos = fs.writeFileSync("./bd.json", JSON.
            stringify(data));

    } catch (error) {
        console.log(error);
    }

};
//leerArchivo();
//Crear rutas
app.get("/", (req, res) => {
    res.send("Bienvenido a mi API CristhianA - Desarrollo");
});

//VAMOS CREANDO UN CRUD API


app.get("/libro", (req, res) => {
    const data = leerArchivo();
    res.json(data.libro);
});
//LECTURA POR ID 
app.get("/libro/:id",(req,res)=>{
    const data= leerArchivo();
    const id =parseInt(req.params.id);
    const libro=data.libro.find((libro)=>libro.id===id);
    res.json(libro);
})
app.post("/libros",(req,res)=>{
    const data=leerArchivo();
    const body=req.body;
    const nuevoLibro={
        id: data.libro.length+1,
        ...body
    };
    data.libro.push(nuevoLibro);
    escribirArchivo(data);
    res.json(nuevoLibro);
})
app.put("/libro/:id",(req,res)=>{
    const data=leerArchivo();
    const body=req.body;
    const id=parseInt(req.params.id);
    const libroId=data.libro.findIndex((libro)=>libro.id===id);
    data.libro[libroId]={
        ...data.libro[libroId],
        ...body
    }
})



//MOATRAR ESTADO EN LA CONSOLA
app.listen(3000, () => {
    console.log("Escuchando server en puerto 3000");
});
