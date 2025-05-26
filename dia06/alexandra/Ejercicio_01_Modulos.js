/**Manejo de archivos */
const fs = require('fs');
const stats = fs.statSync('./archivo.txt');
console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size
);

/**Lectura */
console.log("Leyendo Archivo");
const texto = fs.readFileSync('./archivo.txt', 'utf-8');
console.log("Pimer texto leido", texto);

//**Probando sincronia */
console.log("Aqui se puede realizar otras operaciones");

console.log("Leemos otro archivo");
const segundoTexto = fs.readFileSync('./archivo2.txt', 'utf-8');
console.log("Leemos otro archivo");



/**Lectura */
console.log("##Leyendo Archivo");
fs.readFile('./archivo.txt', 'utf-8', (err, texto) => {
    console.log("-----Pimer texto leido", texto);
});

//**Probando sincronia */
console.log("Aqui se puede realizar otras operaciones");

console.log("Leemos otro archivo");
fs.readFile('./archivo2.txt', 'utf-8', (err, texto) => {
    console.log("Leemos otro archivo", texto);
});
