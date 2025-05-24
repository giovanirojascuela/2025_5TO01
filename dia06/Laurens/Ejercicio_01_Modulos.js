/* Manejo de archivos*/
const fs=require('node:fs')
const stats =fs.statSync('./archivo.txt')
console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size
)

/*Lectura*/
console.log("Leyendo archivo")
const texto=fs.readFileSync('./archivo.txt','utf-8')
console.log("Primer texto leido",texto)
//Probando sincronia
console.log("Aqui se puede realizar otras operaciones")
/*Lectura de otro archivo */
console.log("Leemos otro archivo")
const segundoTexto=fs.readFileSync('./archivo.txt','utf-8')
console.log("-->segundo texto leido",segundoTexto)


/********Lectura Asincrona */
console.log("####Leyendo archivo de forma asincrona")
fs.readFile('/archivo.txt','utf-8',(err,texto)=>{
    console.log("---->Primer texto leido")
})


//Probando sincronia
console.log("Aqui se puede realizar otras operaciones")


/*Lectura de otro archivo */

console.log("Leemos otro archivo")
fs.readFile('./archivo.txt','utf-8',(err,segundoTexto)=>{
    console.log("--->Segundo texto leido",segundoTexto)
})


