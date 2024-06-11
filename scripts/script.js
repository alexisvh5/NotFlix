
let form = document.querySelector("form");
let botonCambios = document.getElementById("guardar");
let contraseña=document.getElementById("guardar");
let nuevaContra = document.getElementById("nuevaContraseña");
let repetirContra = document.getElementById("repetirContraseña");
let mensaje = document.getElementById("correciones1")


let radios=document.getElementsByName("opcionDePago");

form.addEventListener("submit",(e) => {

    
    e.preventDefault();
    mensaje.innerHTML="";

    let esValido =true;


if (nuevaContra.value === '') {

mensaje.innerHTML+= "<li>falta que ingreses la contraseña</li>";
esValido=false;
}
if(repetirContra.value === ''){

mensaje.innerHTML+= "<li>falta que repitas la contra</li>";
esValido=false; 
}
if(esValido && !(repetirContra.value==nuevaContra.value)){

    mensaje.innerHTML+= "<li>No son iguales las contraseñas</li>";

}

var radioSeleccionado = false;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radioSeleccionado = true;
            break;
        }
    }
    
    if (!radioSeleccionado) {
        mensaje.innerHTML += "<li>Falta seleccionar un género</li>";
        esValido = false;
    }

else{  
    form.submit();
}  

});










