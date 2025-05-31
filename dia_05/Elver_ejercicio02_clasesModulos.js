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
        nombre:"Elver",
        nacionalidad:"Peruano",
        contacto:{
            email:"bladielvermamani@gmail.com",
            twitter:"@Elver"
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
/***Igualdad de objetos */
var coche1={marca:"Fort", modelo:"Focus"};
var coche2={marca:"Fort", modelo:"Focus"};
console.log(coche1==coche2)//<----no compara valores,compara referencias
console.log(coche1.modelo===coche2.modelo)//comparacion de valores
var coche3=coche1;
console.log(coche1===coche3)//no compara valores 