// Manejo de Archivos

const fs = require('node:fs');



// Información del archivo

const stats = fs.statSync('./archivo.txt');

console.log(

  "¿Es un archivo?", stats.isFile(),

  "\n¿Es un directorio?", stats.isDirectory(),

  "\n¿Es un enlace simbólico?", stats.isSymbolicLink(),

  "\nTamaño (bytes):", stats.size

);



// LECTURA SÍNCRONA

console.log("Leyendo archivo de forma SÍNCRONA...");

const text = fs.readFileSync('./archivo.txt', 'utf-8');

console.log("Primer texto leído:", text);



// Probando sincronía

console.log("Aquí se pueden realizar otras operaciones");



// Lectura de otro archivo síncrona

console.log("Leyendo otro archivo...");

const Stext = fs.readFileSync('./archivo2.txt', 'utf-8');

console.log("Segundo texto leído:", Stext);



// LECTURA ASINCRÓNICA

console.log("Leyendo archivo de forma ASINCRÓNICA...");



fs.readFile('./archivo.txt', 'utf-8', (err, text) => {

  if (err) {

    console.error("Error leyendo archivo.txt:", err);

  } else {

    console.log("Primer texto leído (async):", text);

  }

});



console.log("Aquí se pueden realizar otras operaciones mientras se lee asincrónicamente");



fs.readFile('./archivo2.txt', 'utf-8', (err, Stext) => {

  if (err) {

    console.error("Error leyendo archivo2.txt:", err);

  } else {

    console.log("Segundo texto leído (async):", Stext);

  }

});