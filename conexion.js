var mysql = require('mysql');

const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path: `.env.${NODE_ENV}`
});

//conexion a la base de datos
var conexion = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
});
conexion.connect(function (error) {
    if (error) {
        console.error('Error de conexion: ' + error.stack);
        return;
    }
    console.log('Estado de la conexion: ' + conexion.state);
});

module.exports = conexion;