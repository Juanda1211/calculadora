let pantalla = document.getElementById('pantalla');
let operacion = "";

function agregar(valor) {
  operacion += valor;
  pantalla.innerText = operacion;
}

function borrar() {
  operacion = "";
  pantalla.innerText = "";
}

function borrarUno() {
  operacion = operacion.slice(0, -1);
  pantalla.innerText = operacion || "0";
}

function calcular() {
  try {
    const resultado = eval(operacion);
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

  const enModoOscuro = cuerpo.classList.toggle("oscuro");
  localStorage.setItem("modoOscuro", enModoOscuro ? "true" : "false");

  icono.classList.add("girar");
  setTimeout(() => icono.classList.remove("girar"), 500);

  icono.innerText = enModoOscuro ? "🌙" : "☀️";
  texto.innerText = enModoOscuro ? "Moony mode" : "Sunny mode";
}

function aplicarModoGuardado() {
  const modoGuardado = localStorage.getItem("modoOscuro");
  const cuerpo = document.body;
  const icono = document.getElementById("modo-icono");
  const texto = document.getElementById("modo-texto");

  if (modoGuardado === "true") {
    cuerpo.classList.add("oscuro");
    icono.innerText = "☀️";
    texto.innerText = "Sunny mode";
  } else {
    icono.innerText = "🌙";
    texto.innerText = "Moony mode";
  }
}

window.onload = aplicarModoGuardado;
