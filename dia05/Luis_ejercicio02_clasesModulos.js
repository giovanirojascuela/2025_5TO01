/**Objetos */
var libro = {
    titulo: "Titulo del libro",
    autor: "Cristian",
    paginas: 32,
    formato: ["PDF", "ePub", "Mobi"],
    precio: 3.79,
    publicado: false
};
console.log(libro.titulo);
console.log(libro["paginas"]);
libro.paginas = 64;
console.log(libro["paginas"]); 

/**Metodos */
var libro = {
    paginas: 64,
    leer: function () {
        console.log("Que se hizo la lectura");
    }
};
libro.leer();

/**Anidacion */
var libro = {
    titulo: "Primer libro",
    autor: {
        nombre: "Cristian",
        nacionalidad: "Peruano",
        contactar: {
            email: "cristian@gmail.com",
            x: "@cristian"
        }
    },
    editorial: {
        nombre: "Senati",
        web: "http://www.senati.edu.pe"
    }
};

console.log(libro, libro.autor, libro.autor.nombre);
console.log(libro['autor']['nacionalidad']);
console.log(libro.editorial['nombre']);
/***Igualdad de objetos */
var coche1 = { marca: "Ford", modelo: "Focus" };
var coche2 = { marca: "Ford", modelo: "Focus" };

console.log(coche1 === coche2) // <--- No compara valores, compara referencias (false porque son objetos distintos)
console.log(coche1.modelo === coche2.modelo) // <-- comparacion de valores (true porque ambos modelos son "Focus")

var coche3 = coche1;
console.log(coche1 === coche3) // <--- No compara valores, compara referencias (true porque apuntan al mismo objeto)


