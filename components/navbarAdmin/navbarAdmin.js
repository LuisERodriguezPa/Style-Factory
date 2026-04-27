function initNavbarAdmin() {
    const boton = document.querySelector('.boton-hamburguesa');
    const menu = document.querySelector('#menuLateral');

    boton.addEventListener('mouseenter', () => {
        const bsOffcanvas = new bootstrap.Offcanvas(menu);
        bsOffcanvas.show();
    });

    menu.addEventListener('mouseleave', () => {
        const bsOffcanvas = new bootstrap.Offcanvas(menu);
        bsOffcanvas.hide();
    });
}