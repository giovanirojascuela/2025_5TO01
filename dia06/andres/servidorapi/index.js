import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser'

const app = express();
app.use(express.json()); // Para leer JSON del body

const leerArchivo = () => {
  try {
    if (!fs.existsSync('./db.json')) {
      console.log('Archivo db.json no encontrado, creando uno nuevo.');
      fs.writeFileSync('./db.json', '{"libros":[]}', 'utf-8');
    }
    const datos = fs.readFileSync('./db.json', 'utf-8');
    return JSON.parse(datos);
  } catch (error) {
    console.log('Error al leer archivo:', error);
    return { libros: [] };
  }
};

const escribirArchivo = (data) => {
  try {
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 2), 'utf-8');
    console.log('Archivo actualizado.');
  } catch (error) {
    console.log('Error al escribir archivo:', error);
  }
};

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a mi API Andres ');
});

// Listar todos los libros
app.get('/libros', (req, res) => {
  const data = leerArchivo();
  res.json(data.libros);
});

// Obtener libro por ID con GET
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = leerArchivo();
  const libro = data.libros.find(l => l.id === id);
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(libro);
});

// Obtener libro por ID con POST
app.post('/libros/id', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Falta el campo id' });

  const data = leerArchivo();
  const libro = data.libros.find(l => l.id === id);
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

  res.json(libro);
});

// Crear un nuevo libro
app.post('/libros', (req, res) => {
  const nuevoLibro = req.body;
  if (!nuevoLibro.nombre || !nuevoLibro.autor || !nuevoLibro.anio) {
    return res.status(400).json({ error: 'Faltan campos (nombre, autor, anio)' });
  }

  const data = leerArchivo();
  const maxId = data.libros.reduce((max, l) => l.id > max ? l.id : max, 0);
  nuevoLibro.id = maxId + 1;

  data.libros.push(nuevoLibro);
  escribirArchivo(data);
  res.status(201).json(nuevoLibro);
});

// Actualizar libro por ID
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cambios = req.body;
  const data = leerArchivo();
  const libroIndex = data.libros.findIndex(l => l.id === id);

  if (libroIndex === -1) return res.status(404).json({ error: 'Libro no encontrado' });

  data.libros[libroIndex] = { ...data.libros[libroIndex], ...cambios, id };
  escribirArchivo(data);
  res.json(data.libros[libroIndex]);
});

// Eliminar libro por ID
app.delete('/libros/:id', (req, res) => {
  const data = leerArchivo();
  const id = parseInt(req.params.id);
  const libroIndex= data.libros.findIndex(l => l.id === id);

  if (libroIndex === -1) return res.status(404).json({ error: 'Libro no encontrado' });

  const eliminado = data.libros.splice(libroIndex, 1)[0];
  escribirArchivo(data);
  res.json({ mensaje: 'Libro eliminado', libro: eliminado });
});

//
app.listen(3000, () => {
  console.log('Escuchando servidor en puerto 3000');
});
