const seleccion = document.getElementById('metodo-pago-select');
const botonPagar = document.getElementById('checkout-btn');

seleccion.addEventListener('change', () => {
    if (seleccion.value !== 'Seleccionar metodo de pago') {
        botonPagar.style.display = 'inline-block';
    } else {
        botonPagar.style.display = 'none';
    }
});