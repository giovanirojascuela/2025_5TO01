import express from 'express';
import indexRouter from '../routes/index.js'; 
import cors from 'cors';

const app = express();

app.set("port", process.env.PORT || 3005);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter); 

app.use((req, res) => {
    res.status(404).send("404 - No existe esa página");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal en el servidor!');
});

app.listen(app.get("port"), () => {
    console.log("Servidor corriendo en el puerto", app.get("port"));
});
