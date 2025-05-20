/*** objetos */
var libro={
    titulo:"titulo del libro",
    autor:"Will",
    paginas:32,
    formatos:["PDF","ePub","Mobi"],
    precio:3.79,
    publicado:false
};
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas=64
console.log(libro['paginas'])
/**METODOS */
var libro={
    paginas:64,
    leer :function(){
        console.log("que se hizo la lectura")
    }
};
libro.leer();
/*** ANIDACION */
var libro={
    titulo:"PRIMER LIBRO",
    autor:{
        nombre:"Will",
        nacionalidad:"peruano",
        contacto:{
            email:"will@gmail.com",
            twitter:"@will"
        }
    },
    editorial:{
        nombre:"senati",
        web: "http://ww.senati.edu.pe"
    }
};
console.log(libro.autor.nombre)
console.log(libro['autor']['nacionalidad'])
console.log(libro.editorial['nombre'])
/** IGUALDAD DE OBJETOS */
var coche1={marca:"Ford", modelo:"Focus"};
var coche2={marca:"Ford", modelo:"Focus"};+
console.log(coche1===coche2)//<--- no compara valores compara refencias
console.log(coche1.modelo===coche2.modelo)//<-- comparacion de valores
var coche3=coche1;
console.log(coche1===coche3)//<---ambos tienen la misma referencia


