// ========== 1. FILTROS DEL MENÚ ==========
const botones = document.querySelectorAll(".filtro");
const productos = document.querySelectorAll(".producto");

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    // Marcar el botón activo
    botones.forEach(function (b) {
      b.classList.remove("activo");
    });
    boton.classList.add("activo");

    // Mostrar u ocultar productos
    const filtro = boton.dataset.filtro;

    productos.forEach(function (producto) {
      if (filtro === "todos" || producto.dataset.categoria === filtro) {
        producto.classList.remove("oculto");
      } else {
        producto.classList.add("oculto");
      }
    });
  });
});

// ========== 2. VALIDACIÓN DE LA RESERVA ==========
const formulario = document.getElementById("formulario");
const respuesta = document.getElementById("respuesta");

// No permitir fechas pasadas
const inputFecha = document.getElementById("fecha");
const hoy = new Date().toISOString().split("T")[0];
inputFecha.min = hoy;

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que se recargue la página

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const fecha = inputFecha.value;
  const personas = document.getElementById("personas").value;

  if (nombre === "" || email === "" || fecha === "" || personas === "") {
    mostrarMensaje("Completá todos los campos.", "#c0392b");
  } else if (!email.includes("@") || !email.includes(".")) {
    mostrarMensaje("El email no es válido.", "#c0392b");
  } else {
    mostrarMensaje(
      "¡Gracias " + nombre + "! Reservamos tu mesa para el " + fecha + ".",
      "#27ae60"
    );
    formulario.reset();
  }
});

function mostrarMensaje(texto, color) {
  respuesta.textContent = texto;
  respuesta.style.color = color;
}
// ========== 3. BOTÓN VOLVER ARRIBA ==========
const btnSubir = document.getElementById("btn-subir");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    btnSubir.classList.add("visible");
  } else {
    btnSubir.classList.remove("visible");
  }
});

btnSubir.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// ========== 4. MENÚ HAMBURGUESA ==========
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("abierto");
});

// Cerrar el menú al tocar un link
nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("abierto");
  });
});