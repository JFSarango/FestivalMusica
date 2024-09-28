// como compilar, destino etc
import { src, dest, watch, series, parallel } from 'gulp'
// extraer la dependencias
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

//unir las dependencias para no ir a buscarlas en la ruta una a una
const sass= gulpSass(dartSass)

// mandamos a llamar la funcion
export function js(done){
     src('src/js/app.js')
        .pipe(dest('build/js'));
    done(); //básicamente creamos una copia y lo mandamos a build para ejecutar
}

//crear tarea para convertir sass
export function css(done){
    //controlar los procesos
    src('src/scss/app.scss', {sourcemaps: true}) //ubica el archivo
        .pipe( sass().on('error', sass.logError) ) //con esto lo compila, pueden haber muchos
        .pipe(dest('build/css', {sourcemaps: "."})) //el sourcemaps con el . permite crear el archivo .map para saber en la inspeccion en donde está el error o en donde debemos cambiar

    done()
}

export function dev(){
    //watch('src/scss/app.scss', css)
    watch('src/scss/**/*.scss', css) //para ejecutar todos los archivos
    watch('src/js/**/*.js', js) 
}

// series: se ejecutan tareas en secuencia
// paralel: se ejecutan todas las tareas a la vez

export default series(dev);
// export default parallel(js,css,dev);