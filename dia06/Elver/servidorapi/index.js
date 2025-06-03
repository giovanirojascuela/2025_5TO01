import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser'; // Corregido el nombre del paquete

const app = express();

// Middleware para leer JSON en las solicitudes
app.use(bodyParser.json()); // Corregido el uso

// Opción alternativa moderna: app.use(express.json());
// Usa solo una de estas, no ambas.

const leerArchivos = () => {
  try {
    const datos = fs.readFileSync("./bd.json", "utf-8");
    return JSON.parse(datos);
  } catch (error) {
    console.log(error);
    return { libros: [] }; // Previene errores si el archivo no existe o está vacío
  }
};

const escribirArchivos = (data) => {
  try {
    fs.writeFileSync("./bd.json", JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Ruta de inicio
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API jackson");
});

// Obtener todos los libros
app.get("/libros", (req, res) => {
  const data = leerArchivos();
  res.json(data.libros);
});

// Obtener un libro por ID
app.get("/libros/:id", (req, res) => {
  const data = leerArchivos();
  const id = parseInt(req.params.id);
  const libro = data.libros.find((libro) => libro.id === id);

  if (!libro) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  res.json(libro);
});

// Crear un nuevo libro
app.post("/libros", (req, res) => {
  const data = leerArchivos();
  const body = req.body;

  const nuevoLibro = {
    id: data.libros.length > 0 ? data.libros[data.libros.length - 1].id + 1 : 1,
    ...body
  };

  data.libros.push(nuevoLibro);
  escribirArchivos(data);
  res.json(nuevoLibro);
});

// Actualizar un libro
app.put("/libros/:id", (req, res) => {
  const data = leerArchivos();
  const body = req.body;
  const id = parseInt(req.params.id);

  const libroId = data.libros.findIndex((libros) => libros.id === id);

  if (libroId === -1) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  data.libros[libroId] = {
    ...data.libros[libroId],
    ...body
  };

  escribirArchivos(data);
  res.json(data.libros[libroId]);
});

// Eliminar un libro
app.delete("/libros/:id", (req, res) => {
  const data = leerArchivos();
  const id = parseInt(req.params.id);

  const libroId = data.libros.findIndex((libro) => libro.id === id);

  if (libroId === -1) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  data.libros.splice(libroId, 1);
  escribirArchivos(data);

  res.json({ message: "Libro eliminado" }); // Corregido "messge"
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Escuchando servidor en puerto 3000");
});