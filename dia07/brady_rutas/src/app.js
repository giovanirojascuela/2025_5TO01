import express from "express";
import indexRouter from "express/lib/request";  
const app= express();

app.set("port".process.env.PORT||3000);
///rutas 
app.use("/",indexRouter);
app.use((req,res)=>{
    res.send("")
})
app.listen(app.get("port"))