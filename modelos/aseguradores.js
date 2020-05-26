var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var aseguradoresSchema = new Schema({

    id: { type: Number },
    nombre_asegurador: { type: String, required: [true, 'el nombre es necesario'] },
});

module.exports = mongoose.model('Aseguradores', aseguradoresSchema);