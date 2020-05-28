//requires
var express = require('express');

//inicializar variables
var app = express();

var Servicios = require('../modelos/servicios');

//---------------------------------------------------------
// obtener todos los servicio
//--------------------------------------------------------
app.get('/', (req, res, next) => {

    Servicios.find({}, 'Id numero tipo solicitante prestador fechaGen prioridad descripción fechaConf')
        .exec(
            (err, servicios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error Servicios',
                        errors: err
                    });
                }

                Servicios.countDocuments({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        total: conteo,
                        servicio: servicios
                    });
                });
            })
});

//---------------------------------------------------------
// crear un nuevo Servicio
//--------------------------------------------------------
app.post('/', (req, res) => {

    var body = req.body;

    var servicio = new Servicios({

        numero_servicio: body.numero_servicio,
        tipo_servicio: body.tipo_servicio,
        solicitante: body.solicitante,
        prestador: body.prestador,
        fecha_generacion: body.fecha_generacion,
        prioridad: body.prioridad,
        descripcion: body.descripcion,
        fecha_confirmacion: body.fecha_confirmacion,

    });

    servicio.save((err, servicioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear servicio',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            servicio: servicioGuardado,
            servicioToken: req.servicio
        });

    });
});



//---------------------------------------------------------
// actualizar servicio
//--------------------------------------------------------
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Servicios.findOneAndUpdate(id, (err, servicio) => {

        console.log('u: ' + servicio);

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar servicios',
                errors: err
            });
        }

        if (!servicio) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el servicio ' + id + ' no existe',
                errors: { message: 'no existe el servicio con ese ID' }
            });
        }

        servicio.numero_servicio = body.numero_servicio;
        servicio.tipo_servicio = body.tipo_servicio;
        servicio.solicitante = body.solicitante;
        servicio.prestador = body.prestador;
        servicio.fecha_generacion = body.fecha_generacion;
        servicio.prioridad = body.prioridad;
        servicio.descripcion = body.descripcion;
        servicio.fecha_confirmacion = body.fecha_confirmacion;

        servicio.save((err, servicioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar servicio',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                servicio: servicioGuardado
            });
        });
    });
});

//---------------------------------------------------------
// eliminar servicio
//--------------------------------------------------------
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Servicios.findByIdAndRemove(id, (err, servicioEliminado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar servicio',
                errors: err
            });
        }

        if (!servicioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un servicio con ese ID',
                errors: { message: 'no existe servicio con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            servicio: servicioEliminado
        });
    });
});

module.exports = app;