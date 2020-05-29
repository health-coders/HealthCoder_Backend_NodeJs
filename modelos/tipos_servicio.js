var mysql = require('mysql');

var Pool = mysql.createPool;

var tiposValidos = {
    values: [
        'CONSULTA',
        'ALERTA RAPIDA',
        'ALERTA ESPECIFICA'
    ],
    message: '{VALUE} no es un tipo de servicio permitido'
}

var tiposServicioPool = new Pool({

    id: { type: String },
    nombre: { type: String, enum: tiposValidos },
});

module.export = {
    getConnection: (callback) => {
        return tiposServicioPool.getConnection(callback);
    }
}