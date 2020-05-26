var express = require('express');
var mongoose = require('mongoose');

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

//conexion a la base de datos
mongoose.connection.openUri('#', (err, res) => {
    if (err) throw err;
    console.log('base de datos: online');
});

//escuchar peticiones
app.listen(3000, () => {
    console.log('-----Puerto 3001: \x1b[32m%s\x1b[0m', 'online', '-----');
});