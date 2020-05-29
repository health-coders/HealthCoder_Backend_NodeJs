//requires
var express = require('express');

//inicializar variables
var app = express();

var Transportes = require('../modelos/Transportes');

//---------------------------------------------------------
// obtener todos los transporte
//--------------------------------------------------------
app.get('/', (req, res, next) => {

    Transportes.find({}, 'Id numero tipo solicitante prestador fechaGen prioridad descripción fechaConf')
        .exec(
            (err, transportes) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error Transportes',
                        errors: err
                    });
                }

                Transportes.countDocuments({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        total: conteo,
                        transporte: transportes
                    });
                });
            })
});

//---------------------------------------------------------
// crear un nuevo Transporte
//--------------------------------------------------------
app.post('/', (req, res) => {

    var body = req.body;

    var transporte = new Transportes({

        numero_matricula: body.numero_matricula,
        tipo_transporte: body.tipo_transporte,
        marca: body.marca,
        modelo: body.modelo,
        ano: body.ano,
        color: body.color,
        placa: body.placa,

    });

    transporte.save((err, transporteGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al crear transporte',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            transporte: transporteGuardado,
            transporteToken: req.transporte
        });

    });
});



//---------------------------------------------------------
// actualizar transporte
//--------------------------------------------------------
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Transportes.findOneAndUpdate(id, (err, transporte) => {

        console.log('u: ' + transporte);

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar transportes',
                errors: err
            });
        }

        if (!transporte) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el transporte ' + id + ' no existe',
                errors: { message: 'no existe el transporte con ese ID' }
            });
        }


        transporte.numero_matricula = body.numero_matricula;
        transporte.tipo_transporte = body.tipo_transporte;
        transporte.marca = body.marca;
        transporte.modelo = body.modelo;
        transporte.ano = body.ano;
        transporte.color = body.color;
        transporte.placa = body.placa;
        
        transporte.save((err, transporteGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar transporte',
                    errors: err
                });
            }

            transporteGuardado.contraseña = ':P';

            res.status(200).json({
                ok: true,
                transporte: transporteGuardado
            });
        });
    });
});

//---------------------------------------------------------
// eliminar transporte
//--------------------------------------------------------
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Transportes.findByIdAndRemove(id, (err, transporteEliminado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar transporte',
                errors: err
            });
        }

        if (!transporteEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un transporte con ese ID',
                errors: { message: 'no existe transporte con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            transporte: transporteEliminado
        });
    });
});

module.exports = app;