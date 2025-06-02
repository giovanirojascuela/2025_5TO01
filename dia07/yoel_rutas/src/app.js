import express from "express"; // Corregido de "espress" a "express"
import indexRouter from '../routes/index.js';
const app = express();

app.set("port", process.env.PORT || 3000); // Corregido "part" a "port"
//rutas
app.use("/",indexRouter);
app.use((req,res)=>{
    res.send("404 - No existe esa pagina");
});
app.listen(app.get("port"), () => {
    console.log("El servidor corre en el puerto", 
        app.get("port")); // Corregido "gen" a "get"
})