var express = require('express');
//var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

//cors
app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//importar rutas
//var appRoutes = require('./rutas/app');
var usuarioRoutes = require('./rutas/usuario');
//const customerRoutes = require('./rutas/customer');

//rutas
app.use('/usuarios', usuarioRoutes);
//app.use('/', appRoutes);
//app.use('/', customerRoutes);

//escuchar peticiones
app.listen(3001, () => {
    console.log('-----Puerto 3001: \x1b[32m%s\x1b[0m', 'online', '-----');
});