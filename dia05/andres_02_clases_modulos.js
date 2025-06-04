//objeto
var libro = {
    titulo: "titulo libro",
    autor: "andres",
    paginas: 32,
    formato: ["PDF", "epub", "hoby"],
    precio: 79,
    publicado: false
};
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas = 64
console.log(libro['paginas'])
//metodos 
var libro = {
    pagina: 64,
    leer: function() {
        console.log("que se hizo la lectura");
    }
};

libro.leer();
//anidacion-->
var libro = {
    titulo: "primer libro",
    autor: {
        nombre: "andres",
        nacionalidad: "peruano",
        contacto: {
            email: "dj.@gmai.com",
            twitter: "andres"
        }
    },
    editorial: {
        nombre: "senati",
        web: "http://senati.pe"
    }
}
console.log(libro.autor.nombre);
console.log(libro['autor']['nacionalidad'])
console.log(libro.editorial['nombre'])
//igualdad  de objetos -->>>

var coche1 = { marca: "ford", modelo: "focus" };
var coche2 = { marca: "ford", modelo: "focus" };
console.log(coche1 === coche2); // false: no compara valores, compara referencias
console.log(coche1.modelo === coche2.modelo); // true: compara el valor del modelo
var coche3 = coche1;
console.log(coche1 === coche3); // true: ambos tienen la misma referencia en memoria
