document.getElementById('registerForm').addEventListener('submit', async (e) => {

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Las contraseñas no coinciden');
        return;
    }
    // Enviar por fetch para manejar respuesta del backend
    e.preventDefault();
    try {
        const response = await fetch('/user/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        if (!response.ok) {
            if (data.error === 'El nombre de usuario ya está en uso') {
                alert('El nombre de usuario ya está en uso. Intenta con otro.');
            } else if (data.error === 'El correo electrónico ya está registrado en otra cuenta') {
                alert('El correo electrónico ya está registrado en otra cuenta. Usa otro correo.');
            } else {
                alert('No se pudo crear el usuario: ' + (data.error || 'Error desconocido'));
            }
            return;
        }
        alert('Usuario creado exitosamente');
        window.location.href = '/iniciarSs';
    } catch (err) {
        alert('Error de red o del servidor. Intenta más tarde.');
    }
});
