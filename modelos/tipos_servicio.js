var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tiposServicioSchema = new Schema({

    id: { type: String },
    nombre: { type: String, required: [true, 'el nombre es necesario'] },
});

module.exports = mongoose.model('TiposServicio', tiposServicioSchema);