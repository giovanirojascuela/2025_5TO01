import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Función de lectura de archivo de datos
const leerArchivo = () => {
  try {
    const datos = fs.readFileSync('./bd.json');
    return JSON.parse(datos);
  } catch (error) {
    console.log(error);
  }
};

// Función de escritura de archivo de datos
const escribirArchivo = (data) => {
  try {
    fs.writeFileSync('./bd.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
  }
};

// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a mi API Brenda Desarrollo');
});

// Obtener todos los libros
app.get('/libros', (req, res) => {
  const data = leerArchivo();
  res.json(data.libros);
});

// Obtener un libro por ID
app.get('/libros/:id', (req, res) => {
  const data = leerArchivo();
  const id = parseInt(req.params.id);
  const libro = data.libros.find((libro) => libro.id === id);
  res.json(libro);
});

// Crear un nuevo libro
app.post('/libros', (req, res) => {
  const data = leerArchivo();
  const body = req.body;
  const nuevoLibro = {
    id: data.libros.length + 1,
    ...body,
  };
  data.libros.push(nuevoLibro);
  escribirArchivo(data);
  res.json(nuevoLibro);
});

// Actualizar un libro por ID
app.put('/libros/:id', (req, res) => {
  const data = leerArchivo();
  const body = req.body;
  const id = parseInt(req.params.id);
  const libroid = data.libros.findIndex((libro) => libro.id === id);

  if (libroid !== -1) {
    data.libros[libroid] = {
      ...data.libros[libroid],
      ...body,
    };
    escribirArchivo(data);
    res.json(data.libros[libroid]);
  } else {
    res.status(404).json({ message: 'Libro no encontrado' });
  }
});

// Eliminar un libro por ID
app.delete('/libros/:id', (req, res) => {
  const data = leerArchivo();
  const id = parseInt(req.params.id);
  const libroId = data.libros.findIndex((libro) => libro.id === id);

  if (libroId !== -1) {
    data.libros.splice(libroId, 1);
    escribirArchivo(data);
    res.json({ message: 'Libro eliminado' });
  } else {
    res.status(404).json({ message: 'Libro no encontrado' });
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Escuchando servidor en puerto 3000');
});
