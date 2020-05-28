//npm install jsonwebtoken --save = token 'generar token'
//npm install google-auth-library --save = verificar token

var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

var app = express();

var Usuarios = require('../models/usuarios');

//google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

// autenticacion con google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];

    return {
        nombre: payload.name,
        email: payload.email,
        telefono: payload.telefono,
        distrito: payload.distrito,
        cargo: true,
        img: payload.picture
    }
}

/*app.post('/google', async (req, res) => {

    var token = req.body.token;

    var googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({
                ok: false,
                mensaje: 'token no valido'
            });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuarios',
                errors: err
            });
        }

        if (usuarioDB) {
            if (usuarioDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'debe usar su auntenticacion normal'
                });
            } else {

                var token = jwt.sign(
                    { usuario: usuarioDB },
                    SEED,
                    { expiresIn: 14400 }); //14400 = 4 horas

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id
                });
            }
        } else {
            //el usuario no existe...hay que crearlo
            var usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ';)';

            usuario.save((err, usuarioDB) => {

                var token = jwt.sign(
                    { usuario: usuarioDB },
                    SEED,
                    { expiresIn: 14400 }); //14400 = 4 horas

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id
                });
            });
        }
    });
});*/

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

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas -password',
                errors: err
            });
        }

        //crear un token!!!
        usuarioDB.password = ';)';
        var token = jwt.sign(
            { usuario: usuarioDB },
            SEED,
            { expiresIn: 14400 }); //14400 = 4 horas

        res.status(200).json({
            ok: true,
            Usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });
});

module.exports = app;

//-----------------------------------------CRUD EN NODE------------------------------------------------------

//requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middlewares/autenticacion');

//inicializar variables
var app = express();

var Usuarios = require('../models/usuarios');

//---------------------------------------------------------
// obtener todos los usuarios
//--------------------------------------------------------
app.get('/', (req, res, next) => {

    Usuarios.find({}, 'nombre email telefono distrito img cargo')
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
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        telefono: body.telefono,
        distrito: body.distrito,
        cargo: body.cargo,
        img: body.img,
        referencia: body.referencia
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
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

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

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.telefono = body.telefono;
        usuario.distrito = body.distrito;
        usuario.cargo = body.cargo;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar usuarios',
                    errors: err
                });
            }

            usuarioGuardado.password = ':P';

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
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

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