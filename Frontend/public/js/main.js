// Guardar usuarioID en sessionStorage para uso posterior
const usuarioIDElement = document.querySelector('[data-usuario-id]');
if (usuarioIDElement) {
    const usuarioID = usuarioIDElement.getAttribute('data-usuario-id');
    sessionStorage.setItem('usuarioID', usuarioID);
}

// Agregar productos al carrito
document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const nombreProducto = e.target.getAttribute('data-nombre');
        const cantidadInput = document.querySelector(`.cantidad-input[data-nombre="${nombreProducto}"]`);
        const cantidad = cantidadInput.value;
        const usuarioID = sessionStorage.getItem('usuarioID');

        if (!cantidad || cantidad <= 0) {
            alert('Por favor ingresa una cantidad válida');
            return;
        }

        try {
            const response = await fetch(`/api/carrito/agregar/${usuarioID}/${nombreProducto}/${cantidad}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                alert('Producto agregado al carrito exitosamente');
                cantidadInput.value = 1; // Reset cantidad
            } else {
                alert(data.message || 'Error al agregar producto');
            }
        } catch (error) {
            alert('Error al agregar producto al carrito');
        }
    });
});
