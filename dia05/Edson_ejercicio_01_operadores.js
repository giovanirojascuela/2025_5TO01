//Ejercicio sobre operadores javascrip
var  x=1 
var  y=2
var  z=y+x
z = "hola mundo"
z = true
//Operador typeof
//Nos permite conocer que tipo de dato es la variable
//console.log(typeof z)

/**Operadores Booleanos */
var operar= true
//console.log(!operar)
var b=false
//console.log(operar===b)
//console.log(operar!==b)
//console.log(5>3)
//console.log(5<3)
//console.log(5>=5)
//console.log(2<=1)
//console.log("a"<"b")
/*Operadores logicos */
//AND
console.log(true&&true)
console.log(true&&false)
console.log(false&&true)
console.log(false&&false)
//el valor 0 es falso y el valor 1 es verdadero
console.log(1&&0)
//OR
console.log(true||true)
console.log(true||false)
console.log(false||true)
console.log(false||false)
//el valor 0 es falso y el valor 1 es verdadero
console.log(1||0)
/*Asignacion condicional y la sentencia IF */
console.log((true)?5:2)
console.log((false)?5:2)

if(5>2){
    console.log("5 es mayor que 2")
}
if(4<2){
    console.log("4 es menor que 2")
}else{
    console.log("4 no es menor que 2")
}
/*Ejemplo con if else if
if(condicion1){
    bloque1
}else if(condicion2){
bloque2
}else if(condicion3){
    bloque3
}else{
    bloque4
}*/
/*Ejemplo de swich 
switch(condicion){
    case condicion1:
        bloque1
        break;
    case condicion2:
        bloque2
        break;
    case condicion3:
        bloque3
        break;
    case condicion4:
        bloque4
        break;
    defaul:
        bloque5
}*/