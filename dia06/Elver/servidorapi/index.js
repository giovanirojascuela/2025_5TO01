import express, { json } from 'express';

import fs from 'fs';



const app = express();

app.use(json());



const leerArchivos = () => {

 try {

  const datos = fs.readFileSync("./bd.json", "utf-8");

  return JSON.parse(datos);

 } catch (error) {

  console.log(error);

 }

};



/** Función de escritura de archivo de datos */

const escribirArchivos = (data) => {

 try {

  fs.writeFileSync("./bd.json", JSON.stringify(data));

 } catch (error) {

  console.log(error);

 }

};



/** Crear estado */

app.get("/", (req, res) => {

 res.send("Bienvenido a mi API LuisDevInger");

});



// CRUD - Lectura general

app.get("/libros", (req, res) => {

 const data = leerArchivos();

 res.json(data.libros);

});



// Lectura por ID

app.get("/libros/:id", (req, res) => {

 const data = leerArchivos();

 const id = parseInt(req.params.id);

 const libro = data.libros.find((libro) => libro.id === id);

 res.json(libro);

});



// Crear libro

app.post("/libros", (req, res) => {

 const data = leerArchivos();

 const body = req.body;

 const nuevoLibro = {

  id: data.libros.length + 1,

  ...body

 };

 data.libros.push(nuevoLibro);

 escribirArchivos(data);

 res.json(nuevoLibro);

});



// Actualización

app.put("/libros/:id", (req, res) => {

 const data = leerArchivos();

 const body = req.body;

 const id = parseInt(req.params.id);

 const libroId = data.libros.findIndex((libros) => libros.id === id);

 data.libros[libroId] = {

  ...data.libros[libroId],

  ...body

 };

 escribirArchivos(data);

 res.json(data.libros[libroId]);

});



/** Mostrar estado en consola */

app.listen(3000, () => {

 console.log('Escuchando servidor en puerto 3000');

});

