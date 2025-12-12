document.getElementById('editAccountForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const usuarioID = document.getElementById('editAccountForm').getAttribute('data-usuario-id');

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const response = await fetch(`/api/users/${usuarioID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cuenta actualizada exitosamente');
            window.location.href = `/cuenta/${usuarioID}`;
        } else {
            alert(data.error || 'Error al actualizar cuenta');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar cuenta');
    }
});
