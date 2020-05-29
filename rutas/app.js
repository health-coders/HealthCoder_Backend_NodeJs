//requires
var express = require('express');

//inicializar variables
var app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'todo bien'
    });
});

module.exports = app;