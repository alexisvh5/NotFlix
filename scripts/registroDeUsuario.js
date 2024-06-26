
document.addEventListener('DOMContentLoaded', function () {
  


    let form = document.querySelector("form")

    let mensaje = document.querySelector("#mensaje");

 
    form.addEventListener("submit", (evento) => {
        evento.preventDefault()
        validar()
    })

    function validar() {


        let error = false

        let mensajesError = ""
   
        let nombre = document.querySelector("#nombre").value.trim()
        let apellido = document.querySelector("#apellido").value.trim()
        let email = document.querySelector('#correo').value.trim()
        let nombre_de_usuario = document.querySelector('#nombre_de_usuario').value.trim()
        let contrasenia = document.querySelector('#contraseña').value.trim()
        let repetir_contrasenia = document.querySelector('#repetir_contraseña').value.trim()
        let metodosDePagos = document.getElementsByName('metodo_de_pago')


        



        if (nombre == "" || validarNombreOApellido(nombre) == false) {
            error = true
            mensajesError += "<p>El campo nombre esta vacio o contiene datos numericos</p>"

        }

        if (apellido == "" || validarNombreOApellido(apellido) == false) {
            error = true
            mensajesError += "<p>El campo apellido esta vacio o contiene datos numericos</p>"

        }


        if (email == "" || validarEmail(email) == false) {

            error = true
            mensajesError += "<p>El email es invalido</p>"

        }

        if (nombre_de_usuario == "" || validarNombreUsuario(nombre_de_usuario) == false) {

            error = true
            mensajesError += "<p>El nombre de usuario solamente debe contener letras y numeros</p>"

        }

        if (contrasenia == "" || validarPassword(contrasenia) == false) {
            error = true
            mensajesError += "<p>La contrasenia debe tener 8 caracteres; minimo 2 letras, 2 caracteres especiales y 2 numeros</p>"
        }

        if (repetir_contrasenia == "" || repetir_contrasenia != contrasenia) {
            error = true
            mensajesError += "<p>La contrasenia que volviste a ingresar no corresponde con la anterior</p>"
        }






        var metodoPagoSeleccionado = null;

        for (var i = 0; i < metodosDePagos.length; i++) {
            if (metodosDePagos[i].checked) {
                metodoPagoSeleccionado = metodosDePagos[i].value;
                break;
            }

        }

        if (metodoPagoSeleccionado == null) {
            error = true;
            mensajesError += "<p>Tienes que seleccionar un metodo de pago</p>"

        }






        switch (metodoPagoSeleccionado) {
            case 'tarjeta':
               var numeroDeTarjeta = document.getElementById('numero_tarjeta').value
               var numeroDeSeguridad = document.getElementById('numero_de_seguridad').value

                regerNumeroDeSeguridad = /^\d[1-9]{2}$/




                if (validarNumeroTarjeta(numeroDeTarjeta) == false) {
                    error = true;
                    mensajesError += "<p>Numero de tarjeta invalidado</p>"
                }


                if (regerNumeroDeSeguridad.test(numeroDeSeguridad) == false || numeroDeSeguridad.toString() == "000") {
                    error = true;
                    mensajesError += "<p>Numero clave no valido</p>"
                }


                break;

            case 'cupon':

                cupones = document.getElementsByName('cupon_de_pago')
                console.log(cupones)
               var cuponSeleccionado = null
                for (var i = 0; i < cupones.length; i++) {
                    if (cupones[i].checked) {
                        cuponSeleccionado = cupones[i].value;
                        break; 
                    }
                }

                if(cuponSeleccionado == null){
                    error = true;
                    mensajesError += "<p>Seleccione un cupon por favor</p>"
                }

                break;

        }


        if (error) {
            mensaje.innerHTML = mensajesError;
        } else {

            var usuario = {
                nombreEscogido: nombre,
                apellidoEscogido: apellido,
                emailEscogido: email,
                nombreDeUsuarioEscogido: nombre_de_usuario,
                contraseniaEscogida: contrasenia,
                cuponEscogido:  cuponSeleccionado,
                numeroDeTarjetaCorrespondiente: numeroDeTarjeta,
                numeroDeSeguridadCorrespondiente: numeroDeSeguridad
            };
            localStorage.setItem('usuarioRegistrado',JSON.stringify(usuario))
            form.submit();

            
        }

    }

    function validarNombreOApellido(valor) {
        return /^[a-zA-Z]+$/.test(valor)
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    function validarNombreUsuario(username) {
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    }

    function validarPassword(password) {
        const re = /^(?=.*[a-zA-Z]{2,})(?=.*[0-9]{2,})(?=.*[\W_]{2,})[a-zA-Z0-9\W_]{8,}$/;
        return re.test(password);
    }


    function validarNumeroTarjeta(numeroTarjeta) {

        var digitos = numeroTarjeta.split('').map(Number);

        var sumaDigitosAnteriores = digitos.slice(0, -1).reduce((a, b) => a + b, 0);
        var ultimoDigito = digitos[digitos.length - 1];

        if (sumaDigitosAnteriores % 2 === 0) {
            return ultimoDigito % 2 !== 0;
        } else {
            return ultimoDigito % 2 === 0;
        }

    }



});

