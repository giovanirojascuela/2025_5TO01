// Ejercicio sobre operadores de JavaScript

// Definir x e y antes de usarlos
var x = 5;
var y = 10;

var z = y + x;
console.log(z); // Imprime 15

z = "HOLA MAMI";
console.log(z); // Imprime "HOLA MAMI"

z = true;
console.log(z); // Imprime true

var operar = true;
var b = false;

// Operadores de comparación
console.log(5 > 3);    // true
console.log(5 < 3);    // false
console.log(5 >= 5);   // true
console.log(2 <= 1);   // false
console.log("a" < "b"); // true

// Operadores lógicos
console.log(true&&true);   // true
console.log(true&&false);  // false
console.log(false&&true);  // false
console.log(false&&false); // false
//el valor 0 es falso y el valor 1 es verdadero
console.log(1&&0);         // 0

//or
console.log(true||true);   // true
console.log(true||false);  // true
console.log(false||true);  // true
console.log(false||false); // false
//el valor 0 es falso y el valor 1 es verdadero
console.log(0||1);         // 1

//Asignación condicional y la sentencia if y else
console.log((true)?5:3);   // 5
console.log((false)?5:2);  // 2

if(5>3){
  console.log("5 es mayor que 3");
}

if(5<3){
  console.log("5 es menor que 3");
}else{
  console.log("5 no es menor que 3");
}

//Ejemplo con if else if
if(condicion1){
  bloque1
}
else if(condicion1){
  bloque2
}
else if(condicion1){
  bloque3
}
else{
  bloque4
}