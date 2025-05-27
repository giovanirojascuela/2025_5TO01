import express from 'express';
import indexRouter from '../routes/index.js';

const app= express();

app.set("port",process.env.PORT||3000);
///rutas
app.use("/",indexRouter);
app.use((req,res)=>{
    res.status(404).send("404 - no existes esa pagina");
});
app.listen(app.get("port"),()=>{
    console.log("su servidor corre en el puerto",
    app.get("port"));
})