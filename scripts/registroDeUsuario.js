
document.addEventListener('DOMContentLoaded', function () {
    // Este event listener es para solucionar el error en donde el compilador de la web no ejecuta el archivo js
    /* Osea, este tipo de error por ejemplo: 
    registroDeUsuario.js:45 Uncaught TypeError: Cannot read properties of null (reading 'value')
    at validar (registroDeUsuario.js:45:77)
    at HTMLFormElement.<anonymous> (registroDeUsuario.js:30:5)
validar	@	registroDeUsuario.js:45
(anónimo)	@	registroDeUsuario.js:30

Se suele solucionar colocando el js debajo del main del sitio web, pero por si acaso es mejor utilizarlo para prevenirlo
    */


    //guarda el formulario en la variable form
    let form = document.querySelector("form")

    // guarda el mensaje en una variable del mismo nombre
    let mensaje = document.querySelector("#mensaje");

    /*
    
         1) Se añade el evento "escuchador" en form
    2) escucha el evento 'submit' que se dispara cuando
    se busca enviar dicho formulario haciendo click o con enter
    3) (evento) => {...} es una funcion de flecha (o arrow function)
    
    evento almacena la informacion del evento que se disparo (en este caso submit)
    y a continuacion se analiza 
    
    4) preventDefault() previene que la informacion se envie automaticamente por ende 
    es crucial 
    
    5) se invoca a la funcion validar() en donde contiene la logica 
    de validacion de los campos
    
    
        */
    form.addEventListener("submit", (evento) => {
        evento.preventDefault()
        validar()
    })

    function validar() {


        let error = false

        let mensajesError = ""
        //llamamos a los valores que contienen los ids
        //la funcion trim elimina los espacios vacios de los extremos del string 
        let nombre = document.querySelector("#nombre").value.trim()
        let apellido = document.querySelector("#apellido").value.trim()
        let email = document.querySelector('#correo').value.trim()
        let nombre_de_usuario = document.querySelector('#nombre_de_usuario').value.trim()
        let contrasenia = document.querySelector('#contraseña').value.trim()
        let repetir_contrasenia = document.querySelector('#repetir_contraseña').value.trim()
        let metodosDePagos = document.getElementsByName('metodo_de_pago')

        


        // variable para determinar que se haya seleccionado una opción del radio

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

        // Recorrer los radios para encontrar el método de pago seleccionado
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
            //muestre los errores
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
                // Agregar más campos según sea necesario
            };
            localStorage.setItem('usuarioRegistrado',JSON.stringify(usuario))
            form.submit();

            
        }

    }

    //NOTA: El .test valida si la variable pasada por parametro cumple con lo condicionado en la expresion regular
    function validarNombreOApellido(valor) {
        // Expresión regular para verificar que solo contiene letras y no está vacío
        return /^[a-zA-Z]+$/.test(valor)
    }

    function validarEmail(email) {
        //Expresion regular para validar el mail
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }


    function validarNombreUsuario(username) {
        // Expresion regular para verificar si dicho campo contiene letras y numeros
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    }

    function validarPassword(password) {
        // Expresión regular para verificar si la contraseña cumple con el minimo de 8 caracteres, 2 letras, 2 caracteres especiales y 2 numeros
        const re = /^(?=.*[a-zA-Z]{2,})(?=.*[0-9]{2,})(?=.*[\W_]{2,})[a-zA-Z0-9\W_]{8,}$/;
        return re.test(password);
    }


    function validarNumeroTarjeta(numeroTarjeta) {

        // Obtener los dígitos de la tarjeta como array
        var digitos = numeroTarjeta.split('').map(Number);

        // Verificar paridad del último dígito según la suma de los anteriores
        var sumaDigitosAnteriores = digitos.slice(0, -1).reduce((a, b) => a + b, 0);
        var ultimoDigito = digitos[digitos.length - 1];

        if (sumaDigitosAnteriores % 2 === 0) {
            // Suma de los anteriores es par, último dígito debe ser impar
            return ultimoDigito % 2 !== 0;
        } else {
            // Suma de los anteriores es impar, último dígito debe ser par
            return ultimoDigito % 2 === 0;
        }

    }



});

