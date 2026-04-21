
fetch('components/navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el navbar:', err));

fetch('components/infoIndex/infoIndex.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('infoIndex-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el navbar:', err));

fetch('components/footer/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));

fetch('components/review/review.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('review-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));