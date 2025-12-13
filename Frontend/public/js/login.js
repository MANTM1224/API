document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.usuario) {
            alert('Login exitoso');
            // Guardar el usuarioID en sessionStorage
            sessionStorage.setItem('usuarioID', data.usuario.ID);
            // Redirigir a la tienda principal con el usuarioID
            window.location.href = `/?usuarioID=${data.usuario.ID}`;
        } else {
            alert(data.error || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
});
