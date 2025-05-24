/** Manejo de archivos */
const fs = require('node:fs')

const stats = fs.statSync('./archivo.txt')
console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size
);

/** Lectura */
console.log("Leyendo Archivo")
const texto = fs.readFileSync('./archivo.txt', 'utf-8')
console.log("Primer texto leído:", texto)

/** Probando sincronía */
console.log("Aquí se pueden realizar otras operaciones")

/** Lectura de otro archivo */
console.log("Leemos otro archivo")
const segundoTexto = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log("Segundo texto leído:", segundoTexto)

/************* Lectura asincrona */
console.log("Leyendo Archivo");
fs.readFile('./archivo.txt','utf-8',(err,texto)=>{
    console.log("-->Primer texto leido",texto)
})
//Probando asincrona
console.log("Aquí se pueden realizar otras operaciones");

/** Lectura de otro archivo */
console.log("Leyendo Archivo");
fs.readFile('./archivo2.txt','utf-8',(err,segundoTexto)=>{
    console.log("-->Segundo texto leido",segundoTexto)
})