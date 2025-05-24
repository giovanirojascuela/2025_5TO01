const fs=require ('node:fs')
const stats =fs.statSync('./archivo.txt')
console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size
)

//lectura sincrona 
console.log("Leyendo archivo")
const texto=fs.readFileSync('./archivo.txt','utf-8')
console.log("primer texto leido",texto)
//probando sinxronia 
console.log("aqui se pued realizar otras operaciones")
//lectura de otros archivpos 
console.log("leemos otros archivos")
const segundoTexto=fs.readFileSync('./archivo2.txt', 'utf-8')
console.log("segundo texto leido",segundoTexto)


// lectura asincrona
console.log("Leyendo archivo")
fs.readFile('./archivo.txt','utf-8',(err,texto)=>{
    console.log("primer texto leido",texto)
})

//probando sinxronia 
console.log("aqui se pued realizar otras operaciones")
//lectura de otros archivpos 
console.log("leemos otros archivos")
fs.readFile('./archivo2.txt', 'utf-8',(err,segundoTexto)=>{
    console.log("segundo texto leido",segundoTexto)
})

