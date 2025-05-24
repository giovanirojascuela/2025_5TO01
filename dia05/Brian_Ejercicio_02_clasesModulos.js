/***Objetos */
var libro={
    titulo:"libro del libro",
    autor:"Cristian",
    paginas:32,
    formatos:["PDF","ePub","Mobi"],
    precio:3.79,
    publicado:false
};
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas=64
console.log(libro['paginas'])
/***Metodos */
var libro={
    paginas:64,
    leer: function(){
        console.log("Que se hizo la lectura")
    }
};
libro.leer();
/***Anidacion */
var libro={
    titulo:"Primer libro",
    autor:{
        nombre:"Cristian",
        nacionalidad:"Peruano",
        contacto:{
            email:"cristian@gmail.com",
            twitter:"@cristian"
        }
    },
    editorial:{
        nombre:"senati",
        web: "http://www.senati.edu.pe"
    }
};
console.log(libro.autor.nombre)
console.log(libro['autor']['nacionalidad'])
console.log(libro.editorial['nombre'])
/*** igualdad de objetos*/
var coche1={marca:"Ford",modelo:"Focus"};
var coche2={marca:"Ford",modelo:"Focus"};
console.log(coche1===coche2)//<-------no compara valores,compara referencia
console.log(coche1.modelo===coche2.modelo)//<-----comparacion de valores
var coche3=coche1
console.log(coche1===coche3)//<-----ambos tiene la misma refencia
