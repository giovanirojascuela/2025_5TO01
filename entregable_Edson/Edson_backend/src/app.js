import express from 'express';
import indexRouter from '../routes/index.js';
// >>> Agrega el middleware CORS aquí, si aún no lo has hecho y tu frontend está en una puerta diferente
import cors from 'cors'; // Asegúrate de haber instalado: npm install cors

const app = express();

app.set("port", process.env.PORT || 3005);

// Middleware para habilitar CORS (si el frontend está en una puerta/dominio diferente)
app.use(cors()); // ¡Importante!

// Middleware para parsear el cuerpo de las peticiones JSON (para POST, PUT, PATCH)
app.use(express.json());

// Middleware para parsear el cuerpo de las peticiones URL-encoded (datos de formularios)
app.use(express.urlencoded({ extended: true }));

/// >>> RUTAS
app.use("/", indexRouter); // Esta ruta puede ser muy amplia, mira el punto 3

// >>> Middleware de 404 - Posición y Manejo
app.use((req, res) => {
    res.status(404).send("404 - No existe esa pagina"); // Define explícitamente el estado 404
});

// >>> Middleware de manejo de errores (Altamente recomendado para APIs)
app.use((err, req, res, next) => {
    console.error(err.stack); // Registra el rastro de la pila del error en la consola del servidor
    res.status(500).send('¡Algo salió mal en el servidor!'); // Envía una respuesta genérica de error
});

app.listen(app.get("port"), () => {
    console.log("El servidor corre en el puerto", app.get("port"));
});
