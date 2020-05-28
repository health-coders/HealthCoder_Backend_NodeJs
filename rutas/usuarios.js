//requires
var express = require('express');

//inicializar variables
var app = express();

var Usuarios = require('../modelos/usuarios');

//---------------------------------------------------------
// obtener todos los usuarios
//--------------------------------------------------------
app.get('/', (req, res, next) => {

    Usuarios.find({}, 'nombre_1 apellido_1 email numero_telefono tipo_usuario id_nacional')
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error usuarios',
                        errors: err
                    });
                }

                Usuarios.countDocuments({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        total: conteo,
                        usuario: usuarios
                    });
                });
            })
});

//---------------------------------------------------------
// crear un nuevo usuario
//--------------------------------------------------------
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuarios({
        id_nacional: body.id_nacional,
        nombre_1: body.nombre_1,
        name_2: body.name_2,
        apellido_1: body.apellido_1,
        apellido_2: body.apellido_2,
        email: body.email,
        numero_telefono: body.numero_telefono,
        tipo_usuario: body.tipo_usuario,
        contrasena: body.contrasena,
        certificado_rethus: body.certificado_rethus,
        transporte: body.transporte,
        estado_usuario: body.estado_usuario,
        asegurador: body.asegurador,
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear usuarios',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });

    });
});

//---------------------------------------------------------
// actualizar usuario
//--------------------------------------------------------
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuarios.findOneAndUpdate(id, (err, usuario) => {

        console.log('u: ' + usuario);

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuarios',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario ' + id + ' no existe',
                errors: { message: 'no existe el usuario con ese ID' }
            });
        }

        usuario.nombre_1 = body.nombre_1;
        usuario.name_2 = body.name_2;
        usuario.apellido_1 = body.apellido_1;
        usuario.apellido_2 = body.apellido_2;
        usuario.email = body.email;
        numero_telefono = body.numero_telefono;
        usuario.tipo_usuario = body.tipo_usuario;
        usuario.certificado_rethus = body.certificado_rethus;
        usuario.transporte = body.transporte;
        usuario.estado_usuario = body.estado_usuario;
        usuario.asegurador = body.asegurador;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar usuarios',
                    errors: err
                });
            }

            usuarioGuardado.contraseña = ':P';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});

//---------------------------------------------------------
// eliminar usuario
//--------------------------------------------------------
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Usuarios.findByIdAndRemove(id, (err, usuarioEliminado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar usuario',
                errors: err
            });
        }

        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID',
                errors: { message: 'no existe usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        });
    });
});

module.exports = app;