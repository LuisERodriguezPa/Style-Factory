// Importa la función que inicializa los eventos del formulario
import { initFormulario } from "../../../components/forms/creacionServicios/formCreacionServicios.js";
// Importa los productos iniciales hardcodeados como respaldo si el localStorage esta vacio
import productos from "../../catalogoServicios/catalogoServicios.js";

// Carga el HTML del formulario dentro del modal y luego inicializa sus eventos
fetch("/components/forms/creacionServicios/formCreacionServicios.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("form-services").innerHTML = html;
    initFormulario();
  })
  .catch((err) => console.error("Error cargando el formulario:", err));

// Carga el HTML del navbar admin
fetch("/components/navbarAdmin/navbar_Admin.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("navbarAdmin-placeholder").innerHTML = html;
    initNavbarAdmin();
  })
  .catch((err) => console.error("Error cargando el navbar admin:", err));

// Guarda el indice del servicio que va a eliminar
let indexAEliminar = null;

// Llave del localStorage
const KEY = "Lista de Servicios";

// Lee la lista del localStorage, si esta vacia carga los 10 productos iniciales
const servicios = JSON.parse(localStorage.getItem(KEY)) || [];
if (servicios.length == 0) {
  productos.forEach(function (elemento) {
    servicios.push(elemento);
  });
  localStorage.setItem(KEY, JSON.stringify(servicios));
}
console.log("Lista: ", servicios);

// Renderiza cada servicio como una fila en la tabla
const tbody = document.getElementById("tabla-servicios");
tbody.innerHTML = "";

servicios.forEach((servicio, index) => {
  // Define la clase del segun el estado del sercicio
  const estadoClase = servicio.status ? "confirmada" : "cancelada";

  const fila = `
    <tr>
      <td>#ID-${servicio.id}</td>
      <td>${servicio.nombre}</td>
      <td>
        <div class="text-truncate">
          ${servicio.descripcion}
        </div>
      </td>
      <td>
        <span class="badge-estado ${estadoClase}">
          ${servicio.status}
        </span>
      </td>
      <td class="celda-acciones">
        <button class="btn-accion" title="Editar">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn-accion btn-eliminar" data-index="${index}" title="Eliminar">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `;

  tbody.innerHTML += fila;
});


const modalElement = document.getElementById("modalEliminar");
modalElement.addEventListener("hidden.bs.modal", () => {
  if (document.activeElement) document.activeElement.blur();
  document.body.focus();
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".btn-eliminar")) {
    const boton = e.target.closest(".btn-eliminar");
    indexAEliminar = boton.dataset.index;
    const modal = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modal.show();
  }
});

document.getElementById("btn-confirmar-eliminar").addEventListener("click", function () {
  const servicios = JSON.parse(localStorage.getItem(KEY)) || [];
  servicios.splice(indexAEliminar, 1);
  localStorage.setItem(KEY, JSON.stringify(servicios));
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalEliminar"));
  modal.hide();
  location.reload();
});

function eliminarServicio(index) {
  const servicios = JSON.parse(localStorage.getItem(KEY)) || [];
  servicios.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(servicios));
  location.reload();
}