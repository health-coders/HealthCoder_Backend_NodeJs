var mysql = require('mysql');

var Pool = mysql.createPool;

var tiposUsuariosPool = new Pool({

    id: { type: Number },
    tipo_usuario: { type: String, required: [true, 'el tipo usuario es necesario'] },
});

module.export = {
    getConnection: (callback) => {
        return tiposUsuariosPool.getConnection(callback);
    }
}