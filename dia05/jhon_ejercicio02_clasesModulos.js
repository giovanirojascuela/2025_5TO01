//*objetos*/
var libro={
    titulo:"titulo del libro",
    autor:"juan",
    paginas:32,
    formatos:["PDF","ePub","Mobi"],
    precio:3.73,
    publicacion:false
};
console.log(libro.titulo)
console.log(libro['paginas'])
libro.paginas=64
console.log(libro['paginas'])
/*metodos*/
var libro={
    paginas:64,
    leer: function(){
        console.log("se hizo la lectura")
    }
}
libro.leer();
/*anidacion*/
var libro={
    titulo:"primer libro",
    autor:{
        nombre:"pedro",
        nacionalidad:"Peruano",
        contacto:{
            email:"pedro@gmail.com",
            twitter:"@pedro"
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

/** igualdad de objetos */
var coche1={marca:"fort",modelo:"focus"};
var coche2={marca:"fort",modelo:"focus"};
console.log(coche1===coche2)/// no compara valores compara referencia
console.log(coche1.modelo===coche2.model0)/// compracion de valores
var coche3=coche1;
console.log(coche1===coche3)///<------ambos tienen la misma diferencia
