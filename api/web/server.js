
const Hapi = require('hapi');
const Server = new Hapi.Server();
const logger = require('winston');
const config = require('../config')
const db = require('../models/mongodb');
const middleware = require('./middleware');
const Auth = require('./middleware/authentication.js');
const Path = require('path');



//cluster
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
var ipc = require('node-ipc');
var fork = require('child_process').fork;


if (cluster.isMaster) {
    logger.silly(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        logger.silly(`Forking process number ${i}...`);
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {
        // Replace the dead worker,
        // we're not sentimental
        logger.silly(`worker ${worker.process.pid} died`);
        cluster.fork();

    });

} else {
    logger.silly(`Worker ${process.pid} started`);

    Server.connection({
        port: config.server.port,
        // routes: {
        //     cors: true
        // }
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public/uploads')
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with', 'authorization','lang'],
                credentials: true
            }
        }
    });

    /* +_+_+_+_+_+_+_+_+_+_+ Plugins / Middlewares +_+_+_+_+_+_+_+_+_+_+ */

    Server.register(
        [middleware.good,
        middleware.swagger.inert,
        middleware.swagger.vision,
        middleware.swagger.swagger,
        middleware.auth.HAPI_AUTH_JWT,
        middleware.localization.i18n
        ], function (err) {
            if (err) Server.log(['error'], 'hapi-swagger load error: ' + err)

            else Server.log(['start'], 'hapi-swagger interface loaded')
        });

    // Server.auth.strategy('refJwt', 'jwt', middleware.auth.refJWTConfig);
    // Server.auth.strategy('userJWT', 'jwt', middleware.auth.userJWTConfig);

    Server.auth.strategy('adminJwt', 'jwt', middleware.auth.adminJwt);

    console.log(Path.join(__dirname, 'public/uploads'))
    
    Server.route(require('./routes/index'));
    Server.route({
        method: 'GET',
        path: '/public/uploads/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

}
const initialize = () => {
    Server.start(() => {
        console.info(`Server started at `);
        logger.info(`Server is listening on port `, config.server.port)
        db.connect(() => { });//create a connection to mongodb
    });// Add the route
}

module.exports = { initialize };