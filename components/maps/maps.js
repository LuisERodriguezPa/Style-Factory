
// Creación del array de sucursales
const sucursales = [
    {
        nombre: "Style Factory - Sede Principal",
        img: "../../assets/images/sucursales/Style1.png",
        direccion: "Calle 123 #45-67, Bogotá",
        lat: 4.6097,
        lng: -74.0817
    },
    {
        nombre: "Style Factory - Chapinero",
        img: "../../assets/images/sucursales/Style2.png",
        direccion: "Carrera 13 #54-32, Bogotá",
        lat: 4.6473,
        lng: -74.0662
    },
    {
        nombre: "Style Factory - Usaquén",
        img: "../../assets/images/sucursales/Style3.png",
        direccion: "Calle 119 #6-21, Bogotá",
        lat: 4.6941,
        lng: -74.0291
    }
];

// Esta función renderiza el mapa y sus marcadores
function inicializacionMap() {
    const map = new google.maps.Map(document.getElementById("map"), {

        // Posición inicial del mapa
        zoom: 12,
        center: { lat: 4.6473, lng: -74.0662 },

        // Estilos de cada elemento del mapa
        styles: [
            { elementType: "geometry", stylers: [{ color: "#2a133d" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#B5ADAD" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#111" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2c2c" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a0a0a" }] },
            { featureType: "poi", stylers: [{ visibility: "off" }] }
        ]
    });

    // Definición externa de la variable para que solo se abra una ventana a la vez
    const ventanaInformacion = new google.maps.InfoWindow();
    const listaSedes = document.getElementById("sedes-list")
    const markers = []

    // Recorre el array de las sucursales
    sucursales.forEach((sucursal, index) => {
        // Creación de un nuevo objeto Marcador
        const marker = new google.maps.Marker({
            // asigna a ese nuevo marcador la posición y en cual mapa los debe poner
            position: { lat: sucursal.lat, lng: sucursal.lng },
            map,
            // Crea el tooltip que aparece sobre el marcador
            title: sucursal.nombre,
            // Asigna el estilo que va a tener ese marcador
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 15,
                fillColor: "#000000",
                fillOpacity: 1,
                strokeColor: "#AE8D3E",
                strokeWeight: 2
            }
        });

        markers.push(marker)

        function abrirVentana() {
            document.querySelectorAll(".sede-card").forEach(c => c.classList.remove("activa"));
            document.getElementById(`sede-${index}`).classList.add("activa");

            ventanaInformacion.setContent(`
                <div style="font-family:'Montserrat',sans-serif; padding:8px; color:#111; width:220px">
                    <div style="width:100%; height:130px; overflow:hidden; border-radius:6px; margin-bottom:8px; background:#f0f0f0; display:flex; align-items:center; justify-content:center;">
                        <img src="${sucursal.img}" alt="${sucursal.nombre}"
                            style="max-width:100%; max-height:130px; object-fit:contain;">
                    </div>
                    <strong style="color:#522676">${sucursal.nombre}</strong><br>
                    <span style="font-size:13px">${sucursal.direccion}</span>
                </div>
            `);
            ventanaInformacion.open(map, marker);
            map.panTo(marker.getPosition());
        }

        marker.addListener("click", abrirVentana);

        const card = document.createElement("div")
        card.className = 'sede-card'
        card.id = `sede-${index}`
        card.innerHTML = `
            <img class="sede-card-img" src="${sucursal.img}" alt="${sucursal.nombre}">
            <div class="sede-card-info">
                <h4>${sucursal.nombre}</h4>
                <p>${sucursal.direccion}</p>
            </div>
        `;

        card.addEventListener("click", abrirVentana)
        listaSedes.appendChild(card)
    });
}

// Hace que google lo pueda encontrar despues de cargar la pagina
window.initMap = inicializacionMap;


