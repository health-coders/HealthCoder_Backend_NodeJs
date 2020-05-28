var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path: `.env.${NODE_ENV}`
});

console.log(process.env.RDS_HOSTNAME);
console.log(process.env.RDS_USERNAME);
console.log(process.env.RDS_PASSWORD);
console.log(process.env.RDS_PORT);

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
var appRoutes = require('./rutas/app');
var usuariosRoutes = require('./rutas/usuarios');

//conexion a la base de datos
var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
});
connection.connect(function (error) {
    if (error) {
        console.error('Error de conexion: ' + error.stack);
        return;
    }
    console.log('Conectado con el identificador ' + connection.threadId);
});
connection.end();

//rutas
app.use('/usuarios', usuariosRoutes);
app.use('/', appRoutes);

//escuchar peticiones
app.listen(3001, () => {
    console.log('-----Puerto 3001: \x1b[32m%s\x1b[0m', 'online', '-----');
});