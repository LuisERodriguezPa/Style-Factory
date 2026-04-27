if (document.getElementById('cards-container')) {
    fetch('/components/navbar/navbar.html')
        .then(res => res.text())
        .then(html => { document.getElementById('header').innerHTML = html; })
        .catch(err => console.error('Error cargando el navbar:', err));

    fetch('/components/footer/footer.html')
        .then(res => res.text())
        .then(html => { document.getElementById('footer-placeholder').innerHTML = html; })
        .catch(err => console.error('Error cargando el footer:', err));

    document.addEventListener('DOMContentLoaded', renderizarCatalogo);
}

// Array con los 10 productos iniciales
const productos = [
    {
        id: 1,
        nombre: "Corte de Cabello Premium",
        descripcion: "Corte moderno con técnicas personalizadas según tu tipo de cabello.",
        precio: 45000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957776/cortePremium_engl79.png",
        status: true
    },
    {
        id: 2,
        nombre: "Tinte y Coloración",
        descripcion: "Coloración de alta calidad con marcas premium. Resultados duraderos.",
        precio: 120000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957782/tinteColoracion_xlsf5v.png",
        status: true
    },
    {
        id: 3,
        nombre: "Tratamiento de Keratina",
        descripcion: "Alisado profundo que elimina el frizz y deja el cabello sedoso.",
        precio: 180000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957777/keratina_bjqvof.png",
        status: true
    },
    {
        id: 4,
        nombre: "Barba y Afeitado",
        descripcion: "Servicio completo de perfilado de barba y afeitado clásico.",
        precio: 35000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957775/barbaAfeitado_fcacso.png",
        status: true
    },
    {
        id: 5,
        nombre: "Peinado para Eventos",
        descripcion: "Peinados profesionales para bodas, graduaciones y eventos especiales.",
        precio: 80000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957782/peinadoEventos_bk9cyr.png",
        status: true
    },
    {
        id: 6,
        nombre: "Mechas y Reflejos",
        descripcion: "Técnicas de mechas californianas, babylights y reflejos.",
        precio: 150000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957780/mechasReflejos_p5hod7.png",
        status: true
    },
    {
        id: 7,
        nombre: "Tratamiento Capilar",
        descripcion: "Hidratación y nutrición profunda para cabello maltratado.",
        precio: 65000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957783/tratamientoCapilar_mqkb13.png",
        status: true
    },
    {
        id: 8,
        nombre: "Cepillado Brasileño",
        descripcion: "Alisado progresivo que reduce el volumen y da brillo.",
        precio: 160000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957775/cepilladoBrasile%C3%B1o_ela99r.png",
        status: true
    },
    {
        id: 9,
        nombre: "Maquillaje Profesional",
        descripcion: "Maquillaje para ocasiones especiales con productos de alta calidad.",
        precio: 90000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957779/maquillajeProfesional_h9vo1k.png",
        status: true
    },
    {
        id: 10,
        nombre: "Limpieza Facial",
        descripcion: "Tratamiento facial profundo para eliminar impurezas y revitalizar.",
        precio: 70000,
        imagen: "https://res.cloudinary.com/diq2bkb49/image/upload/v1776957778/limpiezaFacial_fmvrnn.png",
        status: true
    }
];

// Lee del localStorage y renderiza las cards en el DOM.
// Si el localStorage esta vacio, usa el array hardcodeado como respaldo.
function renderizarCatalogo() {
    const container = document.getElementById('cards-container');
    
    // Si el contenedor no existe no tiene nada que renderizar
    if (!container) {
        console.error("No se encontró el contenedor 'cards-container'");
        return;
    }

    // Lee la lista del localStorage, si esta vacia, usa los productos iniciales
    const lista = JSON.parse(localStorage.getItem("Lista de Servicios")) || productos;

    
    console.log("Lista desde localStorage:", lista)
    console.log("Total items:", lista.length)

    // Filtra solo los productos activos
    const productosActivos = lista.filter(producto => {
    return producto.status === true || producto.status === "true";
    });
    
    // Genera el HTML de cada card y lo inserta en el contenedor/
    const html = productosActivos.map(producto => {
        // Formatea el precio con separadores de miles en pesos Colombianos
        const precioFormateado = Number(producto.precio).toLocaleString('es-CO');
        return `
            <div class="card-servicio">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="card-imagen">
                <div class="card-contenido">
                    <h3 class="card-titulo">${producto.nombre}</h3>
                    <p class="card-descripcion">${producto.descripcion}</p>
                    <div class="card-precio">$${precioFormateado}</div>
                    <button class="btn-reservar" data-id="${producto.id}">RESERVAR</button>
                </div>
            </div>
        `;
    }).join('');

    // Inserta las cards en el DOM
    container.innerHTML = html;

    // Agrega el evento click a cada boton de reservar
    document.querySelectorAll('.btn-reservar').forEach(boton => {
        boton.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            alert(`Reservaste el servicio ID: ${id}. Próximamente disponible.`);
        });
    });
}

// Ejecuta el renderizado cuando el DOM este completamente cargado.
document.addEventListener('DOMContentLoaded', renderizarCatalogo);

// Exporta el array
export default productos;