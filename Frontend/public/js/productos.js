// Agregar nuevo producto
document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('nombre').value;
    const price = parseFloat(document.getElementById('precio').value);
    const categoryid = parseInt(document.getElementById('categoryid').value);
    const stock = parseInt(document.getElementById('stock').value);

    try {
        const response = await fetch('/api/products/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, price, categoryid, stock })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || 'Producto agregado exitosamente');
            location.reload();
        } else {
            alert(data.message || 'Error al agregar producto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar producto');
    }
});

// Eliminar producto
document.querySelectorAll('.btn-eliminar-producto').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const productId = e.target.getAttribute('data-id');
        
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            alert('Funcionalidad de eliminar producto no implementada en el backend. Necesitas agregar esta ruta.');
        }
    });
});
