var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

/*const crendenciales = connection({
    RDS_HOSTNAME='ec2-18-221-13-9.us-east-2.compute.amazonaws.com',
    //host: 'ec2-18-221-13-9.us-east-2.compute.amazonaws.com',
    RDS_USERNAME: 'innercityhealth',
    //user: 'innercityhealth',
    RDS_PASSWORD: 'H34lthC0d3r$',
    //password: 'H34lthC0d3r$',
    RDS_DB_NAME: 'innercityhealth-dev.cogcg5odjeaf.us-east-2.rds.amazonaws.com',
    //database: 'innercityhealth-dev.cogcg5odjeaf.us-east-2.rds.amazonaws.com',
    RDS_PORT: '3306'
});*/

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
app.listen(3000, () => {
    console.log('-----Puerto 3000: \x1b[32m%s\x1b[0m', 'online', '-----');
});