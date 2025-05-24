/***objetos*/
var libro={
    titulo:"Titulo del libro",
    autor:"brady",
    paginas:32,
    formato:["PDF","ePub","Mobi"],
    precio:3.79,
    publicado:false
};
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas=64
console.log(libro['paginas'])
/*metodos*/
var libro={
    paginas:64,
    leer: function(){
        console.log("Que se hizo la lectura");
    }
}
libro.leer();
/*Anidacion*/
var libro={
    titulo:"Primer libro",
    autor:{
        nombre:"bardy",
        nacionalidad:"Peruano",
        contacto:{
            email:"Bradyalvarezquispe@gamil.com",
            twitter:"@bardy"
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
/*
igualdad de objetos*/
var coche1={marca:"ford",modelo:"Focus"};
var coche2={marca:"ford",modelo:"Focus"};+
console.log(coche1===coche2)//no compara valores, compara diferencias
console.log(coche1.modelo===coche2.modelo)//comparacion de modelos
var coche3=coche1;
console.log(coche1===coche3)//<--ambos tiene la misma referencia
