document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert('Login exitoso');
            sessionStorage.setItem('usuarioID', data.usuario.ID);
            window.location.href = `/?usuarioID=${data.usuario.ID}`;
        } else {
            // Mostrar mensaje detallado si está disponible
            const message = data.error || data.details || 'Credenciales incorrectas';
            alert(message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al iniciar sesión');
    }
});
