var loginForm = document.getElementById('loginForm');

var mensaje = document.getElementById('mensaje')


loginForm.addEventListener("submit",(evento) =>{
    evento.preventDefault()
    // Obtener los valores ingresados por el usuario
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    let mensajesError = "";

    // Validar los campos (por ejemplo, verificar que no estén vacíos)
    if (username === '' || password === '') {
        mensajesError += '<p>Por favor, ingresa tu nombre de usuario y contraseña.</p>'
    }

    // Obtener los datos del usuario guardados en localStorage
    var usuarioGuardado = localStorage.getItem('usuarioRegistrado');

    if (usuarioGuardado) {
        usuarioGuardado = JSON.parse(usuarioGuardado);

        // Comparar los datos ingresados con los datos almacenados
        if (username === usuarioGuardado.nombreDeUsuarioEscogido && password === usuarioGuardado.contraseniaEscogida) {
            localStorage.setItem('usuarioHaSidoResgistrado',JSON.stringify(username))

            window.location.href = '../pages/vistaPrincipal.html';
        } else {
            // Datos incorrectos
            mensajesError += '<p>Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.</p>'

        }
    } else {
        // No hay usuario registrado

        mensajesError += '<p>No se encontró ningún usuario registrado. Por favor, regístrate primero.</p>'
        
        mensaje.innerHTML = mensajesError

    }
})