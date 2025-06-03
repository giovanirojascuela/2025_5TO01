import express from "express";
import indexRouter from "../routes/index.js";

const app = express();

// Configurar el puerto
app.set("port", process.env.PORT || 3000);

// Usar las rutas definidas en indexRouter
app.use("/", indexRouter);

// Middleware para manejar rutas no existentes (404)
app.use((req, res) => {
    res.status(404).send("404 - No existe esa página rctmr");
});

// Iniciar el servidor
app.listen(app.get("port"), () => {
    console.log(`El servidor corre en mi WAICHU en el puerto ${app.get("port")}`);
});
