import express from 'express';
import fs from 'fs';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json()); // Fixed the syntax for using body-parser

// Function to read data from the JSON file
const leerArchivo = () => {
    try {
        const datos = fs.readFileSync("./bd.json", "utf-8"); // Specify encoding for better practice
        return JSON.parse(datos);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return null; // Return null to avoid breaking the code
    }
};

// Function to write data to the JSON file
const escribirArchivo = (data) => {
    try {
        fs.writeFileSync("./bd.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error guardando el archivo:', error);
    }
};

/* Create routes */
app.get("/", (req, res) => {
    res.send("Bienvenido a mi API Brenda Desarrollo");
});

// Get all books
app.get("/libros", (req, res) => {
    const data = leerArchivo();
    if (data) {
        res.json(data.libros);
    } else {
        res.status(500).send("Error leyendo la base de datos");
    }
});

// Add a new book
app.post("/libros", (req, res) => {
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

// Get book by ID
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

// Update book by ID
app.put("/libros/:id", (req, res) => {
    const data = leerArchivo();
    if (!data) return res.status(500).send("Error leyendo la base de datos");

    const id = parseInt(req.params.id);
    const body = req.body;

    const libroIndex = data.libros.findIndex(libro => libro.id === id);
    if (libroIndex === -1) {
        return res.status(404).send("Libro no encontrado");
    }

    // Update the book with the provided data
    data.libros[libroIndex] = {
        ...data.libros[libroIndex],
        ...body
    };

    // Save changes to the file
    escribirArchivo(data);
    res.json(data.libros[libroIndex]);
});

// Delete book by ID
app.delete("/libros/:id", (req, res) => {
    const data = leerArchivo();
    const id = parseInt(req.params.id);
    
    const libroIndex = data.libros.findIndex(libro => libro.id === id);
    if (libroIndex === -1) {
        return res.status(404).send("Libro no encontrado");
    }

    data.libros.splice(libroIndex, 1);
    escribirArchivo(data);
    res.json({ message: "Libro eliminado" });
});

/* Start the server */
app.listen(3000, () => {
    console.log('Escuchando servidor en puerto 3000');
});