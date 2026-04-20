fetch('../../components/navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el navbar:', err));

fetch('../../components/footer/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));