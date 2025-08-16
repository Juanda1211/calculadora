let pantalla = document.getElementById('pantalla');
let operacion = "";
//agrega valor de derecha a izquierda con cada boton presionado
function agregar(valor) {
  operacion += valor;
  pantalla.innerText = operacion;
}
//esta funcion hace que todo lo que este en pantalla que se ha puesto con cada valor de "operacion" se borre directamente ademas de los calculos ya realizados
function borrar() {
  operacion = "";
  pantalla.innerText = "";
}
//esta funcion lo que hace es que no se borre todo sino uno de los valores, ejemplo, tengo 100, borro un 0 y queda en 10, ya que el segundo argumento del slice es -1, si quisiera borrar de dos en dos tendria que cambiar el -1 por un -2 y el 0 indica que al borrar todos los valores, en vez de no mostrar nada mostrara el 0 y no dejar la pantall en "blanco".
function borrarUno() {
  operacion = operacion.slice(0, -1);
  pantalla.innerText = operacion || "0";
}

function calcular() {
  try {
    // Cerrar paréntesis abiertos automáticamente
    let expr = operacion;
    const openParens = (expr.match(/\(/g) || []).length;
    const closeParens = (expr.match(/\)/g) || []).length;
    if (openParens > closeParens) {
      expr += ')'.repeat(openParens - closeParens);
    }
    // Evaluar la expresión
    const resultado = eval(expr);
    pantalla.innerText = resultado;
    operacion = resultado.toString();
  } catch {
    pantalla.innerText = "Error";
    operacion = "";
  }
}

function cambiarModo() {
  const cuerpo = document.body;
  const boton = document.getElementById("modo-btn");
  const icono = document.getElementById("modo-icono");
  const texto = document.getElementById("modo-texto");

  let enModoOscuro;
  if (cuerpo.classList.contains("oscuro")) {
    cuerpo.classList.remove("oscuro");
    cuerpo.classList.add("claro");
    enModoOscuro = false;
  } else {
    cuerpo.classList.remove("claro");
    cuerpo.classList.add("oscuro");
    enModoOscuro = true;
  }
  localStorage.setItem("modoOscuro", enModoOscuro ? "true" : "false");

  icono.classList.add("girar");
  setTimeout(() => icono.classList.remove("girar"), 500);
// es como decir, en "enModoOscuro", muestra "moony mode", sino "sunny mode", dependiendo la situacion se puede utilizar ya que es una forma mas rapida de escribir un condicional que uno haria con un if y else.
  icono.innerText = enModoOscuro ? "🌙" : "☀️";
  texto.innerText = enModoOscuro ? "Moony mode" : "Sunny mode";
}
//almacena los datos y hace que el navegador identifique en que modo esta y asi saber que parte de css aplicar mediante el DOM
function aplicarModoGuardado() {
  const modoGuardado = localStorage.getItem("modoOscuro");
  const cuerpo = document.body;
  const icono = document.getElementById("modo-icono");
  const texto = document.getElementById("modo-texto");
//si el dato almacenado es verdadero(ya que como verdadero esta el modo oscuro), agrega toda la seccion css del modo oscuro, y el else hace que si no lo esta, entonces aplique el css del modo claro, por eso arriba se agregan dos constantes, que traen id del html como el modo-icono y modo-texto
  if (modoGuardado === "true") {
    cuerpo.classList.add("oscuro");
    cuerpo.classList.remove("claro");
    icono.innerText = "🌙";
    texto.innerText = "Moony mode";
  } else {
    cuerpo.classList.add("claro");
    cuerpo.classList.remove("oscuro");
    icono.innerText = "☀️";
    texto.innerText = "Sunny mode";
  }
}

window.onload = aplicarModoGuardado;
