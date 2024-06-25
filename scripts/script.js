let userRegistrado = {

    nombre : "alexis",
    email : "alexis.herediav@hotmail.com",
    contraseña : "alexis10"

}


let contaseñaActual = document.getElementById("inputContraseñaActual")
let nombreUser = document.querySelector("#nombreUser");///////// donde ponerlo
let inputEmail=document.getElementById("emailActual") ;
let form = document.querySelector("form");
let botonCambios = document.getElementById("guardar");
let contraseña = document.getElementById("guardar");
let nuevaContra = document.getElementById("nuevaContraseña");
let repetirContra = document.getElementById("repetirContraseña");
let mensaje = document.getElementById("correciones1")
let input3digitos = document.getElementById("numero3digitos");
let inputNumeroTarjeta = document.getElementById("numeroTarjeta");

let checkPago = document.getElementById("PagoFacil");
let checkRapiPago = document.getElementById("RapiPago");

let radios = document.getElementsByName("opcionDePago");
let checkPagos = document.getElementsByName("name1");




form.addEventListener("submit", (e) => {

    e.preventDefault();

    mensaje.innerHTML="";

    let poneNombre = false ;
    let esValido = true;
    let contraseñaBien = true;

  
    if (inputEmail.value === ''|| inputEmail.value !=userRegistrado.email) {
        mensaje.innerHTML += `<li>No estas poniendo Email correcto</li><li> es: ${userRegistrado.email}</li>`;
    }
    if (contaseñaActual.value === ''|| contaseñaActual.value !=userRegistrado.contraseña) {
        mensaje.innerHTML += "<li>No estas poniendo contraseña Actual correcta</li>";
    }

    if (nuevaContra.value === '') {

        mensaje.innerHTML += "<li>falta que ingreses la contraseña nueva</li>";
        esValido = false;
    }
    let reg = /^(?=(.*[A-Za-z]){2})(?=(.*\d){2})(?=(.*[!@#$%^&*()\-_=+{};:,<.>]){2}).{8,}$/;

    if (nuevaContra.value != '' && !(reg.test(nuevaContra.value))) {
        mensaje.innerHTML += "<li>la contraseña debe tener 8 caracteres como minimo: </li>";
        mensaje.innerHTML += "<li> debe tener 2 numeros, 2 letras y 2 caracteres especiales como minimo</li>";
        esValido = false;
        contraseñaBien = false;
    }
    if (contraseñaBien && repetirContra.value === '') {

        mensaje.innerHTML += "<li>falta que repitas la contra nueva</li>";
        esValido = false;
    }
    if (esValido && !(repetirContra.value == nuevaContra.value)) {

        mensaje.innerHTML += "<li>No son iguales las contraseñas</li>";
   
    }


    var radioSeleccionado = false;

    let regNumero3Digitos = /^[1-9]{3}$/;
    let regNumeroTrajeta = /^\d{16,19}$/;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {


            if (radios[i].id === "tarjetaDeCredito") {
                localStorage.clear("radioCuponDePagoElegido");
                if (!(regNumero3Digitos.test(input3digitos.value)) || !(regNumeroTrajeta.test(inputNumeroTarjeta.value))) {
                    mensaje.innerHTML += "<li>El número de tarjeta es incorrecto</li>";
                    radioSeleccionado = false;
                    esValido =false;
                }
    
                let sumaAnteriores = 0;
                for (let j = 0; j < inputNumeroTarjeta.value.length - 1; j++) {
                    sumaAnteriores += parseInt(inputNumeroTarjeta.value[j]);
                }
                let ultimoCaracter = inputNumeroTarjeta.value.charAt(inputNumeroTarjeta.value.length - 1);
                let ultimoNumero = parseInt(ultimoCaracter);


                if (sumaAnteriores % 2 == 0 && ultimoNumero % 2 == 0) {
                    mensaje.innerHTML += "<li>El último número debe ser impar</li>";
                    radioSeleccionado = false;
                    esValido =false;
                } else if (sumaAnteriores % 2 != 0 && !(ultimoNumero % 2 == 0)) {
                    mensaje.innerHTML += "<li>El último número debe ser par</li>";
                    radioSeleccionado = false;
                    esValido =false;
                }
                localStorage.regNumeroTrajetaCred = inputNumeroTarjeta.value + " / "+ input3digitos.value;
            }

            if (radios[i].id === "CuponDePago") {

                let seleccionado = false;
                localStorage.clear("regNumeroTrajetaCred");
                for (let j = 0; j < checkPagos.length; j++) {
                    if (checkPagos[j].checked) {
                        seleccionado = true;
                        localStorage.radioCuponDePagoElegido= checkPagos[j].id;
                        break;
                    }
                  
                }
                if (!seleccionado) {
                    mensaje.innerHTML += "<li>Debes seleccionar un método de pago con cupón</li>";
                    esValido = false;
                }
           
            }

            localStorage.pagoSeleccionado = radios[i].id;
        radioSeleccionado = true; 
        break;
    }
radioSeleccionado = false;
};
   if (!radioSeleccionado) {
        mensaje.innerHTML += "<li>Falta seleccionar un metodo de pago</li>";
        esValido = false;
    }

 if(esValido && radioSeleccionado){
    form.submit();
    poneNombre =true;
    ponerNombre(poneNombre)
 };

 
});


function ponerNombre(poneNombre){

    if(poneNombre){
        nombreUser.innerHTML = ` <strong> Hola! :  ${userRegistrado.nombre}</strong> `;
        }
        
}








