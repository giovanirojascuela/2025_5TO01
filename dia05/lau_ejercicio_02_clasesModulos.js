//OBJETOS

var libros={

    titulo:"Titulo del libro",
  
    autor:"cristhian",
  
    paginas:32,
  
    formato:("PDF","Docx","ePub"),
  
    precio:3.79,
  
    publicado:false
  
  };
  
  console.log(libro,titulo)
  
  console.log(libro['paginas'])
  
  libro.paginas=64
  
  console.log(libro['paginas'])
  
  /**Metodos */
  
  var libros={
  
    paginas:64,
  
    leer: function(){
  
      console.log("se hixo la lectura")
  
    }
  
  };
  
  libro.leer();
  
  // anidacion 
  
  var libro={
  
    titulo:"primer libro",
  
    autor:{
  
      nombre:"saduc",
  
      nacionalidad:"peru",
  
      contacto:{
  
        email:"1547461@senati.pe",
  
        x:"lau"
  
      }
  
    },
  
    aditorial:{
  
      nombre:"senati",
  
      web: "https://campusonline.senati.edu.pe/"
  
    }
  
  };
  
  console.log(libro.autor.nombre)
  
  console.log(libro['autor']['nacionalismo'])
  
  console.log(libro.editorial['nombre'])

  /** igualdad de objeto */
  var coche1={marca:"ford", modelo:"focus"};
  var coche2={marca:"ford", modelo:"focus"};
  console.log(coche1===coche2)//<--- No compara valores
  console.log(coche1.modelo===coche2.modelo)//<--- comparacion de valores
  var coche3=coche1;
  console.log(coche1===coche3)//<--- ambos tiene la misma referencia

  
  