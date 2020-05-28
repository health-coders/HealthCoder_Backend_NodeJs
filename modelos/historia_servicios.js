var mysql = require('mysql');

var Pool = mysql.createPool;

var historiasServicioPool = new Pool({

    id: { type: String },
    id_servicio: { 
        type: Schema.Types.ObjectId,
        ref: 'Servicios', required: false
     },
    estado: { 
        type: Schema.Types.ObjectId,
        ref: 'EstadosServicios', required: false
     },
    ultima_actualizacion: { type: Date, required: [true, 'la actualizacion es necesaria'] },
});

module.export = {
    getConnection: (callback) => {
        return historiasServicioPool.getConnection(callback);
    }
}