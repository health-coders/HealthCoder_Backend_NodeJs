var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var transportesSchema = new Schema({

    numero_matricula: { type: BigInt, required: [true, 'el numero de matricula es necesaria'] },
    tipo_transporte: { type: String, required: [true, 'el tipo de transporte es necesario'] },
    marca: { type: String, required: [true, 'la marca es necesaria'] },
    modelo: { type: String, required: [true, 'el modelo es necesario'] },
    ano: { type: Number, required: [true, 'el año es necesario'] },
    color: { type: String, unique: true, required: [true, 'el color es necesario'] },
    placa: { type: String, required: [true, 'el placa es necesaria'] },
});

module.exports = mongoose.model('Transportes', transportesSchema);