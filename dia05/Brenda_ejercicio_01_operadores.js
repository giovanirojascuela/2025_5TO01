// Ejercicio sobre operadores en JavaScript
// Variables
var x = 1;
var y = 2;
var z = y + x; // z = 3

// Reasignaciones de tipo
z = "Hola numero"; // z ahora es string
z = true;          // z ahora es booleano

// typeof: muestra el tipo de dato de una variable
console.log("typeof z:", typeof z); // boolean

// Operadores booleanos
var operar = true;
console.log("!operar:", !operar); // false

var b = false;
console.log("operar === b:", operar === b);  // false
console.log("operar !== b:", operar !== b);  // true

// Operadores de comparación
console.log("5 > 3:", 5 > 3);       // true
console.log("5 < 3:", 5 < 3);       // false
console.log("5 >= 5:", 5 >= 5);     // true
console.log("2 <= 1:", 2 <= 1);     // false
console.log('"a" < "b":', "a" < "b"); // true (orden alfabético)

// Operadores lógicos
console.log("true && true:", true && true);   // true
console.log("true && false:", true && false); // false
console.log("false && true:", false && true); // false
console.log("false && false:", false && false); // false
console.log("1 && 0:", 1 && 0); // 0 (porque 0 es falsy)
console.log("true || true:", true || true);     // true
console.log("true || false:", true || false);   // true
console.log("false || true:", false || true);   // true
console.log("false || false:", false || false); // false
console.log("1 || 0:", 1 || 0); // 1 (porque 1 es truthy)

// Operador ternario
console.log("(true) ? 5 : 2 =", (true) ? 5 : 2);  // 5
console.log("(false) ? 5 : 2 =", (false) ? 5 : 2); // 2

// Estructura IF
if (5 > 2) {
  console.log("5 es mayor que 2");
}
if (4 < 2) {
  console.log("4 es menor que 2");
} else {
  console.log("4 no es menor que 2");
}

// Estructura SWITCH
let fruta = "manzana";
switch (fruta) {
  case "manzana":
    console.log("Es una manzana");
    break;
  case "pera":
    console.log("Es una pera");
    break;
  case "banana":
    console.log("Es una banana");
    break;
  default:
    console.log("Fruta no reconocida");
    break;
}

