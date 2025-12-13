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
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmarPassword = document.getElementById("confirmarPassword").value;

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