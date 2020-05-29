var express = require('express');

var app = express();

var Usuarios = require('../modelos/usuarios');

// autenticacion normal
app.post('/', (req, res) => {

    var body = req.body;

    Usuarios.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuarios',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -email',
                errors: err
            });
        }

        if (body.password != usuarioDB.password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -password',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            Usuario: usuarioDB,
            id: usuarioDB._id
        });
    });
});

module.exports = app;