// Instalo en terminal:
// npm init --yes
// npm install express
// npm i nodemon --D
// npm i jimp
// npm i uuid
// npm install --save bootstrap

// creo un servidor con express e importo los módulos requeridos
const express = require("express");
const Jimp = require('jimp');
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const path = require('path');  //creo que debemos eliminarlo
// const _ = require("lodash");

const app = express(); //instancio express

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor Express iniciado en el puerto" + PORT);
});

// Defino la ruta a carpeta pública de los archivos para llamar al css
app.use(express.static(__dirname + "/assets"));
// app.use(express.static(__dirname + "/assets/img"));
// app.use(express.static('assets'));

//crear un middleware que define una ruta /bootstrap y libere el contenido de la carpeta "css", 
//dependencia de bootstrap en el node_module previamente instalada con nmp
app.use('/bootstrap',
    express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//crear un middleware que define una ruta /bootstrap y libere el contenido de la carpeta "js", 
//dependencia de bootstrap en el node_module previamente instalada con nmp
app.use('/bootstrapjs',
    express.static(__dirname + '/node_modules/bootstrap/dist/js'));

//configuro carpeta public como publica

app.use(express.static(__dirname + "/public"));   

// Ruta raíz para mostrar el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/cargar', async (req, res) => {
    const { url } = req.query; //destructuring, obtengo el parámetro que necesito
    const {archivo} = req.query; //destructuring, obtengo el parámetro que necesito
    try {
        // const imagen = await Jimp.read(url) || await Jimp.read(archivo);
        if (url == '') { //si en el input se introduce un string vacío
            throw new Error('Debe proporcionar una URL válida.'); //mensaje a mostrar
        }
        if (archivo == '') { //si la variable está vacía, null o undefined
            throw new Error('Debe proporcionar una ruta de archivo.'); //mensaje a mostrar
        }
        if (url) {
            // Si se proporciona una URL, carga la imagen desde la URL
            imagen = await Jimp.read(url);
        } else {
            console.log('estoy aqui', archivo);
    
            // Si se proporciona una ruta de archivo, carga la imagen desde el archivo
            imagen = await Jimp.read(archivo);
        } 

        //asigna un nombre definido por los primeros seis caracteres de UUID, con extensión.jpeg capturandolo en la variable "newname"
        const newname = uuidv4().slice(0, 6) + '.jpeg';

        await imagen
            .resize(350, Jimp.AUTO) // redimensionada con ancho 350 y alto automatico proporcional.
            .quality(100) // se determina la calidad
            .greyscale() // se procesa a escala de grises/blanco y negro
            .writeAsync(newname); // guarda la imagen con el nuevo nombre definido previamente
        res.sendFile(__dirname + '/' + newname); //devuelve el archivo procesado al cliente, con el nuevo nombre asignado

    } catch (error) {
      
        // Manejar errores
        console.error('Error al procesar, mensaje del catch:', error.message); //muestra en consola el error que procesa
        console.error('url:' + typeof url, 'archivo: ' + typeof archivo); //muestra en consola el tipo de error
        // Devuelve una respuesta de error al cliente, según errores definidos en el try
        res.status(500).send(error.message);
        
    }
});
