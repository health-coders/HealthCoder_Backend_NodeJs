var mysql = require('mysql');

var Pool = mysql.createPool;

var historiasServicioPool = new Pool({

    id: { type: String },
    id_servicio: { 
        
     },
    estado: { 

     },
    ultima_actualizacion: { type: Date, required: [true, 'la actualizacion es necesaria'] },
});

module.export = {
    getConnection: (callback) => {
        return historiasServicioPool.getConnection(callback);
    }
}