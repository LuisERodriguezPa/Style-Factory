// Datos de la reserva actual
let reservaActual = {
    servicio: {
        nombre: "CORTE BÁSICO",
        precio: 50000
    },
    profesional: {
        nombre: "ANDREA RIVERA"
    },
    fecha: "ABR 25",
    hora: "2:00 PM"
};

// Referencias a los elementos
let elementos = {};

document.addEventListener('DOMContentLoaded', () => {
    elementos = {
        confServicio: document.getElementById('confServicio'),
        confProfesional: document.getElementById('confProfesional'),
        confFechaHora: document.getElementById('confFechaHora'),
        confTotal: document.getElementById('confTotal'),
        btnConfirmar: document.getElementById('btnConfirmarReserva')
    };
    
    renderizar();
    
    if (elementos.btnConfirmar) {
        elementos.btnConfirmar.addEventListener('click', () => {
            confirmarReserva();
        });
    }
});

function calcularTotal() {
    return reservaActual.servicio.precio;
}

function renderizar() {
    if (!elementos.confServicio) return;
    
    elementos.confServicio.textContent = reservaActual.servicio.nombre;
    elementos.confProfesional.textContent = reservaActual.profesional.nombre;
    elementos.confFechaHora.textContent = `${reservaActual.fecha} / ${reservaActual.hora}`;
    elementos.confTotal.textContent = formatearPrecio(calcularTotal());
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(precio);
}

// Funciones para otros componentes
function actualizarServicio(nombre, precio) {
    reservaActual.servicio = {
        nombre: nombre.toUpperCase(),
        precio: precio
    };
    renderizar();
}

function actualizarProfesional(nombre) {
    reservaActual.profesional = {
        nombre: nombre.toUpperCase()
    };
    renderizar();
}

function actualizarFechaHora(fecha, hora) {
    reservaActual.fecha = fecha;
    reservaActual.hora = hora;
    renderizar();
}

function confirmarReserva() {
    alert(`RESERVA CONFIRMADA\n\n` +
          `${reservaActual.servicio.nombre}\n` +
          `${reservaActual.profesional.nombre}\n` +
          `${reservaActual.fecha} / ${reservaActual.hora}\n` +
          `${formatearPrecio(calcularTotal())}`);
    
    return reservaActual;
}

window.ConfirmacionServicio = {
    actualizarServicio,
    actualizarProfesional,
    actualizarFechaHora,
    confirmarReserva
};