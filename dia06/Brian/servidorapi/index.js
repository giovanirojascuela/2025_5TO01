import express from 'express';
import fs from 'fs';

const app = express();

// Middleware para poder leer JSON en el body de las peticiones PUT y POST
app.use(express.json());

// Función de lectura de archivo de datos
const leerArchivo = () => {
    try {
        const datos = fs.readFileSync("./bd.json", "utf-8"); // Es buena práctica especificar la codificación
        return JSON.parse(datos);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return null; // En caso de error devolvemos null para evitar que el código rompa
    }
};

/* Crear rutas */
app.get("/", (req, res) => {
    res.send("Bienvenido a mi API brenda Desarrollo");
});

// Obtener todos los libros
app.get("/libros", (req, res) => {
    const data = leerArchivo();
    if (data) {
        res.json(data.libros);
    } else {
        res.status(500).send("Error leyendo la base de datos");
    }
});
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
});
// Lectura por ID
app.get("/libros/:id", (req, res) => {
    const data = leerArchivo();
    if (!data) return res.status(500).send("Error leyendo la base de datos");

    const id = parseInt(req.params.id);
    const libro = data.libros.find(libro => libro.id === id);

    if (libro) {
        res.json(libro);
    } else {
        res.status(404).send("Libro no encontrado");
    }
});

// Actualización por ID
app.put("/libros/:id", (req, res) => {
    const data = leerArchivo();
    if (!data) return res.status(500).send("Error leyendo la base de datos");

    const id = parseInt(req.params.id);
    const body = req.body;

    const libroIndex = data.libros.findIndex(libro => libro.id === id);
    if (libroIndex === -1) {
        return res.status(404).send("Libro no encontrado");
    }

    // Actualizamos el libro con los datos enviados
    data.libros[libroIndex] = {
        ...data.libros[libroIndex],
        ...body
    };

    // Guardar cambios en el archivo (importante!)
    try {
        fs.writeFileSync("./bd.json", JSON.stringify(data, null, 2));
        res.json(data.libros[libroIndex]);
    } catch (error) {
        res.status(500).send("Error guardando los datos");
    }
});

/* Mostrar estado en consola */
app.listen(3000, () => {
    console.log('Escuchando servidor en puerto 3000');
});