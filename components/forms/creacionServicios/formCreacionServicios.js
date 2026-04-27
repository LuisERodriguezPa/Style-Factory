// Importa el array de productos iniciales hardcodeados
import productos from '../../../pages/catalogoServicios/catalogoServicios.js';

// Lee la lista del localStorage, si no existe inicializa con un array vacio
let listaDeServicios = JSON.parse(localStorage.getItem("Lista de Servicios")) || [];

// Si el localStorage esta vacio, carga los 10 productos iniciales.
if (listaDeServicios.length == 0) {
    productos.forEach(function (elemento) {
        listaDeServicios.push(elemento);
    });
    localStorage.setItem("Lista de Servicios", JSON.stringify(listaDeServicios));
}

// Verifica que ningun campo esre vacío
function validar(valor) {
    return valor.trim() !== "";
}

// Muestra un mensaje de error debajo del campo correspondiente
function mostrarError(errorId, mensaje) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) errorSpan.textContent = mensaje;
}

// Limpia el mensaje de erro
function limpiarError(errorId) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) errorSpan.textContent = '';
}

// Valida toedos los campos del formulario antes de enviar
function validarFormulario(nombre, descripcion, precio) {
    let esValido = true;

    if (!validar(nombre)) {
        mostrarError('errorNombre', 'El nombre es obligatorio');
        esValido = false;
    } else limpiarError('errorNombre');

    if (!validar(descripcion)) {
        mostrarError('errorDescripcion', 'La descripcion es obligatoria');
        esValido = false;
    } else limpiarError('errorDescripcion');

    if (isNaN(Number(precio)) || Number(precio) <= 0) {
        mostrarError('errorPrecio', '¡Introduzca un precio Valido!');
        esValido = false;
    } else limpiarError('errorPrecio');

    return esValido;
}

// Se exporta para llamarla desde listaServicios.js despues de que el HTML
// del formulario haya cargado
export function initFormulario() {
    let imagenURL = "";

    // Referencia a los elementos del dom del formulario.
    const botonEnviar = document.querySelector(".btn-enviar");
    const inputImagen = document.getElementById('inputImagen');
    const preview     = document.getElementById('preview');

    // Cuando el usuario selecciona una imagen, la sube a Claudinary
    // y guarda la URL publica para usarla al crear el servicio
    inputImagen.addEventListener("change", async function () {
        const archivo = this.files[0];
        if (!archivo) return;

        const formData = new FormData();
        formData.append("file", archivo);
        formData.append("upload_preset", "servicios_app");

        try {
            const respuesta = await fetch(
                "https://api.cloudinary.com/v1_1/dxp3axcje/image/upload",
                { method: "POST", body: formData }
            );
            const data = await respuesta.json();
            imagenURL = data.secure_url;
            preview.src = imagenURL;
            preview.style.display = "block";
        } catch (error) {
            console.error("Error subiendo imagen:", error);
        }
    });

    // Se ejecuta cuando el usuario da click en el boton crear servicio
    botonEnviar.addEventListener("click", function (event) {
        event.preventDefault();

        // Recoge los valores de cada campo del formulario
        const nombre      = document.querySelector("#nombre").value;
        const descripcion = document.querySelector("#descripcion").value;
        const precio      = document.querySelector("#precio").value;
        const statusEl    = document.querySelector('input[name="status"]:checked');
        const status      = statusEl ? statusEl.value : "true";

        // Valida los campos antes de continuar
        const esValido = validarFormulario(nombre, descripcion, precio);

        if (esValido) {
            // Construye el objeto servicio con los datos del formulario
            const servicio = { nombre, descripcion, precio, status, imagen: imagenURL };
            // Verifica que no exista un servicio con el mismo nombre
            const existe   = listaDeServicios.some(e => e.nombre === servicio.nombre);

            if (!existe) {
                listaDeServicios.push(servicio); // Agrega un nuevo servicio a la lista
                localStorage.setItem("Lista de Servicios", JSON.stringify(listaDeServicios));
                alert("Servicio Agregado");
                location.reload(); // recarga la pagina para actualizar la tabla
            } else {
                alert("El Servicio ya Existe");
            }

            // Limpia el formulario y oculta el preview de la imagen
            document.getElementById("formCreacionServicios").reset();
            preview.style.display = "none";
            imagenURL = "";
        } else {
            alert("El formulario esta Incorrecto");
        }
    });
}