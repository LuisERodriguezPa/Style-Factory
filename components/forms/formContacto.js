// Validar teléfono antes de enviar
function validarTelefono(telefono) {
    // Eliminar espacios, guiones, paréntesis, etc.
    const telefonoLimpio = telefono.replace(/[\s\-\(\)\+]/g, '');
    
    // Verificar que sean solo números
    const soloNumeros = /^\d+$/.test(telefonoLimpio);
    
    // Verificar longitud mínima (ejemplo: 9 dígitos para celular)
    const longitudValida = telefonoLimpio.length >= 9 && telefonoLimpio.length <= 15;
    
    return soloNumeros && longitudValida;
}

// En el evento submit del formulario
document.getElementById('formContacto').addEventListener('submit', function(e) {
    const telefono = document.getElementById('telefono');
    const errorSpan = telefono.parentElement.querySelector('.error');
    
    if (telefono.value.trim() !== '' && !validarTelefono(telefono.value)) {
        e.preventDefault();
        errorSpan.textContent = 'Ingrese un número de teléfono válido (solo dígitos, 9-15 caracteres)';
        telefono.focus();
    } else {
        errorSpan.textContent = '';
    }
});