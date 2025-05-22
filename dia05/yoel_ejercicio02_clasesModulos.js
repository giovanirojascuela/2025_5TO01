/*objetos */
var libro = {
    titulo: "titulo del libro",
    autor: "Cristian",
    paginas: 32,
    formatos: ["PDF", "ePub", "Mobi"],
    precio: 3.79,
    publicado: false
};
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas = 64
console.log(libro['paginas'])
    //**Metodos */
var libro = {
    paginas: 64,
    leer: function() {
        console.log("que se hizo la lectura");
    }
};
libro.leer();
//*** anidacion */
var libro = {
    titulo: "Primer libro",
    autor: {
        nombre: "Cristiam",
        nacionalidad: "Venezolana",
        contacto: {
            email: "Cristian90@gmail.com",
            twiter: "@cristiam"
        }
    },
    editorial: {
        nombre: "Senati",
        wed: "htto://www.senati.edu.pe"
    }
};
console.log(libro.autor.nombre)
console.log(libro['autor']['nacionalidad'])
console.log(libro.editorial['nombre'])
    //**igualdad de objetos */
var coche1 = { marca: "Ford", modelo: "Focus" }
var coche2 = { marca: "Ford", modelo: "Focus" }
console.log(coche1 === coche2) //<no compra valores compara>
console.log(coche1.modelo === coche2.modelo) //<----cmparacio>
var coche3 = coche1;
console.log(coche1 === coche3) //andos tiene la misma referencia