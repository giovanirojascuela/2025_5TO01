var libro = {
    titulo: "Titulo del libro",
    autor: "Camila",
    paginas: 32,
    formatos: ["PDF", "ePub", "Mobi"],
    precio: 3.79,
    publicado: false
};
console.log(libro.titulo);
console.log(libro['paginas']);
libro.paginas = 64;
console.log(libro['paginas']);

// metodos
var libro = {
    paginas: 64,
    leer: function () {
        console.log("que se hizo la lectura");
    }
};
libro.leer();

// anidacion
var libro = {
    titulo: "primer libro",
    autor: {
        nombre: "Camila",
        nacionalidad: "Peruana",
        contacto: {
            email: "Camila@senati.pe",
            twiter: "@Cami"
        }
    },
    editorial: {
        nombre: "senati",
        web: "http://senati.edu.pe"
    }
};

console.log(libro.autor.nombre);
console.log(libro['autor']['nacionalidad']);
console.log(libro.editorial['nombre']);
console.log(libro.autor.contacto.email);   
console.log(libro.autor.contacto.twiter);  


/* igualdad de objetos */
var coche1 = {marca:"ford"};
var coche2 = {marca:"focus"};
console.log (coche1===coche2)  // no compara valores

console.log(coche1.modelo===coche2.modelo)// comparacion
var coche3 = coche1;
console.log (coche1===coche3) // ambos tiene la misma referencia
