//requires
var express = require('express');
var bcrypt = require('bcryptjs');
//var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

//inicializar variables
var app = express();

var HistoriasServicio = require('../modelos/HistoriasServicio');

//---------------------------------------------------------
// obtener todos los Historias de Servicio
//--------------------------------------------------------
app.get('/', (req, res, next) => {

    HistoriasServicio.find({}, 'Id numero tipo solicitante prestador fechaGen prioridad descripción fechaConf')
        .exec(
            (err, historiasServicio) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error HistoriasServicio',
                        errors: err
                    });
                }
                HistoriasServicio.countDocuments({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        total: conteo,
                        historiasServicio: historiasServicios
                    });
                });
            })
});

//---------------------------------------------------------
// crear un nueva historiasServicio
//--------------------------------------------------------
app.post('/', (req, res) => {

    var body = req.body;

    var historiasServicio = new HistoriasServicio({

        id: body.id,
        tipo_usuario: body.tipo_usuario,
        item_navegacion: body.item_navegacion,

    });

    historiasServicio.save((err, historiasServicioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear historiasServicio',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            historiasServicio: historiasServicioGuardado,
            historiasServicioToken: req.historiasServicio
        });

    });
});



//---------------------------------------------------------
// actualizar navegacion
//--------------------------------------------------------
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Navegaciones.findOneAndUpdate(id, (err, navegacion) => {

        console.log('u: ' + navegacion);

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar navegacion',
                errors: err
            });
        }

        if (!navegacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el navegacion ' + id + ' no existe',
                errors: { message: 'no existe el navegacion con ese ID' }
            });
        }


        navegacion.id = body.id;
        navegacion.tipo_usuario = body.tipo_usuario;
        navegacion.item_navegacion = body.item_navegacion;
        
        navegacion.save((err, navegacionGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar navegacion',
                    errors: err
                });
            }

            navegacionGuardado.contraseña = ':P';

            res.status(200).json({
                ok: true,
                navegacion: navegacionGuardado
            });
        });
    });
});

//---------------------------------------------------------
// eliminar navegacion
//--------------------------------------------------------
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Navegaciones.findByIdAndRemove(id, (err, navegacionEliminado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar navegacion',
                errors: err
            });
        }

        if (!navegacionEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un navegacion con ese ID',
                errors: { message: 'no existe navegacion con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            navegacion: navegacionEliminado
        });
    });
});

module.exports = app;