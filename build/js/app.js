function navegacionFija(){const e=document.querySelector(".header"),t=document.querySelector(".sobre-festival");window.addEventListener("scroll",(function(){t.getBoundingClientRect().bottom<1?e.classList.add("fixed"):e.classList.remove("fixed")}))}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let t=1;t<=16;t++){const c=document.createElement("IMG");c.loading="lazy",c.width=250,c.height=150,c.src=`src/img/gallery/thumb/${t}.jpg`,c.alt=`Imagen ${t} galería`,c.onclick=function(){mostrarImagen(t)},e.appendChild(c)}}function mostrarImagen(e){const t=document.createElement("IMG");t.src=`src/img/gallery/full/${e}.jpg`,t.alt=`Imagen ${e} galería`;const c=document.createElement("DIV");c.classList.add("modal");const o=document.createElement("BUTTON");o.textContent="X",o.classList.add("btn-cerrar"),o.onclick=cerrarModal,c.onclick=cerrarModal,c.appendChild(t),c.appendChild(o);const n=document.querySelector("body");n.classList.add("overflow-hidden"),n.appendChild(c)}function cerrarModal(){const e=document.querySelector(".modal");e.classList.add("fade-out"),setTimeout((()=>{e?.remove();document.querySelector("body").classList.remove("overflow-hidden")}),500)}function resaltarEnlace(){document.addEventListener("scroll",(()=>{const e=document.querySelectorAll("section"),t=document.querySelectorAll(".navegacion-principal a");let c="";e.forEach((e=>{const t=e.offsetTop,o=e.clientHeight;window.scrollY>=t-o/3&&(c=e.id)})),t.forEach((e=>{e.classList.remove("active"),e.getAttribute("href")=="#"+c&&e.classList.add("active")}))}))}function scrollNav(){document.querySelectorAll(".navegacion-principal a").forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();const t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}))}))}document.addEventListener("DOMContentLoaded",(function(){navegacionFija(),crearGaleria(),resaltarEnlace(),scrollNav()}));