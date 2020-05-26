var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var navegacionesSchema = new Schema({

    id: { type: Number },
    tipo_usuario: { 
        type: Schema.Types.ObjectId,
        ref: 'TiposUsuario', required: false
     },
    item_navegacion: { 
        type: Schema.Types.ObjectId,
        ref: 'ItemsNavegacion', required: false
     },
});

module.exports = mongoose.model('Navegaciones', navegacionesSchema);