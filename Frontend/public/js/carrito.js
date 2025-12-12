const usuarioIDElement = document.querySelector('[data-usuario-id]');
const usuarioID = usuarioIDElement ? usuarioIDElement.getAttribute('data-usuario-id') : null;

// Eliminar una unidad de un producto
document.querySelectorAll('.eliminar-producto-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const carritoID = e.target.getAttribute('data-carrito-id');

        if (confirm('¿Deseas eliminar una unidad de este producto?')) {
            try {
                const response = await fetch(`/api/carrito/producto/${carritoID}/${usuarioID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (data.success) {
                    alert('Producto eliminado del carrito');
                    location.reload();
                } else {
                    alert(data.message || 'Error al eliminar producto');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar producto del carrito');
            }
        }
    });
});

// Vaciar carrito
const clearCartBtn = document.getElementById('clear-cart-btn');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', async () => {
        if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
            try {
                const response = await fetch(`/api/carrito/vaciar/${usuarioID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (data.success) {
                    alert('Carrito vaciado exitosamente');
                    location.reload();
                } else {
                    alert(data.message || 'Error al vaciar carrito');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al vaciar carrito');
            }
        }
    });
}

// Proceder al pago (placeholder)
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Funcionalidad de pago en construcción');
    });
}
