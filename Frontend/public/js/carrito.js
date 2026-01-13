const usuarioIDElement = document.querySelector('[data-usuario-id]');
const pageUsuarioID = usuarioIDElement ? usuarioIDElement.getAttribute('data-usuario-id') : null;
const sessionUsuarioID = sessionStorage.getItem('usuarioID');
const sessionUsuarioActivo = sessionStorage.getItem('usuarioActivo');
const usuarioID = sessionUsuarioID || pageUsuarioID;
const usuarioActivo = sessionUsuarioActivo === null ? null : (sessionUsuarioActivo === 'true' || sessionUsuarioActivo === '1');

function ensureLoggedAndActive(actionDescription = 'realizar esta acción') {
    if (!usuarioID) {
        alert('No hay ninguna cuenta iniciada. Debes iniciar sesión para ' + actionDescription + '.');
        return false;
    }
    if (usuarioActivo === false) {
        alert('Tu cuenta está inactiva. No puedes ' + actionDescription + '.');
        return false;
    }
    return true;
}

// Parse response safely: try JSON, fall back to text
async function parseResponse(res) {
    let data = { success: false, message: res.statusText };
    try {
        const json = await res.json();
        if (json && typeof json === 'object') return json;
    } catch (e) {
        try {
            const text = await res.text();
            if (text) return { success: false, message: text };
        } catch (e2) {
            // ignore
        }
    }
    return data;
}

// El carrito se renderiza desde el backend (EJS).
// No hacemos fetch para “pintar” los artículos en el front.

// Agregar producto al carrito (NombreProducto y cantidad)
async function agregarAlCarrito(NombreProducto, cantidad = 1) {
    if (!ensureLoggedAndActive('agregar productos al carrito')) return;
    try {
        const res = await fetch(`/api/carrito/agregar/${usuarioID}/${encodeURIComponent(NombreProducto)}/${cantidad}`, { method: 'POST' });
        const data = await parseResponse(res);
        if (res.ok && data.success) {
            alert(data.message || 'Producto agregado al carrito');
            // Si el usuario está viendo el carrito renderizado por backend, recarga para reflejar cambios.
            if (document.querySelector('.carrito-container')) {
                location.reload();
            }
        } else {
            alert(data.message || `Error ${res.status}: ${res.statusText}`);
        }
    } catch (err) {
        console.error('Error agregarAlCarrito:', err);
        alert('Error al agregar al carrito');
    }
}

// Eliminar una unidad de un producto
document.querySelectorAll('.eliminar-producto-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const carritoID = e.target.getAttribute('data-carrito-id');

        if (!ensureLoggedAndActive('eliminar productos del carrito')) return;

        if (confirm('¿Deseas eliminar una unidad de este producto?')) {
            try {
                const response = await fetch(`/api/carrito/producto/${carritoID}/${usuarioID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await parseResponse(response);

                if (response.ok && data.success) {
                    alert(data.message || 'Producto eliminado del carrito');
                    location.reload();
                } else {
                    alert(data.message || `Error ${response.status}: ${response.statusText}`);
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
        if (!ensureLoggedAndActive('vaciar el carrito')) return;

        if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
            try {
                const response = await fetch(`/api/carrito/vaciar/${usuarioID}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await parseResponse(response);

                if (response.ok && (data.message === 'Carrito vaciado exitosamente' || data.success)) {
                    alert(data.message || 'Carrito vaciado exitosamente');
                    location.reload();
                } else {
                    alert(data.message || `Error ${response.status}: ${response.statusText}`);
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
        if (!ensureLoggedAndActive('pagar')) return;
        if (!confirm('Confirmar pago y finalizar compra?')) return;
        try {
            const res = await fetch(`/api/carrito/pagar/${usuarioID}`, { method: 'POST' });
            const data = await parseResponse(res);
            if (res.ok && data.success) {
                alert(data.message || 'Pago procesado correctamente');
                window.location.href = `/historial/${usuarioID}`;
            } else {
                alert(data.message || `Error ${res.status}: ${res.statusText}`);
            }
        } catch (err) {
            console.error('Error procesar pago:', err);
            alert('Error al procesar el pago');
        }
    });
}
