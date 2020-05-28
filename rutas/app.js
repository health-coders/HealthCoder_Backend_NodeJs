//requires
var express = require('express');

//inicializar variables
var app = express();

app.get('/', (req, res, next) => {

    if (err) {
        return res.status(500).json({
            ok: false,
            mensaje: 'error usuarios',
            errors: err
        });
    }
    res.status(200).json({
        ok: true,
        mensaje: 'todo bien'
    });
});

module.exports = app;