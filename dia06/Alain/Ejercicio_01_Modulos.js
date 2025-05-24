/*Manejo de Archivos*/
const fs=require('node:fs')
const stats =fs.statSync('./archivo.txt')
console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size
)
/******************Lectura Sincrona*/
console.log("Leyendo archivo")
const texto=fs.readFileSync('./archivo.txt','utf-8')
console.log("-----> Primer texto leido".texto)
//probando Sincronia
console.log("Aqui se puede realizar otras operaciones")
/*Lectura de otro archivo*/
console.log("Leemos otros archivo")
const segundoTexto=fs.readFileSync('./archivo2.txt','utf-8')
console.log("-----> Segundo texto leido", segundoTexto)

/******************Lectura Asincrona*/
console.log("#######Leyendo archivo de forma Asincrona")
fs.readFile('./archivo.txt','utf-8',(err,texto)=>{
    console.log("--->primer texto leido",texto)
})
//probando ASincronia
console.log("Aqui se puede realizar otras operaciones")
/*Lectura de otro archivo*/
console.log("Leemos otros archivo")
fs.readFile('./archivo2.txt','utf-8',(err,segundoTexto)=>{
    console.log("-----> Segundo texto leido", segundoTexto)
})

