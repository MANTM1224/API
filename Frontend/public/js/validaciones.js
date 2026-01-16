function verificar(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[A-Za-z0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function verificarCorreoE(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[A-Za-z0-9@._-]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function validarCrearCuenta(){
    var nombre = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmarPassword = document.getElementById("confirmPassword").value;

    const resUser = /^[A-Za-z0-9\d .]{3,50}$/;
    const resContra = /^[A-Za-z0-9\-_.,"#%]{6,20}$/;
    const resCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/;

    if(!nombre || !email || !password || !confirmarPassword){
        alert("Por favor, complete todos los campos.");
        return false;
    }

    if (!resUser.test(nombre)) {
        alert("El nombre debe tener entre 3 y 50 caracteres.");
        return false;
    }

    if (!resCorreo.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    
    if (!resContra.test(password) || !resContra.test(confirmarPassword)) {
        alert("La contraseña debe tener entre 6 y 20 caracteres.");
        return false;
    }

    if(password !== confirmarPassword){
        alert("Las contraseñas no coinciden.");
        return false;
    }
    return true;
}

function validarEditarCuenta(){
    var nombre = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmarPassword = document.getElementById("confirmPassword").value;

    const resUser = /^[A-Za-z0-9\d .]{3,50}$/;
    const resContra = /^[A-Za-z0-9\-_.,"#%]{6,20}$/;

    if(!nombre || !password || !confirmarPassword){
        alert("Por favor, complete todos los campos.");
        return false;
    }

    if (!resUser.test(nombre)) {
        alert("El nombre debe tener entre 3 y 50 caracteres.");
        return false;
    }

    if (!resContra.test(password) || !resContra.test(confirmarPassword)) {
        alert("La contraseña debe tener entre 6 y 20 caracteres.");
        return false;
    }

    if(password !== confirmarPassword){
        alert("Las contraseñas no coinciden.");
        return false;
    }
    return true;
}

function validarIniciarSesion(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    const resCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/;
    const resContra = /^[A-Za-z0-9\-_.,"#%]{6,20}$/;

    if(!email || !password){
        alert("Por favor, complete todos los campos.");
        return false;
    }

    if (!resCorreo.test(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }

    if (!resContra.test(password)) {
        alert("La contraseña debe tener entre 6 y 20 caracteres.");
        return false;
    }
    return true;
}

function validarProducto(){
    var nombre = document.getElementById("nombre").value;
    var precio = document.getElementById("precio").value;
    var categoria = document.getElementById("categoryid").value;
    var stock = document.getElementById("stock").value;

    if(!nombre || !precio || !categoria || !stock){
        alert("Por favor, complete todos los campos.");
        return false;
    }
    if(isNaN(precio) || precio <= 0){
        alert("Por favor, ingrese un precio válido.");
        return false;
    }else if (precio > 10000){
        alert("El precio no puede ser mayor a 10,000.");
        return false;
    }
    if(isNaN(stock) || stock < 0 || !Number.isInteger(Number(stock))){
        alert("Por favor, ingrese una cantidad de stock válida.");
        return false;
    }
}

function validarCantidad(stockDisponible){
    var cantidad = document.getElementById("cantidad").value;

    if(!cantidad){
        alert("Por favor, ingrese una cantidad.");
        return false;
    }
    if(isNaN(cantidad) || cantidad <= 0 || !Number.isInteger(Number(cantidad))){
        alert("Por favor, ingrese una cantidad válida.");
        return false;
    }
    if(cantidad > 10){
        alert("La cantidad máxima por producto es 10.");
        return false;
    }
    if(stockDisponible && cantidad > stockDisponible){
        alert("No hay suficiente stock disponible. Stock disponible: " + stockDisponible);
        return false;
    }

    return true;
}

function agregarAlCarrito(nombreProducto, stock) {
    // Obtener la cantidad ingresada
    var cantidadInput = event.target.closest('form').querySelector('input[name="cantidad"]');
    var cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;
    
    // Validar que haya stock disponible
    if(stock <= 0) {
        alert('Producto no disponible en stock.');
        return false;
    }
    
    // Validar la cantidad ingresada
    if(!cantidad || cantidad <= 0){
        alert("Por favor, ingrese una cantidad válida.");
        return false;
    }
    
    if(cantidad > stock){
        alert('No hay suficiente stock. Stock disponible: ' + stock);
        return false;
    }
    
    if(cantidad > 10){
        alert('La cantidad máxima por producto es 10.');
        return false;
    }
    
    // Todo está correcto, mostrar mensaje de confirmación
    alert('"' + nombreProducto + '" ha sido agregado al carrito.');
    return true;
}

