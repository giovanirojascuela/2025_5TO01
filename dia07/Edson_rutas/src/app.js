import express from "express";
import indexRouter from "../rutas/index.js";
const app=express();

app.set("port",process.env.PORT||3000);
//rutas
app.use("/",indexRouter);
app.use((req,res)=>{
    res.send("404 - No se encuentra la pagina");
});
app.listen(app.get("port"),()=>{
    console.log("El servidor corre en el puerto",app.get("port"))
});