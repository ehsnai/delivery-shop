"use strict"
/**@author:Dipen: 
 * Declaration of modules for einstonLogs
 */var winston = require('winston');
require('winston-daily-rotate-file');

var transport = new winston.transports.DailyRotateFile({//transport defined here
    filename: __dirname+'/logs/infolog',
    datePattern: 'dd-MM-yyyy-',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
});
var logger = new (winston.Logger)({ //logger defined here
    transports: [
        transport
    ]
});
//----------------------------------------
var transport_error = new winston.transports.DailyRotateFile({ //transport_error defined here
    filename: __dirname+'/logs/infoError',
    datePattern: 'dd-MM-yyyy-',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
});
var logger_error = new (winston.Logger)({//logger_error defined here
    transports: [
        transport_error
    ]
});

 /*******************************************************************************************************
    * @description enistonLogs class used for generating loggerinfo, loggerErrors.
    */
class enistonLogs {
    loggerInfo(msg) {
        logger.info(msg);
    }
    loggerError(msg) {
        logger_error.error(msg);
    }

}

module.exports = new enistonLogs 