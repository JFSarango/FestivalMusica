import path from "path"
import fs from "fs"

// como compilar, destino etcs
import { src, dest, watch, series, parallel } from 'gulp'
// extraer la dependencias
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import terser from 'gulp-terser'
import sharp from "sharp"


//unir las dependencias para no ir a buscarlas en la ruta una a una
const sass= gulpSass(dartSass)

// mandamos a llamar la funcion
export function js(done){
     src('src/js/app.js')
     .pipe(terser())//minificar la hoja de js
        .pipe(dest('build/js'));
    done(); //básicamente creamos una copia y lo mandamos a build para ejecutar
}

//crear tarea para convertir sass
export function css(done){
    //controlar los procesos
    src('src/scss/app.scss', {sourcemaps: true}) //ubica el archivo
    // para minificar el archivo css, utilizamos sass
        .pipe( sass({
            outputStyle: 'compressed' //comprimir el archivo
        }).on('error', sass.logError) ) //con esto lo compila, pueden haber muchos
        .pipe(dest('build/css', {sourcemaps: "."})) //el sourcemaps con el . permite crear el archivo .map para saber en la inspeccion en donde está el error o en donde debemos cambiar

    done()
}

//redimensionar las imagenes - importart path fs e instalar sharp
export async function crop(done) {
    //codigo epecíficamente de node js
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}
 
export function dev(){
    //watch('src/scss/app.scss', css)
    watch('src/scss/**/*.scss', css) //para ejecutar todos los archivos
    watch('src/js/**/*.js', js) 
}

// series: se ejecutan tareas en secuencia
// paralel: se ejecutan todas las tareas a la vez

export default series(crop, js, css, dev);
// export default parallel(js,css,dev);