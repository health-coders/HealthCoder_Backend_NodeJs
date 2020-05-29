var mysql = require('mysql');

var Pool = mysql.createPool;

var estadosValidos = {
    values: [
        'CREADO',
        'ACEPTADO',
        'RECHAZADO',
        'CANCELADO',
        'EN RUTA',
        'EN PROCESO',
        'FINALIZADO'
    ],
    message: '{VALUE} no es un estado permitido'
}

var estadosServiciosPool = new Pool({

    id: { type: String },
    nombre: { type: String, enum: estadosValidos },
});

module.export = {
    getConnection: (callback) => {
        return estadosServiciosPool.getConnection(callback);
    }
}