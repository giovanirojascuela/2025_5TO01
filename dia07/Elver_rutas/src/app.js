import express from "express";
import indexRouter from "../routes/index.js";
const app= express();

app.set("port",process.env.PORT||3000);
///Rutas
app.use("/",indexRouter);
app.use((req,res)=>{
    res.send("404 - No existe esa pagina")
});
app.listen(app.get("port"),()=>{
    console.log("El servisor corre en el puerto",app.get("port")
    )
});