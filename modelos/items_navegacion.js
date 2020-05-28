var mysql = require('mysql');

var Pool = mysql.createPool;

var itemsNavegacionPool = new Pool({

    id: { type: Number },
    nombre: { type: String, required: [true, 'el nombre es necesario'] },
});

module.export = {
    getConnection: (callback) => {
        return itemsNavegacionPool.getConnection(callback);
    }
}