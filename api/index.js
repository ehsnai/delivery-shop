'use strict'


require('dotenv').config({ silent: true });

//load .env in local development
//if (process.env.NODE_ENV === 'development') {
//    require('dotenv').config({ silent: true });
//}

const logger = require('winston');
const config = require("./config")


const semver = require('semver'); const pkg = require('./package.json');

const type = process.env.PROCESS_TYPE

// validate Node version requirement
const runtime = {
    expected: semver.validRange(pkg.engines.node), actual: semver.valid(process.version)
}

const valid = semver.satisfies(runtime.actual, runtime.expected);

if (!valid) {
    throw new Error(
        `Expected Node.js version ${runtime.expected}, but found v${runtime.actual}. Please update or change your runtime!`
    );
}
// configure logger
logger.default.transports.console.colorize = true
logger.default.transports.console.timestamp = true
logger.default.transports.console.prettyPrint = config.env === 'development'
logger.level = config.logger.level

// start process
logger.info(`Starting ${config.process.type} process`, { pid: process.pid })

logger.info(`Starting ${type} process`, { pid: process.pid });

if (type === 'web') {
    require('./web');
}

else {
    throw new Error(`${type} is an unsupported process type.`);
}