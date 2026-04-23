import productos from '../../../pages/catalogoServicios/catalogoServicios.js';
let nombre;
let descripcion;;
let precio;
let status;
let esValido; 
const botonEnviar = document.querySelector(".btn-enviar");
const inputImagen = document.getElementById('inputImagen');
const preview = document.getElementById('preview');
const formulario = document.getElementById("formCreacionServicios");
let imagenBase64 = "";
let listaDeServicios = JSON.parse(localStorage.getItem("Lista de Servicios")) || [];
let existe;

if(listaDeServicios.length == 0){
    productos.forEach(function(elemento){
        listaDeServicios.push(elemento);
    })
    localStorage.setItem("Lista de Servicios",JSON.stringify(listaDeServicios))
}
// else{ 
//     productos.forEach(function(elemento){
//         existe = servicios.some(servicio => servicio.nombre === elemento.nombre);
//         console.log(existe);
//         if(!existe){
//             listaDeServicios.push(elemento)
//         }
    
//     })
// }

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
    if(isNaN(Number(precio)) || Number(precio)<= 0){
         mostrarError('errorPrecio', '¡Introduzca un precio Valido!');
        esValido = false
    }
   
}

let imagenURL = ""; // ahora guardamos URL, no base64

inputImagen.addEventListener("change", async function () {
    const archivo = this.files[0];

    if (!archivo) 
        return;

    const formData = new FormData();
    formData.append("file", archivo);
    formData.append("upload_preset", "servicios_app"); //  tu preset

    try {
        const respuesta = await fetch(
            "https://api.cloudinary.com/v1_1/dxp3axcje/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await respuesta.json();

        imagenURL = data.secure_url; 

        // Preview
        preview.src = imagenURL;
        preview.style.display = "block";
        console.log("Imagen subida:", imagenURL);

    } catch (error) {
        console.error("Error subiendo imagen:", error);
    }
});

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
            status: status,
            imagen: imagenURL 
        }
         
        existe = listaDeServicios.some(elemento => elemento.nombre === servicio.nombre);
        if(!existe){
             listaDeServicios.push(servicio)
             alert("Servicio Agregado");
        }else{
            alert("El Servicio ya Existe")
        }
        console.log(listaDeServicios);
        
        document.getElementById("formCreacionServicios").reset();
        preview.style.display = "none";
        imagenBase64 = "";
    }else{
        alert("El formulario esta Incorrecto")
        
    }
    localStorage.setItem("Lista de Servicios",JSON.stringify(listaDeServicios))
})
