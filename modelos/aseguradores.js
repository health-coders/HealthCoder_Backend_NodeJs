var mysql = require('mysql');

var Pool = mysql.createPool;

var aseguradoresValidos = {
    values: [
        'SALUD COLMENA EPS SA',
        'SALUD TOTAL SA EPS',
        'CAFESALUD EPS SA',
        'EPS SANITAS SA',
        'EPS UNIMEC SA',
        'COMPENSAR EPS',
        'EPS PROGRESO COMFENALCO ANTIOQUIA',
        'EPS SURA',
        'COLSEGUROS EPS',
        'COMFENALCO VALLE EPS',
        'EPS SALUDCOOP',
        'HUMANA VIVIR SA EPS',
        'EPS SERVICIOS MEDICOS COLPATRIA',
        'COOMEVA EPS',
        'EPS FAMISANAR - CAFAM COLSUBSIDIO',
        'EPS SERVICIO OCCIDENTAL DE SALUD SA EPS-SOS',
        'CRUZ BLANCA EPS',
        'SOLSALUD SA EPS',
        'SALUDVIDA SA EPS',
        'SALUDCOLOMBIA EPS SA',
        'RED SALUD ATENCION HUMANA EPS SA'
    ],
    message: '{VALUE} no es una aseguradora permitida'
}

var aseguradoresPool = new Pool({

    id: { type: Number },
    nombre_asegurador: { type: String, enum: aseguradoresValidos },
});

module.export = {
    getConnection: (callback) => {
        return aseguradoresPool.getConnection(callback);
    }
}