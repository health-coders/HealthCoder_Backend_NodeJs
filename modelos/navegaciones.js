var mysql = require('mysql');

var Pool = mysql.createPool;

var navegacionesPool = new Pool({

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

module.export = {
    getConnection: (callback) => {
        return navegacionesPool.getConnection(callback);
    }
}