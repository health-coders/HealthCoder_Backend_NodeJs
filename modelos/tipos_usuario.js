var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tiposUsuariosSchema = new Schema({

    id: { type: Number },
    tipo_usuario: { type: String, required: [true, 'el tipo usuario es necesario'] },
});

module.exports = mongoose.model('TiposUsuario', tiposUsuariosSchema);