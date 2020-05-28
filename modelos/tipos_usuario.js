var mysql = require('mysql');

var Pool = mysql.createPool;

var tiposUsuarioValidos = {
    values: ['USUARIO_ROLE', 'PARAMEDICO_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un tipo de usuario permitido'
}

var tiposUsuariosPool = new Pool({

    id: { type: Number },
    tipo_usuario: { type: String, default: 'USUARIO_ROLE', enum: tiposUsuarioValidos },
});

module.export = {
    getConnection: (callback) => {
        return tiposUsuariosPool.getConnection(callback);
    }
}