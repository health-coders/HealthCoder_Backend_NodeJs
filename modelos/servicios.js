var mysql = require('mysql');

var Pool = mysql.createPool;

var serviciosPool = new Pool({

    id: { type: String },
    numero_servicio: { type: Number, required: [true, 'el numero de servicio es necesario'] },
    tipo_servicio: { 
        type: Schema.Types.ObjectId,
        ref: 'TiposServicio', required: false
     },
    solicitante: { 
        type: Schema.Types.ObjectId,
        ref: 'Usuarios', required: false
     },
    prestador: { type: String },
    fecha_generacion: { type: Date, required: [true, 'la fecha es necesaria'] },
    prioridad: { type: Number, required: [true, 'la prioridad es necesaria'] },
    descripcion: { type: String, required: [true, 'la descripcion es necesaria'] },
    fecha_confirmacion: { type: Date }
});

module.export = {
    getConnection: (callback) => {
        return serviciosPool.getConnection(callback);
    }
}