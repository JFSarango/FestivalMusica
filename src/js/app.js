// 1.- primero esperamos a que estén listos los html
document.addEventListener('DOMContentLoaded', function(){
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija(){
    const header=document.querySelector(".header");
    const sobreFestival=document.querySelector(".sobre-festival")
    //evento para escuchar cada que se mueve el scroll
    window.addEventListener("scroll", function(){
        // propiedad para detectar la coordenada del top hacia la base de la Seccion sea que lo pase : getBoundingClientRect().bottom (es decir el margen de abajo)
        if(sobreFestival.getBoundingClientRect().bottom < 1){
            header.classList.add("fixed")
        }else{
            header.classList.remove("fixed")
        }
    })
}

// creamos la funcion para crear los elementos html nuevos
function crearGaleria(){
    // 2.-seleccionado elemento
    const galeria=document.querySelector(".galeria-imagenes");
    // 3.- recorrer las imagenes
    const CANTIDAD_IMAGENES=16;
    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        //4.- CREAMOS ELEMENTO PARA IMAGENES
        const imagen = document.createElement('IMG');
        //5.- le damos el atributo de src, y como vamos a usar un indice para el nombre, es necesario usar un template string
        // es importante el orden en el que se pone el lazy
        imagen.loading = "lazy";
        imagen.width = 250;
        imagen.height = 150;

        imagen.src=`src/img/gallery/thumb/${i}.jpg`;
        imagen.alt=`Imagen ${i} galería`
       

        // Even Handler
        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }

}

function mostrarImagen(i){

    const imagen = document.createElement('IMG');
    imagen.src=`src/img/gallery/full/${i}.jpg`;
    imagen.alt=`Imagen ${i} galería`

    // generar modal
    const modal =  document.createElement("DIV")
    modal.classList.add("modal")

    //boton cerrar modal


    const cerrarModalBtn= document.createElement("BUTTON")
    cerrarModalBtn.textContent= "X";
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick=cerrarModal

    
    //cerrando modal 
    modal.onclick=cerrarModal //NO ES NECESARIA LA FUNCION PORQUE NO PASA PARAMETROS

    //agregamos la imagen al modal
    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBtn)

    // agregar al html
    const body = document.querySelector("body")
    body.classList.add("overflow-hidden")
    
    //agregamos la modal al body
    body.appendChild(modal)
}

function cerrarModal(){
    const modal = document.querySelector(".modal")

    modal.classList.add("fade-out")
    //le damos que espere un tiempo para poder agregar una clase al modal
    setTimeout(()=>{
        modal?.remove() //hace una pregunta y solo se ejecuta el positivo
        const body = document.querySelector("body")
        body.classList.remove("overflow-hidden")
    }, 500)
   
}

function resaltarEnlace(){
    // escuchamos el scroll
    document.addEventListener("scroll", () => {
        // declaramos variables para las secciones y la navegacon
        const sections = document.querySelectorAll("section")
        const navLinks = document.querySelectorAll(".navegacion-principal a")

        let actual = ''; //aqui guardaremos la seccion

        //detectamos cual es la que está más visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop //permite comparar la distancia con respecto al padre
            // tomaos el alto de la seccion
            const sectionHeight = section.clientHeight
            // comparamos si ya aparece la seccion especifica
             if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
               actual = section.id //agregamos el id de la seccion a la variable
             } 
        });
    

        // detectamos cual enlace tiene el mismo valor que el actual
        navLinks.forEach(link => {
            link.classList.remove("active"); //quitamos la clase para resetear cada que demos scrool
            if(link.getAttribute('href') == '#' + actual){ //comparamos el atributo href con la seccion actual guardada
                // hay que agregar y quitar la clase segun sea necesario
                link.classList.add("active");
            }
        })
    })
}
 //hacer transiciones menos abruptas
function scrollNav(){
    // guardamos cada enlace en una variable
    const navLinks = document.querySelectorAll(".navegacion-principal a")
    // recorremos los enlaces
    navLinks.forEach(link => {
        // creamos un escucha para cada enlace
        link.addEventListener("click", e => {
           e.preventDefault() //prevenimos el evento por defecto   
           const sectionScroll =  e.target.getAttribute("href"); //selecciono los enlaces
        //    console.log( sectionScroll ); 
           const section = document.querySelector(sectionScroll) //hago que ahora se seleccionen las secciones

           section.scrollIntoView({behavior: 'smooth'})
        })
    })
}