const productos = [
    {
        id: 1,
        nombre: "Corte de Cabello Premium",
        descripcion: "Corte moderno con técnicas personalizadas según tu tipo de cabello.",
        precio: 45000,
        imagen: "./imagesCatalogoServicios/cortePremium.png",
        status: true
    },
    {
        id: 2,
        nombre: "Tinte y Coloración",
        descripcion: "Coloración de alta calidad con marcas premium. Resultados duraderos.",
        precio: 120000,
        imagen: "./imagesCatalogoServicios/tinteColoracion.png",
        status: true
    },
    {
        id: 3,
        nombre: "Tratamiento de Keratina",
        descripcion: "Alisado profundo que elimina el frizz y deja el cabello sedoso.",
        precio: 180000,
        imagen: "./imagesCatalogoServicios/keratina.png",
        status: true
    },
    {
        id: 4,
        nombre: "Barba y Afeitado",
        descripcion: "Servicio completo de perfilado de barba y afeitado clásico.",
        precio: 35000,
        imagen: "./imagesCatalogoServicios/barbaAfeitado.png",
        status: true
    },
    {
        id: 5,
        nombre: "Peinado para Eventos",
        descripcion: "Peinados profesionales para bodas, graduaciones y eventos especiales.",
        precio: 80000,
        imagen: "./imagesCatalogoServicios/peinadoEventos.png",
        status: true
    },
    {
        id: 6,
        nombre: "Mechas y Reflejos",
        descripcion: "Técnicas de mechas californianas, babylights y reflejos.",
        precio: 150000,
        imagen: "./imagesCatalogoServicios/mechasReflejos.png",
        status: true
    },
    {
        id: 7,
        nombre: "Tratamiento Capilar",
        descripcion: "Hidratación y nutrición profunda para cabello maltratado.",
        precio: 65000,
        imagen: "./imagesCatalogoServicios/tratamientoCapilar.png",
        status: true
    },
    {
        id: 8,
        nombre: "Cepillado Brasileño",
        descripcion: "Alisado progresivo que reduce el volumen y da brillo.",
        precio: 160000,
        imagen: "./imagesCatalogoServicios/cepilladoBrasileño.png",
        status: true
    },
    {
        id: 9,
        nombre: "Maquillaje Profesional",
        descripcion: "Maquillaje para ocasiones especiales con productos de alta calidad.",
        precio: 90000,
        imagen: "./imagesCatalogoServicios/maquillajeProfesional.png",
        status: true
    },
    {
        id: 10,
        nombre: "Limpieza Facial",
        descripcion: "Tratamiento facial profundo para eliminar impurezas y revitalizar.",
        precio: 70000,
        imagen: "./imagesCatalogoServicios/limpiezaFacial.png",
        status: true
    }
];

function renderizarCatalogo() {
    const container = document.getElementById('cards-container');
    
    if (!container) {
        console.error("No se encontró el contenedor 'cards-container'");
        return;
    }
    
    // Filtrar solo los productos activos
    const productosActivos = productos.filter(producto => producto.status === true);
    
    // Generar el HTML con map()
    const html = productosActivos.map(producto => {
        const precioFormateado = producto.precio.toLocaleString('es-CO');
        return `
            <div class="card-servicio">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="card-imagen">
                <div class="card-contenido">
                    <h3 class="card-titulo">${producto.nombre}</h3>
                    <p class="card-descripcion">${producto.descripcion}</p>
                    <div class="card-precio">$${precioFormateado}</div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderizarCatalogo);