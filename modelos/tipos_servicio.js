var mysql = require('mysql');

var Pool = mysql.createPool;

var tiposServicioPool = new Pool({

    id: { type: String },
    nombre: { type: String, required: [true, 'el nombre es necesario'] },
});

module.export = {
    getConnection: (callback) => {
        return tiposServicioPool.getConnection(callback);
    }
}