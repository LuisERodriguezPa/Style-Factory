fetch('/components/forms/creacionServicios/formCreacionServicios.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('form-services').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el información index:', err));