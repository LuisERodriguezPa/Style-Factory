import productos from "../../catalogoServicios/catalogoServicios.js";
fetch("/components/forms/creacionServicios/formCreacionServicios.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("form-services").innerHTML = html;
  })
  .catch((err) => console.error("Error cargando el información index:", err));
fetch("/components/navbarAdmin/navbar_Admin.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("navbarAdmin-placeholder").innerHTML = html;
    initNavbarAdmin();
  })
  .catch((err) => console.error("Error cargando el navbar admin:", err));

let indexAEliminar = null;

//Se carga el localStorange
const servicios = JSON.parse(localStorage.getItem("servicios")) || [];
if (servicios.length == 0) {
  productos.forEach(function (elemento) {
    servicios.push(elemento);
  });
  localStorage.setItem("servicios", JSON.stringify(servicios));
  console.log(servicios);
}
console.log("Lista: ", servicios);

const tbody = document.getElementById("tabla-servicios");

tbody.innerHTML = "";

servicios.forEach((servicio, index) => {
  const estadoClase = servicio.status ? "confirmada" : "cancelada";
  const estadoTexto = servicio.status ? "Activo" : "Inactivo";

  //crea campos en la table
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
  if (document.activeElement) {
    document.activeElement.blur();
  }
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

document
  .getElementById("btn-confirmar-eliminar")
  .addEventListener("click", function () {
    const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

    servicios.splice(indexAEliminar, 1);

    localStorage.setItem("servicios", JSON.stringify(servicios));
    // cerrar modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalEliminar"),
    );
    modal.hide();
    location.reload();
  });

function eliminarServicio(index) {
  const servicios = JSON.parse(localStorage.getItem("servicios")) || [];

  servicios.splice(index, 1);

  localStorage.setItem("servicios", JSON.stringify(servicios));

  location.reload();
}
