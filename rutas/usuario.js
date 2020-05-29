const express = require("express");
var conexion = require("../conexion");
var Usuarios = require("../modelos/usuarios");

const Router = express.Router();

Router.get("/", (req, res) => {
    return conexion.query("select * from innercityhealth.tbl_usuario",
        (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
});

Router.post("/", (req, res) => {

    var body = req.body;
    console.log(body);

    return conexion.query('INSERT INTO innercityhealth.tbl_usuario set ?', body, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear usuarios',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuario
        });
    })
});

module.exports = Router;