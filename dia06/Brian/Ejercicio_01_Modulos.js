/**Manejo de Archivos */
const fs=require('node:fs')
const stats =fs.statSync('./archivo.txt')
console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size    
)
/**Lectura */
console.log("Leyendo archivo")
const texto=fs.readFileSync('./archivo.txt','utf-8')
console.log("Primer texto leido",texto)
//Probando sincrionia
console.log("Aqui se puede realizar otras operaciones")
/**Lectura de otros archivos */
console.log("Leemos otro archivo")
const segundotexto=fs.readFileSync('./archivo2.txt','utf-8')
console.log("-->Segundo texto leido",segundotexto)

/**Lectura Asincrona */
console.log("###Leyendo archivo de forma Asincrona")
fs.readFile('./archivo.txt','utf-8',(err,texto)=>{
    console.log("-->Primer texto leido",texto)
})
//Probando sincrionia
console.log("Aqui se puede realizar otras operaciones")
/**Lectura de otros archivos */
console.log("Leemos otro archivo")
fs.readFile('./archivo2.txt','utf-8',(err,segundotexto)=>{
    console.log("-->Segundo texto leido",segundotexto)
})
 

//**Letura Sincrona */

