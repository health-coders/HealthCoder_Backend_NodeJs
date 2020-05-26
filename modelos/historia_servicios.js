var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var historiasServicioSchema = new Schema({

    id: { type: String },
    id_servicio: { 
        type: Schema.Types.ObjectId,
        ref: 'Servicios', required: false
     },
    estado: { 
        type: Schema.Types.ObjectId,
        ref: 'EstadosServicios', required: false
     },
    ultima_actualizacion: { type: Date, required: [true, 'la actualizacion es necesaria'] },
});

module.exports = mongoose.model('HistoriasServicio', historiasServicioSchema);