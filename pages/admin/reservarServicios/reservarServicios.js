const container = document.getElementById('reservas_container');
const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

let texto = document.getElementById("texto");
let contenedorImagen = document.getElementById("contenedor_imagen");

function renderizarReservas() {
    if (reservas.length === 0) {
        container.innerHTML = "<p>No hay reservas aún</p>";
        return;
    }
    reservas.forEach(reserva => {
        const contenidoReserva = document.createElement("div")
        contenidoReserva.className = "contenido_reserva"
        const precioFormateado = reserva.precio.toLocaleString('es-CO');
        const titulo = document.createElement("h1");
        titulo.textContent = reserva.nombre;
        
        const descripcion = document.createElement("p");
        descripcion.textContent = reserva.descripcion;
        
        const imagen = document.createElement("img")
        imagen.src = reserva.imagen;
       
        const texto = document.createElement("div");
        texto.className = "texto";
        texto.appendChild(titulo);
        texto.appendChild(descripcion);
        const contenedorImagen = document.createElement("div")
        contenedorImagen.className = "contenedor_imagen";
        contenedorImagen.appendChild(imagen);
        const contenedorPrecio = document.createElement("div");
        contenedorPrecio.className="contenedor_precio";
        const tituloPrecio = document.createElement("h1");
        tituloPrecio.textContent = reserva.nombre;
        const precio = document.createElement("h1");
        precio.className ="precio"
        precio.textContent = precioFormateado;

        contenidoReserva.appendChild(texto);
        contenidoReserva.appendChild(contenedorImagen);
        contenedorPrecio.appendChild(tituloPrecio);
        contenedorPrecio.appendChild(precio)
        container.appendChild(contenidoReserva);
        container.appendChild(contenedorPrecio);
        
        
    });

  
}
document.addEventListener('DOMContentLoaded', renderizarReservas);