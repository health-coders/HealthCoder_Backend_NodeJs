var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuariosSchema = new Schema({

    id_nacional: { type: Number, required: [true, 'el id es necesario'] },
    nombre_1: { type: String, required: [true, 'el nombre es necesario'] },
    name_2: { type: String },
    apellido_1: { type: String, required: [true, 'el apellido es necesario'] },
    apellido_2: { type: String, required: [true, 'el segundo apellido es necesario'] },
    email: { type: String, unique: true, required: [true, 'el correo es necesario'] },
    numero_telefono: { type: Number, required: [true, 'el telefono es necesario'] },
    tipo_usuario: { 
        type: Schema.Types.ObjectId,
        ref: 'TiposUsuario', required: false
     },
    contrasena: { type: String, required: [true, 'la contraseña es necesario'] },
    certificado_rethus: { type: Number },
    transporte: { type: BigInt },
    estado_usuario: { type: Number, required: [true, 'el estado es necesario'] },
    asegurador: { type: Number },
});

usuariosSchema.plugin(uniqueValidator, { message: 'el {PATH} debe ser unico' });

module.exports = mongoose.model('Usuarios', usuariosSchema);