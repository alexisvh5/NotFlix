// JIJO

let contenidoCompleto = [
    {
        "Titulo": "Duro de matar",
        "Formato": "Pelicula",
        "Genero": "Accion",
        "Poster": "../assets/images/movies/diehard.jpg"
    },
    {
        "Titulo": "12 hombres enojados",
        "Formato": "Pelicula",
        "Genero": "Drama",
        "Poster": "../assets/images/movies/12angry.jpg"
    },
    {
        "Titulo": "2001",
        "Formato": "Pelicula",
        "Genero": "Aventura",
        "Poster": "../assets/images/movies/2001.jpg"
    },

    {
        "Titulo": "Volver al futuro",
        "Formato": "Pelicula",
        "Genero": "Ciencia Ficción",
        "Poster": "../assets/images/movies/back_to_the_future.jpg"
    },

    {
        "Titulo": "La La Land",
        "Formato": "Pelicula",
        "Genero": "Musical",
        "Poster": "../assets/images/movies/la_la_land.jpg"
    },
    {
        "Titulo": "El señor de los anillos",
        "Formato": "Pelicula",
        "Genero": "Fantasia",
        "Poster": "../assets/images/movies/lord_of_the_rings.jpg"
    },
    {
        "Titulo": "Man on wire",
        "Formato": "Pelicula",
        "Genero": "Documental",
        "Poster": "../assets/images/movies/man_on_wire.jpg"
    },
    {
        "Titulo": "Actividad paranormal",
        "Formato": "Pelicula",
        "Genero": "Terror",
        "Poster": "../assets/images/movies/paranormal.jpg"
    },
    {
        "Titulo": "San Andreas",
        "Formato": "Pelicula",
        "Genero": "Catastrofe",
        "Poster": "../assets/images/movies/san_andreas.jpg"
    },

    {
        "Titulo": "Son como niños",
        "Formato": "Pelicula",
        "Genero": "Comedia",
        "Poster": "../assets/images/movies/son_como_niños.jpg"

    },

    {
        "Titulo": "Taxi Driver",
        "Formato": "Pelicula",
        "Genero": "Suspenso",
        "Poster": "../assets/images/movies/taxi.jpg"

    },

    {
        "Titulo": "The Big Bang Theory",
        "Formato": "Serie",
        "Genero": "Comedia",
        "Poster": "../assets/images/series/big_ban.jpg"

    },

    {
        "Titulo": "Breaking Bad",
        "Formato": "Serie",
        "Genero": "Drama",
        "Poster": "../assets/images/series/breaking.jpg"

    },

    {
        "Titulo": "Breaking Bad",
        "Formato": "Serie",
        "Genero": "Suspenso",
        "Poster": "../assets/images/series/dexter.jpg"

    },

    
    {
        "Titulo": "Juego de tronos",
        "Formato": "Serie",
        "Genero": "Fantasia",
        "Poster": "../assets/images/series/game_thrones.jpg"

    },

    {
        "Titulo": "Glee",
        "Formato": "Serie",
        "Genero": "Musical",
        "Poster": "../assets/images/series/glee.jpg"

    },

    {
        "Titulo": "Quiet on set",
        "Formato": "Serie",
        "Genero": "Documental",
        "Poster": "../assets/images/series/quiet.jpg"

    },

    {
        "Titulo": "The Rain",
        "Formato": "Serie",
        "Genero": "Catastrofe",
        "Poster": "../assets/images/series/rain.jpg"

    },

    {
        "Titulo": "Star Trek",
        "Formato": "Serie",
        "Genero": "Ciencia Ficción",
        "Poster": "../assets/images/series/star_trek.jpg"
        
    },

    {
        "Titulo": "The Boys",
        "Formato": "Serie",
        "Genero": "Accion",
        "Poster": "../assets/images/series/the_boys.jpg"
        
    },

    {
        "Titulo": "Vikings",
        "Formato": "Serie",
        "Genero": "Aventura",
        "Poster": "../assets/images/series/vikings.jpg"
        
    },
   
    {
        "Titulo": "The Walking Dead",
        "Formato": "Serie",
        "Genero": "Terror",
        "Poster": "../assets/images/series/walking.jpg"
        
    }
];



let seccionContenido = document.getElementById('contenido');


mostrarTodoElContenido()


function aplicarFiltro(){
    seccionContenido.innerHTML = ""

    let genero = document.querySelector("#genero").value;
    let contenidoFiltrado = contenidoCompleto; // Inicializar con todo el contenido al inicio

    if (genero !== "Seleccione una opción") {
        contenidoFiltrado = contenidoFiltrado.filter(contenido => contenido.Genero === genero);
        
        contenidoFiltrado.forEach(  (itemContenidoFiltrado) =>{

            if(itemContenidoFiltrado.Formato == "Pelicula"){

                seccionContenido.innerHTML += `
                <article>
                    <a href="../pages/vistaDetallePelicula.html"> 
                        <figure class="contenido_peliculas"> 
                            <img src="${itemContenidoFiltrado.Poster}" alt="${itemContenidoFiltrado.Titulo}">
                        </figure>
                    </a>
                </article>`;
    

            }
            else{
                seccionContenido.innerHTML += `
                <article>
                    <a href="../pages/vistaDetalleSeries.html"> 
                        <figure class="contenido_peliculas"> 
                            <img src="${itemContenidoFiltrado.Poster}" alt="${itemContenidoFiltrado.Titulo}">
                        </figure>
                    </a>
                </article>`;
            }



        
        } )
   
    }
    else{

        mostrarTodoElContenido()

        
    }


    
}





function buscar(){
    seccionContenido.innerHTML = ""

    let valorBusqueda = document.querySelector("#searchBox").value.toLowerCase().trim()

    if(valorBusqueda != 0){
        let contenidoBuscado = contenidoCompleto.filter( contenido => contenido.Titulo.toLowerCase().indexOf(valorBusqueda) > -1)
        
        contenidoBuscado.forEach( (itemContenidoBuscado) => {

            if(itemContenidoBuscado.Formato == "Pelicula"){

                seccionContenido.innerHTML += `
                <article>
                    <a href="../pages/vistaDetallePelicula.html"> 
                        <figure class="contenido_peliculas"> 
                            <img src="${itemContenidoBuscado.Poster}" alt="${itemContenidoBuscado.Titulo}">
                        </figure>
                    </a>
                </article>`;
    

            }

            else {
                seccionContenido.innerHTML +=
                `<article>
                     <a href="../pages/vistaDetalleSeries.html"> 
                         <figure class="contenido_peliculas"> 
                            <img src= "${itemContenidoBuscado.Poster}">
                         </figure
                     </a> 
                </article>` 
            }
          
        } )
    }
    else{
        aplicarFiltro()
    }

}


function quitarFiltro(){

    let botonQuitar = document.getElementById("filtrar")

    botonQuitar.addEventListener('click',function(){
        mostrarTodoElContenido()
    });
   
}

function mostrarTodasLasPeliculas(){
    seccionContenido.innerHTML = ""; 

    contenidoCompleto.forEach((itemContenido) => {

        if(itemContenido.Formato == "Pelicula")

        seccionContenido.innerHTML += `
            <article>
                <a href="../pages/vistaDetallePelicula.html"> 
                    <figure class="contenido_peliculas"> 
                        <img src="${itemContenido.Poster}" alt="${itemContenido.Titulo}">
                    </figure>
                </a>
            </article>`;
    });
}


function mostrarTodasLasSeries(){
    seccionContenido.innerHTML = ""; 

    contenidoCompleto.forEach((itemContenido) => {

        if(itemContenido.Formato == "Serie")

        seccionContenido.innerHTML += `
            <article>
                <a href="../pages/vistaDetalleSeries.html"> 
                    <figure class="contenido_peliculas"> 
                        <img src="${itemContenido.Poster}" alt="${itemContenido.Titulo}">
                    </figure>
                </a>
            </article>`;
    });
}




function mostrarTodoElContenido(){
    seccionContenido.innerHTML = ""; 
    contenidoCompleto.forEach((itemContenido) => {

        if(itemContenido.Formato == "Pelicula"){
            seccionContenido.innerHTML += `
            <article>
                <a href="../pages/vistaDetallePelicula.html"> 
                    <figure class="contenido_peliculas"> 
                        <img src="${itemContenido.Poster}" alt="${itemContenido.Titulo}">
                    </figure>
                </a>
            </article>`;

        }
        else if (itemContenido.Formato == "Serie"){
            seccionContenido.innerHTML += `
            <article>
                <a href="../pages/vistaDetalleSeries.html"> 
                    <figure class="contenido_peliculas"> 
                        <img src="${itemContenido.Poster}" alt="${itemContenido.Titulo}">
                    </figure>
                </a>
            </article>`;

        }


        
    });
}

    
