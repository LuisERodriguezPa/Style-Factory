fetch('../../components/navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el navbar:', err));

fetch('../../components/maps/maps.html')
    .then(res => res.text())
    .then(html => {
    document.getElementById('map-placeholder').innerHTML = html;

    // Carga el CSS del mapa dinámicamente
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../components/maps/maps.css';
    document.head.appendChild(link);

    // Inicializa el mapa después de insertar el HTML
    setTimeout(() => {
        inicializacionMap();
    }, 100);
});

fetch('../../components/footer/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));