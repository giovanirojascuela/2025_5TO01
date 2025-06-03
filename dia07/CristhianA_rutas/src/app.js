import express from 'express';
import indexRouter from '../routes/index.js';
const app = express();

app.set("port",process.env.PORT||3000);
//RUTAS 
app.use("/",indexRouter);
app.use((req,res)=>{
    res.status(404).send("Erorr 404 No existe esa pagina");
});
app.listen(app.get("port"),()=>{
    console.log("El server corre en el puerto  ",
    app.get("port"));
    
})