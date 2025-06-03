import express from 'express';
import indexRouter from '../routes/index.js';

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json());

/** Rutas */
app.use("/", indexRouter);

app.use((req, res) => {
    res.status(404).send("404 - No existe esa página");
});

app.listen(app.get("port"), () => {
    console.log("El servidor corre en el puerto", app.get("port"));
});
