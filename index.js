// importando los modulos requeridos
const express = require("express");

const app = express();

const Jimp = require('jimp');

const { v4: uuidv4 } = require("uuid");

const _ = require("lodash");

const fs = require('fs');

const path = require('path');




// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor Express iniciado en el puerto" + PORT);
});




// Ruta raíz para mostrar el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});



// codigo para leer: 
// Paso 4
// app.get("/leer", (req, res) => {
//     // Paso 5
//     const { url } = req.query
//     //console.log("Valor de parametro nombre: ", nombre)
//     //console.log("Tipo de dato parametro nombre: ", typeof nombre)

//     // Paso 6
//     fs.readFile(url, (err, data) => {

//         let mensaje=""
//         if (err) {

//             (url)
//               ? mensaje = url + " No existe, "
//               : mensaje = "Falta la ruta de la imagen, "

//           return res.status(500).send(mensaje+err)
//         }

//         //console.log(data.toString())
//         //res.send(nombre + " ha sido leido con exito")
//         //res.send(data)
//         res.sendFile(__dirname + "/" + nombre)
//     })
// })

// Ruta para procesar la imagen



// const { AUTO } = require('jimp');

app.get('/cargar', async (req, res) => {
    const { url } = req.query;
    const {archivo} = req.query;
    try {
        // Cargar la imagen con la ruta de tu imagen
        // const imagen = await Jimp.read(url) || await Jimp.read(archivo);
        if (url) {
            // Si se proporciona una URL, carga la imagen desde la URL
            imagen = await Jimp.read(url);
        } else if (archivo) {
            // Si se proporciona una ruta de archivo, carga la imagen desde el archivo
            imagen = await Jimp.read(archivo);
        } else {
            throw new Error('Debe proporcionar una URL o una ruta de archivo.');
        }
        const newname = uuidv4().slice(0, 6) + '.jpeg';

        await imagen
            .resize(350, 350) // resize
            .quality(100) // set JPEG quality
            .greyscale() // set greyscale
            .writeAsync(newname); // save

        res.sendFile(__dirname + '/' + newname);
    } catch (error) {
        // Manejar errores
        console.error('Error al procesar la imagen:', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

// app.get('/cargar', async (req, res) => {
//     const { url } = req.query
//     try {
//         // Cargar la imagen con la ruta de tu imagen
//         Jimp.read(url, (err, apple) => {
//             if (err) {
//                 // throw new Error("Error por throw");
//                 console.error('Error al procesar la imagen:', err.message);
//                 res.status(500).send('Error interno del servidor');
//             } else {
//                 apple
//                     .resize(350, AUTO) // resize
//                     .quality(100) // set JPEG quality
//                     .greyscale() // set greyscale
//                     .write(const newname = uuidv4().slice(0, 6).jpeg); // save
//         res.sendFile(__dirname + newname);
//     }
      
//      } catch (error) {
//     // Manejar errores
//     console.error('Error al procesar la imagen:', error);
//     res.status(500).send('Error interno del servidor');
// };
// });
