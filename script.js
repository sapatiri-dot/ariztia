/* ==========================================================
   Ariztía – script.js
   Interactividad del sitio: filtros del menú, validación del
   formulario de reserva, menú hamburguesa y botón "volver arriba".
   ========================================================== */

/* ---------- 1. FILTROS DEL MENÚ ----------
   Cada botón tiene data-filtro y cada producto data-categoria.
   Al hacer clic se muestran solo los productos de esa categoría
   (o todos), agregando/quitando la clase CSS "oculto". */
const botones = document.querySelectorAll(".filtro");
const productos = document.querySelectorAll(".producto");

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    // Marcar como activo solo el botón elegido
    botones.forEach(function (b) {
      b.classList.remove("activo");
    });
    boton.classList.add("activo");

    // Mostrar u ocultar cada producto según su categoría
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

/* ---------- 2. VALIDACIÓN DEL FORMULARIO DE RESERVA ---------- */
const formulario = document.getElementById("formulario");
const respuesta = document.getElementById("respuesta");
const inputFecha = document.getElementById("fecha");

// No permitir reservar en fechas pasadas (formato AAAA-MM-DD)
if (inputFecha) {
  inputFecha.min = new Date().toISOString().split("T")[0];
}

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita que la página se recargue

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const fecha = inputFecha.value;
    const personas = document.getElementById("personas").value;

    if (nombre === "" || email === "" || fecha === "" || personas === "") {
      mostrarMensaje("Completá todos los campos.", "error");
    } else if (!emailValido(email)) {
      mostrarMensaje("El email no es válido.", "error");
    } else {
      mostrarMensaje(
        "¡Gracias " + nombre + "! Reservamos tu mesa para el " + fecha + ".",
        "exito"
      );
      formulario.reset();
    }
  });
}

// Comprueba un formato básico de email: texto@dominio.ext
function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Muestra un mensaje usando una clase CSS ("error" o "exito"),
// así los colores quedan definidos en style.css y no en el JavaScript.
function mostrarMensaje(texto, tipo) {
  respuesta.textContent = texto;
  respuesta.className = tipo;
}

/* ---------- 3. MENÚ HAMBURGUESA (celular) ---------- */
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", function () {
    const abierto = nav.classList.toggle("abierto");
    menuToggle.setAttribute("aria-expanded", abierto);
  });

  // Cerrar el menú al elegir una opción
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("abierto");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- 4. BOTÓN "VOLVER ARRIBA" ----------
   Aparece cuando el usuario bajó más de 400 px. */
const btnSubir = document.getElementById("btn-subir");

if (btnSubir) {
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
}