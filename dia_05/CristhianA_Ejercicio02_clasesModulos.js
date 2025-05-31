//OBJETOS 
var libro={
    titulo:"Titulo del libro",
    autor:"Cristhian",
    paginas:32,
    formato:["PDF","Docx","ePub"],
    precio:3.79,
    publicado:false

}
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas=64
console.log(libro['paginas'])

//METODOS 
var libro={
    paginas:64,
    leer: function(){
        console.log("Se hizo la lectura")
    }
};
libro.leer();
//ANIDACION
var libro={
    titulo:"Primer Libro",
    autor:{
        nombre:"Cristhian",
        nacionalidad:"Peru",
        contacto:{
            email:"1526757@senati.pe",
            x:"@Cristhiancito"
        }
    },
    editorial:{
        nombre:"Senati",
        web:"Senati.com"
    }
};
console.log(libro.autor.nombre)
console.log(libro['autor']['nacionalidad'])
console.log(libro.editorial['nombre'])

//IGUALDAD DE OBJETOS
var coche1={marca:"Ford",modelo:"Focus"}
var coche2={marca:"Ferarri",modelo:"Veneno"}
console.log(coche1===coche2) //No comparaba valores sino el espacio en laram y nose que mas no entendi
console.log(coche1.modelo===coche2.modelo)
var coche3=coche1
console.log(coche1===coche3)
