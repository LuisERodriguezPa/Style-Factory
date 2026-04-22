let nombre;
let descripcion;;
let precio;
let status; 
let esValido;
const listaDeServicios = [];
const botonEnviar = document.querySelector(".btn-enviar");

function validar(nombre) {
   return nombre.trim() !== "";
}

// Muestra un mensaje de error en el campo correspondiente
function mostrarError(errorId, mensaje) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) 
        errorSpan.textContent = mensaje;
}

// Limpia el mensaje de error de un campo específico
function limpiarError(errorId) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) 
        errorSpan.textContent = '';
}

// Valida todos los campos del formulario antes de enviar
function validarFormulario() {
    esValido = true;
    if (!validar(nombre)) {
        mostrarError('errorNombre', 'El nombre es obligatorio');
        esValido = false;
    } else {
        limpiarError('errorNombre');
    }
    if (!validar(descripcion)) {
        mostrarError('errorDescripcion', 'La descripcion  es obligatoria');
        esValido = false;
    } else {
        limpiarError('errorDescripcion');
        
    }
    if (!validar(precio)) {
        mostrarError('errorPrecio', 'El precio es obligatorio');
        esValido = false;
    } else {
        limpiarError('errorPrecio');
       
    }
}

botonEnviar.addEventListener("click", function(event){
    event.preventDefault();
    nombre = document.querySelector("#nombre").value;
    descripcion = document.querySelector("#descripcion").value;
    precio = document.querySelector("#precio").value;
    status = document.querySelector('input[name="status"]:checked').value;
    validarFormulario()
    if(esValido){
        const servicio = {
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            status: status
        }
        listaDeServicios.push(servicio);
        console.log(listaDeServicios);
        alert("Servicio Agregado");
        document.getElementById("formCreacionServicios").reset();
    }else{
        alert("El formulario esta incompleto")
        
    }
   
})

localStorage.setItem("Lista de Servicios",JSON.stringify(listaDeServicios) )


