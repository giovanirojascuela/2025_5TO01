
// console.log("probando")
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



//probando sincronia
console.log("Aqui se puede realizar otras operaciones")
//lectura de otro archivo
console.log("leemos otro archivo")
const segundoTexto=fs.readFileSync('./archivo2.txt','utf-8')
console.log("Segundo texto leido", segundoTexto)
//--------------------------lectura asincrona-----------------

console.log("Leyendo archivo")
fs.readFile('./archivo.txt','utf-8',(err,texto)=>{
    console.log("--------------->Primer texto leido",texto)
})

//probando sincronia
console.log("Aqui se puede realizar otras operaciones")
//lectura de otro archivo
console.log("leemos otro archivo")

fs.readFile('./archivo2.txt','utf-8',(err,segundotexto)=>{
    console.log("--------------->segundo texto texto leido",segundotexto)
})