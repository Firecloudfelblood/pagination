var express = require('express');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb');
var router = express.Router();

var datos;

/* GET home page. */
router.get('/', function(req, res, next) {
    mongo.connect('mongodb://localhost:27017/paginacion', (err, client) => {
        if (err) {
            return console.log('No se pudo conectay por el siguiente error:', err);
        }
        console.log('Conectado al servidor MongoDB');
        var db = client.db('paginacion');
        db.collection('datospaginacion').find().toArray().then((docs) => {
            console.log('datospaginacion');
            console.log(JSON.stringify(docs));
            // console.log(JSON.stringify(docs, undefined, 2));
            client.close();
            if(docs) {
                datos = docs;
            }
        }, (err) => {
            console.log('No se puede conectar', err)
        });
    });editarDatos();
  res.render('index', datos );
  // res.render('index', { title: 'Express' });
});


// function consultarDatos() {
//     mongo.connect('mongodb://localhost:27017/paginacion', (err, client) => {
//         if (err) {
//             return console.log('No se pudo conectay por el siguiente error:', err);
//         }
//         console.log('Conectado al servidor MongoDB');
//         var db = client.db('paginacion');
//         db.collection('datospaginacion').find().toArray().then((docs) => {
//             console.log('datospaginacion');
//             console.log(JSON.stringify(docs));
//             // console.log(JSON.stringify(docs, undefined, 2));
//             client.close();
//             if(docs) {
//                 datos = docs;
//             }
//         }, (err) => {
//             console.log('No se puede conectar', err)
//         });
//     });
//
// }
function editarDatos() {
    mongo.connect('mongodb://localhost:27017/paginacion', (err, client) => {
        if (err) {
            return console.log('No se pudo conectay por el siguiente error:', err);
        }
        console.log('Conectado al servidor MongoDB');
        var db = client.db('paginacion');
        db.collection('datospaginacion').findOneAndUpdate({
            _id: new ObjectID('﻿5b01ed95ec079d12ab634828')

        }, {
            $set: {
                name: 'gonzo',
                suename: 'cavazos',
                email: 'goca@gmail.com',
                password: 'gonzo'
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log('datospaginacion EDITAR');
            console.log(JSON.stringify(result));

        });

    });
}
function insertarDatos() {
    mongo.connect('mongodb://localhost:27017/paginacion', (err, client) => {
        if (err) {
            return console.log('No se pudo conectay por el siguiente error:', err);
        }
        console.log('Conectado al servidor MongoDB');
        var db = client.db('paginacion');
        db.collection('datospaginacion').insertOne({
            'name': 'maya',
            'surname': 'cavazos',
            'email': 'guau@doggie.com',
            'role':'ROLE_PUPPY',
            'password':'none'

        },(err, res)=>{
          if(err){
            return console.log("Hubo un error al tratar de insertar los datos", err)
          }
          console.log(JSON.stringify(res.ops, undefined, 2))

            }
        );
        client.close();

    });
}

module.exports = router;
