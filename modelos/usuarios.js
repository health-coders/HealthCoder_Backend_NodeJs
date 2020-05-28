var mysql = require('mysql');

var Pool = mysql.createPool;

var tiposUsuarioValidos = {
    values: ['USUARIO_ROLE', 'PARAMEDICO_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un tipo de usuario permitido'
}

var usuariosPool = new Pool({

    id_nacional: { type: Number, required: [true, 'el id es necesario'] },
    nombre_1: { type: String, required: [true, 'el nombre es necesario'] },
    name_2: { type: String },
    apellido_1: { type: String, required: [true, 'el apellido es necesario'] },
    apellido_2: { type: String, required: [true, 'el segundo apellido es necesario'] },
    email: { type: String, unique: true, required: [true, 'el correo es necesario'] },
    numero_telefono: { type: Number, required: [true, 'el telefono es necesario'] },
    tipo_usuario: { type: String, default: 'USUARIO_ROLE', enum: tiposUsuarioValidos },
    contrasena: { type: String, required: [true, 'la contraseña es necesario'] },
    certificado_rethus: { type: Number },
    transporte: { type: Number },
    estado_usuario: { type: Number, required: [true, 'el estado es necesario'] },
    asegurador: { type: Number },
});

module.export = {
    getConnection: (callback) => {
        return usuariosPool.getConnection(callback);
    }
}