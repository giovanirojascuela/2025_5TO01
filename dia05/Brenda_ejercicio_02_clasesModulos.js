 // OBJETOS

// Declaración del objeto libro
var libro = {
    titulo: "Título del libro",
    autor: "Brenda",
    paginas: 32,
    formato: ["PDF", "Docx", "ePub"], // Debe ser un array, no paréntesis
    precio: 3.79,
    publicado: false
  };
  
  // Accediendo a propiedades
  console.log(libro.titulo); // "Título del libro"
  console.log(libro['paginas']); // 32
  
  // Modificando una propiedad
  libro.paginas = 64;
  console.log(libro['paginas']); // 64
  
  // Agregando un método al objeto
  libro.leer = function () {
    console.log("Se hizo la lectura");
  };
  
  // Llamando al método
  libro.leer(); // Se hizo la lectura
  
  // OBJETO ANIDADO (con propiedades dentro de propiedades)
  var libroAnidado = {
    titulo: "Primer libro",
    autor: {
      nombre: "Brenda",
      nacionalidad: "Perú",
      contacto: {
        email: "1535002@senati.pe",
        x: "Brenda "
      }
    },
    editorial: {
      nombre: "Senati",
      web: "https://campusonline.senati.edu.pe/"
    }
  };
  
  // Accediendo a propiedades anidadas
  console.log(libroAnidado.autor.nombre); // "camila"
  console.log(libroAnidado.autor.nacionalidad); // "Perú"
  console.log(libroAnidado.editorial.nombre); // "Senati"
  //IGUALDAD DE OBJETOS //
  var coche1={marca:"ford",modelo:"focus"};
  var coche2={marca:"ford",modelo:"focus"};
console.log(coche1===coche2)
console.log(coche1.modelo===coche2.modelo)
var coche3=coche1;
console.log(coche1===coche3)



  
