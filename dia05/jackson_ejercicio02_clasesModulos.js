/***objetos*/
var libro={
    titulo:"Titulo del libro",
    autor:"jackson  ",
    paginas:32,
    formato:["PDF","ePub","Mobi"],
    precio:3.79,
    publicado:false
};
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas=64
console.log(libro['paginas'])
 

//metodos 
var libro={
    paginas:64,
    leer: function(){
        console.log("que se hizo la lectura");
    }
};
libro.leer();
//anidacion
var libro={
    titulos:"primer libro",
    autor:{
        nombre:"jackson",
        nacionalidad:"puno",
        contacto:{
            email:"jackson16ps@gmail.com",
            twiter:"@pape"
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
//igualdad de objetos 
var coche1={marca:"lambo",modelo:"focus"};
var coche2={marca:"lambo",modelo:"focus"};
console.log(coche1===coche2);
console.log(coche1.modelo===coche2.modelo);
var coche3= coche1;
console.log(coche1 === coche3);
