const usuarioIDElement = document.querySelector('[data-usuario-id]');
const usuarioID = usuarioIDElement ? usuarioIDElement.getAttribute('data-usuario-id') : null;

// Obtener carrito y renderizar (si existe contenedor)
async function fetchCarrito() {
    if (!usuarioID) return;
    try {
        const res = await fetch(`/api/carrito/${usuarioID}`);
        const data = await res.json();
        if (res.ok && data.success && data.data) {
            const container = document.getElementById('carrito-container');
            if (container) {
                // Render básico
                container.innerHTML = data.data.map(item => `
                    <div class="carrito-item">
                        <span>${item.Nombre} x ${item.cantidad}</span>
                        <span>$${item.Precio}</span>
                    </div>
                `).join('');
            }
        }
    } catch (err) {
        console.error('Error al obtener carrito:', err);
    }
}

// Agregar producto al carrito (NombreProducto y cantidad)
async function agregarAlCarrito(NombreProducto, cantidad = 1) {
    if (!usuarioID) { alert('Debes iniciar sesión para agregar al carrito'); return; }
    try {
        const res = await fetch(`/api/carrito/agregar/${usuarioID}/${encodeURIComponent(NombreProducto)}/${cantidad}`, { method: 'POST' });
        const data = await res.json();
        if (res.ok && data.success) {
            alert('Producto agregado al carrito');
            fetchCarrito();
        } else {
            alert(data.message || 'No se pudo agregar el producto');
        }
    } catch (err) {
        console.error('Error agregarAlCarrito:', err);
        alert('Error al agregar al carrito');
    }
}

// Auto-cargar carrito si hay contenedor
document.addEventListener('DOMContentLoaded', () => fetchCarrito());

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

                if (data.message === 'Carrito vaciado exitosamente' || data.success) {
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
    checkoutBtn.addEventListener('click', async () => {
        if (!usuarioID) { alert('Debes iniciar sesión para pagar'); return; }
        if (!confirm('Confirmar pago y finalizar compra?')) return;
        try {
            const res = await fetch(`/api/carrito/pagar/${usuarioID}`, { method: 'POST' });
            const data = await res.json();
            if (res.ok && data.success) {
                alert('Pago procesado correctamente');
                window.location.href = `/historial/${usuarioID}`;
            } else {
                alert(data.message || 'Error al procesar el pago');
            }
        } catch (err) {
            console.error('Error procesar pago:', err);
            alert('Error al procesar el pago');
        }
    });
}
