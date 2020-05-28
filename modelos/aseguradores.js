var mysql = require('mysql');

var Pool = mysql.createPool;

var aseguradoresPool = new Pool({

    id: { type: Number },
    nombre_asegurador: { type: String, required: [true, 'el nombre es necesario'] },
});

module.export = {
    getConnection: (callback) => {
        return aseguradoresPool.getConnection(callback);
    }
}