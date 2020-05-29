var mysql = require('mysql');

var Pool = mysql.createPool;

var navegacionesPool = new Pool({

    id: { type: Number },
    tipo_usuario: { 
        
     },
    item_navegacion: { 

     },
});

module.export = {
    getConnection: (callback) => {
        return navegacionesPool.getConnection(callback);
    }
}