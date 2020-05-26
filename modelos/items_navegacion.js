var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemsNavegacionSchema = new Schema({

    id: { type: Number },
    nombre: { type: String, required: [true, 'el nombre es necesario'] },
});

module.exports = mongoose.model('ItemsNavegacion', itemsNavegacionSchema);