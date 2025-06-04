/*Objetos */
var libro={
    titulo:"Titulo del libro",
    autor:"Mario",
    paginas:32,
    formatos:["PDF","ePub","Mobi"],
    precio:3.73,
    publicacio:false
};
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas=64
console.log(libro['paginas'])
/*Metodos */
var libro={
    paginas:64,
    leer: function(){
        console.log("se hizo la lectura")
    }
};
libro.leer();
/*Anidacion*/
var libro={
    titulo:"Primer libro",
    autor:{
        nombre:"Yumer",
        nacionalidad:"Peruano",
        contacto:{
            email:"yumer@gmail.com",
            twitter:"@yumer"
        }
    },
    editorial:{
        nombre:"senati",
        web:"http://www.senati.edu.pe"
    }
};
console.log(libro.autor.nombre)
console.log(libro['autor']['nacionalidad'])
console.log(libro.editorial['nombre'])
/*Igualdad de objetos */
var coche1={marca:"Ford",modelo:"Focus"};
var coche2={marca:"Ford",modelo:"Focus"};
console.log(coche1===coche2)//<--no compara valores compara referencias
console.log(coche1.modelo===coche2.modelo)//<--comparacion de valores
var coche3=coche1;
console.log(coche1===coche3)//<--ambos tienen la misma referencia
