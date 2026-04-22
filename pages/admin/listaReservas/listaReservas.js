// Funcionalidad para los botones de acción de la tabla de reservas
document.addEventListener("DOMContentLoaded", function() {
    
    // Editar reserva
    const botonesEditar = document.querySelectorAll(".btn-accion[title='Editar']");
    botonesEditar.forEach(btn => {
        btn.addEventListener("click", function() {
            alert("Funcionalidad de edición - En desarrollo");
        });
    });

    // Eliminar reserva
    const botonesEliminar = document.querySelectorAll(".btn-accion[title='Eliminar']");
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", function() {
            alert("Funcionalidad de eliminación - En desarrollo");
        });
    });

    // Confirmar check-in
    const botonesCheck = document.querySelectorAll(".btn-accion[title='Check']");
    botonesCheck.forEach(btn => {
        btn.addEventListener("click", function() {
            alert("Confirmación de check-in - En desarrollo");
        });
    });
});