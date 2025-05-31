import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.json()); // Middleware para JSON en body

// Función de lectura de archivo de datos
const leerArchivo = () => {
  try {
    const datos = fs.readFileSync("./bd.json", "utf-8");
    return JSON.parse(datos);
  } catch (error) {
    console.log("Error leyendo archivo:", error);
    return { libros: [] }; // retorno seguro
  }
};

// Función de escritura de archivo de datos
const escribirArchivo = (data) => {
  try {
    fs.writeFileSync("./bd.json", JSON.stringify(data, null, 2));
  } catch (error) {
    console.log("Error escribiendo archivo:", error);
  }
};

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send('Bienvenido a mi API Brenda - Desarrollo');
});

// Ruta para mostrar libros
app.get("/libros", (req, res) => {
  const data = leerArchivo();
  res.json(data.libros);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Escuchando servidor en puerto 3000');
});
