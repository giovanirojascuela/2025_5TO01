import express from "express";
import indexRouter from "../routes/index.js";
const app = express();

app.set("port",process.env.PORT||3000);

//RUTAS
app.use("/", indexRouter);
app.use("/",(req,res)=>{
    res.send("404 - no existe esa pagina");
});
app.listen(app.get("port"),()=>{
    console.log("el servidor corre en el puerto",app.get("port"));
})